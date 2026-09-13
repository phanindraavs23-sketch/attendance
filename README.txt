# 118-Person Attendance — GitHub Pages + Supabase

GitHub-ready version with separate HR and Manager portals, Supabase role authentication, QR attendance, date-wise attendance filtering, and CSV export.

## GitHub repository

https://github.com/phanindraavs23-sketch/attendance

## GitHub Pages URLs

- Main portal: https://phanindraavs23-sketch.github.io/attendance/
- HR portal: https://phanindraavs23-sketch.github.io/attendance/hr.html
- Manager portal: https://phanindraavs23-sketch.github.io/attendance/manager.html
- Employee QR attendance: https://phanindraavs23-sketch.github.io/attendance/mark.html

## Files

- `index.html` — main portal selection page
- `hr.html` — HR login + all attendance dashboard
- `manager.html` — Manager login + assigned-team dashboard
- `mark.html` — employee QR attendance page
- `config.js` — Supabase Project URL + publishable key
- `supabase/schema.sql` — database tables, role model, RLS policies, 118 people
- `.nojekyll` — keeps GitHub Pages as a plain static site

## Supabase setup

1. Open the Supabase SQL Editor.
2. Run the complete `supabase/schema.sql` file.
3. In Supabase Authentication -> Users, create the HR user and manager user accounts.
4. Copy the UUID of each Auth user.
5. Add their roles to `public.profiles`:

```sql
insert into public.profiles(id,role,display_name)
values
('HR-USER-UUID-HERE','hr','HR Admin'),
('MANAGER-USER-UUID-HERE','manager','Manager 1');
```

6. Assign employees to the manager. Example for people 1-30:

```sql
insert into public.manager_people(manager_id,person_id)
select 'MANAGER-USER-UUID-HERE', id
from public.people
where id between 1 and 30;
```

7. Repeat the assignment with different employee ranges for additional managers.

## Supabase Auth URL configuration

In Supabase -> Authentication -> URL Configuration:

Site URL:

`https://phanindraavs23-sketch.github.io/attendance/`

Redirect URL:

`https://phanindraavs23-sketch.github.io/attendance/*`

The current portals use email/password sign-in with Supabase Auth. The role in `public.profiles` determines whether an account can use the HR or Manager portal.

## GitHub Pages deployment

In GitHub:

1. Open Settings -> Pages.
2. Under Build and deployment, select `Deploy from a branch`.
3. Select branch `main`.
4. Select folder `/(root)`.
5. Save.

The repository is a project site, so the published URL uses `/attendance/`.

## Attendance features

### HR

- HR-only authentication
- View attendance for all 118 people
- Select a date
- Search by person
- Login/logout totals for selected date
- Export filtered attendance to CSV
- Generate a 10-minute QR attendance session

CSV filename:

`hr-attendance-YYYY-MM-DD.csv`

### Manager

- Manager-only authentication
- View attendance only for assigned employees
- Select a date
- Search by person
- Login/logout totals for selected date
- Export filtered attendance to CSV
- View assigned active employees
- Generate a 10-minute QR attendance session

CSV filename:

`manager-attendance-YYYY-MM-DD.csv`

### Employee QR

The QR page allows an employee to select their name and submit LOGIN or LOGOUT while the generated session is valid.

## Security

- Do NOT put a Supabase `service_role` or secret key in the frontend.
- `config.js` contains only the Supabase Project URL and publishable/anon key.
- Supabase Row Level Security restricts HR and Manager data access.
- A manager cannot obtain HR access by changing the URL.
- Manager attendance is restricted to employees assigned in `manager_people`.

## Employee names

The schema initially creates `Person 1` through `Person 118`. Rename them in Supabase if required, for example:

```sql
update public.people
set name='Employee Name'
where id=1;
```

## Important

GitHub Pages is static hosting. Authentication and attendance data are handled by Supabase; no backend server is required for this frontend.


Mark page: CSV export is not included. Employees select their name and enter their location when marking attendance. Location is stored with the attendance record. If upgrading an existing Supabase database, run: ALTER TABLE public.attendance ADD COLUMN IF NOT EXISTS location text;


Attendance fields
-----------------
Employee attendance captures Employee Name (from public.people), Employee ID (people.id), Location, and Login/Logout action. The HR and Manager dashboards show Employee ID, Name, Location, Action, and Time, and their CSV exports include those fields.

If your existing Supabase attendance table does not have location, run supabase/attendance_location.sql in the Supabase SQL Editor.


EXACT GITHUB PAGES URLS
Main: https://phanindraavs23-sketch.github.io/attendance/
HR: https://phanindraavs23-sketch.github.io/attendance/hr.html
Manager: https://phanindraavs23-sketch.github.io/attendance/manager.html
Employee QR page: https://phanindraavs23-sketch.github.io/attendance/mark.html?session=...

Employee fields: Employee Name, Employee ID (EMP001-EMP118), Location, Login/Logout.
