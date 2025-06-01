#!/usr/bin/env node

/**
 * Backup Cleanup Script
 * Removes all .backup files created by the Modern Glassmorphism Color Replacement Script
 */

const fs = require('fs');
const path = require('path');

// File extensions that might have backup files
const sourceExtensions = ['.js', '.jsx', '.ts', '.tsx', '.html', '.vue', '.svelte', '.css', '.scss', '.sass'];

// Directories to ignore
const ignoreDirs = ['node_modules', '.git', 'dist', 'build', '.next', 'coverage'];

/**
 * Check if a directory should be ignored
 */
function shouldIgnoreDir(dirName) {
  return ignoreDirs.some(ignoreDir => dirName.includes(ignoreDir));
}

/**
 * Check if a file is a backup file
 */
function isBackupFile(filePath) {
  return filePath.endsWith('.backup');
}

/**
 * Check if backup file corresponds to a valid source file
 */
function hasValidSourceFile(backupPath) {
  const sourcePath = backupPath.replace('.backup', '');
  const ext = path.extname(sourcePath);
  return sourceExtensions.includes(ext) && fs.existsSync(sourcePath);
}

/**
 * Get all backup files recursively from a directory
 */
function getAllBackupFiles(dir, fileList = []) {
  try {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        if (!shouldIgnoreDir(file)) {
          getAllBackupFiles(filePath, fileList);
        }
      } else if (isBackupFile(filePath)) {
        fileList.push(filePath);
      }
    });
  } catch (error) {
    console.error(`❌ Error reading directory ${dir}:`, error.message);
  }
  
  return fileList;
}

/**
 * Remove a backup file
 */
function removeBackupFile(filePath, dryRun = false) {
  try {
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    
    if (!dryRun) {
      fs.unlinkSync(filePath);
    }
    
    console.log(`${dryRun ? '🔍' : '🗑️ '} ${filePath} (${sizeKB} KB)`);
    return { file: filePath, size: stats.size };
  } catch (error) {
    console.error(`❌ Error removing ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Format file size
 */
function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Get file age in days
 */
function getFileAge(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const now = new Date();
    const created = stats.mtime;
    const ageMs = now - created;
    return Math.floor(ageMs / (1000 * 60 * 60 * 24));
  } catch (error) {
    return 0;
  }
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run') || args.includes('-d');
  const force = args.includes('--force') || args.includes('-f');
  const older = args.find(arg => arg.startsWith('--older='));
  const olderDays = older ? parseInt(older.split('=')[1]) : 0;
  
  const targetDir = args.find(arg => !arg.startsWith('-')) || './';
  
  console.log('🧹 Backup File Cleanup Script');
  console.log('============================');
  console.log(`📂 Target directory: ${path.resolve(targetDir)}`);
  console.log(`🔍 Mode: ${dryRun ? 'DRY RUN (no files will be deleted)' : 'LIVE (files will be deleted)'}`);
  if (olderDays > 0) {
    console.log(`⏰ Only removing backups older than ${olderDays} days`);
  }
  console.log('');
  
  if (!fs.existsSync(targetDir)) {
    console.error(`❌ Directory not found: ${targetDir}`);
    process.exit(1);
  }
  
  const backupFiles = getAllBackupFiles(targetDir);
  
  if (backupFiles.length === 0) {
    console.log('✨ No backup files found! Directory is already clean.');
    process.exit(0);
  }
  
  console.log(`📋 Found ${backupFiles.length} backup files`);
  console.log('');
  
  // Filter files by age if specified
  const filesToRemove = backupFiles.filter(file => {
    if (olderDays > 0) {
      const age = getFileAge(file);
      return age >= olderDays;
    }
    return true;
  });
  
  if (filesToRemove.length === 0 && olderDays > 0) {
    console.log(`✨ No backup files older than ${olderDays} days found.`);
    process.exit(0);
  }
  
  // Show file analysis
  console.log('📊 Backup File Analysis:');
  console.log('------------------------');
  
  let totalSize = 0;
  const filesByAge = { today: 0, week: 0, month: 0, older: 0 };
  const orphanedFiles = [];
  
  filesToRemove.forEach(file => {
    const stats = fs.statSync(file);
    totalSize += stats.size;
    
    const age = getFileAge(file);
    if (age === 0) filesByAge.today++;
    else if (age <= 7) filesByAge.week++;
    else if (age <= 30) filesByAge.month++;
    else filesByAge.older++;
    
    // Check if source file still exists
    if (!hasValidSourceFile(file)) {
      orphanedFiles.push(file);
    }
  });
  
  console.log(`📦 Total size: ${formatFileSize(totalSize)}`);
  console.log(`📅 Age distribution: Today: ${filesByAge.today}, Week: ${filesByAge.week}, Month: ${filesByAge.month}, Older: ${filesByAge.older}`);
  
  if (orphanedFiles.length > 0) {
    console.log(`⚠️  Orphaned backups (no source file): ${orphanedFiles.length}`);
  }
  
  // Confirmation prompt (unless force mode or dry run)
  if (!dryRun && !force && filesToRemove.length > 0) {
    console.log('');
    console.log('⚠️  WARNING: This will permanently delete backup files!');
    console.log('💡 Use --dry-run to preview changes first');
    console.log('💡 Use --force to skip this confirmation');
    console.log('');
    
    // Simple confirmation for Node.js script
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.question(`Continue deleting ${filesToRemove.length} backup files? (y/N): `, (answer) => {
      rl.close();
      
      if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
        console.log('❌ Operation cancelled by user');
        process.exit(0);
      }
      
      performCleanup();
    });
    
    return;
  }
  
  performCleanup();
  
  function performCleanup() {
    console.log('');
    console.log(`${dryRun ? '🔍 Preview of files to be removed:' : '🗑️  Removing backup files:'}`);
    console.log('');
    
    const results = [];
    let removedSize = 0;
    
    filesToRemove.forEach(file => {
      const result = removeBackupFile(file, dryRun);
      if (result) {
        results.push(result);
        removedSize += result.size;
      }
    });
    
    console.log('');
    console.log('🎯 Cleanup Summary');
    console.log('==================');
    console.log(`📋 Backup files found: ${backupFiles.length}`);
    console.log(`🗑️  Files ${dryRun ? 'to be removed' : 'removed'}: ${results.length}`);
    console.log(`💾 Space ${dryRun ? 'to be freed' : 'freed'}: ${formatFileSize(removedSize)}`);
    
    if (orphanedFiles.length > 0) {
      console.log(`🔍 Orphaned backups ${dryRun ? 'to be removed' : 'removed'}: ${orphanedFiles.filter(f => filesToRemove.includes(f)).length}`);
    }
    
    if (dryRun) {
      console.log('');
      console.log('🔍 This was a dry run. Use without --dry-run to actually remove files.');
      console.log('💡 Add --force to skip confirmation prompt.');
    } else {
      console.log('');
      console.log('✅ Cleanup complete! Your project is now backup-file free.');
    }
  }
}

// Show usage if help is requested
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
🧹 Backup File Cleanup Script

Removes .backup files created by the Modern Glassmorphism Color Replacement Script.

Usage:
  node cleanup-backups.js [directory] [options]

Options:
  --dry-run, -d        Preview files to be deleted without removing them
  --force, -f          Skip confirmation prompt
  --older=DAYS         Only remove backups older than specified days
  --help, -h           Show this help message

Examples:
  node cleanup-backups.js --dry-run              # Preview cleanup in current directory
  node cleanup-backups.js ./src                  # Clean backups in src directory
  node cleanup-backups.js --force                # Clean without confirmation
  node cleanup-backups.js --older=7              # Only remove backups older than 7 days
  node cleanup-backups.js ./components --dry-run # Preview cleanup in components

Features:
  🔍 Finds all .backup files recursively
  📊 Shows file size and age analysis
  ⚠️  Identifies orphaned backups (no source file)
  💾 Displays space savings
  🛡️  Safe with confirmation prompts
  ⏰ Age-based filtering options
  
Safety Features:
  • Dry run mode for safe preview
  • Confirmation prompts (unless --force)
  • Ignores system directories
  • Detailed reporting before deletion
  `);
  process.exit(0);
}

// Run the script
main();