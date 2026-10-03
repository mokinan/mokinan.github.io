(() => {
  const S = window.SITE;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const get = (path) => path.split('.').reduce((o, k) => (o ? o[k] : undefined), S);
  const el = (html) => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';
  const ghIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" class="fill"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>';

  /* ---------- Simple bindings ---------- */
  $$('[data-bind]').forEach((n) => { n.textContent = get(n.dataset.bind) ?? ''; });
  $('#year').textContent = new Date().getFullYear();
  const mailto = `mailto:${S.email}`;
  $('#emailLink').href = mailto;
  $('#heroEmail').href = mailto;
  $('#linkedinLink').href = S.links.linkedin;
  $('#githubLink').href = S.links.github;

  /* ---------- Hero title: split into words for a staggered entrance ---------- */
  const title = $('#heroTitle');
  title.innerHTML = S.hero.title;
  let wi = 0;
  const splitWords = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.append(document.createTextNode(' ')); return; }
          const w = document.createElement('span');
          w.className = 'word';
          w.innerHTML = `<span style="--i:${wi++}">${esc(part)}</span>`;
          frag.append(w);
        });
        child.replaceWith(frag);
      } else {
        splitWords(child);
      }
    });
  };
  splitWords(title);
  requestAnimationFrame(() => document.body.classList.add('loaded'));

  /* ---------- Hero phones: three devices cycling through screens ---------- */
  const phones = $('#heroPhones');
  const screens = S.hero.screens;
  ['back-left', 'front', 'back-right'].forEach((pos) => {
    phones.append(el(`<div class="phone phone--${pos}"><div class="phone__screen">${
      screens.map((s) => `<img src="${s.src}" alt="" loading="eager" decoding="async">`).join('')
    }</div></div>`));
  });
  const phoneEls = $$('.phone', phones);
  let tick = 0;
  const showScreens = () => {
    // Front phone shows screen n, side phones show the neighbours.
    [1, 0, 2].forEach((offset, p) => {
      $$('img', phoneEls[p]).forEach((img, i) => img.classList.toggle('on', i === (tick + offset) % screens.length));
    });
  };
  showScreens();
  if (!reduceMotion) {
    setInterval(() => { if (!document.hidden) { tick++; showScreens(); } }, 3400);
  }

  /* ---------- Stats ---------- */
  const stats = $('#stats');
  S.stats.forEach((s, i) => {
    stats.append(el(`<div class="stat reveal" style="--d:${i * 90}ms">
      <div class="stat__value">${s.text ? esc(s.text) : `<span data-count="${s.value}">${reduceMotion ? s.value : 0}</span>`}</div>
      <div class="stat__label">${esc(s.label)}</div></div>`));
  });

  /* ---------- Production work ---------- */
  const prod = $('#production');
  S.production.items.forEach((p, i) => {
    prod.append(el(`<a class="card spot reveal" style="--d:${i * 90}ms" href="${p.url}" target="_blank" rel="noopener">
      <div class="card__top"><span class="card__domain">${esc(p.domain)}</span><span class="card__arrow">${arrow}</span></div>
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.description)}</p>
      <ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
    </a>`));
  });
  $('#productionNote').textContent = S.production.note;

  /* ---------- Projects ---------- */
  const list = $('#projectList');
  S.projects.forEach((p, i) => {
    const flip = i % 2 === 1 ? ' project--flip' : '';
    list.append(el(`<article class="project${flip}" style="--accent:${p.accent};--accent-dark:${p.accentDark}" aria-labelledby="p-${p.id}">
      <div class="wrap project__inner">
        <div class="project__copy">
          <p class="project__index reveal">0${i + 1}</p>
          <h3 class="project__name reveal" id="p-${p.id}">${esc(p.name)}</h3>
          <p class="project__tagline reveal">${esc(p.tagline)}</p>
          <ul class="facts reveal">${p.facts.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
          <dl class="highlights">${p.highlights.map(([h, d], k) =>
            `<div class="reveal" style="--d:${k * 60}ms"><dt>${esc(h)}</dt><dd>${esc(d)}</dd></div>`).join('')}</dl>
          <ul class="tags tags--stack reveal">${p.stack.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
          <a class="btn btn--accent reveal" href="${p.repo}" target="_blank" rel="noopener">${ghIcon} View the code</a>
        </div>
        <div class="project__media" data-parallax>
          <figure class="device device--side device--a"><img src="${p.media.side[0].src}" alt="${esc(p.media.side[0].alt)}" loading="lazy" decoding="async"></figure>
          <figure class="device device--main"><img src="${p.media.main.src}" alt="${esc(p.media.main.alt)}" loading="lazy" decoding="async"></figure>
          <figure class="device device--side device--b"><img src="${p.media.side[1].src}" alt="${esc(p.media.side[1].alt)}" loading="lazy" decoding="async"></figure>
        </div>
      </div>
    </article>`));
  });

  /* ---------- Packages ---------- */
  const highlight = (code) => {
    const re = /(\/\/.*$)|('(?:[^'\\]|\\.)*')|\b(final|await|const|return|async)\b|\b([A-Z][A-Za-z]+)\b|\b(\d+)\b/gm;
    let out = ''; let last = 0; let m;
    while ((m = re.exec(code))) {
      out += esc(code.slice(last, m.index));
      const cls = m[1] ? 'c' : m[2] ? 's' : m[3] ? 'k' : m[4] ? 't' : 'n';
      out += `<span class="tok-${cls}">${esc(m[0])}</span>`;
      last = re.lastIndex;
    }
    return out + esc(code.slice(last));
  };
  const pk = $('#packages');
  S.packages.forEach((p, i) => {
    const install = `dart pub add ${p.name}`;
    pk.append(el(`<article class="package spot reveal" style="--d:${i * 90}ms">
      <header class="package__head">
        <h3><span class="package__glyph" aria-hidden="true">{ }</span>${esc(p.name)}</h3>
        <div class="package__links">
          <a href="${p.pub}" target="_blank" rel="noopener">pub.dev ${arrow}</a>
          <a href="${p.repo}" target="_blank" rel="noopener">GitHub ${arrow}</a>
        </div>
      </header>
      <p>${esc(p.description)}</p>
      <div class="install"><code>$ ${esc(install)}</code><button type="button" class="copy" data-copy="${esc(install)}" aria-label="Copy install command">Copy</button></div>
      <pre class="code"><code>${highlight(p.code)}</code></pre>
    </article>`));
  });

  /* ---------- Principles & toolbox ---------- */
  const pr = $('#principles');
  S.principles.forEach(([h, d], i) => {
    pr.append(el(`<li class="principle reveal" style="--d:${i * 80}ms"><span class="principle__n">0${i + 1}</span><h3>${esc(h)}</h3><p>${esc(d)}</p></li>`));
  });
  $('#toolbox').innerHTML = S.toolbox.map(([g, items]) =>
    `<div class="toolbox__row"><span class="toolbox__group">${esc(g)}</span><ul class="tags">${items.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div>`).join('');

  /* ---------- Copy to clipboard ---------- */
  const toast = $('#toast');
  let toastTimer;
  const notify = (msg) => {
    toast.textContent = msg; toast.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
  };
  const copy = async (text, msg) => {
    try { await navigator.clipboard.writeText(text); notify(msg); } catch { notify(text); }
  };
  $('#copyEmail').addEventListener('click', () => copy(S.email, 'Email copied'));
  pk.addEventListener('click', (e) => {
    const b = e.target.closest('.copy'); if (!b) return;
    copy(b.dataset.copy, 'Install command copied');
  });

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  $('#themeToggle').addEventListener('click', () => {
    const current = root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch {}
  });

  /* ---------- Mobile menu ---------- */
  const menuBtn = $('#menuToggle');
  const setMenu = (open) => {
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  menuBtn.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  $$('#navLinks a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Reveal on scroll + count-up ---------- */
  const countUp = (n) => {
    const target = +n.dataset.count; const start = performance.now(); const dur = 1100;
    const step = (t) => {
      const k = Math.min(1, (t - start) / dur);
      n.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      if (!reduceMotion) $$('[data-count]', en.target).forEach(countUp);
      io.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  $$('.reveal, .project__media').forEach((n) => io.observe(n));

  /* ---------- Active nav link ---------- */
  const navMap = new Map($$('#navLinks a').map((a) => [a.getAttribute('href').slice(1), a]));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const a = navMap.get(en.target.id);
      if (a && en.isIntersecting) { navMap.forEach((x) => x.classList.remove('active')); a.classList.add('active'); }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  navMap.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

  /* ---------- Scroll-linked effects: nav state, progress bar, parallax ---------- */
  const nav = $('#nav');
  const bar = $('.progress');
  const media = $$('[data-parallax]');
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle('scrolled', y > 8);
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    if (!reduceMotion) {
      media.forEach((m) => {
        const r = m.getBoundingClientRect();
        const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight; // -1..1 around the viewport centre
        m.style.setProperty('--par', Math.max(-1, Math.min(1, p)).toFixed(3));
      });
    }
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  /* ---------- Spotlight that follows the pointer on cards ---------- */
  if (matchMedia('(hover: hover)').matches) {
    document.addEventListener('pointermove', (e) => {
      const c = e.target.closest && e.target.closest('.spot');
      if (!c) return;
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', `${e.clientX - r.left}px`);
      c.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  }
})();
