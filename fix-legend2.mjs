import fs from 'fs';
let c = fs.readFileSync('src/pages/map.astro', 'utf8');

// 1. 修改图例部分
c = c.replace(
  '<div class="legend-line"></div>\r\n        <span>航线轨蜹</span>\r\n      </div>\r\n    </div>',
  `<div class="legend-line flight-line"></div>
        <span>舩线轨迹</span>
      </div>
      <div class="legend-item">
        <span class="legend-icon">🚄</span>
        <span>火车站</span>
      </div>
      <div class="legend-item">
        <div class="legend-line train-line"></div>
        <span>铁路轨迹</span>
      </div>
    </div>`
);

// 2. 修改 CSS 样式
