SELECT * FROM public.users u; 

SELECT * FROM public.posts p;

SELECT * FROM public.tags t;

SELECT * FROM public.posts_to_tags ptt;

-- Query posts by tag name
SELECT p.*
FROM posts p
JOIN posts_to_tags ptt  ON p.id = ptt.post_id
JOIN tags t ON ptt.tag_id = t.id
WHERE t.meta_title = 'js';

SELECT *
FROM posts p
JOIN posts_to_tags ptt  ON p.id = ptt.post_id
JOIN tags t ON ptt.tag_id = t.id
WHERE t.meta_title  IN ('go', 'js');

-- Query posts by tag id
SELECT p.*
FROM posts p
JOIN posts_to_tags ptt ON p.id = ptt.post_id
WHERE ptt.tag_id = 'af1386e0-0bc6-40f6-b6d3-8343b90b2150'

-- Query posts by author id
SELECT u.* FROM posts p 
JOIN users u 
ON p.author_id = u.id
WHERE u.id = 'c618a562-ecdb-4f2e-9801-393e8f6bc26f'
