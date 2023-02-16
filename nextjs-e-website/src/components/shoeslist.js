import { getDatabase, ref, get, set, push, child, onChildAdded, onChildChanged, onChildRemoved  } from "firebase/database"
import { createRoot } from 'react-dom/client';
import Link from 'next/link';
import Image from 'next/image'
import styles from '@/styles/Shoeslist.module.css'

function getNewRef(e)
{
  const button = e.target;
  button.parentNode.querySelector('.fakeform').style.display = "block";
}
function insertNewShoes(e, db) {
    let name = e.target.parentNode.querySelector("#name").value;
    let price = e.target.parentNode.querySelector("#price").value;
    const postData =  {
        name: name,
        price: price,
    }

    const postListRef = ref(db, 'shoes');
    const newPostRef = push(postListRef);
    set(newPostRef, postData);

}

export default function Shoeslist()
{
    const db = getDatabase();
    const dbRef = ref(db);
    const shoes = [];
    get(child(dbRef, `shoes`))
    .then((snapshot) => {
      if (snapshot.exists()) 
      {
        const divList = document.querySelector('#shoelist');
          let i = 0;
          let newRoot = createRoot(divList);
          snapshot.forEach((childSnapshot) => {
              const childData = childSnapshot.val();
              console.log(childData)
              let url = "/product?id="+ encodeURIComponent(childData.name) ;
              let filepath = "/images/"+childData.filename;
              let shoe = <div id={i}  key={i} value = {i}>
                  <Link href = {url}  className= {styles.shoelistItem}>
                  <Image
                      src= {filepath}
                      alt="cart"
                      width={250}
                      height={250}
                      priority
                    />
                    <span>{childData.name} : {childData.price} €</span>
                  </Link>
              </div>
              shoes.push(shoe)
              i++;
          });
          newRoot.render(
            <ul  className= {styles.shoelist}>
              {shoes}
            </ul>
          )
          
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  return (
    <div>
        <div id = "shoelist" >
            {shoes}
        </div>
        <button onClick={e => getNewRef(e, db)}>Ajouter chaussures</button>
        <div className='fakeform' style={{"display":"none"}}>
            <input type="text" id = "name" placeholder='Name'/>
            <input type="text" id = "price" placeholder='Price' />
            <button onClick={e => insertNewShoes(e, db)}>Enregistrer</button>
        </div>
    </div>
  )
}