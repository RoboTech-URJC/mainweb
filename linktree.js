(() => {
  const data = window.ROBOTECH_LINKTREE || window.ROBOTECH_DATA?.linktree;
  const root = document.querySelector('[data-linktree-root]');
  if (!data || !root) return;

  const iconPaths = {
    discord: '<path d="M8.7 8.6c2.2-.7 4.4-.7 6.6 0"></path><path d="M7.4 16.8c3.1 1.4 6.1 1.4 9.2 0"></path><path d="M9.2 13.4h.01"></path><path d="M14.8 13.4h.01"></path><path d="M7.2 5.5c3.4-1.3 6.9-1.3 10.3 0 1.7 2.7 2.5 5.6 2.4 8.8-2.1 1.8-4.2 2.9-6.3 3.3l-.8-1.5"></path><path d="M6.5 5.8C4.8 8.4 4 11.2 4.1 14.3c2.1 1.8 4.2 2.9 6.3 3.3l.8-1.5"></path>',
    instagram: '<rect x="4" y="4" width="16" height="16" rx="4"></rect><circle cx="12" cy="12" r="3.2"></circle><path d="M17.5 6.5h.01"></path>',
    github: '<path d="M9 19c-4 1.5-4-2-6-2.5"></path><path d="M15 22v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6A4.6 4.6 0 0 0 18.7 7c.1-.3.6-1.6-.1-3.3 0 0-1.1-.3-3.5 1.3a12.2 12.2 0 0 0-6.2 0C6.5 3.4 5.4 3.7 5.4 3.7 4.7 5.4 5.2 6.7 5.3 7A4.6 4.6 0 0 0 4 10.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V22"></path>',
    linkedin: '<path d="M6.5 10v8"></path><path d="M6.5 6v.01"></path><path d="M10.5 18v-8"></path><path d="M10.5 13.5c0-2 1.2-3.8 3.5-3.8 2 0 3.5 1.3 3.5 4V18"></path><rect x="3" y="3" width="18" height="18" rx="2"></rect>',
    mail: '<path d="M4 6h16v12H4z"></path><path d="m4 7 8 6 8-6"></path>',
    heart: '<path d="M12 21s-7-4.4-9-10.2C1.9 7.5 3.9 4 7.4 4c2 0 3.5 1.1 4.6 2.7C13.1 5.1 14.6 4 16.6 4c3.5 0 5.5 3.5 4.4 6.8C19 16.6 12 21 12 21Z"></path>',
    x: '<path d="m4 4 16 16"></path><path d="M20 4 4 20"></path>',
    web: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z"></path><path d="M2 12h20"></path><path d="M12 2c2.5 2.7 3.8 6 3.8 10S14.5 19.3 12 22c-2.5-2.7-3.8-6-3.8-10S9.5 4.7 12 2Z"></path>'
  };

  const setText = (selector, text) => {
    const node = root.querySelector(selector);
    if (node) node.textContent = text || '';
  };

  const isExternal = href => /^https?:\/\//.test(String(href || ''));
  const attrs = href => isExternal(href) ? ' target="_blank" rel="noreferrer"' : '';
  const esc = value => String(value || '').replace(/[&<>"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[char]));
  const icon = name => `<svg viewBox="0 0 24 24">${iconPaths[name] || iconPaths.web}</svg>`;
  const itemStyle = item => item.color ? ` style="--item-accent: ${esc(item.color)}"` : '';

  if (data.appearance?.backgroundImage) {
    document.body.style.setProperty('--qr-bg-image', `url("${data.appearance.backgroundImage}")`);
  }
  if (data.appearance?.accent) document.body.style.setProperty('--qr-accent', data.appearance.accent);
  document.body.dataset.linktreeTheme = data.appearance?.theme || 'dark';

  const logo = root.querySelector('[data-linktree-logo]');
  if (logo) logo.src = data.profile?.logo || 'img/logo_no_underscore.png';
  setText('[data-linktree-kicker]', data.profile?.kicker);
  setText('[data-linktree-title]', data.profile?.title);
  setText('[data-linktree-description]', data.profile?.description);

  const main = root.querySelector('[data-linktree-main]');
  if (main && data.main) {
    main.href = data.main.href || 'index.html';
    main.innerHTML = `<span class="qr-main-link__media"><img src="${esc(data.main.image)}" alt="${esc(data.main.alt)}"></span><span class="qr-main-link__copy"><strong>${esc(data.main.title)}</strong><small>${esc(data.main.description)}</small></span><span class="qr-arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg></span>`;
  }


  const iconRail = root.querySelector('[data-linktree-icons]');
  if (iconRail) {
    iconRail.replaceChildren();
    (data.iconLinks || []).forEach(item => {
      iconRail.insertAdjacentHTML('beforeend', `<a href="${esc(item.href)}"${attrs(item.href)} aria-label="${esc(item.title)}" title="${esc(item.title)}"${itemStyle(item)}>${icon(item.icon)}</a>`);
    });
  }

    const quick = root.querySelector('[data-linktree-quick]');
  if (quick) {
    quick.replaceChildren();
    (data.quickLinks || []).forEach(item => {
      quick.insertAdjacentHTML('beforeend', `<a href="${esc(item.href)}"${attrs(item.href)}${itemStyle(item)}><img src="${esc(item.image)}" alt="${esc(item.alt)}"><span>${esc(item.title)}</span></a>`);
    });
  }

  const stack = root.querySelector('[data-linktree-links]');
  if (stack) {
    stack.replaceChildren();
    (data.links || []).forEach(item => {
      const media = item.image ? `<img src="${esc(item.image)}" alt="" loading="lazy">` : icon(item.icon);
      const featured = item.featured ? ' qr-link--discord' : '';
      stack.insertAdjacentHTML('beforeend', `<a class="qr-link${featured}" href="${esc(item.href)}"${attrs(item.href)}${itemStyle(item)}><span class="qr-link__icon" aria-hidden="true">${media}</span><span><strong>${esc(item.title)}</strong><small>${esc(item.description)}</small></span></a>`);
    });
  }

  const featured = root.querySelector('[data-linktree-featured]');
  if (featured) {
    featured.replaceChildren();
    (data.featured || []).forEach(item => {
      featured.insertAdjacentHTML('beforeend', `<a href="${esc(item.href)}"${itemStyle(item)}><img src="${esc(item.image)}" alt="${esc(item.alt)}"><span>${esc(item.title)}</span></a>`);
    });
  }

  const footerImg = root.querySelector('[data-linktree-mascot]');
  if (footerImg) footerImg.src = data.profile?.mascot || 'img/PET.png';
  setText('[data-linktree-footer]', data.profile?.footer);
})();
