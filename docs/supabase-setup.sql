-- =============================================
-- Supabase 数据库设置脚本
-- Syurlow's Blog ❄️
-- =============================================

-- 1. 创建弹幕表
CREATE TABLE IF NOT EXISTS danmaku (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nickname VARCHAR(20) NOT NULL,
    content VARCHAR(100) NOT NULL,
    color VARCHAR(20) DEFAULT '#FFFFFF',
    page_path VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_danmaku_page_path ON danmaku(page_path);
CREATE INDEX IF NOT EXISTS idx_danmaku_created_at ON danmaku(created_at DESC);

-- 启用 RLS (Row Level Security)
ALTER TABLE danmaku ENABLE ROW LEVEL SECURITY;

-- 允许所有人读取
CREATE POLICY "Allow public read" ON danmaku
    FOR SELECT USING (true);

-- 允许所有人插入
CREATE POLICY "Allow public insert" ON danmaku
    FOR INSERT WITH CHECK (true);


-- 2. 创建访客表
CREATE TABLE IF NOT EXISTS visitors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    visitor_id VARCHAR(50) NOT NULL,
    province VARCHAR(50),
    city VARCHAR(50),
    country VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_visitors_province ON visitors(province);
CREATE INDEX IF NOT EXISTS idx_visitors_created_at ON visitors(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitors_visitor_id ON visitors(visitor_id);

-- 启用 RLS
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

-- 允许所有人读取
CREATE POLICY "Allow public read" ON visitors
    FOR SELECT USING (true);

-- 允许所有人插入
CREATE POLICY "Allow public insert" ON visitors
    FOR INSERT WITH CHECK (true);


-- 3. 创建访客统计函数
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


-- 4. 验证表创建成功
SELECT 'Tables created successfully!' as status;

-- 查看表结构
-- \d danmaku
-- \d visitors