# tree-export

> Export your project folder structure as a tree in multiple formats (md, txt, mdx, png, jpg, svg).

---

## 🚀 Features

- Generate a visual tree of your folder structure easily.
- Export output in Markdown (`.md`), plain text (`.txt`), MDX (`.mdx`), and image formats (`png`, `jpg`, `svg`).
- Supports excluding files and folders based on `.gitignore`.
- Simple and user-friendly CLI interface.

---

## 📦 Installation

Install globally via npm:

```bash
npm install -g tree-export
````

Or run directly using npx without installing:

```bash
npx tree-export -d ./target-folder -o output.md -f md
```

---

## ⚙️ Usage

```bash
tree-export [options]
```

### Options

| Parameter             | Description                                            | Default                 |
| --------------------- | ------------------------------------------------------ | ----------------------- |
| `-d, --dir <path>`    | Target directory to generate the tree from             | Current directory (`.`) |
| `-o, --output <file>` | Output file path including filename                    | `tree-output.md`        |
| `-f, --format <type>` | Output format: `txt`, `md`, `mdx`, `png`, `jpg`, `svg` | `md`                    |

---

## 💡 Examples

* Export current folder structure as a Markdown file:

```bash
npx tree-export -d . -o structure.md -f md
```

* Export a specific folder structure as a plain text file:

```bash
npx tree-export -d ./src -o src-tree.txt -f txt
```

* Export folder structure as an MDX file:

```bash
npx tree-export -d ./project -o project-structure.mdx -f mdx
```

* Export folder structure as an SVG image:

```bash
npx tree-export -d ./src -o src-tree.svg -f svg
```

* Export as PNG image:

```bash
npx tree-export -d ./src -o src-tree.png -f png
```

* Export as JPG image:

```bash
npx tree-export -d ./src -o src-tree.jpg -f jpg
```

---

## 📋 Notes

* When a `.gitignore` file is detected, you will be prompted whether to exclude ignored files and folders.
* SVG output uses `<foreignObject>`, which may have limited support in some SVG viewers.
* The CLI supports relative and absolute paths for both input directory and output file.

---

## 🛠️ How It Works

* `bin/index.js` handles CLI arguments and orchestrates the process.
* `lib/tree-generator.js` reads and filters the directory tree, respecting `.gitignore` and default ignore patterns.
* `utils/export.js` generates the output in the requested format.

---

## 📝 License

MIT © \[Osman Beyhan]

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](#) and submit pull requests.

---

Happy tree exporting! 🌳🚀
