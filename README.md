# scrcpy-loop-node

Automatically launch and reconnect [`scrcpy`](https://github.com/Genymobile/scrcpy) over Wi-Fi using Node.js.  
Perfect for developers or streamers who want their Android screen to stay mirrored even after disconnects.

## 📦 Features

- Auto-detect Android IP via ADB
- Auto-connect to device over TCP/IP
- Auto-relaunch `scrcpy` if closed
- Cross-platform logging with timestamps and colors

## 📷 Preview (Terminal Output)

```
[12:00:01] [INFO] เริ่มต้นโปรแกรม scrcpy-loop
[12:00:03] [OK] เจอ IP ของมือถือ: 192.168.1.42
[12:00:03] [INFO] กำลังเปิด scrcpy...
[12:10:55] [WARN] scrcpy ปิดลงแล้ว จะเปิดใหม่ใน 3 วินาที...
```

## 🚀 Getting Started

### 1. Install Node.js
Download from [nodejs.org](https://nodejs.org)

### 2. Clone This Repo

```bash
git clone https://github.com/your-username/scrcpy-loop-node.git
cd scrcpy-loop-node
```

### 3. Install Dependencies

```bash
npm install chalk@4
```

### 4. Configure Your Paths

Open `scrcpy.js` and change the following lines:

```js
const ADB_PATH = "F:\scrcpy\adb.exe";
const SCRCPY_PATH = "F:\scrcpy\scrcpy.exe";
```

Replace with your local paths to `adb.exe` and `scrcpy.exe`.

### 5. Run It

```bash
node scrcpy.js
```

> 💡 You can press `Ctrl + C` to stop.

## 🧰 Requirements

- [scrcpy](https://github.com/Genymobile/scrcpy)
- `adb` (included with Android SDK or bundled with scrcpy)

## 📄 License

MIT License