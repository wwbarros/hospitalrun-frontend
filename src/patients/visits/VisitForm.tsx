import { Alert, Column, Row } from '@hospitalrun/components'
import React, { useState } from 'react'

import DateTimePickerWithLabelFormGroup from '../../shared/components/input/DateTimePickerWithLabelFormGroup'
import SelectWithLabelFormGroup, {
  Option,
} from '../../shared/components/input/SelectWithLableFormGroup'
import TextFieldWithLabelFormGroup from '../../shared/components/input/TextFieldWithLabelFormGroup'
import TextInputWithLabelFormGroup from '../../shared/components/input/TextInputWithLabelFormGroup'
import useTranslator from '../../shared/hooks/useTranslator'
import Visit, { VisitStatus } from '../../shared/model/Visit'

interface Error {
  message?: string
  startDateTime?: string
  endDateTime?: string
  type?: string
  status?: string
  reason?: string
  location?: string
}
interface Props {
  visit: Partial<Visit>
  visitError?: Error
  onChange?: (newVisit: Partial<Visit>) => void
  disabled?: boolean
}

const VisitForm = (props: Props) => {
  const { t } = useTranslator()
  const { visit, visitError, disabled, onChange } = props

  const [status, setStatus] = useState(visit.status)

  const onFieldChange = (name: string, value: string | VisitStatus) => {
    if (onChange) {
      const newVisit = {
        ...visit,
        [name]: value,
      }
      onChange(newVisit)
    }
  }

  const statusOptions: Option[] =
    Object.values(VisitStatus).map((v) => ({ label: v, value: v })) || []

  return (
    <form>
      {visitError?.message && <Alert color="danger" message={t(visitError.message)} />}
      <Row>
        <Column sm={6}>
          <DateTimePickerWithLabelFormGroup
            isRequired
            value={visit.startDateTime ? new Date(visit.startDateTime) : new Date()}
            label={t('patient.visits.startDateTime')}
            name="startDateTime"
            feedback={t(visitError?.startDateTime || '')}
            isInvalid={!!visitError?.startDateTime}
            isEditable={!disabled}
            onChange={(date) => onFieldChange('startDateTime', date.toISOString())}
          />
        </Column>
        <Column sm={6}>
          <DateTimePickerWithLabelFormGroup
            isRequired
            value={visit.endDateTime ? new Date(visit.endDateTime) : new Date()}
            label={t('patient.visits.endDateTime')}
            name="endDateTime"
            feedback={t(visitError?.endDateTime || '')}
            isInvalid={!!visitError?.endDateTime}
            isEditable={!disabled}
            onChange={(date) => onFieldChange('endDateTime', date.toISOString())}
          />
        </Column>
      </Row>
      <Row>
        <Column sm={12}>
          <TextInputWithLabelFormGroup
            isRequired
            value={visit.type}
            label={t('patient.visits.type')}
            name="type"
            feedback={t(visitError?.type || '')}
            isInvalid={!!visitError?.type}
            isEditable={!disabled}
            onChange={(event) => onFieldChange('type', event.currentTarget.value)}
          />
        </Column>
      </Row>
      <Row>
        <Column sm={12}>
          <SelectWithLabelFormGroup
            name="status"
            label={t('patient.visits.status')}
            isRequired
            options={statusOptions}
            defaultSelected={statusOptions.filter(({ value }) => value === status)}
            onChange={(values) => {
              onFieldChange('status', values[0])
              setStatus(values[0] as VisitStatus)
            }}
            isEditable={!disabled}
            isInvalid={!!visitError?.status}
          />
        </Column>
      </Row>
      <Row>
        <Column sm={12}>
          <TextFieldWithLabelFormGroup
            isRequired
            value={visit.reason}
            label={t('patient.visits.reason')}
            name="reason"
            feedback={visitError?.reason}
            isInvalid={!!visitError?.reason}
            isEditable={!disabled}
            onChange={(event) => onFieldChange('reason', event.currentTarget.value)}
          />
        </Column>
      </Row>
      <Row>
        <Column sm={12}>
          <TextInputWithLabelFormGroup
            isRequired
            value={visit.location}
            label={t('patient.visits.location')}
            name="location"
            feedback={t(visitError?.location || '')}
            isInvalid={!!visitError?.location}
            isEditable={!disabled}
            onChange={(event) => onFieldChange('location', event.currentTarget.value)}
          />
        </Column>
      </Row>
    </form>
  )
}

VisitForm.defaultProps = {
  disabled: false,
}

export default VisitForm
