import { Card, CardContent, Typography } from '@mui/material'
import styled from '@emotion/styled'
import { JournalEntry, JournalEntryEventTypes } from './JournalEntry'

const Dot = styled.span`
  color: orange;
  font-size: 1.2em;
`

export default function EventTypeDescription(props: EventTypeDescriptionProps): JSX.Element {
  let description = descriptionDictionnary[props.type]
  const title = titleDictionnary[props.type]
  if (props.type === 'observedMood') description += ` ${props.journalEntry.observedMood}`

  return (
    <Card key={props.type}>
      <CardContent>
        <Typography gutterBottom>
          <Dot>&#x2022;</Dot> {title}{' '}
        </Typography>
        <Typography sx={{ fontSize: 13 }} color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}

type EventTypeDescriptionProps = {
  type: JournalEntryEventTypes
  journalEntry: JournalEntry
}

const descriptionDictionnary = {
  hadObservations:
    'The nurses have made various observations, ranging from general observations to those regarding mental health, incontinence pads, and catheters. These observations help the care provider to enhance the quality of life for your beloved one.',
  hadVisit: 'Your parents have had visitors today.',
  foodOrFluidIntakeChecked:
    "A nurse has been monitoring your loved one's food and liquid intake, as seniors experience a decrease in appetite and sometimes a loss of taste, as well as feeling less thirsty.",
  hadMedicationProblem:
    'Your parent may have difficulty taking their medication. A nurse will provide follow-up support to help him take it as prescribed.',
  hadAlertOrConcern:
    'Some concern has been raised about your family member, and we are looking into it. We will contact you to provide more information.',
  checkedIn: 'Your parents checked into the care facility and entered his room.',
  checkedOut: 'Your family member has left the care facility.',
  observedMood: "We observed your loved one's mood and noticed that he seemed to be",
}

const titleDictionnary = {
  hadObservations: 'Observations made',
  hadVisit: 'Visit received',
  foodOrFluidIntakeChecked: 'Alimentation observed',
  hadMedicationProblem: 'Medication intake issue observed',
  hadAlertOrConcern: 'Concern raised',
  checkedIn: 'Check-in',
  checkedOut: 'Check-out',
  observedMood: 'Mood observed',
}
