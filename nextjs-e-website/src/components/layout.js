import Navbar from './navbar'
import Script from 'next/script'
import styles from "@/styles/layout.module.css";

export default function Layout({children})
{
   
    return (
        <>
            <Navbar />
            <main className= {styles.mainwrapper}>
                {children}
            </main> 
        </>
    )
    
}