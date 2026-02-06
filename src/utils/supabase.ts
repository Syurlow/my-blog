/**
 * Supabase 客户端配置
 * 用于访客足迹地图和弹幕评论功能
 */

const SUPABASE_URL = 'https://lzdiqbyyfstjqjwgfxlg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_L-G9jTyPmClWSFNOZZQe4A_lQs96CqR';

// 简单的 Supabase 客户端封装（不依赖官方 SDK，减少包体积）
export class SupabaseClient {
	private url: string;
	private key: string;

	constructor(url: string, key: string) {
		this.url = url;
		this.key = key;
	}

	private async request(endpoint: string, options: RequestInit = {}) {
		const response = await fetch(`${this.url}/rest/v1/${endpoint}`, {
			...options,
			headers: {
				'apikey': this.key,
				'Authorization': `Bearer ${this.key}`,
				'Content-Type': 'application/json',
				'Prefer': 'return=representation',
				...options.headers,
			},
		});

		if (!response.ok) {
			throw new Error(`Supabase error: ${response.status}`);
		}

		const text = await response.text();
		return text ? JSON.parse(text) : null;
	}

	// 查询数据
	async select(table: string, query: string = '') {
		return this.request(`${table}?${query}`, { method: 'GET' });
	}

	// 插入数据
	async insert(table: string, data: any) {
		return this.request(table, {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	// 更新数据
	async update(table: string, query: string, data: any) {
		return this.request(`${table}?${query}`, {
			method: 'PATCH',
			body: JSON.stringify(data),
		});
	}

	// RPC 调用
	async rpc(functionName: string, params: any = {}) {
		const response = await fetch(`${this.url}/rest/v1/rpc/${functionName}`, {
			method: 'POST',
			headers: {
				'apikey': this.key,
				'Authorization': `Bearer ${this.key}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(params),
		});

		if (!response.ok) {
			throw new Error(`Supabase RPC error: ${response.status}`);
		}

		const text = await response.text();
		return text ? JSON.parse(text) : null;
	}
}

// 导出单例
export const supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 省份名称映射（用于浏览器定位结果转换）
const provinceMap: Record<string, string> = {
	'xinjiang': '新疆',
	'tibet': '西藏',
	'inner mongolia': '内蒙古',
	'heilongjiang': '黑龙江',
	'jilin': '吉林',
	'liaoning': '辽宁',
	'beijing': '北京',
	'tianjin': '天津',
	'hebei': '河北',
	'shandong': '山东',
	'shanxi': '山西',
	'shaanxi': '陕西',
	'henan': '河南',
	'jiangsu': '江苏',
	'anhui': '安徽',
	'zhejiang': '浙江',
	'fujian': '福建',
	'jiangxi': '江西',
	'hubei': '湖北',
	'hunan': '湖南',
	'guangdong': '广东',
	'guangxi': '广西',
	'hainan': '海南',
	'sichuan': '四川',
	'guizhou': '贵州',
	'yunnan': '云南',
	'chongqing': '重庆',
	'gansu': '甘肃',
	'qinghai': '青海',
	'ningxia': '宁夏',
	'shanghai': '上海',
	'hong kong': '香港',
	'macau': '澳门',
	'taiwan': '台湾',
};

// 通过经纬度获取省份（使用免费的反向地理编码服务）
async function getProvinceFromCoords(lat: number, lon: number): Promise<{
	province: string;
	city: string;
	country: string;
} | null> {
	try {
		// 使用 BigDataCloud 免费反向地理编码 API
		const response = await fetch(
			`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=zh`,
			{ signal: AbortSignal.timeout(5000) }
		);
		
		if (!response.ok) throw new Error('Reverse geocoding failed');
		
		const data = await response.json();
		
		// 提取省份信息
		let province = data.principalSubdivision || data.localityInfo?.administrative?.[1]?.name || '';
		let city = data.city || data.locality || '';
		const country = data.countryName || 'China';
		
		// 处理省份名称（去除"省"、"自治区"等后缀）
		province = province.replace(/(省|自治区|特别行政区|市)$/g, '');
		
		return { province, city, country };
	} catch (error) {
		console.warn('反向地理编码失败:', error);
		return null;
	}
}

// 获取访客真实位置（优先使用浏览器定位，失败后使用 IP 定位）
export async function getVisitorLocation(): Promise<{
	province: string;
	city: string;
	country: string;
	ip: string;
	method: 'gps' | 'ip';
} | null> {
	// 方案1：尝试使用浏览器 Geolocation API（最准确）
	try {
		const position = await new Promise<GeolocationPosition>((resolve, reject) => {
			if (!navigator.geolocation) {
				reject(new Error('Geolocation not supported'));
				return;
			}
			
			navigator.geolocation.getCurrentPosition(resolve, reject, {
				enableHighAccuracy: false, // 不需要高精度，省电
				timeout: 8000,
				maximumAge: 300000, // 缓存5分钟
			});
		});
		
		const { latitude, longitude } = position.coords;
		const locationData = await getProvinceFromCoords(latitude, longitude);
		
		if (locationData) {
			console.log('📍 使用浏览器定位成功:', locationData);
			return {
				...locationData,
				ip: '',
				method: 'gps',
			};
		}
	} catch (geoError) {
		console.log('📍 浏览器定位失败，尝试 IP 定位:', geoError);
	}
	
	// 方案2：使用 IP 定位作为回退
	try {
		// 尝试使用国内更准确的 IP 定位服务
		const response = await fetch('https://whois.pconline.com.cn/ipJson.jsp?json=true', {
			signal: AbortSignal.timeout(5000),
		});
		
		if (response.ok) {
			const text = await response.text();
			// 处理可能的 JSONP 或编码问题
			const jsonStr = text.replace(/^\s*\w+\s*\(|\)\s*;?\s*$/g, '');
			const data = JSON.parse(jsonStr);
			
			if (data.pro) {
				console.log('📍 使用太平洋IP定位成功:', data);
				return {
					province: data.pro.replace(/(省|自治区|特别行政区|市)$/g, ''),
					city: data.city || '',
					country: 'China',
					ip: data.ip || '',
					method: 'ip',
				};
			}
		}
	} catch (e) {
		console.warn('太平洋IP定位失败:', e);
	}
	
	// 方案3：使用 ipapi.co 作为最后回退
	try {
		const response = await fetch('https://ipapi.co/json/', {
			signal: AbortSignal.timeout(5000),
		});
		
		if (!response.ok) throw new Error('Failed to get location');
		
		const data = await response.json();
		console.log('📍 使用 ipapi.co 定位:', data);
		
		return {
			province: data.region || '未知',
			city: data.city || '未知',
			country: data.country_name || '未知',
			ip: data.ip || '',
			method: 'ip',
		};
	} catch (error) {
		console.warn('获取访客位置失败:', error);
		return null;
	}
}