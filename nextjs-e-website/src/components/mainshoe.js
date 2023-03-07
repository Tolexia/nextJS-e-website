import styles from '@/styles/mainshoe.module.css'
import { Main } from 'next/document'
import Link from 'next/link'
import Image from 'next/image'
// function getAverageRGB(imgEl) {
//         var blockSize = 5, // only visit every 5 pixels
//             defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
//             canvas = document.createElement('canvas'),
//             context = canvas.getContext && canvas.getContext('2d'),
//             data, width, height,
//             i = -4,
//             length,
//             rgb = {r:0,g:0,b:0},
//             count = 0;
    
//         if (!context) {
//             return defaultRGB;
//         }
//         height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
//         width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
    
//         context.drawImage(imgEl, 0, 0);
//         try {
//             data = context.getImageData(0, 0, width, height);
//         } catch(e) {
//             /* security error, img on diff domain */
//             return defaultRGB;
//         }
//         length = data.data.length;
//         while ( (i += blockSize * 4) < length ) {
//             ++count;
//             rgb.r += data.data[i];
//             rgb.g += data.data[i+1];
//             rgb.b += data.data[i+2];
//         }
//         // ~~ used to floor values
//         rgb.r = ~~(rgb.r/count);
//         rgb.g = ~~(rgb.g/count);
//         rgb.b = ~~(rgb.b/count);
    
//         return rgb;
//     }
function Mainshoe({shoe})
{
    
    const files = JSON.parse(shoe.filename);
    const mainPic = "/images/"+files[0];
    const url = "/product?id="+ encodeURIComponent(shoe.name) ;
    return(
        <section className={styles.wrapper}>
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

export default Mainshoe