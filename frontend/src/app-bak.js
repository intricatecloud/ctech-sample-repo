import logo from './logo.svg';
import './App.css';
import React from 'react'

import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAE6FTbQqEas7fL6zw8up0T5YftioGLNbc",
  authDomain: "sb-gearbot-ui.firebaseapp.com",
  databaseURL: "https://sb-gearbot-ui.firebaseio.com",
  projectId: "sb-gearbot-ui",
  storageBucket: "sb-gearbot-ui.appspot.com",
  messagingSenderId: "556865132884",
  appId: "1:556865132884:web:afc8865fad972bcc8e50c1",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: false,
};



class SignedInComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null
    }
  }

  async componentDidMount() {
    const token = await firebase.auth().currentUser.getIdToken()
    try {
      const response = await fetch('https://ws00a11wig.execute-api.us-east-1.amazonaws.com/dev/whoami', {headers: { 'Authorization': token}})
      if (response.status === 401) {
        console.log('unauthorized')
      } else {
        const data = await response.json()
        this.setState({data})
      }

    } catch(err) {
      console.error(err)
    }
  }

  signOut() {
    firebase.auth().signOut()
  }

  render() {
    return (
      <section className="section">
        <div className="container has-text-centered">
          Hello {this.props.user.email}!
          You're now signed in

          {this.state.data && <img alt="profile" src={this.state.data.profileImageUrl}></img>}
          <button onClick={() => this.signOut()}>Sign out</button>
        </div>
      </section>
    )
  }

}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user});
      } else {
        this.setState({ user: null});
      }
    });
  }

  render() {
    if (this.state.user) {
      return <SignedInComponent user={this.state.user}/>
    }
    return (
      <section className="section">
        <div className="container has-text-centered">
          <h1 className="title">Twitter for Puppies</h1>
          <div className="subtitle">A place for puppies and people alike</div>
          <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
      </div>
      </section>
    );
  }

}

export default App;
