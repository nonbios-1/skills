# HTML to PDF Converter - Complete Installation Guide

## Prerequisites Checklist

### 1. Node.js and npm
**Required Version:** Node.js 14+ (Current system: v24.11.1 âœ…)

```bash
# Check if installed
node --version
npm --version

# If not installed
sudo apt update
sudo apt install -y nodejs npm

# Or use NVM for latest version
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install --lts
```

### 2. Puppeteer
**Required:** puppeteer@20+ (Current system: v24.37.5 âœ…)

```bash
# Install in your project directory
cd /home/nonbios/nonbios_deck
npm install puppeteer

# Or install globally
npm install -g puppeteer
```

**Important:** Puppeteer downloads Chromium automatically (~170-300MB). Ensure you have sufficient disk space.

### 3. System Fonts (CRITICAL for Icons/Emojis)
**Required for:** Emoji, icons, special characters to render correctly in PDF

```bash
# Install essential emoji fonts
sudo apt update
sudo apt install -y fonts-noto-color-emoji fonts-emojione fonts-symbola

# Verify installation
fc-list | grep -i emoji

# Expected output:
# /usr/share/fonts/truetype/emojione/emojione-android.ttf: Emoji One:style=Regular
# /usr/share/fonts/truetype/noto/NotoColorEmoji.ttf: Noto Color Emoji:style=Regular
```

**Why fonts matter:**
- Without system fonts, icons and emojis appear as â˜ (boxes) in PDF
- Puppeteer uses system fonts for rendering
- Even web fonts need fallback system fonts

### 4. Apache Web Server (RECOMMENDED)
**Why:** Better resource loading for external CSS, fonts, and images

```bash
# Check if Apache is running
sudo systemctl status apache2

# If not installed
sudo apt install -y apache2

# Start Apache
sudo systemctl start apache2
sudo systemctl enable apache2

# Verify
curl http://localhost
```

**Apache Directory:** `/var/www/html/`

### 5. Additional System Dependencies

```bash
# Required for Puppeteer on Linux
sudo apt install -y \
  ca-certificates \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libc6 \
  libcairo2 \
  libcups2 \
  libdbus-1-3 \
  libexpat1 \
  libfontconfig1 \
  libgbm1 \
  libgcc1 \
  libglib2.0-0 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libpango-1.0-0 \
  libpangocairo-1.0-0 \
  libstdc++6 \
  libx11-6 \
  libx11-xcb1 \
  libxcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxi6 \
  libxrandr2 \
  libxrender1 \
  libxss1 \
  libxtst6 \
  lsb-release \
  wget \
  xdg-utils
```

## Quick Installation Script

```bash
#!/bin/bash
# Complete setup script

echo "Installing HTML to PDF Converter prerequisites..."

# Update system
sudo apt update

# Install Node.js and npm
sudo apt install -y nodejs npm

# Install system fonts
sudo apt install -y fonts-noto-color-emoji fonts-emojione fonts-symbola

# Install Puppeteer dependencies
sudo apt install -y \
  ca-certificates fonts-liberation libappindicator3-1 libasound2 \
  libatk-bridge2.0-0 libatk1.0-0 libcairo2 libcups2 libdbus-1-3 \
  libexpat1 libfontconfig1 libgbm1 libglib2.0-0 libgtk-3-0 \
  libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libx11-6 \
  libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 \
  libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 \
  libxtst6 lsb-release wget xdg-utils

# Install Apache (optional but recommended)
sudo apt install -y apache2
sudo systemctl start apache2
sudo systemctl enable apache2

# Install Puppeteer
cd /home/nonbios/nonbios_deck
npm install puppeteer

echo "âœ… Installation complete!"
echo ""
echo "Verify installation:"
echo "  node --version"
echo "  npm list puppeteer"
echo "  fc-list | grep -i emoji"
echo "  curl http://localhost"
```

## Verification

After installation, verify everything is working:

```bash
# 1. Check Node.js
node --version  # Should show v14+

# 2. Check Puppeteer
npm list puppeteer  # Should show puppeteer@20+

# 3. Check fonts
fc-list | grep -i emoji  # Should show Noto and Emoji One fonts

# 4. Check Apache
curl http://localhost  # Should return HTML

# 5. Test the converter
cd /home/nonbios/nonbios_deck
node html2pdf_v2.js --help  # Should show help message
```

## Troubleshooting

### Issue: "Cannot find module 'puppeteer'"
**Solution:**
```bash
cd /home/nonbios/nonbios_deck
npm install puppeteer
```

### Issue: Icons/emojis showing as boxes in PDF
**Solution:**
```bash
# Install emoji fonts
sudo apt install -y fonts-noto-color-emoji fonts-emojione fonts-symbola

# Verify
fc-list | grep -i emoji
```

### Issue: "Error: Failed to launch chrome"
**Solution:**
```bash
# Install missing dependencies
sudo apt install -y libgbm1 libasound2 libatk-bridge2.0-0 libgtk-3-0
```

### Issue: External resources not loading
**Solution:**
- Use `--serve` flag to serve via Apache
- Or use full HTTP URL instead of file path
- Check that Apache is running: `sudo systemctl status apache2`
