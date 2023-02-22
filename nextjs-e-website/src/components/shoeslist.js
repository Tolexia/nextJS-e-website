import { getDatabase, ref, get, set, push, child, onChildAdded, onChildChanged, onChildRemoved  } from "firebase/database"
import { createRoot } from 'react-dom/client';
import Link from 'next/link';
import Image from 'next/image'
import styles from '@/styles/Shoeslist.module.css'
import React, { useState, useRef,useEffect } from 'react';



export default function Shoeslist()
{
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [shoeslist, setShoeslist] = useState(<div id = "shoelist" ></div>);
    function getNewRef(e)
    {
      const button = e.target;
      button.parentNode.querySelector('.fakeform').style.display = "flex";
    }
    function insertNewShoes(e, db) {
        let name = e.target.parentNode.querySelector("#name").value;
        let price = e.target.parentNode.querySelector("#price").value;
        const postData =  {
            name: name,
            price: price,
            discount: discount,
            brand: brand,
            description: description,
            filename: image.name
        }

        const postListRef = ref(db, 'shoes');
        const newPostRef = push(postListRef);
        set(newPostRef, postData);
        uploadToServer()
    }
    const uploadToClient = (event) => {
      if (event.target.files && event.target.files[0]) {
        const i = event.target.files[0];
        console.log(i);
        setImage(i);
        setCreateObjectURL(URL.createObjectURL(i));
      }
    };

    const uploadToServer = async (event) => {
      const body = new FormData();
      body.append("file", image);
      const response = await fetch("/api/file", {
        method: "POST",
        body
      });
    };
    const db = getDatabase();
    const dbRef = ref(db);
    const shoes = [];
    get(child(dbRef, `shoes`))
    .then((snapshot) => {
      if (snapshot.exists()) 
      {
        let i = 0;
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            let url = "/product?id="+ encodeURIComponent(childData.name) ;
            let filepath = "/images/"+childData.filename;
            let shoe = <div id={i}  key={i} value = {i}>
                <Link href = {url}  className= {styles.shoelistItem}>
                <Image
                    src= {filepath}
                    alt="cart"
                    width={100}
                    height={100}
                    priority
                  />
                  <span>{childData.name} : ${childData.price}</span>
                </Link>
            </div>
            shoes.push(shoe)
            i++;
        });
        setShoeslist(<div id = "shoelist" >
          <ul  className= {styles.shoelist}>
            {shoes}
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
        {shoeslist}
        <button onClick={e => getNewRef(e, db)}>Add shoes</button>
        <div className={'fakeform '+styles.fakeform} style={{"display":"none"}}>
            <input type="text" id = "name" placeholder='Name'/>
            <input type="text" id = "price" placeholder='Price' />
            <input type="text" id = "discount" placeholder='discount' />
            <input type="text" id = "brand" placeholder='brand' />
            <textarea id = "description"></textarea>
            <div className= {styles.fileupload}>
              <img src={createObjectURL} />
              <h4>Select Image</h4>
              <input type="file" name="myImage" onChange={uploadToClient} />
              {/* <button
                className="btn btn-primary"
                type="submit"
                onClick={uploadToServer}
                >
                Send to server
              </button> */}
            </div>
            <button className= {styles.save} onClick={e => insertNewShoes(e, db)}>Save</button>
        </div>
    </div>
  )
}