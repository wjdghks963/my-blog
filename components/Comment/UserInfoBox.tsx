import UserImageBox from "@components/Comment/UserImageBox";
import {UserInfo} from "../../pages/api/blogs/[id]";
import React from "react";

export default function UserInfoBox({userInfo}:{userInfo?:UserInfo}) {
    return <div className={'flex flex-col w-12'}>
        <UserImageBox src={userInfo?.image ?? ""}/>
        <span className={'block text-center font-semibold'}>{userInfo?.name}</span>
    </div>
}
