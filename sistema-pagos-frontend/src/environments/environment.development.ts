export interface Student{
  id:string;
  name:string;
  lastname: string;
  codigo: string;
  programaid: string;
  photo: string;
}
export interface Pago {
  id:number;
  fecha: string;
  cantidad: number;
  pagosstatus: string;
  tipopagao: string;
  file: string;
  studentid: Student;
}
export enum PaymentType {
EFECTIVO=0, CHEQUE=1, TRANSFERENCIA=2, DEPOSITO=3
}
export enum PaymentStatus {
CREADO=0,VALIDADO=1, RECHAZADO=2
}
