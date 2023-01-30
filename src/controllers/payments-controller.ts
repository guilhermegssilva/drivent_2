import { AuthenticatedRequest } from "@/middlewares";
import { CardData, TicketId } from "@/protocols";
import paymentsService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function postPaymentsFromUser(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.body as TicketId;

  const { cardData } = req.body as CardData;

  const userId = req.userId as number;

  const data = {
    ticketId, cardData
  };
  try {
    const payment = await paymentsService.postPaymentsFromUser(data, userId);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getPaymentFromTicket(req: AuthenticatedRequest, res: Response) {
  const  ticketId  = Number(req.query.ticketId) as unknown as number;

  const userId = req.userId as number;

  try {
    const payment = await paymentsService.getPaymentFromTicket(ticketId, userId);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.status(httpStatus.BAD_REQUEST).send({ message: "BAD REQUEST" });
  }
}
