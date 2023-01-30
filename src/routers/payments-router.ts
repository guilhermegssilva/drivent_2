import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getPaymentFromTicket, postPaymentsFromUser } from "@/controllers";
import { paymentsSchema } from "@/schemas";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPaymentFromTicket)
  .post("/process", validateBody(paymentsSchema), postPaymentsFromUser);

export { paymentsRouter };
