import {useState, useEffect } from "react"
import styles from "@/styles/Cart.module.css";


export default function Cart()
{
    let [cart, setCart] = useState(<div></div>)
    useEffect(() => {
        if(localStorage.getItem('cart') != null)
        {
            let i = 0;
            const order = [];
            const cartItems = JSON.parse(localStorage.getItem('cart'));
            let newItemCount = 0;
            cartItems.forEach((item) => {
                newItemCount += item.nb;
                let files = JSON.parse(item.filename);
                let mainPic = files[0];
                if(!mainPic.match('images'))
                {
                    item.filename = "/images/"+mainPic
                }
                let product = 
                <div id={i}  key={i} value = {i} className = {styles.cartItem}>
                    <new Image
                        src= {item.filename}
                        alt={item.name}
                        width={40}
                        height={40}
                    />
                    <div className = {styles.itemDescription}>
                        <span>{item.name}</span>
                        <span>${item.price} x {item.nb} <b>${parseFloat(item.price) * item.nb}</b></span>
                    </div>
                    <span className= {styles.removal} data-id = {i} onClick={e => confirm("Remove this item ?") ? removeItemFromCart(e.target.dataset.id) : ""}>X</span>
                </div>
                order.push(product)
                i++;
            });
            if(order.length > 0 )
            {
                setCart(
                <div>
                    {order}
                </div>)
            }
        }
    }, [])
    return (
        <div className={styles.cartSection}>
            <h2>SUMMARY</h2>
            {cart}
        </div>
    )
}