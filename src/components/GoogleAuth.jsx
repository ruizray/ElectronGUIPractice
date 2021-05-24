import React, { Component } from 'react'

class GoogleAuth extends Component {
  state = {
    isSignedIn: false,
    text: ''
  }

  componentDidMount() {
    window.gapi.load('auth2', this.init())
  }
  renderButton = () => {
    window.gapi.signin2.render("signin-button", {
      scope: "profile email",
      width: 240,
      height: 50,
      longtitle: true,
      theme: "dark",
      onsuccess: this.onSuccess,
      onfailure: this.onFailure,
    });

  };

  onSuccess = (googleUser) => {
    const text = "Logged in as: " + googleUser.getBasicProfile().getName()
    this.setState({ text })
    console.log("Logged in as: " + googleUser.getBasicProfile().getName());
  };

  onFailure = (error) => {
    console.error(error);
  };

  initAuth = () => {
    return window.gapi.auth2.init({
      client_id: "875088528337-s8vg8pjfare4cu3l5blvtvak0ucqdpsj.apps.googleusercontent.com", //paste your client ID here
      scope: "https://www.googleapis.com/auth/analytics.readonly",
    });
  };

  checkSignedIn = () => {
    var promise = new Promise((resolve, reject) => {
      this.initAuth() //calls the previous function
        .then(() => {
          const auth = window.gapi.auth2.getAuthInstance(); //returns the GoogleAuth object

          resolve(auth.isSignedIn.get()); //returns whether the current user is currently signed in
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  };

  init = () => {
    //(2)
    this.checkSignedIn().then(signedIn => {
      if (signedIn === false) {
        this.setState({ text: "Not Currently Logged In" })
        this.renderButton()
      }
      this.setState({ isSignedIn: signedIn })
      this.renderButton()

    })
      .catch(error => {
        console.error(error)
        console.log("error")
      })
  }

  render() {
    return (
      <div style={{ width: '100%' }} >

        <div className="small">{this.state.text}</div>
        <div style={{ width: '100%' }} id="signin-button"></div>
      </div>

    );
  }
}

export default GoogleAuth;


