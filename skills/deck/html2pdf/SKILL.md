To convert html to pdf: 

# 1. Make sure puppeteer is installed
npm install puppeteer

# 2. Ensure fonts are installed on the server
sudo apt install -y fonts-noto-color-emoji fonts-emojione fonts-symbola

# 3. Use script to read file via Apache and convert to pdf
# Download from: https://github.com/nonbios-1/skills/skills/deck/html2pdf/html2pdf.js

node html2pdf.js --serve http://localhost/deck.html output.pdf
