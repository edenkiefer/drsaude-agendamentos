import { InputContainer } from './styles'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function Input({ label, ...rest }: InputProps) {
  return (
    <InputContainer>
      <label htmlFor={rest.id}>
        {label}
        {rest.required ? <strong>*</strong> : null}
      </label>
      <input {...rest} />
    </InputContainer>
  )
}
