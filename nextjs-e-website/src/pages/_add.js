import { getDatabase, ref, get, set, push, child, onChildAdded, onChildChanged, onChildRemoved  } from "firebase/database"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {ReactDOM, createPortal} from 'react-dom';
import { createRoot } from 'react-dom/client';

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
    const firebaseConfig = {
        apiKey: "AIzaSyCGIARWqNieo45Bkni9THq4duor3JwcpQU",
        authDomain: "nextjs-e-website.firebaseapp.com",
        databaseURL: "https://nextjs-e-website-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "nextjs-e-website",
        storageBucket: "nextjs-e-website.appspot.com",
        messagingSenderId: "218373834438",
        appId: "1:218373834438:web:c98f0e1f0c63c32985f9c7",
        measurementId: "G-P35WYNB4PN"
      };
      let analytics;
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      if (app.name && typeof window !== 'undefined') {
        analytics = getAnalytics(app);
      }
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
                let shoe = <div id={i}  key={i} value = {i}>
                    <span>{childData.name} : {childData.price} €</span>
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
      console.log(shoes)
    //   const shoeListRef = ref(db, 'shoes');
    //   const shoesDb = get(db, shoeListRef);
    //   console.log(shoesDb)
    //   for (var i=0; i < data.length; i++) 
    // {
    //     <li className='day' key={i} value = {i}>

    //       <span>{dataObject.day}</span>
    //     </li>;
    //     expenses.push(day)
    // }
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
            <div id = "shoelist">
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