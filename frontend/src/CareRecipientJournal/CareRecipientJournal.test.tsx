import { render, screen } from '@testing-library/react'
import CareRecipientJournal from './CareRecipientJournal'
import { useFetchCareRecipientJournal } from './useFetchCareRecipientJournal'
import { JournalEntry } from './JournalEntry'

jest.mock('./useFetchCareRecipientJournal')
const mockedUseFetchJournalEntries = useFetchCareRecipientJournal as jest.MockedFunction<
  typeof useFetchCareRecipientJournal
>

describe('CareRecipientJournal', () => {
  it('renders with 2 entries', () => {
    // arrange
    const journalEntries: JournalEntry[] = [
      {
        date: '2020-01-01',
        observedMood: null,
      } as JournalEntry,
      {
        date: '2022-01-01',
        observedMood: null,
      } as JournalEntry,
    ]

    mockedUseFetchJournalEntries.mockReturnValue({ journalEntries, error: null, loading: false })

    const careRecipientId = 'foo'

    // act
    render(<CareRecipientJournal careRecipientId={careRecipientId} />)

    // assert
    expect(screen.getAllByRole('article')).toHaveLength(2)
    expect(mockedUseFetchJournalEntries).toHaveBeenCalledWith(careRecipientId)
  })
})
