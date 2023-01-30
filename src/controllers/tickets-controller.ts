import { AuthenticatedRequest } from "@/middlewares";
import ticketsValidation from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";


export async function tickets(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  try {
    const data = await ticketsValidation.tickets(userId);

    return res.status(httpStatus.OK).send({
      id: data.id,
      status: data.status,
      ticketTypeId: data.TicketType.id,
      enrollmentId: data.enrollmentId,
      TicketType: {
        id: data.TicketType.id,
        name: data.TicketType.name,
        price: data.TicketType.price,
        isRemote: data.TicketType.isRemote,
        includesHotel: data.TicketType.includesHotel,
        createdAt: data.TicketType.createdAt,
        updatedAt: data.TicketType.updatedAt,
      },
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
} 

export async function postTicketFromUser(req: AuthenticatedRequest, res: Response) {
  const ticketTypeId = req.body.ticketTypeId as number;

  const userId = req.userId;

  try {
    const data = await ticketsValidation.postTicketFromUser(userId, ticketTypeId);

    res.status(httpStatus.CREATED).send(data);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function ticketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const types = await ticketsValidation.ticketsTypes();

    if (types) {
      return res.status(httpStatus.OK).send(types);
    }
    return res.send(types);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send({});
  }
}




