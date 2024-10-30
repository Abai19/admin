import { FC } from 'react'
import { IProps } from './types.ts'
import { StyledImask } from './styles.ts'

export const CustomIMask: FC<IProps> = ({
    onChange,
    value,
    name,
    disabled,
    mask = '+{996}(000)-00-00-00',
    placeholder = '996(___)__-__-__',
}) => {
    return <StyledImask unmask name={name} readOnly={disabled} mask={mask} placeholder={placeholder} value={value} onAccept={onChange} />
}
