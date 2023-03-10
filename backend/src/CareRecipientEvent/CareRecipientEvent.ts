import { Timestamp, UUID } from "../core/general";

export const eventTypes = [
  "fluid_intake_observation",
  "task_completed",
  "physical_health_observation",
  "visit_completed",
  "check_out",
  "mood_observation",
  "regular_medication_taken",
  "alert_raised",
  "no_medication_observation_received",
  "incontinence_pad_observation",
  "check_in",
  "general_observation",
  "regular_medication_not_taken",
  "food_intake_observation",
  "task_completion_reverted",
  "mental_health_observation",
  "medication_schedule_updated",
  "visit_cancelled",
  "regular_medication_maybe_taken",
  "medication_schedule_created",
  "alert_qualified",
  "task_schedule_created",
  "concern_raised",
  "regular_medication_partially_taken",
  "catheter_observation",
  "toilet_visit_recorded",
] as const;

export const moods = ["okay", "happy", "sad"] as const;

export type CareRecipientEventType = typeof eventTypes[number];
export type CareRecipientMood = typeof moods[number];

export type CareRecipientEvent = {
  id: UUID;
  eventType: CareRecipientEventType;
  timestamp: Timestamp;
  mood?: CareRecipientMood,
  [key: string]: any;
};
