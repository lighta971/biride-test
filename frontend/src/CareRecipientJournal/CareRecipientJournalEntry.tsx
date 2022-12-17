import { JournalEntry, JournalEntryEventTypes } from './JournalEntry'
import { Stack, Typography } from '@mui/material'
import EventTypeDescription from './EventTypeDescription'
import { Fragment } from 'react'

export default function CareRecipientJournalEntry(
  props: CareRecipientJournalEntryProps,
): JSX.Element {
  const eventTypes = getEventTypesFromEntry(props.journalEntry)

  return (
    <>
      <h3>{new Date(props.journalEntry.date).toDateString()}</h3>
      <Stack spacing={2}>
        {eventTypes.map((type) => {
          return <EventTypeDescription key={type} type={type} journalEntry={props.journalEntry} />
        })}
        {!eventTypes.length && (
          <Typography sx={{ fontSize: 13 }} color="text.secondary">
            There is nothing to report.
          </Typography>
        )}
      </Stack>
    </>
  )
}

type CareRecipientJournalEntryProps = {
  journalEntry: JournalEntry
}

function getEventTypesFromEntry(entry: JournalEntry): JournalEntryEventTypes[] {
  const events = Object.keys(entry) as JournalEntryEventTypes[]

  return events.filter((key) => ['date', 'mood'].includes(key) === false && entry[key])
}
