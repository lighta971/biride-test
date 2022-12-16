import { CareRecipientEvent } from "../CareRecipientEvent/CareRecipientEvent";
import {
  CareRecipientJournalEntry,
  JournalEntryJson,
} from "./CareRecipientJournalEntry";

describe("Care recipient journal entry", () => {
  test.each`
    objectKey                     | eventType                                          | expectedResult
    ${"hadVisit"}                 | ${"visit_completed"}                               | ${true}
    ${"hadVisit"}                 | ${"foo"}                                           | ${false}
    ${"hadObservations"}          | ${"incontinence_pad_observation"}                  | ${true}
    ${"hadObservations"}          | ${"general_observation"}                           | ${true}
    ${"hadObservations"}          | ${"mental_health_observation"}                     | ${true}
    ${"hadObservations"}          | ${"catheter_observation"}                          | ${true}
    ${"hadObservations"}          | ${"foo"}                                           | ${false}
    ${"foodOrFluidIntakeChecked"} | ${"food_intake_observation"}                       | ${true}
    ${"foodOrFluidIntakeChecked"} | ${"fluid_intake_observation"}                      | ${true}
    ${"foodOrFluidIntakeChecked"} | ${"foo"}                                           | ${false}
    ${"hadMedicationProblem"}     | ${"no_medication_observation_received"}            | ${true}
    ${"hadMedicationProblem"}     | ${"regular_medication_not_taken"}                  | ${true}
    ${"hadMedicationProblem"}     | ${"foo"}                                           | ${false}
    ${"hadAlertOrConcern"}        | ${"alert_raised"}                                  | ${true}
    ${"hadAlertOrConcern"}        | ${"concern_raised"}                                | ${true}
    ${"hadAlertOrConcern"}        | ${"foo"}                                           | ${false}
    ${"checkedIn"}                | ${"check_in"}                                      | ${true}
    ${"checkedIn"}                | ${"foo"}                                           | ${false}
    ${"checkedOut"}               | ${"check_out"}                                     | ${true}
    ${"checkedOut"}               | ${"foo"}                                           | ${false}
    ${"observedMood"}             | ${{ eventType: "mood_observation", mood: "okay" }} | ${"okay"}
    ${"observedMood"}             | ${"foo"}                                           | ${null}
  `(
    "toArray().$objectKey is $expectedResult when $eventType event exists",
    ({ objectKey, eventType, expectedResult }) => {
      // arrange
      const events = createEvents(
        typeof eventType === "string" ? { eventType } : eventType
      );

      // act
      const actual = new CareRecipientJournalEntry("foo", events).toJson();

      // assert
      expect(actual).toStrictEqual(
        createEntryObject({
          [objectKey]: expectedResult,
        })
      );
    }
  );
});

function createEntryObject(
  overrides: Partial<JournalEntryJson>
): JournalEntryJson {
  return {
    date: "foo",
    hadVisit: false,
    hadObservations: false,
    foodOrFluidIntakeChecked: false,
    hadMedicationProblem: false,
    hadAlertOrConcern: false,
    checkedIn: false,
    checkedOut: false,
    observedMood: null,
    ...overrides,
  };
}

function createEvents(
  overrides: Partial<CareRecipientEvent>
): CareRecipientEvent[] {
  return [
    {
      id: "foo",
      eventType: "food_intake_observation",
      timestamp: "foo",
      ...overrides,
    },
  ];
}
