import React,{useEffect, useState} from 'react'
import CanvasDraw from "react-canvas-draw";
import {useRealtimeText} from 'cra-rtc/dist/hooks/realtime'

const RTDraw = ({id}) => {
    var ref = undefined
    const [text, setText] = useRealtimeText(`textinput:${id}`, "")

    const onTextChange = () => {
        if (ref === undefined) {return}
        const drawText = ref.getSaveData()
        setText(drawText)
    }

    return (

    <div>
        <CanvasDraw 
        onChange ={onTextChange}
        ref = {canvasDraw => (ref = canvasDraw)}
        saveData = {text}
        immediateLoading = {true}/>
        <button onClick={() => {ref.clear(); onTextChange()}}>
            clear
        </button>
        
    </div>
    )
}

export default RTDraw