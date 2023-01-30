import { notFoundError, unauthorizedError, requestError } from "@/errors";
import { Payments, PaymentResponse } from "@/protocols";
import ticketsRepository from "@/repositories/tickets-repository";
import paymentsRepository from "@/repositories/payments-repository";


async function postPaymentsFromUser(data: Payments, userId: number): Promise<PaymentResponse> {
  const ticket = await ticketsRepository.findTicket(data.ticketId);

  if (!ticket) throw notFoundError();

  if (ticket.Enrollment.userId !== userId) throw unauthorizedError();

  const Object = {
    ticketId: data.ticketId,
    value: ticket.TicketType.price,
    cardIssuer: data.cardData.issuer,
    cardLastDigits: data.cardData.number.toString().slice(-4)
  };

  const paymentResponse = await paymentsRepository.createPayment(Object);
  if (!paymentResponse) throw notFoundError();

  await ticketsRepository.updateStatusFromTicket(ticket.id);
  return paymentResponse;
}


async function getPaymentFromTicket(ticketId: number, userId: number): Promise<PaymentResponse> {
  if(!ticketId) throw requestError(400, "");
  const ticket = await ticketsRepository.findTicketId(ticketId);

  if (!ticket) throw notFoundError(); 

  if (ticket.Enrollment.userId !== userId) throw unauthorizedError(); 

  const paymentResponse = await paymentsRepository.findPaymentFromUser(ticketId);
  if (!paymentResponse) throw notFoundError();
  return paymentResponse;
}

const paymentsService = {
  postPaymentsFromUser,
  getPaymentFromTicket
};

export default paymentsService;
