import fs from 'fs';
let c = fs.readFileSync('src/components/MapAlbum.astro', 'utf8');

// 9. 添加火车弹窗样式 (在 flight-info-panel 样式后面)
c = c.replace(
  '.flight-info-panel .close-btn:hover {',
  `/* 火车弹窗样式 */
  :global(.train-popup-container .leaflet-popup-content-wrapper) {
    padding: 0;
    border-radius: 12px;
    overflow: hidden;
  }

  :global(.train-popup-container .leaflet-popup-content) {
    margin: 0;
    min-width: 180px;
  }

  :global(.train-popup .train-header) {
    padding: 10px 14px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :global(.train-popup .train-number) {
    font-size: 18px;
    font-weight: bold;
  }

  :global(.train-popup .train-details) {
    padding: 10px 14px;
    background: var(--card-bg, #fff);
  }

  :global(.train-popup .train-route) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    color: var(--text-color, #333);
  }

  :global(.train-popup .train-route .arrow) {
    color: var(--primary, #3b82f6);
  }

  :global(.train-popup .train-info-row) {
    font-size: 12px;
    color: var(--text-muted, #666);
    margin-top: 4px;
    text-align: center;
  }

  :global(.train-station-marker) {
    background: transparent !important;
    border: none !important;
  }

  .flight-info-panel .close-btn:hover {`
);

fs.writeFileSync('src/components/MapAlbum.astro', c);
console.log('Step 8 done!');