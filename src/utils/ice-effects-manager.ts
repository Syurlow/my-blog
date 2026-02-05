/**
 * 冰冻特效管理器 - 琪露诺专属 ❄️
 * 包含：鼠标冰冻轨迹 + 点击冰花绽放
 */

export interface IceEffectsConfig {
	enable: boolean;
	// 鼠标冰冻轨迹配置
	trail: {
		enable: boolean;
		particleCount: number; // 每次移动产生的粒子数量
		particleSize: { min: number; max: number }; // 粒子大小范围
		particleLife: number; // 粒子生命周期（毫秒）
		colors: string[]; // 冰晶颜色数组
		fadeSpeed: number; // 消失速度
	};
	// 点击冰花绽放配置
	clickEffect: {
		enable: boolean;
		particleCount: number; // 绽放粒子数量
		particleSize: { min: number; max: number }; // 粒子大小范围
		explosionRadius: number; // 爆炸半径
		duration: number; // 动画持续时间（毫秒）
		colors: string[]; // 冰花颜色数组
	};
	zIndex: number;
}

// 冰晶粒子类
class IceParticle {
	x: number;
	y: number;
	size: number;
	color: string;
	alpha: number;
	vx: number;
	vy: number;
	rotation: number;
	rotationSpeed: number;
	life: number;
	maxLife: number;
	type: 'trail' | 'explosion';
	shape: 'crystal' | 'snowflake' | 'diamond';

	constructor(
		x: number,
		y: number,
		size: number,
		color: string,
		vx: number,
		vy: number,
		life: number,
		type: 'trail' | 'explosion'
	) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;
		this.alpha = 1;
		this.vx = vx;
		this.vy = vy;
		this.rotation = Math.random() * Math.PI * 2;
		this.rotationSpeed = (Math.random() - 0.5) * 0.1;
		this.life = life;
		this.maxLife = life;
		this.type = type;
		this.shape = ['crystal', 'snowflake', 'diamond'][Math.floor(Math.random() * 3)] as 'crystal' | 'snowflake' | 'diamond';
	}

	update(deltaTime: number): boolean {
		this.x += this.vx * deltaTime;
		this.y += this.vy * deltaTime;
		this.rotation += this.rotationSpeed;
		this.life -= deltaTime * 16.67; // 约60fps
		this.alpha = Math.max(0, this.life / this.maxLife);
		
		// 添加重力效果（轻微下落）
		if (this.type === 'trail') {
			this.vy += 0.02;
		}
		
		return this.life > 0;
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rotation);
		ctx.globalAlpha = this.alpha;

		switch (this.shape) {
			case 'crystal':
				this.drawCrystal(ctx);
				break;
			case 'snowflake':
				this.drawSnowflake(ctx);
				break;
			case 'diamond':
				this.drawDiamond(ctx);
				break;
		}

		ctx.restore();
	}

	private drawCrystal(ctx: CanvasRenderingContext2D) {
		const s = this.size;
		ctx.beginPath();
		ctx.moveTo(0, -s);
		ctx.lineTo(s * 0.5, -s * 0.3);
		ctx.lineTo(s * 0.5, s * 0.3);
		ctx.lineTo(0, s);
		ctx.lineTo(-s * 0.5, s * 0.3);
		ctx.lineTo(-s * 0.5, -s * 0.3);
		ctx.closePath();
		
		// 渐变填充
		const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, s);
		gradient.addColorStop(0, this.color);
		gradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
		ctx.fillStyle = gradient;
		ctx.fill();
		
		// 高光边框
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
		ctx.lineWidth = 0.5;
		ctx.stroke();
	}

	private drawSnowflake(ctx: CanvasRenderingContext2D) {
		const s = this.size;
		ctx.strokeStyle = this.color;
		ctx.lineWidth = 1.5;
		ctx.lineCap = 'round';

		// 绘制6条主线
		for (let i = 0; i < 6; i++) {
			ctx.save();
			ctx.rotate((Math.PI / 3) * i);
			
			// 主线
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(0, -s);
			ctx.stroke();

			// 分支
			ctx.beginPath();
			ctx.moveTo(0, -s * 0.4);
			ctx.lineTo(s * 0.3, -s * 0.6);
			ctx.moveTo(0, -s * 0.4);
			ctx.lineTo(-s * 0.3, -s * 0.6);
			ctx.stroke();

			ctx.restore();
		}

		// 中心点
		ctx.beginPath();
		ctx.arc(0, 0, s * 0.15, 0, Math.PI * 2);
		ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
		ctx.fill();
	}

	private drawDiamond(ctx: CanvasRenderingContext2D) {
		const s = this.size;
		ctx.beginPath();
		ctx.moveTo(0, -s);
		ctx.lineTo(s * 0.7, 0);
		ctx.lineTo(0, s);
		ctx.lineTo(-s * 0.7, 0);
		ctx.closePath();

		// 渐变填充
		const gradient = ctx.createLinearGradient(-s, -s, s, s);
		gradient.addColorStop(0, this.color);
		gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
		gradient.addColorStop(1, this.color);
		ctx.fillStyle = gradient;
		ctx.fill();

		// 内部线条
		ctx.beginPath();
		ctx.moveTo(0, -s);
		ctx.lineTo(0, s);
		ctx.moveTo(-s * 0.7, 0);
		ctx.lineTo(s * 0.7, 0);
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
		ctx.lineWidth = 0.5;
		ctx.stroke();
	}
}

// 冰冻特效管理器
export class IceEffectsManager {
	private config: IceEffectsConfig;
	private canvas: HTMLCanvasElement | null = null;
	private ctx: CanvasRenderingContext2D | null = null;
	private particles: IceParticle[] = [];
	private animationId: number | null = null;
	private isRunning = false;
	private lastMousePos = { x: 0, y: 0 };
	private lastTime = 0;
	private throttleTimer: number | null = null;

	constructor(config: IceEffectsConfig) {
		this.config = config;
	}

	init(): void {
		if (!this.config.enable || this.isRunning) {
			console.log('❄️ 跳过初始化: enable=', this.config.enable, 'isRunning=', this.isRunning);
			return;
		}

		console.log('❄️ 创建Canvas...');
		this.createCanvas();
		console.log('❄️ Canvas创建完成:', this.canvas);
		
		console.log('❄️ 绑定事件...');
		this.bindEvents();
		
		console.log('❄️ 启动动画...');
		this.startAnimation();
		
		this.isRunning = true;
		console.log('❄️ 冰冻特效管理器初始化完成! Canvas ID:', this.canvas?.id);
	}

	private createCanvas(): void {
		this.canvas = document.createElement('canvas');
		this.canvas.id = 'canvas_ice_effects';
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.canvas.style.cssText = `
			position: fixed;
			left: 0;
			top: 0;
			pointer-events: none;
			z-index: ${this.config.zIndex};
		`;
		document.body.appendChild(this.canvas);
		this.ctx = this.canvas.getContext('2d');

		window.addEventListener('resize', this.handleResize);
	}

	private handleResize = (): void => {
		if (this.canvas) {
			this.canvas.width = window.innerWidth;
			this.canvas.height = window.innerHeight;
		}
	};

	private bindEvents(): void {
		if (this.config.trail.enable) {
			document.addEventListener('mousemove', this.handleMouseMove);
		}
		if (this.config.clickEffect.enable) {
			document.addEventListener('click', this.handleClick);
		}
	}

	private handleMouseMove = (e: MouseEvent): void => {
		if (!this.config.trail.enable) return;

		// 节流处理，避免产生过多粒子
		const now = Date.now();
		if (now - this.lastTime < 16) return; // 约60fps
		this.lastTime = now;

		const dx = e.clientX - this.lastMousePos.x;
		const dy = e.clientY - this.lastMousePos.y;
		const distance = Math.sqrt(dx * dx + dy * dy);

		// 只有移动足够距离才产生粒子
		if (distance > 5) {
			this.createTrailParticles(e.clientX, e.clientY, dx, dy);
			this.lastMousePos = { x: e.clientX, y: e.clientY };
			// 调试：每50次移动输出一次日志
			if (this.particles.length % 50 === 0) {
				console.log('❄️ 粒子数量:', this.particles.length);
			}
		}
	};

	private handleClick = (e: MouseEvent): void => {
		if (!this.config.clickEffect.enable) return;
		console.log('❄️ 点击位置:', e.clientX, e.clientY);
		this.createExplosionParticles(e.clientX, e.clientY);
		console.log('❄️ 创建爆炸粒子, 当前总粒子数:', this.particles.length);
	};

	private createTrailParticles(x: number, y: number, dx: number, dy: number): void {
		const { particleCount, particleSize, particleLife, colors } = this.config.trail;

		for (let i = 0; i < particleCount; i++) {
			const size = particleSize.min + Math.random() * (particleSize.max - particleSize.min);
			const color = colors[Math.floor(Math.random() * colors.length)];
			
			// 粒子速度与鼠标移动方向相反，产生拖尾效果
			const vx = -dx * 0.05 + (Math.random() - 0.5) * 2;
			const vy = -dy * 0.05 + (Math.random() - 0.5) * 2;
			
			// 在鼠标位置附近随机偏移
			const offsetX = (Math.random() - 0.5) * 10;
			const offsetY = (Math.random() - 0.5) * 10;

			this.particles.push(
				new IceParticle(x + offsetX, y + offsetY, size, color, vx, vy, particleLife, 'trail')
			);
		}
	}

	private createExplosionParticles(x: number, y: number): void {
		const { particleCount, particleSize, explosionRadius, duration, colors } = this.config.clickEffect;

		for (let i = 0; i < particleCount; i++) {
			const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
			const speed = 2 + Math.random() * 4;
			const size = particleSize.min + Math.random() * (particleSize.max - particleSize.min);
			const color = colors[Math.floor(Math.random() * colors.length)];
			
			const vx = Math.cos(angle) * speed;
			const vy = Math.sin(angle) * speed;

			this.particles.push(
				new IceParticle(x, y, size, color, vx, vy, duration, 'explosion')
			);
		}

		// 添加额外的中心闪光粒子
		for (let i = 0; i < 5; i++) {
			const angle = Math.random() * Math.PI * 2;
			const speed = 1 + Math.random() * 2;
			this.particles.push(
				new IceParticle(
					x, y, 
					particleSize.max * 1.5, 
					'rgba(255, 255, 255, 0.9)',
					Math.cos(angle) * speed,
					Math.sin(angle) * speed,
					duration * 0.7,
					'explosion'
				)
			);
		}
	}

	private startAnimation(): void {
		let lastAnimationTime = 0;
		
		const animate = (currentTime: number) => {
			if (!this.ctx || !this.canvas) return;

			// 计算时间差
			if (lastAnimationTime === 0) {
				lastAnimationTime = currentTime;
			}
			const deltaTime = Math.min((currentTime - lastAnimationTime) / 16.67, 3); // 限制delta避免跳帧
			lastAnimationTime = currentTime;

			// 清空画布
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			// 更新和绘制粒子
			this.particles = this.particles.filter(particle => {
				const alive = particle.update(deltaTime);
				if (alive) {
					particle.draw(this.ctx!);
				}
				return alive;
			});

			this.animationId = requestAnimationFrame(animate);
		};

		this.animationId = requestAnimationFrame(animate);
	}

	stop(): void {
		if (this.animationId) {
			cancelAnimationFrame(this.animationId);
			this.animationId = null;
		}

		document.removeEventListener('mousemove', this.handleMouseMove);
		document.removeEventListener('click', this.handleClick);
		window.removeEventListener('resize', this.handleResize);

		if (this.canvas && this.canvas.parentNode) {
			this.canvas.parentNode.removeChild(this.canvas);
			this.canvas = null;
		}

		this.particles = [];
		this.isRunning = false;
	}

	toggle(): void {
		if (this.isRunning) {
			this.stop();
		} else {
			this.init();
		}
	}

	updateConfig(newConfig: IceEffectsConfig): void {
		const wasRunning = this.isRunning;
		if (wasRunning) {
			this.stop();
		}
		this.config = newConfig;
		if (wasRunning && newConfig.enable) {
			this.init();
		}
	}

	getIsRunning(): boolean {
		return this.isRunning;
	}
}

// 全局实例
let globalIceEffectsManager: IceEffectsManager | null = null;

// 默认配置
export const defaultIceEffectsConfig: IceEffectsConfig = {
	enable: true,
	trail: {
		enable: true,
		particleCount: 3,
		particleSize: { min: 3, max: 8 },
		particleLife: 800,
		colors: [
			'rgba(135, 206, 250, 0.8)', // 浅天蓝
			'rgba(173, 216, 230, 0.8)', // 浅蓝
			'rgba(224, 255, 255, 0.8)', // 淡青色
			'rgba(176, 224, 230, 0.8)', // 粉蓝
			'rgba(127, 255, 212, 0.6)', // 碧绿色
		],
		fadeSpeed: 0.02,
	},
	clickEffect: {
		enable: true,
		particleCount: 16,
		particleSize: { min: 5, max: 15 },
		explosionRadius: 100,
		duration: 1200,
		colors: [
			'rgba(135, 206, 250, 0.9)', // 浅天蓝
			'rgba(173, 216, 230, 0.9)', // 浅蓝
			'rgba(224, 255, 255, 0.9)', // 淡青色
			'rgba(255, 255, 255, 0.9)', // 白色
			'rgba(176, 224, 230, 0.9)', // 粉蓝
		],
	},
	zIndex: 9999,
};

// 初始化冰冻特效
export function initIceEffects(config?: Partial<IceEffectsConfig> | IceEffectsConfig): void {
	// 深度合并配置
	const finalConfig: IceEffectsConfig = {
		...defaultIceEffectsConfig,
		...config,
		trail: {
			...defaultIceEffectsConfig.trail,
			...(config?.trail || {}),
		},
		clickEffect: {
			...defaultIceEffectsConfig.clickEffect,
			...(config?.clickEffect || {}),
		},
	};
	
	console.log('❄️ 初始化冰冻特效:', finalConfig.enable ? '已启用' : '已禁用');
	
	if (globalIceEffectsManager) {
		globalIceEffectsManager.updateConfig(finalConfig);
	} else {
		globalIceEffectsManager = new IceEffectsManager(finalConfig);
		if (finalConfig.enable) {
			globalIceEffectsManager.init();
		}
	}
	
	// 暴露到 window 对象方便调试
	if (typeof window !== 'undefined') {
		(window as any).iceEffectsManager = globalIceEffectsManager;
		console.log('❄️ 管理器已挂载到 window.iceEffectsManager');
	}
}

// 切换冰冻特效
export function toggleIceEffects(): void {
	if (globalIceEffectsManager) {
		globalIceEffectsManager.toggle();
	}
}

// 停止冰冻特效
export function stopIceEffects(): void {
	if (globalIceEffectsManager) {
		globalIceEffectsManager.stop();
		globalIceEffectsManager = null;
	}
}

// 获取冰冻特效状态
export function getIceEffectsStatus(): boolean {
	return globalIceEffectsManager ? globalIceEffectsManager.getIsRunning() : false;
}