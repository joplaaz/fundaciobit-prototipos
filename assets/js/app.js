(() => {
  'use strict';
  const D = window.BIT_DATA, I = window.BIT_I18N;
  const t = I.t, tx = I.text;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const paths = {
    arrow: 'M5 12h14m-6-6 6 6-6 6', search: 'm21 21-5-5M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15', contrast: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 0v18', menu: 'M4 6h16M4 12h16M4 18h16', close: 'm6 6 12 12M6 18 18 6', pin: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0', calendar: 'M7 3v4M17 3v4M3 10h18M5 5h14a2 2 0 0 1 2 2v13H3V7a2 2 0 0 1 2-2', building: 'M4 21V5l10-2v18M14 9h6v12M1 21h22M7 8h3M7 12h3M7 16h3M17 12h1M17 16h1', leaf: 'M4 20 17 7M4 15c-3-9 9-11 17-12 0 9-1 21-11 17', layers: 'm12 3 10 6-10 6L2 9Zm-10 11 10 6 10-6M2 19l10 6 10-6', check: 'm5 12 4 4L19 6', clock: 'M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0', download: 'M12 3v12m-5-5 5 5 5-5M4 15v6h16v-6', grid: 'M3 3h7v7H3ZM14 3h7v7h-7ZM3 14h7v7H3ZM14 14h7v7h-7Z', list: 'M8 5h13M8 12h13M8 19h13M3 5h1M3 12h1M3 19h1', walk: 'M14 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM8 21l3-7-1-5 4-2 2 5 4 2M11 14l5 4 1 4M10 9l-4 5', bike: 'M5 21a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm14 0a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM5 17l5-9 4 9H5Zm9 0 4-11h-3M8 6h5', bus: 'M5 16h14V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2ZM5 9h14M8 12h1m6 0h1M7 16v4m10-4v4M8 6h8', car: 'M3 13h18v6H3Zm1 0 3-7h10l3 7M6 19v2m12-2v2M6 16h2m8 0h2', accessible: 'M12 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM12 7v7h6l3 6M12 10h6M8 10a6 6 0 1 0 7 9', globe: 'M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Zm9 9a9 9 0 1 1-18 0 9 9 0 0 1 18 0', external: 'M14 3h7v7m0-7L10 14M10 4H4v16h16v-6', briefcase: 'M8 7V3h8v4M3 7h18v14H3ZM3 12c6 4 12 4 18 0M11 12h2v4h-2', chevron: 'm9 5 7 7-7 7', expand: 'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5', reset: 'M4 10a8 8 0 1 1 1 7M4 4v6h6', info: 'M12 11v6m0-10v1M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0'
  };
  const icon = (name, cls = '') => `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name] || paths.arrow}"/></svg>`;
  const main = document.getElementById('main');
  const modal = document.getElementById('modal');
  const routes = { inicio: 'home', servicio: 'service', agenda: 'agenda', directorio: 'directory', visor: 'viewer', movilidad: 'mobility', prototipos: 'prototypes' };
  let page = 'inicio', params = new URLSearchParams(), activeMap = null, toastTimer;
  let agendaFilters = { site: 'all', topic: 'all', format: 'all', period: 'future', view: 'grid' };
  let directoryFilters = { site: 'all', sector: 'all', query: '', available: false, accessible: false };
  let selectedPlace = 'son-espanyol';
  let viewerSite = 'palma', viewerVolume = true;
  let viewerLayers = { buildings: true, spaces: true, parking: true, charging: true, pmr: true };
  let mobilityState = { site: 'palma', origin: 'intermodal', dest: 'disset', mode: 'bike', accessible: true, calculated: false, monthly: 40 };
  let registrations = [];
  try { registrations = JSON.parse(sessionStorage.getItem('bit-registrations') || '[]'); if (!Array.isArray(registrations)) registrations = []; } catch (_) {}
  const localeDate = (value, options) => new Date(value + 'T12:00:00').toLocaleDateString(I.locale(), options);
  const formatNumber = (value, digits = 0) => Number(value).toLocaleString(I.locale(), { maximumFractionDigits: digits });
  const option = (value, label, current) => `<option value="${esc(value)}" ${value === current ? 'selected' : ''}>${esc(label)}</option>`;
  const siteOptions = (current, all = true) => `${all ? option('all', t('allSites'), current) : ''}${D.sites.map(s => option(s.id, s.name, current)).join('')}`;
  const go = (route, values = {}) => { const q = new URLSearchParams(values).toString(); const hash = '#/' + route + (q ? '?' + q : ''); if (location.hash === hash) render(); else location.hash = hash; };
  const breadcrumb = label => `<div class="breadcrumb"><a href="#/inicio">${t('home')}</a>${icon('chevron')}<span>${esc(label)}</span></div>`;
  const intro = (title, lead, extra = '') => `<div class="wrap page-intro">${breadcrumb(title)}<div class="intro-line"><div><h1>${esc(title)}</h1><p>${esc(lead)}</p></div>${extra}</div></div>`;
  const demoNote = text => `<p class="data-note">${icon('info')}<span>${esc(text)}</span></p>`;
  function toast(text) {
    clearTimeout(toastTimer); const box = document.getElementById('toast'); box.textContent = text; box.classList.add('show'); toastTimer = setTimeout(() => box.classList.remove('show'), 4500);
  }
  function download(name, content, type = 'text/plain;charset=utf-8') {
    const url = URL.createObjectURL(new Blob([content], { type })); const a = document.createElement('a'); a.href = url; a.download = name; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  function shell() {
    document.documentElement.lang = I.language;
    document.querySelectorAll('[data-i18n]').forEach(n => n.textContent = t(n.dataset.i18n));
    document.getElementById('language').value = I.language;
    const contrast = document.getElementById('contrast'); contrast.innerHTML = icon('contrast'); contrast.setAttribute('aria-label', t('highContrast'));
    document.getElementById('menu-toggle').innerHTML = icon('menu');
    document.querySelector('.skip-link').textContent = tx(['Saltar al contenido principal', 'Saltar al contingut principal', 'Skip to main content']);
    document.getElementById('main-nav').innerHTML = Object.entries(routes).filter(([id]) => id !== 'prototipos').map(([id, label]) => `<a href="#/${id}" ${page === id ? 'aria-current="page"' : ''}>${t(label)}</a>`).join('');
    document.title = `${t(routes[page])} · Fundació BIT · ${t('sample')}`;
  }
  function eventCard(event) {
    const completed = event.date < '2026-10-22';
    return `<article class="event-card"><div class="event-top"><span class="date-tile"><strong>${new Date(event.date + 'T12:00:00').getDate()}</strong><span>${localeDate(event.date, { month: 'short' }).replace('.', '')}</span></span><span class="tag">${t(event.topic)}</span></div><h3><button class="text-link" type="button" data-event="${event.id}">${esc(tx(event.title))}</button></h3><p>${esc(tx(event.summary))}</p><div class="event-meta"><span>${icon('pin')}${esc(event.venue)}</span><span>${icon('clock')}${event.time} · ${t(event.format)}</span></div><div class="event-bottom"><span>${completed ? t('completed') : registrations.includes(event.id) ? t('registered') : event.seats + ' ' + t('seats')}</span><button type="button" class="icon-button" data-event="${event.id}" aria-label="${esc(t('eventDetail') + ': ' + tx(event.title))}">${icon('arrow')}</button></div></article>`;
  }
  function homePage() {
    return `<section class="home-hero wrap"><div class="hero-copy"><h1>${t('heroTitle')}</h1><p>${t('heroText')}</p><a href="#/servicio" class="button">${t('heroCta')}${icon('arrow')}</a><div class="hero-sites"><span>ParcBIT</span><span>CentreBIT</span><span>Emprenbit</span></div></div><div class="hero-map-panel"><div class="hero-map-title"><span>${t('campusTitle')}</span><span class="live-dot" aria-hidden="true"></span></div><div id="home-map" class="map-host hero-map"></div><a class="hero-map-link" href="#/visor">${t('openMap')}${icon('arrow')}</a></div></section>
      <section class="search-section wrap"><form id="global-search" class="global-search" role="search"><label for="global-query">${t('searchPlaceholder')}</label><div class="search-field">${icon('search')}<input id="global-query" name="q" type="search" placeholder="${esc(t('searchHint'))}" required minlength="2"><button class="button" type="submit">${t('search')}${icon('arrow')}</button></div></form><div id="search-results" class="search-results" aria-live="polite"></div></section>
      <section class="quick-section wrap"><h2>${t('quickHelp')}</h2><div class="quick-links">${[['startProject','servicio','briefcase'],['findSpace','directorio?available=1','building'],['findCompany','directorio','search'],['findRoute','movilidad','pin']].map(([label,route,ic]) => `<a href="#/${route}">${icon(ic)}<span>${t(label)}</span>${icon('arrow')}</a>`).join('')}</div></section>
      <section class="events-section wrap"><div class="section-heading"><h2>${t('upcoming')}</h2><a class="inline-link" href="#/agenda">${t('allEvents')}${icon('arrow')}</a></div><div class="events-grid">${D.events.slice(0,3).map(eventCard).join('')}</div>${demoNote(t('sample'))}</section>
      <section class="centres-section"><div class="wrap"><h2>${t('knowCentres')}</h2><div class="centres-grid">${D.sites.map((s,i) => `<a href="#/visor?site=${s.id}" class="centre-row"><span class="island-number">${s.island}</span><h3>${s.name.split(' · ')[0]}</h3><p>${tx([['Un entorno para crecer en Palma.','Innovación de proximidad en Alaior.','Conectando ideas en Eivissa.'][i],['Un entorn per créixer a Palma.','Innovació de proximitat a Alaior.','Connectant idees a Eivissa.'][i],['A place to grow in Palma.','Local innovation in Alaior.','Connecting ideas in Eivissa.'][i]])}</p><span class="inline-link">${t('visitCentre')}${icon('arrow')}</span></a>`).join('')}</div></div></section>`;
  }
  function servicePage() {
    return `<div class="wrap">${breadcrumb(t('service'))}<section class="service-hero"><div><span class="status-tag">${icon('check')}${t('openCall')}</span><h1>${t('program')}</h1><p>${t('programLead')}</p><button type="button" class="button" data-form="application">${t('apply')}${icon('arrow')}</button></div><div class="program-identity" aria-hidden="true"><span>Emprenbit</span><svg viewBox="0 0 250 230"><path d="M18 191 99 110l47 47 85-110" fill="none" stroke="currentColor" stroke-width="28"/><path d="M164 45h70v70" fill="none" stroke="currentColor" stroke-width="28"/></svg><span>Idees que avancen.</span></div></section><div class="service-layout"><article class="service-body"><h2>${t('programAbout')}</h2><p>${t('programAboutText')}</p><h2>${t('requirements')}</h2><ul class="check-list">${['req1','req2','req3'].map(k=>`<li>${icon('check')}${t(k)}</li>`).join('')}</ul><h2>${t('journey')}</h2><ol class="process-list">${['step1','step2','step3'].map((k,i)=>`<li><span>${i+1}</span><h3>${t(k)}</h3></li>`).join('')}</ol><h2>${t('resources')}</h2><button class="download-row" id="download-guide" type="button">${icon('download')}<span>${t('downloadGuide')}<small>TXT · 1 KB</small></span>${icon('arrow')}</button></article><aside class="service-aside"><h2>${t('details')}</h2><dl><dt>${t('audience')}</dt><dd>${t('audienceValue')}</dd><dt>${t('site')}</dt><dd>ParcBIT · CentreBIT Menorca · CentreBIT Eivissa</dd><dt>${t('deadline')}</dt><dd>${t('deadlineValue')}</dd></dl><button class="button full" type="button" data-form="application">${t('apply')}${icon('arrow')}</button>${demoNote(t('localOnly'))}<a href="#/directorio?available=1" class="inline-link">${t('findSpace')}${icon('arrow')}</a></aside></div></div>`;
  }
  function agendaPage() {
    return `${intro(t('agendaTitle'),t('agendaLead'))}<section class="wrap agenda-section"><div class="filters-panel"><div class="filter"><label for="agenda-site">${t('site')}</label><select id="agenda-site">${siteOptions(agendaFilters.site)}</select></div><div class="filter"><label for="agenda-topic">${t('topic')}</label><select id="agenda-topic">${['all','ai','cyber','sustainability','startup'].map(k=>option(k,t(k),agendaFilters.topic)).join('')}</select></div><div class="filter"><label for="agenda-format">${t('format')}</label><select id="agenda-format">${['all','onsite','online','hybrid'].map(k=>option(k,t(k),agendaFilters.format)).join('')}</select></div><div class="filter"><label for="agenda-period">${t('period')}</label><select id="agenda-period">${['future','past'].map(k=>option(k,t(k),agendaFilters.period)).join('')}</select></div><button type="button" class="subtle-button" id="agenda-clear">${t('clear')}</button></div><div class="results-toolbar"><span id="event-count" role="status" aria-live="polite"></span><div class="segmented"><button type="button" data-event-view="grid" aria-label="${t('grid')}" aria-pressed="${agendaFilters.view==='grid'}">${icon('grid')}</button><button type="button" data-event-view="list" aria-label="${t('list')}" aria-pressed="${agendaFilters.view==='list'}">${icon('list')}</button></div></div><div id="events-results" class="events-grid ${agendaFilters.view==='list'?'list-view':''}"></div>${demoNote(t('sample'))}</section>`;
  }
  function filterPlaces() {
    const q = directoryFilters.query.toLocaleLowerCase(I.locale()).normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    return D.places.filter(p => (directoryFilters.site==='all'||p.site===directoryFilters.site) && (directoryFilters.sector==='all'||p.sector===directoryFilters.sector) && (!directoryFilters.available||p.available) && (!q||[p.name,p.company,tx(p.detail)].join(' ').toLocaleLowerCase(I.locale()).normalize('NFD').replace(/[\u0300-\u036f]/g,'').includes(q)));
  }
  function placeDetail(place) {
    if (!place) return `<p>${t('selectPlace')}</p>`;
    return `<div class="place-detail"><div class="detail-heading"><span class="tag">${t(place.type)}</span><span class="availability ${place.available?'yes':''}">${t(place.available?'available':'occupied')}</span></div><h2>${esc(place.company || place.name)}</h2><p class="place-building">${icon('building')}${esc(place.company ? place.name : D.sites.find(s=>s.id===place.site).name)}</p><p>${esc(tx(place.detail))}</p><dl class="place-facts"><div><dt>${t('surface')}</dt><dd>${formatNumber(place.area)} m²</dd></div><div><dt>${t('site')}</dt><dd>${D.sites.find(s=>s.id===place.site).island}</dd></div></dl><p class="access-label">${icon('accessible')}${t('accessible')}</p><div class="detail-actions"><a class="button" href="#/movilidad?dest=${place.id}&site=${place.site}">${t('route')}${icon('arrow')}</a>${place.available ? `<button class="button secondary" type="button" data-visit="${place.id}">${t('visit')}</button>`:''}</div><small>${t('directoryNotice')}</small></div>`;
  }
  function directoryPage() {
    return `${intro(t('directoryTitle'),t('directoryLead'))}<section class="wrap directory-section"><div class="directory-filters"><div class="filter search-filter"><label for="company-query">${t('companySearch')}</label><div class="input-icon">${icon('search')}<input id="company-query" type="search" value="${esc(directoryFilters.query)}" placeholder="${esc(t('companySearch'))}"></div></div><div class="filter"><label for="company-site">${t('site')}</label><select id="company-site">${siteOptions(directoryFilters.site)}</select></div><div class="filter"><label for="company-sector">${t('sector')}</label><select id="company-sector">${['all','software','biotech','energy','robotics'].map(k=>option(k,t(k),directoryFilters.sector)).join('')}</select></div></div><div class="results-toolbar"><label class="checkbox-label"><input id="only-available" type="checkbox" ${directoryFilters.available?'checked':''}>${t('onlyAvailable')}</label><button type="button" class="subtle-button" id="directory-view">${icon(directoryFilters.accessible?'pin':'list')}${t(directoryFilters.accessible?'mapView':'accessibleView')}</button></div><div id="directory-content"></div>${demoNote(t('directoryNotice'))}</section>`;
  }
  function viewerPage() {
    return `${intro(t('viewerTitle'),t('viewerLead'),`<button type="button" id="kiosk-toggle" class="button secondary">${icon('expand')}${t('kiosk')}</button>`)}<section class="wrap viewer-section"><div class="viewer-toolbar"><label class="inline-select"><span>${t('site')}</span><select id="viewer-site">${siteOptions(viewerSite,false)}</select></label><div class="segmented"><button type="button" data-volume="false" aria-pressed="${!viewerVolume}">${t('flat')}</button><button type="button" data-volume="true" aria-pressed="${viewerVolume}">${t('volume')}</button></div><button class="subtle-button" id="viewer-accessible" type="button">${icon('list')}${t('accessibleView')}</button></div><div class="viewer-grid"><aside class="layers-panel"><h2>${icon('layers')}${t('layers')}</h2>${Object.entries(viewerLayers).map(([key,value])=>`<label class="layer-toggle"><input type="checkbox" data-layer="${key}" ${value?'checked':''}><span>${t(key)}</span><span class="layer-swatch ${key}" aria-hidden="true"></span></label>`).join('')}<div class="rotation-field"><label for="map-angle">${t('rotation')} <output id="angle-value">0°</output></label><input id="map-angle" type="range" min="-25" max="25" step="5" value="0"></div><p class="layers-note">${icon('info')}${t('mapNote')}</p></aside><div class="viewer-map-wrap"><div id="viewer-map" class="map-host large-map"></div><div class="map-legend"><span><i class="legend-dot"></i>${t('available')}</span><span><i class="legend-dot occupied"></i>${t('buildings')}</span></div></div><aside id="viewer-detail" class="viewer-detail">${placeDetail(D.places.find(p=>p.id===selectedPlace&&p.site===viewerSite)||D.places.find(p=>p.site===viewerSite))}</aside></div><div id="viewer-table" hidden></div></section>`;
  }
  function mobilityPage() {
    return `${intro(t('mobilityTitle'),t('mobilityLead'))}<section class="wrap mobility-section"><div class="mobility-layout"><aside class="route-planner"><form id="route-form"><h2>${t('mobility')}</h2><div class="filter"><label for="route-site">${t('site')}</label><select id="route-site">${siteOptions(mobilityState.site,false)}</select></div><div class="route-fields"><div class="filter"><label for="route-origin">${t('origin')}</label><select id="route-origin">${D.origins.filter(o=>o.site===mobilityState.site||o.site==='any').map(o=>option(o.id,tx(o.title),mobilityState.origin)).join('')}</select></div><div class="filter"><label for="route-dest">${t('destination')}</label><select id="route-dest">${D.places.filter(p=>p.site===mobilityState.site).map(p=>option(p.id,p.name,mobilityState.dest)).join('')}</select></div></div><fieldset class="mode-fieldset"><legend class="sr-only">${t('format')}</legend><div class="transport-modes">${Object.entries(D.modes).map(([key,m])=>`<label class="transport-mode"><input type="radio" name="mode" value="${key}" ${mobilityState.mode===key?'checked':''}>${icon(m.icon)}<span>${t(key)}</span></label>`).join('')}</div></fieldset><label class="checkbox-label accessible-checkbox"><input id="route-accessible" type="checkbox" ${mobilityState.accessible?'checked':''}>${icon('accessible')}${t('accessibleRoute')}</label><button class="button full" type="submit">${t('calculate')}${icon('arrow')}</button></form>${demoNote(t('simulatedRoutes'))}<div id="route-results" aria-live="polite"></div></aside><div class="mobility-map-area"><div id="mobility-map" class="map-host mobility-map"></div><div class="route-bottom-bar">${icon('leaf')}<span>${t('mapNote')}</span><a href="#/visor" class="inline-link">${t('viewer')}${icon('arrow')}</a></div></div></div><section class="sustainability-panel"><div class="sustainability-intro">${icon('leaf')}<h2>${t('sustainabilityTitle')}</h2><p>${t('sustainabilityText')}</p><label for="monthly-trips">${t('journeys')}<output id="trips-output">${mobilityState.monthly}</output></label><input id="monthly-trips" type="range" min="10" max="200" value="${mobilityState.monthly}" step="10"></div><div class="sustainability-values" id="sustainability-values"></div><details class="methodology"><summary>${t('methodology')}</summary><p>${t('calculationNote')}</p></details></section></section>`;
  }
  const demoInfo = () => [
    { route:'inicio', icon:'globe', page:'40–42', title:t('home'), text:tx(['Búsqueda transversal, accesos a servicios y selección de sedes.','Cerca transversal, accessos a serveis i selecció de seus.','Global search, service shortcuts and location selection.']) },
    { route:'servicio', icon:'briefcase', page:'41–42', title:t('service'), text:tx(['Ficha Emprenbit, requisitos, descarga y solicitud en dos pasos.','Fitxa Emprenbit, requisits, descàrrega i sol·licitud en dos passos.','Emprenbit information, requirements, download and two-step application.']) },
    { route:'agenda', icon:'calendar', page:'41–42', title:t('agenda'), text:tx(['Filtros, vistas de lista y tarjetas, inscripción simulada y calendario.','Filtres, vistes de llista i targetes, inscripció simulada i calendari.','Filters, list and card views, simulated registration and calendar file.']) },
    { route:'directorio', icon:'building', page:'41, 74', title:t('directory'), text:tx(['Búsqueda de empresas y espacios, mapa sincronizado y solicitud de visita.','Cerca d’empreses i espais, mapa sincronitzat i sol·licitud de visita.','Company and space search, synchronised map and viewing request.']) },
    { route:'visor', icon:'layers', page:'75, 80, 85–87', title:t('viewer'), text:tx(['Tres sedes, capas, zoom, edificios 2.5D, vista accesible y modo quiosco.','Tres seus, capes, zoom, edificis 2.5D, vista accessible i mode quiosc.','Three locations, layers, zoom, 2.5D buildings, accessible view and kiosk mode.']) },
    { route:'movilidad', icon:'bike', page:'73, 91–92', title:t('mobility'), text:tx(['Rutas multimodales, alternativa accesible y escenario de ahorro de CO₂.','Rutes multimodals, alternativa accessible i escenari d’estalvi de CO₂.','Multimodal routes, step-free option and CO₂ savings scenario.']) }
  ];
  function prototypesPage() {
    return `${intro(t('demosTitle'),t('demosLead'))}<section class="wrap demos-section"><div class="demo-index">${demoInfo().map(d=>`<article class="demo-index-row"><div class="demo-index-icon">${icon(d.icon)}</div><div><h2>${d.title}</h2><p>${d.text}</p><small>${t('source')}: ${d.page}</small></div><a class="button secondary" href="#/${d.route}">${t('openDemo')}${icon('arrow')}</a></article>`).join('')}</div><div class="scope-section"><div><h2>${t('boundaries')}</h2><p>${t('demoScopeText')}</p><a class="inline-link" href="docs/alcance.md">${t('demoScope')}${icon('download')}</a></div><button class="button secondary" type="button" id="reset-demo">${icon('reset')}${t('resetDemo')}</button></div></section>`;
  }
  function accessibleTable(places) {
    return `<div class="table-scroll"><table class="accessible-table"><caption>${t('directory')} · ${t('sample')}</caption><thead><tr><th scope="col">${t('building')}</th><th scope="col">${t('company')}</th><th scope="col">${t('site')}</th><th scope="col">${t('surface')}</th><th scope="col">${t('spaces')}</th><th scope="col"><span class="sr-only">${t('viewDetails')}</span></th></tr></thead><tbody>${places.map(p=>`<tr><th scope="row">${esc(p.name)}</th><td>${esc(p.company||'—')}</td><td>${D.sites.find(s=>s.id===p.site).island}</td><td>${formatNumber(p.area)} m²</td><td>${t(p.available?'available':'occupied')}</td><td><button type="button" class="inline-link" data-detail="${p.id}">${t('viewDetails')}${icon('arrow')}</button></td></tr>`).join('')}</tbody></table></div>`;
  }
  function updateAgenda() {
    const events = D.events.filter(e => (agendaFilters.site==='all'||e.site===agendaFilters.site) && (agendaFilters.topic==='all'||e.topic===agendaFilters.topic) && (agendaFilters.format==='all'||e.format===agendaFilters.format) && (agendaFilters.period==='past'?e.date<'2026-10-22':e.date>='2026-10-22'));
    document.getElementById('event-count').textContent = `${events.length} ${t('eventsFound')}`;
    const target = document.getElementById('events-results'); target.className = `events-grid ${agendaFilters.view==='list'?'list-view':''}`;
    target.innerHTML = events.length ? events.map(eventCard).join('') : `<div class="empty-state">${icon('search')}<h2>${t('noResults')}</h2><button type="button" class="button secondary" id="empty-agenda-clear">${t('clear')}</button></div>`;
    document.getElementById('empty-agenda-clear')?.addEventListener('click',resetAgenda);
  }
  function resetAgenda() { agendaFilters = {site:'all',topic:'all',format:'all',period:'future',view:agendaFilters.view}; render(false); }
  function updateDirectory() {
    const places = filterPlaces();
    activeMap?.destroy?.();
    const target = document.getElementById('directory-content');
    if (!places.length) { target.innerHTML = `<div class="empty-state">${icon('search')}<h2>${t('noResults')}</h2><button type="button" id="directory-clear" class="button secondary">${t('clear')}</button></div>`; document.getElementById('directory-clear').addEventListener('click',()=>{directoryFilters={site:'all',sector:'all',query:'',available:false,accessible:directoryFilters.accessible};render(false);}); return; }
    if (!places.some(p=>p.id===selectedPlace)) selectedPlace = places[0].id;
    const selected = D.places.find(p=>p.id===selectedPlace);
    if (directoryFilters.accessible) { target.innerHTML=accessibleTable(places); return; }
    target.innerHTML = `<div class="directory-layout"><div class="company-list"><div class="company-list-heading" role="status" aria-live="polite">${places.length} ${t('results')}</div>${places.map(p=>`<button type="button" data-select-place="${p.id}" class="company-row ${selectedPlace===p.id?'selected':''}" aria-pressed="${selectedPlace===p.id}"><span class="company-monogram">${esc((p.company||p.name).split(' ').map(s=>s[0]).slice(0,2).join(''))}</span><span><strong>${esc(p.company||p.name)}</strong><small>${esc(p.company?p.name:t(p.type))} · ${D.sites.find(s=>s.id===p.site).island}</small><span class="availability ${p.available?'yes':''}">${t(p.available?'available':'occupied')}</span></span>${icon('chevron')}</button>`).join('')}</div><div class="directory-map-side"><div id="directory-map" class="map-host directory-map"></div><div id="directory-detail">${placeDetail(selected)}</div></div></div>`;
    activeMap = window.BITMap.mount(document.getElementById('directory-map'), { site:selected.site, selected:selectedPlace, ids:places.map(p=>p.id), onSelect: selectDirectoryPlace });
  }
  function selectDirectoryPlace(id) {
    selectedPlace=id;
    const place=D.places.find(p=>p.id===id);
    if (!place) return;
    document.querySelectorAll('[data-select-place]').forEach(n=>{n.classList.toggle('selected',n.dataset.selectPlace===id);n.setAttribute('aria-pressed',n.dataset.selectPlace===id);});
    document.getElementById('directory-detail').innerHTML=placeDetail(place);
    activeMap.update({selected:id,site:place.site});
  }
  function routeCalculation(mode=mobilityState.mode) {
    const origin=D.origins.find(o=>o.id===mobilityState.origin)||D.origins[0];
    const place=D.places.find(p=>p.id===mobilityState.dest)||D.places[0];
    const distance=Math.round((origin.distance+Math.abs(place.x-490)/1500)*(mode==='walk'&&mobilityState.accessible?1.12:1)*10)/10;
    const minutes=Math.max(2,Math.round(distance/D.modes[mode].speed*60)+(mode==='bus'?6:mode==='car'?3:0));
    return {distance,minutes,saving:Math.max(0,distance*(120-D.modes[mode].factor)/1000),origin,place};
  }
  function updateSustainability() {
    const c=routeCalculation(); const avoided=c.saving*mobilityState.monthly;
    document.getElementById('sustainability-values').innerHTML=`<div class="carbon-value"><span>${t('avoided')}</span><strong>${formatNumber(avoided,1)}<small> kg</small></strong><p>${formatNumber(c.distance,1)} km × ${mobilityState.monthly} × ${120-D.modes[mobilityState.mode].factor} g/km</p></div><div class="mode-share"><span>${t('cleanShare')}</span><div class="share-bar"><span style="width:100%;background:${D.modes[mobilityState.mode].color}"></span></div><p>${icon(mobilityState.mode)}<strong>100 % ${t(mobilityState.mode)}</strong></p><small>${t('sample')}</small></div>`;
    document.getElementById('trips-output').textContent=mobilityState.monthly;
  }
  function updateRouteResults() {
    const box=document.getElementById('route-results');
    if (!mobilityState.calculated) box.innerHTML=`<p class="route-pending">${t('routePending')}</p>`;
    else {
      const c=routeCalculation();
      const instructions = mobilityState.mode==='bus' ? [
        tx([`Comienza en ${tx(c.origin.title)}.`,`Comença a ${tx(c.origin.title)}.`,`Start at ${tx(c.origin.title)}.`]),
        tx(['Consulta el trayecto de transporte colectivo del escenario.','Consulta el trajecte de transport col·lectiu de l’escenari.','Follow the scenario’s public transport journey.']),
        tx(['Continúa desde la parada de acceso por el camino peatonal.','Continua des de la parada d’accés pel camí de vianants.','Continue from the entrance stop along the pedestrian path.']),
        tx([`Accede a ${c.place.name}${mobilityState.accessible?' por la entrada sin escalones':''}.`,`Accedeix a ${c.place.name}${mobilityState.accessible?' per l’entrada sense escalons':''}.`,`Enter ${c.place.name}${mobilityState.accessible?' through the step-free entrance':''}.`])
      ] : [
        tx([`Sal desde ${tx(c.origin.title)}.`,`Surt de ${tx(c.origin.title)}.`,`Start at ${tx(c.origin.title)}.`]),
        tx([mobilityState.mode==='bike'?'Sigue el trazado ciclable de ejemplo hasta el acceso.':mobilityState.mode==='car'?'Dirígete al aparcamiento de acceso del escenario.':'Continúa por el camino peatonal de ejemplo.',mobilityState.mode==='bike'?'Segueix el traçat ciclable d’exemple fins a l’accés.':mobilityState.mode==='car'?'Dirigeix-te a l’aparcament d’accés de l’escenari.':'Continua pel camí de vianants d’exemple.',mobilityState.mode==='bike'?'Follow the sample cycle path to the entrance.':mobilityState.mode==='car'?'Continue to the scenario’s entrance car park.':'Follow the sample pedestrian path.']),
        tx([mobilityState.accessible?'Usa la alternativa sin escaleras señalada en el esquema.':'Sigue la conexión interior señalada en el esquema.',mobilityState.accessible?'Usa l’alternativa sense escales indicada a l’esquema.':'Segueix la connexió interior indicada a l’esquema.',mobilityState.accessible?'Use the step-free alternative shown on the schematic.':'Follow the internal connection shown on the schematic.']),
        tx([`Llega a ${c.place.name}.`,`Arriba a ${c.place.name}.`,`Arrive at ${c.place.name}.`])
      ];
      box.innerHTML=`<div class="route-summary"><h3>${t('routeSummary')}</h3><div class="route-metrics"><div><strong>${c.minutes}<small> min</small></strong><span>${t('estimated')}</span></div><div><strong>${formatNumber(c.distance,1)}<small> km</small></strong><span>${t('distance')}</span></div></div><p class="saving-label">${icon('leaf')}${formatNumber(c.saving,2)} kg · ${t('saving')}</p><h3>${t('routeText')}</h3><ol class="route-steps">${instructions.map(s=>`<li>${esc(s)}</li>`).join('')}</ol><div class="route-alternatives">${Object.keys(D.modes).map(m=>`<button type="button" data-route-mode="${m}" aria-pressed="${mobilityState.mode===m}">${icon(m)}<span>${t(m)}</span><strong>${routeCalculation(m).minutes} min</strong></button>`).join('')}</div></div>`;
    }
    activeMap?.update({site:mobilityState.site,selected:mobilityState.dest,route:mobilityState.calculated,mode:mobilityState.mode,layers:{...viewerLayers,pmr:mobilityState.accessible}});
    updateSustainability();
  }
  function openModal(content, setup) {
    const wasOpen=modal.open;
    document.getElementById('modal-content').innerHTML=`<button class="modal-close icon-button" type="button" aria-label="${t('close')}" data-close-modal>${icon('close')}</button>${content}`;
    if (!wasOpen) modal.showModal();
    setup?.();
    setTimeout(()=>modal.querySelector('input, [autofocus], button:not(.modal-close)')?.focus(),0);
  }
  function completeSimulation() {
    openModal(`<div class="success-symbol">${icon('check')}</div><h2 id="modal-title">${t('simulationDone')}</h2><p>${t('simulationDoneText')}</p><button class="button full" type="button" data-close-modal>${t('close')}</button>`);
  }
  function showForm(kind, ref, draft={}) {
    const title=kind==='application'?t('apply'):kind==='visit'?t('visit'):t('register');
    const reference=kind==='event'?tx(ref.title):kind==='visit'?ref.name:'';
    openModal(`<h2 id="modal-title">${title}</h2>${reference?`<p class="modal-reference">${esc(reference)}</p>`:''}${demoNote(t('localOnly'))}<form id="simulation-form"><div class="filter"><label for="form-name">${t('name')} *</label><input id="form-name" name="name" autocomplete="off" required maxlength="100" value="${esc(draft.name||'')}"></div><div class="filter"><label for="form-email">${t('email')} *</label><input id="form-email" name="email" type="email" autocomplete="off" required maxlength="150" value="${esc(draft.email||'')}"></div>${kind==='application'?`<div class="filter"><label for="form-project">${t('projectName')} *</label><input id="form-project" name="project" required maxlength="120" value="${esc(draft.project||'')}"></div><div class="filter"><label for="form-summary">${t('summary')} *</label><textarea id="form-summary" name="summary" required minlength="10" maxlength="1000" rows="3">${esc(draft.summary||'')}</textarea></div>`:kind==='visit'?`<div class="filter"><label for="form-date">${t('date')} *</label><input id="form-date" name="date" type="date" min="${new Date().toLocaleDateString('sv-SE')}" required value="${esc(draft.date||'')}"></div>`:''}<button type="submit" class="button full">${kind==='application'?t('next'):t('confirm')}${icon('arrow')}</button></form>`,()=>{
      document.getElementById('simulation-form').addEventListener('submit',event=>{
        event.preventDefault(); const values=Object.fromEntries(new FormData(event.currentTarget));
        if (kind==='application') {
          openModal(`<h2 id="modal-title">${t('review')}</h2><dl class="review-fields"><dt>${t('name')}</dt><dd>${esc(values.name)}</dd><dt>${t('email')}</dt><dd>${esc(values.email)}</dd><dt>${t('projectName')}</dt><dd>${esc(values.project)}</dd><dt>${t('summary')}</dt><dd>${esc(values.summary)}</dd></dl>${demoNote(t('localOnly'))}<div class="modal-actions"><button class="button secondary" id="form-back" type="button">${t('back')}</button><button class="button" id="form-confirm" type="button">${t('confirm')}${icon('check')}</button></div>`,()=>{
            document.getElementById('form-back').addEventListener('click',()=>showForm(kind,ref,values));
            document.getElementById('form-confirm').addEventListener('click',completeSimulation);
          });
        } else {
          if (kind==='event'&&!registrations.includes(ref.id)) { registrations.push(ref.id); try{sessionStorage.setItem('bit-registrations',JSON.stringify(registrations));}catch(_){} if(page==='agenda')updateAgenda(); }
          completeSimulation();
        }
      });
    });
  }
  function showEvent(id) {
    const event=D.events.find(e=>e.id===id); if(!event)return;
    const past=event.date<'2026-10-22';
    openModal(`<span class="tag">${t(event.topic)}</span><h2 id="modal-title">${esc(tx(event.title))}</h2><p>${esc(tx(event.summary))}</p><div class="modal-event-meta"><p>${icon('calendar')}${localeDate(event.date,{day:'numeric',month:'long',year:'numeric'})} · ${event.time}</p><p>${icon('pin')}${esc(event.venue)} · ${t(event.format)}</p></div>${demoNote(t('sample'))}<div class="modal-stack">${!past?`<button type="button" class="button" id="register-event" ${registrations.includes(id)?'disabled':''}>${t(registrations.includes(id)?'registered':'register')}${icon('arrow')}</button>`:`<p>${t('completed')}</p>`}<button type="button" class="button secondary" id="calendar-event">${icon('calendar')}${t('calendar')}</button></div>`,()=>{
      document.getElementById('register-event')?.addEventListener('click',()=>showForm('event',event));
      document.getElementById('calendar-event').addEventListener('click',()=>{
        const stamp=event.date.replaceAll('-','')+'T'+event.time.replace(':','')+'00';
        const end=event.date.replaceAll('-','')+'T'+String(Number(event.time.slice(0,2))+1).padStart(2,'0')+event.time.slice(3)+'00';
        const clean=s=>s.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
        const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//BIT Prototype//Demo//ES','BEGIN:VEVENT',`UID:demo-${id}@bit-prototype.invalid`,'DTSTAMP:20261022T080000Z',`DTSTART;TZID=Europe/Madrid:${stamp}`,`DTEND;TZID=Europe/Madrid:${end}`,`SUMMARY:${clean('[DEMO] '+tx(event.title))}`,`LOCATION:${clean(event.venue)}`,`DESCRIPTION:${clean(t('sample')+'. '+tx(event.summary))}`,'END:VEVENT','END:VCALENDAR'];
        download(`demo-${id}.ics`,lines.join('\r\n')+'\r\n','text/calendar;charset=utf-8');
      });
    });
  }
  function runGlobalSearch(query) {
    const q=query.trim().toLocaleLowerCase(I.locale());
    const items=[{label:t('program'),detail:t('service'),route:'servicio'},...D.places.map(p=>({label:p.company||p.name,detail:p.name+' · '+t(p.type),route:'directorio',place:p})),...D.events.map(e=>({label:tx(e.title),detail:t('agenda'),event:e.id}))];
    const results=items.filter(x=>(x.label+' '+x.detail).toLocaleLowerCase(I.locale()).includes(q));
    document.getElementById('search-results').innerHTML=`<h2>${t('searchResults')} <span>(${results.length})</span></h2>${results.length?`<ul>${results.map(x=>`<li>${x.event?`<button type="button" data-event="${x.event}">`:`<a href="#/${x.place?'visor?site='+x.place.site+'&place='+x.place.id:x.route}">`}<span><strong>${esc(x.label)}</strong><small>${esc(x.detail)}</small></span>${icon('arrow')}${x.event?'</button>':'</a>'}</li>`).join('')}</ul>`:`<p>${t('noResults')}</p>`}`;
  }
  function bindPage() {
    if(page==='inicio') {
      activeMap=window.BITMap.mount(document.getElementById('home-map'),{site:'palma',selected:'disset',onSelect:id=>go('visor',{place:id})});
      document.getElementById('global-search').addEventListener('submit',e=>{e.preventDefault();runGlobalSearch(new FormData(e.currentTarget).get('q'));});
    }
    if(page==='servicio')document.getElementById('download-guide').addEventListener('click',()=>download('guia-demo-emprenbit.txt',`${t('program')}\n\n${t('sample')}\n\n${t('programAboutText')}\n\n${t('requirements')}\n- ${t('req1')}\n- ${t('req2')}\n- ${t('req3')}\n\n${t('localOnly')}`));
    if(page==='agenda'){
      ['site','topic','format','period'].forEach(k=>document.getElementById('agenda-'+k).addEventListener('change',e=>{agendaFilters[k]=e.target.value;updateAgenda();}));
      document.getElementById('agenda-clear').addEventListener('click',resetAgenda);
      document.querySelectorAll('[data-event-view]').forEach(n=>n.addEventListener('click',()=>{agendaFilters.view=n.dataset.eventView;document.querySelectorAll('[data-event-view]').forEach(b=>b.setAttribute('aria-pressed',b===n));updateAgenda();}));
      updateAgenda();
    }
    if(page==='directorio'){
      document.getElementById('company-query').addEventListener('input',e=>{directoryFilters.query=e.target.value;updateDirectory();});
      ['site','sector'].forEach(k=>document.getElementById('company-'+k).addEventListener('change',e=>{directoryFilters[k]=e.target.value;updateDirectory();}));
      document.getElementById('only-available').addEventListener('change',e=>{directoryFilters.available=e.target.checked;updateDirectory();});
      document.getElementById('directory-view').addEventListener('click',()=>{directoryFilters.accessible=!directoryFilters.accessible;render(false);});
      updateDirectory();
    }
    if(page==='visor'){
      const p=D.places.find(p=>p.id===selectedPlace&&p.site===viewerSite)||D.places.find(p=>p.site===viewerSite);selectedPlace=p.id;
      activeMap=window.BITMap.mount(document.getElementById('viewer-map'),{site:viewerSite,selected:selectedPlace,volume:viewerVolume,layers:{...viewerLayers},onSelect:id=>{selectedPlace=id;document.getElementById('viewer-detail').innerHTML=placeDetail(D.places.find(p=>p.id===id));}});
      document.getElementById('viewer-site').addEventListener('change',e=>{viewerSite=e.target.value;render(false);});
      document.querySelectorAll('[data-volume]').forEach(n=>n.addEventListener('click',()=>{viewerVolume=n.dataset.volume==='true';activeMap.update({volume:viewerVolume});document.querySelectorAll('[data-volume]').forEach(b=>b.setAttribute('aria-pressed',b===n));}));
      document.querySelectorAll('[data-layer]').forEach(n=>n.addEventListener('change',()=>{viewerLayers[n.dataset.layer]=n.checked;activeMap.layer(n.dataset.layer,n.checked);}));
      document.getElementById('map-angle').addEventListener('input',e=>{activeMap.update({angle:Number(e.target.value)});document.getElementById('angle-value').textContent=e.target.value+'°';});
      document.getElementById('viewer-accessible').addEventListener('click',e=>{const table=document.getElementById('viewer-table'),grid=document.querySelector('.viewer-grid');const show=table.hidden;table.hidden=!show;grid.hidden=show;table.innerHTML=show?accessibleTable(D.places.filter(p=>p.site===viewerSite)):'';e.currentTarget.innerHTML=icon(show?'pin':'list')+t(show?'mapView':'accessibleView');});
      document.getElementById('kiosk-toggle').addEventListener('click',()=>{document.body.classList.toggle('kiosk');document.getElementById('kiosk-toggle').innerHTML=icon('expand')+t(document.body.classList.contains('kiosk')?'exitKiosk':'kiosk');});
    }
    if(page==='movilidad'){
      activeMap=window.BITMap.mount(document.getElementById('mobility-map'),{site:mobilityState.site,selected:mobilityState.dest,route:mobilityState.calculated,mode:mobilityState.mode,layers:{...viewerLayers,pmr:mobilityState.accessible},onSelect:id=>{mobilityState.dest=id;document.getElementById('route-dest').value=id;mobilityState.calculated=false;updateRouteResults();}});
      document.getElementById('route-site').addEventListener('change',e=>{mobilityState.site=e.target.value;mobilityState.dest=D.places.find(p=>p.site===mobilityState.site).id;mobilityState.origin=D.origins.find(o=>o.site===mobilityState.site).id;mobilityState.calculated=false;render(false);});
      ['origin','dest'].forEach(k=>document.getElementById('route-'+k).addEventListener('change',e=>{mobilityState[k]=e.target.value;mobilityState.calculated=false;updateRouteResults();}));
      document.querySelectorAll('input[name="mode"]').forEach(n=>n.addEventListener('change',()=>{mobilityState.mode=n.value;mobilityState.calculated=false;updateRouteResults();}));
      document.getElementById('route-accessible').addEventListener('change',e=>{mobilityState.accessible=e.target.checked;mobilityState.calculated=false;updateRouteResults();});
      document.getElementById('route-form').addEventListener('submit',e=>{e.preventDefault();mobilityState.calculated=true;updateRouteResults();});
      document.getElementById('monthly-trips').addEventListener('input',e=>{mobilityState.monthly=Number(e.target.value);updateSustainability();});
      updateRouteResults();
    }
    if(page==='prototipos')document.getElementById('reset-demo').addEventListener('click',()=>{registrations=[];agendaFilters={site:'all',topic:'all',format:'all',period:'future',view:'grid'};directoryFilters={site:'all',sector:'all',query:'',available:false,accessible:false};mobilityState={site:'palma',origin:'intermodal',dest:'disset',mode:'bike',accessible:true,calculated:false,monthly:40};viewerSite='palma';viewerVolume=true;viewerLayers={buildings:true,spaces:true,parking:true,charging:true,pmr:true};try{sessionStorage.removeItem('bit-registrations');}catch(_){}toast(t('resetDone'));});
  }
  function render(scroll=true) {
    activeMap?.destroy?.();activeMap=null;shell();
    main.innerHTML=({inicio:homePage,servicio:servicePage,agenda:agendaPage,directorio:directoryPage,visor:viewerPage,movilidad:mobilityPage,prototipos:prototypesPage}[page])();
    bindPage();
    if(scroll)window.scrollTo({top:0,behavior:'instant'});
  }
  function readRoute() {
    const [route,query='']=(location.hash.slice(1)||'/inicio').split('?');page=route.replace(/^\//,'');if(!routes[page])page='inicio';params=new URLSearchParams(query);
    if(modal.open)modal.close();document.body.classList.remove('kiosk','menu-open');document.getElementById('menu-toggle').setAttribute('aria-expanded','false');
    if(page==='directorio'&&params.has('available'))directoryFilters.available=params.get('available')==='1';
    if(page==='visor'){
      if(D.sites.some(s=>s.id===params.get('site')))viewerSite=params.get('site');
      const p=D.places.find(p=>p.id===params.get('place'));if(p){selectedPlace=p.id;viewerSite=p.site;}
    }
    if(page==='movilidad'){
      const p=D.places.find(p=>p.id===params.get('dest'));
      if(p){mobilityState.dest=p.id;mobilityState.site=p.site;mobilityState.origin=D.origins.find(o=>o.site===p.site).id;mobilityState.calculated=false;}
    }
    render();
  }
  document.addEventListener('click',e=>{
    const event=e.target.closest('[data-event]');if(event)showEvent(event.dataset.event);
    const form=e.target.closest('[data-form]');if(form)showForm(form.dataset.form);
    const visit=e.target.closest('[data-visit]');if(visit)showForm('visit',D.places.find(p=>p.id===visit.dataset.visit));
    if(e.target.closest('[data-close-modal]'))modal.close();
    const place=e.target.closest('[data-select-place]');if(place)selectDirectoryPlace(place.dataset.selectPlace);
    const detail=e.target.closest('[data-detail]');if(detail)openModal(`<h2 id="modal-title" class="sr-only">${t('viewDetails')}</h2>${placeDetail(D.places.find(p=>p.id===detail.dataset.detail))}`);
    const mode=e.target.closest('[data-route-mode]');if(mode){mobilityState.mode=mode.dataset.routeMode;document.querySelector(`input[name="mode"][value="${mobilityState.mode}"]`).checked=true;mobilityState.calculated=true;updateRouteResults();}
  });
  modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close();}});
  modal.addEventListener('close',()=>{document.getElementById('modal-content').innerHTML='';});
  document.getElementById('language').addEventListener('change',e=>{I.setLanguage(e.target.value);render(false);});
  document.getElementById('contrast').addEventListener('click',()=>{const enabled=document.documentElement.classList.toggle('high-contrast');document.getElementById('contrast').setAttribute('aria-pressed',enabled);try{localStorage.setItem('bit-contrast',enabled?'1':'0');}catch(_){}});
  document.getElementById('menu-toggle').addEventListener('click',()=>{const enabled=document.body.classList.toggle('menu-open');document.getElementById('menu-toggle').setAttribute('aria-expanded',enabled);});
  document.querySelector('.skip-link').addEventListener('click',event=>{event.preventDefault();main.focus();main.scrollIntoView({block:'start'});});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.body.classList.remove('menu-open','kiosk');document.getElementById('menu-toggle').setAttribute('aria-expanded','false');if(page==='visor')document.getElementById('kiosk-toggle').innerHTML=icon('expand')+t('kiosk');}});
  try{if(localStorage.getItem('bit-contrast')==='1'){document.documentElement.classList.add('high-contrast');document.getElementById('contrast').setAttribute('aria-pressed','true');}}catch(_){}
  window.addEventListener('hashchange',()=>{readRoute();main.focus({preventScroll:true});});
  readRoute();
})();
