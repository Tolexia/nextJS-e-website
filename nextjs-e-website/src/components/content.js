import styles from '@/styles/content.module.css'
import Link from 'next/link'
import Image from 'next/image'
import React, {useState,useEffect} from 'react'
import ColorThief from '../../node_modules/colorthief/dist/color-thief.mjs'

function Content({items})
{
    
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
    const assets = [];
    const urls = [];
    const shoes = [];
    items.forEach(item => {
        const shoe = item[1];
        shoes.push(shoe)
        const files = JSON.parse(shoe.filename);
        const mainPic = "/images/"+files[0];
        const url = "/product?id="+ encodeURIComponent(shoe.name) ;
        assets.push(mainPic)
        urls.push(url)
    })
    return(
        <div className={styles.content}>
            <section id = "mainshoe" className={[styles.mainshoe, 'picwrapper'].join(' ')}>
                <div className={styles.text}>
                    <span className={styles.new}>new product</span>
                    <h1>{shoes[0].name}</h1>
                    <p>{shoes[0].description}</p>
                    <Link href = {urls[0]}  className= {styles.link}>see product</Link>
                </div>
                <div>
                    <Image
                        src= {assets[0]}
                        alt="mainPic"
                        width={500}
                        height={500}
                        priority
                    />
                </div>
            </section>
            <section id = "second" className={[styles.second, 'picwrapper'].join(' ')}>
                <div>
                    <Image
                        src= {assets[1]}
                        alt="mainPic"
                        width={500}
                        height={500}
                        priority
                    />
                </div>
                <div className={styles.text}>
                    <span className={styles.new}>new product</span>
                    <h1>{shoes[1].name}</h1>
                    <p>{shoes[1].description}</p>
                    <Link href = {urls[1]}  className= {styles.link}>see product</Link>
                </div>
            </section>
        </div>
    )
}

export default Content