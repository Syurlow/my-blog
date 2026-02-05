import fs from 'fs';
let c = fs.readFileSync('src/components/MapAlbum.astro', 'utf8');

// 添加铁路控制类
c = c.replace(
  '<span>航线</span>\n    </label>\n  </div>',
  `<span>航线</span>
    </label>
    <label class="control-label">
      <input type="checkbox" id="show-trains" checked />
      <span class="control-icon">🚄</span>
      <span>铁路</span>
    </label>
  </div>`
);

fs.writeFileSync('src/components/MapAlbum.astro', c);
console.log('Added trains control!');
