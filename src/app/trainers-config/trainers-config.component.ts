import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service';
import { Trainer } from '../trainer';
import { Client } from '../client';

import { FormGroup, FormControl } from '@angular/forms';




@Component({
  selector: 'app-trainers-config',
  templateUrl: './trainers-config.component.html',
  styleUrls: ['./trainers-config.component.scss']
})
export class TrainersConfigComponent implements OnInit {

  trainers: Trainer[] = [];
  clients: Client[] = [];

  newTrainer: Trainer = {
    id: 0,
    name: "new",
    reputation: 0,
    places: 0,
    currentPlaces: 0
  }

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
  })

  constructor(public dataService: DataService, private router: Router) { }



  ngOnInit(): void {
    this.getAllTrainers()
  }

  getAllTrainers() {
    this.dataService.getAllTrainers().subscribe((data: Trainer[]) => {
      this.trainers = data;
    })
  }
  addTrainer() {

    this.dataService.createTrainer(this.newTrainer).subscribe(res => {
      this.getAllTrainers();
    })
  }
  onSubmit() {
    let trainers = JSON.parse(JSON.stringify(this.trainersForm.value));
    var i = 1;
    for (let trainer in trainers) {
      

      this.newTrainer.id = i;
      this.newTrainer.name = trainers[trainer].name;
      this.newTrainer.reputation = trainers[trainer].reputation;
      this.newTrainer.places = trainers[trainer].places;
      this.newTrainer.currentPlaces = trainers[trainer].currentPlaces;
      this.dataService.update(this.newTrainer.id, this.newTrainer).subscribe();
      i++
    }

    this.router.navigate(['/results']);
  }


  getAllClients() {
    this.dataService.getAllClients().subscribe((data: Client[]) => {
      this.clients = data;
    })
  }
  showClients() {
    this.getAllClients();
  }

}
