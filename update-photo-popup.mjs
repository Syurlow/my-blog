import fs from 'fs';
let c = fs.readFileSync('src/components/MapAlbum.astro', 'utf8');

// 更新照片弹出内容，支持多图片轮播
const oldPopup = `const popupContent = \\`
          <div style="text-align: center; min-width: 180px;">
            <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 8px;">\\${photo.title}</h3>
            <img src="\\${photo.imageUrl}" alt="\\${photo.title}" 
                 style="width: 100%; max-width: 180px; height: 100px; object-fit: cover; border-radius: 6px; margin-bottom: 8px;"
                 onerror="this.style.display='none'">
            <p style="font-size: 12px; color: #666;">\\${photo.description || ''}</p>
          </div>
        \\`;`;

const newPopup = `// 处理多图片或单图片
        const images = photo.images || (photo.imageUrl ? [photo.imageUrl] : []);
        const imageCount = images.length;
        const uniqueId = 'photo-' + Math.random().toString(36).substr(7);
        
        let imageHTML = '';
        if (imageCount === 1) {
          imageHTML = \\`<img src="\\${images[0]}" alt="\\${photo.title}" style="width:100%;max-width:200px;height:120px;object-fit:cover;border-radius:6px;">\\`;
        } else if (imageCount > 1) {
          imageHTML = \\`
            <div class="photo-slider" id="\\${uniqueId}">
              <div class="slider-container">\\${images.map((img, idx) => \\`<img src="\\${img}" class="slider-img \\${idx === 0 ? 'active' : ''}" data-index="\\${idx}">\\`).join('')}</div>
              <div class="slider-dots">\\${images.map((_, idx) => \\`<span class="dot \\${idx === 0 ? 'active' : ''}" data-index="\\${idx}"></span>\\`).join('')}</div>
            </div>\\`;
        }
        
        const popupContent = \\`
          <div class="photo-popup">
            <h3 class="photo-title">\\${photo.title}</h3>
            \\${imageHTML}
            \\${photo.description ? \\`<p class="photo-desc">\\${photo.description}</p>\\` : ''}
          </div>
        \\`;`;

if (c.includes('photo.imageUrl}" alt="')) {
  c = c.replace(oldPopup, newPopup);
  console.log('Updated photo popup for multi-image support');
} else {
  console.log('Pattern not found or already updated');
}

fs.writeFileSync('src/components/MapAlbum.astro', c);