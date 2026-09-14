118 Employee QR Attendance - GitHub Pages + Supabase

GitHub Pages:
https://phanindraavs23-sketch.github.io/118attendance/

EMPLOYEE:
https://phanindraavs23-sketch.github.io/118attendance/

HR:
https://phanindraavs23-sketch.github.io/118attendance/hr.html

MANAGER:
https://phanindraavs23-sketch.github.io/118attendance/manager.html

The HR and Manager dashboards are separate HTML pages with separate role checks.
HR users must have role HR in public.admin_roles.
Manager users must have role MANAGER in public.admin_roles.

Supabase setup:
1. Run supabase/schema.sql.
2. Run supabase/admin_dashboard.sql.
3. Create HR and Manager users in Supabase Authentication.
4. Insert each Auth user's UUID into admin_roles with the correct role.

Never put a Supabase service_role/secret key in browser code.


IMPORTANT FIX FOR EXISTING DATABASE
If Login/Logout shows:
  null value in column "session_token" of relation "attendance" violates not-null constraint

Run:
  supabase/fix_session_token.sql

This removes the NOT NULL requirement from the legacy session_token column.
The current attendance form does not need session_token.
Do not enter a service-role key in the website.

FINAL SESSION TOKEN FIX:
Run supabase/fix_session_token.sql once in Supabase SQL Editor.
It drops the obsolete session_token column. The current app does not use it.

CSV EXPORT:
Both HR and Manager dashboards now have an Export CSV button.
The export uses the currently displayed filters (search, action, from date, to date).
CSV columns:
Employee Name, Employee ID, Location, Action, Login / Logout Time
The file downloads directly in the browser and does not require a server.


EMAIL NOTIFICATIONS:
See EMAIL_SETUP.txt. Leave requests now collect employee_email and the Manager approve/reject action invokes the secure send-leave-decision-email Supabase Edge Function.
