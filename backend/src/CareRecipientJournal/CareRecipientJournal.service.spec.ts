import { CareRecipientJournalService } from "./CareRecipientJournal.service";
import { CareRecipientEventRepository } from "../CareRecipientEvent/CareRecipientEventRepository";
import { CareRecipientJournalEntry } from "./CareRecipientJournalEntry";
import { CareRecipientEvent } from "../CareRecipientEvent/CareRecipientEvent";

describe("Care recipient journal service", () => {
  test("getJournalForCareRecipient returns CareRecipientJournal results", async () => {
    // arrange
    const events: CareRecipientEvent[] = [
      {
        id: "bar",
        eventType: "food_intake_observation",
        timestamp: "2022-01-02",
      },
      {
        id: "foo",
        eventType: "food_intake_observation",
        timestamp: "2022-01-01",
      },
    ];

    const eventRepository = {} as jest.Mocked<CareRecipientEventRepository>;
    eventRepository.findAllForCareRecipientId = jest
      .fn()
      .mockResolvedValue(events);

    const careRecipientId = "foo-id";
    const journalService = new CareRecipientJournalService(eventRepository);

    // act
    const actual = await journalService.getJournalForCareRecipientId(
      careRecipientId
    );

    // assert
    const expectedJournal = [
      new CareRecipientJournalEntry("2022-01-02", [events[0]]),
      new CareRecipientJournalEntry("2022-01-01", [events[1]]),
    ];
    expect(actual).toEqual(expectedJournal);
  });
});
