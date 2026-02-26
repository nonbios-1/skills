To convert html to pdf: 

# 1. Make sure puppeteer is installed
npm install puppeteer
# 2. Ensure fonts are installed on the server
sudo apt install -y fonts-noto-color-emoji
# 3. Use script to read file via Apache and convert to pdf

node html2pdf.js --serve /path/to/deck.html output.pdf


