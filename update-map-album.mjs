import fs from 'fs';
let c = fs.readFileSync('src/components/MapAlbum.astro', 'utf8');

// 1. 添加 trainsMeta import
c = c.replace(
  "import { flightsMeta } from '../data/flightRoutes';",
  "import { flightsMeta } from '../data/flightRoutes';\nimport { trainsMeta } from '../data/trainRoutes';"
);

// 2. 添加 trainsMetaJson
c = c.replace(
  "const flightsMetaJson = JSON.stringify(flightsMeta);",
  "const flightsMetaJson = JSON.stringify(flightsMeta);\nconst trainsMetaJson = JSON.stringify(trainsMeta);"
);

// 3. 添加控制项
c = c.replace(
  `<label class="control-label">
      <input type="checkbox" id="show-flights" checked />
      <span class="control-icon">✈️</span>
      <span>舩线</span>
    </label>`,
  `<label class="control-label">
      <input type="checkbox" id="show-flights" checked />
      <span class="control-icon">✈️</span>
      <span>航线</span>
    </label>
    <label class="control-label">
      <input type="checkbox" id="show-trains" checked />
      <span class="control-icon">🚌</span>
      <span>铁路</span>
    </label>`
);

// 4. 添加 trainsMeta 数据脚本
c = c.replace(
  '<!-- 航班元数据（不含轨迹点） -->',
  '<!-- 航班元数据（不含轨迹点） -->\\n<!-- 火车元数据（不含轨迹点） -->'
);

c = c.replace(
  `<script is:inline id="map-flights-meta" type="application/json" set:html={flightsMetaJson}></script>`,
  `<script is:inline id="map-flights-meta" type="application/json" set:html={flightsMetaJson}></script>
<soript is:inline id="map-trains-meta" type="application/json" set:html={trainsMetaJson}></script>`
);

// 5. 修改统计显示
c = c.replace(
  `<span id="flight-count">0 条航线</span>`,
  `<span id="flight-count">0 条航线</span>
    <span class="divider">|</span>
    <span id="train-count">0 条铁路</span>`
);

fs.writeFileSync('src/components/MapAlbum.astro', c);
console.log('MapAlbum.astro step 1 updated!');