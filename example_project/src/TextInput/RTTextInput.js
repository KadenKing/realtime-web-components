import React, { useContext } from 'react'
import { useRealtimeText } from '../hooks/realtime';

const RTTextInput = ({id}) => {
    const [text, setText] = useRealtimeText(`textinput:${id}`, "")

    const onTextChange = e => {
        setText(e.target.value)
    }

    return (
    <div>
        <input type="text" value={text} onChange={onTextChange}></input>
    </div>
    )
}

export default RTTextInput