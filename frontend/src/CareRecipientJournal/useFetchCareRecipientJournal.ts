import { useEffect, useState } from 'react'
import { fetchJournalEntriesByCareRecipientId } from '../api'
import { JournalEntry } from './JournalEntry'

export function useFetchCareRecipientJournal(careRecipientId: string): UseFetchJournalEntriesState {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([])
  const [error, setError] = useState<unknown>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchJournalEntriesByCareRecipientId(careRecipientId)
      .then((journalEntries) => {
        setJournalEntries(journalEntries)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setError(error)
        setLoading(false)
      })
  }, [careRecipientId])

  return { journalEntries, error, loading }
}

// could be added loading and error state
type UseFetchJournalEntriesState = {
  journalEntries: JournalEntry[]
  error: unknown
  loading: boolean
}
