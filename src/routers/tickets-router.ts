import { Router } from "express";
import { tickets, ticketsTypes, postTicketFromUser } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { ticketSchema } from "@/schemas/ticket-schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", ticketsTypes)
  .get("/", tickets)
  .post("/", validateBody(ticketSchema), postTicketFromUser);
export { ticketsRouter };
