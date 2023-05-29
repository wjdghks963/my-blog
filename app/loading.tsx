"use client"

import Lottie from 'lottie-react'
import LoadingJson from "../public/lottie.json"

export default function Loading(){
    return <div>
            <Lottie animationData={LoadingJson} loop={true}/>
    </div>
}
