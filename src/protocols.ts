import { TicketType } from "@prisma/client";

export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,

};

export type AddressEnrollment = {
  logradouro: string,
  complemento: string,
  bairro: string,
  cidade: string,
  uf: string,
  error?: string
};

export type RequestError = {
  status: number,
  data: object | null,
  statusText: string,
  name: string,
  message: string,
};

export type TicketTypeId = {
  ticketTypeId: number
};

export type CreatePayment = {
  ticketId: number,
  value: number,
  cardIssuer: string,
  cardLastDigits: string
}

export type Payments = {
  ticketId: number,
  cardData: {
    issuer: string,
    number: number,
    name: string,
    expirationDate: Date,
    cvv: number
  }
};

export type PaymentResponse = {
    id: number,
    ticketId: number,
    value: number,
    cardIssuer: string,
    cardLastDigits: string,
    createdAt: Date,
    updatedAt: Date
  }

  export type TicketSituation = {
    id: number,
    status: string, 
    ticketTypeId: number,
    enrollmentId: number,
    TicketType: TicketType,
    createdAt: Date,
    updatedAt: Date,
  };

export type CardData = Omit<Payments, "ticketId">
export type TicketId = Omit<Payments, "cardData">

