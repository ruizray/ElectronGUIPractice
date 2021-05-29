import React, { useContext, useEffect } from 'react'
import * as fa from '@fortawesome/free-brands-svg-icons'
import UserContext from '../contexts/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  linkTwitter,
  getProviderData,
  getProviderPhoto,
  linkGoogle,
  doesUserExist
} from '../scripts/firebase'
import Form from '../common/Form'
import Button from '@material-ui/core/Button';
const changeProfilePicture = provider => {
  getProviderPhoto(getProviderData(provider))
}
const UserInfoPage = () => {
  const user = useContext(UserContext)

  const buttons = {
    'google.com': linkGoogle,
    'twitter.com': linkTwitter
  }

  const doesAccountExist = provider => {
    const data = getProviderData(provider)
    if (data !== -1) {
      return (
        <>
          {' '}
          <span>
            <button
              onClick={() => changeProfilePicture(provider)}
              style={{ border: 'none' }}
              className="btn btn-secondary mx-3"
            >
              Use Profile Picture
            </button>
            <span className="text-secondary ml-5">
              {getProviderData(provider).displayName}
            </span>
          </span>
        </>
      )
    } else {
      return (
        <span className="text-secondary">
          <button onClick={buttons[provider]} className="btn btn-secondary">
            Link
          </button>
        </span>
      )
    }
  }

  return (
    <div class="container-xl p-5">
                  
                        <mwc-tab-bar style={{marginbottom: "-1px"}} activeindex="2">
                            <mwc-tab label="Billing" icon="account_balance" stacked="" onclick="location.href=&quot;app-account-billing.html&quot;" dir="" id="mdc-tab-1"></mwc-tab>
                            <mwc-tab label="Notifications" icon="notifications" stacked="" onclick="location.href=&quot;app-account-notifications.html&quot;" dir="" id="mdc-tab-2"></mwc-tab>
                            <mwc-tab label="Profile" icon="person" stacked="" onclick="location.href=&quot;app-account-profile.html&quot;" dir="" id="mdc-tab-3" active=""></mwc-tab>
                            <mwc-tab label="Security" icon="security" stacked="" onclick="location.href=&quot;app-account-security.html&quot;" dir="" id="mdc-tab-4"></mwc-tab>
                        </mwc-tab-bar>
                   
                        <hr class="mt-0 mb-5"/>
                    
                        <div class="row gx-5">
                            <div class="col-xl-4">
                           
                                <div class="card card-raised mb-5">
                                    <div class="card-body p-5">
                                        <div class="card-title">Profile Image</div>
                                        <div class="card-subtitle mb-4">This image will be publicly visible to other users.</div>
                                        <div class="text-center">
                                      
                                        <img
                    src={user.user.photoURL}
                    alt="Admin"
                    className="rounded-circle"
                    width="150"
                  />
                                        
                                            <div class="caption fst-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                                       
                                            <button class="btn btn-primary mdc-ripple-upgraded" type="button">
                                                Upload new image
                                                <i class="material-icons trailing-icon">upload</i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-8">
                             
                                <div class="card card-raised mb-5">
                                    <div class="card-body p-5">
                                        <div class="card-title">Account Details</div>
                                        <div class="card-subtitle mb-4">Review and update your account information below.</div>
                                        <form>
                                           
                                            <div class="mb-4"><mwc-textfield class="w-100" label="Username" outlined="" value="my-username"></mwc-textfield></div>
                                       
                                            <div class="row mb-4">
                                             
                                                <div class="col-md-6"><mwc-textfield class="w-100" label="First Name" outlined="" value="Valerie"></mwc-textfield></div>
                                             
                                                <div class="col-md-6"><mwc-textfield class="w-100" label="Last Name" outlined="" value="Luna"></mwc-textfield></div>
                                            </div>
                                          
                                            <div class="row mb-4">
                                            
                                                <div class="col-md-6"><mwc-textfield class="w-100" label="Organization Name" outlined="" value="Start Bootstrap"></mwc-textfield></div>
                                           
                                                <div class="col-md-6"><mwc-textfield class="w-100" label="Location" outlined="" value="Orlando, FL"></mwc-textfield></div>
                                            </div>
                              
                                            <div class="mb-4"><mwc-textfield class="w-100" label="Location" outlined="" type="email" value="name@example.com"></mwc-textfield></div>
                                           
                                            <div class="row mb-4">
                                              
                                                <div class="col-md-6"><mwc-textfield class="w-100" label="SMS Number" outlined="" type="tel" value="407-555-0187"></mwc-textfield></div>
                                      
                                                <div class="col-md-6">
                                                    <mwc-select class="w-100" outlined="" label="Birth Month">
                                                        <mwc-list-item value="January" selected="" mwc-list-item="" tabindex="0" aria-disabled="false" role="option" aria-selected="true">January</mwc-list-item>
                                                        <mwc-list-item value="February" mwc-list-item="" tabindex="-1" aria-disabled="false" role="option">February</mwc-list-item>
                                                        <mwc-list-item value="March" mwc-list-item="" tabindex="-1" aria-disabled="false" role="option">March</mwc-list-item>
                                                        <mwc-list-item value="April" mwc-list-item="" tabindex="-1" aria-disabled="false" role="option">April</mwc-list-item>
                                                        <mwc-list-item value="May" mwc-list-item="" tabindex="-1" aria-disabled="false" role="option">May</mwc-list-item>
                                                        <mwc-list-item value="June" mwc-list-item="" tabindex="-1" aria-disabled="false" role="option">June</mwc-list-item>
                                                        <mwc-list-item value="July" mwc-list-item="" tabindex="-1" aria-disabled="false" role="option">July</mwc-list-item>
                                                        <mwc-list-item value="August" mwc-list-item="" tabindex="-1" aria-disabled="false" role="option">August</mwc-list-item>
                                                        <mwc-list-item value="September" mwc-list-item="" tabindex="-1" aria-disabled="false" role="option">September</mwc-list-item>
                                                        <mwc-list-item value="October" mwc-list-item="" tabindex="-1" aria-disabled="false" role="option">October</mwc-list-item>
                                                        <mwc-list-item value="November" mwc-list-item="" tabindex="-1" aria-disabled="false" role="option">November</mwc-list-item>
                                                        <mwc-list-item value="December" mwc-list-item="" tabindex="-1" aria-disabled="false" role="option">December</mwc-list-item>
                                                    </mwc-select>
                                                </div>
                                            </div>
                              
                                            <div class="text-end"><button class="btn btn-primary mdc-ripple-upgraded" type="button">Save changes</button></div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
  )
}

export default UserInfoPage
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
