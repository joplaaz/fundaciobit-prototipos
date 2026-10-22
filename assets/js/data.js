/* Synthetic demonstration data. Coordinates belong to a schematic, not a geographic CRS. */
window.BIT_DATA = {
  sites: [
    { id: 'palma', name: 'ParcBIT · Palma', island: 'Mallorca' },
    { id: 'menorca', name: 'CentreBIT · Menorca', island: 'Menorca' },
    { id: 'eivissa', name: 'CentreBIT · Eivissa', island: 'Eivissa' }
  ],
  places: [
    { id: 'son-espanyol', name: 'Son Espanyol', x: 350, y: 258, w: 87, h: 48, floors: 3, site: 'palma', type: 'office', available: true, area: 85, accessible: true, company: 'Blau Systems', sector: 'software', detail: ['Desarrollo de soluciones digitales y servicios cloud.', 'Desenvolupament de solucions digitals i serveis cloud.', 'Digital solutions and cloud services.'] },
    { id: 'disset', name: 'Edifici Disset', x: 594, y: 304, w: 95, h: 54, floors: 4, site: 'palma', type: 'office', available: true, area: 120, accessible: true, company: 'Ona Biotech', sector: 'biotech', detail: ['Investigación aplicada a la salud y biotecnología marina.', 'Recerca aplicada a la salut i biotecnologia marina.', 'Applied health research and marine biotechnology.'] },
    { id: 'europa', name: 'Europa', x: 458, y: 409, w: 80, h: 47, floors: 3, site: 'palma', type: 'office', available: false, area: 72, accessible: true, company: 'Tramuntana Digital', sector: 'software', detail: ['Productos digitales para experiencias turísticas accesibles.', 'Productes digitals per a experiències turístiques accessibles.', 'Digital products for accessible travel experiences.'] },
    { id: 'naorte', name: 'Naorte', x: 755, y: 405, w: 87, h: 45, floors: 2, site: 'palma', type: 'office', available: true, area: 65, accessible: true, company: 'Llevant Energy', sector: 'energy', detail: ['Sistemas de eficiencia energética y movilidad eléctrica.', 'Sistemes d’eficiència energètica i mobilitat elèctrica.', 'Energy efficiency and electric mobility systems.'] },
    { id: 'emprenbit', name: 'Emprenbit', x: 238, y: 408, w: 73, h: 44, floors: 2, site: 'palma', type: 'cowork', available: true, area: 24, accessible: true, company: 'Brisa Lab', sector: 'software', detail: ['Equipo de emprendimiento en inteligencia artificial aplicada.', 'Equip d’emprenedoria en intel·ligència artificial aplicada.', 'An applied artificial intelligence startup team.'] },
    { id: 'parcela', name: 'Parcela P-08', x: 704, y: 204, w: 104, h: 62, floors: 0, site: 'palma', type: 'land', available: true, area: 1850, accessible: true, company: '', sector: 'all', detail: ['Suelo tecnológico de ejemplo para un futuro proyecto de I+D.', 'Sòl tecnològic d’exemple per a un futur projecte d’R+D.', 'Sample technology plot for a future R&D project.'] },
    { id: 'menorca-cowork', name: 'CentreBIT Menorca', x: 440, y: 310, w: 170, h: 85, floors: 3, site: 'menorca', type: 'cowork', available: true, area: 32, accessible: true, company: 'Illa Circular', sector: 'energy', detail: ['Innovación en economía circular y materiales sostenibles.', 'Innovació en economia circular i materials sostenibles.', 'Circular economy and sustainable materials innovation.'] },
    { id: 'menorca-fablab', name: 'FabLab · Menorca', x: 700, y: 300, w: 95, h: 60, floors: 1, site: 'menorca', type: 'office', available: false, area: 95, accessible: true, company: 'Marès Robotics', sector: 'robotics', detail: ['Diseño y fabricación de sistemas robóticos de prototipado.', 'Disseny i fabricació de sistemes robòtics de prototipatge.', 'Design and manufacture of robotic prototyping systems.'] },
    { id: 'eivissa-office', name: 'CentreBIT Eivissa', x: 460, y: 290, w: 155, h: 84, floors: 3, site: 'eivissa', type: 'office', available: true, area: 90, accessible: true, company: 'Salina Studio', sector: 'software', detail: ['Tecnología creativa y experiencias culturales digitales.', 'Tecnologia creativa i experiències culturals digitals.', 'Creative technology and digital cultural experiences.'] },
    { id: 'eivissa-incubator', name: 'Incubadora · Eivissa', x: 715, y: 389, w: 85, h: 52, floors: 2, site: 'eivissa', type: 'cowork', available: true, area: 28, accessible: true, company: 'Posidònia Sensors', sector: 'biotech', detail: ['Sensores de demostración para el seguimiento ambiental marino.', 'Sensors de demostració per al seguiment ambiental marí.', 'Demonstration sensors for marine environmental monitoring.'] }
  ],
  events: [
    { id: 'tech-talks', date: '2026-11-12', time: '10:00', site: 'palma', topic: 'ai', format: 'onsite', seats: 45, title: ['Tramuntana Tech Talks: IA con propósito', 'Tramuntana Tech Talks: IA amb propòsit', 'Tramuntana Tech Talks: AI with purpose'], summary: ['Una mañana para compartir ideas y explorar aplicaciones de la inteligencia artificial.', 'Un matí per compartir idees i explorar aplicacions de la intel·ligència artificial.', 'A morning of ideas and practical artificial intelligence applications.'], venue: 'Son Espanyol · ParcBIT' },
    { id: 'cyber', date: '2026-11-19', time: '09:30', site: 'menorca', topic: 'cyber', format: 'hybrid', seats: 24, title: ['Ciberseguridad para pequeñas empresas', 'Ciberseguretat per a petites empreses', 'Cybersecurity for small businesses'], summary: ['Un taller práctico sobre protección de información, accesos y buenas prácticas.', 'Un taller pràctic sobre protecció d’informació, accessos i bones pràctiques.', 'A practical workshop on data protection, access and everyday security.'], venue: 'CentreBIT Menorca' },
    { id: 'blue', date: '2026-11-25', time: '11:00', site: 'eivissa', topic: 'sustainability', format: 'onsite', seats: 30, title: ['Tecnología y economía azul', 'Tecnologia i economia blava', 'Technology and the blue economy'], summary: ['Encuentro de proyectos tecnológicos que miran al futuro del Mediterráneo.', 'Trobada de projectes tecnològics que miren al futur del Mediterrani.', 'Technology projects exploring the future of the Mediterranean.'], venue: 'CentreBIT Eivissa' },
    { id: 'startup', date: '2026-12-03', time: '16:00', site: 'palma', topic: 'startup', format: 'online', seats: 80, title: ['De la idea al primer prototipo', 'De la idea al primer prototip', 'From an idea to your first prototype'], summary: ['Sesión abierta de Emprenbit para dar forma a un proyecto de base tecnológica.', 'Sessió oberta d’Emprenbit per donar forma a un projecte de base tecnològica.', 'An open Emprenbit session for shaping a technology venture.'], venue: 'Online' },
    { id: 'archive', date: '2026-09-10', time: '10:00', site: 'palma', topic: 'sustainability', format: 'onsite', seats: 0, title: ['Movilidad sostenible en el parque', 'Mobilitat sostenible al parc', 'Sustainable mobility in the park'], summary: ['Jornada de ejemplo finalizada, disponible en el archivo de la agenda.', 'Jornada d’exemple finalitzada, disponible a l’arxiu de l’agenda.', 'A completed sample event, available in the agenda archive.'], venue: 'ParcBIT' }
  ],
  origins: [
    { id: 'intermodal', title: ['Estació Intermodal · Palma', 'Estació Intermodal · Palma', 'Intermodal Station · Palma'], distance: 9.4, site: 'palma', x: 185, y: 555 },
    { id: 'uib', title: ['Estación UIB', 'Estació UIB', 'UIB station'], distance: 1.8, site: 'palma', x: 185, y: 555 },
    { id: 'parking', title: ['Aparcamiento de acceso', 'Aparcament d’accés', 'Entrance car park'], distance: 0.65, site: 'any', x: 185, y: 555 },
    { id: 'alarg', title: ['Centro de Alaior', 'Centre d’Alaior', 'Alaior town centre'], distance: 2.1, site: 'menorca', x: 185, y: 555 },
    { id: 'vila', title: ['Centro de Eivissa', 'Centre d’Eivissa', 'Eivissa town centre'], distance: 3.6, site: 'eivissa', x: 185, y: 555 }
  ],
  modes: {
    walk: { speed: 4.5, factor: 0, icon: 'walk', color: '#12617c' },
    bike: { speed: 15, factor: 0, icon: 'bike', color: '#147854' },
    bus: { speed: 23, factor: 40, icon: 'bus', color: '#006d88' },
    car: { speed: 34, factor: 120, icon: 'car', color: '#616b77' }
  }
};
