export interface ResponseErrorInterface {
  status: boolean;
  msg: string;
}

export interface Worker {
  id: number;
  name: string;
  email: string;
  mobile: string;
  salary: number;
  advance: number;
  last_increment_amount: number;
  last_increment: string;
  salaryPerDay: number;
  salaryPerHour: number;
}
