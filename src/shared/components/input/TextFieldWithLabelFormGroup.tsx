import { TextField, Label } from '@hospitalrun/components'
import React from 'react'

interface Props {
  value: string
  label?: string
  name: string
  isEditable?: boolean
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  isRequired?: boolean
  feedback?: string
  isInvalid?: boolean
}

const TextFieldWithLabelFormGroup = (props: Props) => {
  const { value, label, name, isEditable, isInvalid, isRequired, feedback, onChange } = props
  const id = `${name}TextField`
  return (
    <div className="form-group">
      {label && <Label text={label} htmlFor={id} isRequired={isRequired} />}
      <TextField
        rows={4}
        value={value}
        disabled={!isEditable}
        onChange={onChange}
        isInvalid={isInvalid}
        feedback={feedback}
      />
    </div>
  )
}

TextFieldWithLabelFormGroup.defaultProps = {
  value: '',
}

export default TextFieldWithLabelFormGroup
