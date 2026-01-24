// Project data configuration file
// Used to manage data for the project display page

export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
	category: "web" | "mobile" | "desktop" | "other";
	techStack: string[];
	status: "completed" | "in-progress" | "planned";
	liveDemo?: string;
	sourceCode?: string;
	startDate: string;
	endDate?: string;
	featured?: boolean;
	tags?: string[];
	visitUrl?: string; // 添加前往项目链接字段
}

export const projectsData: Project[] = [
	// -----------------------------------------------------------------------
	// 目前列表已清空。
	// 当你需要添加项目时，请复制下方被注释的代码块，取消注释并修改内容。
	// -----------------------------------------------------------------------

	/*
	{
		id: "project-id-1", // 唯一ID，不要重复
		title: "项目标题",
		description: "这里写项目的详细描述...",
		image: "", // 项目封面图路径，例如 "/assets/projects/cover.jpg"
		category: "web", // 类型可选: web, mobile, desktop, other
		techStack: ["React", "TypeScript", "Tailwind CSS"], // 使用的技术栈
		status: "completed", // 状态可选: completed, in-progress, planned
		liveDemo: "https://demo.example.com", // 演示地址（可选）
		sourceCode: "https://github.com/username/project", // 源码地址（可选）
		visitUrl: "https://project.example.com", // 访问链接（可选）
		startDate: "2024-01-01",
		endDate: "2024-02-01", // 如果还在进行中，这行可以删掉
		featured: true, // 是否设为精选（会在首页显示）
		tags: ["标签1", "标签2"],
	},
	*/
];

// --- 以下统计函数保持不变，请勿删除 ---

// Get project statistics
export const getProjectStats = () => {
	const total = projectsData.length;
	const completed = projectsData.filter(
		(p) => p.status === "completed",
	).length;
	const inProgress = projectsData.filter(
		(p) => p.status === "in-progress",
	).length;
	const planned = projectsData.filter((p) => p.status === "planned").length;

	return {
		total,
		byStatus: {
			completed,
			inProgress,
			planned,
		},
	};
};

// Get projects by category
export const getProjectsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return projectsData;
	}
	return projectsData.filter((p) => p.category === category);
};

// Get featured projects
export const getFeaturedProjects = () => {
	return projectsData.filter((p) => p.featured);
};

// Get all tech stacks
export const getAllTechStack = () => {
	const techSet = new Set<string>();
	projectsData.forEach((project) => {
		project.techStack.forEach((tech) => {
			techSet.add(tech);
		});
	});
	return Array.from(techSet).sort();
};
