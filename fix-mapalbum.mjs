import fs from 'fs';
let c = fs.readFileSync('src/components/MapAlbum.astro', 'utf8');

// 1. 修复 soript -> script
c = c.replace('<soript is:inline id="map-trains-meta"', '<script is:inline id="map-trains-meta"');

// 2. 添加火车控制复选框
c = c.replace(
  '<span>航线</span>\n    </label>\n  </div>',
  `<span>舩线</span>
    </label>
    <label class="control-label">
      <input type="checkbox" id="show-trains" checked />
      <span class="control-icon">🚄</span>
      <span>铁路</span>
    </label>
  </div>`
);

// 3. 添加全局变量 trainLayers 和 showTrains
c = c.replace(
  'let showFlights = true;',
  `let showFlights = true;
  let trainLayers: any[] = [];
  let showTrains = true;`
);

// 4. 添加 Train interface
c = c.replace(
  'interface Flight {',
  `interface Train {
    id: string;
    trainNumber: string;
    date: string;
    from: string;
    to: string;
    stations: { name: string; lat: number; lng: number; }[];
    route: [number, number][];
  }

  interface Flight {`
);

// 5. 解析 trainsMeta 并更新统计
c = c.replace(
  `const flightsMetaScript = document.getElementById('map-flights-meta');
    
    let photos: Photo[] = [];
    let flightsMeta: any[] = [];`,
  `const flightsMetaScript = document.getElementById('map-flights-meta');
    const trainsMetaScript = document.getElementById('map-trains-meta');
    
    let photos: Photo[] = [];
    let flightsMeta: any[] = [];
    let trainsMeta: any[] = [];`
);

c = c.replace(
  'flightsMeta = JSON.parse(flightsMetaScript?.textContent || \\'[]\\');',
  `flightsMeta = JSON.parse(flightsMetaScript?.textContent || '[]');
      trainsMeta = JSON.parse(trainsMetaScript?.textContent || '[]');`
);

c = c.replace(
  "if (flightCountEl) flightCountEl.textContent = `${flightsMeta.length} 条航线`;",
  `if (flightCountEl) flightCountEl.textContent = `${flightsMeta.length} 条航线`;
    const trainCountEl = document.getElementById('train-count');
    if (trainCountEl) trainCountEl.textContent = \`${trainsMeta.length} 条铁路\`;`
);

fs.writeFileSync('src/components/MapAlbum.astro', c);
console.log('Step 1 complete!');