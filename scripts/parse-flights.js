/**
 * 航班数据解析脚本
 * 用于解析 public/MapData/AIR 目录下的 Excel 文件，生成航线数据
 * 
 * 使用方法: node scripts/parse-flights.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { read, utils } from 'xlsx';

// ES Module 中获取 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const AIR_DATA_DIR = path.join(__dirname, '../public/MapData/AIR');
const OUTPUT_FILE = path.join(__dirname, '../src/data/flightRoutes.ts');

// 航空公司信息
const airlines = {
  'CA': { name: '中国国际航空', color: '#E31837' },
  'CZ': { name: '中国南方航空', color: '#004B87' },
  'MU': { name: '中国东方航空', color: '#003366' },
  '3U': { name: '四川航空', color: '#FF6600' },
  'HU': { name: '海南航空', color: '#C41230' },
  'ZH': { name: '深圳航空', color: '#00A0E9' },
  'FM': { name: '上海航空', color: '#E60012' },
  'SC': { name: '山东航空', color: '#0066B3' },
  'EU': { name: '成都航空', color: '#00A651' },
  'GS': { name: '天津航空', color: '#E4002B' },
  'JD': { name: '首都航空', color: '#FF0000' },
  'TV': { name: '西藏航空', color: '#B71C1C' },
  'PN': { name: '西部航空', color: '#4CAF50' },
  'BK': { name: '奥凯航空', color: '#FF5722' },
  'HO': { name: '吉祥航空', color: '#FF6B00' },
  '9C': { name: '春秋航空', color: '#00AA00' },
  'KN': { name: '联合航空', color: '#003087' },
  'G5': { name: '华夏航空', color: '#FF4500' },
  'AQ': { name: '九元航空', color: '#FF1493' },
  'DR': { name: '瑞丽航空', color: '#8B0000' },
};

function getAirlineColor(flightNumber) {
  const prefix = flightNumber.substring(0, 2).toUpperCase();
  return airlines[prefix]?.color || '#888888';
}

// 解析文件名获取日期和航班号
function parseFileName(filename) {
  // 格式: 22.12.15-3U8156.xlsx
  const match = filename.match(/^(\d{2}\.\d{1,2}\.\d{1,2})-([A-Z0-9]+)\.xlsx$/i);
  if (match) {
    return {
      date: match[1],
      flightNumber: match[2].toUpperCase()
    };
  }
  return null;
}

// 解析单个 Excel 文件
function parseFlightFile(filePath, fileInfo) {
  try {
    // 读取文件内容
    const fileBuffer = fs.readFileSync(filePath);
    const workbook = read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = utils.sheet_to_json(worksheet, { header: 1 });
    
    if (data.length < 2) {
      console.warn(`文件 ${filePath} 数据不足`);
      return null;
    }
    
    // 获取表头（第一行）
    const headers = data[0];
    
    // 查找列索引
    const colIndex = {
      flightNumber: headers.findIndex(h => h && h.toString().includes('航班')),
      route: headers.findIndex(h => h && h.toString().includes('起降')),
      aircraftReg: headers.findIndex(h => h && h.toString().includes('飞机编号')),
      aircraftType: headers.findIndex(h => h && h.toString().includes('机型')),
      lng: headers.findIndex(h => h && h.toString().includes('经度')),
      lat: headers.findIndex(h => h && h.toString().includes('纬度')),
      altitude: headers.findIndex(h => h && h.toString().includes('高度')),
      horizontalSpeed: headers.findIndex(h => h && h.toString().includes('水平')),
      verticalSpeed: headers.findIndex(h => h && h.toString().includes('垂直')),
      heading: headers.findIndex(h => h && h.toString().includes('航向')),
      squawk: headers.findIndex(h => h && h.toString().includes('应答')),
      timestamp: headers.findIndex(h => h && h.toString().includes('时间')),
    };
    
    // 解析数据行
    const points = [];
    let route = '';
    let aircraftReg = '';
    let aircraftType = '';
    
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (!row || row.length === 0) continue;
      
      const lng = parseFloat(row[colIndex.lng]);
      const lat = parseFloat(row[colIndex.lat]);
      
      // 跳过无效坐标
      if (isNaN(lng) || isNaN(lat) || lng === 0 || lat === 0) continue;
      
      // 获取航线信息（只取第一个非空值）
      if (!route && colIndex.route >= 0 && row[colIndex.route]) {
        route = row[colIndex.route].toString();
      }
      if (!aircraftReg && colIndex.aircraftReg >= 0 && row[colIndex.aircraftReg]) {
        aircraftReg = row[colIndex.aircraftReg].toString();
      }
      if (!aircraftType && colIndex.aircraftType >= 0 && row[colIndex.aircraftType]) {
        aircraftType = row[colIndex.aircraftType].toString();
      }
      
      points.push({
        lng,
        lat,
        altitude: parseFloat(row[colIndex.altitude]) || 0,
        horizontalSpeed: parseFloat(row[colIndex.horizontalSpeed]) || 0,
        verticalSpeed: parseFloat(row[colIndex.verticalSpeed]) || 0,
        heading: parseFloat(row[colIndex.heading]) || 0,
        squawk: row[colIndex.squawk]?.toString() || '',
        timestamp: row[colIndex.timestamp]?.toString() || '',
      });
    }
    
    if (points.length === 0) {
      console.warn(`文件 ${filePath} 没有有效的轨迹点`);
      return null;
    }
    
    // 解析起降地
    let departure = '';
    let arrival = '';
    if (route) {
      // 尝试多种分隔符
      const routeParts = route.split(/[-→>]/).map(s => s.trim()).filter(Boolean);
      if (routeParts.length >= 2) {
        departure = routeParts[0];
        arrival = routeParts[routeParts.length - 1];
      }
    }
    
    return {
      id: `${fileInfo.date}-${fileInfo.flightNumber}`,
      flightNumber: fileInfo.flightNumber,
      date: fileInfo.date,
      route,
      departure,
      arrival,
      aircraftReg,
      aircraftType,
      points,
      color: getAirlineColor(fileInfo.flightNumber),
    };
  } catch (error) {
    console.error(`解析文件 ${filePath} 失败:`, error.message);
    return null;
  }
}

// 主函数
async function main() {
  console.log('开始解析航班数据...');
  console.log(`数据目录: ${AIR_DATA_DIR}`);
  
  // 检查目录是否存在
  if (!fs.existsSync(AIR_DATA_DIR)) {
    console.error(`目录不存在: ${AIR_DATA_DIR}`);
    process.exit(1);
  }
  
  // 获取所有 xlsx 文件
  const files = fs.readdirSync(AIR_DATA_DIR).filter(f => f.endsWith('.xlsx'));
  console.log(`找到 ${files.length} 个航班文件`);
  
  const flights = [];
  
  for (const file of files) {
    const fileInfo = parseFileName(file);
    if (!fileInfo) {
      console.warn(`无法解析文件名: ${file}`);
      continue;
    }
    
    console.log(`解析: ${file} (${fileInfo.date} ${fileInfo.flightNumber})`);
    
    const filePath = path.join(AIR_DATA_DIR, file);
    const flightData = parseFlightFile(filePath, fileInfo);
    
    if (flightData) {
      flights.push(flightData);
      console.log(`  ✓ ${flightData.points.length} 个轨迹点, 航线: ${flightData.route || '未知'}`);
    }
  }
  
  // 按日期排序
  flights.sort((a, b) => {
    const dateA = a.date.split('.').map(Number);
    const dateB = b.date.split('.').map(Number);
    // 比较年、月、日
    for (let i = 0; i < 3; i++) {
      if (dateA[i] !== dateB[i]) return dateA[i] - dateB[i];
    }
    return 0;
  });
  
  // 生成 TypeScript 文件
  const output = `// 航班路线数据
// 此文件由 scripts/parse-flights.js 自动生成
// 生成时间: ${new Date().toISOString()}
// 请勿手动编辑

import type { FlightInfo } from '../types/flight';

export const flightRoutes: FlightInfo[] = ${JSON.stringify(flights, null, 2)};

// 获取所有航班
export function getAllFlights(): FlightInfo[] {
  return flightRoutes;
}

// 获取航班统计
export function getFlightStats() {
  const flights = flightRoutes;
  const airlines = new Set(flights.map(f => f.flightNumber.substring(0, 2)));
  const airports = new Set<string>();
  
  flights.forEach(f => {
    if (f.departure) airports.add(f.departure);
    if (f.arrival) airports.add(f.arrival);
  });
  
  return {
    totalFlights: flights.length,
    totalAirlines: airlines.size,
    totalAirports: airports.size,
    airlines: Array.from(airlines),
    airports: Array.from(airports),
  };
}

// 按航空公司分组
export function getFlightsByAirline(): Record<string, FlightInfo[]> {
  const grouped: Record<string, FlightInfo[]> = {};
  
  flightRoutes.forEach(flight => {
    const airline = flight.flightNumber.substring(0, 2);
    if (!grouped[airline]) {
      grouped[airline] = [];
    }
    grouped[airline].push(flight);
  });
  
  return grouped;
}

// 按年份分组
export function getFlightsByYear(): Record<string, FlightInfo[]> {
  const grouped: Record<string, FlightInfo[]> = {};
  
  flightRoutes.forEach(flight => {
    const year = '20' + flight.date.split('.')[0];
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(flight);
  });
  
  return grouped;
}
`;
  
  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');
  
  console.log('\n========== 解析完成 ==========');
  console.log(`总计: ${flights.length} 个航班`);
  console.log(`输出: ${OUTPUT_FILE}`);
  
  // 统计信息
  const airlines = new Set(flights.map(f => f.flightNumber.substring(0, 2)));
  console.log(`航空公司: ${Array.from(airlines).join(', ')}`);
}

main().catch(console.error);
