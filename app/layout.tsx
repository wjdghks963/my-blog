import "../styles/globals.css"
import Provider from '@components/Provider'
import SlideHeaderNavBar from '@components/Base/NavBar/SlideHeaderNavBar'
import React from 'react'
import Footer from '@components/Base/Footer'

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html>
            <head/>
            <body>
                <Provider>
                    <SlideHeaderNavBar/>
                    {children}
                    <Footer/>
                </Provider>
            </body>
        </html>
    )
}
