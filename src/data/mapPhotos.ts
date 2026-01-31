export interface MapPhoto {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  lat: number;
  lng: number;
}

export const mapPhotos: MapPhoto[] = [
  {
    id: "1",
    title: "❄️寒潮来袭www❄️",
    description: "与千琴老师的合照www",
    imageUrl: "/my-blog/assets/images/banner02.jpg",
    lat: 45.729715,
    lng: 126.617884,
  },
  {
    id: "2",
    title: "调戏小萝莉",
    description: "与静树的合照www",
    imageUrl: "/my-blog/assets/images/banner04.jpg",
    lat: 30.506907,
    lng: 114.241734,
  },
  {
    id: "3",
    title: "浙T",
    description: "琪露诺超级可爱！",
    imageUrl: "/my-blog/assets/images/banner05.jpg",
    lat: 30.307446,
    lng: 120.256477,
  },
  {
    id: "4",
    title: "零下二十多度的自拍",
    description: "不愧是咱hhh",
    imageUrl: "/my-blog/assets/images/banner06.jpg",
    lat: 44.877443,
    lng: 82.082957,
  },
  {
    id: "5",
    title: "宁波T",
    description: "出的冷门角色卡娜www",
    imageUrl: "/my-blog/assets/images/kana.jpg",
    lat: 29.870647,
    lng: 121.520848,
  },
  {
    id: "6",
    title: "你是笨蛋！",
    description: "没错！说的就是你！！！",
    imageUrl: "/my-blog/assets/images/baka.jpg",
    lat: 30.513135,
    lng: 114.431140,
  },
  {
    id: "7",
    title: "冰之妖精√",
    description: "零下十几度，还着下雪www",
    imageUrl: "/my-blog/assets/images/baka.jpg",
    lat: 44.883383,
    lng: 82.090393,
  },
];
