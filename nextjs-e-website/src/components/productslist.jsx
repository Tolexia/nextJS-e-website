import { getDatabase, ref, get, set, push, child, onChildAdded, onChildChanged, onChildRemoved  } from "firebase/database"
import { createRoot } from 'react-dom/client';
import Link from 'next/link';
import Image from 'next/image'
import styles from '@/styles/Productslist.module.css'
import React, { useState, useRef,useEffect } from 'react';
import firebase_app from "@/components/config"


export default function Productslist()
{
    const [images, setImages] = useState([]);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [productslist, setProductslist] = useState(<div id = "productlist" ></div>);
    function getNewRef(e)
    {
      const button = e.target;
      button.parentNode.querySelector('.fakeform').style.display = "flex";
    }
    function insertNewProducts(e, db) {
        let name = e.target.parentNode.querySelector("#name").value;
        let price = e.target.parentNode.querySelector("#price").value;
        const filename = [];
        images.forEach(image => {
          filename.push(image.name)
        })
        const postData =  {
            name: name,
            price: price,
            discount: discount,
            brand: brand,
            description: description,
            filename: JSON.stringify(filename)
        }

        const postListRef = ref(db, 'products');
        const newPostRef = push(postListRef);
        set(newPostRef, postData);
        uploadToServer()
    }
    const uploadToClient = (event) => {
      if (event.target.files) {
        let n = 0;
        const object = []
        for(let i of event.target.files)
        {
          console.log(i);
          setImages(images.push(i));
          object.push(<Image key = {n} width={150} height={150} src={URL.createObjectURL(i)} />)
          n++;
        }
        setCreateObjectURL(object);
      }
    };

    const uploadToServer = async (event) => {
      const body = new FormData();
      body.append("files", images);
      const response = await fetch("/api/file", {
        method: "POST",
        body
      });
    };
    const db = getDatabase(firebase_app);
    const dbRef = ref(db);
    const products = [];
    get(child(dbRef, `products`))
    .then((snapshot) => {
      if (snapshot.exists()) 
      {
        let i = 0;
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            let url = "/product?id="+ encodeURIComponent(childData.name) ;
            const files = JSON.parse(childData.filename);
            const mainPic = files[0];
            childData.filename = "/images/"+mainPic;
            let product = <div id={i}  key={i} value = {i}>
                <Link href = {url}  className= {styles.productlistItem}>
                <Image
                    src= {childData.filename}
                    alt="cart"
                    width={100}
                    height={100}
                    priority
                  />
                  <span>{childData.name} : ${childData.price}</span>
                </Link>
            </div>
            products.push(product)
            i++;
        });
        setProductslist(<div id = "productlist" >
          <ul  className= {styles.productlist}>
            {products}
          </ul>
        </div>
        )
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  return (
    <div>
        {productslist}
        <button className= {styles.save} onClick={e => getNewRef(e, db)}>New</button>
        <div className={'fakeform '+styles.fakeform} style={{"display":"none"}}>
            <input type="text" id = "name" placeholder='Name'/>
            <input type="text" id = "price" placeholder='Price' />
            <input type="text" id = "discount" placeholder='discount' />
            <input type="text" id = "brand" placeholder='brand' />
            <textarea id = "description" placeholder="description"></textarea>
            <div className= {styles.fileupload}>
              {createObjectURL}
              <h4>Add Images</h4>
              <input type="file" multiple name="myImage" onChange={uploadToClient} />
            </div>
            <button className= {styles.save} onClick={e => insertNewProducts(e, db)}>Save</button>
        </div>
    </div>
  )
}