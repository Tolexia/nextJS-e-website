import styles from '@/styles/mainshoe.module.css'
import Link from 'next/link'
import Image from 'next/image'
import React, {useState,useEffect} from 'react'
import ColorThief from '../../node_modules/colorthief/dist/color-thief.mjs'

function Content({items})
{
    const shoe = items[0][1];
    function setBackground()
    {
        const section = document.getElementById('mainshoe');
        const mainPic = section.querySelector('img');
        const colorThief = new ColorThief();
        const color = colorThief.getColor(mainPic);
        section.style.backgroundColor = `RGB(${color[0]+5},${color[1]+5},${color[2]+5})`
    }
    useEffect(() => {
        setBackground()
    }, [])
    
    const files = JSON.parse(shoe.filename);
    const mainPic = "/images/"+files[0];
    const url = "/product?id="+ encodeURIComponent(shoe.name) ;
    return(
        <section id = "mainshoe" className={styles.wrapper}>
            <div className={styles.text}>
                <span className={styles.new}>new product</span>
                <h1>{shoe.name}</h1>
                <p>{shoe.description}</p>
                <Link href = {url}  className= {styles.link}>see product</Link>
            </div>
            <div>
                <Image
                    src= {mainPic}
                    alt="mainPic"
                    width={500}
                    height={500}
                    priority
                />
            </div>
        </section>
    )
}

export default Content