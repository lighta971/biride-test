import { render, screen } from '@testing-library/react'
import CareRecipientJournalEntry from './CareRecipientJournalEntry'
import { JournalEntry } from './JournalEntry'

describe('CareRecipientJournalEntry', () => {
  it('renders EventTypeDescription when there is an event', () => {
    // arrange
    const journalEntry = createJournalEntry({ hadVisit: true })

    // act
    render(<CareRecipientJournalEntry journalEntry={journalEntry} />)

    // assert
    expect(screen.getByText(/Your parent have had visitors today/)).toBeInTheDocument()
  })
  it('does not render EventEntryDescription and display message when there is no events', () => {
    // arrange
    const journalEntry = createJournalEntry()

    // act
    render(<CareRecipientJournalEntry journalEntry={journalEntry} />)

    // assert
    // only date as text in the document
    expect(screen.getAllByText(/.+/)).toHaveLength(2)
    expect(screen.getByText('Wed Jan 01 2020')).toBeInTheDocument()
    expect(screen.getByText('There is nothing to report.')).toBeInTheDocument()
  })
})

function createJournalEntry(entry: Partial<JournalEntry> = {}): JournalEntry {
  return {
    date: '2020-01-01',
    hadVisit: false,
    hadObservations: false,
    foodOrFluidIntakeChecked: false,
    hadMedicationProblem: false,
    hadAlertOrConcern: false,
    checkedIn: false,
    checkedOut: false,
    observedMood: null,
    ...entry,
  }
}
