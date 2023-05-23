"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import {cls} from "@libs/client/utils";
import {ThumbnailPostData} from '@types'
import { motion } from 'framer-motion';


export default function PostWithThumbnail({
  data,
  className,
}: {
  data: ThumbnailPostData;
    className?: string;
}) {

    const router = useRouter()

  const moveToPost = (id: number) => {
    return router.push(`/blogs/post/${id}`);
  };

    return (
        <motion.div
            initial={{scale: 0}}
            animate={{scale: 1, rotateZ: 360}}
            whileHover={{translateY: -2, scale: 1.1}}
            className={cls(className ?? '', 'w-1/4 mobile:w-1/5 flex flex-col px-2 bg-white text-center thin-round-black-border cursor-pointer')}
            onClick={() => moveToPost(data.id)}
                >
          <span className="w-full mobile:w-1/2 max-h-16 font-semibold py-3 overflow-hidden text-ellipsis whitespace-wrap mx-auto">
            {data.title}
          </span>
            {data.thumbnail ? (
                <Image
                    className="hidden mobile:block w-full h-32 object-cover"
                    src={data.thumbnail}
                    alt="Thumbnail"
                    width={500}
                    height={500}
                    quality={100}
                />
            ) : <div className='w-2/3 h-1'></div>}
            <span className="hidden w-full mobile:block max-h-32 py-2 text-center overflow-hidden text-ellipsis whitespace-wrap mx-auto">
    {data.description}
  </span>
        </motion.div>
    )
}
