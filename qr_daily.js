// 118 Attendance — daily-rotating QR code helper.
//
// The Company Attendance QR shown on index.html / attendance.html is
// regenerated once every 24 hours (at local midnight). The link encoded in
// the QR carries the day's date plus a token derived from
// window.QR_DAILY_SECRET (set in config.js). attendance.html checks that
// token before allowing Login/Logout, so a QR code photographed or
// screenshotted on one day will no longer be accepted the next day.
//
// IMPORTANT LIMITATION: this site is static (no server function holding a
// private secret), so the token is only a soft deterrent — anyone who reads
// the page source can see QR_DAILY_SECRET and compute a future date's token.
// It stops casual reuse of an old QR photo, but it is not unspoofable
// security. For real security this check would need to run server-side
// (e.g. a Supabase Edge Function) instead of in the browser.

(function () {
  function todayDateStr() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    return yyyy + '-' + mm + '-' + dd;
  }

  // Small deterministic (non-cryptographic) hash, good enough to make the
  // token non-obvious without adding a heavy crypto library.
  function simpleHash(str) {
    let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (let i = 0; i < str.length; i++) {
      const ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (h1 >>> 0).toString(16) + (h2 >>> 0).toString(16);
  }

  function dailyToken(dateStr) {
    const secret = window.QR_DAILY_SECRET || 'change-this-secret';
    return simpleHash(dateStr + ':' + secret);
  }

  function buildDailyQrUrl(baseUrl, extraParams) {
    const url = new URL(baseUrl, window.location.href);
    const d = todayDateStr();
    url.searchParams.set('d', d);
    url.searchParams.set('t', dailyToken(d));
    if (extraParams) {
      Object.keys(extraParams).forEach(k => {
        if (extraParams[k]) url.searchParams.set(k, extraParams[k]);
      });
    }
    return url.href;
  }

  // Returns true if the given d/t pair matches today's expected token.
  function isTodayToken(d, t) {
    if (!d || !t) return false;
    return d === todayDateStr() && t === dailyToken(d);
  }

  // Calls `callback` now, then again at the next local midnight, then every
  // 24 hours after that — so a QR code left open on a kiosk/tablet screen
  // updates itself automatically without a manual page refresh.
  function scheduleDailyRefresh(callback) {
    callback();
    function msUntilNextMidnight() {
      const now = new Date();
      const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 5);
      return next.getTime() - now.getTime();
    }
    function scheduleNext() {
      setTimeout(function () {
        callback();
        setInterval(callback, 24 * 60 * 60 * 1000);
      }, msUntilNextMidnight());
    }
    scheduleNext();
  }

  window.QRDaily = {
    todayDateStr: todayDateStr,
    dailyToken: dailyToken,
    buildDailyQrUrl: buildDailyQrUrl,
    isTodayToken: isTodayToken,
    scheduleDailyRefresh: scheduleDailyRefresh
  };
})();
