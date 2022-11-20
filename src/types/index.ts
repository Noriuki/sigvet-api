export enum Roles {
  receptionist,
  doctor,
  admin,
}

export enum AppointmentStatus {
  open,
  ongoing,
  done,
  canceled,
}

export enum PaymentStatus {
  paid,
  open,
  canceled,
}

export enum ServiceCategory {
  Exam,
  Cirurgy,
  Product,
  Petshop,
}

export enum AnimalSize {
  small,
  medium,
  large,
}

export type AnimalSex = 'M' | 'F';
