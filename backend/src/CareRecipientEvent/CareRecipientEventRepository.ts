import { CareRecipientEvent } from "./CareRecipientEvent";

export interface CareRecipientEventRepository {
  findAllForCareRecipientId(
    careRecipientId: string
  ): Promise<CareRecipientEvent[]>;
}
