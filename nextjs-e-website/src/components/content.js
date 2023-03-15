import styles from '@/styles/content.module.css'
import Link from 'next/link'
import Image from 'next/image'
import React, {useState,useEffect} from 'react'

function Content({items})
{
    
    const urls = [];
    const shoes = [];
    const noBackgroundPics = [];
    items.forEach(item => {
        const shoe = item[1];
        shoes.push(shoe)
        const nobg = "/images/"+shoe.no_background_pic;
        const url = "/product?id="+ encodeURIComponent(shoe.name) ;
        noBackgroundPics.push(nobg)
        urls.push(url)
    })
    return(
        <div className={styles.content}>
            <section id = "mainshoe" className={[styles.mainshoe, styles.productwrapper].join(' ')}>
                <div className={styles.text}>
                    <div>
                        <span className={styles.new}>new product</span>
                        <h1>{shoes[0].name}</h1>
                        <p>{shoes[0].description}</p>
                    </div>
                    <Link href = {urls[0]}  className= {styles.link}>see product</Link>
                </div>
                <div className= {styles.picwrapper}>
                    <Image
                        src= {noBackgroundPics[0]}
                        alt="mainPic"
                        width={500}
                        height={500}
                        priority
                    />
                </div>
            </section>
            <section id = "second" className={[styles.second, styles.productwrapper].join(' ')}>
                <div className= {styles.picwrapper}>
                    <Image
                        src= {noBackgroundPics[1]}
                        alt="mainPic"
                        width={500}
                        height={500}
                        priority
                    />
                </div>
                <div className={styles.text}>
                    <div>
                        <h1>{shoes[1].name}</h1>
                        <p>{shoes[1].description}</p>
                    </div>
                    <Link href = {urls[1]}  className= {styles.link}>see product</Link>
                </div>
            </section>
            <section id = "third" className={[styles.third, styles.productwrapper].join(' ')}>
                <div className={styles.text}>
                    <div>
                        <h1>{shoes[2].name}</h1>
                    </div>
                    <Link href = {urls[2]}  className= {styles.link}>see product</Link>
                </div>
                <div className= {styles.picwrapper}>
                    <Image
                        src= {noBackgroundPics[2]}
                        alt="mainPic"
                        width={300}
                        height={300}
                        priority
                    />
                </div>
            </section>
            <section id = "fourth" className={[styles.fourth, styles.productwrapper].join(' ')}>
                <div className= {styles.picwrapper}>
                    <Image
                        src= {noBackgroundPics[3]}
                        alt="mainPic"
                        width={300}
                        height={300}
                        priority
                    />
                </div>
                <div className={styles.text}>
                    <div>
                        <h1>{shoes[3].name}</h1>
                    </div>
                    <Link href = {urls[3]}  className= {styles.link}>see product</Link>
                </div>
            </section>
        </div>
    )
}

export default Content