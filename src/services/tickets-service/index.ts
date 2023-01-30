import { notFoundError } from "@/errors";
import { TicketSituation } from "@/protocols";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { TicketType } from "@prisma/client";


async function ticketsTypes(): Promise<TicketType[]> {
  const data = await ticketsRepository.getTypesOfTickets();

  return data;
}

async function tickets(userId: number) {
  const data = await ticketsRepository.getTicketsFromUserId(userId);

  if(!data) {
    throw notFoundError();
  }
  return data;
}

async function postTicketFromUser(userId: number, ticketTypeId: number): Promise<TicketSituation> {
  const userEnrollment = await enrollmentRepository.findUserEnrollment(userId);
  if (!userEnrollment) throw notFoundError();
  const status = "RESERVED";
  return await ticketsRepository.createTicket(userEnrollment.id, ticketTypeId, status);
}

const ticketsValidation = {
  ticketsTypes,
  tickets,
  postTicketFromUser
};

export default ticketsValidation;
