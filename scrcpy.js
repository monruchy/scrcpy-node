
const { execSync, spawn } = require("child_process");
const chalk = require("chalk");

const ADB_PATH = "F:\\scrcpy\\adb.exe";
const SCRCPY_PATH = "F:\\scrcpy\\scrcpy.exe";

function log(message, level = "info") {
  const timestamp = new Date().toLocaleTimeString("en-GB", { hour12: false });
  if (level === "info") {
    console.log(`[${timestamp}] ${chalk.cyan("[INFO]")} ${message}`);
  } else if (level === "success") {
    console.log(`[${timestamp}] ${chalk.green("[OK]")} ${message}`);
  } else if (level === "warn") {
    console.log(`[${timestamp}] ${chalk.yellow("[WARN]")} ${message}`);
  } else if (level === "error") {
    console.log(`[${timestamp}] ${chalk.red("[ERROR]")} ${message}`);
  }
}

function getDeviceIp() {
  try {
    const result = execSync(`${ADB_PATH} shell ip route`).toString();
    const match = result.match(/src (\d+\.\d+\.\d+\.\d+)/);
    if (match) return match[1];
  } catch (error) {
    log(`ไม่สามารถดึง IP ได้: ${error.message}`, "error");
  }
  return null;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function mainLoop() {
  log("เริ่มต้นโปรแกรม scrcpy-loop", "info");

  while (true) {
    try {
      const ip = getDeviceIp();
      if (!ip) {
        log("หา IP ไม่เจอ ลองเชื่อมสาย USB แล้วรันใหม่", "warn");
        await delay(5000);
        continue;
      }

      log(`เจอ IP ของมือถือ: ${ip}`, "success");

      execSync(`${ADB_PATH} connect ${ip}:5555`, { stdio: "ignore" });

      log("กำลังเปิด scrcpy...", "info");

      const scrcpy = spawn(SCRCPY_PATH, ["-s", `${ip}:5555`], { stdio: "inherit" });

      await new Promise((resolve) => scrcpy.on("exit", resolve));

      log("scrcpy ปิดลงแล้ว จะเปิดใหม่ใน 3 วินาที...", "warn");
      await delay(3000);
    } catch (error) {
      if (error.code === "SIGINT") {
        log("ผู้ใช้ยกเลิกโปรแกรม", "success");
        break;
      }
      log(`เกิดข้อผิดพลาด: ${error.message}`, "error");
      await delay(5000);
    }
  }
}

mainLoop();
