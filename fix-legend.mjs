import fs from 'fs';
let c = fs.readFileSync('src/pages/map.astro', 'utf8');

// 添加火车图例
c = c.replace(
  `<div class="legend-item">
        <div class="legend-line"></div>
        <span>航线轨迹</span>
      </div>`,
  `<div class="legend-item">
        <div class="legend-line flight-line"></div>
        <span>舩线轨迹</span>
      </div>
      <div class="legend-item">
        <span class="legend-icon">🚄</span>
        <span>火车站</span>
      </div>
      <div class="legend-item">
        <div class="legend-line train-line"></div>
        <span>铁路轨迹</span>
      </div>`
);

// 添加 CSS 样式
c = c.replace(
  `.legend-line {
    width: 30px;
    height: 3px;
    background: linear-gradient(90deg, #004B87, #E31837, #FF6600);
    border-radius: 2px;
  }`,
  `.legend-line {
    width: 30px;
    height: 3px;
    border-radius: 2px;
  }

  .legend-line.flight-line {
    background: linear-gradient(90deg, #004B87, #E31837, #FF6600);
  }

  .legend-line.train-line {
    background: linear-gradient(90deg, #e74c3c, #3498db, #27c60a);
  }`
);

fs.writeFileSync('src/pages/map.astro', c);
console.log('Added train legend!');
