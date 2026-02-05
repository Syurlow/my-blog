import fs from 'fs';
let c = fs.readFileSync('src/pages/map.astro', 'utf8');

// 1. 修改图例部分
const oldLegend = '<div class="legend-line"></div>';
const newLegend = '<div class="legend-line flight-line"></div>';
c = c.replace(oldLegend, newLegend);

// 2. 添加火车图例
const legendEnd = '<span>航线轨迹</span>\r\n      </div>\r\n    </div>';
const newLegendItems = `<span>舩线轨迹</span>
      </div>
      <div class="legend-item">
        <span class="legend-icon">🚄</span>
        <span>火车站</span>
      </div>
      <div class="legend-item">
        <div class="legend-line train-line"></div>
        <span>铁路轨迹</span>
      </div>
    </div>`;
c = c.replace(legendEnd, newLegendItems);

// 3. 修改 CSS样式
const oldCss = `.legend-line {
    width: 30px;
    height: 3px;
    background: linear-gradient(90deg, #004B87, #E31837, #FF6600);
    border-radius: 2px;
  }`;
const newCss = `.legend-line {
    width: 30px;
    height: 3px;
    border-radius: 2px;
  }

  .legend-line.flight-line {
    background: linear-gradient(90deg, #004B87, #E31837, #FF6600);
  }

  .legend-line.train-line {
    background: linear-gradient(90deg, #e74c3c, #3498db, #27ae60);
  }`;
c = c.replace(oldCss, newCss);

fs.writeFileSync('src/pages/map.astro', c);
console.log('Fixed legend!');
