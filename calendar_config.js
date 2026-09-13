// 118 Attendance calendar labels
// Add dates in YYYY-MM-DD format.
// Leave dates are shown RED. Public / festival holidays are shown GREEN.
//
// Public holidays can be listed either as plain date strings:
//   window.ATTENDANCE_PUBLIC_HOLIDAYS = ['2026-10-02'];
// or as {date, name} objects so the festival name shows on the calendar:
//   window.ATTENDANCE_PUBLIC_HOLIDAYS = [{date:'2026-10-02', name:'Gandhi Jayanti'}];
// Both formats can be mixed in the same array.

window.ATTENDANCE_LEAVES = window.ATTENDANCE_LEAVES || [];

// Indian festival / gazetted public holiday calendar for 2026.
window.ATTENDANCE_PUBLIC_HOLIDAYS = window.ATTENDANCE_PUBLIC_HOLIDAYS || [
  { date: '2026-01-26', name: 'Republic Day' },
  { date: '2026-03-04', name: 'Holi' },
  { date: '2026-03-21', name: 'Id-ul-Fitr' },
  { date: '2026-03-26', name: 'Ram Navami' },
  { date: '2026-03-31', name: 'Mahavir Jayanti' },
  { date: '2026-04-03', name: 'Good Friday' },
  { date: '2026-05-01', name: 'Buddha Purnima' },
  { date: '2026-05-27', name: 'Id-ul-Zuha (Bakrid)' },
  { date: '2026-06-26', name: 'Muharram' },
  { date: '2026-08-15', name: 'Independence Day' },
  { date: '2026-08-26', name: 'Milad-un-Nabi' },
  { date: '2026-09-04', name: 'Janmashtami' },
  { date: '2026-10-02', name: 'Gandhi Jayanti' },
  { date: '2026-10-20', name: 'Dussehra' },
  { date: '2026-11-08', name: 'Diwali' },
  { date: '2026-11-24', name: "Guru Nanak's Birthday" },
  { date: '2026-12-25', name: 'Christmas Day' }
];
