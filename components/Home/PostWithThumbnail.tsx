"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import {cls, setCollapse} from "@libs/client/utils";
import {ThumbnailPostData} from '@types'
import { motion } from 'framer-motion';


const titleLimitLength = 10;
const descriptionLimitLength = 20;

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
            className={cls(className ?? '', 'w-1/4 mobile:w-1/5 flex flex-col px-2 text-center thin-round-black-border')}
            onClick={() => moveToPost(data.id)}
                >
          <span className="w-2/3 max-h-16 font-semibold py-3 overflow-hidden text-ellipsis whitespace-wrap mx-auto">
            {data.title}
          </span>
            {data.thumbnail ? (
                <Image
                    className="w-full h-32 object-cover"
                    src={data.thumbnail}
                    alt="Thumbnail"
                    width={500}
                    height={500}
                    quality={100}
                />
            ) : <div className='w-2/3'></div>}
            <span className="max-h-32 py-2 text-center overflow-hidden text-ellipsis whitespace-wrap">
    {data.description}
  </span>
        </motion.div>
    )
}
