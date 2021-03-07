import { useState, useEffect } from "react"

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
export const useTitle = initTitle => {
    const [title, setTitle] = useState(initTitle);
    const updateTitle = () => {
        const htmlTitle = document.querySelector('title');
        htmlTitle.innerText = title;
    }
    useEffect(updateTitle, [title])
    return setTitle
}
