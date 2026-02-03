-- Seed Categories
INSERT INTO categories (id, name, slug, tag_color, sort_order) VALUES
('cat_technology', 'Technology', 'technology', 'bg-blue-100 text-blue-600', 1),
('cat_programming', 'Programming', 'programming', 'bg-indigo-100 text-indigo-600', 2),
('cat_travel', 'Travel', 'travel', 'bg-pink-100 text-pink-600', 3),
('cat_politics', 'Politics', 'politics', 'bg-red-100 text-red-600', 4),
('cat_fashion', 'Fashion', 'fashion', 'bg-purple-100 text-purple-600', 5),
('cat_marketing', 'Marketing', 'marketing', 'bg-orange-100 text-orange-600', 6),
('cat_stocks_investing', 'Stocks & Investing', 'stocks-investing', 'bg-green-100 text-green-600', 7),
('cat_business_startups', 'Business & Startups', 'business-startups', 'bg-yellow-100 text-yellow-600', 8),
('cat_personal_finance', 'Personal Finance', 'personal-finance', 'bg-emerald-100 text-emerald-600', 9),
('cat_health_fitness', 'Health & Fitness', 'health-fitness', 'bg-teal-100 text-teal-600', 10)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  tag_color = EXCLUDED.tag_color,
  sort_order = EXCLUDED.sort_order;

-- Seed Topics
INSERT INTO topics (id, category_id, name, slug, sort_order) VALUES
('top_technology_ai', 'cat_technology', 'Artificial Intelligence', 'artificial-intelligence', 1),
('top_technology_cybersecurity', 'cat_technology', 'Cybersecurity', 'cybersecurity', 2),
('top_technology_gadgets', 'cat_technology', 'Gadgets & Reviews', 'gadgets-reviews', 3),
('top_technology_cloud', 'cat_technology', 'Cloud & Infrastructure', 'cloud-infrastructure', 4),
('top_technology_productivity', 'cat_technology', 'Productivity Tools', 'productivity-tools', 5),

('top_programming_frontend', 'cat_programming', 'Frontend', 'frontend', 1),
('top_programming_backend', 'cat_programming', 'Backend', 'backend', 2),
('top_programming_javascript', 'cat_programming', 'JavaScript', 'javascript', 3),
('top_programming_react', 'cat_programming', 'React', 'react', 4),
('top_programming_data', 'cat_programming', 'Data Science', 'data-science', 5),

('top_travel_destinations', 'cat_travel', 'Destinations', 'travel-destinations', 1),
('top_travel_budget', 'cat_travel', 'Budget Travel', 'budget-travel', 2),
('top_travel_solo', 'cat_travel', 'Solo Travel', 'solo-travel', 3),
('top_travel_adventure', 'cat_travel', 'Adventure', 'adventure-travel', 4),
('top_travel_guides', 'cat_travel', 'Travel Guides', 'travel-guides', 5),

('top_politics_elections', 'cat_politics', 'Elections', 'elections', 1),
('top_politics_policy', 'cat_politics', 'Public Policy', 'public-policy', 2),
('top_politics_geopolitics', 'cat_politics', 'Geopolitics', 'geopolitics', 3),
('top_politics_civic', 'cat_politics', 'Civic Tech', 'civic-tech', 4),
('top_politics_political_theory', 'cat_politics', 'Political Theory', 'political-theory', 5),

('top_fashion_streetwear', 'cat_fashion', 'Streetwear', 'streetwear', 1),
('top_fashion_sustainable', 'cat_fashion', 'Sustainable Fashion', 'sustainable-fashion', 2),
('top_fashion_luxury', 'cat_fashion', 'Luxury', 'luxury', 3),
('top_fashion_beauty', 'cat_fashion', 'Beauty & Skincare', 'beauty-skincare', 4),
('top_fashion_industry', 'cat_fashion', 'Fashion Industry', 'fashion-industry', 5),

('top_marketing_content', 'cat_marketing', 'Content Marketing', 'content-marketing', 1),
('top_marketing_seo', 'cat_marketing', 'SEO', 'seo', 2),
('top_marketing_paid', 'cat_marketing', 'Paid Ads', 'paid-ads', 3),
('top_marketing_social', 'cat_marketing', 'Social Media', 'social-media', 4),
('top_marketing_brand', 'cat_marketing', 'Brand Strategy', 'brand-strategy', 5),

('top_stocks_stock_picks', 'cat_stocks_investing', 'Stock Picks', 'stock-picks', 1),
('top_stocks_etfs', 'cat_stocks_investing', 'ETFs & Index Funds', 'etfs-index-funds', 2),
('top_stocks_fundamental', 'cat_stocks_investing', 'Fundamental Analysis', 'fundamental-analysis', 3),
('top_stocks_technical', 'cat_stocks_investing', 'Technical Analysis', 'technical-analysis', 4),
('top_stocks_earnings_macro', 'cat_stocks_investing', 'Earnings & Macro', 'earnings-macro', 5),

('top_business_startups', 'cat_business_startups', 'Startups', 'startups', 1),
('top_business_product', 'cat_business_startups', 'Product Management', 'product-management', 2),
('top_business_fundraising', 'cat_business_startups', 'Fundraising & VC', 'fundraising-vc', 3),
('top_business_growth', 'cat_business_startups', 'Growth', 'growth', 4),
('top_business_leadership', 'cat_business_startups', 'Leadership', 'leadership', 5),

('top_pf_budgeting', 'cat_personal_finance', 'Budgeting', 'budgeting', 1),
('top_pf_debt', 'cat_personal_finance', 'Debt & Credit', 'debt-credit', 2),
('top_pf_saving', 'cat_personal_finance', 'Saving', 'saving', 3),
('top_pf_taxes', 'cat_personal_finance', 'Taxes', 'taxes', 4),
('top_pf_retirement', 'cat_personal_finance', 'Retirement Planning', 'retirement-planning', 5),

('top_health_nutrition', 'cat_health_fitness', 'Nutrition', 'nutrition', 1),
('top_health_strength', 'cat_health_fitness', 'Strength Training', 'strength-training', 2),
('top_health_cardio', 'cat_health_fitness', 'Running & Cardio', 'running-cardio', 3),
('top_health_mental', 'cat_health_fitness', 'Mental Health', 'mental-health', 4),
('top_health_sleep', 'cat_health_fitness', 'Sleep & Recovery', 'sleep-recovery', 5)
ON CONFLICT (id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  sort_order = EXCLUDED.sort_order;
