import { useState, useEffect, useRef } from "react"

export const useConfirm = (message = "", onConfirm, onCancel) => {
    if (onConfirm && typeof onConfirm !== "function") {
        return;
    }
    if (onCancel && typeof onCancel !== 'function') {
        return;
    }
    const confirmAction = () => {
        if (window.confirm(message)) {
            onConfirm();
        } else {
            onCancel();
        }
    }
    return confirmAction;
}

export const useClick = (onClick) => {
    // useRef seems like document.getElementbyId :D
    const element = useRef();
    useEffect(() => {
        // componentDidMount
        if (element.current) {
            element.current.addEventListener('click', onClick);
        }
        return () => {
            // componentWillUnMount
            if (element.current) {
                element.current.removeEventListener('click', onClick)
            }
        }
    }, [])
    return element
}

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
