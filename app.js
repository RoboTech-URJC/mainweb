const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const languageStorageKey = "robotech-v8-language";
const savedLanguage = localStorage.getItem(languageStorageKey) || "es";
const supportedLanguages = ["es", "en", "it", "zh", "de", "fr"];
const translationTargets = { en: "en", it: "it", zh: "zh-CN", de: "de", fr: "fr" };
let currentLanguage = supportedLanguages.includes(savedLanguage) ? savedLanguage : "es";
const originalText = new WeakMap();
const originalAttributes = new WeakMap();
const translatableAttributes = ["aria-label", "alt", "placeholder", "value", "content"];
let autoTranslationCache = {};

try {
  autoTranslationCache = JSON.parse(localStorage.getItem("robotech-v8-auto-translations") || "{}");
} catch {
  autoTranslationCache = {};
}

const englishTranslations = {
  titles: {
    "Robotech URJC | Robótica universitaria": "Robotech URJC | University robotics",
    "Quiénes somos | Robotech URJC": "About us | Robotech URJC",
    "Proyectos | Robotech URJC": "Projects | Robotech URJC",
    "Talleres | Robotech URJC": "Workshops | Robotech URJC",
    "Colabora | Robotech URJC": "Collaborate | Robotech URJC",
    "Contacto | Robotech URJC": "Contact | Robotech URJC",
    "Linux y setup | Robotech URJC": "Linux and setup | Robotech URJC",
    "Shell | Robotech URJC": "Shell | Robotech URJC",
    "Git y GitHub | Robotech URJC": "Git and GitHub | Robotech URJC",
    "Fabricación | Robotech URJC": "Fabrication | Robotech URJC"
  },
  text: {
    "Saltar al contenido": "Skip to content",
    "Ciencia, tecnología y robótica": "Science, technology and robotics",
    "Talleres": "Workshops",
    "Quiénes somos": "About us",
    "Proyectos": "Projects",
    "Colaboracion": "Collaboration",
    "Contacto": "Contact",
    "Inicio": "Home",
    "Colabora": "Collaborate",
    "Idioma": "Language",
    "Apoyar": "Support",
    "Universidad Rey Juan Carlos · Campus de Fuenlabrada": "Rey Juan Carlos University · Fuenlabrada Campus",
    "El futuro no se estudia, se construye.": "The future is not studied, it is built.",
    "Robotech URJC reúne a estudiantes que quieren aprender robótica, electrónica, programación, fabricación digital y visión artificial mediante proyectos reales y abiertos.": "Robotech URJC brings together students who want to learn robotics, electronics, programming, digital fabrication and computer vision through real, open projects.",
    "Explorar proyectos": "Explore projects",
    "Ver talleres": "See workshops",
    "Abierto": "Open",
    "Proyectos y documentación compartida": "Shared projects and documentation",
    "Práctico": "Practical",
    "Montaje, pruebas y aprendizaje en taller": "Assembly, testing and workshop learning",
    "Proyectos reales": "Real projects",
    "Robots, drones, juegos electrónicos y visión artificial.": "Robots, drones, electronic games and computer vision.",
    "Talleres prácticos": "Practical workshops",
    "Linux, shell, Git, impresion 3D y fundamentos técnicos.": "Linux, shell, Git, 3D printing and technical foundations.",
    "Comunidad técnica": "Technical community",
    "Mentoría entre estudiantes y colaboración abierta.": "Peer mentoring and open collaboration.",
    "Campus Fuenlabrada": "Fuenlabrada Campus",
    "Nos encontramos en el sótano del Aulario I.": "You can find us in the basement of Aulario I.",
    "Un laboratorio universitario gestionado por estudiantes.": "A university lab run by students.",
    "Aprender más allá del grado": "Learning beyond the degree",
    "La asociación nació para cubrir el espacio entre la teoría y el prototipo funcional: planteamos problemás, repartimos tareas, documentamos avances y convertimos los fallos en aprendizaje útil para el siguiente equipo.": "The association was created to bridge the gap between theory and working prototypes: we define problems, split tasks, document progress and turn mistakes into useful learning for the next team.",
    "Puedes entrar con experiencia o desde cero. Lo importante es tener curiosidad técnica, ganas de trabajar y respeto por el conocimiento compartido.": "You can join with experience or from scratch. What matters is technical curiosity, willingness to work and respect for shared knowledge.",
    "Áreas de trabajo": "Work areas",
    "Donde se cruzan hardware, software y comunidad.": "Where hardware, software and community meet.",
    "Robótica": "Robotics",
    "Brazos robóticos, robots móviles, sensores, actuadores, control y pruebas físicas.": "Robotic arms, mobile robots, sensors, actuators, control and physical testing.",
    "Software": "Software",
    "Python, Arduino, ROS, OpenCV, herramientas internas y documentación técnica.": "Python, Arduino, ROS, OpenCV, internal tools and technical documentation.",
    "Fabricacion": "Fabrication",
    "Modelado, impresion 3D, montaje, iteracion de piezas y mantenimiento del taller.": "Modeling, 3D printing, assembly, part iteration and workshop maintenance.",
    "Proyectos destacados": "Featured projects",
    "Prototipos que ya estan en marcha.": "Prototypes already in motion.",
    "Ver todos los proyectos": "See all projects",
    "Humanoide": "Humanoid",
    "Manos robóticas open-source con Arduino, Python y visión artificial.": "Open-source robotic hands with Arduino, Python and computer vision.",
    "Manipulación": "Manipulation",
    "Brazo SCARA para movimientos repetibles, control y automatización.": "SCARA arm for repeatable motion, control and automation.",
    "Aéreo": "Aerial",
    "Plataforma RC modular para pruebas de vuelo y misiones programadas.": "Modular RC platform for flight tests and programmed missions.",
    "Participa": "Join in",
    "Trae una idea, un problema o simplemente ganas de aprender.": "Bring an idea, a problem or just the will to learn.",
    "La forma más rápida de entrar es escribirnos o pasarte por el espacio de la asociación en el Campus de Fuenlabrada.": "The fastest way to join is to write to us or stop by the association space on the Fuenlabrada Campus.",
    "Contactar": "Contact us",
    "Asociación de ciencia, tecnología y robótica de la Universidad Rey Juan Carlos.": "Science, technology and robotics association at Rey Juan Carlos University.",
    "Asociación de ciencia, tecnología y robótica.": "Science, technology and robotics association.",
    "Un taller universitario para aprender construyendo.": "A university workshop for learning by building.",
    "Robotech URJC es una asociación de estudiantes de la Universidad Rey Juan Carlos centrada en robótica, electrónica, software y fabricación digital.": "Robotech URJC is a student association at Rey Juan Carlos University focused on robotics, electronics, software and digital fabrication.",
    "Ver proyectos": "See projects",
    "Aprendemos con prototipos, pruebas y errores reales.": "We learn with prototypes, tests and real mistakes.",
    "Documentamos proyectos y compartimos repositorios.": "We document projects and share repositories.",
    "Comunidad": "Community",
    "Mentoria entre estudiantes y equipos de trabajo.": "Peer mentoring and work teams.",
    "Nuestra forma de trabajar": "How we work",
    "De la idea al prototipo, sin quedarse solo en teoría.": "From idea to prototype, without staying only in theory.",
    "La asociación existe para cubrir el espacio entre clase y proyecto funcional: planteamos objetivos pequeños, repartimos tareas, probamos piezas, versionamos código y documentamos lo que funciona.": "The association exists to bridge the gap between class and working project: we define small goals, split tasks, test parts, version code and document what works.",
    "Puede entrar gente con experiencia o desde cero. Lo importante es tener curiosidad técnica, respeto por el trabajo compartido y ganas de aprender con otras personas.": "People can join with experience or from scratch. What matters is technical curiosity, respect for shared work and the will to learn with others.",
    "Conoce el local": "Visit the space",
    "Un vistazo al espacio donde trabajamos.": "A look at the space where we work.",
    "Brazos, robots móviles, sensores, actuadores y control.": "Arms, mobile robots, sensors, actuators and control.",
    "Python, Arduino, ROS, OpenCV, herramientas internas y documentación.": "Python, Arduino, ROS, OpenCV, internal tools and documentation.",
    "Diseno, impresion 3D, montaje, iteracion de piezas y mantenimiento.": "Design, 3D printing, assembly, part iteration and maintenance.",
    "Donde estamos": "Where we are",
    "Campus de Fuenlabrada, sótano del Aulario I.": "Fuenlabrada Campus, basement of Aulario I.",
    "Si quieres entrar, lo más rápido es escribirnos o venir a una sesión. En Discord solemos publicar avisos, talleres y conversaciones de proyectos.": "If you want to join, the fastest path is to write to us or come to a session. On Discord we usually post announcements, workshops and project discussions.",
    "Prototipos, código y pruebas reales.": "Prototypes, code and real tests.",
    "Una vista rápida de lo que está en marcha y de proyectos históricos que siguen sirviendo como referencia para nuevos equipos.": "A quick view of what is in progress and historic projects that still serve as references for new teams.",
    "proyectos activos": "active projects",
    "proyectos archivados": "archived projects",
    "áreas técnicas": "technical areas",
    "Todos": "All",
    "Electrónica": "Electronics",
    "Antiguos": "Older",
    "Activo": "Active",
    "Archivo": "Archive",
    "Repositorio": "Repository",
    "Brazo robótico para operaciones complejas, manipulación de objetos, repetición de movimientos y experimentos de automatización.": "Robotic arm for complex operations, object manipulation, repeated movements and automation experiments.",
    "Robot humanoide open-source basado en InMoov. Incluye manos, antebrazos, control con Arduino y visión artificial con Python y OpenCV.": "Open-source humanoid robot based on InMoov. It includes hands, forearms, Arduino control and computer vision with Python and OpenCV.",
    "Educativo": "Educational",
    "Robot tipo tanque para aprender programación y robótica con sensores, motores, servos y una librería propia para Arduino.": "Tank-style robot for learning programming and robotics with sensors, motors, servos and its own Arduino library.",
    "Biomecánica": "Biomechanics",
    "Exploración de locomoción y diseño mecánico inspirado en insectos para estudiar movimiento y control.": "Exploration of locomotion and insect-inspired mechanical design to study movement and control.",
    "Autonomía": "Autonomy",
    "Dron RC de desarrollo modular para control manual, integración con Raspberry Pi y misiones programadas.": "Modular RC drone for manual control, Raspberry Pi integration and programmed missions.",
    "Juego competitivo con tiras NeoPixel y pulsadores para practicar soldadura, firmware y montaje.": "Competitive game with NeoPixel strips and push buttons for practicing soldering, firmware and assembly.",
    "Juego electrónico para practicar lógica digital, montaje y programación mediante mecanicas sencillas y componentes accesibles.": "Electronic game for practicing digital logic, assembly and programming through simple mechanics and accessible components.",
    "Antiguo": "Archived",
    "Flota de robots impresos en 3D y programados en ROS, pensada para comunicarse entre unidades y realizar varias misiones.": "Fleet of 3D-printed robots programmed in ROS, designed to communicate between units and carry out several missions.",
    "Servidor de red para alojar y probar proyectos en la nube. El proyecto se conserva como referencia aunque ya no está en servicio.": "Network server for hosting and testing cloud projects. The project is kept as a reference even though it is no longer in service.",
    "Proyecto histórico de Robotech conservado en el archivo de la asociación.": "Historic Robotech project kept in the association archive.",
    "Proponer proyecto": "Propose a project",
    "Si tienes una idea, podemos convertirla en un plan técnico.": "If you have an idea, we can turn it into a technical plan.",
    "Define objetivo, materiales, riesgos y primer prototipo. El equipo puede ayudarte a aterrizarlo.": "Define the goal, materials, risks and first prototype. The team can help you make it concrete.",
    "Proponer idea": "Propose an idea",
    "Formacion practica": "Practical training",
    "Talleres para entrar rápido en proyectos técnicos.": "Workshops to quickly enter technical projects.",
    "El objetivo no es memorizar herramientas, sino poder usarlas con criterio en un proyecto real.": "The goal is not to memorize tools, but to use them thoughtfully in a real project.",
    "Linux y setup": "Linux and setup",
    "Preparar el entorno": "Prepare the environment",
    "Instalacion, terminal, estructura de archivos, permisos y herramientas básicas para trabajar sin friccion.": "Installation, terminal, file structure, permissions and basic tools for working without friction.",
    "Saber más": "Learn more",
    "Trabajar desde consola": "Work from the console",
    "Navegación, scripts sencillos, automatización de tareas y comandos útiles para proyectos de ingenieria.": "Navigation, simple scripts, task automation and useful commands for engineering projects.",
    "Colaborar sin pisarse": "Collaborate without conflicts",
    "Ramás, commits, pull requests, issues y buenas prácticas para documentar avances.": "Branches, commits, pull requests, issues and good practices for documenting progress.",
    "Del CAD al prototipo": "From CAD to prototype",
    "Diseno imprimible, iteracion de piezas, montaje y diagnóstico de fallos mecánicos.": "Printable design, part iteration, assembly and mechanical fault diagnosis.",
    "Nivel 0": "Level 0",
    "Acogida": "Onboarding",
    "Para estudiantes que empiezan y quieren entender como moverse por el taller y los repositorios.": "For students who are starting and want to understand how to move around the workshop and repositories.",
    "Nivel 1": "Level 1",
    "Proyecto guiado": "Guided project",
    "Pequenas tareas con objetivos medibles: cablear, programar, documentar o probar una pieza.": "Small tasks with measurable goals: wiring, programming, documenting or testing a part.",
    "Nivel 2": "Level 2",
    "Equipo autónomo": "Autonomous team",
    "Participacion estable en un proyecto activo con revisiones y responsabilidad técnica.": "Stable participation in an active project with reviews and technical responsibility.",
    "Inscripción": "Registration",
    "Pregunta por el próximo taller o entra al Discord.": "Ask about the next workshop or join Discord.",
    "Publicamos convocatorias y materiales para que puedas prepararte antes de venir.": "We publish calls and materials so you can prepare before coming.",
    "Entrar a Discord": "Join Discord",
    "Ver materiales": "See materials",
    "Talleres y aprendizaje práctico.": "Workshops and practical learning.",
    "Entorno de trabajo": "Work environment",
    "Prepara un entorno cómodo para moverte por terminal, instalar herramientas y trabajar en proyectos técnicos sin fricción.": "Set up a comfortable environment to use the terminal, install tools and work on technical projects without friction.",
    "Preguntar por fechas": "Ask about dates",
    "Volver a talleres": "Back to workshops",
    "Duración": "Duration",
    "Nivel": "Level",
    "Formato": "Format",
    "workshop.level.beginner": "Beginner",
    "Guiado": "Guided",
    "Qué se trabaja": "What you will work on",
    "La base para no perder tiempo peleándote con el equipo.": "The foundation for not wasting time fighting your computer.",
    "Estructura de archivos, rutas y permisos.": "File structure, paths and permissions.",
    "Instalación de paquetes y herramientas habituales.": "Installing packages and common tools.",
    "Uso básico de terminal para moverse y diagnosticar errores.": "Basic terminal use for moving around and diagnosing errors.",
    "Preparación del entorno para proyectos con código y hardware.": "Environment setup for code and hardware projects.",
    "Siguiente paso": "Next step",
    "Ven con portátil y ganas de probar cosas.": "Bring a laptop and a willingness to try things.",
    "Los talleres están pensados para salir con algo funcionando y poder aplicarlo en proyectos reales.": "The workshops are designed so you leave with something working and can apply it to real projects.",
    "Ver todos los talleres": "See all workshops",
    "Automatización básica": "Basic automation",
    "Aprende comandos y pequeños scripts para repetir tareas, ordenar archivos y preparar flujos de trabajo técnicos.": "Learn commands and small scripts to repeat tasks, organize files and prepare technical workflows.",
    "Práctico": "Practical",
    "Consola útil para trabajar más rápido y entender qué está pasando.": "A useful console for working faster and understanding what is happening.",
    "Navegación, búsqueda y edición rápida desde terminal.": "Navigation, search and quick editing from the terminal.",
    "Pipes, redirecciones y composición de comandos.": "Pipes, redirections and command composition.",
    "Scripts sencillos para automatizar tareas repetidas.": "Simple scripts to automate repeated tasks.",
    "Buenas prácticas para no romper el entorno de trabajo.": "Good practices to avoid breaking the work environment.",
    "Trabajo en equipo": "Teamwork",
    "Controla cambios, ramás y revisiones para colaborar en proyectos sin pisar el trabajo de otras personas.": "Control changes, branches and reviews to collaborate on projects without overwriting other people's work.",
    "Básico": "Basic",
    "Equipo": "Team",
    "La herramienta mínima para colaborar con orden.": "The minimum tool for orderly collaboration.",
    "Commits claros y ramás de trabajo.": "Clear commits and working branches.",
    "Pull requests, issues y revisión de cambios.": "Pull requests, issues and change reviews.",
    "Resolución básica de conflictos.": "Basic conflict resolution.",
    "Documentación de avances en repositorios compartidos.": "Documenting progress in shared repositories.",
    "Prototipado": "Prototyping",
    "Fabricación": "Fabrication",
    "Del diseño a la pieza: prepara modelos, imprime, monta y aprende a iterar cuando algo no encaja a la primera.": "From design to part: prepare models, print, assemble and learn to iterate when something does not fit the first time.",
    "Taller": "Workshop",
    "Prototipos físicos con criterio y revisión rápida.": "Physical prototypes with clear criteria and fast review.",
    "Diseño imprimible y preparación de piezas.": "Printable design and part preparation.",
    "Ajustes básicos de impresión 3D.": "Basic 3D printing settings.",
    "Montaje, tolerancias y diagnóstico mecánico.": "Assembly, tolerances and mechanical diagnosis.",
    "Iteración de prototipos a partir de pruebas reales.": "Prototype iteration from real tests.",
    "Partners y patrocinadores": "Partners and sponsors",
    "Ayuda a que más estudiantes construyan tecnología real.": "Help more students build real technology.",
    "Buscamos colaboraciones técnicas, donación de material, mentoría, retos aplicados y apoyo económico para proyectos, talleres y demostraciones.": "We are looking for technical collaborations, material donations, mentoring, applied challenges and financial support for projects, workshops and demos.",
    "Material y herramientas": "Materials and tools",
    "Componentes, sensores, placas, filamento, herramientas o equipos que puedan tener segunda vida en el taller.": "Components, sensors, boards, filament, tools or equipment that can have a second life in the workshop.",
    "Mentoria técnica": "Technical mentoring",
    "Charlas, revisiones de arquitectura, sesiónes de CAD, electrónica, visión artificial o control.": "Talks, architecture reviews, CAD sessions, electronics, computer vision or control.",
    "Retos y patrocinio": "Challenges and sponsorship",
    "Proponer un reto real, financiar materiales o apoyar la participación en eventos y competiciones.": "Propose a real challenge, fund materials or support participation in events and competitions.",
    "Que obtiene el colaborador": "What collaborators get",
    "Visibilidad, contacto con talento y proyectos documentados.": "Visibility, contact with talent and documented projects.",
    "Colaboracion con impacto concreto": "Collaboration with concrete impact",
    "Podemos incluir presencia de marca en materiales, menciones en redes, demostraciones públicas y documentación del uso del material o apoyo recibido.": "We can include brand presence in materials, social media mentions, public demos and documentation of how the material or support was used.",
    "Tambien podemos trabajar con retos acotados para que el resultado sea evaluable: prototipo, informe, repositorio, demo o taller impartido.": "We can also work on scoped challenges so the outcome can be evaluated: prototype, report, repository, demo or delivered workshop.",
    "Solicitar propuesta": "Request a proposal",
    "Escribir email": "Write an email",
    "Colaboradores": "Collaborators",
    "Una red que puede crecer con el proyecto.": "A network that can grow with the project.",
    "Colaborador vinculado a material tecnologico y apoyo a la comunidad.": "Collaborator linked to technology material and community support.",
    "Tu empresa": "Your company",
    "Propón un reto": "Propose a challenge",
    "Diseñamos una colaboración alrededor de una necesidad técnica concreta.": "We design a collaboration around a specific technical need.",
    "Apoyo abierto": "Open support",
    "Mentoria, materiales, charlas y difusion también hacen avanzar los proyectos.": "Mentoring, materials, talks and outreach also move projects forward.",
    "Colaboraciones técnicas y patrocinio.": "Technical collaborations and sponsorship.",
    "Cuéntanos qué quieres construir, aprender o proponer.": "Tell us what you want to build, learn or propose.",
    "Responderemos por email. También puedes encontrarnos en redes o pasarte por el sótano del Aulario I del Campus de Fuenlabrada.": "We will reply by email. You can also find us on social networks or stop by the basement of Aulario I on the Fuenlabrada Campus.",
    "Repositorios públicos y proyectos abiertos.": "Public repositories and open projects.",
    "Actividad, talleres y demostraciones.": "Activity, workshops and demos.",
    "Perfil institucional y colaboraciones.": "Institutional profile and collaborations.",
    "Formulario rápido": "Quick form",
    "Prepara un email con los datos clave.": "Prepare an email with the key details.",
    "Este formulario no envía datos a un servidor; abre tu cliente de correo con el mensaje ya preparado.": "This form does not send data to a server; it opens your email client with the message already prepared.",
    "Nombre": "Name",
    "Tipo de contacto": "Contact type",
    "Quiero unirme": "I want to join",
    "Propongo un proyecto": "I am proposing a project",
    "Colaboración o patrocinio": "Collaboration or sponsorship",
    "Consulta general": "General question",
    "Asunto": "Subject",
    "Contacto desde la web v8": "Contact from website v8",
    "Mensaje": "Message",
    "Preparar email": "Prepare email",
    "Para dudas rápidas, Discord suele ser el mejor punto de entrada.": "For quick questions, Discord is usually the best entry point.",
    "Allí publicamos avisos, talleres y conversaciones de proyectos.": "We post announcements, workshops and project conversations there.",
    "Campus de Fuenlabrada, Universidad Rey Juan Carlos.": "Fuenlabrada Campus, Rey Juan Carlos University.",
    "Café": "Coffee",
    "BIT necesita cafeína": "BIT needs caffeine",
    "¿Me invitas a un café?": "Will you buy me a coffee?",
    "Prometo invertirlo bien: componentes, herramientas, reparaciones del taller y material para preparar más actividades para estudiantes.": "I promise to put it to good use: components, tools, workshop repairs and material to prepare more student activities.",
    "Invitar a un café": "Buy a coffee",
    "Ahora no": "Not now",
    "Debug donar": "Debug donate",
    "A BIT of help?": "A BIT of help?",
    "Habla con BIT": "Talk to BIT",
    "Puedes empezar mirando proyectos, viniendo a un taller o escribiéndonos para pasarte por el local.": "You can start by looking at projects, coming to a workshop or writing to us to visit the space.",
    "¿Qué proyectos hay?": "What projects are there?",
    "¿Por dónde empiezo?": "Where do I start?",
    "¿Cómo me uno?": "How do I join?",
    "En proyectos hay robots, drones, electrónica y visión artificial. Si estás empezando, mira uno que ya tenga equipo activo.": "Projects include robots, drones, electronics and computer vision. If you are starting out, look for one that already has an active team.",
    "Los talleres cortos son la forma más fácil de entrar: Linux, shell, Git, impresión 3D y bases de electrónica.": "Short workshops are the easiest way in: Linux, shell, Git, 3D printing and electronics basics.",
    "No hace falta venir con experiencia. Escríbenos o pásate por el sótano del Aulario I en Fuenlabrada.": "You do not need prior experience. Write to us or stop by the basement of Aulario I in Fuenlabrada."
  },
  attrs: {
    "Robotech URJC, asociación universitaria de ciencia, tecnología y robótica.": "Robotech URJC, university science, technology and robotics association.",
    "Quiénes somos en Robotech URJC.": "About Robotech URJC.",
    "Proyectos activos de Robotech URJC.": "Active projects at Robotech URJC.",
    "Talleres de Robotech URJC.": "Robotech URJC workshops.",
    "Colabora con Robotech URJC.": "Collaborate with Robotech URJC.",
    "Contacto de Robotech URJC.": "Contact Robotech URJC.",
    "Linux y setup de Robotech URJC.": "Linux and setup at Robotech URJC.",
    "Shell de Robotech URJC.": "Shell at Robotech URJC.",
    "Git y GitHub de Robotech URJC.": "Git and GitHub at Robotech URJC.",
    "Fabricación de Robotech URJC.": "Fabrication at Robotech URJC.",
    "Abrir menú": "Open menu",
    "Navegación principal": "Main navigation",
    "Cambiar entre modo claro y oscuro": "Switch between light and dark mode",
    "Cambiar idioma": "Change language",
    "Cambiar idioma entre español e inglés": "Switch language between Spanish and English",
    "Imagen del taller de Robotech": "Image of the Robotech workshop",
    "Equipo y espacio de trabajo de Robotech URJC": "Robotech URJC team and workspace",
    "Resumen": "Summary",
    "Espacio de trabajo de Robotech URJC": "Robotech URJC workspace",
    "Resumen de Robotech": "Robotech summary",
    "Vista del local de Robotech": "View of the Robotech space",
    "Mover vista a la izquierda": "Move view left",
    "Mover vista a la derecha": "Move view right",
    "Resumen de proyectos": "Project summary",
    "Filtrar proyectos": "Filter projects",
    "Mesa de trabajo de Robotech": "Robotech workbench",
    "Equipo servidor y red": "Server and network equipment",
    "Reto técnico de Robotech": "Robotech technical challenge",
    "Reto técnico de Robotech": "Robotech technical challenge",
    "Montaje electrónico de taller": "Workshop electronics assembly",
    "Montaje electrónico de taller": "Workshop electronics assembly",
    "Datos del taller": "Workshop details",
    "Equipo de servidor y red": "Server and network equipment",
    "Invitar a BIT a un café": "Buy BIT a coffee",
    "Cerrar": "Close",
    "BIT, mascota de Robotech, con un café": "BIT, Robotech mascot, with a coffee",
    "Chat con BIT": "Chat with BIT",
    "Cerrar chat": "Close chat",
    "Preguntas rápidas": "Quick questions",
    "Abrir chat con BIT": "Open chat with BIT",
    "Mascota de Robotech": "Robotech máscot",
    "Cuéntanos el contexto, objetivo y cualquier enlace útil.": "Tell us the context, goal and any useful link."
  }
};

const assistantAnswerTranslations = {
  es: {
    start: "Puedes empezar mirando proyectos, viniendo a un taller o escribiéndonos para pasarte por el local.",
    projects: "En proyectos hay robots, drones, electrónica y visión artificial. Si estás empezando, mira uno que ya tenga equipo activo.",
    workshops: "Los talleres cortos son la forma más fácil de entrar: Linux, shell, Git, impresión 3D y bases de electrónica.",
    join: "No hace falta venir con experiencia. Escríbenos o pásate por el sótano del Aulario I en Fuenlabrada."
  },
  en: {
    start: "You can start by looking at projects, coming to a workshop or writing to us to visit the space.",
    projects: "Projects include robots, drones, electronics and computer vision. If you are starting out, look for one that already has an active team.",
    workshops: "Short workshops are the easiest way in: Linux, shell, Git, 3D printing and electronics basics.",
    join: "You do not need prior experience. Write to us or stop by the basement of Aulario I in Fuenlabrada."
  },
  it: {
    start: "Puoi iniziare guardando i progetti, venendo a un workshop o scrivendoci per passare dal laboratorio.",
    projects: "Nei progetti ci sono robot, droni, elettronica e visione artificiale. Se stai iniziando, guarda un progetto con un team gia attivo.",
    workshops: "I workshop brevi sono il modo piu semplice per entrare: Linux, shell, Git, stampa 3D e basi di elettronica.",
    join: "Non serve arrivare con esperienza. Scrivici o passa dal seminterrato dell'Aulario I a Fuenlabrada."
  },
  zh: {
    start: "你可以先看看项目，参加一次工作坊，或者联系我们来参观活动空间。",
    projects: "项目包括机器人、无人机、电子和计算机视觉。如果你刚开始，建议选择已有活跃团队的项目。",
    workshops: "短工作坊是最容易入门的方式：Linux、Shell、Git、3D 打印和电子基础。",
    join: "不需要已有经验。给我们写信，或来 Fuenlabrada 校区 Aulario I 地下一层找我们。"
  },
  de: {
    start: "Du kannst mit den Projekten anfangen, zu einem Workshop kommen oder uns schreiben, um den Raum zu besuchen.",
    projects: "In den Projekten gibt es Roboter, Drohnen, Elektronik und Computer Vision. Wenn du neu bist, schau dir ein Projekt mit aktivem Team an.",
    workshops: "Kurze Workshops sind der einfachste Einstieg: Linux, Shell, Git, 3D-Druck und Elektronikgrundlagen.",
    join: "Du brauchst keine Vorerfahrung. Schreib uns oder komm im Untergeschoss des Aulario I in Fuenlabrada vorbei."
  },
  fr: {
    start: "Tu peux commencer par regarder les projets, venir a un atelier ou nous ecrire pour passer au local.",
    projects: "Les projets incluent des robots, des drones, de l'electronique et de la vision artificielle. Si tu debutes, choisis un projet avec une equipe active.",
    workshops: "Les ateliers courts sont le moyen le plus simple d'entrer: Linux, shell, Git, impression 3D et bases d'electronique.",
    join: "Aucune experience n'est necessaire. Ecris-nous ou passe au sous-sol de l'Aulario I a Fuenlabrada."
  }
};

const translations = {
  en: englishTranslations,
  it: {
    titles: {
      "Robotech URJC | Robótica universitaria": "Robotech URJC | Robótica universitaria",
      "Quiénes somos | Robotech URJC": "Chi siamo | Robotech URJC",
      "Proyectos | Robotech URJC": "Progetti | Robotech URJC",
      "Talleres | Robotech URJC": "Workshop | Robotech URJC",
      "Colabora | Robotech URJC": "Collabora | Robotech URJC",
      "Contacto | Robotech URJC": "Contatto | Robotech URJC",
      "Linux y setup | Robotech URJC": "Linux e setup | Robotech URJC",
      "Shell | Robotech URJC": "Shell | Robotech URJC",
      "Git y GitHub | Robotech URJC": "Git e GitHub | Robotech URJC",
      "Fabricación | Robotech URJC": "Fabbricazione | Robotech URJC"
    },
    text: {
      "Saltar al contenido": "Salta al contenuto",
      "Inicio": "Home",
      "Quiénes somos": "Chi siamo",
      "Proyectos": "Progetti",
      "Talleres": "Workshop",
      "Colabora": "Collabora",
      "Contacto": "Contatto",
      "Apoyar": "Sostieni",
      "Ciencia, tecnología y robótica": "Scienza, tecnología e robótica",
      "Universidad Rey Juan Carlos · Campus de Fuenlabrada": "Universita Rey Juan Carlos · Campus di Fuenlabrada",
      "El futuro no se estudia, se construye.": "Il futuro non si studia, si costruisce.",
      "Robotech URJC reúne a estudiantes que quieren aprender robótica, electrónica, programación, fabricación digital y visión artificial mediante proyectos reales y abiertos.": "Robotech URJC riunisce studenti che vogliono imparare robótica, elettronica, programmazione, fabbricazione digitale e visione artificiale attraverso progetti reali e aperti.",
      "Explorar proyectos": "Esplora i progetti",
      "Ver talleres": "Vedi workshop",
      "Abierto": "Aperto",
      "Proyectos y documentación compartida": "Progetti e documentazione condivisa",
      "Práctico": "Pratico",
      "Montaje, pruebas y aprendizaje en taller": "Assemblaggio, prove e apprendimento in laboratorio",
      "Proyectos reales": "Progetti reali",
      "Robots, drones, juegos electrónicos y visión artificial.": "Robot, droni, giochi elettronici e visione artificiale.",
      "Talleres prácticos": "Workshop pratici",
      "Linux, shell, Git, impresion 3D y fundamentos técnicos.": "Linux, shell, Git, stampa 3D e basi tecniche.",
      "Comunidad técnica": "Comunita técnica",
      "Mentoría entre estudiantes y colaboración abierta.": "Mentoring tra studenti e collaborazione aperta.",
      "Campus Fuenlabrada": "Campus di Fuenlabrada",
      "Nos encontramos en el sótano del Aulario I.": "Ci trovi nel seminterrato dell'Aulario I.",
      "Un laboratorio universitario gestionado por estudiantes.": "Un laboratorio universitario gestito da studenti.",
      "Robótica": "Robótica",
      "Fabricacion": "Fabbricazione",
      "Proyectos destacados": "Progetti in evidenza",
      "Participa": "Partecipa",
      "Contactar": "Contattaci",
      "Ver proyectos": "Vedi progetti",
      "Repositorio": "Repository",
      "Todos": "Tutti",
      "Electrónica": "Elettronica",
      "Activo": "Attivo",
      "Archivo": "Archivio",
      "Formacion practica": "Formazione pratica",
      "Saber más": "Scopri di piu",
      "Preguntar por fechas": "Chiedi le date",
      "Volver a talleres": "Torna ai workshop",
      "Duración": "Durata",
      "Nivel": "Livello",
      "Formato": "Formato",
      "workshop.level.beginner": "Iniziale",
      "Preparar email": "Prepara email"
    },
    attrs: {
      "Abrir menú": "Apri menu",
      "Navegación principal": "Navigazione principale",
      "Cambiar idioma": "Cambia lingua",
      "Cambiar entre modo claro y oscuro": "Cambia tra modalita chiara e scura",
      "Imagen del taller de Robotech": "Immagine del laboratorio Robotech",
      "Equipo y espacio de trabajo de Robotech URJC": "Team e spazio di lavoro di Robotech URJC"
    }
  },
  zh: {
    titles: {
      "Robotech URJC | Robótica universitaria": "Robotech URJC | 大学机器人",
      "Quiénes somos | Robotech URJC": "关于我们 | Robotech URJC",
      "Proyectos | Robotech URJC": "项目 | Robotech URJC",
      "Talleres | Robotech URJC": "工作坊 | Robotech URJC",
      "Colabora | Robotech URJC": "合作 | Robotech URJC",
      "Contacto | Robotech URJC": "联系 | Robotech URJC",
      "Linux y setup | Robotech URJC": "Linux 与环境配置 | Robotech URJC",
      "Shell | Robotech URJC": "Shell | Robotech URJC",
      "Git y GitHub | Robotech URJC": "Git 与 GitHub | Robotech URJC",
      "Fabricación | Robotech URJC": "制造 | Robotech URJC"
    },
    text: {
      "Saltar al contenido": "跳到内容",
      "Inicio": "首页",
      "Quiénes somos": "关于我们",
      "Proyectos": "项目",
      "Talleres": "工作坊",
      "Colabora": "合作",
      "Contacto": "联系",
      "Apoyar": "支持",
      "Ciencia, tecnología y robótica": "科学、技术与机器人",
      "Universidad Rey Juan Carlos · Campus de Fuenlabrada": "胡安卡洛斯国王大学 · Fuenlabrada 校区",
      "El futuro no se estudia, se construye.": "未来不是学出来的，而是建造出来的。",
      "Robotech URJC reúne a estudiantes que quieren aprender robótica, electrónica, programación, fabricación digital y visión artificial mediante proyectos reales y abiertos.": "Robotech URJC 汇集希望通过真实开放项目学习机器人、电子、编程、数字制造和计算机视觉的学生。",
      "Explorar proyectos": "浏览项目",
      "Ver talleres": "查看工作坊",
      "Abierto": "开放",
      "Proyectos y documentación compartida": "共享项目与文档",
      "Práctico": "实践",
      "Montaje, pruebas y aprendizaje en taller": "装配、测试和工作坊学习",
      "Proyectos reales": "真实项目",
      "Robots, drones, juegos electrónicos y visión artificial.": "机器人、无人机、电子游戏和计算机视觉。",
      "Talleres prácticos": "实践工作坊",
      "Linux, shell, Git, impresion 3D y fundamentos técnicos.": "Linux、Shell、Git、3D 打印和技术基础。",
      "Comunidad técnica": "技术社区",
      "Mentoría entre estudiantes y colaboración abierta.": "学生互助指导与开放协作。",
      "Campus Fuenlabrada": "Fuenlabrada 校区",
      "Nos encontramos en el sótano del Aulario I.": "我们在 Aulario I 地下一层。",
      "Un laboratorio universitario gestionado por estudiantes.": "一个由学生管理的大学实验室。",
      "Robótica": "机器人",
      "Software": "软件",
      "Fabricacion": "制造",
      "Proyectos destacados": "精选项目",
      "Participa": "参与",
      "Contactar": "联系我们",
      "Ver proyectos": "查看项目",
      "Repositorio": "代码仓库",
      "Todos": "全部",
      "Electrónica": "电子",
      "Activo": "进行中",
      "Archivo": "归档",
      "Formacion practica": "实践培训",
      "Saber más": "了解更多",
      "Preguntar por fechas": "询问日期",
      "Volver a talleres": "返回工作坊",
      "Duración": "时长",
      "Nivel": "级别",
      "Formato": "形式",
      "workshop.level.beginner": "入门",
      "Preparar email": "准备邮件"
    },
    attrs: {
      "Abrir menú": "打开菜单",
      "Navegación principal": "主导航",
      "Cambiar idioma": "切换语言",
      "Cambiar entre modo claro y oscuro": "切换浅色和深色模式",
      "Imagen del taller de Robotech": "Robotech 工作坊图片",
      "Equipo y espacio de trabajo de Robotech URJC": "Robotech URJC 团队和工作空间"
    }
  },
  de: {
    titles: {
      "Robotech URJC | Robótica universitaria": "Robotech URJC | Universitaetsrobotik",
      "Quiénes somos | Robotech URJC": "Ueber uns | Robotech URJC",
      "Proyectos | Robotech URJC": "Projekte | Robotech URJC",
      "Talleres | Robotech URJC": "Workshops | Robotech URJC",
      "Colabora | Robotech URJC": "Mitmachen | Robotech URJC",
      "Contacto | Robotech URJC": "Kontakt | Robotech URJC",
      "Linux y setup | Robotech URJC": "Linux und Setup | Robotech URJC",
      "Shell | Robotech URJC": "Shell | Robotech URJC",
      "Git y GitHub | Robotech URJC": "Git und GitHub | Robotech URJC",
      "Fabricación | Robotech URJC": "Fertigung | Robotech URJC"
    },
    text: {
      "Saltar al contenido": "Zum Inhalt springen",
      "Inicio": "Start",
      "Quiénes somos": "Ueber uns",
      "Proyectos": "Projekte",
      "Talleres": "Workshops",
      "Colabora": "Mitmachen",
      "Contacto": "Kontakt",
      "Apoyar": "Unterstuetzen",
      "Ciencia, tecnología y robótica": "Wissenschaft, Technologie und Robotik",
      "Universidad Rey Juan Carlos · Campus de Fuenlabrada": "Universitaet Rey Juan Carlos · Campus Fuenlabrada",
      "El futuro no se estudia, se construye.": "Die Zukunft studiert man nicht, man baut sie.",
      "Robotech URJC reúne a estudiantes que quieren aprender robótica, electrónica, programación, fabricación digital y visión artificial mediante proyectos reales y abiertos.": "Robotech URJC bringt Studierende zusammen, die Robotik, Elektronik, Programmierung, digitale Fertigung und Computer Vision durch reale, offene Projekte lernen wollen.",
      "Explorar proyectos": "Projekte ansehen",
      "Ver talleres": "Workshops ansehen",
      "Abierto": "Offen",
      "Proyectos y documentación compartida": "Geteilte Projekte und Dokumentation",
      "Práctico": "Praktisch",
      "Montaje, pruebas y aprendizaje en taller": "Montage, Tests und Lernen im Workshop",
      "Proyectos reales": "Reale Projekte",
      "Robots, drones, juegos electrónicos y visión artificial.": "Roboter, Drohnen, elektronische Spiele und Computer Vision.",
      "Talleres prácticos": "Praktische Workshops",
      "Linux, shell, Git, impresion 3D y fundamentos técnicos.": "Linux, Shell, Git, 3D-Druck und technische Grundlagen.",
      "Comunidad técnica": "Technische Community",
      "Mentoría entre estudiantes y colaboración abierta.": "Mentoring unter Studierenden und offene Zusammenarbeit.",
      "Campus Fuenlabrada": "Campus Fuenlabrada",
      "Nos encontramos en el sótano del Aulario I.": "Du findest uns im Untergeschoss des Aulario I.",
      "Un laboratorio universitario gestionado por estudiantes.": "Ein universitaeres Labor, das von Studierenden betrieben wird.",
      "Robótica": "Robotik",
      "Fabricacion": "Fertigung",
      "Proyectos destacados": "Ausgewaehlte Projekte",
      "Participa": "Mach mit",
      "Contactar": "Kontakt aufnehmen",
      "Ver proyectos": "Projekte ansehen",
      "Repositorio": "Repository",
      "Todos": "Alle",
      "Electrónica": "Elektronik",
      "Activo": "Aktiv",
      "Archivo": "Archiv",
      "Formacion practica": "Praktische Ausbildung",
      "Saber más": "Mehr erfahren",
      "Preguntar por fechas": "Nach Terminen fragen",
      "Volver a talleres": "Zurueck zu Workshops",
      "Duración": "Dauer",
      "Nivel": "Niveau",
      "Formato": "Format",
      "workshop.level.beginner": "Einstieg",
      "Preparar email": "E-Mail vorbereiten"
    },
    attrs: {
      "Abrir menú": "Menue oeffnen",
      "Navegación principal": "Hauptnavigation",
      "Cambiar idioma": "Sprache wechseln",
      "Cambiar entre modo claro y oscuro": "Zwischen Hell- und Dunkelmodus wechseln",
      "Imagen del taller de Robotech": "Bild des Robotech-Workshops",
      "Equipo y espacio de trabajo de Robotech URJC": "Team und Arbeitsbereich von Robotech URJC"
    }
  },
  fr: {
    titles: {
      "Robotech URJC | Robótica universitaria": "Robotech URJC | Robotique universitaire",
      "Quiénes somos | Robotech URJC": "Qui sommes-nous | Robotech URJC",
      "Proyectos | Robotech URJC": "Projets | Robotech URJC",
      "Talleres | Robotech URJC": "Ateliers | Robotech URJC",
      "Colabora | Robotech URJC": "Collaborer | Robotech URJC",
      "Contacto | Robotech URJC": "Contact | Robotech URJC",
      "Linux y setup | Robotech URJC": "Linux et configuration | Robotech URJC",
      "Shell | Robotech URJC": "Shell | Robotech URJC",
      "Git y GitHub | Robotech URJC": "Git et GitHub | Robotech URJC",
      "Fabricación | Robotech URJC": "Fabrication | Robotech URJC"
    },
    text: {
      "Saltar al contenido": "Aller au contenu",
      "Inicio": "Accueil",
      "Quiénes somos": "Qui sommes-nous",
      "Proyectos": "Projets",
      "Talleres": "Ateliers",
      "Colabora": "Collaborer",
      "Contacto": "Contact",
      "Apoyar": "Soutenir",
      "Ciencia, tecnología y robótica": "Science, technologie et robotique",
      "Universidad Rey Juan Carlos · Campus de Fuenlabrada": "Universite Rey Juan Carlos · Campus de Fuenlabrada",
      "El futuro no se estudia, se construye.": "L'avenir ne s'etudie pas, il se construit.",
      "Robotech URJC reúne a estudiantes que quieren aprender robótica, electrónica, programación, fabricación digital y visión artificial mediante proyectos reales y abiertos.": "Robotech URJC rassemble des etudiants qui veulent apprendre la robotique, l'electronique, la programmation, la fabrication numerique et la vision artificielle avec des projets reels et ouverts.",
      "Explorar proyectos": "Explorer les projets",
      "Ver talleres": "Voir les ateliers",
      "Abierto": "Ouvert",
      "Proyectos y documentación compartida": "Projets et documentation partages",
      "Práctico": "Pratique",
      "Montaje, pruebas y aprendizaje en taller": "Montage, essais et apprentissage en atelier",
      "Proyectos reales": "Projets reels",
      "Robots, drones, juegos electrónicos y visión artificial.": "Robots, drones, jeux electroniques et vision artificielle.",
      "Talleres prácticos": "Ateliers pratiques",
      "Linux, shell, Git, impresion 3D y fundamentos técnicos.": "Linux, shell, Git, impression 3D et bases techniques.",
      "Comunidad técnica": "Communaute technique",
      "Mentoría entre estudiantes y colaboración abierta.": "Mentorat entre etudiants et collaboration ouverte.",
      "Campus Fuenlabrada": "Campus de Fuenlabrada",
      "Nos encontramos en el sótano del Aulario I.": "Nous sommes au sous-sol de l'Aulario I.",
      "Un laboratorio universitario gestionado por estudiantes.": "Un laboratoire universitaire gere par des etudiants.",
      "Robótica": "Robotique",
      "Fabricacion": "Fabrication",
      "Proyectos destacados": "Projets en vedette",
      "Participa": "Participer",
      "Contactar": "Nous contacter",
      "Ver proyectos": "Voir les projets",
      "Repositorio": "Depot",
      "Todos": "Tous",
      "Electrónica": "Electronique",
      "Activo": "Actif",
      "Archivo": "Archive",
      "Formacion practica": "Formation pratique",
      "Saber más": "En savoir plus",
      "Preguntar por fechas": "Demander les dates",
      "Volver a talleres": "Retour aux ateliers",
      "Duración": "Duree",
      "Nivel": "Niveau",
      "Formato": "Format",
      "workshop.level.beginner": "Debutant",
      "Preparar email": "Preparer l'email"
    },
    attrs: {
      "Abrir menú": "Ouvrir le menu",
      "Navegación principal": "Navigation principale",
      "Cambiar idioma": "Changer de langue",
      "Cambiar entre modo claro y oscuro": "Basculer entre mode clair et sombre",
      "Imagen del taller de Robotech": "Image de l'atelier Robotech",
      "Equipo y espacio de trabajo de Robotech URJC": "Equipe et espace de travail de Robotech URJC"
    }
  }
};

function normalizeI18nText(value) {
  return String(value).replace(/\s+/g, " ").trim();
}

function getTextTranslationKey(node, original) {
  const key = normalizeI18nText(original);
  if (key === "Inicio" && node.parentElement && node.parentElement.closest(".workshop-meta")) {
    return "workshop.level.beginner";
  }
  return key;
}

function getLocalTranslation(language, section, key) {
  const languagePack = translations[language];
  if (!languagePack) return "";
  if (section === "attrs") return languagePack.attrs[key] || languagePack.text[key] || "";
  return languagePack[section] && languagePack[section][key] ? languagePack[section][key] : "";
}

function saveAutoTranslation(language, key, value) {
  if (!autoTranslationCache[language]) autoTranslationCache[language] = {};
  autoTranslationCache[language][key] = value;
  localStorage.setItem("robotech-v8-auto-translations", JSON.stringify(autoTranslationCache));
}

async function fetchAutoTranslation(text, language) {
  const target = translationTargets[language];
  if (!target || !text) return "";

  const cacheKey = normalizeI18nText(text);
  if (autoTranslationCache[language] && autoTranslationCache[language][cacheKey]) {
    return autoTranslationCache[language][cacheKey];
  }

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=${encodeURIComponent(target)}&dt=t&q=${encodeURIComponent(text)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) return "";
    const data = await response.json();
    const translated = Array.isArray(data[0])
      ? data[0].map((part) => part[0]).join("")
      : "";
    if (translated) saveAutoTranslation(language, cacheKey, translated);
    return translated;
  } catch {
    return "";
  }
}

async function resolveTranslation({ original, key, language, section }) {
  if (language === "es") return original;

  const local = getLocalTranslation(language, section, key);
  if (local) return local;

  if (section === "titles") {
    return getLocalTranslation("en", "titles", key) || original;
  }

  return fetchAutoTranslation(original, language);
}

function getOriginalAttribute(element, attribute) {
  let attrs = originalAttributes.get(element);
  if (!attrs) {
    attrs = {};
    originalAttributes.set(element, attrs);
  }
  if (!Object.prototype.hasOwnProperty.call(attrs, attribute)) {
    attrs[attribute] = element.getAttribute(attribute);
  }
  return attrs[attribute];
}

async function translateDocument(language) {
  currentLanguage = supportedLanguages.includes(language) ? language : "es";
  const requestedLanguage = currentLanguage;
  document.documentElement.lang = currentLanguage;
  localStorage.setItem(languageStorageKey, currentLanguage);

  document.querySelectorAll(".language-select").forEach((languageSelect) => {
    languageSelect.value = currentLanguage;
  });

  const originalTitle = document.documentElement.dataset.originalTitle || document.title;
  document.documentElement.dataset.originalTitle = originalTitle;
  document.title = await resolveTranslation({
    original: originalTitle,
    key: originalTitle,
    language: currentLanguage,
    section: "titles"
  });

  const attributeTasks = [];
  document.querySelectorAll("[aria-label], [alt], [placeholder], input[value], meta[name='description']").forEach((element) => {
    translatableAttributes.forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      const original = getOriginalAttribute(element, attribute);
      const key = normalizeI18nText(original);
      attributeTasks.push(
        resolveTranslation({ original, key, language: requestedLanguage, section: "attrs" }).then((translated) => {
          if (currentLanguage === requestedLanguage) element.setAttribute(attribute, translated || original);
        })
      );
    });
  });

  await Promise.all(attributeTasks);

  const textTasks = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || ["SCRIPT", "STYLE", "SVG"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      if (parent.closest(".language-switch")) return NodeFilter.FILTER_REJECT;
      return normalizeI18nText(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });

  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const original = originalText.get(node);
    const leading = original.match(/^\s*/)[0];
    const trailing = original.match(/\s*$/)[0];
    const key = getTextTranslationKey(node, original);
    textTasks.push(
      resolveTranslation({ original: normalizeI18nText(original), key, language: requestedLanguage, section: "text" }).then((translated) => {
        if (currentLanguage === requestedLanguage) {
          node.nodeValue = translated ? `${leading}${translated}${trailing}` : original;
        }
      })
    );
  }

  await Promise.all(textTasks);
  updateProjectDossierLinks();

  const assistant = document.querySelector(".pet-assistant");
  const assistantAnswer = assistant && assistant.querySelector(".pet-assistant__answer");
  if (assistantAnswer) {
    const answerKey = assistant.dataset.answer || "start";
    assistantAnswer.textContent = assistantAnswerTranslations[currentLanguage][answerKey];
  }
}

const projectsWithoutDossier = new Set(["noah", "servidor-red", "oasis"]);

function getProjectDossierHref(projectKey) {
  const safeKey = String(projectKey || "proyecto").trim() || "proyecto";
  return currentLanguage === "es" ? `pdf/${safeKey}.pdf` : `pdf/${safeKey}_english.pdf`;
}

function updateProjectDossierLinks() {
  document.querySelectorAll("[data-project-dossier]").forEach((link) => {
    link.href = getProjectDossierHref(link.dataset.projectDossier);
  });
}

function injectProjectDossierButtons() {
  document.querySelectorAll(".project-detail[id] .detail-actions").forEach((actions) => {
    const detail = actions.closest(".project-detail[id]");
    if (!detail || projectsWithoutDossier.has(detail.id) || actions.querySelector("[data-project-dossier]")) return;
    const link = document.createElement("a");
    link.className = "button secondary project-dossier-link";
    link.dataset.projectDossier = detail.id;
    link.href = getProjectDossierHref(detail.id);
    link.textContent = "Dossier técnico";
    link.setAttribute("download", "");
    actions.append(link);
  });
}

function createLanguageSwitch(extraClass = "") {
  const label = document.createElement("label");
  label.className = `language-switch${extraClass ? ` ${extraClass}` : ""}`;
  label.innerHTML = `
    <span class="language-switch__label">Idioma</span>
    <select class="language-select" aria-label="Cambiar idioma">
      <option value="es">🇪🇸 ES</option>
      <option value="en">🇬🇧 EN</option>
      <option value="it">🇮🇹 IT</option>
      <option value="zh">🇨🇳 中文</option>
      <option value="de">🇩🇪 DE</option>
      <option value="fr">🇫🇷 FR</option>
    </select>
  `;

  const select = label.querySelector("select");
  select.value = currentLanguage;
  select.addEventListener("change", (event) => {
    translateDocument(event.target.value);
  });
  return label;
}

function injectLanguageSwitch() {
  const nav = document.querySelector(".nav");
  if (!nav || document.querySelector(".language-switch")) return;

  const headerSwitch = createLanguageSwitch("language-switch--header");
  const themeSwitch = document.querySelector(".theme-switch");
  if (themeSwitch) {
    themeSwitch.after(headerSwitch);
  } else {
    nav.appendChild(headerSwitch);
  }

  if (navMenu) {
    navMenu.appendChild(createLanguageSwitch("language-switch--menu"));
  }
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const contactForm = document.querySelector("[data-contact-form]");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const languagePack = translations[currentLanguage];
    const bodyLabels = {
      name: languagePack ? languagePack.text.Nombre || "Nombre" : "Nombre",
      email: "Email",
      type: languagePack ? languagePack.text["Tipo de contacto"] || "Tipo" : "Tipo"
    };
    const subject = encodeURIComponent(data.get("subject") || defaultSubject);
    const body = encodeURIComponent(
      `${bodyLabels.name}: ${data.get("name")}\n${bodyLabels.email}: ${data.get("email")}\n${bodyLabels.type}: ${data.get("type")}\n\n${data.get("message")}`
    );
    window.location.href = `mailto:asociacion.robotech@urjc.es?subject=${subject}&body=${body}`;
  });
}

const storageKey = "robotech-v9-theme";
const savedTheme = localStorage.getItem(storageKey);
const initialTheme = savedTheme || "light";

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(storageKey, theme);
  const switchInput = document.querySelector(".theme-switch input");
  if (switchInput) switchInput.checked = theme === "dark";
}


function injectThemeSwitch() {
  const nav = document.querySelector(".nav");
  if (!nav || document.querySelector(".theme-switch")) return;

  const label = document.createElement("label");
  label.className = "theme-switch";
  label.innerHTML = `
    <span class="theme-switch__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg></span>
    <input type="checkbox" aria-label="Cambiar entre modo claro y oscuro">
    <span class="theme-switch__track"><span class="theme-switch__thumb"></span></span>
    <span class="theme-switch__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20.5 14.4A8 8 0 0 1 9.6 3.5 8.2 8.2 0 1 0 20.5 14.4Z"></path></svg></span>
  `;

  nav.appendChild(label);
  label.querySelector("input").addEventListener("change", (event) => {
    setTheme(event.target.checked ? "dark" : "light");
  });
}



function injectDonationPopup() {
  if (document.querySelector(".coffee-modal")) return;

  const storageKey = "robotech-v8-coffee-popup-shown";
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <button class="coffee-fab" type="button" aria-haspopup="dialog" aria-controls="coffeeModal" aria-label="Invitar a BIT a un café">
      <span class="coffee-fab__cup" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 8h11v6a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V8Z"></path><path d="M16 10h2.2a2.3 2.3 0 0 1 0 4.6H16"></path><path d="M7 4v1.5"></path><path d="M11 4v1.5"></path><path d="M15 4v1.5"></path><path d="M4 21h14"></path></svg></span>
    </button>
    <div class="coffee-modal" id="coffeeModal" role="dialog" aria-modal="true" aria-labelledby="coffeeTitle" hidden>
      <div class="coffee-modal__card">
        <button class="coffee-modal__close" type="button" aria-label="Cerrar">×</button>
        <img class="coffee-modal__pet" src="img/pet_coffee.png" alt="BIT, mascota de Robotech, con un café">
        <div>
          <p class="eyebrow">BIT necesita cafeína</p>
          <h2 id="coffeeTitle">¿Me invitas a un café?</h2>
          <p>Prometo invertirlo bien: componentes, herramientas, reparaciones del taller y material para preparar más actividades para estudiantes.</p>
          <div class="button-row">
            <a class="button primary" href="https://opencollective.com/robotech-urjc" target="_blank" rel="noreferrer">Invitar a un café</a>
            <button class="button secondary coffee-modal__secondary" type="button">Ahora no</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.append(...wrapper.children);

  const modal = document.getElementById("coffeeModal");
  const openButton = document.querySelector(".coffee-fab");
  const closeButtons = modal.querySelectorAll(".coffee-modal__close, .coffee-modal__secondary");

  const openModal = () => {
    modal.hidden = false;
    document.body.classList.add("has-modal");
    sessionStorage.setItem(storageKey, "true");
    modal.querySelector(".coffee-modal__close").focus();
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove("has-modal");
    openButton.focus();
  };

  openButton.addEventListener("click", openModal);
  window.robotechShowDonationPopup = openModal;
  closeButtons.forEach((button) => button.addEventListener("click", closeModal));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });

  if (!sessionStorage.getItem(storageKey)) {
    window.setTimeout(openModal, 900);
  }
}

setTheme(initialTheme);
injectThemeSwitch();
injectLanguageSwitch();
setTheme(document.documentElement.dataset.theme);
injectDonationPopup();



function injectMascotAssistant() {
  if (document.querySelector(".pet-assistant")) return;

  const sessionKey = "robotech-v8-rob-intro-shown";
  const coffeeKey = "robotech-v8-coffee-popup-shown";
  const shouldOpen = sessionStorage.getItem(coffeeKey) && !sessionStorage.getItem(sessionKey);
  const quickLinks = [
    { label: "Proyectos", href: "proyectos.html" },
    { label: "Talleres", href: "talleres.html" },
    { label: "Unirme", href: "contacto.html" },
    { label: "Discord", href: "https://discord.gg/k9nKDrDQaC", external: true }
  ];

  const assistant = document.createElement("aside");
  assistant.className = `pet-assistant${shouldOpen ? " is-open" : ""}`;
  assistant.setAttribute("aria-label", "Chat con BIT");
  assistant.innerHTML = `
    <div class="pet-assistant__hint" aria-hidden="true">A BIT of help?</div>
    <div class="pet-assistant__bubble" id="petAssistantPanel" ${shouldOpen ? "" : "hidden"}>
      <div class="pet-assistant__top">
        <span class="pet-assistant__avatar"><img src="img/PET.png" alt=""></span>
        <div><strong>BIT</strong><small>Normalmente responde al momento</small></div>
        <button class="pet-assistant__close" type="button" aria-label="Cerrar chat">×</button>
      </div>
      <div class="pet-assistant__messages" aria-live="polite"></div>
      <div class="pet-assistant__chips" aria-label="Sugerencias">
        <button type="button" data-prompt="Quiero ver proyectos">Proyectos</button>
        <button type="button" data-prompt="Quiero unirme">Unirme</button>
        <button type="button" data-prompt="Dónde estáis">Ubicación</button>
      </div>
      <form class="pet-assistant__form">
        <label class="sr-only" for="petAssistantInput">Escribe tu pregunta</label>
        <input id="petAssistantInput" name="message" autocomplete="off" placeholder="Escribe un mensaje...">
        <button type="submit" aria-label="Enviar mensaje"><svg viewBox="0 0 24 24"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg></button>
      </form>
    </div>
    <button class="pet-assistant__pet" type="button" aria-expanded="${String(shouldOpen)}" aria-controls="petAssistantPanel" aria-label="Abrir chat con BIT">
      <img src="img/PET.png" alt="Mascota de Robotech">
    </button>
  `;

  document.body.appendChild(assistant);
  if (shouldOpen) sessionStorage.setItem(sessionKey, "true");

  const toggle = assistant.querySelector(".pet-assistant__pet");
  const close = assistant.querySelector(".pet-assistant__close");
  const panel = assistant.querySelector(".pet-assistant__bubble");
  const messages = assistant.querySelector(".pet-assistant__messages");
  const form = assistant.querySelector(".pet-assistant__form");
  const input = assistant.querySelector("#petAssistantInput");
  const chips = assistant.querySelector(".pet-assistant__chips");
  let replyTimer = null;

  const linkMarkup = (links = []) => links.map((link) => {
    const attrs = link.external ? ' target="_blank" rel="noreferrer"' : "";
    return `<a href="${link.href}"${attrs}>${link.label}</a>`;
  }).join("");

  const addMessage = ({ text, links = [] }, type = "bot") => {
    const message = document.createElement("div");
    message.className = `pet-message pet-message--${type}`;
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    message.appendChild(paragraph);
    if (links.length) {
      const actions = document.createElement("div");
      actions.className = "pet-message__links";
      actions.innerHTML = linkMarkup(links);
      message.appendChild(actions);
    }
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  };

  const setTyping = (isTyping) => {
    let typing = messages.querySelector(".pet-message--typing");
    if (isTyping && !typing) {
      typing = document.createElement("div");
      typing.className = "pet-message pet-message--bot pet-message--typing";
      typing.innerHTML = "<span></span><span></span><span></span>";
      messages.appendChild(typing);
      messages.scrollTop = messages.scrollHeight;
    }
    if (!isTyping && typing) typing.remove();
  };

  const getReply = (rawText) => {
    const text = rawText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (/(proyecto|robot|scara|zeus|drone|dron|hirobot|led|flip|hormiga|noah)/.test(text)) {
      return {
        text: "Aquí tienes los proyectos. Si estás empezando, mira los activos y pide una primera tarea pequeña.",
        links: [
          { label: "Ver proyectos", href: "proyectos.html" },
          { label: "Zeus", href: "proyectos.html#zeus" },
          { label: "Scara", href: "proyectos.html#scara" }
        ]
      };
    }
    if (/(taller|curso|linux|git|shell|fabricacion|impresion|aprender)/.test(text)) {
      return {
        text: "Los talleres son la entrada más directa para empezar con herramientas reales.",
        links: [
          { label: "Ver talleres", href: "talleres.html" },
          { label: "Linux", href: "taller-linux.html" },
          { label: "Git", href: "taller-git.html" }
        ]
      };
    }
    if (/(unir|entro|entrar|apuntar|miembro|participar|discord)/.test(text)) {
      return {
        text: "Puedes entrar sin experiencia previa. Lo más rápido es pasar por Discord o escribirnos.",
        links: [
          { label: "Entrar a Discord", href: "https://discord.gg/k9nKDrDQaC", external: true },
          { label: "Contacto", href: "contacto.html" }
        ]
      };
    }
    if (/(donde|ubicacion|local|campus|aulario|fuenlabrada)/.test(text)) {
      return {
        text: "Estamos en el Campus de Fuenlabrada, en el sótano del Aulario I.",
        links: [
          { label: "Quiénes somos", href: "aboutus.html" },
          { label: "Contacto", href: "contacto.html" }
        ]
      };
    }
    if (/(contact|correo|email|mail|empresa|colabora|patrocin)/.test(text)) {
      return {
        text: "Para contacto, colaboraciones o patrocinio, usa estos enlaces.",
        links: [
          { label: "Email", href: "mailto:asociacion.robotech@urjc.es" },
          { label: "Colabora", href: "colabora.html" },
          { label: "LinkedIn", href: "https://es.linkedin.com/company/robotech-urjc", external: true }
        ]
      };
    }
    if (/(qr|link|red|instagram|github|linkedin)/.test(text)) {
      return {
        text: "Aquí tienes el hub rápido con redes y enlaces principales.",
        links: [
          { label: "Enlaces", href: "qr.html" },
          { label: "Instagram", href: "https://www.instagram.com/robotech_urjc", external: true },
          { label: "GitHub", href: "https://github.com/robotech-urjc", external: true }
        ]
      };
    }
    if (/(hola|buenas|hey|ola)/.test(text)) {
      return { text: "¡Hola! Puedo pasarte enlaces de proyectos, talleres, Discord, contacto o ubicación.", links: quickLinks };
    }
    return { text: "No estoy seguro de qué necesitas. Te dejo los accesos más útiles para empezar.", links: quickLinks };
  };

  const sendMessage = (text) => {
    const cleanText = text.trim();
    if (!cleanText) return;
    if (replyTimer) window.clearTimeout(replyTimer);
    addMessage({ text: cleanText }, "user");
    input.value = "";
    input.disabled = true;
    form.querySelector("button").disabled = true;
    setTyping(true);
    replyTimer = window.setTimeout(() => {
      setTyping(false);
      addMessage(getReply(cleanText), "bot");
      input.disabled = false;
      form.querySelector("button").disabled = false;
      input.focus();
      replyTimer = null;
    }, 320);
  };

  const setOpen = (isOpen) => {
    assistant.classList.toggle("is-open", isOpen);
    panel.hidden = !isOpen;
    toggle.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) window.setTimeout(() => input.focus(), 40);
  };

  addMessage({ text: "Hola, soy BIT. Escríbeme qué buscas o toca una sugerencia.", links: quickLinks });

  let autoClose = null;
  if (shouldOpen) {
    autoClose = window.setTimeout(() => {
      if (assistant.classList.contains("is-open")) setOpen(false);
    }, 9000);
  }

  const stopAutoClose = () => {
    if (autoClose) window.clearTimeout(autoClose);
    autoClose = null;
  };

  toggle.addEventListener("click", () => {
    stopAutoClose();
    setOpen(!assistant.classList.contains("is-open"));
  });
  close.addEventListener("click", () => {
    stopAutoClose();
    setOpen(false);
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    stopAutoClose();
    sendMessage(input.value);
  });
  chips.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      stopAutoClose();
      sendMessage(button.dataset.prompt || button.textContent);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && assistant.classList.contains("is-open")) {
      stopAutoClose();
      setOpen(false);
      toggle.focus();
    }
  });
}
injectMascotAssistant();
translateDocument(currentLanguage);


function initProjectImageCarousel() {
  const projectImages = document.querySelectorAll(".project-card > img, .detail-gallery img");
  if (!projectImages.length || document.querySelector(".image-carousel")) return;

  const modal = document.createElement("div");
  modal.className = "image-carousel";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Carrusel de imágenes del proyecto");
  modal.hidden = true;
  modal.innerHTML = `
    <button class="image-carousel__button image-carousel__close" type="button" aria-label="Cerrar">&times;</button>
    <button class="image-carousel__button image-carousel__prev" type="button" aria-label="Imagen anterior">‹</button>
    <div class="image-carousel__stage"><img class="image-carousel__image" src="" alt=""></div>
    <button class="image-carousel__button image-carousel__next" type="button" aria-label="Imagen siguiente">›</button>
    <p class="image-carousel__caption" aria-live="polite"></p>
  `;
  document.body.appendChild(modal);

  const image = modal.querySelector(".image-carousel__image");
  const caption = modal.querySelector(".image-carousel__caption");
  const closeButton = modal.querySelector(".image-carousel__close");
  const prevButton = modal.querySelector(".image-carousel__prev");
  const nextButton = modal.querySelector(".image-carousel__next");
  const groups = new Map();
  let currentGroup = [];
  let currentIndex = 0;
  let lastTrigger = null;

  document.querySelectorAll(".project-detail[id]").forEach((section) => {
    const groupImages = Array.from(section.querySelectorAll(".detail-gallery img"));
    if (groupImages.length) groups.set(section.id, groupImages);
  });

  const getGroupId = (trigger) => {
    const detail = trigger.closest(".project-detail[id]");
    if (detail) return detail.id;

    const card = trigger.closest(".project-card");
    const detailLink = card?.querySelector('a[href^="#"]');
    return detailLink ? detailLink.getAttribute("href").slice(1) : "overview";
  };

  const setSlide = (index) => {
    if (!currentGroup.length) return;
    currentIndex = (index + currentGroup.length) % currentGroup.length;
    const source = currentGroup[currentIndex];
    image.src = source.currentSrc || source.src;
    image.alt = source.alt || "Imagen del proyecto";
    caption.textContent = `${image.alt} · ${currentIndex + 1}/${currentGroup.length}`;
    const hasMultiple = currentGroup.length > 1;
    prevButton.hidden = !hasMultiple;
    nextButton.hidden = !hasMultiple;
  };

  const openCarousel = (trigger) => {
    const groupId = getGroupId(trigger);
    currentGroup = groups.get(groupId) || [trigger];
    const foundIndex = currentGroup.indexOf(trigger);
    lastTrigger = trigger;
    modal.hidden = false;
    document.body.classList.add("has-modal");
    setSlide(foundIndex >= 0 ? foundIndex : 0);
    closeButton.focus();
  };

  const closeCarousel = () => {
    modal.hidden = true;
    document.body.classList.remove("has-modal");
    image.removeAttribute("src");
    if (lastTrigger) lastTrigger.focus();
  };

  projectImages.forEach((img) => {
    img.setAttribute("tabindex", "0");
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", `Abrir carrusel: ${img.alt || "imagen del proyecto"}`);
    img.addEventListener("click", () => openCarousel(img));
    img.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openCarousel(img);
      }
    });
  });

  closeButton.addEventListener("click", closeCarousel);
  prevButton.addEventListener("click", () => setSlide(currentIndex - 1));
  nextButton.addEventListener("click", () => setSlide(currentIndex + 1));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeCarousel();
  });
  document.addEventListener("keydown", (event) => {
    if (modal.hidden) return;
    if (event.key === "Escape") closeCarousel();
    if (event.key === "ArrowLeft") setSlide(currentIndex - 1);
    if (event.key === "ArrowRight") setSlide(currentIndex + 1);
  });
}

injectProjectDossierButtons();
initProjectImageCarousel();


/* Data-driven static content: projects, workshops and sponsors */
(() => {
  const data = window.ROBOTECH_DATA;
  if (!data) return;

  const makeText = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    el.textContent = text || "";
    return el;
  };

  const projectsRoot = document.querySelector("[data-projects-render]");
  if (projectsRoot && Array.isArray(data.projects)) {
    projectsRoot.replaceChildren();
    data.projects.forEach((project) => {
      const article = document.createElement("article");
      article.className = "project-card";
      article.dataset.tags = Array.isArray(project.tags) ? project.tags.join(" ") : project.tags || "";

      const image = document.createElement("img");
      image.src = project.image || "img/dash/idea.png";
      image.alt = project.alt || project.title || "Proyecto";

      const body = document.createElement("div");
      body.className = "project-body";

      const meta = document.createElement("div");
      meta.className = "project-meta";
      const visibleTags = Array.isArray(project.visibleTags) ? project.visibleTags : String(project.visibleTags || "").split(",").map((tag) => tag.trim()).filter(Boolean);
      visibleTags.forEach((tag) => meta.append(makeText("span", "tag", tag)));

      const links = document.createElement("div");
      links.className = "project-links";
      if (project.detailHref) {
        const detail = document.createElement("a");
        detail.href = project.detailHref;
        detail.textContent = "Ver detalle";
        links.append(detail);
      }
      if (project.repoHref) {
        const repo = document.createElement("a");
        repo.href = project.repoHref;
        repo.target = "_blank";
        repo.rel = "noreferrer";
        repo.textContent = "Repositorio";
        links.append(repo);
      }
      if (!projectsWithoutDossier.has(project.key)) {
        const dossier = document.createElement("a");
        dossier.href = getProjectDossierHref(project.key);
        dossier.dataset.projectDossier = project.key || "proyecto";
        dossier.className = "project-dossier-link";
        dossier.textContent = "Dossier técnico";
        dossier.setAttribute("download", "");
        links.append(dossier);
      }

      body.append(meta, makeText("h3", "", project.title || "Proyecto"), makeText("p", "", project.description || ""), links);
      article.append(image, body);
      projectsRoot.append(article);
    });

    document.querySelector(".image-carousel")?.remove();
    injectProjectDossierButtons();
    updateProjectDossierLinks();
    initProjectImageCarousel();
  }

  const featuredProjectsRoot = document.querySelector("[data-featured-projects-render]");
  if (featuredProjectsRoot && Array.isArray(data.projects)) {
    const archivedKeys = new Set(["noah", "servidor-red", "oasis"]);
    const activeProjects = data.projects.filter((project) => !archivedKeys.has(project.key));
    const carouselProjects = [...activeProjects, ...activeProjects, ...activeProjects];
    featuredProjectsRoot.replaceChildren();

    carouselProjects.forEach((project, index) => {
      const article = document.createElement("article");
      article.className = "project-card featured-carousel__card";
      article.dataset.carouselIndex = String(index);

      const image = document.createElement("img");
      image.src = project.image || "img/dash/idea.png";
      image.alt = project.alt || project.title || "Proyecto";

      const body = document.createElement("div");
      body.className = "project-body";

      const meta = document.createElement("div");
      meta.className = "project-meta";
      const visibleTags = Array.isArray(project.visibleTags) ? project.visibleTags : String(project.visibleTags || "").split(",").map((tag) => tag.trim()).filter(Boolean);
      visibleTags.slice(0, 3).forEach((tag) => meta.append(makeText("span", "tag", tag)));

      const links = document.createElement("div");
      links.className = "project-links";
      if (project.detailHref) {
        const detail = document.createElement("a");
        detail.href = `proyectos.html${project.detailHref}`;
        detail.textContent = "Ver detalle";
        links.append(detail);
      }

      body.append(meta, makeText("h3", "", project.title || "Proyecto"), makeText("p", "", project.description || ""), links);
      article.append(image, body);
      featuredProjectsRoot.append(article);
    });

    const cards = Array.from(featuredProjectsRoot.querySelectorAll(".project-card"));
    const projectCount = activeProjects.length;
    let activeIndex = 0;
    let scrollEndTimer = 0;

    const getCardForIndex = (index) => cards[projectCount + index] || cards[index];

    const updateActiveCard = () => {
      const target = getCardForIndex(activeIndex);
      cards.forEach((card) => card.classList.toggle("is-active", card === target));
    };

    const scrollToFeaturedIndex = (index, behavior = "smooth") => {
      if (!projectCount) return;
      activeIndex = ((index % projectCount) + projectCount) % projectCount;
      const target = getCardForIndex(activeIndex);
      if (!target) return;
      target.scrollIntoView({ behavior, block: "nearest", inline: "center" });
      updateActiveCard();
    };

    const syncActiveFromScroll = () => {
      if (!projectCount) return;
      const trackRect = featuredProjectsRoot.getBoundingClientRect();
      const center = trackRect.left + trackRect.width / 2;
      let selected = null;
      let bestDistance = Infinity;
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const distance = Math.abs(center - (rect.left + rect.width / 2));
        if (distance < bestDistance) {
          selected = card;
          bestDistance = distance;
        }
      });
      if (!selected) return;
      activeIndex = Number(selected.dataset.carouselIndex || 0) % projectCount;
      updateActiveCard();
      window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(() => scrollToFeaturedIndex(activeIndex, "auto"), 140);
    };

    const scrollFeatured = (direction) => scrollToFeaturedIndex(activeIndex + direction);

    document.querySelector("[data-featured-projects-prev]")?.addEventListener("click", () => scrollFeatured(-1));
    document.querySelector("[data-featured-projects-next]")?.addEventListener("click", () => scrollFeatured(1));
    featuredProjectsRoot.addEventListener("scroll", () => window.requestAnimationFrame(syncActiveFromScroll), { passive: true });
    window.addEventListener("resize", () => scrollToFeaturedIndex(activeIndex, "auto"));

    requestAnimationFrame(() => scrollToFeaturedIndex(0, "auto"));

    document.querySelector(".image-carousel")?.remove();
    injectProjectDossierButtons();
    updateProjectDossierLinks();
    initProjectImageCarousel();
  }

  const workshopsRoot = document.querySelector("[data-workshops-render]");
  if (workshopsRoot && Array.isArray(data.workshops)) {
    workshopsRoot.replaceChildren();
    data.workshops.forEach((workshop) => {
      const article = document.createElement("article");
      article.className = "timeline-item workshop-item";

      const image = document.createElement("img");
      image.src = workshop.image || "img/dash/idea.png";
      image.alt = workshop.alt || "Imagen del taller";

      const label = makeText("strong", "", workshop.label || workshop.title || "Taller");
      const body = document.createElement("div");
      body.append(
        makeText("h3", "", workshop.title || "Taller"),
        makeText("p", "", workshop.description || "")
      );

      if (workshop.href) {
        const link = document.createElement("a");
        link.className = "text-link";
        link.href = workshop.href;
        link.textContent = "Saber mas";
        body.append(link);
      }

      article.append(image, label, body);
      workshopsRoot.append(article);
    });
  }

  const sponsorsRoot = document.querySelector("[data-sponsors-render]");
  if (sponsorsRoot && Array.isArray(data.sponsors)) {
    sponsorsRoot.replaceChildren();
    data.sponsors.forEach((sponsor) => {
      const article = document.createElement("article");
      article.className = "sponsor-card";

      const logo = makeText("div", `sponsor-logo ${sponsor.logoClass || ""}`.trim(), sponsor.image ? "" : sponsor.logo || sponsor.name || "Sponsor");
      logo.setAttribute("aria-hidden", "true");
      if (sponsor.image) {
        const image = document.createElement("img");
        image.src = sponsor.image;
        image.alt = "";
        logo.append(image);
      }

      const body = document.createElement("div");
      body.append(
        makeText("span", "tag", sponsor.tag || "Patrocinador"),
        makeText("h3", "", sponsor.name || "Patrocinador"),
        makeText("p", "", sponsor.description || "")
      );

      article.append(logo, body);
      sponsorsRoot.append(article);
    });
  }
})();
