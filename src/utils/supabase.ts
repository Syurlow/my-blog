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

// 获取访客 IP 信息（省份级别）
export async function getVisitorLocation(): Promise<{
	province: string;
	city: string;
	country: string;
	ip: string;
} | null> {
	try {
		// 使用免费的 IP 定位 API
		const response = await fetch('https://ipapi.co/json/', {
			signal: AbortSignal.timeout(5000),
		});
		
		if (!response.ok) throw new Error('Failed to get location');
		
		const data = await response.json();
		
		return {
			province: data.region || '未知',
			city: data.city || '未知',
			country: data.country_name || '未知',
			ip: data.ip || '',
		};
	} catch (error) {
		console.warn('获取访客位置失败:', error);
		return null;
	}
}