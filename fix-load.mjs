import fs from 'fs';
let c = fs.readFileSync('src/components/MapAlbum.astro', 'utf8');

// 添加 loadTrainData 调用
c = c.replace(
  `loadFlightData().then(flights => {
        renderFlights(flights, L);
      }).catch(err => {
        console.error('Failed to load flight data:', err);
      });
    };`,
  `loadFlightData().then(flights => {
        renderFlights(flights, L);
      }).catch(err => {
        console.error('Failed to load flight data:', err);
      });

      // 加载和渲染灮超数据
      loadTrainData().then(trains => {
        renderTrains(trains, L);
      }).catch(err => {
        console.error('Failed to load train data:', err);
      });
    };`
);

fs.writeFileSync('src/components/MapAlbum.astro', c);
console.log('Added loadTrainData call!');
