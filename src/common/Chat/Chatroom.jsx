import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { firestore, auth } from '../../scripts/firebase'

const ChatRoom = () => {
  const dummy = useRef()
  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt').limit(25)
  const [messages] = useCollectionData(query, { idField: 'id' })
  const [formValue, setFormValue] = useState('')
  const { uid, photoURL } = auth.currentUser
  const sendMessage = async e => {
    e.preventDefault()
    
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })
    setFormValue('')
    dummy.current.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <>
      <div className="container">
        <main>
          {messages &&
            messages.map(msg =>{
                if((msg.photoURL !== photoURL) && (msg.uid === uid) ){
                    msg.photoURL = photoURL;
                }
               return <ChatMessage key={msg.id} message={msg} /> 
            } )}
          <span ref={dummy}></span>
        </main>

        <form onSubmit={sendMessage}>
          {' '}
          <div class="input-group mt-3 mb-3">
            <input className="form-control"
              value={formValue}
              onChange={e => setFormValue(e.target.value)}
              placeholder="say something nice"
            />
            <div class="input-group-append">
              <button className="btn btn-outline-secondary"  type="submit" disabled={!formValue}>
                🕊️
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

const ChatMessage = props => {
  const { text, uid, photoURL } = props.message

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

  return (
    <>
      <div className={`message ${messageClass} my-3` }>
        <img
          alt=""
          style={{ width: 50, borderRadius: '50%' }}
          src={
            photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'
          }
        />
        <span className="mx-4" >{text}</span>
      </div>
    </>
  )
}

export default ChatRoom
