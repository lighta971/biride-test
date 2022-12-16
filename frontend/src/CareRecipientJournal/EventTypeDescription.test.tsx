import { render, screen } from '@testing-library/react'
import EventTypeDescription from './EventTypeDescription'
import { JournalEntry } from './JournalEntry'

describe('EventTypeDescription', () => {
  it.each`
    eventType                     | expectedText
    ${'hadVisit'}                 | ${'Your parents have had visitors today'}
    ${'hadObservations'}          | ${'The nurses have made various observations'}
    ${'foodOrFluidIntakeChecked'} | ${`A nurse has been monitoring your loved one's food and`}
    ${'hadMedicationProblem'}     | ${`Your parent may have difficulty taking their medication`}
    ${'hadAlertOrConcern'}        | ${`Some concern has been raised`}
    ${'checkedOut'}               | ${`Your family member has left the care facility`}
    ${'checkedIn'}                | ${`Your parents checked into the care facility and entered his room.`}
    ${'observedMood'}             | ${`We observed your loved one's mood and noticed that he seemed to be`}
  `('renders description for $eventType', ({ eventType, expectedText }) => {
    // arrange
    const journalEntry = createJournalEntry()

    // act
    render(<EventTypeDescription type={eventType} journalEntry={journalEntry} />)

    // assert
    expect(screen.getByText(new RegExp(expectedText))).toBeInTheDocument()
  })
  it.each`
    eventType                     | expectedText
    ${'hadVisit'}                 | ${'Visit received'}
    ${'hadObservations'}          | ${'Observations made'}
    ${'foodOrFluidIntakeChecked'} | ${`Alimentation observed`}
    ${'hadMedicationProblem'}     | ${`Medication intake issue observed`}
    ${'hadAlertOrConcern'}        | ${`Concern raised`}
    ${'checkedOut'}               | ${`Check-out`}
    ${'checkedIn'}                | ${`Check-in`}
    ${'observedMood'}             | ${`Mood observed`}
  `('renders title for $eventType', ({ eventType, expectedText }) => {
    // arrange
    const journalEntry = createJournalEntry()

    // act
    render(<EventTypeDescription type={eventType} journalEntry={journalEntry} />)

    // assert
    expect(screen.getByText(new RegExp(expectedText))).toBeInTheDocument()
  })

  it('render observed mood description with given mood', () => {
    // arrange
    const eventType = 'observedMood'
    const journalEntry = createJournalEntry({ observedMood: 'happy' })

    // act
    render(<EventTypeDescription type={eventType} journalEntry={journalEntry} />)

    // assert
    const expectedText = `We observed your loved one's mood and noticed that he seemed to be happy`
    expect(screen.getByText(new RegExp(expectedText))).toBeInTheDocument()
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
