#!/usr/bin/env node

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);

function showHelp() {
  console.log(`
HTML to PDF Converter 
==========================

Usage: node html2pdf.js [options] <input> [output.pdf]

Input can be:
  - Local file path (e.g., /path/to/file.html)
  - HTTP/HTTPS URL (e.g., http://localhost/file.html)
  - File in Apache directory (e.g., file.html - will auto-serve via localhost)

Options:
  -h, --help              Show this help message
  -f, --format <format>   Paper format (A4, Letter, Legal, etc.) [default: A4]
  -l, --landscape         Use landscape orientation [default: portrait]
  -m, --margin <margin>   Page margins in mm (e.g., "10,10,10,10" for top,right,bottom,left) [default: none]
  -w, --width <width>     Page width (e.g., "210mm", "8.5in")
  -H, --height <height>   Page height (e.g., "297mm", "11in")
  --no-background         Disable background graphics [default: enabled]
  --serve                 Force serving via Apache (recommended for better font/resource loading)

Examples:
  # Local file
  node html2pdf.js input.html

  # Serve via Apache (better for fonts and external resources)
  node html2pdf.js --serve input.html output.pdf

  # Direct URL
  node html2pdf.js http://localhost/deck.html output.pdf

  # With options
  node html2pdf.js -f Letter -l --serve input.html output.pdf
  `);
  process.exit(0);
}

// Parse options
const options = {
  format: 'A4',
  landscape: false,
  printBackground: true,
  margin: {},
  serve: false
};

let inputFile = null;
let outputFile = null;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  
  if (arg === '-h' || arg === '--help') {
    showHelp();
  } else if (arg === '-f' || arg === '--format') {
    options.format = args[++i];
  } else if (arg === '-l' || arg === '--landscape') {
    options.landscape = true;
  } else if (arg === '-m' || arg === '--margin') {
    const margins = args[++i].split(',').map(m => m.trim());
    if (margins.length === 4) {
      options.margin = {
        top: margins[0],
        right: margins[1],
        bottom: margins[2],
        left: margins[3]
      };
    }
  } else if (arg === '-w' || arg === '--width') {
    options.width = args[++i];
    delete options.format;
  } else if (arg === '-H' || arg === '--height') {
    options.height = args[++i];
    delete options.format;
  } else if (arg === '--no-background') {
    options.printBackground = false;
  } else if (arg === '--serve') {
    options.serve = true;
  } else if (!inputFile) {
    inputFile = arg;
  } else if (!outputFile) {
    outputFile = arg;
  }
}

// Validate input
if (!inputFile) {
  console.error('Error: Input HTML file or URL is required\n');
  showHelp();
}

// Determine if input is URL or file
const isUrl = inputFile.startsWith('http://') || inputFile.startsWith('https://');
let targetUrl;

if (isUrl) {
  targetUrl = inputFile;
} else {
  // Check if file exists
  const resolvedPath = path.resolve(inputFile);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`Error: Input file '${inputFile}' does not exist`);
    process.exit(1);
  }
  
  // If --serve flag or file is in Apache directory, serve via Apache
  if (options.serve || resolvedPath.startsWith('/var/www/html/')) {
    const fileName = path.basename(resolvedPath);
    
    // Copy to Apache if not already there
    if (!resolvedPath.startsWith('/var/www/html/')) {
      const apachePath = `/var/www/html/${fileName}`;
      fs.copyFileSync(resolvedPath, apachePath);
      console.log(`Copied to Apache: ${apachePath}`);
    }
    
    targetUrl = `http://localhost/${path.basename(resolvedPath)}`;
  } else {
    targetUrl = `file://${resolvedPath}`;
  }
}

// Set default output file
if (!outputFile) {
  if (isUrl) {
    outputFile = 'output.pdf';
  } else {
    const parsed = path.parse(inputFile);
    outputFile = path.join(parsed.dir, parsed.name + '.pdf');
  }
}

outputFile = path.resolve(outputFile);

console.log('HTML to PDF Converter v2.0');
console.log('===========================');
console.log(`Input:  ${inputFile}`);
console.log(`URL:    ${targetUrl}`);
console.log(`Output: ${outputFile}`);
console.log(`Format: ${options.format || `${options.width} x ${options.height}`}`);
console.log(`Orientation: ${options.landscape ? 'Landscape' : 'Portrait'}`);
console.log('');

(async () => {
  try {
    console.log('Launching browser with optimized settings...');
    const browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--font-render-hinting=none',
        '--force-color-profile=srgb',
        '--disable-web-security',
        '--disable-dev-shm-usage'
      ]
    });

    const page = await browser.newPage();
    
    // Set user agent for better compatibility
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36');
    
    console.log('Loading HTML...');
    await page.goto(targetUrl, { 
      waitUntil: ['networkidle0', 'domcontentloaded'],
      timeout: 60000
    });
    
    console.log('Waiting for fonts to load...');
    await page.evaluate(() => document.fonts.ready);
    
    // Small delay to ensure everything is settled
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('Forcing rasterization...');
    await page.screenshot({ path: '/dev/null', fullPage: true });
    
    console.log('Generating PDF...');
    await page.pdf({
      path: outputFile,
      ...options
    });
    
    await browser.close();
    
    console.log('');
    console.log('âœ… PDF generated successfully!');
    console.log(`ðŸ“„ Output: ${outputFile}`);
    
    // Show file size
    const stats = fs.statSync(outputFile);
    console.log(`Size: ${(stats.size / 1024).toFixed(2)} KB`);
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
})();
