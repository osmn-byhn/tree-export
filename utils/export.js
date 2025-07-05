const fs = require('fs');
const { createCanvas } = require('canvas');
const { convert } = require('svg-to-img');

async function exportOutput(treeString, outputFile, format) {
  switch (format) {
    case 'txt':
    case 'md':
    case 'mdx':
      fs.writeFileSync(outputFile, treeString);
      console.log(`✅ Exported to: ${outputFile}`);
      break;

    case 'svg':
      const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
          <foreignObject width="100%" height="100%">
            <pre xmlns="http://www.w3.org/1999/xhtml" style="font-family: monospace; white-space: pre;">${treeString}</pre>
          </foreignObject>
        </svg>`;
      fs.writeFileSync(outputFile, svgContent);
      console.log(`✅ SVG file created: ${outputFile}`);
      break;

    case 'png':
    case 'jpg':
      const tempSvg = 'temp_tree.svg';
      await exportOutput(treeString, tempSvg, 'svg');
      const imgBuffer = await convert(tempSvg, format);
      fs.writeFileSync(outputFile, imgBuffer);
      fs.unlinkSync(tempSvg);
      console.log(`✅ ${format.toUpperCase()} image created: ${outputFile}`);
      break;

    default:
      console.error(`❌ Unsupported format: ${format}`);
  }
}

module.exports = { exportOutput };
