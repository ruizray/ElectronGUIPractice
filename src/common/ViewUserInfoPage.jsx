import React, {useEffect, useState } from "react";
import * as fa from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ViewUserInfoForm from "./ViewUserInfoForm";
import firebase from "firebase";
import "firebase/firestore";

import { List, ListItem,  ListItemText} from "@material-ui/core";
import { useLocation } from "react-router-dom";


const ViewUserInfoPage = () => {
	const [userData, setUserData] = useState({});
	const [socialsData, setSocialsData] = useState({});

	let location = useLocation();

	let userId = location.userProps;


	useEffect(() => {
		let ignore = false;
		const getdata = async () => {
			var results = await firebase.firestore().collection("users").doc(userId.userID).get();
			console.log(results);
			if (!results) {
				firebase.firestore().collection("users").doc(userId.userID).set({
					userName: "",
				});
			}
			console.log(results);
			const data = results.data();
			console.log(data);
			const obj = {
				username: data.userName || "",
				email: data.email || "",
				firstname: data.firstName || "",
				lastname: data.lastName || "",
				profilePhoto: data.profilePhoto || "",
			};
			if (!ignore) {
				setUserData(obj);
				setSocialsData(data.socials);
			}
		};

		getdata();
		return () => {
			ignore = true;
		};
	}, []);

	const icons = {
		google: fa.faGoogle,
		twitter: fa.faTwitter,
		github: fa.faGithub,
		instagram: fa.faInstagram,
	};

	const renderLists = () => {


		return Object.keys(socialsData).map((key, value) => {
			return (
				<ListItem key={key}>
					<FontAwesomeIcon style={{ marginRight: "1rem" }} size='2x' icon={icons[key]} />
					<ListItemText primary={socialsData[key].username} />
				</ListItem>
			);
		});

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
								<img src={userData.profilePhoto} alt='Admin' className='rounded-circle' width='150' />

								<div className='caption fst-italic text-muted mb-4'>JPG or PNG no larger than 5 MB</div>

								<button className='btn btn-primary mdc-ripple-upgraded' type='button'>
									Upload new image
									<i className='material-icons trailing-icon'>upload</i>
								</button>
							</div>
						</div>

						<div style={{ width: "100%" }}>
							<List style={{ width: "100%" }}>
								{renderLists()}

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
								<ViewUserInfoForm userData={userData} />
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewUserInfoPage;
 