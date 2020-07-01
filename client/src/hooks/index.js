import { useState } from 'react'

export const useField = (name, type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = () => {
        setValue('')
    }

    return {
        attributes: {
            name,
            label: name.charAt(0).toUpperCase() + name.slice(1),
            id: name,
            type,
            value,
            onChange
        },
        reset
    }
}