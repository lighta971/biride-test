import { getCareRecipientJournal } from "./careRecipientJournal.controller";
import { request, Request, response, Response } from "express";
import { CareRecipientJournalService } from "../../CareRecipientJournal/CareRecipientJournal.service";
import { CareRecipientJournal } from "../../CareRecipientJournal/CareRecipientJournal";
import { CareRecipientJournalEntry } from "../../CareRecipientJournal/CareRecipientJournalEntry";

jest.mock("../../CareRecipientJournal/CareRecipientJournal.service");

describe("care recipient journal", () => {
  it("return journal json for a given care recipient", async () => {
    // arrange
    const response = createResponseSpy();
    const careRecipientId = "care-recipient-foo";
    const request = createRequestMock({
      careRecipientId,
    });

    const journal: CareRecipientJournal = [
      new CareRecipientJournalEntry("foo", [
        {
          id: "foo",
          eventType: "alert_qualified",
          payload: {},
          timestamp: "foo",
        },
      ]),
    ];
    const getJournalForCareRecipientIdStub = givenJournal(journal);

    // act
    await getCareRecipientJournal(request as Request, response);

    // assert
    expect(getJournalForCareRecipientIdStub).toHaveBeenCalledWith(
      careRecipientId
    );
    expect(response.json).toHaveBeenCalledWith({
      data: journal.map((entry) => entry.toArray()),
    });
    expect(response.status).toHaveBeenCalledWith(200);
  });
});

function givenJournal(journal: CareRecipientJournal): jest.Mocked<any> {
  return jest
    .spyOn(
      CareRecipientJournalService.prototype,
      "getJournalForCareRecipientId"
    )
    .mockResolvedValue(journal);
}

function createResponseSpy(): Response {
  const mockedResponse = response as jest.Mocked<Response>;
  jest.spyOn(mockedResponse, "status").mockReturnValue(mockedResponse);
  jest.spyOn(mockedResponse, "json").mockReturnValue(mockedResponse);

  return mockedResponse;
}

function createRequestMock(requestParams: { [key: string]: string }): Request {
  const mockedRequest = request as jest.Mocked<Request>;
  mockedRequest.params = requestParams;

  return mockedRequest;
}
