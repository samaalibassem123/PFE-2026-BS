-- =========================================
-- EXTENSIONS
-- =========================================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

BEGIN;

-- =========================================
-- 0️⃣ CLEAR ALL TABLES
-- =========================================
TRUNCATE TABLE
    employee_attendance_event,
    attendance,
    members,
    user_project,
    attendance_events,
    employees,
    users,
    projects,
    departments
RESTART IDENTITY CASCADE;

-- =========================================
-- 1️⃣ DEPARTMENTS
-- Only these 8 departments
-- =========================================
INSERT INTO departments (dep_name) VALUES
('Finance'),
('RH'),
('Commercial'),
('Back Office'),
('Technique : Sécurité'),
('Technique : Réseau'),
('Technique : Voix'),
('Technique : Système');

-- =========================================
-- 2️⃣ EMPLOYEES (100)
-- =========================================
INSERT INTO employees (emp_full_name, emp_email, hire_date, dep_id)
SELECT
    'Employee ' || gs,
    'employee' || gs || '@company.com',
    NOW() - ((gs * 17) % 1825) * INTERVAL '1 day',
    ((gs - 1) % 8) + 1
FROM generate_series(1, 100) AS gs;

-- =========================================
-- 3️⃣ USERS (100)
-- Roles: ADMIN | RH | PROJECT_MANAGER
-- Passwords: Argon2 hash compatible with pwdlib
-- =========================================
INSERT INTO users (id, username, email, password, role, created_at)
SELECT
    gen_random_uuid(),
    'user' || gs,
    'user' || gs || '@company.com',
    '$argon2id$v=19$m=65536,t=3,p=4$u237uGy2mr9y3CkZf34+4Q$JvSqqlVexbut3iSI9P40ZNWW7yjn/12WdSXVpmzbrDc',
    CASE
        WHEN gs <= 10 THEN 'ADMIN'::role
        WHEN gs <= 30 THEN 'RH'::role
        ELSE 'PROJECT_MANAGER'::role
    END,
    NOW() - ((gs * 11) % 730) * INTERVAL '1 day'
FROM generate_series(1, 100) AS gs;

-- =========================================
-- 4️⃣ PROJECTS (100)
-- =========================================
INSERT INTO projects (name, identifier, created_on, updated_on)
SELECT
    'Project ' || gs,
    'PRJ' || LPAD(gs::text, 4, '0'),
    NOW() - ((gs * 13) % 365) * INTERVAL '1 day',
    NOW()
FROM generate_series(1, 100) AS gs;

-- =========================================
-- 5️⃣ MEMBERS (EMPLOYEE ↔ PROJECT) (200)
-- =========================================
WITH pairs AS (
    SELECT
        e.emp_id AS emp_id,
        p.id AS project_id
    FROM employees e
    CROSS JOIN projects p
    ORDER BY random()
    LIMIT 200
)
INSERT INTO members (emp_id, project_id)
SELECT emp_id, project_id
FROM pairs;

-- =========================================
-- 6️⃣ USER_PROJECT (USER ↔ PROJECT) (200)
-- =========================================
WITH pairs AS (
    SELECT
        u.id AS user_id,
        p.id AS project_id
    FROM users u
    CROSS JOIN projects p
    ORDER BY random()
    LIMIT 200
)
INSERT INTO user_project (user_id, project_id)
SELECT user_id, project_id
FROM pairs;

-- =========================================
-- 7️⃣ ATTENDANCE EVENTS (6)
-- =========================================
INSERT INTO attendance_events (name) VALUES
('Regular Work Day'),
('Remote Work'),
('On Customer Site'),
('Vacation'),
('Sick Leave'),
('Training');

-- =========================================
-- 8️⃣ ATTENDANCE (1000)
-- Some rows have NULL check_in / check_out
-- =========================================
WITH seed AS (
    SELECT
        gs,
        ((gs - 1) % 100) + 1 AS emp_id,
        (CURRENT_DATE - gs)::date AS att_date,
        CASE
            WHEN gs % 5 = 0 THEN TRUE
            ELSE FALSE
        END AS is_absent,
        CASE
            WHEN gs % 5 = 0 AND gs % 4 = 0 THEN 'Remote Work'
            WHEN gs % 5 = 0 AND gs % 4 = 1 THEN 'On Customer Site'
            WHEN gs % 5 = 0 AND gs % 4 = 2 THEN 'Vacation'
            WHEN gs % 5 = 0 AND gs % 4 = 3 THEN 'Sick Leave'
            ELSE 'Regular Work Day'
        END AS attendance_event_name
    FROM generate_series(1, 1000) AS gs
)
INSERT INTO attendance (emp_id, check_in, check_out, att_date, week_day)
SELECT
    emp_id,
    CASE
        WHEN is_absent THEN NULL
        ELSE att_date + TIME '08:00' + ((gs % 45) * INTERVAL '1 minute')
    END AS check_in,
    CASE
        WHEN is_absent THEN NULL
        ELSE att_date + TIME '17:00' + ((gs % 45) * INTERVAL '1 minute')
    END AS check_out,
    att_date,
    EXTRACT(DOW FROM att_date)::int AS week_day
FROM seed;

-- =========================================
-- 9️⃣ EMPLOYEE ATTENDANCE EVENT
-- Only absent attendance rows get a related event
-- =========================================
WITH seed AS (
    SELECT
        gs,
        ((gs - 1) % 100) + 1 AS emp_id,
        (CURRENT_DATE - gs)::date AS att_date,
        CASE
            WHEN gs % 5 = 0 THEN TRUE
            ELSE FALSE
        END AS is_absent,
        CASE
            WHEN gs % 5 = 0 AND gs % 4 = 0 THEN 'Remote Work'
            WHEN gs % 5 = 0 AND gs % 4 = 1 THEN 'On Customer Site'
            WHEN gs % 5 = 0 AND gs % 4 = 2 THEN 'Vacation'
            WHEN gs % 5 = 0 AND gs % 4 = 3 THEN 'Sick Leave'
            ELSE 'Regular Work Day'
        END AS attendance_event_name
    FROM generate_series(1, 1000) AS gs
)
INSERT INTO employee_attendance_event (
    emp_id,
    event_id,
    apply_time,
    start_date,
    end_date
)
SELECT
    s.emp_id,
    ae.id,
    s.att_date + TIME '09:00',
    s.att_date,
    CASE ae.name
        WHEN 'Vacation' THEN s.att_date + 5
        WHEN 'Sick Leave' THEN s.att_date + 2
        WHEN 'Remote Work' THEN s.att_date + 1
        WHEN 'On Customer Site' THEN s.att_date + 1
        WHEN 'Training' THEN s.att_date + 1
        ELSE s.att_date
    END AS end_date
FROM seed s
JOIN attendance_events ae
    ON ae.name = s.attendance_event_name
WHERE s.is_absent;

COMMIT;