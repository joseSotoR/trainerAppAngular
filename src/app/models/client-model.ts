export class Client {
  id: number;
  name: string;
  repReq: number;
  trainerId: number;

  constructor(id: number, name: string, repReq: number, trainerId: number) {
    this.id = id;
    this.name = name;
    this.repReq = repReq;
    this.trainerId = trainerId;
  }
}
