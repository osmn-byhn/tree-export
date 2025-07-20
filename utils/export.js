const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

function resolveOutputPath(filePath) {
  return path.isAbsolute(filePath)
    ? filePath
    : path.resolve(process.cwd(), filePath);
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function exportOutput(treeString, outputFile, format) {
  const resolvedPath = resolveOutputPath(outputFile);
  const cleanTree = escapeHtml(treeString);

  try {
    if (["txt", "md", "mdx"].includes(format)) {
      fs.writeFileSync(resolvedPath, treeString, "utf8");
      console.log(`✅ Exported to ${resolvedPath}`);
    } else if (format === "svg") {
      const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
      <foreignObject width="100%" height="100%">
        <body xmlns="http://www.w3.org/1999/xhtml" style="margin:0; padding:20px; background-color: white; color: black; font-family: monospace; font-size: 14px;">
          <pre style="white-space: pre-wrap; margin: 0; padding: 0;">${cleanTree}</pre>
        </body>
      </foreignObject>
    </svg>`;
      fs.writeFileSync(resolvedPath, svg, "utf8");
      console.log(`✅ SVG file created: ${resolvedPath}`);
    } else if (format === "png" || format === "jpg") {
      const tempHtml = `
<html>
  <body style="margin:0;padding:0;">
    <pre style="font-family: monospace; font-size: 14px; white-space: pre; padding: 20px;">
${cleanTree}
    </pre>
  </body>
</html>`;

      const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();
      await page.setContent(tempHtml, { waitUntil: "networkidle0" });
      await page.setViewport({ width: 1200, height: 800 });

      if (format === "png") {
        await page.screenshot({ path: resolvedPath });
      } else {
        await page.screenshot({ path: resolvedPath, type: "jpeg" });
      }

      await browser.close();
      console.log(`✅ ${format.toUpperCase()} image created: ${resolvedPath}`);
    } else {
      console.error(`❌ Unsupported format: ${format}`);
    }
  } catch (err) {
    console.error(`❌ Error exporting: ${err.message}`);
  }
}

module.exports = { exportOutput };
