import UserImageBox from "@components/Comment/UserImageBox";
import {UserInfo} from "../../pages/api/blogs/[id]";
import React from "react";
import {useRouter} from "next/router";

export default function UserInfoBox({userInfo}:{userInfo?:UserInfo}) {
    const router = useRouter();

    const redirectToProfile = () =>{
        return router.push('/auth/profile')
    }

    return <div className={'flex flex-col w-12'} onClick={redirectToProfile}>
        <UserImageBox src={userInfo?.image ?? ""}/>
        <span className={'block text-center font-semibold'}>{userInfo?.name}</span>
    </div>
}
