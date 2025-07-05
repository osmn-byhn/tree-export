#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function generateTree(dirPath, prefix = '') {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  let tree = '';

  entries.forEach((entry, index) => {
    const isLast = index === entries.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    const fullPath = path.join(dirPath, entry.name);

    tree += `${prefix}${connector}${entry.name}\n`;

    if (entry.isDirectory()) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      tree += generateTree(fullPath, newPrefix);
    }
  });

  return tree;
}

module.exports = { generateTree };
