import "../styles/globals.css"
import Provider from '@components/Provider'
import SlideHeaderNavBar from '@components/Base/NavBar/SlideHeaderNavBar'
import React from 'react'
import Footer from '@components/Base/Footer'
import {Metadata} from 'next'

export const metadata: Metadata = {
    title: 'Jung Blog',
    description: '기술 블로그',
    openGraph:{
        title:'Jung Blog',
        description:'기술 블로그',

    }
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html>
            <head/>
            <body>
                <Provider>
                    <SlideHeaderNavBar/>
                    {children}
                </Provider>
            </body>
        </html>
    )
}
