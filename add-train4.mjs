import fs from 'fs';
let c = fs.readFileSync('src/components/MapAlbum.astro', 'utf8');

// 4. 更新统计显示
c = c.replace(
  "if (flightCountEl) flightCountEl.textContent = `${flightsMeta.length} 条航线`;",
  `if (flightCountEl) flightCountEl.textContent = \`\${flightsMeta.length} 条航线\`;
    const trainCountEl = document.getElementById('train-count');
    if (trainCountEl) trainCountEl.textContent = \`\${trainsMeta.length} 条铁路\`;`
);

// 5. 在加载完航班数据后加载火车数据
c = c.replace(
  `loadFlightData().then(flights => {
        renderFlights(flights, L);
      }).catch(err => {
        console.error('Failed to load flight data:', err);
      });`,
  `loadFlightData().then(flights => {
        renderFlights(flights, L);
      }).catch(err => {
        console.error('Failed to load flight data:', err);
      });

      // 加载火车数据
      loadTrainData().then(trains => {
        renderTrains(trains, L);
      }).catch(err => {
        console.error('Failed to load train data:', err);
      });`
);

fs.writeFileSync('src/components/MapAlbum.astro', c);
console.log('Step 4 done!');
