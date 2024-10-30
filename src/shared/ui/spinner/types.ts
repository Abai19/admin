import { SpinProps } from 'antd/es/spin'

export type tTypeSpinner = 'default' | 'container' | 'absolute'

export interface ISpinner {
    type?: tTypeSpinner
    typeSpinner?: SpinProps
}
