#!/usr/bin/env node

const { program } = require("commander");
const path = require("path");
const { generateTree, createTree } = require("../lib/tree-generator");
const { exportOutput } = require("../utils/export");

program
  .version("1.0.0")
  .description("Export folder structure as a tree")
  .option("-d, --dir <directory>", "Target directory", ".")
  .option(
    "-o, --output <file>",
    "Output file (default: tree-output.md)",
    "tree-output.md",
  )
  .option(
    "-f, --format <type>",
    "Output format: txt, md, mdx, png, jpg, svg",
    "md",
  )
  .parse(process.argv);

const options = program.opts();

const targetDir = path.resolve(process.cwd(), options.dir);
const outputPath = path.isAbsolute(options.output)
  ? options.output
  : path.resolve(process.cwd(), options.output);

// ✅ Corrected function name
(async () => {
  const tree = await createTree(targetDir); // use generateTree instead of createTree
  await exportOutput(tree, outputPath, options.format);
})();
