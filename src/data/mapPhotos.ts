export interface MapPhoto {
  id: string;
  title: string; // 地点名称
  description?: string; // 简短描述
  imageUrl: string; // 照片路径
  lat: number; // 纬度
  lng: number; // 经度
}

export const mapPhotos: MapPhoto[] = [
  {
    id: "1",
    title: "❄️寒潮来袭www❄️",
    description: "与千琴老师的合照www",
    imageUrl: "/assets/images/banner02.jpg", // 替换成你自己的图片路径
    lat: 45.729715, // 如何获取坐标见文末
    lng: 126.617884,
  },
  {
    id: "2",
    title: "调戏小萝莉",
    description: "与静树的合照www",
    imageUrl: "/assets/images/banner04.jpg",
    lat: 30.506907,
    lng: 114.241734,
  },
  {
    id: "3",
    title: "浙T",
    description: "琪露诺超级可爱！",
    imageUrl: "/assets/images/banner05.jpg",
    lat: 30.307446,
    lng: 120.256477,
  },
    {
    id: "2",
    title: "零下二十多度的自拍",
    description: "不愧是咱hhh",
    imageUrl: "/assets/images/banner06.jpg",
    lat: 44.877443,
    lng: 82.082957,
  },
    {
    id: "2",
    title: "宁波T",
    description: "出的冷门角色卡娜www",
    imageUrl: "/assets/images/kana.jpg",
    lat: 29.870647,
    lng: 121.520848,
  },
    {
    id: "2",
    title: "你是笨蛋！",
    description: "没错！说的就是你！！！",
    imageUrl: "/assets/images/baka.jpg",
    lat: 30.513851,
    lng: 114.431897,
  },
  // 你可以在这里继续添加更多照片...
];
