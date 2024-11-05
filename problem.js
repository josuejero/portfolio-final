#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import clipboard from 'clipboardy';
import readline from 'readline';

const OUTPUT_FILE_PATH = 'all_code.txt';
const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB

const EXCLUDE_DIRS = new Set([
  'node_modules',
  '.next',
  'venv',
  '.git',
  '__pycache__'
]);

const EXCLUDE_FILES = new Set([
  'package-lock.json',
  OUTPUT_FILE_PATH,
  '.DS_Store'
]);

const ALLOWED_EXTENSIONS = new Set([
  '.md',
  '.json',
  '.mjs',
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.css',
  '.module.css',
  '.scss',
  '.txt',
  '.yml',
  '.yaml',
  '.tf',
  '.py',
  '.local',
  '.ini',
  '.gitignore',
  ''
]);

const ALLOWED_FILENAMES = new Set(['Dockerfile']);

// Initialize output file
try {
  fs.writeFileSync(OUTPUT_FILE_PATH, '');
} catch (error) {
  console.error(`Error initializing '${OUTPUT_FILE_PATH}':`, error);
  process.exit(1);
}

// Function to ask a single question
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// Function to get multiline input from user
async function getMultilineInput(promptMessage) {
  console.log(promptMessage);
  console.log("Type 'END' on a new line to finish.");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const lines = [];

  for await (const line of rl) {
    if (line.trim().toUpperCase() === 'END') {
      rl.close();
      break;
    }
    lines.push(line);
  }

  return lines.join('\n');
}

// Function to process directory
function processDirectory(dirPath) {
  try {
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        if (!EXCLUDE_DIRS.has(item)) {
          processDirectory(fullPath);
        }
      } else {
        if (EXCLUDE_FILES.has(item)) {
          continue;
        }

        const ext = path.extname(item);
        if (ALLOWED_EXTENSIONS.has(ext) || ALLOWED_FILENAMES.has(item)) {
          try {
            const content = fs.readFileSync(fullPath, 'utf8');
            const relativePath = path.relative('.', fullPath);

            const separator = '='.repeat(80);
            const fileContent = `\n${separator}\nFile: ${relativePath}\n${separator}\n\n${content}\n`;

            fs.appendFileSync(OUTPUT_FILE_PATH, fileContent);
          } catch (error) {
            console.error(`Error reading file '${fullPath}':`, error);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error during directory traversal:', error);
    process.exit(1);
  }
}

(async () => {
  try {
    // Get problem description from user
    const problemMessage = await getMultilineInput('Enter the problem with the code:');

    // Write initial content to file
    try {
      fs.appendFileSync(OUTPUT_FILE_PATH, `${problemMessage}\n\n`);
      fs.appendFileSync(
        OUTPUT_FILE_PATH,
        'This is a website I am working on. Please analyze the project structure, errors, and code carefully:\n\n'
      );
    } catch (error) {
      console.error(`Error writing to '${OUTPUT_FILE_PATH}':`, error);
      process.exit(1);
    }

    // Get and write directory tree
    try {
      const treeOutput = execSync('tree -I "node_modules|.next|venv|.git"', { encoding: 'utf8' });
      fs.appendFileSync(OUTPUT_FILE_PATH, treeOutput + '\n');
    } catch (error) {
      console.error('Error executing tree command:', error);
      process.exit(1);
    }

    // Process the current directory
    processDirectory('.');

    // Check file size and copy to clipboard
    try {
      const fileSize = fs.statSync(OUTPUT_FILE_PATH).size;
      const mbSize = fileSize / (1024 * 1024);

      if (fileSize > MAX_FILE_SIZE) {
        console.log(`Warning: The file '${OUTPUT_FILE_PATH}' exceeds 500 MB (${mbSize.toFixed(2)} MB).`);
        console.log('Copying such a large amount of data to the clipboard may cause issues.');

        const response = await askQuestion('Do you want to proceed with copying to clipboard? (y/N): ');

        if (response.trim().toLowerCase() !== 'y') {
          console.log('Skipping copying to clipboard.');
          console.log(`All steps completed, '${OUTPUT_FILE_PATH}' has been updated.`);
          process.exit(0);
        }

        console.log('Proceeding to copy to clipboard. This may take some time.');
      } else {
        console.log(`The file size of '${OUTPUT_FILE_PATH}' is ${mbSize.toFixed(2)} MB.`);
      }

      // Copy to clipboard
      const fileContent = fs.readFileSync(OUTPUT_FILE_PATH, 'utf8');
      clipboard.writeSync(fileContent);

      console.log(`All steps completed, '${OUTPUT_FILE_PATH}' has been updated.`);
      console.log('Its contents have been copied to the clipboard.');

    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('Memory')) {
          console.error('MemoryError: The file is too large to copy to the clipboard.');
        } else {
          console.error('Error copying to clipboard:', error);
        }
      }
      console.log('Proceeding without copying to clipboard.');
    }
  } catch (err) {
    console.error('An unexpected error occurred:', err);
    process.exit(1);
  }
})();
