import Navbar from './navbar'
import Script from 'next/script'

export default function Layout({children})
{
   
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main> 
        </>
    )
    
}