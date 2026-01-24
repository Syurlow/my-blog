// 本地番剧数据配置
export type AnimeItem = {
	title: string;
	status: "watching" | "completed" | "planned";
	rating: number;
	cover: string;
	description: string;
	episodes: string;
	year: string;
	genre: string[];
	studio: string;
	link: string;
	progress: number;
	totalEpisodes: number;
	startDate: string;
	endDate: string;
};

const localAnimeList: AnimeItem[] = [
	{
		title: "旋风管家！",
		status: "completed",
		rating: 9.0,
		cover: "/assets/anime/hayate.png",
		description: "欠债管家与傲娇大小姐的爆笑日常",
		episodes: "全52集",
		year: "2007",
		genre: ["搞笑", "恋爱", "日常", "后宫"],
		studio: "SynergySP",
		link: "https://bangumi.tv/subject/2336",
		progress: 52,
		totalEpisodes: 52,
		startDate: "2015-09", // 对应你说的 15年9月15号
		endDate: "2015-10",   // 对应你说的 10月12号
	},
	{
		title: "名侦探柯南",
		status: "watching",
		rating: 9.5,
		cover: "/assets/anime/conan.png",
		description: "真相只有一个！",
		episodes: "连载中",
		year: "1996",
		genre: ["推理", "悬疑", "冒险"],
		studio: "TMS Entertainment",
		link: "https://www.bilibili.com/bangumi/play/ss33378?spm_id_from=333.337.0.0",
		progress: 1100, // 估算值，因为还在连载
		totalEpisodes: 1200, // 动态增长
		startDate: "2010-03", // 对应你说的 10年3月4日
		endDate: "",          // 还在连载，留空
	},
	{
		title: "假面骑士OOO",
		status: "completed",
		rating: 9.6,
		cover: "/assets/anime/ooo.png",
		description: "只要有明天的内裤，我就能活下去",
		episodes: "全48集",
		year: "2010",
		genre: ["特摄", "动作", "奇幻"],
		studio: "东映 (Toei)",
		link: "https://bangumi.tv/subject/10572",
		progress: 48,
		totalEpisodes: 48,
		startDate: "2010-09", // 首播日期 2010-09-05
		endDate: "2011-08",   // 完结日期 2011-08-28
	},
	{
		title: "犬夜叉",
		status: "completed",
		rating: 9.2,
		cover: "/assets/anime/inuyasha.png",
		description: "穿越时空的思念，半妖与巫女的战国童话",
		episodes: "全167集", // 指完结篇之前的正传
		year: "2000",
		genre: ["冒险", "奇幻", "恋爱"],
		studio: "Sunrise (日升)",
		link: "https://bangumi.tv/subject/1609",
		progress: 167,
		totalEpisodes: 167,
		startDate: "2010-04", // 对应你说的 10年4月22日
		endDate: "2010-06",   // 对应你说的 10年6月7日
	},
	{
		title: "奈克瑟斯奥特曼",
		status: "completed",
		rating: 9.8,
		cover: "/assets/anime/nexus.png",
		description: "光是纽带，会有人将它继承，并再次发光",
		episodes: "全37集",
		year: "2004",
		genre: ["特摄", "科幻", "成人向"],
		studio: "圆谷 (Tsuburaya)",
		link: "https://bangumi.tv/subject/2493",
		progress: 37,
		totalEpisodes: 37,
		startDate: "2006-05", // 对应你说的 06年5月3日
		endDate: "2017-11",   // 对应你说的 17年11月2日
	},
];

export default localAnimeList;
