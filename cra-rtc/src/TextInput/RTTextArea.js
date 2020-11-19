import React from 'react'
import { useRealtimeData } from '../hooks/realtime'

const RTTextArea = ({id, ...rest}) => {
    const [text, setText] = useRealtimeData(`textarea:${id}`)

    const textChange = e => {
        setText(e.target.value);
    }

    return (
        <textarea    
        {...rest}        
        value={text}
        onChange={textChange}/>
    )
}

export default RTTextArea