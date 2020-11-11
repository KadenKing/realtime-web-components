import React from 'react'
import {useRealtimeText} from 'cra-rtc/dist/hooks/realtime'

const RTTextInputCopy = ({id}) => {
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

export default RTTextInputCopy