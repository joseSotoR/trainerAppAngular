export class Trainer {
  id: number;
  name: string;
  plazas: number;
  plazasOcupadas: number;
  reputacion: number;
  imagenUrl: string;
  constructor(id: number, name: string, plazas: number, plazasOcupadas: number, reputacion: number, imagenUrl: string) {
    this.id = id;
    this.name = name;
    this.plazas = plazas;
    this.plazasOcupadas = plazasOcupadas;
    this.reputacion = reputacion;
    this.imagenUrl = imagenUrl;
  }
}
