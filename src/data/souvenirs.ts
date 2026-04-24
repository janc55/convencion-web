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

export const preventaConfig: PreventaConfig = {
  descuento: 15,
  fechaFin: "2026-04-26",
};

export const souvenirs: Souvenir[] = [
  {
    id: "polera",
    nombre: "Polera Convención",
    descripcion: "Polera oficial de la Convención Lions Bolivia 2026",
    precio: 100,
    precioPreventa: 85,
    stock: 25,
    imagen: "/store/polera.png",
  },
  {
    id: "gorra-convencion",
    nombre: "Gorra Convención",
    descripcion: "Gorra tipo camionero con diseño sublimado",
    precio: 46,
    precioPreventa: 39,
    stock: 25,
    imagen: "/store/gorra-2.png",
  },
  {
    id: "gorra-leones",
    nombre: "Gorra Leones",
    descripcion: "Gorra con logo bordado de Lions Bolivia",
    precio: 66,
    precioPreventa: 56,
    stock: 25,
    imagen: "/store/gorra-1.png",
  },
  {
    id: "llavero-cinta",
    nombre: "Llavero CINTA",
    descripcion: "Llavero de cinta con diseño oficial",
    precio: 12,
    precioPreventa: 10,
    stock: 25,
    imagen: "/store/llavero.png",
  },
  {
    id: "abridor",
    nombre: "Pin Llavero Abridor",
    descripcion: "Pin llavero abridor de cerveza (58mm)",
    precio: 14,
    precioPreventa: 12,
    stock: 25,
    imagen: "/store/abridor.png",
  },
  {
    id: "tomatodo",
    nombre: "Tomatodo Doble Tapa",
    descripcion: "Tomatodo de 750ml con doble tapa",
    precio: 70,
    precioPreventa: 59,
    stock: 25,
    imagen: "/store/tomatodo.png",
  },
  {
    id: "taza",
    nombre: "Taza Cilíndrica",
    descripcion: "Taza cilíndrica de 11oz con diseño oficial",
    precio: 40,
    precioPreventa: 34,
    stock: 25,
    imagen: "/store/taza.png",
  },
];

export function getPrecioConDescuento(precio: number): number {
  const now = new Date();
  const fin = new Date(preventaConfig.fechaFin);
  if (now <= fin) {
    return precio * (1 - preventaConfig.descuento / 100);
  }
  return precio;
}