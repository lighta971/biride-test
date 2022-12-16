import * as express from "express";
import { getCareRecipientJournal } from "./controllers/careRecipientJournal.controller";

export const routes = express.Router();

routes.get("/care-recipient-journal/:careRecipientId", getCareRecipientJournal);
