import React, {useState} from 'react'
import { useRealtimeText } from '../hooks/realtime'


const LikeCounter = ({id}) => {
    const [likes, setLikes] = useRealtimeText(`likecounter:${id}`, 0)

    const incLikes = e => {
        setLikes(likes+1)
    }

    const decLikes = e => {
        setLikes(likes === 0 ? likes : likes - 1)
    }

    return (
    <div>
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