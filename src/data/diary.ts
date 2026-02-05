// 日记数据配置
// 用于管理日记页面的数据

export interface DiaryItem {
	id: number;
	content: string;
	date: string;
	images?: string[];
	location?: string;
	mood?: string;
	tags?: string[];
}


const diaryData: DiaryItem[] = [
	// ========== 新日记写在这里（最新的放最前面）==========
	{
		id: 4,
		content: "成功加入了航班铁路轨迹！🎉目前足迹地图算是大功告成！！！",
		date: "2026-02-06T05:48:00Z",
		location: "家里",
		mood: "开心",
		tags: ["编程", "博客"],
	},
	{
		id: 3,
		content: "终于把博客的地图功能做好了！🎉\n高德地图加载超快，再也不用挂梯子了~\n接下来准备整理一下航班和火车的数据。",
		date: "2026-02-05T01:43:00Z",
		location: "南京禄口机场T2旅客过夜区",
		mood: "开心",
		tags: ["编程", "博客"],
	},
	{
		id: 2,
		content: "寒潮来袭！今天降温好厉害\n不过窝在酒店里写代码还是很舒服的~",
		date: "2026-01-24T14:00:00Z",
		location: "扬州万豪万枫酒店",
		mood: "惬意",
		tags: ["日常"],
	},
	// ========== 原来的示例日记 ==========
	{
		id: 1,
		content:
			"博客终于上线啦！撒花✿✿ヽ(°▽°)ノ✿",
		date: "2026-01-24T10:30:00Z",
	},
];


// 获取日记统计数据
export const getDiaryStats = () => {
	const total = diaryData.length;
	const hasImages = diaryData.filter(
		(item) => item.images && item.images.length > 0,
	).length;
	const hasLocation = diaryData.filter((item) => item.location).length;
	const hasMood = diaryData.filter((item) => item.mood).length;

	return {
		total,
		hasImages,
		hasLocation,
		hasMood,
		imagePercentage: Math.round((hasImages / total) * 100),
		locationPercentage: Math.round((hasLocation / total) * 100),
		moodPercentage: Math.round((hasMood / total) * 100),
	};
};

// 获取日记列表（按时间倒序）
export const getDiaryList = (limit?: number) => {
	const sortedData = diaryData.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	if (limit && limit > 0) {
		return sortedData.slice(0, limit);
	}

	return sortedData;
};

// 获取最新的日记
export const getLatestDiary = () => {
	return getDiaryList(1)[0];
};

// 根据ID获取日记
export const getDiaryById = (id: number) => {
	return diaryData.find((item) => item.id === id);
};

// 获取包含图片的日记
export const getDiaryWithImages = () => {
	return diaryData.filter((item) => item.images && item.images.length > 0);
};

// 根据标签筛选日记
export const getDiaryByTag = (tag: string) => {
	return diaryData
		.filter((item) => item.tags?.includes(tag))
		.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
		);
};

// 获取所有标签
export const getAllTags = () => {
	const tags = new Set<string>();
	diaryData.forEach((item) => {
		if (item.tags) {
			item.tags.forEach((tag) => tags.add(tag));
		}
	});
	return Array.from(tags).sort();
};

export default diaryData;
