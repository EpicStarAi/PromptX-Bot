import { spawn } from "child_process";
import { logger } from "../utils/logger.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const VIDEO_PRESETS = {
  tierList: {
    name: "📊 Топ-лист",
    description: "Рейтинговый список (S/A/B/C/D tier)",
    example: "Создай топ-лист знаков зодиака по совместимости",
    cost: "~₴40-60"
  },
  debate: {
    name: "💬 Дебаты",
    description: "Спор двух сторон",
    example: "Создай дебаты: Овен vs Телец — кто лучший лидер?",
    cost: "~₴40-60"
  },
  interview: {
    name: "🎙️ Интервью",
    description: "Интервью или экспертное мнение",
    example: "Создай интервью с астрологом о гороскопе на сегодня",
    cost: "~₴40-60"
  },
  podcast: {
    name: "🎧 Подкаст",
    description: "Подкаст-формат с ведущими",
    example: "Создай подкаст о влиянии Луны на эмоции",
    cost: "~₴40-60"
  },
  tutorial: {
    name: "📚 Гайд",
    description: "Обучение или инструкция",
    example: "Создай гайд: как составить натальную карту",
    cost: "~₴40-60"
  },
  review: {
    name: "⭐ Обзор",
    description: "Обзор продукта или темы",
    example: "Создай обзор: лучшие приложения для астрологии",
    cost: "~₴40-60"
  }
};

/**
 * Run hypit command to generate video
 */
export async function generateVideo(options) {
  const {
    command,
    referenceVideo = null,
    outputName = null,
    variants = 1,
    outputDir = "./output"
  } = options;

  return new Promise((resolve) => {
    const args = [];
    
    if (referenceVideo) {
      args.push(`clone "${referenceVideo}"`);
    } else {
      args.push(`make ${command}`);
    }
    
    if (outputName) {
      args.push(`--name "${outputName}"`);
    }
    
    if (variants > 1) {
      args.push(`--variants ${variants}`);
    }

    const env = { ...process.env };
    
    logger.info({ args }, "Running hypit");
    
    const hypit = spawn("npx", ["hypit", ...args], {
      shell: true,
      env,
      cwd: outputDir
    });
    
    let stdout = "";
    let stderr = "";
    
    hypit.stdout.on("data", (data) => {
      stdout += data.toString();
    });
    
    hypit.stderr.on("data", (data) => {
      stderr += data.toString();
    });
    
    hypit.on("close", (code) => {
      if (code === 0) {
        const variants = stdout.match(/Output:\s*(.+)/gi) || [];
        const costMatch = stdout.match(/Total cost:\s*\$?([\d.]+)/i);
        
        resolve({
          success: true,
          variants: variants.map(v => v.replace(/Output:\s*/i, "").trim()),
          cost: costMatch ? parseFloat(costMatch[1]) : null
        });
      } else {
        resolve({
          success: false,
          error: stderr || `hypit exited with code ${code}`
        });
      }
    });
    
    hypit.on("error", (err) => {
      resolve({
        success: false,
        error: err.message
      });
    });
    
    setTimeout(() => {
      hypit.kill();
      resolve({
        success: false,
        error: "timeout"
      });
    }, 300000);
  });
}

/**
 * Create video from prompt using AI
 */
export async function createVideoFromPrompt(prompt, preset = null, userId) {
  let command = prompt;
  
  if (preset && VIDEO_PRESETS[preset]) {
    const presetInfo = VIDEO_PRESETS[preset];
    command = `Create a ${presetInfo.name.replace(/[^\w\s]/g, '')} video: ${prompt}`;
  }
  
  const outputName = `promptx_${userId}_${Date.now()}`;
  
  return generateVideo({
    command,
    outputName,
    variants: 1
  });
}

/**
 * Create video variations
 */
export async function createVideoVariants(prompt, count = 3) {
  return generateVideo({
    command: prompt,
    variants: count
  });
}

/**
 * Clone video with modifications
 */
export async function cloneVideo(referenceVideo, modifications, userId) {
  let command = `Clone this video: ${referenceVideo}`;
  
  if (modifications.swapHost) {
    command += `, replace the host with ${modifications.swapHost}`;
  }
  if (modifications.swapTopic) {
    command += `, change topic to ${modifications.swapTopic}`;
  }
  if (modifications.swapEffect) {
    command += `, change effects to ${modifications.swapEffect}`;
  }
  
  const outputName = `promptx_clone_${userId}_${Date.now()}`;
  
  return generateVideo({
    command,
    referenceVideo,
    outputName,
    variants: modifications.variants || 3
  });
}
