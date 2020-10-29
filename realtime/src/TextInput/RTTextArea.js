import React from 'react'
import { useRealtimeText } from '../hooks/realtime'

const RTTextArea = ({id}) => {
    const [text, setText] = useRealtimeText(`textarea:${id}`, "")

    const textChange = e => {
        setText(e.target.value);
    }

    return (
        <textarea            
        value={text}
        onChange={textChange}/>
    )
}

export default RTTextArea