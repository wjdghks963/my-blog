import Image from "next/image";
import React from "react";

export default function UserImageBox({src}:{src:string}){
    return (
        <Image className={'rounded-3xl ring-2 ring-gray-300 ring-offset-2'} src={src} width={100} height={100}/>
    )
}
