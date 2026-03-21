export type AgendaItem = {
  time: string;
  title: string;
  description: string;
  icon: string;
  location?: string;
  responsible?: string;
};

export type AgendaDay = {
  day: string;
  date: string;
  items: AgendaItem[];
};

export const agendaData: AgendaDay[] = [
  {
    day: "Día 1",
    date: "30 de abril",
    items: [
      {
        time: "09:00",
        title: "Visita protocolar a autoridades",
        description: "Reunión protocolar con autoridades locales.",
        icon: "handshake",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
      {
        time: "10:00",
        title: "Visita y Fotografía Oficial",
        description: "Sesión fotográfica oficial de las delegaciones.",
        icon: "photo_camera",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
      {
        time: "11:00",
        title: "Misa de Acción de Gracias",
        description: "Ceremonia religiosa de agradecimiento.",
        icon: "church",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
      {
        time: "12:00",
        title: "Desfile por delegaciones",
        description: "Desfile inaugural de los participantes.",
        icon: "flag",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
      {
        time: "13:00 - 14:30",
        title: "Almuerzo del Círculo de Exgobernadores",
        description: "Almuerzo exclusivo para exgobernadores.",
        icon: "restaurant",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
      {
        time: "13:00 - 14:30",
        title: "Almuerzo Libre para los Convencionales",
        description: "Tiempo libre para almorzar por cuenta propia.",
        icon: "lunch_dining",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
      {
        time: "15:30 - 17:30",
        title: "Sesión Preparatoria de la LXXV Convención Nacional",
        description: "Trabajos previos a la convención nacional.",
        icon: "meeting_room",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
      {
        time: "17:30 - 17:45",
        title: "Refrigerio",
        description: "Pausa para café y snacks.",
        icon: "coffee",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
      {
        time: "17:45 - 19:15",
        title: "Sesión Preparatoria de la LIII Convención por Distritos",
        description: "Trabajos preparatorios por distritos.",
        icon: "groups",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
      {
        time: "19:30 - 21:30",
        title: "Solemne Sesión Inaugural de la LXXV Convención Nacional y LIII Convención Bidistrital",
        description: "Apertura oficial con desfile de banderas.",
        icon: "stars",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
      {
        time: "21:30 - 24:00",
        title: "Cóctel de Bienvenida y mutuo conocimiento de los convencionales",
        description: "Noche de confraternización y conocimiento mutuo.",
        icon: "wine_bar",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
    ],
  },
  {
    day: "Día 2",
    date: "1 de mayo",
    items: [
      {
        time: "09:00 - 10:30",
        title: "Reuniones de Trabajo por Distritos",
        description: "Primer bloque de trabajo distrital.",
        icon: "group_work",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
      {
        time: "10:30 - 10:45",
        title: "Refrigerio",
        description: "Pausa activa.",
        icon: "coffee",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
      {
        time: "10:45 - 12:00",
        title: "Reuniones de Trabajo por Distritos",
        description: "Segundo bloque de trabajo distrital.",
        icon: "group_work",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
      {
        time: "12:30 - 14:30",
        title: "Almuerzo de Camaradería y Concurso de Tuercerrabía",
        description: "Integración y competencia amistosa.",
        icon: "celebration",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
      {
        time: "15:00 - 16:15",
        title: "Reuniones de Trabajo por Distritos",
        description: "Tercer bloque de trabajo distrital.",
        icon: "group_work",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
      {
        time: "16:15 - 16:30",
        title: "Refrigerio",
        description: "Pausa para recargar energías.",
        icon: "coffee",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
      {
        time: "16:30 - 19:00",
        title: "Reuniones de trabajo por distritos y Elección de Autoridades Leonísticas por Distrito",
        description: "Proceso de elección de nuevas autoridades.",
        icon: "how_to_vote",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
      {
        time: "20:00 - 24:00",
        title: "Noche de las Delegaciones y regocijo general de los convencionales",
        description: "Regocijo general y celebración cultural.",
        icon: "nightlife",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
    ],
  },
  {
    day: "Día 3",
    date: "2 de mayo",
    items: [
      {
        time: "09:45 - 10:45",
        title: "Capacitación Leonística",
        description: "Conferencia de formación para miembros.",
        icon: "school",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
      {
        time: "10:45 - 11:00",
        title: "Refrigerio",
        description: "Pausa para café.",
        icon: "coffee",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
      {
        time: "11:00 - 12:00",
        title: "Mensaje del Orador Oficial",
        description: "Discurso principal del evento.",
        icon: "record_voice_over",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
      {
        time: "12:00 - 14:30",
        title: "Almuerzo de los Amigos de Melvin Jones",
        description: "Almuerzo exclusivo para miembros destacados.",
        icon: "restaurant",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
      {
        time: "12:00 - 14:30",
        title: "Almuerzo Libre para los Convencionales",
        description: "Tiempo libre para almorzar.",
        icon: "lunch_dining",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
      {
        time: "15:00 - 16:15",
        title: "Sesión de Trabajo",
        description: "Sesión conjunta de la Convención Nacional y Bi-Distrital.",
        icon: "meeting_room",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
      {
        time: "16:15 - 16:30",
        title: "Refrigerio",
        description: "Pausa para refrigerio.",
        icon: "coffee",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
      {
        time: "16:30 - 18:00",
        title: "Proclamación de Autoridades y Clausura",
        description: "Anuncio de autoridades electas y cierre oficial.",
        icon: "celebration",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
      {
        time: "20:00 - 24:00",
        title: "Cena de Gala",
        description: "Homenaje a gobernadores y vicegobernadores electos.",
        icon: "dinner_dining",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
    ],
  },
  {
    day: "Día 4",
    date: "3 de mayo",
    items: [
      {
        time: "10:00 - 16:00",
        title: "Almuerzo Campestre",
        description: "Convivencia campestre con adhesión de Bs. 100.",
        icon: "dinner_dining",
        location: "Por definir",
        responsible: "Comité Organizador",
      },
    ],
  },
];
