/* Multi-HR / Multi-Manager access registry
   Replace/add emails in the arrays below. The role gate is intentionally
   client-side for this GitHub Pages demo; enforce the same permissions
   with Supabase RLS for production.
*/
window.PORTAL_ROLES = {
  hr: [
    "hr1@company.com",
    "hr2@company.com",
    "hr3@company.com"
  ],
  manager: [
    "manager1@company.com",
    "manager2@company.com",
    "manager3@company.com"
  ]
};

window.getPortalRole = function(email){
  email=(email||"").trim().toLowerCase();
  if(window.PORTAL_ROLES.hr.map(x=>x.toLowerCase()).includes(email)) return "hr";
  if(window.PORTAL_ROLES.manager.map(x=>x.toLowerCase()).includes(email)) return "manager";
  return "employee";
};

window.isPortalRole = function(email, role){
  return window.getPortalRole(email) === role;
};
