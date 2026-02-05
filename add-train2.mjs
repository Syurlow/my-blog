import fs from 'fs';
let c = fs.readFileSync('src/components/MapAlbum.astro', 'utf8');

// 1. 添加 trainLayers 和� showTrains 全局变量
c = c.replace(
  'let showFlights = true;',
  `let showFlights = true;
  let trainLayers: any[] = [];
  let showTrains = true;`
);

// 2. 添加 Train interface
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

fs.writeFileSync('src/components/MapAlbum.astro', c);
console.log('Step 2 done!');
