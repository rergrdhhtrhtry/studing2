# 倒计时闹钟 PWA 应用

一个功能完整的倒计时闹钟应用，可以安装到手机上作为原生应用使用。

## ✨ 功能特点

- 🕐 灵活的时间设置（时、分、秒）
- ⏱️ 实时倒计时显示
- 📊 直观的进度条
- ⏸️ 暂停/继续/重置功能
- 🎵 悦耳的提醒音乐
- 📱 支持离线使用
- 🚀 可安装到手机主屏幕

## 📲 安装到手机

### Android 设备

1. 在手机浏览器中打开应用：`http://localhost:8000`（或您的服务器地址）
2. 点击浏览器菜单（三个点）
3. 选择"添加到主屏幕"或"安装应用"
4. 确认安装

### iOS 设备 (iPhone/iPad)

1. 在 Safari 浏览器中打开应用
2. 点击底部的分享按钮（方框加向上箭头）
3. 向下滑动找到"添加到主屏幕"
4. 点击"添加"

## 🚀 本地运行

### 方法 1: 使用 Python（推荐）

```bash
python -m http.server 8000
```

然后在浏览器中访问：`http://localhost:8000`

### 方法 2: 使用 Node.js

```bash
npx http-server -p 8000
```

### 方法 3: 使用 PHP

```bash
php -S localhost:8000
```

## 🌐 部署到网络

要让手机能够访问，您需要将应用部署到公网服务器：

### 选项 1: 使用 GitHub Pages（免费）

1. 将代码推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 访问 `https://yourusername.github.io/your-repo/`

### 选项 2: 使用 Netlify（免费）

1. 访问 [netlify.com](https://netlify.com)
2. 拖放项目文件夹到 Netlify
3. 获得一个免费的 HTTPS 地址

### 选项 3: 使用 Vercel（免费）

1. 访问 [vercel.com](https://vercel.com)
2. 导入项目或使用 Vercel CLI
3. 获得一个免费的 HTTPS 地址

### 选项 4: 使用本地网络

如果只想在局域网内使用：

```bash
# Windows
python -m http.server 8000 --bind 0.0.0.0

# 然后在手机浏览器访问
http://您的电脑IP:8000
```

## 📱 PWA 特性

- ✅ 离线可用（通过 Service Worker 缓存）
- ✅ 可添加到主屏幕
- ✅ 全屏显示
- ✅ 应用图标
- ✅ 启动画面
- ✅ 主题色

## 🎨 自定义

### 修改主题色

编辑 `manifest.json` 中的 `theme_color` 和 `background_color`

### 修改图标

运行图标生成脚本：

```bash
python generate_icons.py
```

### 修改提醒音乐

编辑 `script.js` 中的 `playMelody()` 方法

## 📂 文件结构

```
├── index.html           # 主页面
├── style.css           # 样式文件
├── script.js           # JavaScript 逻辑
├── manifest.json       # PWA 配置
├── service-worker.js   # Service Worker（离线支持）
├── generate_icons.py   # 图标生成脚本
├── icon.svg           # SVG 图标源文件
└── icon-*.png         # 应用图标（多种尺寸）
```

## 🔧 技术栈

- HTML5
- CSS3（渐变、动画、响应式设计）
- JavaScript (ES6+)
- Web Audio API
- Service Worker API
- PWA (Progressive Web App)

## 📝 使用说明

1. 设置倒计时时间
2. 点击"开始"按钮
3. 可以暂停、继续或重置
4. 时间到时会播放提醒音乐

## 🎯 浏览器支持

- Chrome/Edge (推荐)
- Firefox
- Safari
- Opera

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！