import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';
import { Trainer } from '../models/trainer-model';
import { Client } from '../models/client-model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  newTrainer: Trainer;
  newClient: Client;

  trainers: Trainer[] = [];
  clients: Client[] = [];
  valTot: number;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {


    this.getAllTrainers();
    this.getAllClients();
    this.setClientsToTrainers();
  }

  public getAllTrainers(): void {
        this.trainers = this.dataService.getAllTrainers();
  }

  public getAllClients(): void {
    this.clients = this.dataService.getAllClients();
  }

  public setClientsToTrainers(): void {
    const arraySatisf = [];
    for (const client of this.clients) {
      const clientRepReq = client.repReq / 2;
      let repDif = 10;
      let trainerToClientId = 0;
      for (const trainer of this.trainers) {
        const trainerRep = trainer.reputacion;
        if (trainer.plazasOcupadas < trainer.plazas && Math.abs(trainerRep - clientRepReq) < repDif) {
          repDif = Math.abs(trainerRep - clientRepReq);
          trainerToClientId = trainer.id;
        }
      }
      this.updateTrainerPlaces(trainerToClientId);
      this.updateCurrentClient(client, trainerToClientId);

      arraySatisf.push(repDif);

    }
    this.getAllTrainers();
    this.calcSatisfGlob(arraySatisf);
  }


  public updateTrainerPlaces(id): void {
    this.newTrainer = this.dataService.getTrainerById(id)[0];
    this.newTrainer.plazasOcupadas += 1;
    this.dataService.updateTrainer(id, this.newTrainer);
  }

  public updateCurrentClient(client, trainerId): void {
    this.newClient = this.dataService.getClientById(client.id)[0];
    this.newClient.trainerId = trainerId;
    this.dataService.updateClient(client.id, this.newClient);
  }

  public filterItems(trainerid): Client[] {
    return this.clients.filter(x => x.trainerId === trainerid);
  }

  public calcSatisfGlob(arraySatisf): void {
    let totalSatisf = 0;
    for (let i = 0; i < arraySatisf.length; i++) {
      const userSatisf = (100 - Math.round(arraySatisf[i] / 0.5) * 10);
      totalSatisf += userSatisf;
    }
    this.valTot = totalSatisf / arraySatisf.length;
  }
}
