import React from "react";


import firebase from "firebase";


import { useState, useEffect } from "react";
import InputFrom from "../common/Input";
import {auth } from "./../scripts/firebase";

const ViewUserInfoForm = (props) => {
	const [data, setData] = useState(props.userData);

	useEffect(() => {
    console.log("Getting")
		setData(props.userData)
	});

	return (
		<>
			<div className='mb-4'>
				{" "}
				<div key={data.username}>
					<InputFrom
          disabled={true}
						name={"username"}
						label={"Username"}
						type={"text"}
						variant={"filled"}
						autoFocus={true}
						defaultValue={data.username || "Username Not Set"}
					/>
				</div>
			</div>
			<div className='row mb-4'>
				<div className='col-md-12'>
					<div key={data.email}>
						<InputFrom disabled={true} name={"email"} label={"Email"} type={"text"} variant={"filled"} autoFocus={true} defaultValue={data.email || ""} />
					</div>
				</div>
			</div>
			<div className='row mb-4'>
				<div className='col-md-6'>
					<div key={data.firstname}>
						<InputFrom
            disabled={true}
							name={"firstname"}
							label={"First Name"}
							type={"text"}
							variant={"filled"}
							autoFocus={true}
							defaultValue={data.firstname || ""}
						/>
					</div>
				</div>

				<div className='col-md-6'>
					<div key={data.lastname}>
						<InputFrom
            disabled={true}
							name={"lastname"}
							label={"Last Name"}
							type={"text"}
							variant={"filled"}
							autoFocus={true}
							defaultValue={data.lastname || ""}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default ViewUserInfoForm;

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