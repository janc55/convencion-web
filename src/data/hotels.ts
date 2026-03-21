export type Hotel = {
  name: string;
  stars: number;
  description: string;
  price: number;
  currency?: string;
  image?: string;
  amenities?: string[];
  address?: string;
  phone?: string;
  email?: string;
  bookingUrl?: string;
};

export const hotelsData: Hotel[] = [
  {
    name: "HOTEL EDÉN",
    stars: 5,
    description: "Vistas panorámicas y servicios de spa.",
    price: 650,
    currency: "Bs.",
    image: "/images/eden.jpg",
    amenities: ["WiFi", "Spa", "Restaurante", "Bar"],
    address: "C. Bolivar esq. Presidente Montes",
    phone: "25276178",
    bookingUrl: "https://www.hoteledenbolivia.com/",
  },
  {
    name: "TORRE SUCRE HOTEL",
    stars: 5,
    description: "Ubicado a tan solo a dos cuadras de la plaza principal 10 de febrero",
    price: 600,
    currency: "Bs.",
    image: "/images/torresucre.jpg",
    amenities: ["Desayuno Buffett americano", "tv cable", "garaje bajo techo", "internet WI FI", "servicio de lavandería"],
    address: "Calle 6 de octubre esq. Sucre",
    phone: "52-76320 / 72585891",
    bookingUrl: "https://www.facebook.com/p/Torre-Sucre-Hotel-100046954602547/",
  },
  {
    name: "FLORES PLAZA HOTEL",
    stars: 3,
    description: "Somos un hotel de tres estrellas ubicados en la Plaza Principal 10 de Febrero de la ciudad de Oruro.",
    price: 550,
    currency: "Bs.",
    image: "/images/plaza.jpg",
    amenities: ["Desayuno Buffet", "Internet Wi-Fi", "Parqueo", "Convention Space"],
    address: "Adolfo Mier # 735 entre Presidente Montes y la Plata",
    phone: "52-52561 / 68350145",
    bookingUrl: "https://www.floresplazahotel.com/",
  },
  {
    name: "HOTEL OPORTO",
    stars: 3,
    description: "Ubicado a tan solo a dos cuadras de la plaza principal 10 de febrero",
    price: 350,
    currency: "Bs.",
    image: "/images/oporto.jpg",
    amenities: ["Baño privado", "Agua caliente 24Hrs", "Ascensor", "Wi-fi"],
    address: "Brasil #5021 Esquina 21 de Enero",
    phone: "52-82455",
    bookingUrl: "https://www.facebook.com/www.hoteloporto/",
  },
  {
    name: "HOTEL VIRGEN DEL SOCAVÓN",
    stars: 3,
    description: "Cuenta con terraza, sauna y una cafetería en la planta superior, con vistas panorámicas.",
    price: 350,
    currency: "Bs.",
    image: "/images/socavon.jpg",
    amenities: ["Ofrece desayunos", "conexión Wi-Fi gratuita", "terraza", "sauna", "cafetería"],
    address: "Junín #1179 Petot y Linares",
    phone: "52-82184 / 52-82185",
    bookingUrl: "https://www.facebook.com/VirgendelSocavon.Hotel.Oruro",
  },
  {
    name: "HOTEL CLAYMOR",
    stars: 1,
    description: "Ideal para viajeros que buscan comodidad, accesibilidad y una ubicación estratégica.",
    price: 310,
    currency: "Bs.",
    image: "/images/claymor.jpg",
    amenities: ["Wi-Fi", "Limpieza diaria", "Estacionamiento", "Ropa Blanca", "Desayuno Incluido", "Pet Friendly"],
    address: "Aroma #552 entre 6 de octubre y la Paz",
    phone: "52-83453 / 77931934",
    bookingUrl: "https://claymorhotel.com/",
  },
  {
    name: "HOTEL BOLIVIA",
    stars: 2,
    description: "Descanso y cultura en la tierra del Carnaval",
    price: 350,
    currency: "Bs.",
    image: "/images/bolivia.jpg",
    amenities: ["Baño privado", "Agua caliente 24Hrs", "Wi-fi"],
    address: "Rodríguez #131 y 6 de Agosto",
    phone: "52-41047 / 52-43375",
    bookingUrl: "https://www.facebook.com/HotelBolivia/",
  },
  {
    name: "HOTEL HOUSTON-ORURO",
    stars: 2,
    description: "Hotel Houston Oruro está ubicado en pleno centro de la ciudad, a dos cuadras de la plaza principal",
    price: 350,
    currency: "Bs.",
    image: "/images/houston.jpg",
    amenities: ["Baño privado", "Agua caliente 24Hrs", "Wi-fi"],
    address: "6 de Octubre #6144 Bolivary Sucre",
    phone: "52-80900 / 72487810",
    bookingUrl: "https://www.facebook.com/p/Hotel-Houston-Oruro-100078153636103/",
  }

];
