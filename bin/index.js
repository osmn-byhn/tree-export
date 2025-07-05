#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const { generateTree } = require('../lib/tree-generator');
const { exportOutput } = require('../utils/export');

program
  .version('1.0.0')
  .description('Export folder structure as a tree')
  .option('-d, --dir <directory>', 'Target directory', '.')
  .option('-o, --output <file>', 'Output file (default: tree-output.md)', 'tree-output.md')
  .option('-f, --format <type>', 'Output format: txt, md, mdx, png, jpg, svg', 'md')
  .parse(process.argv);

const options = program.opts();

// ✅ always resolve target directory relative to where user is
const targetDir = path.resolve(process.cwd(), options.dir);

// ✅ always resolve output file relative to where user is
const outputPath = path.isAbsolute(options.output)
  ? options.output
  : path.resolve(process.cwd(), options.output);

// 🔧 generate tree and export it
const tree = generateTree(targetDir);
exportOutput(tree, outputPath, options.format);
