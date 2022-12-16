import { Request, Response } from "express";
import { CareRecipientJournalService } from "../../CareRecipientJournal/CareRecipientJournal.service";
import { CareRecipientEventRepositoryImpl } from "../../data/repositories/event.respository";

export function getCareRecipientJournal(req: Request, res: Response): void {
  const eventRepository = new CareRecipientEventRepositoryImpl();
  const journalService = new CareRecipientJournalService(eventRepository);

  void journalService
    .getJournalForCareRecipientId(req.params.careRecipientId)
    .then((journal) => {
      res.status(200).json({ data: journal.map((entry) => entry.toJson()) });
    });
}
