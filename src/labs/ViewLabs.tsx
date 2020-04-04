import React, { useState, useEffect } from 'react'
import useTitle from 'page-header/useTitle'
import { useTranslation } from 'react-i18next'
import format from 'date-fns/format'
import { useButtonToolbarSetter } from 'page-header/ButtonBarProvider'
import { Button } from '@hospitalrun/components'
import { useHistory } from 'react-router'
import LabRepository from 'clients/db/LabRepository'
import Lab from 'model/Lab'
import { useSelector } from 'react-redux'
import Permissions from 'model/Permissions'
import { RootState } from '../store'

const ViewLabs = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const setButtons = useButtonToolbarSetter()
  useTitle(t('labs.label'))

  const { permissions } = useSelector((state: RootState) => state.user)
  const [labs, setLabs] = useState<Lab[]>([])

  const getButtons = () => {
    const buttons: React.ReactNode[] = []

    if (permissions.includes(Permissions.RequestLab)) {
      buttons.push(
        <Button icon="add" onClick={() => history.push('/labs/new')} outlined color="success">
          {t('labs.requests.new')}
        </Button>,
      )
    }

    return buttons
  }

  setButtons(getButtons())

  useEffect(() => {
    const fetch = async () => {
      const fetchedLabs = await LabRepository.findAll()
      setLabs(fetchedLabs)
    }

    fetch()
  }, [])

  const onTableRowClick = (lab: Lab) => {
    history.push(`/labs/${lab.id}`)
  }

  return (
    <>
      <table className="table table-hover">
        <thead className="thead-light">
          <tr>
            <th>{t('labs.lab.type')}</th>
            <th>{t('labs.lab.requestedOn')}</th>
            <th>{t('labs.lab.status')}</th>
          </tr>
        </thead>
        <tbody>
          {labs.map((lab) => (
            <tr onClick={() => onTableRowClick(lab)} key={lab.id}>
              <td>{lab.type}</td>
              <td>{format(new Date(lab.requestedOn), 'yyyy-MM-dd hh:mm a')}</td>
              <td>{lab.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ViewLabs
