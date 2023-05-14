import Image from "next/image";
import React from "react";
import {getDomainFromImageUrl} from "@libs/client/getDomainImg";
import {cls} from "@libs/client/utils";




export default function UserImageBox({src,className}:{src:string,className?:string}){

    const imgURL = getDomainFromImageUrl(src) as string;

    return (
        src !== 'undefined' || false || null ? (
            <div className={cls(className ? className : '',"relative")}>
            <Image className={'rounded-2xl'} src={src} width={100} height={100}/>
            <div className={"absolute rounded-full bg-white block -top-2 -left-2 flex justify-center "}>
                <Image className={'w-6 h-6'} src={imgURL} width={25} height={25}/>
            </div>
        </div>) : null

    )
}


