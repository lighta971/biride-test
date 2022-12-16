import { JournalEntry } from './CareRecipientJournal/JournalEntry'
import { BASE_API } from './constants'

export async function fetchJournalEntriesByCareRecipientId(
  careRecipientId: string,
): Promise<JournalEntry[]> {
  const response = await fetch(`${BASE_API}/care-recipient-journal/${careRecipientId}`)

  const data: FetchJournalEntriesByCareRecipientIdResponse = await response.json()

  if (response.ok) {
    return Promise.resolve(data.data)
  } else {
    const error = new Error('Unknown error')
    return Promise.reject(error)
  }
}

type FetchJournalEntriesByCareRecipientIdResponse = {
  data: JournalEntry[]
}
