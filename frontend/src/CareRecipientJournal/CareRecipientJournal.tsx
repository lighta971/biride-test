import { useFetchCareRecipientJournal } from './useFetchCareRecipientJournal'
import CareRecipientJournalEntry from './CareRecipientJournalEntry'

export default function CareRecipientJournal(props: CareRecipientJournalProps): JSX.Element {
  const { journalEntries, loading } = useFetchCareRecipientJournal(props.careRecipientId)

  return (
    <div>
      <h1>Your family member journal</h1>
      {loading && <p>Loading</p>}
      {journalEntries.map((entry) => {
        return (
          <article key={entry.date}>
            <CareRecipientJournalEntry journalEntry={entry} />
            <br />
          </article>
        )
      })}
    </div>
  )
}

export type CareRecipientJournalProps = {
  careRecipientId: string
}
