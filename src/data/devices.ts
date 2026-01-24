// 设备数据配置文件

export interface Device {
	name: string;
	image: string;
	specs: string;
	description: string;
	link: string;
}

// 设备类别类型，支持品牌和自定义类别
export type DeviceCategory = {
	[categoryName: string]: Device[];
} & {
	自定义?: Device[];
};

export const devicesData: DeviceCategory = {
	Apple: [
		{
			name: "iPhone 12 Pro Max",
			image: "/my-blog/assets/devices/iphone12pm.png", // 请确保图片已放入对应位置
			specs: "Pacific Blue / A14 Bionic / 6.7-inch Super Retina XDR",
			description:
				"Pro camera system, LiDAR Scanner, and the largest display ever on an iPhone (at launch).",
			link: "https://support.apple.com/kb/SP832?locale=zh_CN",
		},
	],
	Lenovo: [
		{
			name: "Legion R9000K 2021",
			image: "/my-blog/assets/devices/r9000k.png", // 请确保图片已放入对应位置
			specs: "R9-5900HX / RTX 3080 (16G) / 32G RAM / 1TB SSD",
			description:
				"Top-tier gaming laptop with Vapor Chamber cooling, 165W TGP GPU, and 2.5K 165Hz screen.",
			link: "https://item.lenovo.com.cn/product/1013465.html",
		},
	],
};
