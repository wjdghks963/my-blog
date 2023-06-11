'use client'

import React from "react";
import Lottie from 'lottie-react'
import LoadingJson from '@public/loadingLottie.json'




export default function Blogs() {

    return (
        <div className={'h-screen'}>
            <h1 className={'text-3xl font-bold text-center'}>준비 중..</h1>
            <Lottie className={'h-full'} animationData={LoadingJson} loop={true}/>
        </div>
    );
}



