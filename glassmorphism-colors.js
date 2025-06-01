#!/usr/bin/env node

/**
 * Modern Glassmorphism Color Replacement Script
 * Replaces the vibrant cyan-blue from your screenshot with sophisticated modern colors
 * that work better with glassmorphism design
 */

const fs = require('fs');
const path = require('path');

// Modern Glassmorphism Color Replacements
const modernColorReplacements = {
  // Replace vibrant cyan-blue with sophisticated modern colors
  'text-indigo-300': 'text-indigo-300',      // Soft indigo instead of bright cyan
  'text-violet-400': 'text-violet-400',      // Modern violet for primary text
  'text-purple-500': 'text-purple-500',      // Deep purple for emphasis
  'text-indigo-600': 'text-indigo-600',      // Rich indigo for headers
  
  // Sky blue replacements
  'text-blue-300': 'text-blue-300',         // Softer blue
  'text-indigo-400': 'text-indigo-400',       // Modern indigo
  'text-violet-500': 'text-violet-500',       // Contemporary violet
  
  // Primary colors (if using cyan)
  'text-indigo-400': 'text-indigo-400',       // Primary becomes sophisticated indigo
  
  // Background colors - Modern with transparency
  'bg-slate-100/40': 'bg-slate-100/40',        // Neutral glass background
  'bg-indigo-100/30': 'bg-indigo-100/30',       // Subtle indigo tint
  'bg-violet-100/25': 'bg-violet-100/25',       // Soft violet background
  'bg-purple-500/15': 'bg-purple-500/15',       // Modern purple with transparency
  'bg-indigo-500/20': 'bg-indigo-500/20',       // Sophisticated indigo background
  'bg-indigo-500/20': 'bg-indigo-500/20',        // Primary background
  
  // Border colors - Modern and subtle
  'border-slate-200/50': 'border-slate-200/50',
  'border-indigo-300/40': 'border-indigo-300/40',
  'border-violet-400/30': 'border-violet-400/30',
  'border-purple-500/35': 'border-purple-500/35',
  'border-indigo-400/30': 'border-indigo-400/30',
  
  // Hover states - Elegant transitions
  'hover:text-indigo-200': 'hover:text-indigo-200',
  'hover:text-violet-300': 'hover:text-violet-300',
  'hover:text-purple-400': 'hover:text-purple-400',
  'hover:text-indigo-300': 'hover:text-indigo-200',
  'hover:bg-slate-50/60': 'hover:bg-slate-50/60',
  'hover:bg-indigo-100/40': 'hover:bg-indigo-100/40',
  'hover:bg-indigo-500/30': 'hover:bg-indigo-500/30',
  'hover:bg-indigo-500/30': 'hover:bg-indigo-500/30',
  
  // Focus states - Modern focus indicators
  'focus:text-indigo-400': 'focus:text-indigo-400',
  'focus:text-violet-500': 'focus:text-violet-500',
  'focus:text-indigo-400': 'focus:text-indigo-400',
  'focus:ring-indigo-400/50': 'focus:ring-indigo-400/50',
  'focus:ring-violet-500/50': 'focus:ring-violet-500/50',
  'focus:ring-indigo-400/50': 'focus:ring-indigo-400/50',
  'focus:border-indigo-500/60': 'focus:border-indigo-500/60',
  
  // Active states - Sophisticated pressed states
  'active:text-violet-700': 'active:text-violet-700',
  'active:text-violet-700': 'active:text-violet-700',
  'active:text-indigo-600': 'active:text-violet-700',
  'active:bg-indigo-500/40': 'active:bg-indigo-500/40',
  'active:bg-indigo-500/40': 'active:bg-indigo-500/40',
  
  // Ring colors - Modern glow effects
  'ring-indigo-400/40': 'ring-indigo-400/40',
  'ring-violet-500/40': 'ring-violet-500/40',
  'ring-indigo-400/40': 'ring-indigo-400/40',
  
  // Additional modern replacements for better glassmorphism
  'text-indigo-400': 'text-indigo-400',      // Standard blue to modern indigo
  'text-violet-500': 'text-violet-500',      // Standard blue to modern violet
  'text-purple-600': 'text-purple-600',      // Deeper blue to modern purple
  
  // Gradient replacements for modern look
  'from-indigo-400': 'from-indigo-400',
  'to-violet-600': 'to-violet-600',
  'from-indigo-400': 'from-indigo-400',
  'to-purple-600': 'to-purple-600',
  
  // Shadow colors for glassmorphism
  'shadow-indigo-500/25': 'shadow-indigo-500/25',
  'shadow-violet-500/25': 'shadow-violet-500/25',
  
  // Placeholder and form colors
  'placeholder-slate-400': 'placeholder-slate-400',
  'placeholder-slate-400': 'placeholder-slate-400',
};

// Additional pattern-based replacements for CSS-in-JS or style attributes
const cssColorReplacements = {
  // Hex colors (approximate matches to your screenshot's cyan-blue)
  '#6366f1': '#6366f1',  // Cyan-like to indigo
  '#8b5cf6': '#8b5cf6',  // Light cyan to violet
  '#7c3aed': '#7c3aed',  // Dark cyan to purple
  '#5b21b6': '#5b21b6',  // Darker cyan to deep purple
  
  // RGB colors
  'rgb(99, 102, 241)': 'rgb(99, 102, 241)',    // Cyan to indigo
  'rgb(139, 92, 246)': 'rgb(139, 92, 246)',   // Light cyan to violet
  'rgb(124, 58, 237)': 'rgb(124, 58, 237)',    // Dark cyan to purple
  
  // CSS custom properties that might contain cyan
  '#6366f1': '#6366f1',
  '#6366f1': '#6366f1',
  '#8b5cf6': '#8b5cf6',
};

// File extensions to process
const fileExtensions = ['.js', '.jsx', '.ts', '.tsx', '.html', '.vue', '.svelte', '.css', '.scss', '.sass'];

// Directories to ignore
const ignoreDirs = ['node_modules', '.git', 'dist', 'build', '.next', 'coverage'];

/**
 * Check if a directory should be ignored
 */
function shouldIgnoreDir(dirName) {
  return ignoreDirs.some(ignoreDir => dirName.includes(ignoreDir));
}

/**
 * Check if a file should be processed
 */
function shouldProcessFile(filePath) {
  const ext = path.extname(filePath);
  return fileExtensions.includes(ext);
}

/**
 * Get all files recursively from a directory
 */
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!shouldIgnoreDir(file)) {
        getAllFiles(filePath, fileList);
      }
    } else if (shouldProcessFile(filePath)) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

/**
 * Replace colors in content
 */
function replaceColors(content) {
  let modifiedContent = content;
  let changesMade = [];
  
  // Replace Tailwind color classes
  Object.entries(modernColorReplacements).forEach(([oldColor, newColor]) => {
    const regex = new RegExp(`\\b${oldColor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
    const matches = modifiedContent.match(regex);
    if (matches) {
      modifiedContent = modifiedContent.replace(regex, newColor);
      changesMade.push(`${oldColor} → ${newColor} (${matches.length}x)`);
    }
  });
  
  // Replace CSS hex/rgb colors
  Object.entries(cssColorReplacements).forEach(([oldColor, newColor]) => {
    const regex = new RegExp(oldColor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const matches = modifiedContent.match(regex);
    if (matches) {
      modifiedContent = modifiedContent.replace(regex, newColor);
      changesMade.push(`${oldColor} → ${newColor} (${matches.length}x)`);
    }
  });
  
  // Additional smart replacements for any remaining cyan/sky colors
  const additionalPatterns = [
    { pattern: /\btext-cyan-(\d+)\b/g, replacement: 'text-indigo-$1' },
    { pattern: /\bbg-cyan-(\d+)\b/g, replacement: 'bg-indigo-$1/20' },
    { pattern: /\bborder-cyan-(\d+)\b/g, replacement: 'border-indigo-$1/30' },
    { pattern: /\bring-cyan-(\d+)\b/g, replacement: 'ring-indigo-$1/40' },
    { pattern: /\bhover:text-cyan-(\d+)\b/g, replacement: 'hover:text-indigo-$1' },
    { pattern: /\bfocus:ring-cyan-(\d+)\b/g, replacement: 'focus:ring-indigo-$1/50' },
  ];
  
  additionalPatterns.forEach(({ pattern, replacement }) => {
    const matches = modifiedContent.match(pattern);
    if (matches) {
      modifiedContent = modifiedContent.replace(pattern, replacement);
      changesMade.push(`Pattern cyan-* → indigo-* (${matches.length}x)`);
    }
  });
  
  return { content: modifiedContent, changes: [...new Set(changesMade)] };
}

/**
 * Process a single file
 */
function processFile(filePath, dryRun = false) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { content: modifiedContent, changes } = replaceColors(content);
    
    if (changes.length > 0) {
      if (!dryRun) {
        // Create backup
        const backupPath = filePath + '.backup';
        fs.writeFileSync(backupPath, content);
        
        // Write modified content
        fs.writeFileSync(filePath, modifiedContent);
      }
      
      console.log(`\n📁 ${filePath}`);
      console.log(`✨ Modern Color Changes (${changes.length}):`);
      changes.forEach(change => console.log(`   ${change}`));
      
      return { file: filePath, changes: changes.length };
    }
    
    return null;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run') || args.includes('-d');
  const targetDir = args.find(arg => !arg.startsWith('-')) || './';
  
  console.log('🎨 Modern Glassmorphism Color Replacement');
  console.log('=========================================');
  console.log('🔄 Converting vibrant cyan-blue → sophisticated modern colors');
  console.log(`📂 Target directory: ${path.resolve(targetDir)}`);
  console.log(`🔍 Mode: ${dryRun ? 'DRY RUN (no changes will be made)' : 'LIVE (files will be modified)'}`);
  console.log('');
  console.log('🎯 Color Transformation:');
  console.log('   Cyan-blue → Indigo/Violet/Purple palette');
  console.log('   Adding transparency for glassmorphism');
  console.log('   Modern sophisticated color scheme');
  console.log('');
  
  if (!fs.existsSync(targetDir)) {
    console.error(`❌ Directory not found: ${targetDir}`);
    process.exit(1);
  }
  
  const files = getAllFiles(targetDir);
  console.log(`📋 Found ${files.length} files to process`);
  console.log('');
  
  const results = [];
  let totalChanges = 0;
  
  files.forEach(file => {
    const result = processFile(file, dryRun);
    if (result) {
      results.push(result);
      totalChanges += result.changes;
    }
  });
  
  console.log('\n🎯 Transformation Summary');
  console.log('========================');
  console.log(`📊 Files processed: ${files.length}`);
  console.log(`✅ Files modified: ${results.length}`);
  console.log(`🔄 Total changes: ${totalChanges}`);
  console.log('');
  console.log('🎨 New Color Palette:');
  console.log('   • Primary: Indigo (sophisticated blue)');
  console.log('   • Accent: Violet (modern purple)');
  console.log('   • Deep: Purple (rich contrast)');
  console.log('   • Backgrounds: Transparent overlays');
  console.log('   • Perfect for glassmorphism UI');
  
  if (!dryRun && results.length > 0) {
    console.log('\n💾 Backup files created with .backup extension');
    console.log('🚨 Review changes and remove backups when satisfied');
  }
  
  if (dryRun) {
    console.log('\n🔍 This was a dry run. Use without --dry-run to apply changes.');
  }
}

// Show usage if help is requested
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
🎨 Modern Glassmorphism Color Replacement Script

Transforms vibrant cyan-blue colors into sophisticated modern colors
perfect for glassmorphism design systems.

Usage:
  node modern-colors.js [directory] [options]

Options:
  --dry-run, -d    Preview changes without modifying files
  --help, -h       Show this help message

Examples:
  node modern-colors.js --dry-run     # Preview changes in current directory
  node modern-colors.js ./src         # Apply changes to src directory
  node modern-colors.js ./components --dry-run  # Preview changes in components

Color Transformations:
  🔄 Cyan-blue → Indigo (sophisticated primary)
  🔄 Light cyan → Violet (modern accent)
  🔄 Dark cyan → Purple (rich depth)
  🔄 Backgrounds → Transparent glassmorphism
  🔄 All states → Consistent modern palette

Features:
  ✨ Replaces Tailwind classes and CSS colors
  🎯 Adds transparency for glassmorphism
  🔄 Updates all color states (hover, focus, active)
  💾 Creates automatic backups
  🎨 Modern indigo/violet/purple palette
  `);
  process.exit(0);
}

// Run the script
main();