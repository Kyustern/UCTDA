import React, { useEffect, useState } from 'react'
import { Transition } from 'react-transition-group'

interface Props {
    component: React.FC
    timeout: number
}

// export const TransitionHOC: React.FC<Props> = ({timeout, component}) => {

//     return (
//         <Transition in={mounted} timeout={timeout}>

//         </Transition>
//     )
// }