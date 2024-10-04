import { BaseOption } from '../../@types/models'
import { SelectInputContainer } from './styles'

interface SelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  data: BaseOption[]
}

export function SelectInput({ label, data, ...rest }: SelectInputProps) {
  return (
    <SelectInputContainer>
      <label htmlFor={rest.id}>
        {label}
        {rest.required ? <strong>*</strong> : null}
      </label>
      <select {...rest}>
        {data.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {item.value}
            </option>
          )
        })}
      </select>
    </SelectInputContainer>
  )
}
