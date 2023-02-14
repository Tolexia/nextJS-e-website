import { getDatabase, ref, get, set, push, child, onChildAdded, onChildChanged, onChildRemoved  } from "firebase/database"
import { createRoot } from 'react-dom/client';
import Link from 'next/link';
import Image from 'next/image'

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

function refreshShoesList()
{

}

export default function Add()
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
              let url = "/product?id="+ encodeURIComponent(childData) ;
              let filepath = "/images/"+childData.filename;
              let shoe = <div id={i}  key={i} value = {i}>
                  <Link href = {url}>
                  <Image
                      src= {filepath}
                      alt="cart"
                      width={100}
                      height={100}
                      priority
                    />
                    <span>{childData.name} : {childData.price} €</span>
                  </Link>
              </div>
              shoes.push(shoe)
              i++;
          });
          newRoot.render(
            <ul>
              {shoes}
            </ul>
          )
          
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  //   onChildAdded(commentsRef, (data) => {
  //     addCommentElement(postElement, data.key, data.val().text, data.val().author);
  //   });
    
  //   onChildChanged(commentsRef, (data) => {
  //     setCommentValues(postElement, data.key, data.val().text, data.val().author);
  //   });
    
  //   onChildRemoved(commentsRef, (data) => {
  //     deleteComment(postElement, data.key);
  //   });
  return (
    <div>
        <div id = "shoelist" className="shoelist">
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