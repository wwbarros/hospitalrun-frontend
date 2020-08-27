import { Button, List, ListItem, Alert } from '@hospitalrun/components'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import useAddBreadcrumbs from '../../page-header/breadcrumbs/useAddBreadcrumbs'
import useTranslator from '../../shared/hooks/useTranslator'
import Diagnosis from '../../shared/model/Diagnosis'
import Patient from '../../shared/model/Patient'
import Permissions from '../../shared/model/Permissions'
import { RootState } from '../../shared/store'
import AddDiagnosisModal from './AddDiagnosisModal'

interface Props {
  patient: Patient
}

const Diagnoses = (props: Props) => {
  const { patient } = props
  const { t } = useTranslator()
  const { permissions } = useSelector((state: RootState) => state.user)
  const [showDiagnosisModal, setShowDiagnosisModal] = useState(false)

  const breadcrumbs = [
    {
      i18nKey: 'patient.diagnoses.label',
      location: `/patients/${patient.id}/diagnoses`,
    },
  ]
  useAddBreadcrumbs(breadcrumbs)

  const onAddDiagnosisModalClose = () => {
    setShowDiagnosisModal(false)
  }

  return (
    <>
      <div className="row">
        <div className="col-md-12 d-flex justify-content-end">
          {permissions.includes(Permissions.AddDiagnosis) && (
            <Button
              outlined
              color="success"
              icon="add"
              iconLocation="left"
              onClick={() => setShowDiagnosisModal(true)}
            >
              {t('patient.diagnoses.new')}
            </Button>
          )}
        </div>
      </div>
      <br />
      {(!patient.diagnoses || patient.diagnoses.length === 0) && (
        <Alert
          color="warning"
          title={t('patient.diagnoses.warning.noDiagnoses')}
          message={t('patient.diagnoses.addDiagnosisAbove')}
        />
      )}
      <List>
        {patient.diagnoses?.map((a: Diagnosis) => (
          <ListItem key={a.id}>{a.name}</ListItem>
        ))}
      </List>
      <AddDiagnosisModal show={showDiagnosisModal} onCloseButtonClick={onAddDiagnosisModalClose} />
    </>
  )
}

export default Diagnoses
