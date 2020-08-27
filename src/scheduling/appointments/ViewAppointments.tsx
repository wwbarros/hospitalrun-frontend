import { Calendar, Button } from '@hospitalrun/components'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import useAddBreadcrumbs from '../../page-header/breadcrumbs/useAddBreadcrumbs'
import { useButtonToolbarSetter } from '../../page-header/button-toolbar/ButtonBarProvider'
import useTitle from '../../page-header/title/useTitle'
import PatientRepository from '../../shared/db/PatientRepository'
import useTranslator from '../../shared/hooks/useTranslator'
import { RootState } from '../../shared/store'
import { fetchAppointments } from './appointments-slice'

interface Event {
  id: string
  start: Date
  end: Date
  title: string
  allDay: boolean
}

const breadcrumbs = [{ i18nKey: 'scheduling.appointments.label', location: '/appointments' }]

const ViewAppointments = () => {
  const { t } = useTranslator()
  const history = useHistory()
  useTitle(t('scheduling.appointments.label'))
  const dispatch = useDispatch()
  const { appointments } = useSelector((state: RootState) => state.appointments)
  const [events, setEvents] = useState<Event[]>([])
  const setButtonToolBar = useButtonToolbarSetter()
  useAddBreadcrumbs(breadcrumbs, true)

  useEffect(() => {
    dispatch(fetchAppointments())
    setButtonToolBar([
      <Button
        key="newAppointmentButton"
        outlined
        color="success"
        icon="appointment-add"
        onClick={() => history.push('/appointments/new')}
      >
        {t('scheduling.appointments.new')}
      </Button>,
    ])

    return () => {
      setButtonToolBar([])
    }
  }, [dispatch, setButtonToolBar, history, t])

  useEffect(() => {
    const getAppointments = async () => {
      const newEvents = await Promise.all(
        appointments.map(async (a) => {
          const patient = await PatientRepository.find(a.patient)
          return {
            id: a.id,
            start: new Date(a.startDateTime),
            end: new Date(a.endDateTime),
            title: patient.fullName || '',
            allDay: false,
          }
        }),
      )

      setEvents(newEvents)
    }

    if (appointments) {
      getAppointments()
    }
  }, [appointments])

  return (
    <div>
      <Calendar
        events={events}
        onEventClick={(event) => {
          history.push(`/appointments/${event.id}`)
        }}
      />
    </div>
  )
}

export default ViewAppointments
