import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore, auth } from "../../scripts/firebase";
import { Card, CardHeader, CardContent, CardActionArea, ListItem, ListItemAvatar, Avatar, ListItemText, List, Divider } from "@material-ui/core";
import { NavLink } from "react-router-dom";
const ChatRoom = () => {
	const dummy = useRef();
	const messagesRef = firestore.collection("messages");
	const query = messagesRef.orderBy("createdAt").limit(25);
	const [messages] = useCollectionData(query, { idField: "id" });
	const [formValue, setFormValue] = useState("");
	const { uid, photoURL } = auth.currentUser;
	const sendMessage = async (e) => {
		e.preventDefault();

		await messagesRef.add({
			text: formValue,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			uid,
			photoURL,
		});
		setFormValue("");
		dummy.current.scrollIntoView({ behavior: "smooth" });
	};
	return (
		<>
			<div className='container mt-5'>
				<div class='row gx-5' style={{ placeContent: "center" }}>
					<div className='col-xl-5'>
						<Card>
							<CardHeader className='card-header bg-dark text-white' title='Chat Room'></CardHeader>

							<CardContent>
								<List>
									{messages &&
										messages.map((msg) => {
											if (msg.photoURL !== photoURL && msg.uid === uid) {
												msg.photoURL = photoURL;
											}
											return <ChatMessage key={msg.id} message={msg} />;
										})}
									<span ref={dummy}></span>
								</List>
							</CardContent>
							<CardActionArea>
								<form onSubmit={sendMessage}>
									{" "}
									<div style={{ height: "3rem" }} class='input-group '>
										<input
											className='form-control'
											style={{
												borderLeft: "none",
												borderRight: "none",
												borderBottom: "none",
												borderTopLeftRadius: 0,
												borderTopRightRadius: 0,
											}}
											value={formValue}
											onChange={(e) => setFormValue(e.target.value)}
											placeholder='say something nice'
										/>
										<div class='input-group-append'>
											<button
												style={{
													height: "100%",
													borderRight: "none",
													borderBottom: "none",
													borderTopLeftRadius: 0,
													borderTopRightRadius: 0,
												}}
												className='btn btn-outline-dark'
												type='submit'
												disabled={!formValue}>
												🕊️
											</button>
										</div>
									</div>
								</form>
							</CardActionArea>
						</Card>
					</div>
				</div>
			</div>
		</>
	);
};

const ChatMessage = (props) => {
	const { text, uid, photoURL } = props.message;

	const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
	const messageText = uid === auth.currentUser.uid ? "messageTextSent" : "messageTextRecieved";
	return (
		<>
		<ListItem className={messageClass}>
			<ListItemAvatar>
				<NavLink  to={{ pathname: "/viewuser", userProps: { userID: uid } }}>
					<Avatar alt='User' src={photoURL} style={{ width: "50px", height: "50px" }} />
				</NavLink>
			</ListItemAvatar>
			<ListItemText primary={text} className={messageText + " py-3"} style={{border:'black 1px'}}/>
		</ListItem>
		
		</>
		// <>	<NavLink className='nav-link' to={{pathname: "/viewuser", userProps: {userID: uid}, }} >
		// 	<div className={`message ${messageClass} my-3`}>
		// 		<img alt='' style={{ width: 50, borderRadius: "50%" }} src={photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"} />
		// 		<span className='mx-4'>{text}</span>
		// 	</div>
		// 	</NavLink>
		// </>
	);
};

export default ChatRoom;
