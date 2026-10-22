/* Purpose-built schematic map: no external tiles, API keys or geographic claims. */
window.BITMap = (() => {
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const pts = points => points.map(p => p.join(',')).join(' ');
  function mount(host, config = {}) {
    const t = window.BIT_I18N.t;
    const state = { site: config.site || 'palma', selected: config.selected || '', volume: config.volume ?? true, angle: 0, zoom: 1, panX: 0, panY: 0, route: null, mode: 'walk', ids: null, layers: { buildings: true, spaces: true, parking: true, charging: false, pmr: false }, ...config };
    let moved = false;
    function building(place) {
      const { x, y, w, h } = place;
      const up = state.volume ? place.floors * 10 : 0;
      const selected = place.id === state.selected;
      const base = state.layers.spaces && place.available ? '#90c9bd' : '#b8c8d4';
      const roof = selected ? '#003366' : place.type === 'land' ? '#dbedc6' : base;
      const fade = state.ids && !state.ids.includes(place.id);
      return `<g class="map-building ${selected ? 'is-selected' : ''} ${fade ? 'is-muted' : ''}" data-place="${place.id}" role="button" tabindex="${fade ? -1 : 0}" ${fade ? 'aria-hidden="true" aria-disabled="true"' : ''} aria-pressed="${selected}" aria-label="${esc(place.name)}, ${esc(place.company || t(place.type))}, ${esc(t(place.available ? 'available' : 'occupied'))}">
        <title>${esc(place.name)} · ${esc(place.company || t(place.type))}</title>
        ${up ? `<polygon points="${pts([[x + w, y], [x + w, y + h], [x + w + 12, y + h - up], [x + w + 12, y - up]])}" fill="#7895a7"/><polygon points="${pts([[x, y + h], [x + w, y + h], [x + w + 12, y + h - up], [x + 12, y + h - up]])}" fill="#8eaab5"/>` : ''}
        <polygon class="building-roof" points="${pts([[x + 12, y - up], [x + w + 12, y - up], [x + w + 12, y + h - up], [x + 12, y + h - up]])}" fill="${roof}" stroke="${selected ? '#003366' : '#fff'}" stroke-width="${selected ? 3 : 2}" ${place.type === 'land' ? 'stroke-dasharray="5 4"' : ''}/>
        ${place.floors ? `<path d="M${x + 22} ${y + 11 - up}h${w - 20}m-${w - 20} 9h${w - 20}" fill="none" stroke="${selected ? '#678fac' : '#fff'}" stroke-opacity=".5" stroke-width="2"/>` : ''}
        <text x="${x + w / 2 + 12}" y="${y + h + 22}" text-anchor="middle" class="map-label">${esc(place.name)}</text>
        ${state.layers.pmr && place.accessible ? `<g transform="translate(${x + w - 8},${y - up - 22})"><rect width="22" height="22" rx="5" fill="#175b8a"/><text x="11" y="16" text-anchor="middle" fill="white" font-size="13" font-weight="700">A</text></g>` : ''}
      </g>`;
    }
    function draw() {
      const places = window.BIT_DATA.places.filter(p => p.site === state.site);
      const size = 1080 / state.zoom;
      const vh = 650 / state.zoom;
      const scale = Math.min((host.clientWidth || 600) / size, (host.clientHeight || 400) / vh);
      host.style.setProperty('--map-label-size', `${Math.max(13, Math.min(42, 11 / scale))}px`);
      host.style.setProperty('--map-road-size', `${Math.max(11, Math.min(32, 9 / scale))}px`);
      const vx = (1080 - size) / 2 + state.panX;
      const vy = (650 - vh) / 2 + state.panY;
      const trees = Array.from({ length: 58 }, (_, i) => {
        const x = 74 + ((i * 137 + 31) % 923), y = 85 + ((i * 97) % 470);
        if (x > 185 && x < 880 && y > 170 && y < 490) return '';
        return `<circle cx="${x}" cy="${y}" r="${7 + i % 5}" fill="${i % 2 ? '#c8d8b6' : '#d6e2c8'}"/>`;
      }).join('');
      const dest = window.BIT_DATA.places.find(p => p.id === state.selected) || places[0];
      const routeColor = window.BIT_DATA.modes[state.mode]?.color || '#147854';
      host.innerHTML = `<svg class="campus-map" viewBox="${vx} ${vy} ${size} ${vh}" role="group" aria-label="${esc(t('mapLabel'))}">
        <rect x="-4000" y="-4000" width="9000" height="9000" fill="#edf1e9"/>
        <g transform="rotate(${state.angle} 540 325)">
          <path d="M0 0H1080V155L870 128 680 155 522 100 330 136 145 97 0 143Z" fill="#e0e8d5"/>
          <path d="M0 505 228 491 438 538 601 490 774 535 1080 482V650H0Z" fill="#e0e8d5"/>
          ${trees}
          <g stroke="#d7dfd5" stroke-width="28" fill="none" stroke-linejoin="round"><path d="M-40 562H185V350H940V700M185 350 285 178H905M490 178V550M705 178V550M185 550H940"/></g>
          <g stroke="white" stroke-width="22" fill="none" stroke-linejoin="round"><path d="M-40 562H185V350H940V700M185 350 285 178H905M490 178V550M705 178V550M185 550H940"/></g>
          <g stroke="#d2dbd0" stroke-width="1" fill="none"><path d="M0 607H1080M102 0V650M1020 0V650M0 116H1080"/></g>
          <path d="M50 578H165L170 540V363L274 162H910" fill="none" stroke="#9ab8a6" stroke-width="4" stroke-dasharray="8 5"/>
          <text x="530" y="345" class="map-road" text-anchor="middle">Carrer de la Innovació</text><text x="325" y="174" class="map-road" text-anchor="middle">Camí del Parc</text>
          ${state.layers.parking ? [ [302, 481], [840, 253] ].map(([x,y]) => `<g transform="translate(${x},${y})"><rect width="40" height="30" rx="5" fill="#e1e7eb" stroke="#c1cdd4"/><text x="20" y="21" text-anchor="middle" font-size="18" fill="#4f697e" font-weight="700">P</text></g>`).join('') : ''}
          ${state.layers.charging ? [[302, 447], [850, 295]].map(([x,y]) => `<g transform="translate(${x},${y})"><rect width="24" height="26" rx="5" fill="#147854"/><path d="m14 4-7 10h6l-2 8 7-11h-6z" fill="white"/></g>`).join('') : ''}
          ${state.route && dest ? `<path class="map-route-under" d="M185 555V350H${dest.x + dest.w / 2}V${dest.y + dest.h}"/><path class="map-route" style="--route-color:${routeColor}" d="M185 555V350H${dest.x + dest.w / 2}V${dest.y + dest.h}"/><circle cx="185" cy="555" r="9" fill="white" stroke="${routeColor}" stroke-width="4"/>` : ''}
          ${state.layers.buildings ? places.map(building).join('') : ''}
          <g transform="translate(150 578)"><rect width="88" height="25" rx="4" fill="white"/><text x="44" y="17" text-anchor="middle" class="map-road">${state.site === 'palma' ? 'UIB / Accés' : 'Accés / Entrada'}</text></g>
        </g>
      </svg><div class="map-site-label">${esc(window.BIT_DATA.sites.find(s => s.id === state.site)?.name || '')}</div><div class="map-compass" aria-hidden="true"><span>N</span><svg viewBox="0 0 20 28"><path d="m10 2 7 22-7-5-7 5z" fill="currentColor"/></svg></div><div class="map-controls"><button type="button" data-map-action="in" aria-label="${esc(t('zoomIn'))}">+</button><button type="button" data-map-action="out" aria-label="${esc(t('zoomOut'))}">−</button><button type="button" data-map-action="reset" aria-label="${esc(t('resetMap'))}"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 10a8 8 0 1 1 1 7M4 4v6h6" fill="none" stroke="currentColor" stroke-width="1.7"/></svg></button></div><div class="map-attribution">${esc(t('mapNote'))}</div>`;
      bind();
    }
    function bind() {
      host.querySelectorAll('[data-place]').forEach(node => {
        if (node.getAttribute('aria-disabled') === 'true') return;
        const choose = () => { if (moved) return; state.selected = node.dataset.place; draw(); config.onSelect?.(node.dataset.place); };
        node.addEventListener('click', choose);
        node.addEventListener('keydown', event => { if (['Enter', ' '].includes(event.key)) { event.preventDefault(); choose(); host.querySelector(`[data-place="${state.selected}"]`)?.focus(); } });
      });
      host.querySelectorAll('[data-map-action]').forEach(btn => btn.addEventListener('click', () => {
        const action = btn.dataset.mapAction;
        if (action === 'reset') Object.assign(state, { zoom: 1, panX: 0, panY: 0, angle: 0 });
        else state.zoom = Math.min(2.8, Math.max(0.75, state.zoom + (action === 'in' ? 0.3 : -0.3)));
        draw();
        host.querySelector(`[data-map-action="${action}"]`)?.focus({ preventScroll: true });
      }));
      const svg = host.querySelector('svg.campus-map');
      let drag = null;
      svg.addEventListener('pointerdown', event => { if (event.pointerType === 'touch') return; moved = false; drag = { x: event.clientX, y: event.clientY, px: state.panX, py: state.panY }; });
      svg.addEventListener('pointermove', event => {
        if (!drag || !(event.buttons & 1)) return;
        const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
        if (Math.abs(dx) + Math.abs(dy) < 6) return;
        moved = true;
        const scale = 1080 / state.zoom / svg.getBoundingClientRect().width;
        state.panX = Math.min(420, Math.max(-420, drag.px - dx * scale));
        state.panY = Math.min(260, Math.max(-260, drag.py - dy * scale));
        svg.setAttribute('viewBox', `${(1080 - 1080 / state.zoom) / 2 + state.panX} ${(650 - 650 / state.zoom) / 2 + state.panY} ${1080 / state.zoom} ${650 / state.zoom}`);
      });
      svg.addEventListener('pointerup', () => { drag = null; setTimeout(() => { moved = false; }, 30); });
      svg.addEventListener('pointerleave', () => { drag = null; });
    }
    draw();
    let lastWidth = host.clientWidth, lastHeight = host.clientHeight;
    const observer = new ResizeObserver(() => {
      if (!host.isConnected) { observer.disconnect(); return; }
      if (host.clientWidth && host.clientHeight && (host.clientWidth !== lastWidth || host.clientHeight !== lastHeight)) {
        lastWidth = host.clientWidth; lastHeight = host.clientHeight; draw();
      }
    });
    observer.observe(host);
    return {
      select(id) { state.selected = id; draw(); },
      update(values) { Object.assign(state, values); draw(); },
      layer(name, enabled) { state.layers[name] = enabled; draw(); },
      destroy() { observer.disconnect(); },
      get state() { return state; }
    };
  }
  return { mount };
})();
