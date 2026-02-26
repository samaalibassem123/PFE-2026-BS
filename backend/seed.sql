-- =========================================
-- EXTENSIONS
-- =========================================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================================
-- 1️⃣ DEPARTMENTS
-- =========================================
INSERT INTO departments (dep_name) VALUES
('IT'),
('HR'),
('Finance'),
('Marketing');

-- =========================================
-- 2️⃣ EMPLOYEES
-- =========================================
INSERT INTO employees (emp_full_name, emp_email, hire_date, dep_id) VALUES
('Ali Ben Salah', 'ali@company.com', NOW() - INTERVAL '2 years', 1),
('Sonia Trabelsi', 'sonia@company.com', NOW() - INTERVAL '1 year', 2),
('Karim Mansour', 'karim@company.com', NOW() - INTERVAL '3 years', 1),
('Amira Haddad', 'amira@company.com', NOW() - INTERVAL '6 months', 3),
('Youssef Gharbi', 'youssef@company.com', NOW() - INTERVAL '4 years', 4);

-- =========================================
-- 3️⃣ USERS
-- Roles: ADMIN | RH | PROJECT_MANAGER
-- =========================================
INSERT INTO users (id, username, email, password, role, created_at) VALUES
(gen_random_uuid(), 'admin1', 'admin@company.com', '123456', 'ADMIN', NOW()),
(gen_random_uuid(), 'rh1', 'rh@company.com', '123456', 'RH', NOW()),
(gen_random_uuid(), 'pm1', 'pm@company.com', '123456', 'PROJECT_MANAGER', NOW()),
(gen_random_uuid(), 'pm2', 'pm2@company.com', '123456', 'PROJECT_MANAGER', NOW());

-- =========================================
-- 4️⃣ PROJECTS
-- =========================================
INSERT INTO projects (name, identifier, created_on, updated_on) VALUES
('HR System', 'HR001', NOW(), NOW()),
('AI Analytics Platform', 'AI002', NOW(), NOW()),
('Mobile Banking App', 'MB003', NOW(), NOW());

-- =========================================
-- 5️⃣ MEMBERS (EMPLOYEE ↔ PROJECT)
-- =========================================
INSERT INTO members (emp_id, project_id) VALUES
(1, 1),
(2, 1),
(3, 2),
(4, 3),
(5, 2);

-- =========================================
-- 6️⃣ USER_PROJECT (USER ↔ PROJECT)
-- =========================================
INSERT INTO user_project (user_id, project_id) VALUES
((SELECT id FROM users WHERE username = 'pm1'), 1),
((SELECT id FROM users WHERE username = 'pm1'), 2),
((SELECT id FROM users WHERE username = 'pm2'), 3);

-- =========================================
-- 7️⃣ ATTENDANCE EVENTS
-- =========================================
INSERT INTO attendance_events (name) VALUES
('Regular Work Day'),
('Remote Work'),
('Sick Leave'),
('Vacation');

-- =========================================
-- 8️⃣ ATTENDANCE
-- =========================================
INSERT INTO attendance (emp_id, check_in, check_out, att_date, week_day) VALUES
(1, NOW() - INTERVAL '8 hours', NOW(), NOW(), 1),
(2, NOW() - INTERVAL '7 hours', NOW(), NOW(), 1),
(3, NOW() - INTERVAL '6 hours', NOW(), NOW(), 1),
(4, NOW() - INTERVAL '8 hours', NOW(), NOW(), 1),
(5, NOW() - INTERVAL '5 hours', NOW(), NOW(), 1);

-- =========================================
-- 9️⃣ EMPLOYEE ATTENDANCE EVENTS
-- =========================================
INSERT INTO employee_attendance_event (emp_id, event_id, apply_time, start_date, end_date) VALUES
(2, 3, NOW(), NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day'),
(4, 4, NOW(), NOW() - INTERVAL '10 days', NOW() - INTERVAL '5 days');

-- =========================================
-- ✅ DONE
-- =========================================