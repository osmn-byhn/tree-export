const fs = require("fs");
const fsp = fs.promises;
const path = require("path");
const readline = require("readline");
const ignore = require("ignore");

const IGNORED_DIRS = ["node_modules", ".git", ".next", "dist", "build"];

async function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer.toLowerCase());
    }),
  );
}

async function generateTree(dirPath, prefix = "", ig = null) {
  const entries = await fsp.readdir(dirPath, { withFileTypes: true });

  let tree = "";

  const visibleEntries = entries.filter((entry) => {
    const fullPath = path.join(dirPath, entry.name);

    if (IGNORED_DIRS.includes(entry.name)) return false;

    if (ig && !ig.accepts(path.relative(process.cwd(), fullPath))) {
      return false;
    }

    return true;
  });

  for (let index = 0; index < visibleEntries.length; index++) {
    const entry = visibleEntries[index];
    const isLast = index === visibleEntries.length - 1;
    const connector = isLast ? "└── " : "├── ";
    const fullPath = path.join(dirPath, entry.name);

    tree += `${prefix}${connector}${entry.name}\n`;

    if (entry.isDirectory()) {
      const newPrefix = prefix + (isLast ? "    " : "│   ");
      tree += await generateTree(fullPath, newPrefix, ig);
    }
  }

  return tree;
}

async function createTree(dirPath) {
  let ig = null;
  const gitignorePath = path.join(dirPath, ".gitignore");

  if (fs.existsSync(gitignorePath)) {
    const answer = await askQuestion(
      `.gitignore file detected. Do you want to exclude the ignored files from the export? (y/n): `,
    );

    if (answer === "y") {
      const gitignoreContent = await fsp.readFile(gitignorePath, "utf8");
      ig = ignore().add(gitignoreContent);
    }
  }

  const tree = await generateTree(dirPath, "", ig);
  return tree;
}

module.exports = { createTree };
