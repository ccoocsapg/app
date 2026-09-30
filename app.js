(() => {
  'use strict';

  const CONFIG = {
    version: '0.1.0',
    contactEmail: 'fsanitat1@ccoo.cat',
    calculatorUrl: 'https://ccoocsapg.github.io/calculadora-csapg/',
    ccooSanitatUrl: 'https://www.ccoo.cat/sanitat/'
  };

  const DOCS = [
    {
      id: 'conveni-siscat-iii',
      category: 'conveni',
      date: '2023-03-17',
      status: 'official',
      driveId: '1xHeSIgaVG7gSolVjaJ3ystojxYIoJfsi',
      title: { ca: 'III Conveni col·lectiu SISCAT', es: 'III Convenio colectivo SISCAT' },
      desc: {
        ca: 'Text del conveni col·lectiu de la sanitat concertada. Document de referència per a jornada, permisos, retribucions i drets laborals.',
        es: 'Texto del convenio colectivo de la sanidad concertada. Documento de referencia para jornada, permisos, retribuciones y derechos laborales.'
      },
      tags: ['conveni','jornada','permisos','retribucions','siscat']
    },
    {
      id: 'pacte-homogeneitzacio-ii',
      category: 'pactes',
      date: '2023-12-15',
      status: 'official',
      driveId: '1zQbZga1EcuYE3C2f6YH-HY6fGp-VhURx',
      title: { ca: 'II Pacte d’homogeneïtzació CSAPG', es: 'II Pacto de homogeneización CSAPG' },
      desc: {
        ca: 'Pacte signat del CSAPG. Consulta sempre el text complet per comprovar l’aplicació concreta al teu cas.',
        es: 'Pacto firmado del CSAPG. Consulta siempre el texto completo para comprobar la aplicación concreta a tu caso.'
      },
      tags: ['pacte','homogeneitzacio','csapg','condicions']
    },
    {
      id: 'procediment-6455',
      category: 'convocatories',
      date: '2025-12-10',
      status: 'official',
      driveId: '1_6xbKEb5zjArccKDTk-PdcSzmWC77gs6',
      title: { ca: 'Procediment ID 6455 · Convocatòries internes CSAPG', es: 'Procedimiento ID 6455 · Convocatorias internas CSAPG' },
      desc: {
        ca: 'Procediment vigent utilitzat com a font de la calculadora de puntuació de convocatòries internes.',
        es: 'Procedimiento vigente utilizado como fuente de la calculadora de puntuación de convocatorias internas.'
      },
      tags: ['convocatories','promocio interna','barem','6455']
    }
  ];

  const MEETINGS = [
    {
      id: 'siscat-2026-01-13',
      date: '2026-01-13',
      category: 'conveni',
      source: 'ccoo',
      title: {
        ca: 'Mesa negociadora del IV Conveni SISCAT · acord retributiu',
        es: 'Mesa negociadora del IV Convenio SISCAT · acuerdo retributivo'
      },
      intro: {
        ca: 'Acord parcial sobre increments retributius dels anys 2025 i 2026.',
        es: 'Acuerdo parcial sobre incrementos retributivos de los años 2025 y 2026.'
      },
      bullets: {
        ca: [
          'Increment del 2,5% per a l’any 2025.',
          'Increment de l’1,5% per a l’any 2026.',
          'Aplicació acumulada a la nòmina de gener de 2026.',
          'Els endarreriments de 2025 s’havien d’abonar com a màxim el 28 de febrer de 2026.',
          'Si l’IPC de 2026 és igual o superior a l’1,5%, l’acord preveu un increment addicional consolidable del 0,5%.'
        ],
        es: [
          'Incremento del 2,5% para el año 2025.',
          'Incremento del 1,5% para el año 2026.',
          'Aplicación acumulada en la nómina de enero de 2026.',
          'Los atrasos de 2025 debían abonarse como máximo el 28 de febrero de 2026.',
          'Si el IPC de 2026 es igual o superior al 1,5%, el acuerdo prevé un incremento adicional consolidable del 0,5%.'
        ]
      },
      sourceNote: {
        ca: 'Resum basat en la nota informativa de CCOO Sanitat de 13/01/2026.',
        es: 'Resumen basado en la nota informativa de CCOO Sanitat de 13/01/2026.'
      },
      tags: ['siscat','conveni','salari','retribucions']
    },
    {
      id: 'convocatories-2026',
      date: '2026-08-12',
      category: 'convocatories',
      source: 'summary',
      title: {
        ca: 'Convocatòries internes · seguiment de puntuacions i criteris',
        es: 'Convocatorias internas · seguimiento de puntuaciones y criterios'
      },
      intro: {
        ca: 'Seguiment sindical dels criteris aplicats a les convocatòries internes i de les incidències detectades.',
        es: 'Seguimiento sindical de los criterios aplicados a las convocatorias internas y de las incidencias detectadas.'
      },
      bullets: {
        ca: [
          'Revisió dels criteris de còmput d’experiència i permisos.',
          'Seguiment de les llistes provisionals i definitives.',
          'Trasllat de discrepàncies als òrgans corresponents quan el criteri aplicat pot afectar drets laborals.'
        ],
        es: [
          'Revisión de los criterios de cómputo de experiencia y permisos.',
          'Seguimiento de las listas provisionales y definitivas.',
          'Traslado de discrepancias a los órganos correspondientes cuando el criterio aplicado puede afectar derechos laborales.'
        ]
      },
      sourceNote: {
        ca: 'Resum informatiu CCOO CSAPG. Per a cada convocatòria preval el procediment i la documentació oficial publicada.',
        es: 'Resumen informativo CCOO CSAPG. Para cada convocatoria prevalece el procedimiento y la documentación oficial publicada.'
      },
      tags: ['convocatories','experiencia','allegacions','barem']
    },
    {
      id: 'dpo-conciliacio-2026',
      date: '2026-08-12',
      category: 'conciliacio',
      source: 'summary',
      title: {
        ca: 'DPO i reduccions de jornada per conciliació',
        es: 'DPO y reducciones de jornada por conciliación'
      },
      intro: {
        ca: 'Seguiment de la incidència de les reduccions de jornada sobre les DPO i reclamació de revisió del criteri aplicat.',
        es: 'Seguimiento de la incidencia de las reducciones de jornada sobre las DPO y reclamación de revisión del criterio aplicado.'
      },
      bullets: {
        ca: [
          'S’ha plantejat la necessitat de revisar el tractament de les DPO en situacions de reducció de jornada per conciliació.',
          'La revisió parteix de resolucions judicials recents alienes al CSAPG que poden ser rellevants per interpretar el tracte retributiu.',
          'Cada cas concret requereix revisar objectius, percentatge d’assoliment, jornada i import abonat.'
        ],
        es: [
          'Se ha planteado la necesidad de revisar el tratamiento de las DPO en situaciones de reducción de jornada por conciliación.',
          'La revisión parte de resoluciones judiciales recientes ajenas al CSAPG que pueden ser relevantes para interpretar el tratamiento retributivo.',
          'Cada caso concreto requiere revisar objetivos, porcentaje de consecución, jornada e importe abonado.'
        ]
      },
      sourceNote: {
        ca: 'Resum de seguiment sindical. No substitueix l’anàlisi individual ni la documentació de cada DPO.',
        es: 'Resumen de seguimiento sindical. No sustituye el análisis individual ni la documentación de cada DPO.'
      },
      tags: ['dpo','conciliacio','reduccio jornada','retribucio']
    },
    {
      id: 'canvis-2027',
      date: '2026-08-24',
      category: 'organitzacio',
      source: 'summary',
      title: {
        ca: 'Sol·licituds de canvi provisional per a 2027',
        es: 'Solicitudes de cambio provisional para 2027'
      },
      intro: {
        ca: 'Obertura del període per sol·licitar canvi de torn, servei, categoria o centre de treball de manera provisional.',
        es: 'Apertura del periodo para solicitar cambio de turno, servicio, categoría o centro de trabajo de forma provisional.'
      },
      bullets: {
        ca: [
          'Període comunicat: del 24 d’agost al 20 de setembre de 2026.',
          'Adreçat a plantilla base i complementària.',
          'La plantilla suplent queda exclosa d’aquest procés.',
          'També s’ha de sol·licitar si es vol mantenir durant 2027 un canvi provisional ocupat el 2026.'
        ],
        es: [
          'Periodo comunicado: del 24 de agosto al 20 de septiembre de 2026.',
          'Dirigido a plantilla base y complementaria.',
          'La plantilla suplente queda excluida de este proceso.',
          'También debe solicitarse si se quiere mantener durante 2027 un cambio provisional ocupado en 2026.'
        ]
      },
      sourceNote: {
        ca: 'Resum de la comunicació de Gestió del Talent.',
        es: 'Resumen de la comunicación de Gestión del Talento.'
      },
      tags: ['canvi torn','servei','categoria','centre','2027']
    }
  ];

  const T = {
    ca: {
      brandSub:'Espai d’informació sindical', navHome:'Inici', navDocs:'Documents', navMeetings:'Reunions', navTools:'Eines', navContact:'Contacte',
      sourceFirst:'Primer, la font.', sourceFirstText:'Els resums mai substitueixen el document oficial.',
      homeEyebrow:'CCOO SANITAT · CSAPG', homeTitle:'La informació laboral que necessites, sense haver de buscar-la per tot arreu.',
      homeLead:'Documents oficials, resums de reunions, eines pràctiques i contacte sindical en un espai pensat per consultar-se des del mòbil.',
      install:'Instal·lar com a app', browseDocs:'Consultar documents', searchPlaceholder:'Què necessites trobar? Ex. permisos, DPO, convocatòries…',
      quickDocs:'Documents oficials', quickDocsSub:'Conveni, pactes i procediments', quickMeetings:'Reunions i comunicats', quickMeetingsSub:'Resums clars per temes',
      quickTools:'Eines', quickToolsSub:'Calculadores i guies pràctiques', quickContact:'Contacta amb CCOO', quickContactSub:'Consulta o envia un suggeriment',
      latest:'Últimes informacions', latestSub:'Resums identificats com a tals i separats de la documentació oficial.', viewAll:'Veure-ho tot',
      responsibleTitle:'Informació responsable', responsibleText:'Quan hi ha un document oficial, és sempre la font principal. Els resums serveixen per entendre’l ràpid, però no el substitueixen.',
      docsTitle:'Biblioteca de documents', docsSub:'Filtra per tema, previsualitza a Drive o descarrega el document original.', all:'Tots', favorites:'Desats', preview:'PREVISUALITZACIÓ',
      openDrive:'Obrir a Drive', download:'Descarregar', save:'Desar', saved:'Desat', official:'Document oficial', ccooNote:'Document CCOO', summary:'Resum CCOO',
      driveSource:'Allotjat a Google Drive', publicDriveNote:'Perquè la previsualització funcioni per a tothom, el fitxer de Drive ha d’estar compartit com “Qualsevol persona amb l’enllaç”.',
      meetingsTitle:'Reunions i informacions d’interès', meetingsSub:'Consulta els resums per tema. Cada entrada indica clarament si és un resum o un document oficial.',
      readSummary:'Llegir resum', sourceLabel:'Font i abast', toolsTitle:'Eines per al dia a dia', toolsSub:'Utilitats pensades per comprovar dades abans de fer una consulta o reclamació.',
      calculatorTitle:'Calculadora de convocatòries internes', calculatorText:'Calcula de manera orientativa la puntuació segons el Procediment ID 6455, amb traçabilitat del barem.', openTool:'Obrir eina',
      permitsTool:'Guia intel·ligent de permisos', permitsToolText:'Pròximament: consulta guiada de permisos retribuïts i terminis.', soon:'Pròximament',
      careerTool:'Carrera professional SIPDP', careerToolText:'Pròximament: requisits, documentació i comprovació del nivell al qual pots optar.',
      contactTitle:'Parla amb nosaltres', contactSub:'Explica’ns el dubte, proposta o incidència. La web no desa el contingut del formulari.',
      subject:'Tema', choose:'Selecciona…', name:'Nom (opcional)', reply:'Correu de resposta (opcional)', message:'Missatge', sendEmail:'Preparar correu', copy:'Copiar missatge',
      privacy:'Aquest formulari no envia dades a cap servidor de la web. En prémer “Preparar correu” s’obrirà el teu gestor de correu amb el missatge preparat perquè el revisis i l’enviïs.',
      contactOfficial:'Contacte CCOO Sanitat Catalunya', website:'Web oficial', email:'Correu', urgentNote:'Si es tracta d’un termini, sanció, acomiadament o una incidència amb data límit, indica la data al missatge.',
      noResults:'No hem trobat contingut amb aquests filtres.', installApp:'INSTAL·LAR APP', installTitle:'Afegeix CCOO CSAPG a la pantalla d’inici',
      installIos1:'Obre aquesta web a Safari.', installIos2:'Prem el botó Compartir.', installIos3:'Tria “Afegir a la pantalla d’inici”.',
      installOther:'Si el navegador és compatible, utilitza el botó “Instal·lar” per obrir-la com una app independent.',
      footerNote:'Informació sindical pràctica, clara i traçable.', meeting:'Reunió', communication:'Comunicació', updated:'Actualitzat',
      catConveni:'Conveni', catPactes:'Pactes', catConvocatories:'Convocatòries', catConciliacio:'Conciliació', catOrganitzacio:'Organització', catSalaris:'Retribucions', catPermisos:'Permisos',
      mailSubject:'Consulta / suggeriment CCOO CSAPG', copied:'Missatge copiat al porta-retalls.', copyFail:'No s’ha pogut copiar. Selecciona el text manualment.'
    },
    es: {
      brandSub:'Espacio de información sindical', navHome:'Inicio', navDocs:'Documentos', navMeetings:'Reuniones', navTools:'Herramientas', navContact:'Contacto',
      sourceFirst:'Primero, la fuente.', sourceFirstText:'Los resúmenes nunca sustituyen al documento oficial.',
      homeEyebrow:'CCOO SANITAT · CSAPG', homeTitle:'La información laboral que necesitas, sin tener que buscarla por todas partes.',
      homeLead:'Documentos oficiales, resúmenes de reuniones, herramientas prácticas y contacto sindical en un espacio pensado para consultarse desde el móvil.',
      install:'Instalar como app', browseDocs:'Consultar documentos', searchPlaceholder:'¿Qué necesitas encontrar? Ej. permisos, DPO, convocatorias…',
      quickDocs:'Documentos oficiales', quickDocsSub:'Convenio, pactos y procedimientos', quickMeetings:'Reuniones y comunicados', quickMeetingsSub:'Resúmenes claros por temas',
      quickTools:'Herramientas', quickToolsSub:'Calculadoras y guías prácticas', quickContact:'Contacta con CCOO', quickContactSub:'Consulta o envía una sugerencia',
      latest:'Últimas informaciones', latestSub:'Resúmenes identificados como tales y separados de la documentación oficial.', viewAll:'Ver todo',
      responsibleTitle:'Información responsable', responsibleText:'Cuando existe un documento oficial, es siempre la fuente principal. Los resúmenes sirven para entenderlo rápido, pero no lo sustituyen.',
      docsTitle:'Biblioteca de documentos', docsSub:'Filtra por tema, previsualiza en Drive o descarga el documento original.', all:'Todos', favorites:'Guardados', preview:'PREVISUALIZACIÓN',
      openDrive:'Abrir en Drive', download:'Descargar', save:'Guardar', saved:'Guardado', official:'Documento oficial', ccooNote:'Documento CCOO', summary:'Resumen CCOO',
      driveSource:'Alojado en Google Drive', publicDriveNote:'Para que la previsualización funcione para todo el mundo, el archivo de Drive debe estar compartido como “Cualquier persona con el enlace”.',
      meetingsTitle:'Reuniones e informaciones de interés', meetingsSub:'Consulta los resúmenes por tema. Cada entrada indica claramente si es un resumen o un documento oficial.',
      readSummary:'Leer resumen', sourceLabel:'Fuente y alcance', toolsTitle:'Herramientas para el día a día', toolsSub:'Utilidades pensadas para comprobar datos antes de hacer una consulta o reclamación.',
      calculatorTitle:'Calculadora de convocatorias internas', calculatorText:'Calcula de forma orientativa la puntuación según el Procedimiento ID 6455, con trazabilidad del baremo.', openTool:'Abrir herramienta',
      permitsTool:'Guía inteligente de permisos', permitsToolText:'Próximamente: consulta guiada de permisos retribuidos y plazos.', soon:'Próximamente',
      careerTool:'Carrera profesional SIPDP', careerToolText:'Próximamente: requisitos, documentación y comprobación del nivel al que puedes optar.',
      contactTitle:'Habla con nosotros', contactSub:'Explícanos la duda, propuesta o incidencia. La web no guarda el contenido del formulario.',
      subject:'Tema', choose:'Selecciona…', name:'Nombre (opcional)', reply:'Correo de respuesta (opcional)', message:'Mensaje', sendEmail:'Preparar correo', copy:'Copiar mensaje',
      privacy:'Este formulario no envía datos a ningún servidor de la web. Al pulsar “Preparar correo” se abrirá tu gestor de correo con el mensaje preparado para que lo revises y lo envíes.',
      contactOfficial:'Contacto CCOO Sanitat Catalunya', website:'Web oficial', email:'Correo', urgentNote:'Si se trata de un plazo, sanción, despido o una incidencia con fecha límite, indica la fecha en el mensaje.',
      noResults:'No hemos encontrado contenido con esos filtros.', installApp:'INSTALAR APP', installTitle:'Añade CCOO CSAPG a la pantalla de inicio',
      installIos1:'Abre esta web en Safari.', installIos2:'Pulsa el botón Compartir.', installIos3:'Elige “Añadir a pantalla de inicio”.',
      installOther:'Si el navegador es compatible, utiliza el botón “Instalar” para abrirla como una app independiente.',
      footerNote:'Información sindical práctica, clara y trazable.', meeting:'Reunión', communication:'Comunicación', updated:'Actualizado',
      catConveni:'Convenio', catPactes:'Pactos', catConvocatories:'Convocatorias', catConciliacio:'Conciliación', catOrganitzacio:'Organización', catSalaris:'Retribuciones', catPermisos:'Permisos',
      mailSubject:'Consulta / sugerencia CCOO CSAPG', copied:'Mensaje copiado al portapapeles.', copyFail:'No se ha podido copiar. Selecciona el texto manualmente.'
    }
  };

  const state = {
    lang: localStorage.getItem('ccoo-csapg-lang') || (navigator.language && navigator.language.toLowerCase().startsWith('es') ? 'es' : 'ca'),
    docFilter: 'all',
    meetingFilter: 'all',
    search: '',
    installPrompt: null
  };

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
  const tr = key => (T[state.lang] && T[state.lang][key]) || (T.ca && T.ca[key]) || key;
  const tx = obj => obj && (obj[state.lang] || obj.ca || obj.es) || '';
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const formatDate = value => new Intl.DateTimeFormat(state.lang === 'ca' ? 'ca-ES' : 'es-ES',{day:'2-digit',month:'short',year:'numeric'}).format(new Date(value+'T12:00:00'));
  const monthShort = value => new Intl.DateTimeFormat(state.lang === 'ca' ? 'ca-ES' : 'es-ES',{month:'short'}).format(new Date(value+'T12:00:00')).replace('.','');
  const day = value => new Date(value+'T12:00:00').getDate();
  const driveView = id => 'https://drive.google.com/file/d/'+id+'/view';
  const drivePreview = id => 'https://drive.google.com/file/d/'+id+'/preview';
  const driveDownload = id => 'https://drive.google.com/uc?export=download&id='+encodeURIComponent(id);

  function savedIds(){
    try{return JSON.parse(localStorage.getItem('ccoo-csapg-favorites') || '[]');}catch(e){return [];}
  }
  function isSaved(id){return savedIds().includes(id);}
  function toggleSaved(id){
    let ids=savedIds();
    ids=ids.includes(id)?ids.filter(x=>x!==id):ids.concat(id);
    localStorage.setItem('ccoo-csapg-favorites',JSON.stringify(ids));
    render();
  }

  function categoryLabel(cat){
    const map={conveni:'catConveni',pactes:'catPactes',convocatories:'catConvocatories',conciliacio:'catConciliacio',organitzacio:'catOrganitzacio',salaris:'catSalaris',permisos:'catPermisos'};
    return tr(map[cat]||cat);
  }

  function sourceBadge(source){
    if(source==='official') return '<span class="badge badge-official">'+esc(tr('official'))+'</span>';
    if(source==='ccoo') return '<span class="badge badge-ccoo">'+esc(tr('ccooNote'))+'</span>';
    return '<span class="badge badge-summary">'+esc(tr('summary'))+'</span>';
  }

  function route(){
    const value=(location.hash||'#/inicio').replace(/^#\//,'').split('?')[0];
    return ['inicio','documents','reunions','eines','contacte'].includes(value)?value:'inicio';
  }

  function updateChrome(){
    document.documentElement.lang=state.lang;
    $$('[data-i18n]').forEach(el=>{el.textContent=tr(el.dataset.i18n);});
    $$('.lang-btn').forEach(btn=>{
      const active=btn.dataset.lang===state.lang;
      btn.classList.toggle('is-active',active);
      btn.setAttribute('aria-pressed',String(active));
    });
    const current=route();
    $$('[data-route]').forEach(a=>a.classList.toggle('is-active',a.dataset.route===current));
    $('#appVersion').textContent='v'+CONFIG.version;
  }

  function homeView(){
    const latest=MEETINGS.slice().sort((a,b)=>b.date.localeCompare(a.date)).slice(0,3);
    return '<div class="view">'+
      '<section class="hero-card">'+
        '<div><span class="eyebrow">'+esc(tr('homeEyebrow'))+'</span><h1>'+esc(tr('homeTitle'))+'</h1><p>'+esc(tr('homeLead'))+'</p>'+
          '<div class="hero-actions"><button class="btn btn-primary" data-install>'+esc(tr('install'))+'</button><a class="btn btn-light" href="#/documents">'+esc(tr('browseDocs'))+'</a></div>'+
        '</div>'+
        '<div class="hero-side"><div class="trust-chip"><strong>'+esc(tr('responsibleTitle'))+'</strong><span>'+esc(tr('responsibleText'))+'</span></div>'+
        '<div class="trust-chip"><strong>CCOO Sanitat · CSAPG</strong><span>'+esc(tr('sourceFirstText'))+'</span></div></div>'+
      '</section>'+
      '<section class="section"><div class="search-box"><input id="globalSearch" type="search" autocomplete="off" placeholder="'+esc(tr('searchPlaceholder'))+'"><span class="search-icon">⌕</span></div><div id="homeSearchResults"></div></section>'+
      '<section class="section"><div class="quick-grid">'+
        quickCard('#/documents','▤','quickDocs','quickDocsSub')+
        quickCard('#/reunions','◫','quickMeetings','quickMeetingsSub')+
        quickCard('#/eines','✦','quickTools','quickToolsSub')+
        quickCard('#/contacte','✉','quickContact','quickContactSub')+
      '</div></section>'+
      '<section class="section"><div class="section-head"><div><h2>'+esc(tr('latest'))+'</h2><p>'+esc(tr('latestSub'))+'</p></div><a class="text-link" href="#/reunions">'+esc(tr('viewAll'))+' →</a></div>'+
      '<div class="card-grid">'+latest.map(latestCard).join('')+'</div></section>'+
      '<section class="section"><div class="info-banner"><span>ⓘ</span><div><strong>'+esc(tr('responsibleTitle'))+'</strong><p>'+esc(tr('responsibleText'))+'</p></div></div></section>'+
    '</div>';
  }

  function quickCard(href,icon,titleKey,subKey){
    return '<a class="quick-card" href="'+href+'"><span class="quick-icon">'+icon+'</span><div><strong>'+esc(tr(titleKey))+'</strong><small>'+esc(tr(subKey))+'</small></div></a>';
  }

  function latestCard(item){
    return '<article class="card"><div class="card-head"><div><div class="meta">'+sourceBadge(item.source)+'<span class="badge badge-neutral">'+esc(categoryLabel(item.category))+'</span></div><h3>'+esc(tx(item.title))+'</h3></div><span class="badge badge-neutral">'+esc(formatDate(item.date))+'</span></div><p>'+esc(tx(item.intro))+'</p><div class="card-actions"><a class="btn btn-outline btn-small" href="#/reunions">'+esc(tr('readSummary'))+' →</a></div></article>';
  }

  function docsView(){
    const cats=['all','conveni','pactes','convocatories'];
    return '<div class="view">'+
      pageHeading(tr('docsTitle'),tr('docsSub'))+
      '<div class="info-banner warn-banner"><span>!</span><div><strong>Google Drive</strong><p>'+esc(tr('publicDriveNote'))+'</p></div></div>'+
      '<div class="toolbar section"><div class="search-box"><input id="docSearch" type="search" placeholder="'+esc(tr('searchPlaceholder'))+'" value="'+esc(state.search)+'"><span class="search-icon">⌕</span></div><span class="toolbar-note">'+DOCS.length+' '+esc(tr('navDocs').toLowerCase())+'</span></div>'+
      '<div class="filter-row">'+cats.map(docChip).join('')+'<button class="filter-chip'+(state.docFilter==='favorites'?' is-active':'')+'" data-doc-filter="favorites">★ '+esc(tr('favorites'))+'</button></div>'+
      '<div id="docList" class="doc-list">'+renderDocs()+'</div>'+
    '</div>';
  }

  function docChip(cat){
    const label=cat==='all'?tr('all'):categoryLabel(cat);
    return '<button class="filter-chip'+(state.docFilter===cat?' is-active':'')+'" data-doc-filter="'+cat+'">'+esc(label)+'</button>';
  }

  function renderDocs(){
    let items=DOCS.slice();
    const q=(state.search||'').trim().toLowerCase();
    if(state.docFilter==='favorites') items=items.filter(x=>isSaved(x.id));
    else if(state.docFilter!=='all') items=items.filter(x=>x.category===state.docFilter);
    if(q) items=items.filter(x=>(tx(x.title)+' '+tx(x.desc)+' '+x.tags.join(' ')).toLowerCase().includes(q));
    if(!items.length) return '<div class="empty-state">'+esc(tr('noResults'))+'</div>';
    return items.map(docCard).join('');
  }

  function docCard(doc){
    const saved=isSaved(doc.id);
    return '<article class="doc-card">'+
      '<div class="doc-icon">PDF</div>'+
      '<div class="doc-main"><div class="meta">'+sourceBadge(doc.status)+'<span class="badge badge-neutral">'+esc(categoryLabel(doc.category))+'</span></div>'+
      '<h3>'+esc(tx(doc.title))+'</h3><p>'+esc(tx(doc.desc))+'</p><div class="source-line"><strong>'+esc(tr('driveSource'))+'</strong> · '+esc(formatDate(doc.date))+'</div></div>'+
      '<div class="doc-actions">'+
      '<button class="star-btn'+(saved?' is-saved':'')+'" type="button" data-save="'+esc(doc.id)+'" aria-label="'+esc(saved?tr('saved'):tr('save'))+'">★</button>'+
      '<button class="btn btn-outline btn-small" type="button" data-preview-doc="'+esc(doc.id)+'">'+esc(tr('preview'))+'</button>'+
      '<a class="btn btn-primary btn-small" href="'+driveDownload(doc.driveId)+'" target="_blank" rel="noopener">'+esc(tr('download'))+'</a>'+
      '</div></article>';
  }

  function meetingsView(){
    const cats=['all','conveni','convocatories','conciliacio','organitzacio'];
    return '<div class="view">'+pageHeading(tr('meetingsTitle'),tr('meetingsSub'))+
      '<div class="toolbar"><div class="search-box"><input id="meetingSearch" type="search" placeholder="'+esc(tr('searchPlaceholder'))+'" value="'+esc(state.search)+'"><span class="search-icon">⌕</span></div></div>'+
      '<div class="filter-row">'+cats.map(meetingChip).join('')+'</div>'+
      '<div id="meetingList" class="meeting-list">'+renderMeetings()+'</div></div>';
  }

  function meetingChip(cat){
    const label=cat==='all'?tr('all'):categoryLabel(cat);
    return '<button class="filter-chip'+(state.meetingFilter===cat?' is-active':'')+'" data-meeting-filter="'+cat+'">'+esc(label)+'</button>';
  }

  function renderMeetings(){
    let items=MEETINGS.slice().sort((a,b)=>b.date.localeCompare(a.date));
    const q=(state.search||'').trim().toLowerCase();
    if(state.meetingFilter!=='all') items=items.filter(x=>x.category===state.meetingFilter);
    if(q) items=items.filter(x=>(tx(x.title)+' '+tx(x.intro)+' '+tx(x.sourceNote)+' '+x.tags.join(' ')).toLowerCase().includes(q));
    if(!items.length) return '<div class="empty-state">'+esc(tr('noResults'))+'</div>';
    return items.map(meetingCard).join('');
  }

  function meetingCard(item){
    return '<details class="meeting-card"><summary><div class="meeting-top">'+
      '<div class="date-box"><strong>'+day(item.date)+'</strong><span>'+esc(monthShort(item.date))+'</span></div>'+
      '<div class="meeting-title"><div class="meta">'+sourceBadge(item.source)+'<span class="badge badge-neutral">'+esc(categoryLabel(item.category))+'</span></div><h3>'+esc(tx(item.title))+'</h3><p>'+esc(tx(item.intro))+'</p></div>'+
      '<span class="chev">›</span></div></summary>'+
      '<div class="meeting-body"><ul>'+item.bullets[state.lang].map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>'+
      '<div class="source-box"><strong>'+esc(tr('sourceLabel'))+':</strong> '+esc(tx(item.sourceNote))+'</div></div></details>';
  }

  function toolsView(){
    return '<div class="view">'+pageHeading(tr('toolsTitle'),tr('toolsSub'))+
      '<div class="tool-list">'+
        toolCard('▦',tr('calculatorTitle'),tr('calculatorText'),CONFIG.calculatorUrl,false)+
        toolCard('✚',tr('permitsTool'),tr('permitsToolText'),'#',true)+
        toolCard('↗',tr('careerTool'),tr('careerToolText'),'#',true)+
      '</div></div>';
  }

  function toolCard(icon,title,text,url,soon){
    return '<article class="tool-card'+(soon?' soon':'')+'"><div class="tool-logo">'+icon+'</div><div><div class="meta">'+(soon?'<span class="badge badge-neutral">'+esc(tr('soon'))+'</span>':'<span class="badge badge-official">ID 6455</span>')+'</div><h3>'+esc(title)+'</h3><p>'+esc(text)+'</p></div>'+
      (soon?'<span></span>':'<a class="btn btn-primary" href="'+url+'" target="_blank" rel="noopener">'+esc(tr('openTool'))+' →</a>')+'</article>';
  }

  function contactView(){
    return '<div class="view">'+pageHeading(tr('contactTitle'),tr('contactSub'))+
      '<div class="contact-grid"><section class="form-card"><form id="contactForm">'+
        '<div class="form-grid">'+
          '<label class="field"><span>'+esc(tr('subject'))+'</span><select id="contactSubject" required><option value="">'+esc(tr('choose'))+'</option>'+
            '<option>'+esc(categoryLabel('conveni'))+'</option><option>'+esc(categoryLabel('convocatories'))+'</option><option>'+esc(categoryLabel('permisos'))+'</option><option>DPO / '+esc(categoryLabel('conciliacio'))+'</option><option>Altres / Otros</option></select></label>'+
          '<label class="field"><span>'+esc(tr('name'))+'</span><input id="contactName" type="text" autocomplete="name"></label>'+
          '<label class="field span-2"><span>'+esc(tr('reply'))+'</span><input id="contactReply" type="email" autocomplete="email"></label>'+
          '<label class="field span-2"><span>'+esc(tr('message'))+'</span><textarea id="contactMessage" required></textarea><small>'+esc(tr('urgentNote'))+'</small></label>'+
        '</div>'+
        '<div class="form-actions"><button class="btn btn-primary" type="submit">'+esc(tr('sendEmail'))+'</button><button class="btn btn-outline" type="button" id="copyContact">'+esc(tr('copy'))+'</button></div>'+
        '<p class="privacy-copy">'+esc(tr('privacy'))+'</p>'+
      '</form></section>'+
      '<aside class="contact-card"><h3>'+esc(tr('contactOfficial'))+'</h3>'+
        '<div class="contact-row"><strong>'+esc(tr('email'))+'</strong><a href="mailto:'+CONFIG.contactEmail+'">'+esc(CONFIG.contactEmail)+'</a></div>'+
        '<div class="contact-row"><strong>'+esc(tr('website'))+'</strong><a href="'+CONFIG.ccooSanitatUrl+'" target="_blank" rel="noopener">ccoo.cat/sanitat</a></div>'+
        '<div class="contact-row"><strong>CCOO Sanitat Catalunya</strong><span>Via Laietana, 16 · Barcelona</span></div>'+
      '</aside></div></div>';
  }

  function pageHeading(title,sub){
    return '<div class="section-head"><div><span class="eyebrow">CCOO · CSAPG</span><h2>'+esc(title)+'</h2><p>'+esc(sub)+'</p></div></div>';
  }

  function renderHomeSearch(query){
    const box=$('#homeSearchResults'); if(!box) return;
    const q=(query||'').trim().toLowerCase();
    if(!q){box.innerHTML='';return;}
    const docs=DOCS.filter(x=>(tx(x.title)+' '+tx(x.desc)+' '+x.tags.join(' ')).toLowerCase().includes(q)).slice(0,3);
    const meets=MEETINGS.filter(x=>(tx(x.title)+' '+tx(x.intro)+' '+x.tags.join(' ')).toLowerCase().includes(q)).slice(0,3);
    const html=[];
    docs.forEach(x=>html.push('<a class="card" href="#/documents"><div class="meta">'+sourceBadge(x.status)+'</div><h3>'+esc(tx(x.title))+'</h3><p>'+esc(tx(x.desc))+'</p></a>'));
    meets.forEach(x=>html.push('<a class="card" href="#/reunions"><div class="meta">'+sourceBadge(x.source)+'</div><h3>'+esc(tx(x.title))+'</h3><p>'+esc(tx(x.intro))+'</p></a>'));
    box.innerHTML=html.length?'<div class="card-grid" style="margin-top:12px">'+html.join('')+'</div>':'<div class="empty-state" style="margin-top:12px">'+esc(tr('noResults'))+'</div>';
  }

  function openPreview(id){
    const doc=DOCS.find(x=>x.id===id); if(!doc) return;
    $('#previewTitle').textContent=tx(doc.title);
    $('#previewFrame').src=drivePreview(doc.driveId);
    $('#previewOpen').href=driveView(doc.driveId);
    $('#previewDownload').href=driveDownload(doc.driveId);
    $('#previewDialog').showModal();
  }

  function contactBody(){
    const subject=$('#contactSubject')?$('#contactSubject').value:'';
    const name=$('#contactName')?$('#contactName').value.trim():'';
    const reply=$('#contactReply')?$('#contactReply').value.trim():'';
    const message=$('#contactMessage')?$('#contactMessage').value.trim():'';
    return (state.lang==='ca'?'Tema: ':'Tema: ')+subject+'\\n'+
      (state.lang==='ca'?'Nom: ':'Nombre: ')+(name||'-')+'\\n'+
      (state.lang==='ca'?'Correu de resposta: ':'Correo de respuesta: ')+(reply||'-')+'\\n\\n'+
      message+'\\n\\n---\\nCCOO CSAPG · '+location.href;
  }

  function submitContact(e){
    e.preventDefault();
    const subject=$('#contactSubject').value;
    const message=$('#contactMessage').value.trim();
    if(!subject||!message) return;
    const mailSubject=tr('mailSubject')+' · '+subject;
    location.href='mailto:'+encodeURIComponent(CONFIG.contactEmail)+'?subject='+encodeURIComponent(mailSubject)+'&body='+encodeURIComponent(contactBody());
  }

  async function copyContact(){
    const body=contactBody();
    try{await navigator.clipboard.writeText(body);alert(tr('copied'));}catch(e){alert(tr('copyFail'));}
  }

  function installContent(){
    const ua=navigator.userAgent||'';
    const ios=/iPad|iPhone|iPod/.test(ua);
    if(ios){
      return '<div class="install-steps">'+
        '<div class="install-step"><b>1</b><span>'+esc(tr('installIos1'))+'</span></div>'+
        '<div class="install-step"><b>2</b><span>'+esc(tr('installIos2'))+'</span></div>'+
        '<div class="install-step"><b>3</b><span>'+esc(tr('installIos3'))+'</span></div>'+
      '</div>';
    }
    return '<p>'+esc(tr('installOther'))+'</p><button class="btn btn-primary" type="button" id="nativeInstall">'+esc(tr('install'))+'</button>';
  }

  async function requestInstall(){
    if(state.installPrompt){
      state.installPrompt.prompt();
      try{await state.installPrompt.userChoice;}catch(e){}
      state.installPrompt=null;
      return;
    }
    $('#installContent').innerHTML=installContent();
    $('#installDialog').showModal();
    const native=$('#nativeInstall');
    if(native) native.addEventListener('click',async()=>{
      if(state.installPrompt){state.installPrompt.prompt();try{await state.installPrompt.userChoice;}catch(e){}state.installPrompt=null;$('#installDialog').close();}
    });
  }

  function bindView(){
    const current=route();
    const global=$('#globalSearch'); if(global) global.addEventListener('input',e=>renderHomeSearch(e.target.value));
    const docSearch=$('#docSearch'); if(docSearch) docSearch.addEventListener('input',e=>{state.search=e.target.value;$('#docList').innerHTML=renderDocs();bindDocActions();});
    const meetingSearch=$('#meetingSearch'); if(meetingSearch) meetingSearch.addEventListener('input',e=>{state.search=e.target.value;$('#meetingList').innerHTML=renderMeetings();});
    $$('[data-doc-filter]').forEach(btn=>btn.addEventListener('click',()=>{state.docFilter=btn.dataset.docFilter;render();}));
    $$('[data-meeting-filter]').forEach(btn=>btn.addEventListener('click',()=>{state.meetingFilter=btn.dataset.meetingFilter;render();}));
    bindDocActions();
    $$('[data-install]').forEach(btn=>btn.addEventListener('click',requestInstall));
    const form=$('#contactForm'); if(form) form.addEventListener('submit',submitContact);
    const copy=$('#copyContact'); if(copy) copy.addEventListener('click',copyContact);
  }

  function bindDocActions(){
    $$('[data-save]').forEach(btn=>btn.addEventListener('click',()=>toggleSaved(btn.dataset.save)));
    $$('[data-preview-doc]').forEach(btn=>btn.addEventListener('click',()=>openPreview(btn.dataset.previewDoc)));
  }

  function render(){
    updateChrome();
    const current=route();
    let html='';
    if(current==='documents') html=docsView();
    else if(current==='reunions') html=meetingsView();
    else if(current==='eines') html=toolsView();
    else if(current==='contacte') html=contactView();
    else html=homeView();
    $('#view').innerHTML=html;
    bindView();
    window.scrollTo({top:0,behavior:'instant'});
  }

  function init(){
    $$('.lang-btn').forEach(btn=>btn.addEventListener('click',()=>{
      state.lang=btn.dataset.lang;
      localStorage.setItem('ccoo-csapg-lang',state.lang);
      render();
    }));
    $('#installButton').addEventListener('click',requestInstall);
    $$('[data-close-dialog]').forEach(btn=>btn.addEventListener('click',()=>btn.closest('dialog').close()));
    $('#previewDialog').addEventListener('close',()=>{$('#previewFrame').src='about:blank';});
    window.addEventListener('hashchange',()=>{state.search='';render();});
    window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();state.installPrompt=e;});
    window.addEventListener('appinstalled',()=>{state.installPrompt=null;});
    if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));}
    if(!location.hash) location.hash='#/inicio'; else render();
  }

  init();
})();