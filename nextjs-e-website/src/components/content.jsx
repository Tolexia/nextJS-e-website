import styles from '@/styles/content.module.css'
import IntentLink from '@/components/IntentLink'
import Image from 'next/image'
import React from 'react'
import { resolveCartImage, resolveImageSrc } from '@/utils/cartImage'

function productView(entry) {
    const product = entry[1] || {};
    const hero = resolveImageSrc(product.no_background_pic) || resolveCartImage(product.filename);
    return {
        name: product.name,
        description: product.description,
        href: "/product?id=" + encodeURIComponent(product.name || ""),
        image: hero,
    };
}

function Content({items})
{
    const products = (items || []).map(productView).filter((product) => product.name);
    if (products.length === 0) {
        return <p>Aucun produit pour le moment.</p>;
    }

    return(
        <div className={styles.content}>
            <section id = "mainproduct" className={[styles.mainproduct, styles.productwrapper].join(' ')}>
                <div className={styles.text}>
                    <div>
                        <span className={styles.new}>new product</span>
                        <h1>{products[0].name}</h1>
                        <p>{products[0].description}</p>
                    </div>
                    <IntentLink href = {products[0].href}  className= {styles.link}>see product</IntentLink>
                </div>
                <div className= {styles.picwrapper}>
                    <Image
                        src= {products[0].image}
                        alt={products[0].name}
                        width={500}
                        height={500}
                        priority
                    />
                </div>
            </section>
            {products[1] && (
            <section id = "second" className={[styles.second, styles.productwrapper].join(' ')}>
                <div className= {styles.picwrapper}>
                    <Image
                        src= {products[1].image}
                        alt={products[1].name}
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
                    <IntentLink href = {products[1].href}  className= {styles.link}>see product</IntentLink>
                </div>
            </section>
            )}
            {products[2] && (
            <section id = "third" className={[styles.third, styles.productwrapper].join(' ')}>
                <div className={styles.text}>
                    <div>
                        <h1>{products[2].name}</h1>
                    </div>
                    <IntentLink href = {products[2].href}  className= {styles.link}>see product</IntentLink>
                </div>
                <div className= {styles.picwrapper}>
                    <Image
                        src= {products[2].image}
                        alt={products[2].name}
                        width={300}
                        height={300}
                        priority
                    />
                </div>
            </section>
            )}
            {products[3] && (
            <section id = "fourth" className={[styles.fourth, styles.productwrapper].join(' ')}>
                <div className= {styles.picwrapper}>
                    <Image
                        src= {products[3].image}
                        alt={products[3].name}
                        width={300}
                        height={300}
                        priority
                    />
                </div>
                <div className={styles.text}>
                    <div>
                        <h1>{products[3].name}</h1>
                    </div>
                    <IntentLink href = {products[3].href}  className= {styles.link}>see product</IntentLink>
                </div>
            </section>
            )}
        </div>
    )
}

export default Content
