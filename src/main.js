(function () {
  var C = window.FYA_CONFIG || {};
  document.documentElement.classList.add('js');

  /* ---------- Fill settings into the page ---------- */
  document.querySelectorAll('[data-cfg]').forEach(function (el) {
    var v = C[el.getAttribute('data-cfg')];
    if (v !== undefined && v !== '') el.textContent = v;
  });
  if (!C.date) document.querySelectorAll('[data-date]').forEach(function (el) { el.remove(); });

  var links = {
    checkout: C.checkoutUrl,
    email: C.email ? 'mailto:' + C.email : '',
    whatsapp: C.whatsappNumber ? 'https://wa.me/' + C.whatsappNumber : '',
    whatsappGroup: C.whatsappGroupUrl,
    privacy: C.privacyUrl,
    terms: C.termsUrl,
    refund: C.refundUrl
  };
  if (C.passUtmToCheckout && links.checkout && location.search) {
    links.checkout += (links.checkout.indexOf('?') > -1 ? '&' : '?') + location.search.slice(1);
  }
  document.querySelectorAll('[data-link]').forEach(function (a) {
    var url = links[a.getAttribute('data-link')];
    if (url) a.href = url; else if (a.closest('.footer__nav')) a.remove();
  });

  /* ---------- Meta Pixel (only if an ID is set) ---------- */
  if (C.metaPixelId) {
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s) }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', C.metaPixelId);
    fbq('track', 'PageView');
    if (document.body.getAttribute('data-page') === 'thankyou') {
      var fired = false;
      try { fired = sessionStorage.getItem('fya_purchase') === '1'; } catch (e) {}
      if (!fired) {
        fbq('track', 'Purchase', { value: Number(C.price) || 0, currency: 'INR', content_name: 'Fire Your Agency Workshop' });
        try { sessionStorage.setItem('fya_purchase', '1'); } catch (e) {}
      }
    }
    document.querySelectorAll('[data-link="checkout"]').forEach(function (a) {
      a.addEventListener('click', function () {
        fbq('track', 'InitiateCheckout', { value: Number(C.price) || 0, currency: 'INR' });
      });
    });
  }

  /* ---------- Thank-you page: Google Calendar button ---------- */
  var cal = document.getElementById('calendar');
  if (cal && C.calendarStart && C.calendarEnd) {
    var details = 'Live AI Ads build session by Perfomity Media. Zoom link is in the WhatsApp group + your email. Bring your laptop.' +
      (C.whatsappGroupUrl ? '\n\nWhatsApp group: ' + C.whatsappGroupUrl : '');
    cal.href = 'https://calendar.google.com/calendar/render?action=TEMPLATE' +
      '&text=' + encodeURIComponent('Fire Your Agency — AI Ads Workshop (Zoom)') +
      '&dates=' + C.calendarStart + '/' + C.calendarEnd +
      '&ctz=Asia/Kolkata' +
      '&details=' + encodeURIComponent(details);
    cal.hidden = false;
  }

  /* ---------- Fade sections up, start chat on scroll ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.fade, #chat');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add(e.target.id === 'chat' ? 'play' : 'in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add(t.id === 'chat' ? 'play' : 'in'); });
  }

  /* ---------- "Which one is AI?" ---------- */
  var test = document.getElementById('aitest');
  if (test) {
    test.querySelectorAll('.imgcard').forEach(function (card) {
      card.addEventListener('click', function () {
        test.classList.add('revealed');
        test.querySelector('.aitest__hint').hidden = true;
        test.querySelector('.aitest__result').hidden = false;
      });
    });
  }

  /* ---------- AI videos: autoplay muted in view, tap for sound ---------- */
  var vids = document.getElementById('vids');
  if (vids) {
    var cards = vids.querySelectorAll('.vid');
    var setSound = function (card, on) {
      var v = card.querySelector('video');
      v.muted = !on;
      card.classList.toggle('is-unmuted', on);
      card.setAttribute('aria-pressed', on ? 'true' : 'false');
    };
    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        var v = card.querySelector('video');
        var turnOn = v.muted;
        cards.forEach(function (c) { if (c !== card) setSound(c, false); });
        setSound(card, turnOn);
        if (turnOn) { v.currentTime = 0; }
        var pr = v.play(); if (pr && pr.catch) pr.catch(function () {});
      });
    });
    if ('IntersectionObserver' in window) {
      var vio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          var v = e.target.querySelector('video');
          if (e.isIntersecting && !reduce) {
            if (v.preload === 'none') v.preload = 'auto';
            var pr = v.play(); if (pr && pr.catch) pr.catch(function () {});
          } else {
            v.pause();
            if (!e.isIntersecting) setSound(e.target, false);
          }
        });
      }, { threshold: 0.6 });
      cards.forEach(function (c) { vio.observe(c); });
    }
    document.querySelectorAll('.vids__btn').forEach(function (b) {
      b.addEventListener('click', function () {
        vids.scrollBy({ left: Number(b.getAttribute('data-dir')) * vids.clientWidth * 0.8, behavior: 'smooth' });
      });
    });
  }

  /* ---------- FAQ: one open at a time ---------- */
  var items = document.querySelectorAll('.faq details');
  items.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) items.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });
})();
