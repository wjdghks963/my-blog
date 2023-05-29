"use client"

import UserImageBox from "@components/Comment/UserImageBox";
import React from "react";
import {useRouter} from "next/navigation"
import {UserInfo} from '@types'


export default function UserInfoBox({userInfo}:{userInfo?:UserInfo}) {
    const router = useRouter();

    const redirectToProfile = () =>{
        return router.push('/profile')
    }

    return <div className={'flex flex-col w-12'} onClick={redirectToProfile}>
        <UserImageBox src={userInfo?.image ?? ""}/>
        <span className={'hidden text-center font-semibold mobile:block'}>{userInfo?.name}</span>
    </div>
}
