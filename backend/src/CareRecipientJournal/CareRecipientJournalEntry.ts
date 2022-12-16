import {
  CareRecipientEvent,
  CareRecipientMood,
} from "../CareRecipientEvent/CareRecipientEvent";

export type JournalEntryEventTypes =
  | "observedMood"
  | "hadVisit"
  | "hadObservations"
  | "foodOrFluidIntakeChecked"
  | "hadMedicationProblem"
  | "hadAlertOrConcern"
  | "checkedIn"
  | "checkedOut";

export type JournalEntryJson = {
  date: string;
  hadVisit: boolean; // visit_completed
  hadObservations: boolean; // all observations
  foodOrFluidIntakeChecked: boolean; // food_intake_observation - fluid_intake_observation
  hadMedicationProblem: boolean; // no_medication_observation_received - regular_medication_not_taken
  hadAlertOrConcern: boolean; // alert_raised - concern_raised
  checkedIn: boolean; // check_in
  checkedOut: boolean; // check_out
  observedMood: CareRecipientMood | null; // mood_observation
};

export class CareRecipientJournalEntry {
  readonly date;
  #events: CareRecipientEvent[];

  constructor(date: string, events: CareRecipientEvent[]) {
    this.#events = events;
    this.date = date;
  }

  get hadVisit(): boolean {
    return this.#events.some((event) => event.eventType === "visit_completed");
  }

  get hadObservations(): boolean {
    return this.#events.some((event) =>
      [
        "incontinence_pad_observation",
        "general_observation",
        "mental_health_observation",
        "catheter_observation",
      ].includes(event.eventType)
    );
  }

  get foodOrFluidIntakeChecked(): boolean {
    return this.#events.some((event) =>
      ["food_intake_observation", "fluid_intake_observation"].includes(
        event.eventType
      )
    );
  }

  get hadMedicationProblem(): boolean {
    return this.#events.some((event) =>
      [
        "no_medication_observation_received",
        "regular_medication_not_taken",
      ].includes(event.eventType)
    );
  }

  get hadAlertOrConcern(): boolean {
    return this.#events.some((event) =>
      ["alert_raised", "concern_raised"].includes(event.eventType)
    );
  }

  get checkedIn(): boolean {
    return this.#events.some((event) => event.eventType === "check_in");
  }

  get checkedOut(): boolean {
    return this.#events.some((event) => event.eventType === "check_out");
  }

  get observedMood(): CareRecipientMood | null {
    return (
      this.#events.find((event) => event.eventType === "mood_observation")
        ?.mood || null
    );
  }

  toJson(): JournalEntryJson {
    return {
      date: this.date,
      hadVisit: this.hadVisit,
      hadObservations: this.hadObservations,
      foodOrFluidIntakeChecked: this.foodOrFluidIntakeChecked,
      hadMedicationProblem: this.hadMedicationProblem,
      hadAlertOrConcern: this.hadAlertOrConcern,
      checkedIn: this.checkedIn,
      checkedOut: this.checkedOut,
      observedMood: this.observedMood,
    };
  }
}
