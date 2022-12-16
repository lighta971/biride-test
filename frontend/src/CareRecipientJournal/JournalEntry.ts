export type ObservedMood = 'okay' | 'happy' | 'sad'

export type JournalEntryEventTypes =
  | 'observedMood'
  | 'hadVisit'
  | 'hadObservations'
  | 'foodOrFluidIntakeChecked'
  | 'hadMedicationProblem'
  | 'hadAlertOrConcern'
  | 'checkedIn'
  | 'checkedOut'

export type JournalEntry = {
  date: string
  hadVisit: boolean // visit_completed
  hadObservations: boolean // all observations
  foodOrFluidIntakeChecked: boolean // food_intake_observation - fluid_intake_observation
  hadMedicationProblem: boolean // no_medication_observation_received - regular_medication_not_taken
  hadAlertOrConcern: boolean // alert_raised - concern_raised
  checkedIn: boolean // check_in
  checkedOut: boolean // check_out
  observedMood: ObservedMood | null // mood_observation
}
