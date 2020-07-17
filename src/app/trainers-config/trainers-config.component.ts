import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../services/data.service';
import { Trainer } from '../models/trainer-model';
import { Client } from '../models/client-model';

import { FormGroup, FormControl } from '@angular/forms';




@Component({
  selector: 'app-trainers-config',
  templateUrl: './trainers-config.component.html',
  styleUrls: ['./trainers-config.component.scss']
})
export class TrainersConfigComponent implements OnInit {

  trainers: Trainer[] = [];
  clients: Client[] = [];

  trainersForm = new FormGroup({
    trainer1: new FormGroup({
      name: new FormControl(''),
      reputation: new FormControl(''),
      places: new FormControl('')
    }),
    trainer2: new FormGroup({
      name: new FormControl(''),
      reputation: new FormControl(''),
      places: new FormControl('')
    }),
    trainer3: new FormGroup({
      name: new FormControl(''),
      reputation: new FormControl(''),
      places: new FormControl('')
    }),
    trainer4: new FormGroup({
      name: new FormControl(''),
      reputation: new FormControl(''),
      places: new FormControl('')
    }),
    trainer5: new FormGroup({
      name: new FormControl(''),
      reputation: new FormControl(''),
      places: new FormControl('')
    })
  });

  constructor(public dataService: DataService, private router: Router) {}



  ngOnInit(): void {
    this.getAllTrainers();
  }

  public getAllTrainers(): void {
    this.trainers = this.dataService.getAllTrainers();
  }
  public onSubmit(): void {
    const trainers = JSON.parse(JSON.stringify(this.trainersForm.value));
    let i = 1;
    for (const trainer in trainers) {
      const t = new Trainer(
        i,
        trainers[trainer].name,
        trainers[trainer].places,
        0,
        trainers[trainer].reputation,
        'https://i.pinimg.com/236x/6b/e6/f8/6be6f8b7f766d5e8be2ed74ab23d871e--silhouette-vinyl-cutting-files.jpg'
      );
      this.dataService.updateTrainer(t.id, t);
      i++;
    }
    this.router.navigate(['/results']);
  }


  public getAllClients(): void {
    this.clients = this.dataService.getAllClients();
  }
  public showClients(): void {
    this.getAllClients();
  }

}
