import fs from 'fs';
let c = fs.readFileSync('src/components/MapAlbum.astro', 'utf8');

// 修复锄路 -> 铁路
c = c.replace(/锄路/g, '铄路');

fs.writeFileSync('src/components/MapAlbum.astro', c);
console.log('Fixed typo!');
