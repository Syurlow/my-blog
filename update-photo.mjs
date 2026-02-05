import fs from 'fs';
let c = fs.readFileSync('src/components/MapAlbum.astro', 'utf8');

// 查找并替换照片弹出的代码
const lines = c.split('\n');
let startLine = -1;
let endLine = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('const popupContent = `') && lines[i+1]?.includes('text-align: center')) {
    startLine = i;
  }
  if (startLine !== -1 && lines[i].includes("marker.bindPopup(popupContent)")) {
    endLine = i;
    break;
  }
}

console.log('Found lines:', startLine, 'to', endLine);

if (startLine !== -1 && endLine !== -1) {
  const newCode = `        // 处理多图片或单图片
        const images = photo.images || (photo.imageUrl ? [photo.imageUrl] : []);
        const imageCount = images.length;
        const uniqueId = 'photo-' + Math.random().toString(36).substr(2, 8);
        
        let imageHTML = '';
        if (imageCount === 1) {
          imageHTML = \`<img src="\${images[0]}" alt="\${photo.title}" class="photo-single-img">\`;
        } else if (imageCount > 1) {
          imageHTML = \`
            <div class="photo-slider" id="\${uniqueId}">
              <div class="slider-container">\${images.map((img, idx) => \`<img src="\${img}" class="slider-img \${idx === 0 ? 'active' : ''}" data-index="\${idx}">\`).join('')}</div>
              <div class="slider-dots">\${images.map((_, idx) => \`<span class="dot \${idx === 0 ? 'active' : ''}" data-index="\${idx}"></span>\`).join('')}</div>
            </div>\`;
        }
        
        const popupContent = \`
          <div class="map-photo-popup">
            <h3 class="photo-title">\${photo.title}</h3>
            \${imageHTML}
            \${photo.description ? \`<p class="photo-desc">\${photo.description}</p>\` : ''}
          </div>
        \`;
        
        marker.bindPopup(popupContent, { className: 'map-photo-popup-container', maxWidth: 280 });`;

  const before = lines.slice(0, startLine);
  const after = lines.slice(endLine + 1);
  
  c = [...before, newCode, ...after].join('\n');
  
  fs.writeFileSync('src/components/MapAlbum.astro', c);
  console.log('Updated photo popup for multi-image support!');
} else {
  console.log('Could not find the pattern');
}