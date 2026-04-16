export interface Souvenir {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  precioPreventa: number;
  stock: number;
  imagen: string;
}

export interface PreventaConfig {
  descuento: number;
  fechaFin: string;
}

export interface Reservation {
  id: string;
  reservationCode: string;
  fullName: string;
  phone: string;
  club: string;
  isPreventa: boolean;
  items: ReservationItem[];
  total: number;
  createdAt: string;
  status: string;
}

export interface ReservationItem {
  id: string;
  quantity: number;
  unitPrice: number;
}