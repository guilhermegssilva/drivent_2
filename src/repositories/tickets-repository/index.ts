import { prisma } from "@/config";
import {  TicketSituation } from "@/protocols";
import { TicketStatus, TicketType } from "@prisma/client";

async function createTicket(enrollmentId: number, ticketTypeId: number, status: TicketStatus) {
  return await prisma.ticket.create({
    data: { enrollmentId, ticketTypeId, status },
    select:
        {
          id: true,
          status: true,
          ticketTypeId: true,
          enrollmentId: true,
          TicketType: true,
          createdAt: true,
          updatedAt: true,
        }
  });
}

async function getTypesOfTickets(): Promise<TicketType[]> {
  return await prisma.ticketType.findMany();
}

async function getTicketsFromUserId(userId: number): Promise<TicketSituation> {
  return await prisma.ticket.findFirst({ where: { Enrollment: { userId } }, include: { TicketType: true } });
}

async function findTicketId(id: number) {
  return await prisma.ticket.findFirst({ where: { id }, include: { Enrollment: true, TicketType: true } });
}

async function findTicket(id: number) {
  return await prisma.ticket.findFirst({ where: { id }, include: { Enrollment: true, TicketType: true } });
}

async function updateStatusFromTicket(ticketId: number ) {
  return await prisma.ticket.update({ where: { id: ticketId }, data: {  status: "PAID" } });
}

const ticketsRepository = {
  getTypesOfTickets,
  createTicket,
  getTicketsFromUserId,
  findTicket,
  updateStatusFromTicket,
  findTicketId
};

export default ticketsRepository;
