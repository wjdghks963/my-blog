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
        <div className={'w-screen h-screen prose flex flex-col justify-center'}>
            <h2>Something went wrong!</h2>
            <button
                onClick={
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    )
}
