import fs from 'fs';
let c = fs.readFileSync('src/components/MapAlbum.astro', 'utf8');

// 3. 解析 trainsMeta
c = c.replace(
  "const flightsMetaScript = document.getElementById('map-flights-meta');",
  `const flightsMetaScript = document.getElementById('map-flights-meta');
    const trainsMetaScript = document.getElementById('map-trains-meta');`
);

c = c.replace(
  'let flightsMeta: any[] = [];',
  `let flightsMeta: any[] = [];
    let trainsMeta: any[] = [];`
);

c = c.replace(
  "flightsMeta = JSON.parse(flightsMetaScript?.textContent || '[]');",
  `flightsMeta = JSON.parse(flightsMetaScript?.textContent || '[]');
      trainsMeta = JSON.parse(trainsMetaScript?.textContent || '[]');`
);

fs.writeFileSync('src/components/MapAlbum.astro', c);
console.log('Step 3 done!');
