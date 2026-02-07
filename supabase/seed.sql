-- Seed Categories
insert into categories (id, name, slug, sort_order, tag_color) values
('cat_business_startups', 'Business & Startups', 'business-startups', 8, 'bg-yellow-100 text-yellow-600'),
('cat_fashion', 'Fashion', 'fashion', 5, 'bg-purple-100 text-purple-600'),
('cat_health_fitness', 'Health & Fitness', 'health-fitness', 10, 'bg-teal-100 text-teal-600'),
('cat_marketing', 'Marketing', 'marketing', 2, 'bg-orange-100 text-orange-600'),
('cat_personal_finance', 'Personal Finance', 'personal-finance', 9, 'bg-emerald-100 text-emerald-600'),
('cat_politics', 'Politics', 'politics', 4, 'bg-red-100 text-red-600'),
('cat_programming', 'Programming', 'programming', 6, 'bg-indigo-100 text-indigo-600'),
('cat_stocks_investing', 'Stocks & Investing', 'stocks-investing', 7, 'bg-green-100 text-green-600'),
('cat_technology', 'Technology', 'technology', 1, 'bg-blue-100 text-blue-600'),
('cat_travel', 'Travel', 'travel', 3, 'bg-pink-100 text-pink-600')
on conflict (id) do update set
  name = excluded.name,
  slug = excluded.slug,
  sort_order = excluded.sort_order,
  tag_color = excluded.tag_color;

-- 2) Topics
-- Cleanup old topics and terms for these categories
delete from topic_terms where topic_id in (select id from topics where category_id in (
  'cat_business_startups','cat_fashion','cat_health_fitness','cat_marketing','cat_personal_finance',
  'cat_politics','cat_programming','cat_stocks_investing','cat_technology','cat_travel'
));
delete from topics where category_id in (
  'cat_business_startups','cat_fashion','cat_health_fitness','cat_marketing','cat_personal_finance',
  'cat_politics','cat_programming','cat_stocks_investing','cat_technology','cat_travel'
);

-- Technology
insert into topics (id, category_id, name, slug, sort_order) values
('top_technology_ai', 'cat_technology', 'Artificial Intelligence', 'artificial-intelligence', 1),
('top_technology_cyber', 'cat_technology', 'Cybersecurity', 'cybersecurity', 2),
('top_technology_cloud', 'cat_technology', 'Cloud & Infrastructure', 'cloud-infrastructure', 3),
('top_technology_products', 'cat_technology', 'Gadgets & Reviews', 'gadgets-reviews', 4),
('top_technology_bigtech', 'cat_technology', 'Big Tech & Regulation', 'big-tech-regulation', 5),
('top_technology_opensource', 'cat_technology', 'Open Source', 'open-source', 6);

-- Programming
insert into topics (id, category_id, name, slug, sort_order) values
('top_programming_frontend', 'cat_programming', 'Frontend', 'frontend', 1),
('top_programming_backend', 'cat_programming', 'Backend & APIs', 'backend-apis', 2),
('top_programming_javascript', 'cat_programming', 'JavaScript & Node', 'javascript-node', 3),
('top_programming_react', 'cat_programming', 'React & Next.js', 'react-nextjs', 4),
('top_programming_devops', 'cat_programming', 'DevOps & Platform', 'devops-platform', 5),
('top_programming_dataeng', 'cat_programming', 'Data Engineering', 'data-engineering', 6),
('top_programming_devtools', 'cat_programming', 'Developer Tools & AI', 'developer-tools-ai', 7),
('top_programming_fallback', 'cat_programming', 'Category Fallback', 'category-fallback', 0)
on conflict (id) do update set
  name = excluded.name,
  sort_order = excluded.sort_order;
UPDATE topics SET is_active = false WHERE id = 'top_programming_fallback';

-- Travel
insert into topics (id, category_id, name, slug, sort_order) values
('top_travel_destinations', 'cat_travel', 'Destinations', 'destinations', 1),
('top_travel_air', 'cat_travel', 'Flights & Aviation', 'flights-aviation', 2),
('top_travel_hotels', 'cat_travel', 'Hotels & Stays', 'hotels-stays', 3),
('top_travel_points', 'cat_travel', 'Points & Miles', 'points-miles', 4),
('top_travel_budget', 'cat_travel', 'Budget Travel', 'budget-travel', 5),
('top_travel_adventure', 'cat_travel', 'Adventure & Outdoors', 'adventure-outdoors', 6);

-- Politics
insert into topics (id, category_id, name, slug, sort_order) values
('top_politics_elections', 'cat_politics', 'Elections', 'elections', 1),
('top_politics_policy', 'cat_politics', 'Policy & Regulation', 'policy-regulation', 2),
('top_politics_geopolitics', 'cat_politics', 'Geopolitics', 'geopolitics', 3),
('top_politics_digital', 'cat_politics', 'Digital Rights & Platforms', 'digital-rights', 4),
('top_politics_economy', 'cat_politics', 'Political Economy', 'political-economy', 5),
('top_politics_climate', 'cat_politics', 'Climate Policy', 'climate-policy', 6);

-- Fashion
insert into topics (id, category_id, name, slug, sort_order) values
('top_fashion_industry', 'cat_fashion', 'Fashion Industry', 'fashion-industry', 1),
('top_fashion_luxury', 'cat_fashion', 'Luxury', 'luxury', 2),
('top_fashion_streetwear', 'cat_fashion', 'Streetwear', 'streetwear', 3),
('top_fashion_sustainable', 'cat_fashion', 'Sustainable Fashion', 'sustainable-fashion', 4),
('top_fashion_beauty', 'cat_fashion', 'Beauty & Skincare', 'beauty-skincare', 5),
('top_fashion_retail', 'cat_fashion', 'Retail & E-commerce', 'retail-ecommerce', 6);

-- Marketing
insert into topics (id, category_id, name, slug, sort_order) values
('top_marketing_seo', 'cat_marketing', 'SEO', 'seo', 1),
('top_marketing_paid', 'cat_marketing', 'Paid Media', 'paid-media', 2),
('top_marketing_content', 'cat_marketing', 'Content Marketing', 'content-marketing', 3),
('top_marketing_social', 'cat_marketing', 'Social Media', 'social-media', 4),
('top_marketing_analytics', 'cat_marketing', 'Analytics & Attribution', 'analytics-attribution', 5),
('top_marketing_brand', 'cat_marketing', 'Brand Strategy', 'brand-strategy', 6);

-- Stocks & Investing
insert into topics (id, category_id, name, slug, sort_order) values
('top_stocks_markets', 'cat_stocks_investing', 'Markets & Macro', 'markets-macro', 1),
('top_stocks_earnings', 'cat_stocks_investing', 'Earnings', 'earnings', 2),
('top_stocks_etfs', 'cat_stocks_investing', 'ETFs & Index Funds', 'etfs-index-funds', 3),
('top_stocks_fundamental', 'cat_stocks_investing', 'Fundamental Analysis', 'fundamental-analysis', 4),
('top_stocks_technical', 'cat_stocks_investing', 'Technical Analysis', 'technical-analysis', 5),
('top_stocks_crypto', 'cat_stocks_investing', 'Crypto Markets', 'crypto-markets', 6);

-- Business & Startups
insert into topics (id, category_id, name, slug, sort_order) values
('top_business_startups', 'cat_business_startups', 'Startups', 'startups', 1),
('top_business_vc', 'cat_business_startups', 'Venture Capital', 'venture-capital', 2),
('top_business_product', 'cat_business_startups', 'Product Management', 'product-management', 3),
('top_business_growth', 'cat_business_startups', 'Growth', 'growth', 4),
('top_business_leadership', 'cat_business_startups', 'Leadership', 'leadership', 5),
('top_business_work', 'cat_business_startups', 'Work & Teams', 'work-teams', 6);

-- Personal Finance
insert into topics (id, category_id, name, slug, sort_order) values
('top_pf_budgeting', 'cat_personal_finance', 'Budgeting', 'budgeting', 1),
('top_pf_credit', 'cat_personal_finance', 'Debt & Credit', 'debt-credit', 2),
('top_pf_taxes', 'cat_personal_finance', 'Taxes', 'taxes', 3),
('top_pf_retirement', 'cat_personal_finance', 'Retirement Planning', 'retirement-planning', 4),
('top_pf_insurance', 'cat_personal_finance', 'Insurance', 'insurance', 5),
('top_pf_housing', 'cat_personal_finance', 'Housing', 'housing', 6);

-- Health & Fitness
insert into topics (id, category_id, name, slug, sort_order) values
('top_health_nutrition', 'cat_health_fitness', 'Nutrition', 'nutrition', 1),
('top_health_strength', 'cat_health_fitness', 'Strength Training', 'strength-training', 2),
('top_health_cardio', 'cat_health_fitness', 'Running & Cardio', 'running-cardio', 3),
('top_health_mental', 'cat_health_fitness', 'Mental Health', 'mental-health', 4),
('top_health_sleep', 'cat_health_fitness', 'Sleep & Recovery', 'sleep-recovery', 5),
('top_health_science', 'cat_health_fitness', 'Health Science', 'health-science', 6);

-- 3) Topic terms (synonyms)

-- Programming: Frontend
insert into topic_terms (topic_id, term, term_type, weight, is_ambiguous, requires_anchor, anchor_terms) values
('top_programming_frontend', 'frontend', 'keyword', 5, false, false, '{}'),
('top_programming_frontend', 'front-end', 'keyword', 5, false, false, '{}'),
('top_programming_frontend', 'css', 'keyword', 3, false, false, '{}'),
('top_programming_frontend', 'tailwindcss', 'keyword', 4, false, false, '{}'),
('top_programming_frontend', 'web components', 'phrase', 4, false, false, '{}'),
('top_programming_frontend', 'vue', 'keyword', 4, true, true, ARRAY['javascript','frontend','vue.js']),
('top_programming_frontend', 'vue.js', 'token', 5, false, false, '{}'),
('top_programming_frontend', 'svelte', 'keyword', 4, false, false, '{}'),
('top_programming_frontend', 'angular', 'keyword', 4, false, false, '{}'),
('top_programming_frontend', 'html5', 'keyword', 3, false, false, '{}'),
('top_programming_frontend', 'responsive design', 'phrase', 2, false, false, '{}'),
('top_programming_frontend', 'web development', 'phrase', 3, false, false, '{}');

-- Programming: JavaScript & Node
insert into topic_terms (topic_id, term, term_type, weight, is_ambiguous, requires_anchor, anchor_terms) values
('top_programming_javascript', 'javascript', 'keyword', 5, false, false, '{}'),
('top_programming_javascript', 'typescript', 'keyword', 5, false, false, '{}'),
('top_programming_javascript', 'ecmascript', 'keyword', 3, false, false, '{}'),
('top_programming_javascript', 'node.js', 'token', 5, false, false, '{}'),
('top_programming_javascript', 'nodejs', 'keyword', 4, false, false, '{}'),
('top_programming_javascript', 'deno', 'keyword', 4, false, false, '{}'),
('top_programming_javascript', 'bun', 'keyword', 3, true, true, ARRAY['javascript','runtime','bundler']),
('top_programming_javascript', 'npm', 'keyword', 3, false, false, '{}'),
('top_programming_javascript', 'pnpm', 'keyword', 2, false, false, '{}'),
('top_programming_javascript', 'es6', 'keyword', 2, false, false, '{}'),
('top_programming_javascript', 'esm', 'keyword', 2, true, true, ARRAY['javascript','module','ecmascript']),
('top_programming_javascript', 'v8 engine', 'phrase', 2, false, false, '{}'),
('top_programming_javascript', 'node', 'keyword', 1, true, true, ARRAY['javascript','node.js','nodejs','runtime']);

-- Programming: React & Next.js
insert into topic_terms (topic_id, term, term_type, weight, is_ambiguous, requires_anchor, anchor_terms) values
('top_programming_react', 'react', 'keyword', 5, false, false, '{}'),
('top_programming_react', 'react.js', 'token', 5, false, false, '{}'),
('top_programming_react', 'reactjs', 'keyword', 4, false, false, '{}'),
('top_programming_react', 'next.js', 'token', 5, false, false, '{}'),
('top_programming_react', 'nextjs', 'keyword', 4, false, false, '{}'),
('top_programming_react', 'remix', 'keyword', 3, true, true, ARRAY['react','javascript','framework']),
('top_programming_react', 'gatsby', 'keyword', 3, false, false, '{}'),
('top_programming_react', 'react server components', 'phrase', 4, false, false, '{}'),
('top_programming_react', 'server components', 'phrase', 3, false, false, '{}'),
('top_programming_react', 'jsx', 'keyword', 3, false, false, '{}'),
('top_programming_react', 'tsx', 'keyword', 3, false, false, '{}'),
('top_programming_react', 'react hooks', 'phrase', 3, false, false, '{}'),
('top_programming_react', 'react native', 'phrase', 3, false, false, '{}'),
('top_programming_react', 'vercel', 'keyword', 3, false, false, '{}');

-- Programming: Backend & APIs
insert into topic_terms (topic_id, term, term_type, weight, is_ambiguous, requires_anchor, anchor_terms) values
('top_programming_backend', 'backend', 'keyword', 4, false, false, '{}'),
('top_programming_backend', 'back-end', 'keyword', 4, false, false, '{}'),
('top_programming_backend', 'rest api', 'phrase', 4, false, false, '{}'),
('top_programming_backend', 'restful', 'keyword', 3, false, false, '{}'),
('top_programming_backend', 'graphql', 'keyword', 5, false, false, '{}'),
('top_programming_backend', 'grpc', 'keyword', 4, false, false, '{}'),
('top_programming_backend', 'microservices', 'keyword', 4, false, false, '{}'),
('top_programming_backend', 'distributed systems', 'phrase', 3, false, false, '{}'),
('top_programming_backend', 'postgres', 'keyword', 4, false, false, '{}'),
('top_programming_backend', 'postgresql', 'keyword', 4, false, false, '{}'),
('top_programming_backend', 'mysql', 'keyword', 3, false, false, '{}'),
('top_programming_backend', 'redis', 'keyword', 4, false, false, '{}'),
('top_programming_backend', 'mongodb', 'keyword', 3, false, false, '{}'),
('top_programming_backend', 'api design', 'phrase', 3, false, false, '{}'),
('top_programming_backend', 'database', 'keyword', 2, true, true, ARRAY['sql','postgres','mysql','backend']);

-- Programming: DevOps & Platform
insert into topic_terms (topic_id, term, term_type, weight, is_ambiguous, requires_anchor, anchor_terms) values
('top_programming_devops', 'devops', 'keyword', 5, false, false, '{}'),
('top_programming_devops', 'platform engineering', 'phrase', 5, false, false, '{}'),
('top_programming_devops', 'sre', 'keyword', 4, false, false, '{}'),
('top_programming_devops', 'site reliability', 'phrase', 4, false, false, '{}'),
('top_programming_devops', 'kubernetes', 'keyword', 5, false, false, '{}'),
('top_programming_devops', 'k8s', 'keyword', 4, false, false, '{}'),
('top_programming_devops', 'docker', 'keyword', 5, false, false, '{}'),
('top_programming_devops', 'container', 'keyword', 3, true, true, ARRAY['docker','kubernetes','k8s','podman']),
('top_programming_devops', 'terraform', 'keyword', 5, false, false, '{}'),
('top_programming_devops', 'infrastructure as code', 'phrase', 4, false, false, '{}'),
('top_programming_devops', 'ci/cd', 'token', 5, false, false, '{}'),
('top_programming_devops', 'cicd', 'keyword', 4, false, false, '{}'),
('top_programming_devops', 'continuous integration', 'phrase', 3, false, false, '{}'),
('top_programming_devops', 'continuous deployment', 'phrase', 3, false, false, '{}'),
('top_programming_devops', 'github actions', 'phrase', 5, false, false, '{}'),
('top_programming_devops', 'gitlab ci', 'phrase', 4, false, false, '{}'),
('top_programming_devops', 'jenkins', 'keyword', 3, false, false, '{}'),
('top_programming_devops', 'argocd', 'keyword', 3, false, false, '{}'),
('top_programming_devops', 'helm', 'keyword', 3, true, true, ARRAY['kubernetes','k8s','chart']),
('top_programming_devops', 'aws', 'keyword', 3, false, false, '{}'),
('top_programming_devops', 'azure', 'keyword', 3, false, false, '{}'),
('top_programming_devops', 'gcp', 'keyword', 3, false, false, '{}'),
('top_programming_devops', 'cloud', 'keyword', 2, true, true, ARRAY['aws','azure','gcp','kubernetes','infrastructure']);

-- Programming: Data Engineering
insert into topic_terms (topic_id, term, term_type, weight, is_ambiguous, requires_anchor, anchor_terms) values
('top_programming_dataeng', 'data engineering', 'phrase', 5, false, false, '{}'),
('top_programming_dataeng', 'data pipeline', 'phrase', 5, false, false, '{}'),
('top_programming_dataeng', 'etl', 'keyword', 4, false, false, '{}'),
('top_programming_dataeng', 'elt', 'keyword', 3, false, false, '{}'),
('top_programming_dataeng', 'apache spark', 'phrase', 5, false, false, '{}'),
('top_programming_dataeng', 'spark', 'keyword', 4, true, true, ARRAY['apache','data','big data']),
('top_programming_dataeng', 'apache kafka', 'phrase', 5, false, false, '{}'),
('top_programming_dataeng', 'kafka', 'keyword', 4, false, false, '{}'),
('top_programming_dataeng', 'airflow', 'keyword', 5, false, false, '{}'),
('top_programming_dataeng', 'dbt', 'keyword', 4, false, false, '{}'),
('top_programming_dataeng', 'snowflake', 'keyword', 4, false, false, '{}'),
('top_programming_dataeng', 'databricks', 'keyword', 4, false, false, '{}'),
('top_programming_dataeng', 'data warehouse', 'phrase', 3, false, false, '{}'),
('top_programming_dataeng', 'data lake', 'phrase', 3, false, false, '{}'),
('top_programming_dataeng', 'streaming data', 'phrase', 3, false, false, '{}');

-- Programming: Developer Tools & AI
insert into topic_terms (topic_id, term, term_type, weight, is_ambiguous, requires_anchor, anchor_terms) values
('top_programming_devtools', 'github', 'keyword', 5, false, false, '{}'),
('top_programming_devtools', 'gitlab', 'keyword', 4, false, false, '{}'),
('top_programming_devtools', 'git', 'keyword', 3, true, true, ARRAY['github','gitlab','version control','repository']),
('top_programming_devtools', 'copilot', 'keyword', 5, false, false, '{}'),
('top_programming_devtools', 'github copilot', 'phrase', 5, false, false, '{}'),
('top_programming_devtools', 'ai coding', 'phrase', 5, false, false, '{}'),
('top_programming_devtools', 'code assistant', 'phrase', 4, false, false, '{}'),
('top_programming_devtools', 'cursor', 'keyword', 3, true, true, ARRAY['ai','ide','coding','editor']),
('top_programming_devtools', 'developer tools', 'phrase', 5, false, false, '{}'),
('top_programming_devtools', 'developer experience', 'phrase', 4, false, false, '{}'),
('top_programming_devtools', 'dx', 'keyword', 2, true, true, ARRAY['developer','experience','devex']),
('top_programming_devtools', 'vscode', 'keyword', 4, false, false, '{}'),
('top_programming_devtools', 'visual studio code', 'phrase', 4, false, false, '{}'),
('top_programming_devtools', 'ide', 'keyword', 3, false, false, '{}'),
('top_programming_devtools', 'jetbrains', 'keyword', 3, false, false, '{}'),
('top_programming_devtools', 'intellij', 'keyword', 3, false, false, '{}'),
('top_programming_devtools', 'code review', 'phrase', 3, false, false, '{}'),
('top_programming_devtools', 'pull request', 'phrase', 3, false, false, '{}'),
('top_programming_devtools', 'agent', 'keyword', 2, true, true, ARRAY['github','ai','copilot','coding','developer']),
('top_programming_devtools', 'agentic', 'keyword', 3, true, true, ARRAY['ai','coding','developer']),
('top_programming_devtools', 'cli', 'keyword', 2, false, false, '{}'),
('top_programming_devtools', 'terminal', 'keyword', 2, true, true, ARRAY['developer','cli','command']);

-- Programming: Category Fallback
insert into topic_terms (topic_id, term, term_type, weight, is_ambiguous, requires_anchor, anchor_terms) values
('top_programming_fallback', 'software developer', 'phrase', 5, false, false, '{}'),
('top_programming_fallback', 'software engineering', 'phrase', 5, false, false, '{}'),
('top_programming_fallback', 'programming', 'keyword', 4, false, false, '{}'),
('top_programming_fallback', 'coding', 'keyword', 4, false, false, '{}'),
('top_programming_fallback', 'open source', 'phrase', 3, false, false, '{}'),
('top_programming_fallback', 'developer', 'keyword', 3, false, false, '{}'),
('top_programming_fallback', 'software', 'keyword', 2, true, true, ARRAY['developer','engineering','development']);

-- Marketing: SEO
insert into topic_terms (topic_id, term, term_type, weight) values
('top_marketing_seo', 'seo', 'keyword', 5),
('top_marketing_seo', 'search engine optimization', 'phrase', 5),
('top_marketing_seo', 'serp', 'keyword', 3),
('top_marketing_seo', 'google search', 'phrase', 3),
('top_marketing_seo', 'core update', 'phrase', 2),
('top_marketing_seo', 'backlinks', 'keyword', 2);

-- Personal Finance: Budgeting
insert into topic_terms (topic_id, term, term_type, weight) values
('top_pf_budgeting', 'budgeting', 'keyword', 5),
('top_pf_budgeting', 'cash flow', 'phrase', 3),
('top_pf_budgeting', 'expense tracking', 'phrase', 3),
('top_pf_budgeting', 'emergency fund', 'phrase', 3);

-- Health: Nutrition
insert into topic_terms (topic_id, term, term_type, weight) values
('top_health_nutrition', 'nutrition', 'keyword', 5),
('top_health_nutrition', 'dietary guidelines', 'phrase', 2),
('top_health_nutrition', 'protein intake', 'phrase', 2),
('top_health_nutrition', 'blood sugar', 'phrase', 2);

-- Travel: Destinations
insert into topic_terms (topic_id, term, term_type, weight) values
('top_travel_destinations', 'travel guide', 'phrase', 4),
('top_travel_destinations', 'things to do', 'phrase', 3),
('top_travel_destinations', 'where to stay', 'phrase', 3),
('top_travel_destinations', 'best time to visit', 'phrase', 3);

-- Fashion: Fashion Industry
insert into topic_terms (topic_id, term, term_type, weight, is_ambiguous, requires_anchor, anchor_terms) values
('top_fashion_industry', 'fashion week', 'phrase', 5, false, false, '{}'),
('top_fashion_industry', 'fashion industry', 'phrase', 5, false, false, '{}'),
('top_fashion_industry', 'fashion show', 'phrase', 4, false, false, '{}'),
('top_fashion_industry', 'runway', 'keyword', 3, true, true, ARRAY['fashion','model','show']),
('top_fashion_industry', 'creative director', 'phrase', 3, false, false, '{}'),
('top_fashion_industry', 'fashion designer', 'phrase', 4, false, false, '{}'),
('top_fashion_industry', 'Paris Fashion Week', 'phrase', 4, false, false, '{}'),
('top_fashion_industry', 'Milan Fashion Week', 'phrase', 4, false, false, '{}');

-- Fashion: Beauty & Skincare
insert into topic_terms (topic_id, term, term_type, weight, is_ambiguous, requires_anchor, anchor_terms) values
('top_fashion_beauty', 'beauty', 'keyword', 5, false, false, '{}'),
('top_fashion_beauty', 'skincare', 'keyword', 5, false, false, '{}'),
('top_fashion_beauty', 'cosmetics', 'keyword', 5, false, false, '{}'),
('top_fashion_beauty', 'makeup', 'keyword', 4, false, false, '{}'),
('top_fashion_beauty', 'skin care', 'phrase', 5, false, false, '{}'),
('top_fashion_beauty', 'beauty products', 'phrase', 4, false, false, '{}'),
('top_fashion_beauty', 'anti-aging', 'keyword', 3, false, false, '{}'),
('top_fashion_beauty', 'serum', 'keyword', 3, true, true, ARRAY['skincare','beauty','skin']),
('top_fashion_beauty', 'moisturizer', 'keyword', 3, false, false, '{}'),
('top_fashion_beauty', 'sunscreen', 'keyword', 3, false, false, '{}');

-- Fashion: Luxury
insert into topic_terms (topic_id, term, term_type, weight, is_ambiguous, requires_anchor, anchor_terms) values
('top_fashion_luxury', 'luxury fashion', 'phrase', 5, false, false, '{}'),
('top_fashion_luxury', 'luxury brands', 'phrase', 5, false, false, '{}'),
('top_fashion_luxury', 'designer', 'keyword', 4, false, false, '{}'),
('top_fashion_luxury', 'haute couture', 'phrase', 5, false, false, '{}'),
('top_fashion_luxury', 'Louis Vuitton', 'keyword', 4, false, false, '{}'),
('top_fashion_luxury', 'Gucci', 'keyword', 4, false, false, '{}'),
('top_fashion_luxury', 'Prada', 'keyword', 4, false, false, '{}'),
('top_fashion_luxury', 'Chanel', 'keyword', 4, false, false, '{}'),
('top_fashion_luxury', 'LVMH', 'keyword', 4, false, false, '{}'),
('top_fashion_luxury', 'Hermès', 'keyword', 4, false, false, '{}');

-- Fashion: Streetwear
insert into topic_terms (topic_id, term, term_type, weight, is_ambiguous, requires_anchor, anchor_terms) values
('top_fashion_streetwear', 'streetwear', 'keyword', 5, false, false, '{}'),
('top_fashion_streetwear', 'sneakers', 'keyword', 4, false, false, '{}'),
('top_fashion_streetwear', 'sneaker culture', 'phrase', 4, false, false, '{}'),
('top_fashion_streetwear', 'Nike', 'keyword', 3, false, false, '{}'),
('top_fashion_streetwear', 'Adidas', 'keyword', 3, false, false, '{}'),
('top_fashion_streetwear', 'Supreme', 'keyword', 4, false, false, '{}'),
('top_fashion_streetwear', 'Off-White', 'keyword', 4, false, false, '{}'),
('top_fashion_streetwear', 'hypebeast', 'keyword', 3, false, false, '{}');

-- Fashion: Sustainable Fashion
insert into topic_terms (topic_id, term, term_type, weight, is_ambiguous, requires_anchor, anchor_terms) values
('top_fashion_sustainable', 'sustainable fashion', 'phrase', 5, false, false, '{}'),
('top_fashion_sustainable', 'eco-friendly fashion', 'phrase', 5, false, false, '{}'),
('top_fashion_sustainable', 'ethical fashion', 'phrase', 5, false, false, '{}'),
('top_fashion_sustainable', 'slow fashion', 'phrase', 4, false, false, '{}'),
('top_fashion_sustainable', 'recycled clothing', 'phrase', 4, false, false, '{}'),
('top_fashion_sustainable', 'sustainable brands', 'phrase', 4, false, false, '{}'),
('top_fashion_sustainable', 'eco fashion', 'phrase', 4, false, false, '{}');

-- Fashion: Retail & E-commerce
insert into topic_terms (topic_id, term, term_type, weight, is_ambiguous, requires_anchor, anchor_terms) values
('top_fashion_retail', 'fashion retail', 'phrase', 5, false, false, '{}'),
('top_fashion_retail', 'e-commerce fashion', 'phrase', 4, false, false, '{}'),
('top_fashion_retail', 'online shopping', 'phrase', 3, true, true, ARRAY['fashion','clothing','retail']),
('top_fashion_retail', 'fashion e-commerce', 'phrase', 4, false, false, '{}'),
('top_fashion_retail', 'Zara', 'keyword', 3, false, false, '{}'),
('top_fashion_retail', 'H&M', 'keyword', 3, false, false, '{}'),
('top_fashion_retail', 'fast fashion', 'phrase', 4, false, false, '{}'),
('top_fashion_retail', 'fashion marketplace', 'phrase', 3, false, false, '{}');

-- Business: Startups
insert into topic_terms (topic_id, term, term_type, weight) values
('top_business_startups', 'startup', 'keyword', 4),
('top_business_startups', 'startups', 'keyword', 4),
('top_business_startups', 'seed round', 'phrase', 3),
('top_business_startups', 'series a', 'phrase', 3),
('top_business_startups', 'product-market fit', 'phrase', 2);

-- Stocks: Markets & Macro
insert into topic_terms (topic_id, term, term_type, weight) values
('top_stocks_markets', 'stock market', 'phrase', 4),
('top_stocks_markets', 'markets', 'keyword', 2),
('top_stocks_markets', 'inflation', 'keyword', 3),
('top_stocks_markets', 'interest rates', 'phrase', 3),
('top_stocks_markets', 'central bank', 'phrase', 2);

-- 4) Sources (trusted domains)

insert into sources (domain, label, homepage) values
('infoq.com', 'InfoQ', 'https://www.infoq.com/'),
('thenewstack.io', 'The New Stack', 'https://thenewstack.io/'),
('sdtimes.com', 'SD Times', 'https://sdtimes.com/'),
('github.blog', 'GitHub Blog', 'https://github.blog/'),

('searchenginejournal.com', 'Search Engine Journal', 'https://www.searchenginejournal.com/'),
('searchengineland.com', 'Search Engine Land', 'https://searchengineland.com/'),

('nerdwallet.com', 'NerdWallet', 'https://www.nerdwallet.com/'),
('investopedia.com', 'Investopedia', 'https://www.investopedia.com/'),

('nih.gov', 'NIH', 'https://www.nih.gov/health-information'),
('health.harvard.edu', 'Harvard Health', 'https://www.health.harvard.edu/'),
('cdc.gov', 'CDC', 'https://www.cdc.gov/'),
('mayoclinic.org', 'Mayo Clinic', 'https://www.mayoclinic.org/'),

('lonelyplanet.com', 'Lonely Planet', 'https://www.lonelyplanet.com/'),
('nationalgeographic.com', 'National Geographic Travel', 'https://www.nationalgeographic.com/travel'),
('cntraveler.com', 'Condé Nast Traveler', 'https://www.cntraveler.com/'),

('techcrunch.com', 'TechCrunch', 'https://techcrunch.com/category/startups/'),
('news.crunchbase.com', 'Crunchbase News', 'https://news.crunchbase.com/'),
('sifted.eu', 'Sifted', 'https://sifted.eu/'),

('businessoffashion.com', 'The Business of Fashion', 'https://www.businessoffashion.com/latest/'),
('vogue.com', 'Vogue Business', 'https://www.vogue.com/business/fashion'),
('fashionista.com', 'Fashionista', 'https://fashionista.com/news'),

('dev.to', 'DEV Community', 'https://dev.to/'),
('devops.com', 'DevOps.com', 'https://devops.com/'),
('changelog.com', 'Changelog', 'https://changelog.com/'),
('hackernoon.com', 'HackerNoon', 'https://hackernoon.com/'),
('smashingmagazine.com', 'Smashing Magazine', 'https://www.smashingmagazine.com/'),
('css-tricks.com', 'CSS-Tricks', 'https://css-tricks.com/'),
('learnk8s.io', 'Learnk8s', 'https://learnk8s.io/'),
('blog.logrocket.com', 'LogRocket Blog', 'https://blog.logrocket.com/'),
('martinfowler.com', 'Martin Fowler', 'https://martinfowler.com/'),

('arstechnica.com', 'Ars Technica', 'https://arstechnica.com/'),
('wired.com', 'Wired', 'https://www.wired.com/'),
('theverge.com', 'The Verge', 'https://www.theverge.com/'),
('zdnet.com', 'ZDNet', 'https://www.zdnet.com/')
on conflict (domain) do update set
  label = excluded.label,
  homepage = excluded.homepage;

-- 5) Map sources to categories (category_sources)

-- Programming
insert into category_sources (category_id, source_id, weight)
select 'cat_programming', s.id, v.weight
from (values
  ('infoq.com', 5),
  ('thenewstack.io', 5),
  ('sdtimes.com', 4),
  ('github.blog', 5),
  ('dev.to', 4),
  ('devops.com', 4),
  ('changelog.com', 4),
  ('hackernoon.com', 3),
  ('smashingmagazine.com', 3),
  ('css-tricks.com', 3),
  ('learnk8s.io', 3),
  ('blog.logrocket.com', 3),
  ('martinfowler.com', 4)
) as v(domain, weight)
join sources s on s.domain = v.domain
on conflict (category_id, source_id) do update set weight = excluded.weight, is_active = true;

-- Marketing
insert into category_sources (category_id, source_id, weight)
select 'cat_marketing', s.id, v.weight
from (values
  ('searchenginejournal.com', 5),
  ('searchengineland.com', 5)
) as v(domain, weight)
join sources s on s.domain = v.domain
on conflict (category_id, source_id) do update set weight = excluded.weight, is_active = true;

-- Personal Finance
insert into category_sources (category_id, source_id, weight)
select 'cat_personal_finance', s.id, v.weight
from (values
  ('nerdwallet.com', 5),
  ('investopedia.com', 4)
) as v(domain, weight)
join sources s on s.domain = v.domain
on conflict (category_id, source_id) do update set weight = excluded.weight, is_active = true;

-- Health & Fitness (evidence-based)
insert into category_sources (category_id, source_id, weight)
select 'cat_health_fitness', s.id, v.weight
from (values
  ('nih.gov', 5),
  ('health.harvard.edu', 5),
  ('cdc.gov', 5),
  ('mayoclinic.org', 5)
) as v(domain, weight)
join sources s on s.domain = v.domain
on conflict (category_id, source_id) do update set weight = excluded.weight, is_active = true;

-- Travel
insert into category_sources (category_id, source_id, weight)
select 'cat_travel', s.id, v.weight
from (values
  ('lonelyplanet.com', 5),
  ('nationalgeographic.com', 4),
  ('cntraveler.com', 4)
) as v(domain, weight)
join sources s on s.domain = v.domain
on conflict (category_id, source_id) do update set weight = excluded.weight, is_active = true;

-- Business & Startups
insert into category_sources (category_id, source_id, weight)
select 'cat_business_startups', s.id, v.weight
from (values
  ('techcrunch.com', 5),
  ('news.crunchbase.com', 4),
  ('sifted.eu', 4)
) as v(domain, weight)
join sources s on s.domain = v.domain
on conflict (category_id, source_id) do update set weight = excluded.weight, is_active = true;

-- Fashion
insert into category_sources (category_id, source_id, weight)
select 'cat_fashion', s.id, v.weight
from (values
  ('businessoffashion.com', 5),
  ('vogue.com', 4),
  ('fashionista.com', 3)
) as v(domain, weight)
join sources s on s.domain = v.domain
on conflict (category_id, source_id) do update set weight = excluded.weight, is_active = true;

-- Technology
insert into category_sources (category_id, source_id, weight)
select 'cat_technology', s.id, v.weight
from (values
  ('arstechnica.com', 5),
  ('wired.com', 4),
  ('theverge.com', 4),
  ('zdnet.com', 3),
  ('techcrunch.com', 5),
  ('infoq.com', 3),
  ('thenewstack.io', 3)
) as v(domain, weight)
join sources s on s.domain = v.domain
on conflict (category_id, source_id) do update set weight = excluded.weight, is_active = true;
