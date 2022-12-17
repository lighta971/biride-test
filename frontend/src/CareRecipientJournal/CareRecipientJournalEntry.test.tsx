import { render, screen } from '@testing-library/react'
import CareRecipientJournalEntry from './CareRecipientJournalEntry'
import { JournalEntry } from './JournalEntry'
import EventTypeDescription from './EventTypeDescription'

jest.mock('./EventTypeDescription')

describe('CareRecipientJournalEntry', () => {
  it('renders EventTypeDescription when there is an event', () => {
    // arrange
    const journalEntry = createJournalEntry({ hadVisit: true })
    mockEventTypeDescriptionComponent()

    // act
    render(<CareRecipientJournalEntry journalEntry={journalEntry} />)

    // assert
    expect(screen.queryAllByTestId('event-type-description')).toHaveLength(1)
  })
  it('does not render EventEntryDescription and display message when there is no event', () => {
    // arrange
    const journalEntry = createJournalEntry()
    mockEventTypeDescriptionComponent()

    // act
    render(<CareRecipientJournalEntry journalEntry={journalEntry} />)

    // assert
    expect(screen.getByText('There is nothing to report.')).toBeInTheDocument()
    expect(screen.queryByTestId('event-type-description')).not.toBeInTheDocument()
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

function mockEventTypeDescriptionComponent(): void {
  const MockedEventTypeDescription = EventTypeDescription as jest.MockedFunction<
    typeof EventTypeDescription
  >

  MockedEventTypeDescription.mockReturnValue(<div data-testid="event-type-description"></div>)
}
