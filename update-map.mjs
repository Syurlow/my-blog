import fs from 'fs';
let c = fs.readFileSync('src/pages/map.astro', 'utf8');

// 1. 添加 trainRoutes import
c = c.replace(
  "import { flightsMeta, getFlightStats } from '../data/flightRoutes';",
  "import { flightsMeta, getFlightStats } from '../data/flightRoutes';\nimport { trainsMeta, getTrainStats } from '../data/trainRoutes';"
);

// 2. 修改统计信息
c = c.replace(
  "const stats = getFlightStats();",
  "const flightStats = getFlightStats();\nconst trainStats = getTrainStats();"
);

c = c.replace(
  "const flightCount = stats.totalFlights;",
  "const flightCount = flightStats.totalFlights;"
);

c = c.replace(
  "const airlineCount = stats.totalAirlines;",
  "const trainCount = trainStats.totalTrips;\nconst stationCount = trainStats.totalStations;"
);

// 3. 修改统计卡片 - 替换航司为火车
c = c.replace(
  '<span class="stat-icon">🏢</span>',
  '<span class="stat-icon">🚄</span>'
);
c = c.replace(
  '<span class="stat-value">{airlineCount}</span>',
  '<span class="stat-value">{trainCount}</span>'
);
c = c.replace(
  '<span class="stat-label">航司</span>',
  '<span class="stat-label">火车</span>'
);

fs.writeFileSync('src/pages/map.astro', c);
console.log('map.astro updated!');
