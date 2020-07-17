import { Injectable } from '@angular/core';


import { Trainer } from '../models/trainer-model';
import { Client } from '../models/client-model';


@Injectable({
  providedIn: 'root'
})
export class DataService {


  public trainers: Trainer[] = [
    new Trainer(1, 'Trainer1', 1, 0, 4.5, 'https://i.pinimg.com/236x/6b/e6/f8/6be6f8b7f766d5e8be2ed74ab23d871e--silhouette-vinyl-cutting-files.jpg'),
    new Trainer(2, 'Trainer2', 4, 0, 3.2, 'https://i.pinimg.com/236x/6b/e6/f8/6be6f8b7f766d5e8be2ed74ab23d871e--silhouette-vinyl-cutting-files.jpg'),
    new Trainer(3, 'Trainer3', 3, 0, 1.2, 'https://i.pinimg.com/236x/6b/e6/f8/6be6f8b7f766d5e8be2ed74ab23d871e--silhouette-vinyl-cutting-files.jpg'),
    new Trainer(4, 'Trainer4', 2, 0, 3.4, 'https://i.pinimg.com/236x/6b/e6/f8/6be6f8b7f766d5e8be2ed74ab23d871e--silhouette-vinyl-cutting-files.jpg'),
    new Trainer(5, 'Trainer5', 1, 0, 2.4, 'https://i.pinimg.com/236x/6b/e6/f8/6be6f8b7f766d5e8be2ed74ab23d871e--silhouette-vinyl-cutting-files.jpg'),
  ];
  public clients: Client[] = [

    new Client(1, 'Client1', 2.6, 0),
    new Client(2, 'Client2', 3.7, 0),
    new Client(3, 'Client3', 8.5, 0),
    new Client(4, 'Client4', 9.7, 0),
    new Client(5, 'Client5', 2.6, 0),
    new Client(6, 'Client6', 4.7, 0),
    new Client(7, 'Client7', 5.6, 0),
    new Client(8, 'Client8', 3.7, 0),
    new Client(9, 'Client9', 8.1, 0),
    new Client(10, 'Client10', 2.5, 0)

  ];

  constructor() { }

  public getAllTrainers(): Trainer[] {
    return this.trainers;
  }
  public updateTrainer(id, trainerObj): void {
    const ret = this.trainers.slice(0);
    ret[id - 1] = trainerObj;
    this.trainers = ret;
  }
  public getTrainerById(id): Trainer[] {
    return this.trainers.filter(trainer => trainer.id === id);
  }
  public getClientById(id): Client[] {
    return this.clients.filter(client => client.id === id);
  }
  public getClientByTrainerId(trainerId): Client[] {
    return this.clients.filter(client => { client.trainerId === trainerId });
  }
  public getAllClients(): Client[] {
    return this.clients;
  }
  public updateClient(id, clientObj): void {
    const ret = this.clients.slice(0);
    ret[id - 1] = clientObj;
    this.clients = ret;
  }
}








