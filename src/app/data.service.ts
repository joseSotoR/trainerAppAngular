import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Trainer } from './trainer';
import { Client } from './client';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiServer = "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  createTrainer(trainer): Observable<Trainer> {
    return this.httpClient.post<Trainer>(this.apiServer + '/trainers/', JSON.stringify(trainer), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getTrainerById(id): Observable<Trainer> {
    return this.httpClient.get<Trainer>(this.apiServer + '/trainers/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllTrainers(): Observable<Trainer[]> {
    return this.httpClient.get<Trainer[]>(this.apiServer + '/trainers/')
      .pipe(
        catchError(this.errorHandler)
      )
  }
  update(id, trainer): Observable<Trainer> {
    //console.log("entro")
    return this.httpClient.put<Trainer>(this.apiServer + '/trainers/' + id, JSON.stringify(trainer), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  delete(id) {
    return this.httpClient.delete<Trainer>(this.apiServer + '/trainers/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  getClientById(id): Observable<Client> {
    return this.httpClient.get<Client>(this.apiServer + '/clients/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.apiServer + '/clients/')
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateClient(id, client): Observable<Trainer> {
    return this.httpClient.put<Trainer>(this.apiServer + '/clients/' + id, JSON.stringify(client), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}








