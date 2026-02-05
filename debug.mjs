import fs from 'fs';
let c = fs.readFileSync('src/components/MapAlbum.astro', 'utf8');

// 查找并打印上下文
const pattern = "console.error('Failed to load flight data:', err)";
const idx = c.indexOf(pattern);
if (idx === -1) {
  console.log('Pattern not found');
} else {
  // 找到 });\r\n    };  的位置
  const after = c.substring(idx + pattern.length, idx + pattern.length + 50);
  console.log('After pattern:', JSON.stringify(after));
}
