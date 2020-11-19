import React from 'react'
import {useRealtimeData} from '../hooks/realtime'

const RTTextInput = ({id, ...rest}) => {
    const [text, setText] = useRealtimeData(`textinput:${id}`)

    const onTextChange = e => {
        setText(e.target.value)
    }

    return (
    <div>
        <input {...rest} type="text" value={text} onChange={onTextChange}></input>
    </div>
    )
}

export default RTTextInput