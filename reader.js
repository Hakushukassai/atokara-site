(function () {
  var d = document.documentElement;
  var me = document.querySelector('script[data-key]');
  var p = (me ? me.getAttribute('data-key') : 'novel') + ':';
  function get(k) { try { return localStorage.getItem(p + k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(p + k, v); } catch (e) {} }

  // 文字の大きさと背景
  var btn = document.querySelector('.cfg-btn');
  var panel = document.getElementById('cfg');
  function mark() {
    panel.querySelectorAll('[data-size]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-size') === d.dataset.size));
    });
    panel.querySelectorAll('[data-theme]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-theme') === d.dataset.theme));
    });
  }
  function show(open) {
    panel.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
  }
  if (btn && panel) {
    mark();
    btn.addEventListener('click', function () { show(panel.hidden); });
    panel.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      var s = b.getAttribute('data-size'), t = b.getAttribute('data-theme');
      if (s) { d.dataset.size = s; set('size', s); }
      if (t) { d.dataset.theme = t; set('theme', t); }
      mark();
    });
    document.addEventListener('click', function (e) {
      if (!panel.hidden && !panel.contains(e.target) && !btn.contains(e.target)) show(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.hidden) { show(false); btn.focus(); }
    });
  }

  // 最後に開いた話
  var ep = document.body.getAttribute('data-ep');
  if (ep) set('last', ep);
  var resume = document.getElementById('resume');
  var last = get('last');
  if (resume && last && /^\d+\.html$/.test(last)) {
    var a = document.querySelector('.toc a[href="' + last + '"]');
    if (a) {
      resume.href = last;
      resume.querySelector('.resume-ep').textContent = a.getAttribute('data-title');
      resume.hidden = false;
    }
  }
})();
