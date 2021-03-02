import { useState } from "react"

export const useInput = (initValue, validator) => {
    const [value, setValue] = useState(initValue)
    const onChange = event => {
        const { target: { value } } = event;
        // console.log(value)
        let willUpdate = true;
        if (typeof validator === "function") {
            willUpdate = validator(value);
        }
        if (willUpdate) setValue(value);
    }
    return { value, onChange }
}