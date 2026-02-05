import fs from 'fs';
let c = fs.readFileSync('src/components/MapAlbum.astro', 'utf8');

// 8. 添加火车控制事件
c = c.replace(
  `if (showFlightsCheckbox) {
      showFlightsCheckbox.addEventListener('change', () => {
        showFlights = showFlightsCheckbox.checked;
        flightLayers.forEach(layer => {
          if (showFlights) {
            layer.addTo(map);
          } else {
            map.removeLayer(layer);
          }
        });
      });
    }`,
  `if (showFlightsCheckbox) {
      showFlightsCheckbox.addEventListener('change', () => {
        showFlights = showFlightsCheckbox.checked;
        flightLayers.forEach(layer => {
          if (showFlights) {
            layer.addTo(map);
          } else {
            map.removeLayer(layer);
          }
        });
      });
    }

    const showTrainsCheckbox = document.getElementById('show-trains') as HTMLInputElement;
    if (showTrainsCheckbox) {
      showTrainsCheckbox.addEventListener('change', () => {
        showTrains = showTrainsCheckbox.checked;
        trainLayers.forEach(layer => {
          if (showTrains) {
            layer.addTo(map);
          } else {
            map.removeLayer(layer);
          }
        });
      });
    }`
);

fs.writeFileSync('src/components/MapAlbum.astro', c);
console.log('Step 7 done!');
