import fs from 'fs';
let c = fs.readFileSync('src/components/MapAlbum.astro', 'utf8');

// 7. 添加 renderTrains 函数
c = c.replace(
  'function setupControls() {',
  `// 获取火车类型颜色
  function getTrainColor(trainNumber: string): string {
    const prefix = trainNumber.charAt(0).toUpperCase();
    const colors: Record<string, string> = {
      'G': '#e74c3c', // 高铁 - 红色
      'D': '#3498db', // 动轧 - 蓝色
      'C': '#9e59b6', // 城际 - 紫色
			'Z': '#1abc9c', // 直达特快 - 青色
      'T': '#f39c12', // 特快 - 橙色
      'K': '#27ae60', // 快速 - 绿色
			'S': '#9559b6', // 市郊 - 深紫色
    };
    return colors[prefix] || '#7f8c8d';
  }

  // 渲染火车数据
  function renderTrains(trains: Train[], L: any) {
    trains.forEach(train => {
      if (!train.route || train.route.length < 2) return;
      
      // 转换坐标 - trains data format is [lng, lat]
      const latLngs = train.route.map(p => {
        const [gcjLng, gcjLat] = wgs84ToGcj02(p[0], p[1]);
        return [gcjLat, gcjLng];
      });
      
      const color = getTrainColor(train.trainNumber);
      
      // 创建铁路线
      const polyline = L.polyline(latLngs, {
        color: color,
        weight: 2.5,
        opacity: 0.8,
        smoothFactor: 1
      });
      
      // 弹窗内容
      const popupContent = \`<div class="train-popup">
        <div class="train-header" style="background: \${color}">
          <span class="train-number">\${train.trainNumber}</span>
        </div>
        <div class="train-details">
          <div class="train-route">
            <span>\${train.from}</span>
            <span class="arrow">→</span>
            <span>\${train.to}</span>
          </div>
          <div class="train-info-row">
            <span>📅 \${train.date}</span>
          </div>
          <div class="train-info-row">
            <span>🚉 \${train.stations?.length || 2} 个站点</span>
          </div>
        </div>
      </div>\`;
      
      polyline.bindPopup(popupContent, { className: 'train-popup-container' });
      
      // 添加站点标记
      const stationMarkers: any[] = [];
      if (train.stations) {
        train.stations.forEach((station, idx) => {
          const [gcjLng, gcjLat] = wgs84ToGcj02(station.lng, station.lat);
          const isEndpoint = idx === 0 || idx === train.stations.length - 1;
          
          const icon = L.divIcon({
            className: 'train-station-marker',
            html: \`<div style="background: \${color}; width: \${isEndpoint ? 12 : 8}px; height: \${isEndpoint ? 12 : 8}px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>\`,
            iconSize: [isEndpoint ? 12 : 8, isEndpoint ? 12 : 8],
            iconAnchor: [isEndpoint ? 6 : 4, isEndpoint ? 6 : 4]
          });
          
          const marker = L.marker([gcjLat, gcjLng], { icon });
          marker.bindPopup(\`<b>\${station.name}</b>\`);
          stationMarkers.push(marker);
        });
      }
      
      const trainGroup = L.layerGroup([polyline, ...stationMarkers]);
      trainLayers.push(trainGroup);
      if (showTrains) trainGroup.addTo(map);
    });
  }

  function setupControls() {`
);

fs.writeFileSync('src/components/MapAlbum.astro', c);
console.log('Step 6 done!');
