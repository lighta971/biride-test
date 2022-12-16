import { CareRecipientEvent } from "../../CareRecipientEvent/CareRecipientEvent";
import { CareRecipientEventRepository } from "../../CareRecipientEvent/CareRecipientEventRepository";
import { camelizeObjectKeys } from "../../utils/camelizeObjectKeys";
import mysqlConnection from "../mysql.connection";

export class CareRecipientEventRepositoryImpl
  implements CareRecipientEventRepository
{
  findAllForCareRecipientId(
    careRecipientId: string
  ): Promise<CareRecipientEvent[]> {
    const sqlQuery = `SELECT id, event_type, payload, timestamp FROM \`events\` WHERE care_recipient_id = ${mysqlConnection.escape(
      careRecipientId
    )} order by timestamp DESC`;

    return new Promise((resolve, reject) => {
      mysqlConnection.query(sqlQuery, (err, res) => {
        if (err) reject(err);
        else
          resolve(
            res.map((row: Record<string, any>) => ({
              ...camelizeObjectKeys(JSON.parse(row.payload)),
            }))
          );
      });
    });
  }
}
