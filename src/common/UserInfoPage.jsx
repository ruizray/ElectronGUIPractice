import React, { useContext, useState, useEffect } from "react";
import * as fa from "@fortawesome/free-brands-svg-icons";
import UserContext from "../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { linkTwitter,  getProviderPhoto, linkGoogle, linkGithub, unlinkProvider } from "../scripts/firebase";
import UserInfoForm from "../components/UserInfoForm";
import firebase from "firebase";
import "firebase/firestore";
import { auth } from "./../scripts/firebase";
import { List, ListItem, ListItemSecondaryAction, ListItemText, Tooltip } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";

import PhotoIcon from "@material-ui/icons/Photo";

import LinkOffIcon from "@material-ui/icons/LinkOff";
import DeleteIcon from "@material-ui/icons/Delete";


const UserInfoPage = () => {
	const user = useContext(UserContext);
	const [userData, setUserData] = useState({});
  const [socialsData, setSocialsData]= useState({});
	useEffect(() => {
		let ignore = false;
		const getdata = async () => {
			if (auth.currentUser == null) {
				return;
			}

			const uid = auth.currentUser.uid;
			var results = await firebase.firestore().collection("users").doc(uid).get();
			if (!results) {
				firebase.firestore().collection("users").doc(uid).set({
					userName: "",
				});
			}
			console.log(results);
			const data = results.data();
			console.log(data);
			const obj = {
				username: data.userName,
				email: data.email || "",
				firstname: data.firstName,
				lastname: data.lastName,
			};
			if (!ignore){
        setUserData(obj);
        setSocialsData(data.socials)
      } 
		};

		getdata();
		return () => {
			ignore = true;
		};
	},[]);
	const buttons = {
		"google.com": linkGoogle,
		"twitter.com": linkTwitter,
		"github.com": linkGithub,
	};

	const doesAccountExist = (provider) => {
const info = socialsData[provider]

		if (info) {console.log(info.profilePhoto)
			return (
				<>
					<ListItemText primary={info.username} secondary='Linked' />
					<ListItemSecondaryAction>
						<Tooltip title='Unlink' aria-label='Unlink'>
							<IconButton onClick={() => unlinkProvider(provider)} edge='end' aria-label='delete'>
								<DeleteIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title='Use Profile Picture' aria-label='Use Profile Picture'>
							<IconButton onClick={() => getProviderPhoto( info.profilePhoto) } edge='end' aria-label='delete'>
								<PhotoIcon />
							</IconButton>
						</Tooltip>
					</ListItemSecondaryAction>{" "}
				</>
			);
		} else {
			return (
				<>
					<ListItemText primary='Unlinked' />
					<ListItemSecondaryAction>
						<Tooltip title='Link Account' aria-label='Link Account'>
							<IconButton onClick={buttons[provider]} edge='end' aria-label='delete'>
								<LinkOffIcon />
							</IconButton>
						</Tooltip>
					</ListItemSecondaryAction>{" "}
				</>
			);
		}
	};

	return (
		<div className='container-xl p-5'>
			<mwc-tab-bar style={{ marginbottom: "-1px" }} activeindex='2'>
				<mwc-tab
					label='Billing'
					icon='account_balance'
					stacked=''
					onclick='location.href="app-account-billing.html"'
					dir=''
					id='mdc-tab-1'></mwc-tab>
				<mwc-tab
					label='Notifications'
					icon='notifications'
					stacked=''
					onclick='location.href="app-account-notifications.html"'
					dir=''
					id='mdc-tab-2'></mwc-tab>
				<mwc-tab
					label='Profile'
					icon='person'
					stacked=''
					onclick='location.href="app-account-profile.html"'
					dir=''
					id='mdc-tab-3'
					active=''></mwc-tab>
				<mwc-tab label='Security' icon='security' stacked='' onclick='location.href="app-account-security.html"' dir='' id='mdc-tab-4'></mwc-tab>
			</mwc-tab-bar>

			<hr className='mt-0 mb-5' />

			<div className='row gx-5'>
				<div className='col-xl-4'>
					<div className='card card-raised mb-5'>
						<div className='card-body p-5'>
							<div className='card-title'>Profile Image</div>
							<div className='card-subtitle mb-4'>This image will be publicly visible to other users.</div>
							<div className='text-center'>
								<img src={user.user.photoURL} alt='Admin' className='rounded-circle' width='150' />

								<div className='caption fst-italic text-muted mb-4'>JPG or PNG no larger than 5 MB</div>

								<button className='btn btn-primary mdc-ripple-upgraded' type='button'>
									Upload new image
									<i className='material-icons trailing-icon'>upload</i>
								</button>
							</div>
						</div>

						<div style={{ width: "100%" }}>
							<List style={{ width: "100%" }}>
								<ListItem>
									<FontAwesomeIcon style={{ marginRight: "1rem" }} size='2x' icon={fa.faGoogle} />
									{doesAccountExist("google")}
								</ListItem>
								<ListItem>
									<FontAwesomeIcon style={{ marginRight: "1rem" }} size='2x' icon={fa.faTwitter} />
									{doesAccountExist("twitter")}
								</ListItem>
								<ListItem>
									<FontAwesomeIcon style={{ marginRight: "1rem" }} size='2x' icon={fa.faGithub} />
									{doesAccountExist("github")}
								</ListItem>
							</List>
						</div>
					</div>
				</div>

				<div className='col-xl-8'>
					<div className='card card-raised mb-5'>
						<div className='card-body p-5'>
							<div className='card-title'>Account Details</div>
							<div className='card-subtitle mb-4'>Review and update your account information below.</div>
							<form>
								<UserInfoForm userData={userData} />
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserInfoPage;

