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

{
	/*
<div className="mx-4 my-4">
      <div className="main-body">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src={user.user.photoURL}
                    alt="Admin"
                    className="rounded-circle"
                    width="150"
                  />
                  <div className="mt-3">
                    <h4>{user.user.displayName || '-'}</h4>
                    <p className="text-secondary mb-1">Position PlaceHolder</p>
                    <p className="text-muted font-size-sm">
                      Location Placeholder
                    </p>
                    <button className="btn btn-primary">Follow</button>
                    <button className="btn btn-outline-primary">Message</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mt-3">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">Website</h6>
                  <span className="text-secondary">Here</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <FontAwesomeIcon icon={fa.faGoogle} /> Google
                  </h6>
                  {doesAccountExist('google.com')}
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <FontAwesomeIcon icon={fa.faGithub} /> Github
                  </h6>
                  <span className="text-secondary">
                    <button
                   
                      className="btn btn-secondary"
                    >
                      Link
                    </button>
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <FontAwesomeIcon icon={fa.faTwitter} /> Twitter
                  </h6>
                  {doesAccountExist('twitter.com')}
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <FontAwesomeIcon icon={fa.faInstagram} />
                    Instagram
                  </h6>
                  <span className="text-secondary">bootdey</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <FontAwesomeIcon icon={fa.faFacebook} />
                    Facebook
                  </h6>
                  <span className="text-secondary">bootdey</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Full Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {user.user.displayName}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    {user.user.email}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Phone</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">(239) 816-9029</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Mobile</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">(320) 380-4539</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Address</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                    Bay Area, San Francisco, CA
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-12">
                    <a
                      className="btn btn-info "
                      target="__blank"
                      href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills"
                    >
                      Edit
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="row gutters-sm">
              <div className="col-sm-6 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h6 className="d-flex align-items-center mb-3">
                      <i className="material-icons text-info mr-2">
                        assignment
                      </i>
                      Project Status
                    </h6>
                    <small>Web Design</small>
                    <div className="progress mb-3" style={{ height: 5 }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: '80%' }}
                        aria-valuenow="80"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>Website Markup</small>
                    <div className="progress mb-3" style={{ height: 5 }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: '72%' }}
                        aria-valuenow="72"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>One Page</small>
                    <div className="progress mb-3" style={{ height: 5 }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: '89%' }}
                        aria-valuenow="89"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>Mobile Template</small>
                    <div className="progress mb-3" style={{ height: 5 }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: '55%' }}
                        aria-valuenow="55"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small>Backend API</small>
                    <div className="progress mb-3" style={{ height: 5 }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{ width: '66%' }}
                        aria-valuenow="66"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */
}
