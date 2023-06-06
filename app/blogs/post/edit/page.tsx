"use client"


import dynamic from 'next/dynamic'
import {useRouter} from 'next/navigation'
import React, {useRef, useState} from 'react'
import {useMutation} from '@libs/client/useMutation'
import {useSession} from 'next-auth/react'
import {MutationResult, PostPostJson} from '@types'
import {useSelector} from 'react-redux'
import {ReduxSliceState} from '../../../../store/modules'
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function Page() {
    const router = useRouter();

    const editPostData = useSelector( (state:ReduxSliceState) => state.editPostReducer);

    const editPostDataTags = editPostData.tags.join("")

    const tagsRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLInputElement>(null);
    const [markdown, setMarkdown] = useState<string | undefined>(editPostData.markdown);
    const [editPost, { data }] = useMutation<MutationResult>(`/api/blogs/post/edit?id=${editPostData.id}`);
    const { data: session } = useSession();



    const splitTags = (): string[] | void => {
        let { value } = tagsRef?.current!;

        if (value === "") return;
        const splitArr = value.split(", ");
        const set = splitArr.filter((el, index) => {
            return splitArr.indexOf(el) === index;
        });
        return set;
    };

    const handleSubmit = async (e: any) => {

        e.preventDefault()

        if (session?.user?.email !== process.env.MY_EMAIL) {
            if (process.env.NODE_ENV === "production") {
                return alert("email 확인해주세요");
            }
        }

        const postJson: PostPostJson = {
            title: titleRef.current?.value!,
            markdown,
            description: descriptionRef.current?.value!,
            tags: splitTags(),
            category: categoryRef.current?.value!,
        };

        await editPost(postJson);

        if (data?.ok === false) {
            alert("인터넷 오류");
        } else {
            router.replace("/");
        }
    };



    return (
        <>
            <form className="items-center justify-center flex flex-col ">
                <div className="flex mt-5 gap-10 mb-10">
                    <div>
                        <span>Title - </span>
                        <input
                            className="outline-none border-2 border-solid border-black focus:border-gray-300 p-1"
                            type="text"
                            ref={titleRef}
                            required
                            defaultValue={editPostData.title}
                        />
                    </div>
                    <div>
                        <span>Tags - </span>
                        <input
                            className="outline-none border-2 border-solid border-black focus:border-gray-300 p-1"
                            type="text"
                            ref={tagsRef}
                            placeholder="tag들은 , 로 분리함"
                            required
                            defaultValue={editPostDataTags}
                        />
                    </div>
                    <div>
                        <span>Description - </span>
                        <input
                            className="outline-none border-2 border-solid border-black focus:border-gray-300 p-1"
                            type="text"
                            ref={descriptionRef}
                            placeholder="줄거리 입력"
                            required
                            defaultValue={editPostData.description}
                        />
                    </div>

                    <div>
                        <span>Category - </span>
                        <input
                            className="outline-none border-2 border-solid border-black focus:border-gray-300 p-1"
                            type="text"
                            ref={categoryRef}
                            placeholder="카테고리 입력"
                            defaultValue={editPostData.category?.category}
                        />
                    </div>
                </div>
                <MDEditor
                    className="w-4/5 prose"
                    defaultValue={editPostData.markdown}
                    value={markdown}
                    onChange={(value) => setMarkdown(value)}
                />

                <button
                    onClick={handleSubmit}
                    className="text-center w-1/3 my-10 ring-2 ring-offset-2 ring-gray-400 py-2 block hover:bg-gray-400 hover:text-green-50"
                >
                    Submit
                </button>
            </form>

        </>
    );
}
