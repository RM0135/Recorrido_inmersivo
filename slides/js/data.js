/**
 * Web Slides Data Source
 * Project: Recorrido Virtual Inmersivo 360° - Ciénaga de Mallorquín & Guía de Godot
 */

const GLOSSARY_DATA = {
  "Equirectangular": "Una fotografía panorámica 360° aplastada en formato 2:1 (como un mapa del mundo) que se proyecta dentro de una esfera 3D.",
  "Godot Engine": "Motor gráfico de código abierto y gratuito utilizado para crear videojuegos y experiencias 3D/VR.",
  "OpenXR": "Estándar internacional que permite que una aplicación VR funcione en Meta Quest, Pico o HTC Vive sin cambiar el código.",
  "GDScript": "Lenguaje de programación propio de Godot, sencillo, veloz y muy parecido a Python.",
  "Meta Quest": "Visor de realidad virtual autónomo de la empresa Meta que no requiere cables ni computadora para funcionar.",
  "Mesh": "La estructura de malla geométrica 3D (por ejemplo, una esfera o un cubo) sobre la cual se proyecta una textura o imagen.",
  "Sideload": "Instalar una aplicación directamente en un dispositivo (como Meta Quest) usando un cable USB sin pasar por la tienda oficial.",
  "Snap Turning": "Mecanismo de seguridad VR que gira la cámara en saltos de 45° en lugar de un movimiento continuo para evitar el mareo por movimiento."
};

const SLIDES_DATA = [
  // SLIDE 1
  {
    id: 1,
    category: "Módulo 1: La Visión del Proyecto",
    title: "Recorrido Virtual Inmersivo 360°",
    subtitle: "Exploración de la Ciénaga de Mallorquín con Realidad Virtual y Godot Engine 4.7",
    speakerNotes: "¡Bienvenidos a la presentación! Esta guía está diseñada para explicar cómo creamos un recorrido virtual inmersivo por un ecosistema natural sin necesidad de ser un experto en tecnología. Explicaremos tanto la biodiversidad como las bases de la Realidad Virtual y Godot Engine.",
    bodyHTML: `
      <div class="hero-slide">
        <div class="hero-badge-group">
          <span class="hero-badge nature"><i class="bi bi-tree-fill me-1"></i> Ciénaga de Mallorquín</span>
          <span class="hero-badge godot"><i class="bi bi-cpu-fill me-1"></i> Godot Engine 4.7</span>
          <span class="hero-badge"><i class="bi bi-vr me-1"></i> Meta Quest OpenXR</span>
        </div>
        <h1 class="hero-title">Explora la Naturaleza a través de la <span class="gradient-text">Realidad Virtual</span></h1>
        <p class="hero-description">
          Descubre cómo transformamos fotografías panorámicas de 360° en un paseo virtual inmersivo para el ecosistema más importante de Barranquilla, utilizando software libre de última generación.
        </p>
        <div class="hero-actions">
          <button class="btn-primary" onclick="window.slidesApp.nextSlide()">
            <span>Iniciar Recorrido Didáctico</span>
            <i class="bi bi-arrow-right ms-2"></i>
          </button>
        </div>
      </div>
    `
  },

  // SLIDE 2
  {
    id: 2,
    category: "Módulo 1: La Visión del Proyecto",
    title: "La Ciénaga de Mallorquín: El Entorno",
    subtitle: "Por qué digitalizamos este ecosistema estratégico",
    speakerNotes: "La Ciénaga de Mallorquín es una laguna costera fundamental en Barranquilla, Colombia. Digitalizarla en 360° permite la educación ambiental masiva sin sobrecargar el sendero ecoturístico con impacto físico humano continuo.",
    bodyHTML: `
      <div class="grid-2col">
        <div class="flex-col">
          <div class="card-glass nature-border">
            <div class="icon-box emerald"><i class="bi bi-flower1"></i></div>
            <h3>Tesoro de Biodiversidad</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 8px;">
              Un ecosistema de manglar habitado por aves migratorias, crustáceos y especies vegetales únicas en la costa Caribe colombiana.
            </p>
          </div>
          <div class="card-glass accent-border">
            <div class="icon-box cyan"><i class="bi bi-globe-americas"></i></div>
            <h3>Acceso Universal e Inclusivo</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 8px;">
              Permite que personas con movilidad reducida, estudiantes de todo el país o turistas internacionales exploren el sendero desde cualquier lugar.
            </p>
          </div>
        </div>

        <div class="card-glass flex-col" style="justify-content: center; height: 100%;">
          <div class="stat-card" style="margin-bottom: 12px;">
            <div class="stat-number">360°</div>
            <div class="stat-label">Perspectiva completa de observación</div>
          </div>
          <div class="stat-card" style="margin-bottom: 12px;">
            <div class="stat-number">0%</div>
            <div class="stat-label">Impacto físico o huella ecológica</div>
          </div>
          <div class="stat-card">
            <div class="stat-number"><i class="bi bi-vr"></i> VR</div>
            <div class="stat-label">Inmersión sensorial con Meta Quest</div>
          </div>
        </div>
      </div>
    `
  },

  // SLIDE 3
  {
    id: 3,
    category: "Módulo 1: La Visión del Proyecto",
    title: "¿Cómo Funciona la Experiencia Virtual?",
    subtitle: "Navegación paso a paso al estilo Google Street View",
    speakerNotes: "El usuario se coloca el casco Meta Quest y aparece flotando en el centro exacto de la primera fotografía panorámica. Al presionar el botón de avanzar, la escena cambia suavemente a la siguiente foto de la ruta.",
    bodyHTML: `
      <div class="flex-col" style="gap: 20px;">
        <p style="font-size: 1.05rem; color: var(--text-muted);">
          La experiencia replica la sensación física de caminar por el sendero ecoturístico mediante un modelo de navegación secuencial:
        </p>

        <div class="flow-diagram">
          <div class="flow-step">
            <div style="font-size: 1.8rem; margin-bottom: 8px; color: var(--accent-cyan);"><i class="bi bi-geo-alt-fill"></i></div>
            <strong style="color: var(--accent-cyan);">Punto 001</strong>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Entrada al Ecoparque</p>
          </div>
          <div class="flow-arrow"><i class="bi bi-chevron-right"></i></div>
          <div class="flow-step">
            <div style="font-size: 1.8rem; margin-bottom: 8px; color: var(--accent-cyan);"><i class="bi bi-geo-alt-fill"></i></div>
            <strong style="color: var(--accent-cyan);">Punto 002</strong>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Mirador de Aves</p>
          </div>
          <div class="flow-arrow"><i class="bi bi-chevron-right"></i></div>
          <div class="flow-step">
            <div style="font-size: 1.8rem; margin-bottom: 8px; color: var(--accent-cyan);"><i class="bi bi-geo-alt-fill"></i></div>
            <strong style="color: var(--accent-cyan);">Punto 003</strong>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Sendero del Manglar</p>
          </div>
          <div class="flow-arrow"><i class="bi bi-chevron-right"></i></div>
          <div class="flow-step">
            <div style="font-size: 1.8rem; margin-bottom: 8px; color: var(--accent-emerald);"><i class="bi bi-flag-fill"></i></div>
            <strong style="color: var(--accent-emerald);">Punto Final</strong>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 4px;">Desembocadura</p>
          </div>
        </div>

        <div class="grid-3col">
          <div class="card-glass">
            <strong style="color: var(--accent-cyan);"><i class="bi bi-eye-fill me-1"></i> Observación Libre</strong>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 6px;">
              Al mover la cabeza en 360°, la cámara VR responde inmediatamente a la mirada natural del usuario.
            </p>
          </div>
          <div class="card-glass">
            <strong style="color: var(--accent-emerald);"><i class="bi bi-fast-forward-fill me-1"></i> Avanzar / Retroceder</strong>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 6px;">
              Usa los botones del mando (A/X) para trasladarte al siguiente punto del trayecto en la ciénaga.
            </p>
          </div>
          <div class="card-glass">
            <strong style="color: var(--accent-purple);"><i class="bi bi-info-circle-fill me-1"></i> Paneles Informativos</strong>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 6px;">
              Carteles flotantes 3D revelan datos ecológicos de la fauna y vegetación al mirarlos.
            </p>
          </div>
        </div>
      </div>
    `
  },

  // SLIDE 4 (was Slide 5)
  {
    id: 4,
    category: "Módulo 2: ¿Qué es Godot Engine?",
    title: "¿Qué es Godot Engine?",
    subtitle: "El motor de software libre que hace posible esta experiencia",
    speakerNotes: "Godot es un motor gráfico creado originalmente por programadores argentinos y respaldado hoy por una comunidad global. Es totalmente gratis, sin licencias complejas ni comisiones.",
    bodyHTML: `
      <div class="grid-2col">
        <div class="flex-col">
          <div class="card-glass accent-border">
            <h3 style="color: var(--accent-cyan); margin-bottom: 8px;"><i class="bi bi-unlock-fill me-2"></i> 100% Gratuito y Libre</h3>
            <p style="font-size: 0.92rem; color: var(--text-muted);">
              Licencia MIT: todo lo que creas te pertenece por completo. No hay comisiones por ventas ni pagos mensuales.
            </p>
          </div>
          <div class="card-glass nature-border">
            <h3 style="color: var(--accent-emerald); margin-bottom: 8px;"><i class="bi bi-heart-fill me-2"></i> Orgullo Latinoamericano</h3>
            <p style="font-size: 0.92rem; color: var(--text-muted);">
              Creado por Juan Linietsky y Ariel Manzur en Buenos Aires. Hoy es uno de los motores con mayor crecimiento mundial.
            </p>
          </div>
          <div class="card-glass purple-border">
            <h3 style="color: var(--accent-purple); margin-bottom: 8px;"><i class="bi bi-lightning-charge-fill me-2"></i> Ligero y Versátil</h3>
            <p style="font-size: 0.92rem; color: var(--text-muted);">
              El ejecutable pesa menos de 100 MB y se ejecuta en segundos sin saturar la computadora.
            </p>
          </div>
        </div>

        <div class="card-glass flex-col" style="align-items: center; text-align: center; justify-content: center; gap: 20px;">
          <img src="assets/icon.svg" alt="Godot Logo" style="width: 110px; height: 110px; filter: drop-shadow(0 0 20px rgba(71, 140, 191, 0.5));">
          <div style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800;">Godot Engine 4.7</div>
          <div class="grid-2col" style="width: 100%; gap: 10px;">
            <div class="stat-card">
              <div class="stat-number" style="font-size: 1.5rem; color: #478cbf;">+109K</div>
              <div class="stat-label">Stars en GitHub</div>
            </div>
            <div class="stat-card">
              <div class="stat-number" style="font-size: 1.5rem; color: var(--accent-purple);">OpenXR</div>
              <div class="stat-label">VR Nativo integr.</div>
            </div>
          </div>
        </div>
      </div>
    `
  },

  // SLIDE 5 (was Slide 6)
  {
    id: 5,
    category: "Módulo 2: ¿Qué es Godot Engine?",
    title: "El Modelo Mental: Nodos y Escenas",
    subtitle: "Piensa en Godot como una construcción con piezas de LEGO",
    speakerNotes: "Para quienes nunca han programado: en Godot cada elemento (una cámara, una luz, una imagen) es una pieza de LEGO llamada NODO. Juntas varias piezas y creas una ESCENA.",
    bodyHTML: `
      <div class="grid-2col">
        <div class="flex-col">
          <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">
            Godot se organiza en un <strong>Árbol de Nodos</strong>. Cada nodo cumple un papel especializado y al agruparlos forman una <strong>Escena</strong> completa:
          </p>
          <div class="card-glass">
            <strong style="color: var(--accent-cyan);"><i class="bi bi-puzzle-fill me-1"></i> Nodo (Node)</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
              La pieza fundamental básica. Ejemplos: una cámara 3D, una luz o un reproductor de sonido.
            </p>
          </div>
          <div class="card-glass">
            <strong style="color: var(--accent-emerald);"><i class="bi bi-film me-1"></i> Escena (Scene)</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
              Una plantilla de nodos combinados. Puedes reutilizar la escena del 'Cartel Informativo' tantas veces como quieras.
            </p>
          </div>
        </div>

        <div class="lego-tree-container">
          <div style="font-family: var(--font-heading); font-weight: 700; font-size: 0.9rem; color: var(--accent-cyan); margin-bottom: 8px;">
            <i class="bi bi-diagram-3-fill me-1"></i> Estructura de Nodos del Proyecto:
          </div>
          <div class="node-item">
            <i class="bi bi-diagram-2-fill text-cyan me-1"></i> <span class="node-type">Node3D (Main)</span>
            <span class="node-desc">Escena Principal</span>
          </div>
          <div class="node-item node-indent-1">
            <i class="bi bi-globe me-1"></i> <span class="node-type">MeshInstance3D</span>
            <span class="node-desc">Esfera Foto 360°</span>
          </div>
          <div class="node-item node-indent-1">
            <i class="bi bi-vr me-1"></i> <span class="node-type">XROrigin3D</span>
            <span class="node-desc">Origen de VR</span>
          </div>
          <div class="node-item node-indent-2">
            <i class="bi bi-camera-video-fill me-1"></i> <span class="node-type">XRCamera3D</span>
            <span class="node-desc">Lentes Quest</span>
          </div>
          <div class="node-item node-indent-2">
            <i class="bi bi-controller me-1"></i> <span class="node-type">XRController3D</span>
            <span class="node-desc">Controles Mandos</span>
          </div>
        </div>
      </div>
    `
  },

  // SLIDE 6 (was Slide 7)
  {
    id: 6,
    category: "Módulo 2: ¿Qué es Godot Engine?",
    title: "GDScript: El Lenguaje de Godot",
    subtitle: "Diseñado para ser fácil, legible y rápido de aprender",
    speakerNotes: "GDScript se lee casi como inglés o español estructurado. No usa sintaxis complicada de corchetes ni llaves difíciles. Es perfecto para principiantes.",
    bodyHTML: `
      <div class="grid-2col">
        <div class="flex-col">
          <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.5;">
            Godot utiliza <strong>GDScript</strong>, un lenguaje creado específicamente para hacer que las piezas del juego interactúen de forma limpia:
          </p>
          <ul class="feature-list">
            <li>
              <span class="feature-bullet">1</span>
              <span><strong>Similar a Python:</strong> Sintaxis limpia con sangrías, ideal para quienes están aprendiendo.</span>
            </li>
            <li>
              <span class="feature-bullet">2</span>
              <span><strong>Señales (Signals):</strong> Los nodos se envían mensajes entre sí (ej: 'el usuario presionó el botón A').</span>
            </li>
            <li>
              <span class="feature-bullet">3</span>
              <span><strong>Integrado en el editor:</strong> Detecta errores al escribir sin necesidad de compilar largamente.</span>
            </li>
          </ul>
        </div>

        <div class="code-window">
          <div class="code-header">
            <div class="code-dots">
              <span class="code-dot red"></span>
              <span class="code-dot yellow"></span>
              <span class="code-dot green"></span>
            </div>
            <span class="code-title"><i class="bi bi-file-code-fill me-1"></i> main.gd (Script de Inicialización VR)</span>
          </div>
          <div class="code-content">
<span class="kw">extends</span> Node3D

<span class="kw">var</span> interface: XRInterface

<span class="kw">func</span> <span class="func">_ready</span>():
    <span class="comment"># Inicializar visor de realidad virtual</span>
    interface = XRServer.<span class="func">find_interface</span>(<span class="str">"OpenXR"</span>)
    <span class="kw">if</span> interface <span class="kw">and</span> interface.<span class="func">is_initialized</span>():
        <span class="func">get_viewport</span>().use_xr = <span class="kw">true</span>
        DisplayServer.window_set_vsync_mode(0)
        <span class="func">print</span>(<span class="str">"¡VR OpenXR Iniciado con Éxito!"</span>)
          </div>
        </div>
      </div>
    `
  },

  // SLIDE 7 (was Slide 8)
  {
    id: 7,
    category: "Módulo 2: ¿Qué es Godot Engine?",
    title: "¿Cómo Dibuja la Pantalla? (Renderers)",
    subtitle: "Elige el motor gráfico adecuado según el dispositivo",
    speakerNotes: "Godot 4 cuenta con 3 modos de renderizado. Para visores móviles autónomos como Meta Quest 2/3, la optimización y la baja latencia son vitales.",
    bodyHTML: `
      <div class="grid-3col">
        <div class="card-glass flex-col">
          <div class="icon-box cyan"><i class="bi bi-display-fill"></i></div>
          <strong style="font-size: 1.1rem; color: var(--accent-cyan);">Forward+</strong>
          <span style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700;">SOLO PC / ESCRITORIO</span>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 8px;">
            Máxima calidad visual. Sombras avanzadas, iluminación global (SDFGI) y reflejos hiperrealistas para computadoras potentes.
          </p>
        </div>

        <div class="card-glass flex-col" style="border-color: var(--accent-emerald);">
          <div class="icon-box emerald"><i class="bi bi-vr"></i></div>
          <strong style="font-size: 1.1rem; color: var(--accent-emerald);">Mobile (Vulkan)</strong>
          <span style="font-size: 0.75rem; color: var(--accent-emerald); font-weight: 700;">RECOMENDADO QUEST 3</span>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 8px;">
            Optimizado para chips móviles. Alto rendimiento, gráficos nítidos y consumo moderado de energía.
          </p>
        </div>

        <div class="card-glass flex-col">
          <div class="icon-box purple"><i class="bi bi-lightning-charge-fill"></i></div>
          <strong style="font-size: 1.1rem; color: var(--accent-purple);">GL Compatibility</strong>
          <span style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700;">MÁXIMA COMPATIBILIDAD</span>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 8px;">
            Usa OpenGL ES3. Es el modo del prototipo actual; funciona en prácticamente cualquier hardware antiguo o moderno.
          </p>
        </div>
      </div>
    `
  },

  // SLIDE 8 (was Slide 9)
  {
    id: 8,
    category: "Módulo 3: Arquitectura Técnica VR",
    title: "Del Mundo Real a la Esfera 3D",
    subtitle: "Interactúa con el Visor 360° para entender la ilusión panorámica",
    speakerNotes: "¡Prueba arrastrar con el ratón el visor interactivo de abajo! Una foto plana de relación 2:1 se proyecta sobre las paredes internas de una esfera 3D. El usuario se ubica en el centro exacto.",
    bodyHTML: `
      <div class="grid-2col" style="grid-template-columns: 1fr 1.3fr;">
        <div class="flex-col">
          <div class="card-glass accent-border">
            <strong style="color: var(--accent-cyan);"><i class="bi bi-globe2 me-1"></i> Formato Equirectangular (2:1)</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 6px;">
              Una foto 360° estirada de ancho por alto. La cámara VR se posiciona en el origen (0,0,0) dentro de una esfera invertida.
            </p>
          </div>
          <div class="card-glass nature-border">
            <strong style="color: var(--accent-emerald);"><i class="bi bi-hand-index-thumb-fill me-1"></i> Prueba el Simulador 360°:</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 6px;">
              Haz clic y arrastra con el ratón dentro de la ventana de la derecha para rotar la cámara y explorar la panorámica real.
            </p>
          </div>
        </div>

        <div class="viewer-360-wrapper">
          <canvas id="viewer360-canvas"></canvas>
          <div class="viewer-overlay">
            <span class="viewer-hint"><i class="bi bi-mouse2-fill me-1"></i> Mantén presionado y arrastra para rotar la vista 360°</span>
            <span style="font-family: var(--font-code); font-size: 0.75rem; color: var(--text-muted);">Foto: P001.png</span>
          </div>
        </div>
      </div>
    `
  },

  // SLIDE 9 (was Slide 10)
  {
    id: 9,
    category: "Módulo 3: Arquitectura Técnica VR",
    title: "OpenXR: El Conector Universal de VR",
    subtitle: "Cómo el estándar libre conecta Meta Quest con Godot Engine",
    speakerNotes: "Antes, cada visor de realidad virtual tenía sus propias reglas. OpenXR es el estándar internacional creado por la industria para que un solo desarrollo funcione en cualquier visor.",
    bodyHTML: `
      <div class="grid-2col">
        <div class="flex-col">
          <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">
            En lugar de programar controles específicos para Meta Quest, HTC Vive o Pico, Godot se comunica con <strong>OpenXR</strong>:
          </p>
          <div class="card-glass purple-border">
            <strong style="color: var(--accent-purple);"><i class="bi bi-map-fill me-1"></i> Action Map (Mapa de Acciones)</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 6px;">
              Definimos acciones conceptuales (ej: 'Avanzar', 'Mostrar Info'). OpenXR las traduce automáticamente a los botones del visor que tengas puesto.
            </p>
          </div>
          <div class="card-glass accent-border">
            <strong style="color: var(--accent-cyan);"><i class="bi bi-hand-index-fill me-1"></i> Tracking de Manos</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 6px;">
              Soporta tanto los controladores físicos de Meta Quest como el seguimiento directo de las manos.
            </p>
          </div>
        </div>

        <div class="card-glass flex-col" style="justify-content: center; align-items: center; text-align: center;">
          <div style="font-size: 3rem; margin-bottom: 10px; color: var(--accent-cyan);"><i class="bi bi-plug-fill"></i></div>
          <h3 style="font-family: var(--font-heading); font-size: 1.3rem;">Estándar OpenXR 1.1</h3>
          <div style="margin: 16px 0; font-family: var(--font-code); font-size: 0.85rem; color: var(--accent-cyan);">
            Godot 4.7 ➔ Plugin OpenXR Vendors ➔ Meta Quest APK
          </div>
          <p style="font-size: 0.85rem; color: var(--text-muted); max-width: 320px;">
            Garantiza baja latencia, sincronización perfecta de la mirada y desactivación automática de VSync.
          </p>
        </div>
      </div>
    `
  },

  // SLIDE 10 (was Slide 11)
  {
    id: 10,
    category: "Módulo 3: Arquitectura Técnica VR",
    title: "Controles e Interacción en VR",
    subtitle: "Diseñado para la comodidad y prevención del mareo por movimiento",
    speakerNotes: "El mareo en VR ocurre cuando la vista se mueve continuamente pero el cuerpo está quieto. Con Snap Turning hacemos giros instantáneos de 45° que eliminan esa sensación incómoda.",
    bodyHTML: `
      <div class="grid-3col">
        <div class="card-glass flex-col">
          <div class="icon-box cyan"><i class="bi bi-arrow-repeat"></i></div>
          <strong style="color: var(--accent-cyan); font-size: 1.05rem;">Snap Turning (45°)</strong>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 6px;">
            Empuja la palanca del mando derecho hacia la izquierda o derecha para rotar en ángulos fijos de 45°. Máximo confort.
          </p>
        </div>

        <div class="card-glass flex-col">
          <div class="icon-box emerald"><i class="bi bi-card-heading"></i></div>
          <strong style="color: var(--accent-emerald); font-size: 1.05rem;">Carteles 3D Flotantes</strong>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 6px;">
            Paneles gráficos creados con SubViewport que muestran datos de flora y fauna manteniendo la nitidez visual en VR.
          </p>
        </div>

        <div class="card-glass flex-col">
          <div class="icon-box purple"><i class="bi bi-stars"></i></div>
          <strong style="color: var(--accent-purple); font-size: 1.05rem;">Marcadores Animados</strong>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 6px;">
            Puntos de interés interactivos con animación de flotación senoidal que llaman suavemente la atención del visitante.
          </p>
        </div>
      </div>
    `
  },

  // SLIDE 11 (was Slide 12)
  {
    id: 11,
    category: "Módulo 3: Arquitectura Técnica VR",
    title: "Modo Escritorio para Pruebas",
    subtitle: "Desarrolla y prueba sin necesidad de tener puestas las gafas VR",
    speakerNotes: "Para facilitar el trabajo del desarrollador o la demostración en aula, agregamos una cámara orbital con mouse que permite simular la mirada del casco VR directamente en una pantalla tradicional.",
    bodyHTML: `
      <div class="grid-2col">
        <div class="flex-col">
          <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.5;">
            No siempre tienes el visor Meta Quest a la mano. Por eso creamos el script <code>desktop_camera.gd</code>:
          </p>
          <div class="card-glass accent-border">
            <strong style="color: var(--accent-cyan);"><i class="bi bi-mouse-fill me-1"></i> Control Orbital con Mouse</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
              El cursor se captura automáticamente al presionar Play en Godot. Mover el mouse simula girar la cabeza.
            </p>
          </div>
          <div class="card-glass nature-border">
            <strong style="color: var(--accent-emerald);"><i class="bi bi-keyboard-fill me-1"></i> Tecla ESC</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
              Presiona la tecla <code>Escape</code> para liberar el puntero del mouse en cualquier momento.
            </p>
          </div>
        </div>

        <div class="card-glass flex-col" style="justify-content: center; gap: 16px;">
          <h4 style="font-family: var(--font-heading); color: var(--accent-cyan);"><i class="bi bi-controller me-1"></i> Mapa de Controles en PC:</h4>
          <div style="display: flex; flex-direction: column; gap: 10px; font-family: var(--font-code); font-size: 0.85rem;">
            <div style="display: flex; justify-content: space-between; padding: 8px; background: rgba(255,255,255,0.04); border-radius: 4px;">
              <span>Rotar Vista 360°</span>
              <span style="color: var(--accent-cyan);">Movimiento Mouse</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 8px; background: rgba(255,255,255,0.04); border-radius: 4px;">
              <span>Liberar Mouse</span>
              <span style="color: var(--accent-cyan);">Tecla ESC</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 8px; background: rgba(255,255,255,0.04); border-radius: 4px;">
              <span>Avanzar / Retroceder</span>
              <span style="color: var(--accent-cyan);">Flechas / Clic</span>
            </div>
          </div>
        </div>
      </div>
    `
  },

  // SLIDE 12 (was Slide 13)
  {
    id: 12,
    category: "Módulo 4: Estado Actual y Futuro",
    title: "Estado del Proyecto y Roadmap",
    subtitle: "De la prueba de concepto (MVP) hacia la plataforma final",
    speakerNotes: "El prototipo actual (MVP) ya visualiza la fotografía panorámica en Meta Quest con baja latencia. El siguiente paso es conectar secuencialmente todas las imágenes de la Ciénaga.",
    bodyHTML: `
      <div class="grid-2col">
        <div class="card-glass flex-col">
          <h3 style="color: var(--accent-emerald); display: flex; align-items: center; gap: 8px;">
            <i class="bi bi-check-circle-fill"></i> Implementado Hoy (MVP)
          </h3>
          <ul class="feature-list" style="margin-top: 8px;">
            <li><span class="feature-bullet"><i class="bi bi-check"></i></span> Visualización Esférica 360° funcional.</li>
            <li><span class="feature-bullet"><i class="bi bi-check"></i></span> Inicialización nativa OpenXR en Meta Quest.</li>
            <li><span class="feature-bullet"><i class="bi bi-check"></i></span> Snap turning 45° e interacción con mandos.</li>
            <li><span class="feature-bullet"><i class="bi bi-check"></i></span> Carteles informativos 3D y marcadores animados.</li>
            <li><span class="feature-bullet"><i class="bi bi-check"></i></span> Modo Escritorio y paquete ejecutable <code>Metaquest.apk</code>.</li>
          </ul>
        </div>

        <div class="card-glass flex-col">
          <h3 style="color: var(--accent-amber); display: flex; align-items: center; gap: 8px;">
            <i class="bi bi-arrow-repeat"></i> En Desarrollo Prioritario
          </h3>
          <ul class="feature-list" style="margin-top: 8px;">
            <li><span class="feature-bullet"><i class="bi bi-arrow-right-short"></i></span> Carga secuencial de múltiples puntos (JSON/CSV).</li>
            <li><span class="feature-bullet"><i class="bi bi-arrow-right-short"></i></span> Transiciones suavizadas (Fundido a negro entre fotos).</li>
            <li><span class="feature-bullet"><i class="bi bi-arrow-right-short"></i></span> Carga asíncrona de imágenes pesadas sin tirones.</li>
            <li><span class="feature-bullet"><i class="bi bi-arrow-right-short"></i></span> Puntos de interés educativos sobre flora y fauna real.</li>
          </ul>
        </div>
      </div>
    `
  },

  // SLIDE 13 (was Slide 14)
  {
    id: 13,
    category: "Módulo 4: Estado Actual y Futuro",
    title: "¿Cómo se Instala y Ejecuta?",
    subtitle: "Guía rápida para probar en PC o en las gafas Meta Quest",
    speakerNotes: "Puedes clonar el proyecto y presionar F5 en Godot 4.7, o instalar directamente el archivo ejecutable APK en las gafas mediante un cable USB con ADB.",
    bodyHTML: `
      <div class="grid-2col">
        <div class="card-glass flex-col">
          <h4 style="color: var(--accent-cyan); font-family: var(--font-heading); font-size: 1.1rem;">
            <i class="bi bi-laptop me-1"></i> Opción A: Abrir en PC con Godot
          </h4>
          <ol style="font-size: 0.88rem; color: var(--text-muted); margin-left: 18px; line-height: 1.6;">
            <li>Descarga e instala <strong>Godot Engine 4.7</strong>.</li>
            <li>Selecciona <em>Importar</em> y abre la carpeta <code>Experiencia_VR-main</code>.</li>
            <li>Presiona la tecla <strong style="color: #fff;">F5</strong> para ejecutar en modo escritorio.</li>
          </ol>
        </div>

        <div class="card-glass flex-col">
          <h4 style="color: var(--accent-purple); font-family: var(--font-heading); font-size: 1.1rem;">
            <i class="bi bi-vr me-1"></i> Opción B: Instalar en Meta Quest (APK)
          </h4>
          <ol style="font-size: 0.88rem; color: var(--text-muted); margin-left: 18px; line-height: 1.6;">
            <li>Activa el <em>Developer Mode</em> en tu app de Meta Quest.</li>
            <li>Conecta las gafas a la PC mediante cable USB.</li>
            <li>Ejecuta el comando de instalación en la terminal:</li>
          </ol>
          <div style="background: #000; padding: 10px; border-radius: 6px; font-family: var(--font-code); font-size: 0.78rem; color: var(--accent-cyan);">
            adb install Experiencia_VR-main/Metaquest.apk
          </div>
        </div>
      </div>
    `
  },

  // SLIDE 14 (was Slide 15)
  {
    id: 14,
    category: "Módulo 4: Evaluación Interactiva",
    title: "Trivia Interactiva de Aprendizaje",
    subtitle: "¡Pon a prueba lo aprendido sobre el proyecto y Godot!",
    speakerNotes: "¡Momento de evaluar la comprensión de la audiencia! Responde estas sencillas preguntas para comprobar que comprendiste el proyecto y el motor gráfico.",
    bodyHTML: `
      <div class="quiz-container">
        <div class="quiz-progress-bullets" id="quiz-bullets">
          <span class="quiz-bullet active"></span>
          <span class="quiz-bullet"></span>
          <span class="quiz-bullet"></span>
        </div>

        <div id="quiz-question-box">
          <h3 class="quiz-question" id="quiz-title">Cargando pregunta...</h3>
          <div class="quiz-options" id="quiz-options" style="margin-top: 16px;"></div>
          <div class="quiz-feedback" id="quiz-feedback" style="margin-top: 16px;"></div>
        </div>
      </div>
    `
  }
];
