import fs from 'fs';
let c = fs.readFileSync('src/components/MapAlbum.astro', 'utf8');

// 添加轮播的事件处理
const sliderJs = `
      // 多图片轮播事件处理
      document.addEventListener('click', e => {
        const dot = e.target.closest('.slider-dots .dot');
        if (dot) {
          const index = parseInt(dot.dataset.index);
          const slider = dot.closest('.photo-slider');
          if (slider) {
            slider.querySelectorAll('.slider-img').forEach((img, i) => {
              img.classList.toggle('active', i === index);
            });
            slider.querySelectorAll('.dot').forEach((d, i) => {
              d.classList.toggle('active', i === index);
            });
          }
        }
      });`;

// 找到 initMap 函数的开头
const idx = c.indexOf('function initMap() {');
if (idx !== -1) {
  c = c.slice(0, idx) + sliderJs + '\n\n  ' + c.slice(idx);
  fs.writeFileSync('src/components/MapAlbum.astro', c);
  console.log('Added slider click handler!');
} else {
  console.log('Could not find initMap');
}