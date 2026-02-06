# 🤖 Agent 项目理解指南

> 本文档旨在帮助 AI Agent 快速理解 Syurlow 个人博客项目的结构、功能和修改流程。

---

## 📁 项目概览

| 属性 | 值 |
|------|-----|
| **项目名称** | Syurlow's Blog |
| **框架** | Astro 5.x + Svelte 5 |
| **样式** | Tailwind CSS + Stylus |
| **包管理器** | pnpm |
| **部署平台** | GitHub Pages |
| **线上地址** | https://syurlow.github.io/my-blog/ |
| **仓库地址** | https://github.com/Syurlow/my-blog |
| **主题风格** | 琪露诺冰蓝主题 ❄️ (hue: 200) |

---

## 📂 核心目录结构

```
my-blog/
├── src/
│   ├── components/          # 组件目录
│   │   ├── widget/          # 侧边栏小组件
│   │   │   ├── Profile.astro       # 个人资料卡片
│   │   │   ├── Announcement.astro  # 公告组件
│   │   │   ├── Categories.astro    # 分类组件
│   │   │   ├── Tags.astro          # 标签组件
│   │   │   ├── SiteStats.astro     # 站点统计
│   │   │   ├── Calendar.astro      # 日历组件
│   │   │   ├── Weather.astro       # 天气组件 ⭐新
│   │   │   ├── VisitorMap.astro    # 访客地图 ⭐新
│   │   │   ├── MusicPlayer.svelte  # 音乐播放器
│   │   │   └── Pio.svelte          # 看板娘
│   │   ├── layout/           # 布局组件
│   │   │   ├── RightSideBar.astro  # 右侧边栏（⚠️重要：新组件需在此注册）
│   │   │   └── ...
│   │   ├── RandomPost.astro        # 随机文章 ⭐新
│   │   ├── ReadingProgress.astro   # 阅读进度条 ⭐新
│   │   ├── BackToTopProgress.astro # 返回顶部 ⭐新
│   │   ├── SearchShortcut.astro    # 搜索快捷键 ⭐新
│   │   └── Danmaku.astro           # 弹幕组件 ⭐新
│   ├── layouts/
│   │   ├── Layout.astro            # 全局布局（⚠️重要：全局组件在此注册）
│   │   └── MainGridLayout.astro    # 主网格布局
│   ├── pages/                # 页面目录
│   │   ├── index.astro       # 首页
│   │   ├── posts/            # 文章页面
│   │   ├── map.astro         # 足迹地图页面
│   │   ├── diary/            # 日记页面
│   │   ├── anime.astro       # 番剧页面
│   │   └── ...
│   ├── content/              # 内容目录
│   │   └── posts/            # Markdown 文章
│   ├── config.ts             # ⚠️核心配置文件
│   ├── types/
│   │   └── config.ts         # 类型定义（添加新组件类型需修改）
│   ├── utils/
│   │   ├── widget-manager.ts # 组件管理器（添加新组件映射需修改）
│   │   ├── supabase.ts       # Supabase 客户端 + 定位服务
│   │   ├── ice-effects-manager.ts  # 冰冻特效
│   │   └── sakura-manager.ts       # 樱花/雪花特效
│   └── styles/               # 样式文件
├── public/
│   ├── manifest.json         # PWA 配置
│   ├── sw.js                 # Service Worker
│   ├── favicon/              # 网站图标
│   └── assets/               # 静态资源
├── docs/
│   └── supabase-setup.sql    # Supabase 数据库初始化脚本
└── package.json
```

---

## 🎯 功能清单

### 核心功能
| 功能 | 文件位置 | 状态 |
|------|----------|------|
| 文章系统 | `src/content/posts/` | ✅ |
| 分类/标签 | `src/components/widget/` | ✅ |
| 搜索 (Pagefind) | 内置 | ✅ |
| 评论 (Twikoo) | `src/config.ts` | ✅ |
| RSS 订阅 | 自动生成 | ✅ |

### 视觉特效
| 功能 | 配置位置 | 状态 |
|------|----------|------|
| 冰蓝主题 | `src/config.ts` → `themeColor.hue: 200` | ✅ |
| 冰冻鼠标特效 | `src/config.ts` → `iceEffectsConfig` | ✅ |
| 雪花飘落 | `src/config.ts` → `sakuraConfig` | ✅ |
| Banner 轮播 | `src/config.ts` → `banner.carousel` | ✅ |
| 水波纹效果 | `src/config.ts` → `banner.waves` | ✅ |

### 侧边栏组件
| 组件 | 类型标识 | 配置位置 |
|------|----------|----------|
| 个人资料 | `profile` | `sidebarLayoutConfig.components` |
| 公告 | `announcement` | `sidebarLayoutConfig.components` |
| 分类 | `categories` | `sidebarLayoutConfig.components` |
| 标签 | `tags` | `sidebarLayoutConfig.components` |
| 站点统计 | `site-stats` | `sidebarLayoutConfig.components` |
| 日历 | `calendar` | `sidebarLayoutConfig.components` |
| 随机文章 | `random-post` | `sidebarLayoutConfig.components` |
| 天气 | `weather` | `sidebarLayoutConfig.components` |
| 访客地图 | `visitor-map` | `sidebarLayoutConfig.components` |

### 全局组件（在 Layout.astro 中）
| 组件 | 说明 |
|------|------|
| 阅读进度条 | 页面顶部显示阅读进度 |
| 返回顶部圆环 | 带进度的返回顶部按钮 |
| 搜索快捷键 | 按 `/` 或 `Ctrl+K` 打开搜索 |
| 弹幕系统 | B站风格弹幕（主页/文章/地图/日记） |
| PWA 支持 | 可安装为桌面应用 |
| 音乐播放器 | 网易云歌单播放 |

### 特殊页面
| 页面 | 路径 | 说明 |
|------|------|------|
| 足迹地图 | `/map/` | Leaflet 地图 + 照片标记 |
| 番剧列表 | `/anime/` | 本地/Bangumi 数据 |
| 日记 | `/diary/` | 个人日记 |
| 设备展示 | `/devices/` | 设备卡片展示 |

---

## 🔧 修改指南

### 修改主题颜色
```typescript
// src/config.ts
themeColor: {
    hue: 200,  // 0-360，200=冰蓝色
    fixed: false,
}
```

### 添加新的侧边栏组件

**步骤 1：创建组件文件**
```
src/components/widget/NewWidget.astro
```

**步骤 2：添加类型定义**
```typescript
// src/types/config.ts
export type WidgetComponentType =
    | "profile"
    | "new-widget"  // 👈 添加这行
    | ...;
```

**步骤 3：添加组件映射**
```typescript
// src/utils/widget-manager.ts
export const WIDGET_COMPONENT_MAP = {
    // ...
    "new-widget": "../components/widget/NewWidget.astro",  // 👈 添加
};
```

**步骤 4：注册到布局组件**
```typescript
// src/components/layout/RightSideBar.astro
import NewWidget from "@/components/widget/NewWidget.astro";

const componentMap = {
    // ...
    "new-widget": NewWidget,  // 👈 添加
};
```

**步骤 5：在配置中启用**
```typescript
// src/config.ts → sidebarLayoutConfig.components
{
    type: "new-widget",
    enable: true,
    order: 10,
    position: "top",
    sidebar: "right",
    class: "onload-animation",
    animationDelay: 300,
},
```

### 添加全局组件

在 `src/layouts/Layout.astro` 中：
1. 导入组件
2. 在 `<body>` 中添加组件标签

### 修改弹幕显示页面
```typescript
// src/components/Danmaku.astro → initDanmaku()
const allowedPaths = [
    '/my-blog/',           // 主页
    '/my-blog/map',        // 足迹地图
    '/my-blog/diary',      // 日记
    // 添加更多路径...
];
```

---

## 📝 开发流程

### 本地开发
```bash
cd E:\Code\my-blog
pnpm install    # 首次安装依赖
pnpm dev        # 启动开发服务器 (localhost:4321)
```

### 构建测试
```bash
pnpm build      # 构建生产版本
pnpm preview    # 预览构建结果
```

### Git 推送流程
```powershell
# PowerShell 命令格式（使用分号而非 &&）
cd E:\Code\my-blog; git add .; git commit -m "提交信息"; git push
```

**提交信息规范：**
- ✨ 新功能: `✨ 新增xxx功能`
- 🐛 修复: `🐛 修复xxx问题`
- 🔧 配置: `🔧 优化xxx配置`
- 📝 文档: `📝 更新xxx文档`
- 🎨 样式: `🎨 优化xxx样式`

---

## 🗄️ Supabase 配置

### 连接信息
```typescript
// src/utils/supabase.ts
const SUPABASE_URL = 'https://lzdiqbyyfstjqjwgfxlg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJ...'; // JWT 格式
```

### 数据库表
| 表名 | 用途 |
|------|------|
| `danmaku` | 弹幕评论存储 |
| `visitors` | 访客记录 |

### 初始化脚本
执行 `docs/supabase-setup.sql` 中的 SQL 来创建表和函数。

**必须执行的 RPC 函数：**
```sql
CREATE OR REPLACE FUNCTION get_visitor_stats()
RETURNS TABLE (province VARCHAR, count BIGINT) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        v.province,
        COUNT(DISTINCT v.visitor_id)::BIGINT as count
    FROM visitors v
    WHERE v.province IS NOT NULL AND v.province != ''
    GROUP BY v.province
    ORDER BY count DESC;
END;
$$ LANGUAGE plpgsql;
```

---

## 🌐 定位服务

### 定位策略（按优先级）
1. **浏览器 GPS** - 最准确，需用户授权
2. **ipwho.is** - 免费 HTTPS + CORS
3. **ipapi.co** - 最后回退

### 定位缓存
```typescript
// 定位结果缓存在 window.__cachedLocation
// 有效期 5 分钟
// 天气组件会等待访客地图的定位结果
```

---

## ⚠️ 常见问题

### Q: 新组件不显示？
A: 检查是否完成了所有 5 个步骤（类型定义、组件映射、布局注册、配置启用）

### Q: 推送命令报错 `&&` 无效？
A: PowerShell 使用 `;` 作为命令分隔符，不是 `&&`

### Q: 定位显示北京而非真实位置？
A: 
1. 检查浏览器是否授权了定位权限
2. IP 定位受运营商出口影响

### Q: Supabase RPC 报错 404？
A: 需要在 Supabase SQL Editor 执行 `get_visitor_stats` 函数创建语句

### Q: 样式不生效？
A: 
1. 清除浏览器缓存
2. 检查 localStorage 中的 `hue` 值是否被覆盖

---

## 🎨 设计规范

### 颜色系统
```css
/* 使用 oklch 颜色空间，基于 --hue 变量 */
oklch(0.7 0.14 var(--hue, 200))  /* 主色 */
oklch(0.5 0.12 var(--hue, 200))  /* 按钮 */
oklch(0.8 0.18 var(--hue, 200))  /* 高亮 */
```

### 动画规范
- 过渡时间: `0.2s` - `0.3s`
- 缓动函数: `ease`, `ease-out`
- 加载动画延迟: `animationDelay` 递增 50ms

---

## 📌 重要文件速查

| 需求 | 修改文件 |
|------|----------|
| 修改站点标题/描述 | `src/config.ts` → `siteConfig` |
| 修改导航栏 | `src/config.ts` → `navBarConfig` |
| 修改个人资料 | `src/config.ts` → `profileConfig` |
| 修改音乐播放器 | `src/config.ts` → `musicPlayerConfig` |
| 添加文章 | `src/content/posts/xxx.md` |
| 修改全局布局 | `src/layouts/Layout.astro` |
| 修改侧边栏组件 | `src/components/layout/RightSideBar.astro` |
| 修改 PWA 配置 | `public/manifest.json` |

---

*最后更新: 2025年*