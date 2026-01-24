// Skill data configuration file
// Used to manage data for the skill display page

export interface Skill {
	id: string;
	name: string;
	description: string;
	icon: string; // Iconify icon name
	category: "frontend" | "backend" | "database" | "tools" | "other";
	level: "beginner" | "intermediate" | "advanced" | "expert";
	experience: {
		years: number;
		months: number;
	};
	projects?: string[]; // Related project IDs
	certifications?: string[];
	color?: string; // Skill card theme color
}

export const skillsData: Skill[] = [
	// --- 编程语言 ---
	{
		id: "python",
		name: "Python",
		description:
			"作为入门语言学习，主要用于数据处理或简单的脚本编写。",
		icon: "logos:python",
		category: "backend",
		level: "beginner", // 入门
		experience: { years: 3, months: 9 },
		color: "#3776AB",
	},

	// --- 学术与数学专业工具 (归类为 Other) ---
	{
		id: "matlab",
		name: "MATLAB",
		description:
			"数学专业必备工具，熟练进行矩阵运算、数值分析及算法实现。",
		icon: "logos:matlab", // 或者 file-icons:matlab
		category: "other",
		level: "advanced", // 熟练
		experience: { years: 3, months: 5 },
		color: "#e16737",
	},
	{
		id: "mathematica",
		name: "Mathematica",
		description:
			"熟练掌握符号计算、数学建模及复杂函数的图形可视化。",
		icon: "simple-icons:wolframmathematica",
		category: "other",
		level: "advanced", // 熟练
		experience: { years: 1, months: 7 },
		color: "#DD1100",
	},
	{
		id: "latex",
		name: "LaTeX",
		description:
			"经常使用，能够熟练进行学术论文排版、复杂数学公式编辑。",
		icon: "logos:latex", // 或者 simple-icons:latex
		category: "other",
		level: "advanced", // 熟练
		experience: { years: 3, months: 9 },
		color: "#008080",
	},
	{
		id: "qgis",
		name: "QGIS",
		description:
			"刚入门地理信息系统，能够进行基础的地图查看和简单空间数据处理。",
		icon: "logos:qgis",
		category: "other",
		level: "beginner", // 入门
		experience: { years: 0, months: 2 },
		color: "#589632",
	},

	// --- 设计与多媒体 (归类为 Other) ---
	{
		id: "photoshop",
		name: "Photoshop",
		description:
			"能够进行基础的图像处理、修图及简单的平面设计。",
		icon: "logos:adobe-photoshop",
		category: "other",
		level: "beginner", // 入门
		experience: { years: 0, months: 6 },
		color: "#31A8FF",
	},
	{
		id: "aftereffects",
		name: "After Effects",
		description:
			"了解基础的视频后期合成与特效制作流程。",
		icon: "logos:adobe-after-effects",
		category: "other",
		level: "beginner", // 入门
		experience: { years: 0, months: 4 },
		color: "#9999FF",
	},

	// --- 开发工具与办公软件 (归类为 Tools) ---
	{
		id: "vscode",
		name: "VS Code",
		description:
			"日常使用的轻量级代码编辑器，配合插件编写 Python 或 LaTeX。",
		icon: "logos:visual-studio-code",
		category: "tools",
		level: "intermediate",
		experience: { years: 0, months: 8 },
		color: "#007ACC",
	},
	{
		id: "pycharm",
		name: "PyCharm",
		description:
			"JetBrains 出品的 Python IDE，用于管理较复杂的 Python 项目。",
		icon: "logos:pycharm",
		category: "tools",
		level: "beginner",
		experience: { years: 3, months: 4 },
		color: "#21D789",
	},
	{
		id: "wps",
		name: "WPS Office",
		description:
			"日常文档处理工具。",
		icon: "simple-icons:wps", 
		category: "tools",
		level: "advanced", 
		experience: { years: 12, months: 5 },
		color: "#D22128",
	},
];

// --- 以下统计函数保持不变 ---

// Get skill statistics
export const getSkillStats = () => {
	const total = skillsData.length;
	const byLevel = {
		beginner: skillsData.filter((s) => s.level === "beginner").length,
		intermediate: skillsData.filter((s) => s.level === "intermediate")
			.length,
		advanced: skillsData.filter((s) => s.level === "advanced").length,
		expert: skillsData.filter((s) => s.level === "expert").length,
	};
	const byCategory = {
		frontend: skillsData.filter((s) => s.category === "frontend").length,
		backend: skillsData.filter((s) => s.category === "backend").length,
		database: skillsData.filter((s) => s.category === "database").length,
		tools: skillsData.filter((s) => s.category === "tools").length,
		other: skillsData.filter((s) => s.category === "other").length,
	};

	return { total, byLevel, byCategory };
};

// Get skills by category
export const getSkillsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return skillsData;
	}
	return skillsData.filter((s) => s.category === category);
};

// Get advanced skills
export const getAdvancedSkills = () => {
	return skillsData.filter(
		(s) => s.level === "advanced" || s.level === "expert",
	);
};

// Calculate total years of experience
export const getTotalExperience = () => {
	const totalMonths = skillsData.reduce((total, skill) => {
		return total + skill.experience.years * 12 + skill.experience.months;
	}, 0);
	return {
		years: Math.floor(totalMonths / 12),
		months: totalMonths % 12,
	};
};
