import styled from 'styled-components'
import { IMaskInput } from 'react-imask'

export const StyledImask = styled(IMaskInput)`
    box-sizing: border-box;
    margin: 0;
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    list-style: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
        'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    position: relative;
    display: inline-block;
    width: 100%;
    min-width: 0;
    border-radius: 6px;
    transition: all 0.2s;
    background-color: #ffffff;
    border-width: 1px;
    border-style: solid;
    border-color: #d9d9d9;

    &:focus-within {
        border-color: #4fae47;
        box-shadow: 0 0 0 2px rgba(32, 117, 9, 0.13);
        outline: 0;
        background-color: rgba(0, 0, 0, 0.04);
    }

    &:hover {
        border-color: #4fae47;
        background-color: #ffffff;
    }

    &:placeholder-shown {
        text-overflow: ellipsis;
    }

    &:read-only {
        color: rgba(0, 0, 0, 0.25);
        background-color: rgba(0, 0, 0, 0.04);
        border-color: #d9d9d9;
        box-shadow: none;
        cursor: not-allowed;
        opacity: 1;
    }
`
