import fs from 'fs';
let c = fs.readFileSync('src/components/MapAlbum.astro', 'utf8');

const photoStyles = `
  /* 地图煕片弹出样式 */
  :global(.map-photo-popup-container .leaflet-popup-content-wrapper) {
    padding: 0;
    border-radius: 12px;
    overflow: hidden;
  }

  :global(.map-photo-popup-container .leaflet-popup-content) {
    margin: 0;
  }

  :global(.map-photo-popup) {
    text-align: center;
    padding: 12px;
    min-width: 200px;
  }

  :global(.map-photo-popup .photo-title) {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 10px;
    color: var(--text-color, #333);
  }

  :global(.map-photo-popup .photo-desc) {
    font-size: 12px;
    color: var(--text-muted, #666);
    margin-top: 8px;
  }

  :global(.map-photo-popup .photo-single-img) {
    width: 100%;
    max-width: 220px;
    height: 140px;
    object-fit: cover;
    border-radius: 8px;
  }

  /* 多图片轮播样式 */
  :global(.map-photo-popup .photo-slider) {
    position: relative;
    width: 220px;
    height: 140px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 8px;
  }

  :global(.map-photo-popup .slider-container) {
    position: relative;
    width: 100%;
    height: 100%;
  }

  :global(.map-photo-popup .slider-img) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  :global(.map-photo-popup .slider-img.active) {
    opacity: 1;
  }

  :global(.map-photo-popup .slider-dots) {
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 6px;
  }

  :global(.map-photo-popup .slider-dots .dot) {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: background 0.3s;
  }

  :global(.map-photo-popup .slider-dots .dot.active) {
    background: #fff;
  }

  :global(.map-photo-popup .slider-dots .dot:hover) {
    background: rgba(255, 255, 255, 0.8);
  }`;

const idx = c.lastIndexOf('</style>');
if (idx !== -1) {
  c = c.slice(0, idx) + photoStyles + '\n</style>';
  fs.writeFileSync('src/components/MapAlbum.astro', c);
  console.log('Added photo slider styles!');
} else {
  console.log('Could not find </style>');
}