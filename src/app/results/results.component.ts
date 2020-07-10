import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { Trainer } from '../trainer';
import { Client } from '../client';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  trainers: Trainer[] = [];
  clients: Client[] = [];
  valTot: Number;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

    this.getAllTrainers();
    
  }

  getAllTrainers() {
    this.dataService.getAllTrainers().subscribe((data: Trainer[]) => {
      this.trainers = data;
      this.getAllClients();
    })
  }

  getAllClients() {
    this.dataService.getAllClients().subscribe((data: Client[]) => {
      this.clients = data;
      this.setClientsToTrainers();

    })
  }

  checkLimitPlaces(idTrainer, maxPlazas) {
    var plazas = 0;
    for (let j = 0; j < this.clients.length; j++) {
      if (this.clients[j].trainer == idTrainer) {
        plazas++;
      }

    }
    if (plazas < Math.abs(maxPlazas)) { return true }
    else { return false }
  }
  updateCurrentPlaces(idTrainer) {
    for (let j = 0; j < this.trainers.length; j++) {
      if (this.trainers[j].id == idTrainer) {
        this.trainers[j].currentPlaces++;
      }
    }
  }
  getRep(idTrainer) {
    for (let j = 0; j < this.trainers.length; j++) {
      if (this.trainers[j].id == idTrainer) {
        return this.trainers[j].reputation
      }
    }
  }

  setClientsToTrainers() {
    let fullvallArr = [];

    for (let j = 0; j < this.clients.length; j++) {
      var client = this.clients[j];
      var controllerProxim = 10;
      for (let i = 0; i < this.trainers.length; i++) {
        var trainer = this.trainers[i];
        var rep = trainer.reputation;
        if (this.checkLimitPlaces(trainer.id,trainer.places)){
          if (Math.abs(rep - (client.reputationNeeded / 2)) < controllerProxim) {
            controllerProxim = Math.abs(rep - client.reputationNeeded / 2);
            client.trainer = trainer.id;
          }
          
        }
      }
      this.updateCurrentPlaces(client.trainer);
      this.dataService.update(trainer.id, trainer).subscribe();
      this.dataService.updateClient(client.id, client).subscribe();
      fullvallArr.push(
        [client.name, client.reputationNeeded / 2, this.getRep(client.trainer)]
      );
      
    }
    this.calcFullVal(fullvallArr);
  }

  calcFullVal(fullvallArr) {
    var arrayTotalUsu = [];
    for (var i = 0; i < fullvallArr.length; i++) {
      var totalUsu = 100;
      var dif = fullvallArr[i][1] - fullvallArr[i][2];
      if (dif > 0) {
        var restar = (dif / 0.5) * 5;
        totalUsu = totalUsu-restar
      }
      arrayTotalUsu.push(totalUsu)
    }
    var total = 0;
    for (var i = 0; i < arrayTotalUsu.length; i++) { total += arrayTotalUsu[i] }
    this.valTot = total / arrayTotalUsu.length;
  }

  filterItems(trainerid) {
    return this.clients.filter(x => x.trainer === trainerid)
  }
}
