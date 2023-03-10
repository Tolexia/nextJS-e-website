import { getDatabase, ref, get, set, push, child, onChildAdded, onChildChanged, onChildRemoved  } from "firebase/database"
import { createRoot } from 'react-dom/client';
import Link from 'next/link';
import Image from 'next/image'
import styles from '@/styles/Shoeslist.module.css'
import React, { useState, useRef,useEffect } from 'react';



export default function Shoeslist()
{
    const [images, setImages] = useState([]);
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

        const postListRef = ref(db, 'shoes');
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
          object.push(<img key = {n} width={150} height={150} src={URL.createObjectURL(i)} />)
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
            const files = JSON.parse(childData.filename);
            const mainPic = files[0];
            childData.filename = "/images/"+mainPic;
            let shoe = <div id={i}  key={i} value = {i}>
                <Link href = {url}  className= {styles.shoelistItem}>
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
            <button className= {styles.save} onClick={e => insertNewShoes(e, db)}>Save</button>
        </div>
    </div>
  )
}