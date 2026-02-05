import fs from 'fs';
let c = fs.readFileSync('src/components/MapAlbum.astro', 'utf8');

// 6. 添加 loadTrainData 函数(const loadFlightData 后面)
c = c.replace(
  '// 渲染航班数据',
  `// 加载火车数据
  async function loadTrainData(): Promise<Train[]> {
    try {
      const response = await fetch('/my-blog/data/trains.json');
      if (!response.ok) throw new Error('Failed to fetch trains data');
      return await response.json();
    } catch (error) {
      console.error('Error loading train data:', error);
      return [];
    }
  }

  // 渲染灮超数据`
);

fs.writeFileSync('src/components/MapAlbum.astro', c);
console.log('Step 5 done!');
