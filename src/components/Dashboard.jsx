import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from "@fortawesome/free-solid-svg-icons";
import Movies from "./Movies";
import Stuff from "./Stuff";
import Counter from "./Counters";
import Analytics from "./Analytics";
import Database from "./Database/Database";
import PrivacyPolicy from "./PrivacyPolicy";
import TopNav from "./TopNav";
import ChatRoom from "../common/Chat/Chatroom";

import UserContext, { UserConsumer } from "../contexts/UserContext";
import UserInfoPage from "../common/UserInfoPage";
import ViewUserInfoPage from './../common/ViewUserInfoPage';

class Dashboard extends Component {
	state = {
		dropdownToggled: false,
		drawerToggled: false,
	};
	handleNavToggle = () => {
		console.log(this.state.drawerToggled);
		this.setState({ drawerToggled: !this.state.drawerToggled });
	};
	handleDropdownToggle = () => {
		console.log(this.state.drawerToggled);
		this.setState({ dropdownToggled: !this.state.dropdownToggled });
	};
	test = () => {
		console.log("test");
		if (this.state.drawerToggled === true) {
			this.setState({ drawerToggled: false });
		}
		if (this.state.dropdownToggled === true) {
			console.log("clicked");
			this.setState({ dropdownToggled: !this.state.dropdownToggled });
		}
	};
	render() {
		return (
			<UserConsumer>
				{(UserContext) => (
					<React.Fragment>
						<div
							id='body'
							onClick={this.test}
							className={this.state.drawerToggled === false ? "nav-fixed bg-light toggled" : "nav-fixed bg-light toggled drawer-toggled"}>
							<TopNav
								onNavToggle={this.handleNavToggle}
								onDropdownToggle={this.handleDropdownToggle}
								dropdownToggled={this.state.dropdownToggled}
							/>
							<div id='layoutDrawer'>
								<div id='layoutDrawer_nav'>
									<nav className='drawer accordion drawer-light bg-white' id='drawerAccordion'>
										<div className='drawer-menu'>
											<div className='nav'>
												<div className='drawer-menu-heading d-sm-none'>Account</div>

												<a className='nav-link d-sm-none' href='#!'>
													<div className='nav-link-icon'>
														<i className='material-icons'>notifications</i>
													</div>
													Notifications
												</a>

												<a className='nav-link d-sm-none' href='#!'>
													<div className='nav-link-icon'>
														<i className='material-icons'>mail</i>
													</div>
													Messages
												</a>

												<div className='drawer-menu-divider d-sm-none'></div>

												<div className='drawer-menu-heading'>Interface</div>

												<NavLink className='nav-link' to='/analytics'>
													<div className='sb-nav-link-icon'>
														<FontAwesomeIcon icon={fa.faTachometerAlt} /> Google Analytics
													</div>
												</NavLink>

												<NavLink className='nav-link' to='/chatroom'>
													<div className='sb-nav-link-icon'>
														<FontAwesomeIcon icon={fa.faTachometerAlt} /> Chat Room
													</div>
												</NavLink>
											</div>
										</div>

										<div className='drawer-footer border-top'>
											<div className='d-flex align-items-center'>
												<i className='material-icons text-muted'>account_circle</i>
												<div className='ms-3'>
													<div className='caption'>Logged in as:</div>
													<div className='small fw-500'>Start Bootstrap</div>
												</div>
											</div>
										</div>
									</nav>
								</div>
								<div id='layoutDrawer_content'>
									<main>
										<Route exact path='/!' component={Analytics} />
										<Route exact path='/' component={Analytics} />
										<Route exact path='/movies' component={Movies} />
										<Route path='/stuff' component={Stuff} />
										<Route path='/counter' component={Counter} />
						
										<Route path='/analytics' render={(props) => <Analytics userinfo={this.state.user} />} />
										<Route exact path='/userInfo' component={UserInfoPage} />
										<Route path='/chatroom' component={ChatRoom} />
										<Route path='/database' component={Database} />
										<Route path='/privacyPolicy' component={PrivacyPolicy} />
                    <Route exact path='/viewuser' component={ViewUserInfoPage}/>
										
									</main>

									<footer className='py-4 mt-auto border-top' style={{ minheight: "74px" }}>
										<div className='container-xl px-5'>
											<div className='d-flex flex-column flex-sm-row align-items-center justify-content-sm-between small'>
												<div className='me-sm-2'>Copyright &copy; Your Website 2021</div>
												<div className='d-flex ms-sm-2'>
													<a className='text-decoration-none' href='#!'>
														Privacy Policy
													</a>
													<div className='mx-1'>&middot;</div>
													<a className='text-decoration-none' href='#!'>
														Terms &amp; Conditions
													</a>
												</div>
											</div>
										</div>
									</footer>
								</div>
							</div>
						</div>
					</React.Fragment>
				)}
			</UserConsumer>
		);
	}
}

Dashboard.contextType = UserContext;
export default Dashboard;

