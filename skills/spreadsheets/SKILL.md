# Spreadsheet System - Deployment Guide

## Overview
A lightweight, extensible web-based spreadsheet viewer/editor for CSV files with auto-save functionality.

## Files to Deploy

### Core Files (Required)
- **spreadsheet.html** - Frontend viewer with AG Grid, handles CSV loading, editing, export, and auto-save
- **save-csv.php** - Backend handler that validates and saves CSV data to server

## Server Requirements
- Apache/Nginx with PHP 7.0+
- Write permissions for web server user on CSV files

## Setup Instructions

1. **Deploy Files**
   ```bash
   # Place all files in web root directory
   cp spreadsheet.html save-csv.php *.csv /var/www/html/
   ```

2. **Set Permissions**
   ```bash
   # Set CSV file ownership (replace www-data with your web server user)
   chown www-data:www-data /var/www/html/*.csv
   chmod 644 /var/www/html/*.csv
   ```

3. **Access**
   ```
   http://yourdomain.com/spreadsheet.html?file=yourfile.csv
   ```


## Security Features
- **Filename Validation**: Only alphanumeric characters, dash, underscore, and `.csv` extension allowed
- **Directory Restriction**: Files must be in same directory as `spreadsheet.html`
- **No Directory Traversal**: Both frontend and backend validate against path traversal attacks
- **Input Sanitization**: CSV content is validated before saving

## Features
- âœ… Dynamic CSV loading via URL parameter
- âœ… Inline cell editing
- âœ… Auto-save on cell change
- âœ… Manual save button
- âœ… Export to CSV
- âœ… Sorting and filtering
- âœ… Pagination
- âœ… Unsaved changes warning

## Troubleshooting

### Save Not Working
- Check file permissions: `ls -la *.csv`
- Verify web server user ownership
- Check Apache/PHP error logs

### CSV Not Loading
- Ensure filename matches pattern: `[a-zA-Z0-9_-]+\.csv`
- Verify file exists in same directory
- Check browser console for errors

## Technical Stack
- **Frontend**: HTML5, JavaScript, AG Grid Community 31.0.0, Tailwind CSS
- **Backend**: PHP 7.0+
- **Server**: Apache/Nginx

---

**Simple LAMP/LEMP stack deployment. No database required.**
