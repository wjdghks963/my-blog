'use client'

import { useEffect } from 'react'

export default function Error({error, reset,}: {
    error: Error
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className={'w-full h-screen flex flex-col justify-center'}>
            <h2 className={"text-center text-4xl font-bold"}>Something went wrong!</h2>
            <button
                className={"thin-round-black-border mt-10 py-4 w-1/3 mx-auto"}
                onClick={
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    )
}
