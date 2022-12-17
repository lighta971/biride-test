import { render, screen } from '@testing-library/react'
import CareRecipientJournal from './CareRecipientJournal'
import {
  useFetchCareRecipientJournal,
  UseFetchJournalEntriesState,
} from './useFetchCareRecipientJournal'
import CareRecipientJournalEntry from './CareRecipientJournalEntry'

import { JournalEntry } from './JournalEntry'

jest.mock('./CareRecipientJournalEntry')
jest.mock('./useFetchCareRecipientJournal')

describe('CareRecipientJournal', () => {
  it('renders 2 JournalEntryComponent when api returns 2 entries', () => {
    // arrange
    const journalEntries = createJournalEntries()
    const careRecipientId = 'foo'

    const mockedUseFetchJournalEntries = mockUseFetchJournalEntries({
      journalEntries,
      error: null,
      loading: false,
    })
    mockCareRecipientJournalEntryComponent()

    // act
    render(<CareRecipientJournal careRecipientId={careRecipientId} />)

    // assert
    expect(screen.queryAllByTestId('journal-entry')).toHaveLength(2)
    expect(mockedUseFetchJournalEntries).toHaveBeenCalledWith(careRecipientId)
  })

  // it('renders loading indicator', () => {})
  // it('renders empty result message', () => {})
})

function mockCareRecipientJournalEntryComponent(): void {
  const MockedCareRecipientJournalEntry = CareRecipientJournalEntry as jest.MockedFunction<
    typeof CareRecipientJournalEntry
  >
  MockedCareRecipientJournalEntry.mockReturnValue(
    <div data-testid="journal-entry">journal-entry</div>,
  )
}

function mockUseFetchJournalEntries(
  givenState: UseFetchJournalEntriesState,
): jest.MockedFunction<typeof useFetchCareRecipientJournal> {
  const mockedUseFetchJournalEntries = useFetchCareRecipientJournal as jest.MockedFunction<
    typeof useFetchCareRecipientJournal
  >
  mockedUseFetchJournalEntries.mockReturnValue(givenState)

  return mockedUseFetchJournalEntries
}

function createJournalEntries(): JournalEntry[] {
  return [
    {
      date: '2020-01-01',
      observedMood: null,
    } as JournalEntry,
    {
      date: '2022-01-01',
      observedMood: null,
    } as JournalEntry,
  ]
}
