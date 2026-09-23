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
  "AudioStreamPlayer3D": "Nodo de Godot utilizado para reproducir narraciones de audio posicional en 3D (Español e Inglés).",
  "Sideload": "Instalar una aplicación directamente en un dispositivo (como Meta Quest) usando un cable USB sin pasar por la tienda oficial.",
  "Snap Turning": "Mecanismo de seguridad VR que gira la cámara en saltos de 45° en lugar de un movimiento continuo para evitar el mareo por movimiento."
};

const SLIDES_DATA = [
  // SLIDE 1
  {
    id: 1,
    category: "Módulo 1: La Visión del Proyecto",
    title: "Recorrido Virtual Inmersivo 360°",
    subtitle: "Exploración de la Ciénaga de Mallorquín con Realidad Virtual y Audio Bilingüe",
    audioES: "Bienvenidos al recorrido virtual inmersivo de la Ciénaga de Mallorquín en Barranquilla, desarrollado en Realidad Virtual con Godot Engine y audio narrado en español e inglés.",
    audioEN: "Welcome to the immersive virtual tour of the Cienaga de Mallorquin in Barranquilla, developed in Virtual Reality with Godot Engine and narrated audio in Spanish and English.",
    speakerNotes: "¡Bienvenidos a la presentación! Esta guía está diseñada para explicar cómo creamos un recorrido virtual inmersivo por un ecosistema natural con audio guías bilingües (español e inglés) y la potencia de Godot Engine.",
    bodyHTML: `
      <div class="hero-slide">
        <div class="hero-badge-group">
          <span class="hero-badge nature"><i class="bi bi-tree-fill me-1"></i> Ciénaga de Mallorquín</span>
          <span class="hero-badge godot"><i class="bi bi-cpu-fill me-1"></i> Godot Engine 4.7</span>
          <span class="hero-badge"><i class="bi bi-volume-up-fill me-1"></i> Audio ES / EN</span>
        </div>
        <h1 class="hero-title">Explora la Naturaleza con <span class="gradient-text">Realidad Virtual y Audio Bilingüe</span></h1>
        <p class="hero-description">
          Descubre cómo transformamos fotografías panorámicas 360° en un paseo virtual inmersivo para la Ciénaga de Mallorquín, con audios explicativos en español e inglés.
        </p>

        <div class="audio-narration-box mb-4">
          <span class="me-2 text-cyan font-bold"><i class="bi bi-soundwave me-1"></i> Narración de Audio:</span>
          <button class="btn btn-sm btn-outline-info me-2" onclick="window.slidesApp.playAudio('es')">
            <i class="bi bi-play-fill"></i> Reproducir en Español 🇪🇸
          </button>
          <button class="btn btn-sm btn-outline-warning" onclick="window.slidesApp.playAudio('en')">
            <i class="bi bi-play-fill"></i> Play in English 🇺🇸
          </button>
        </div>

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
    subtitle: "Digitalización ecológica con narración auditiva en dos idiomas",
    audioES: "La Ciénaga de Mallorquín es una laguna costera fundamental en Barranquilla. Su digitalización con audios bilingües permite educar a la comunidad sin generar impacto físico.",
    audioEN: "The Cienaga de Mallorquin is a crucial coastal lagoon in Barranquilla. Digitalizing it with bilingual audio guides allows environmental education without physical impact.",
    speakerNotes: "La Ciénaga de Mallorquín es una laguna costera fundamental. Digitalizarla en 360° con locuciones de audio en español e inglés permite la educación ambiental inclusiva a nivel global.",
    bodyHTML: `
      <div class="grid-2col">
        <div class="flex-col">
          <div class="card-glass nature-border">
            <div class="icon-box emerald"><i class="bi bi-flower1"></i></div>
            <h3>Tesoro de Biodiversidad</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 8px;">
              Un ecosistema de manglar habitado por aves migratorias, crustáceos y especies vegetales únicas en la costa Caribe.
            </p>
          </div>
          <div class="card-glass accent-border">
            <div class="icon-box cyan"><i class="bi bi-translate"></i></div>
            <h3>Audios Educativos Bilingües</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 8px;">
              Narraciones claras en español e inglés que se activan automáticamente en cada punto para enriquecer el aprendizaje.
            </p>
          </div>
        </div>

        <div class="card-glass flex-col" style="justify-content: center; height: 100%;">
          <div class="stat-card" style="margin-bottom: 12px;">
            <div class="stat-number">360°</div>
            <div class="stat-label">Perspectiva inmersiva completa</div>
          </div>
          <div class="stat-card" style="margin-bottom: 12px;">
            <div class="stat-number">ES / EN</div>
            <div class="stat-label">Audio bilingüe (Español & English)</div>
          </div>
          <div class="stat-card">
            <div class="stat-number"><i class="bi bi-vr"></i> VR</div>
            <div class="stat-label">Inmersión con Meta Quest</div>
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
    subtitle: "Navegación paso a paso acompañada de audios explicativos",
    audioES: "El usuario avanza secuencialmente por la ruta virtual mientras escucha audios informativos en español o inglés sobre el manglar.",
    audioEN: "The user advances sequentially through the virtual path while listening to informative audio guides in Spanish or English about the mangrove.",
    speakerNotes: "El usuario avanza secuencialmente entre puntos panorámicos. En lugar de carteles molestos, escucha una narración fluida en su idioma de preferencia (español o inglés).",
    bodyHTML: `
      <div class="flex-col" style="gap: 20px;">
        <p style="font-size: 1.05rem; color: var(--text-muted);">
          La experiencia replica el recorrido físico combinando visión panorámica 360° y narración de voz bilingüe:
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
              Movimiento natural de cabeza en 360° para explorar el paisaje del ecosistema.
            </p>
          </div>
          <div class="card-glass">
            <strong style="color: var(--accent-emerald);"><i class="bi bi-fast-forward-fill me-1"></i> Avanzar / Retroceder</strong>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 6px;">
              Usa los botones del mando (A/X) para trasladarte entre panoramas del trayecto.
            </p>
          </div>
          <div class="card-glass">
            <strong style="color: var(--accent-purple);"><i class="bi bi-volume-up-fill me-1"></i> Audios Bilingües (ES/EN)</strong>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 6px;">
              Narración de voz que explica las características biológicas del lugar en español e inglés.
            </p>
          </div>
        </div>
      </div>
    `
  },

  // SLIDE 4
  {
    id: 4,
    category: "Módulo 2: ¿Qué es Godot Engine?",
    title: "¿Qué es Godot Engine?",
    subtitle: "El motor de software libre que sostiene la experiencia y el audio 3D",
    audioES: "Godot Engine es un motor libre y gratuito que permite gestionar fácilmente la realidad virtual y la reproducción de audios en 3D.",
    audioEN: "Godot Engine is a free, open-source engine that easily manages virtual reality and 3D audio playback.",
    speakerNotes: "Godot es un motor gráfico creado en Latinoamérica. Es 100% gratuito y maneja de forma nativa tanto gráficos como audio espacializado en 3D.",
    bodyHTML: `
      <div class="grid-2col">
        <div class="flex-col">
          <div class="card-glass accent-border">
            <h3 style="color: var(--accent-cyan); margin-bottom: 8px;"><i class="bi bi-unlock-fill me-2"></i> 100% Gratuito y Libre</h3>
            <p style="font-size: 0.92rem; color: var(--text-muted);">
              Licencia MIT: todo lo que creas te pertenece por completo, sin regalías ni comisiones.
            </p>
          </div>
          <div class="card-glass nature-border">
            <h3 style="color: var(--accent-emerald); margin-bottom: 8px;"><i class="bi bi-soundwave me-2"></i> Audio Posicional 3D</h3>
            <p style="font-size: 0.92rem; color: var(--text-muted);">
              Soporte nativo para audio espacializado en español e inglés mediante el nodo <code>AudioStreamPlayer3D</code>.
            </p>
          </div>
          <div class="card-glass purple-border">
            <h3 style="color: var(--accent-purple); margin-bottom: 8px;"><i class="bi bi-lightning-charge-fill me-2"></i> Ligero y Versátil</h3>
            <p style="font-size: 0.92rem; color: var(--text-muted);">
              Pesa menos de 100 MB y permite exportar rápidamente a computadoras y visores Meta Quest.
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
              <div class="stat-label">VR Nativo + Audio</div>
            </div>
          </div>
        </div>
      </div>
    `
  },

  // SLIDE 5
  {
    id: 5,
    category: "Módulo 2: ¿Qué es Godot Engine?",
    title: "El Modelo Mental: Nodos y Escenas",
    subtitle: "Estructura jerárquica con nodos especializados para audio y cámara",
    audioES: "En Godot, cada función se realiza mediante nodos. El nodo AudioStreamPlayer3D se encarga de emitir las narraciones en español e inglés.",
    audioEN: "In Godot, every feature is built with nodes. The AudioStreamPlayer3D node handles emitting narrations in Spanish and English.",
    speakerNotes: "Explicación de nodos: cada elemento es una pieza de LEGO. El nodo AudioStreamPlayer3D reproduce las locuciones bilingües posicionales.",
    bodyHTML: `
      <div class="grid-2col">
        <div class="flex-col">
          <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">
            Godot organiza los proyectos mediante un <strong>Árbol de Nodos</strong>. Cada nodo cumple una función especializada:
          </p>
          <div class="card-glass">
            <strong style="color: var(--accent-cyan);"><i class="bi bi-puzzle-fill me-1"></i> Nodo (Node)</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
              La unidad básica de funcionalidad. Ejemplos: cámara VR, esferas 3D o reproductores de voz.
            </p>
          </div>
          <div class="card-glass">
            <strong style="color: var(--accent-emerald);"><i class="bi bi-volume-up-fill me-1"></i> AudioStreamPlayer3D</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
              Nodo encargado de reproducir los archivos de voz en español e inglés ajustando el volumen según la ubicación del usuario.
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
            <i class="bi bi-soundwave me-1"></i> <span class="node-type">AudioStreamPlayer3D</span>
            <span class="node-desc">Audio Guía ES / EN</span>
          </div>
          <div class="node-item node-indent-1">
            <i class="bi bi-vr me-1"></i> <span class="node-type">XROrigin3D</span>
            <span class="node-desc">Origen de VR</span>
          </div>
          <div class="node-item node-indent-2">
            <i class="bi bi-camera-video-fill me-1"></i> <span class="node-type">XRCamera3D</span>
            <span class="node-desc">Lentes Quest</span>
          </div>
        </div>
      </div>
    `
  },

  // SLIDE 6
  {
    id: 6,
    category: "Módulo 2: ¿Qué es Godot Engine?",
    title: "GDScript: El Lenguaje de Godot",
    subtitle: "Código limpio para cambiar de idioma de audio dinámicamente",
    audioES: "Con pocas líneas de GDScript podemos alternar el idioma de la narración de audio entre español e inglés durante la experiencia.",
    audioEN: "With just a few lines of GDScript we can dynamically switch audio narration between Spanish and English.",
    speakerNotes: "GDScript permite controlar la lógica con extrema claridad. Aquí mostramos cómo se conmuta el canal de audio entre español e inglés.",
    bodyHTML: `
      <div class="grid-2col">
        <div class="flex-col">
          <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.5;">
            Godot utiliza <strong>GDScript</strong> para programar comportamientos interactivos como la conmutación de audios:
          </p>
          <ul class="feature-list">
            <li>
              <span class="feature-bullet">1</span>
              <span><strong>Gestión de Audio:</strong> Carga fácil de archivos MP3/OGG en español e inglés.</span>
            </li>
            <li>
              <span class="feature-bullet">2</span>
              <span><strong>Conmutación de Idioma:</strong> Cambia de voz instantáneamente al presionar un botón.</span>
            </li>
            <li>
              <span class="feature-bullet">3</span>
              <span><strong>Sintaxis Limpia:</strong> Altamente parecida a Python, súper comprensible.</span>
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
            <span class="code-title"><i class="bi bi-file-code-fill me-1"></i> audio_manager.gd (Gestor de Audio Bilingüe)</span>
          </div>
          <div class="code-content">
<span class="kw">extends</span> Node3D

<span class="kw">@onready var</span> audio_player = <span class="type">$AudioStreamPlayer3D</span>
<span class="kw">var</span> current_lang: String = <span class="str">"es"</span>

<span class="kw">func</span> <span class="func">play_narration</span>(point_id: String):
    <span class="kw">var</span> path = <span class="str">"res://audio/"</span> + current_lang + <span class="str">"/"</span> + point_id + <span class="str">".ogg"</span>
    audio_player.stream = <span class="func">load</span>(path)
    audio_player.<span class="func">play</span>()
    <span class="func">print</span>(<span class="str">"Reproduciendo audio: "</span>, path)
          </div>
        </div>
      </div>
    `
  },

  // SLIDE 7
  {
    id: 7,
    category: "Módulo 2: ¿Qué es Godot Engine?",
    title: "¿Cómo Dibuja la Pantalla? (Renderers)",
    subtitle: "Rendimiento optimizado para combinar gráficos fluido y sonido",
    audioES: "Godot 4 ofrece tres modos de renderizado para garantizar fluidez visual y baja latencia de sonido en las gafas Meta Quest.",
    audioEN: "Godot 4 offers three rendering modes ensuring smooth visual performance and low latency audio in Meta Quest.",
    speakerNotes: "Los 3 modos de renderizado de Godot 4 permiten adaptar el rendimiento visual manteniendo la reproducción de audio en tiempo real.",
    bodyHTML: `
      <div class="grid-3col">
        <div class="card-glass flex-col">
          <div class="icon-box cyan"><i class="bi bi-display-fill"></i></div>
          <strong style="font-size: 1.1rem; color: var(--accent-cyan);">Forward+</strong>
          <span style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700;">SOLO PC / ESCRITORIO</span>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 8px;">
            Máxima fidelidad gráfica para computadoras potentes con procesamiento de sonido en tiempo real.
          </p>
        </div>

        <div class="card-glass flex-col" style="border-color: var(--accent-emerald);">
          <div class="icon-box emerald"><i class="bi bi-vr"></i></div>
          <strong style="font-size: 1.1rem; color: var(--accent-emerald);">Mobile (Vulkan)</strong>
          <span style="font-size: 0.75rem; color: var(--accent-emerald); font-weight: 700;">RECOMENDADO QUEST 3</span>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 8px;">
            Optimizado para chips móviles. Alto rendimiento, sonido sin lag y bajo consumo de batería.
          </p>
        </div>

        <div class="card-glass flex-col">
          <div class="icon-box purple"><i class="bi bi-lightning-charge-fill"></i></div>
          <strong style="font-size: 1.1rem; color: var(--accent-purple);">GL Compatibility</strong>
          <span style="font-size: 0.75rem; color: var(--text-dim); font-weight: 700;">MÁXIMA COMPATIBILIDAD</span>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 8px;">
            Usa OpenGL ES3. Ideal para compatibilidad en dispositivos anteriores o prototipos rápidos.
          </p>
        </div>
      </div>
    `
  },

  // SLIDE 8
  {
    id: 8,
    category: "Módulo 3: Arquitectura Técnica VR",
    title: "Del Mundo Real a la Esfera 3D",
    subtitle: "Explora la foto 360° mientras escuchas la locución del punto",
    audioES: "El visor 360 interactivo proyecta la foto panorámica sobre la esfera mientras el audio relata los datos del punto observado.",
    audioEN: "The interactive 360 viewer projects the panoramic photo onto the sphere while the audio narrator describes the point.",
    speakerNotes: "Demostración del visor panorámico 360° con prueba de audio en directo.",
    bodyHTML: `
      <div class="grid-2col" style="grid-template-columns: 1fr 1.3fr;">
        <div class="flex-col">
          <div class="card-glass accent-border">
            <strong style="color: var(--accent-cyan);"><i class="bi bi-globe2 me-1"></i> Formato Equirectangular (2:1)</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 6px;">
              Una foto 360° proyectada en el interior de una esfera 3D con la cámara VR en el origen.
            </p>
          </div>
          <div class="card-glass nature-border">
            <strong style="color: var(--accent-emerald);"><i class="bi bi-soundwave me-1"></i> Audio Guía del Punto:</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 6px;">
              Escucha la explicación del punto mientras exploras arrastrando el ratón en la ventana 3D.
            </p>
            <div class="mt-2">
              <button class="btn btn-sm btn-outline-info me-1" onclick="window.slidesApp.playAudio('es')">
                <i class="bi bi-volume-up-fill"></i> Audio ES
              </button>
              <button class="btn btn-sm btn-outline-warning" onclick="window.slidesApp.playAudio('en')">
                <i class="bi bi-volume-up-fill"></i> Audio EN
              </button>
            </div>
          </div>
        </div>

        <div class="viewer-360-wrapper">
          <canvas id="viewer360-canvas"></canvas>
          <div class="viewer-overlay">
            <span class="viewer-hint"><i class="bi bi-mouse2-fill me-1"></i> Arrastra para rotar la vista 360°</span>
            <span style="font-family: var(--font-code); font-size: 0.75rem; color: var(--text-muted);">Foto: P001.png</span>
          </div>
        </div>
      </div>
    `
  },

  // SLIDE 9
  {
    id: 9,
    category: "Módulo 3: Arquitectura Técnica VR",
    title: "OpenXR: El Conector Universal de VR",
    subtitle: "Integración perfecta de controles y reproducción de sonido",
    audioES: "OpenXR garantiza que los comandos de avanzar, retroceder y cambiar de idioma funcionen en cualquier visor de Realidad Virtual.",
    audioEN: "OpenXR ensures that forward, backward, and audio language commands work seamlessly on any VR headset.",
    speakerNotes: "OpenXR conecta el motor Godot con las gafas Meta Quest garantizando compatibilidad universal y respuesta inmediata.",
    bodyHTML: `
      <div class="grid-2col">
        <div class="flex-col">
          <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">
            Godot se comunica con las gafas mediante el estándar internacional <strong>OpenXR</strong>:
          </p>
          <div class="card-glass purple-border">
            <strong style="color: var(--accent-purple);"><i class="bi bi-map-fill me-1"></i> Mapa de Acciones (Action Map)</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 6px;">
              Traduce los botones del mando para cambiar de panorama y alternar el audio entre español e inglés.
            </p>
          </div>
          <div class="card-glass accent-border">
            <strong style="color: var(--accent-cyan);"><i class="bi bi-headphones me-1"></i> Audio Posicional VR</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 6px;">
              Sincroniza el sonido en tiempo real con la orientación de la cabeza del visitante.
            </p>
          </div>
        </div>

        <div class="card-glass flex-col" style="justify-content: center; align-items: center; text-align: center;">
          <div style="font-size: 3rem; margin-bottom: 10px; color: var(--accent-cyan);"><i class="bi bi-plug-fill"></i></div>
          <h3 style="font-family: var(--font-heading); font-size: 1.3rem;">Estándar OpenXR 1.1</h3>
          <div style="margin: 16px 0; font-family: var(--font-code); font-size: 0.85rem; color: var(--accent-cyan);">
            Godot 4.7 ➔ Plugin OpenXR ➔ Meta Quest APK
          </div>
          <p style="font-size: 0.85rem; color: var(--text-muted); max-width: 320px;">
            Garantiza baja latencia visual y auditiva sin interrupciones.
          </p>
        </div>
      </div>
    `
  },

  // SLIDE 10
  {
    id: 10,
    category: "Módulo 3: Arquitectura Técnica VR",
    title: "Controles e Interacción en VR",
    subtitle: "Audios bilingües y rotación confortable para evitar el mareo",
    audioES: "Para máxima comodidad, combinamos giros por ángulos de 45 grados con locuciones de audio narradas en español e inglés.",
    audioEN: "For maximum comfort, we combine 45 degree snap turning with narrated audio guides in Spanish and English.",
    speakerNotes: "Remoción de carteles visuales sustituidos por audios bilingües que no ensucian el paisaje panorámico 360°.",
    bodyHTML: `
      <div class="grid-3col">
        <div class="card-glass flex-col">
          <div class="icon-box cyan"><i class="bi bi-arrow-repeat"></i></div>
          <strong style="color: var(--accent-cyan); font-size: 1.05rem;">Snap Turning (45°)</strong>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 6px;">
            Giros instantáneos en ángulos fijos de 45° con el thumbstick derecho para evitar mareos en VR.
          </p>
        </div>

        <div class="card-glass flex-col">
          <div class="icon-box emerald"><i class="bi bi-soundwave"></i></div>
          <strong style="color: var(--accent-emerald); font-size: 1.05rem;">Audio Bilingüe (ES / EN)</strong>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 6px;">
            Narraciones de voz en español e inglés sobre la fauna y flora sin obstaculizar la vista 360°.
          </p>
        </div>

        <div class="card-glass flex-col">
          <div class="icon-box purple"><i class="bi bi-stars"></i></div>
          <strong style="color: var(--accent-purple); font-size: 1.05rem;">Marcadores Flotantes</strong>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 6px;">
            Puntos interactivos animados que indican la dirección hacia el siguiente punto del sendero.
          </p>
        </div>
      </div>
    `
  },

  // SLIDE 11
  {
    id: 11,
    category: "Módulo 3: Arquitectura Técnica VR",
    title: "Modo Escritorio para Pruebas",
    subtitle: "Desarrolla y escucha los audios desde una computadora tradicional",
    audioES: "El modo escritorio permite navegar el entorno 360° con el mouse y probar la narración en ambos idiomas sin ponerse las gafas.",
    audioEN: "Desktop mode allows exploring the 360 environment with the mouse and testing bilingual audio without wearing the headset.",
    speakerNotes: "Modo Escritorio: permite probar visualmente la cámara orbital y la reproducción de audios desde cualquier PC.",
    bodyHTML: `
      <div class="grid-2col">
        <div class="flex-col">
          <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.5;">
            El script <code>desktop_camera.gd</code> permite probar la aplicación en PC sin gafas VR:
          </p>
          <div class="card-glass accent-border">
            <strong style="color: var(--accent-cyan);"><i class="bi bi-mouse-fill me-1"></i> Control Orbital con Mouse</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
              Mover el ratón simula la rotación de la cabeza para explorar la panorámica en 360°.
            </p>
          </div>
          <div class="card-glass nature-border">
            <strong style="color: var(--accent-emerald);"><i class="bi bi-volume-up-fill me-1"></i> Prueba de Audio Bilingüe</strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
              Verifica el funcionamiento de las voces en español e inglés antes de generar el paquete APK.
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
              <span>Audio Español / Inglés</span>
              <span style="color: var(--accent-cyan);">Teclas 1 / 2</span>
            </div>
          </div>
        </div>
      </div>
    `
  },

  // SLIDE 12
  {
    id: 12,
    category: "Módulo 4: Estado Actual y Futuro",
    title: "Estado del Proyecto y Roadmap",
    subtitle: "Avances actuales y plan de locuciones bilingües",
    audioES: "El prototipo actual ya integra la visualización 360° en Meta Quest y el soporte para audios narrados en español e inglés.",
    audioEN: "The current prototype already integrates 360 visualization on Meta Quest and support for narrated audio in Spanish and English.",
    speakerNotes: "Estado del MVP actual e hitos futuros incorporando las locuciones bilingües completas.",
    bodyHTML: `
      <div class="grid-2col">
        <div class="card-glass flex-col">
          <h3 style="color: var(--accent-emerald); display: flex; align-items: center; gap: 8px;">
            <i class="bi bi-check-circle-fill"></i> Implementado Hoy (MVP)
          </h3>
          <ul class="feature-list" style="margin-top: 8px;">
            <li><span class="feature-bullet"><i class="bi bi-check"></i></span> Visualización Esférica 360° funcional.</li>
            <li><span class="feature-bullet"><i class="bi bi-check"></i></span> Inicialización nativa OpenXR en Meta Quest.</li>
            <li><span class="feature-bullet"><i class="bi bi-check"></i></span> Audio guías bilingües (Español e Inglés).</li>
            <li><span class="feature-bullet"><i class="bi bi-check"></i></span> Snap turning 45° e interacción con mandos.</li>
            <li><span class="feature-bullet"><i class="bi bi-check"></i></span> Modo Escritorio y ejecutable <code>Metaquest.apk</code>.</li>
          </ul>
        </div>

        <div class="card-glass flex-col">
          <h3 style="color: var(--accent-amber); display: flex; align-items: center; gap: 8px;">
            <i class="bi bi-arrow-repeat"></i> En Desarrollo Prioritario
          </h3>
          <ul class="feature-list" style="margin-top: 8px;">
            <li><span class="feature-bullet"><i class="bi bi-arrow-right-short"></i></span> Grabación de locuciones profesionales de campo.</li>
            <li><span class="feature-bullet"><i class="bi bi-arrow-right-short"></i></span> Carga secuencial de múltiples puntos (JSON/CSV).</li>
            <li><span class="feature-bullet"><i class="bi bi-arrow-right-short"></i></span> Transiciones suavizadas con fundido entre fotos.</li>
            <li><span class="feature-bullet"><i class="bi bi-arrow-right-short"></i></span> Puntos de interés educativos sobre biodiversidad real.</li>
          </ul>
        </div>
      </div>
    `
  },

  // SLIDE 13
  {
    id: 13,
    category: "Módulo 4: Estado Actual y Futuro",
    title: "¿Cómo se Instala y Ejecuta?",
    subtitle: "Guía rápida para probar en PC o en las gafas Meta Quest",
    audioES: "Puedes probar la aplicación en Godot 4.7 o instalar la aplicación APK compilada en las gafas Meta Quest mediante ADB.",
    audioEN: "You can test the app in Godot 4.7 or install the compiled APK file onto Meta Quest headsets via ADB.",
    speakerNotes: "Instrucciones sencillas de instalación y despliegue del APK en Meta Quest.",
    bodyHTML: `
      <div class="grid-2col">
        <div class="card-glass flex-col">
          <h4 style="color: var(--accent-cyan); font-family: var(--font-heading); font-size: 1.1rem;">
            <i class="bi bi-laptop me-1"></i> Opción A: Abrir en PC con Godot
          </h4>
          <ol style="font-size: 0.88rem; color: var(--text-muted); margin-left: 18px; line-height: 1.6;">
            <li>Descarga e instala <strong>Godot Engine 4.7</strong>.</li>
            <li>Selecciona <em>Importar</em> y abre la carpeta <code>Experiencia_VR-main</code>.</li>
            <li>Presiona <strong style="color: #fff;">F5</strong> para ejecutar y probar los audios.</li>
          </ol>
        </div>

        <div class="card-glass flex-col">
          <h4 style="color: var(--accent-purple); font-family: var(--font-heading); font-size: 1.1rem;">
            <i class="bi bi-vr me-1"></i> Opción B: Instalar en Meta Quest (APK)
          </h4>
          <ol style="font-size: 0.88rem; color: var(--text-muted); margin-left: 18px; line-height: 1.6;">
            <li>Activa el <em>Developer Mode</em> en la app Meta Quest.</li>
            <li>Conecta las gafas a la PC mediante cable USB.</li>
            <li>Ejecuta el comando de instalación en terminal:</li>
          </ol>
          <div style="background: #000; padding: 10px; border-radius: 6px; font-family: var(--font-code); font-size: 0.78rem; color: var(--accent-cyan);">
            adb install Experiencia_VR-main/Metaquest.apk
          </div>
        </div>
      </div>
    `
  },

  // SLIDE 14
  {
    id: 14,
    category: "Módulo 4: Evaluación Interactiva",
    title: "Trivia Interactiva de Aprendizaje",
    subtitle: "¡Pon a prueba lo aprendido sobre el proyecto y Godot!",
    audioES: "Responde este cuestionario interactivo para poner a prueba tus conocimientos sobre la Ciénaga de Mallorquín y el proyecto.",
    audioEN: "Answer this interactive quiz to test your knowledge about Cienaga de Mallorquin and the project.",
    speakerNotes: "Evaluación interactiva para consolidar lo aprendido en la presentación.",
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
