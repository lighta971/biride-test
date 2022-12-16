import { CareRecipientEventRepository } from "../CareRecipientEvent/CareRecipientEventRepository";
import { groupBy } from "../utils/groupBy";
import { CareRecipientJournal } from "./CareRecipientJournal";
import { CareRecipientJournalEntry } from "./CareRecipientJournalEntry";

export class CareRecipientJournalService {
  #eventRepository: CareRecipientEventRepository;

  constructor(eventRepository: CareRecipientEventRepository) {
    this.#eventRepository = eventRepository;
  }

  async getJournalForCareRecipientId(
    careRecipientId: string
  ): Promise<CareRecipientJournal> {
    const events = await this.#eventRepository.findAllForCareRecipientId(
      careRecipientId
    );

    const groupedEvents = groupBy(
      events,
      (event) => event.timestamp.split(" ")[0]
    );

    const journal = Object.values(groupedEvents).map(
      (group) => new CareRecipientJournalEntry(group[0].timestamp, group)
    );

    return journal;
  }
}
