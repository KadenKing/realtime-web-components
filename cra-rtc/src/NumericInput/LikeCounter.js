import React, {useState} from 'react'
import { useRealtimeData } from '../hooks/realtime'


const LikeCounter = ({id, ...rest}) => {
    const [likes, setLikes] = useRealtimeData(`likecounter:${id}`)

    const incLikes = e => {
        setLikes(likes+1)
    }

    const decLikes = e => {
        setLikes(likes === 0 ? likes : likes - 1)
    }

    return (
    <div {...rest}>
        <div style={{display: 'flex'}}>
            <div onClick={incLikes}>
                👍
            </div>
            <div onClick={decLikes}>
                👎
            </div>
            
        </div>
        <div>
            {likes}
        </div>
    </div>
    )
}

export default LikeCounter