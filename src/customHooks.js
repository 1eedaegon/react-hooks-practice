import { useState, useEffect, useRef } from "react"

export const useNotification = (title, options) => {
    if ("Notification" in window) {
        const fireNotif = () => {
            if (Notification.permission !== "granted") {
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        new Notification(title, options)
                    } else {
                        return;
                    }
                })
            }
            else {
                new Notification(title, options)
            }
        }
        return fireNotif;
    }
}

export const useFullScreen = (callback) => {
    const element = useRef();
    const triggerFull = () => {
        element.current.requestFullscreen();
        callback(true)
    }
    const exitFull = () => {
        document.exitFullscreen()
        callback(false)
    }
    return { element, triggerFull, exitFull }
}

export const useScroll = () => {
    const [state, setState] = useState({
        x: 0, y: 0
    })
    const onScroll = () => {
        setState({ x: window.scrollX, y: window.scrollY })
        // const { scrollX: x, scrollY: y } = window
        // console.log('x: ', x, 'y: ', y)
    }
    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll)
    }, [])
    return state;
}

export const useNetwork = onChange => {
    const [status, setStatus] = useState(navigator.onLine);
    const handleChange = () => {
        if (typeof onChange === "function") onChange(navigator.onLine);
        setStatus(navigator.onLine);
    };
    useEffect(() => {
        window.addEventListener('online', handleChange)
        window.addEventListener('offline', handleChange)
        return () => {
            window.removeEventListener('online', handleChange)
            window.removeEventListener('offline', handleChange)
        }
    }, []);
    return status;
}

export const useFadeIn = (duration = 1, delay = 0) => {
    const element = useRef();
    useEffect(() => {
        const { current } = element;
        current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
        current.style.opacity = 1;
    }, [])
    return { ref: element, style: { opacity: 0 } };
}

export const useBeforeLeave = onBefore => {
    const handle = (e) => {
        const { outerHeight: windowSize } = window;
        const { clientY: currSize } = e;
        console.log(currSize, windowSize, "Leaving...")
    }
    useEffect(() => {
        document.addEventListener('mouseleave', handle)
        return () => document.removeEventListener('mouseleave', handle)
    }, [])
}

export const usePreventLeave = () => {
    const listener = e => {
        e.preventDefault();
        e.returnValue = "";
    }
    const enablePrevent = () => window.addEventListener('beforeunload', listener)
    const disablePrevent = () => window.removeEventListener('beforeunload', listener)
    return { enablePrevent, disablePrevent }
}

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
