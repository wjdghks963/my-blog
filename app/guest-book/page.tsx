'use client'

import React from "react";
import Lottie from 'lottie-react'
import LoadingJson from '../../public/lottie.json'




export default function Blogs() {

    return (
        <div >
            <h1 className={'text-3xl font-bold mx-auto '}>준비 중..</h1>
            <Lottie animationData={LoadingJson} loop={true}/>
        </div>
    );
}


