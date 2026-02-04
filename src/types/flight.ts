// 航班轨迹点数据
export interface FlightPoint {
  flightNumber: string;      // 航班号
  route: string;             // 起降地
  aircraftReg: string;       // 飞机编号
  aircraftType: string;      // 机型
  lng: number;               // 经度
  lat: number;               // 纬度
  altitude: number;          // 高度 (英尺)
  horizontalSpeed: number;   // 水平速度 (节)
  verticalSpeed: number;     // 垂直速度 (英尺/分钟)
  heading: number;           // 航向 (度)
  squawk: string;            // 应答码
  timestamp: string;         // 时间
}

// 航班信息（处理后的数据）
export interface FlightInfo {
  id: string;                // 唯一标识 (日期-航班号)
  flightNumber: string;      // 航班号
  date: string;              // 日期
  route: string;             // 起降地 (如: PEK-SHA)
  departure: string;         // 出发地
  arrival: string;           // 目的地
  aircraftReg: string;       // 飞机编号
  aircraftType: string;      // 机型
  points: FlightPoint[];     // 轨迹点数组
  color?: string;            // 航线颜色
}

// 航班数据集合
export interface FlightData {
  flights: FlightInfo[];
  lastUpdated: string;
}

// 获取航空公司信息
export function getAirlineInfo(flightNumber: string): { name: string; color: string } {
  const prefix = flightNumber.substring(0, 2).toUpperCase();
  
  const airlines: Record<string, { name: string; color: string }> = {
    'CA': { name: '中国国际航空', color: '#E31837' },      // 国航红
    'CZ': { name: '中国南方航空', color: '#004B87' },      // 南航蓝
    'MU': { name: '中国东方航空', color: '#003366' },      // 东航深蓝
    '3U': { name: '四川航空', color: '#FF6600' },          // 川航橙
    'HU': { name: '海南航空', color: '#C41230' },          // 海航红
    'ZH': { name: '深圳航空', color: '#00A0E9' },          // 深航蓝
    'FM': { name: '上海航空', color: '#E60012' },          // 上航红
    'SC': { name: '山东航空', color: '#0066B3' },          // 山航蓝
    'EU': { name: '成都航空', color: '#00A651' },          // 成航绿
    'GS': { name: '天津航空', color: '#E4002B' },          // 天航红
    'JD': { name: '首都航空', color: '#FF0000' },          // 首航红
    'TV': { name: '西藏航空', color: '#B71C1C' },          // 藏航红
    'PN': { name: '西部航空', color: '#4CAF50' },          // 西部绿
    'BK': { name: '奥凯航空', color: '#FF5722' },          // 奥凯橙
    'HO': { name: '吉祥航空', color: '#FF6B00' },          // 吉祥橙
    '9C': { name: '春秋航空', color: '#00AA00' },          // 春秋绿
    'KN': { name: '联合航空', color: '#003087' },          // 联航蓝
    'G5': { name: '华夏航空', color: '#FF4500' },          // 华夏橙红
    'AQ': { name: '九元航空', color: '#FF1493' },          // 九元粉
    'DR': { name: '瑞丽航空', color: '#8B0000' },          // 瑞丽深红
    'CN': { name: '大新华航空', color: '#B22222' },        // 大新华红
    'NS': { name: '河北航空', color: '#228B22' },          // 河北绿
    'Y8': { name: '扬子江航空', color: '#4169E1' },        // 扬子江蓝
  };
  
  return airlines[prefix] || { name: '未知航空', color: '#888888' };
}