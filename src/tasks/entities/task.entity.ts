export enum Status {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
  }


export class Task {
    id: number;
    title: string;
    status: Status;

}
