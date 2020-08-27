import { Button, Row, Column } from '@hospitalrun/components'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import useAddBreadcrumbs from '../../page-header/breadcrumbs/useAddBreadcrumbs'
import useTitle from '../../page-header/title/useTitle'
import DateTimePickerWithLabelFormGroup from '../../shared/components/input/DateTimePickerWithLabelFormGroup'
import TextFieldWithLabelFormGroup from '../../shared/components/input/TextFieldWithLabelFormGroup'
import TextInputWithLabelFormGroup from '../../shared/components/input/TextInputWithLabelFormGroup'
import useTranslator from '../../shared/hooks/useTranslator'
import Incident from '../../shared/model/Incident'
import useReportIncident from '../hooks/useReportIncident'
import { IncidentError } from '../util/validate-incident'

const ReportIncident = () => {
  const [mutate] = useReportIncident()
  const history = useHistory()
  const { t } = useTranslator()
  useTitle(t('incidents.reports.new'))
  const breadcrumbs = [
    {
      i18nKey: 'incidents.reports.new',
      location: `/incidents/new`,
    },
  ]
  useAddBreadcrumbs(breadcrumbs)
  const [incident, setIncident] = useState({
    date: new Date().toISOString(),
    department: '',
    category: '',
    categoryItem: '',
    description: '',
  })
  const [error, setError] = useState<IncidentError | undefined>(undefined)

  const onDateChange = (newDate: Date) => {
    setIncident((prevState) => ({
      ...prevState,
      date: newDate.toISOString(),
    }))
  }

  const onTextInputChange = (text: string, name: string) => {
    setIncident((prevState) => ({
      ...prevState,
      [name]: text,
    }))
  }

  const onSave = async () => {
    try {
      const data = await mutate(incident as Incident)
      history.push(`/incidents/${data.id}`)
    } catch (e) {
      setError(e)
    }
  }

  const onCancel = () => {
    history.push('/incidents')
  }

  return (
    <form>
      <Row>
        <Column md={6}>
          <DateTimePickerWithLabelFormGroup
            name="dateOfIncident"
            label={t('incidents.reports.dateOfIncident')}
            isEditable
            isRequired
            onChange={onDateChange}
            value={new Date(incident.date)}
            isInvalid={!!error?.date}
            feedback={t(error?.date as string)}
          />
        </Column>
        <Column md={6}>
          <TextInputWithLabelFormGroup
            label={t('incidents.reports.department')}
            name="department"
            isRequired
            isEditable
            value={incident.department}
            onChange={(event) => onTextInputChange(event.currentTarget.value, 'department')}
            isInvalid={!!error?.department}
            feedback={t(error?.department as string)}
          />
        </Column>
      </Row>
      <Row>
        <Column md={6}>
          <TextInputWithLabelFormGroup
            name="category"
            label={t('incidents.reports.category')}
            isEditable
            isRequired
            value={incident.category}
            onChange={(event) => onTextInputChange(event.currentTarget.value, 'category')}
            isInvalid={!!error?.category}
            feedback={t(error?.category as string)}
          />
        </Column>
        <Column md={6}>
          <TextInputWithLabelFormGroup
            label={t('incidents.reports.categoryItem')}
            name="categoryItem"
            isRequired
            isEditable
            value={incident.categoryItem}
            onChange={(event) => onTextInputChange(event.currentTarget.value, 'categoryItem')}
            isInvalid={!!error?.categoryItem}
            feedback={t(error?.categoryItem as string)}
          />
        </Column>
      </Row>
      <Row>
        <Column md={12}>
          <TextFieldWithLabelFormGroup
            label={t('incidents.reports.description')}
            name="description"
            isRequired
            isEditable
            value={incident.description}
            onChange={(event) => onTextInputChange(event.currentTarget.value, 'description')}
            isInvalid={!!error?.description}
            feedback={t(error?.description as string)}
          />
        </Column>
      </Row>

      <div className="row float-right">
        <div className="btn-group btn-group-lg mt-3">
          <Button className="mr-2" color="success" onClick={onSave}>
            {t('incidents.actions.report')}
          </Button>
          <Button color="danger" onClick={onCancel}>
            {t('actions.cancel')}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default ReportIncident
