import React, { useState } from 'react'

const Test = () => {
    const [state, setState] = useState('howdyyyy')

    return (
        <div>
            {state}
        </div>
    )
}

export default Test