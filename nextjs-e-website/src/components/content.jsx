import styles from '@/styles/content.module.css'
import Link from 'next/link'
import Image from 'next/image'
import React, {useState,useEffect} from 'react'

function Content({items})
{
    
    const urls = [];
    const products = [];
    const noBackgroundPics = [];
    items.forEach(item => {
        const product = item[1];
        products.push(product)
        const nobg = "/images/"+product.no_background_pic;
        const url = "/product?id="+ encodeURIComponent(product.name) ;
        noBackgroundPics.push(nobg)
        urls.push(url)
    })
    return(
        <div className={styles.content}>
            <section id = "mainproduct" className={[styles.mainproduct, styles.productwrapper].join(' ')}>
                <div className={styles.text}>
                    <div>
                        <span className={styles.new}>new product</span>
                        <h1>{products[0].name}</h1>
                        <p>{products[0].description}</p>
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
                        <h1>{products[1].name}</h1>
                        <p>{products[1].description}</p>
                    </div>
                    <Link href = {urls[1]}  className= {styles.link}>see product</Link>
                </div>
            </section>
            <section id = "third" className={[styles.third, styles.productwrapper].join(' ')}>
                <div className={styles.text}>
                    <div>
                        <h1>{products[2].name}</h1>
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
                        <h1>{products[3].name}</h1>
                    </div>
                    <Link href = {urls[3]}  className= {styles.link}>see product</Link>
                </div>
            </section>
        </div>
    )
}

export default Content