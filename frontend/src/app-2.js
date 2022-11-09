import logo from "./logo.svg";
import "./App.css";
import React from "react";

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
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  signInSuccessUrl: "/signedIn",
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  callbacks: false,
};

class SignedInComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      // newPostMessage: null,
      // newFile: null,
    };
  }

  async refreshFeed() {
    const token = await firebase.auth().currentUser?.getIdToken();
    console.log(token);

    try {
      const response = await fetch("http://localhost:4000/dev/feed", {
        headers: {
          Authorization: token,
        },
      });
      if (response.status === 401) {
        console.log("unauthorized");
      } else {
        const data = await response.json();
        this.setState({ data });
      }
    } catch (err) {
      console.error(err);
    }
  }

  componentDidMount() {
    this.refreshFeed();
  }

  signOut() {
    firebase.auth().signOut();
  }

  async submit() {
    const token = await firebase.auth().currentUser?.getIdToken();
    let formData = undefined;
    if (this.state.newFile) {
      console.log("adding form data");
      formData = new FormData();
      formData.append("uploadedFile", this.state.newFile);

      await fetch("http://localhost:4000/dev/feedUpload", {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      });
    }

    try {
      const response = await fetch("http://localhost:4000/dev/feed", {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: JSON.stringify({ message: this.state.newPostMessage }),
      });
      if (response.status === 401) {
        console.log("unauthorized");
      } else {
        this.refreshFeed();
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const userName = firebase.auth().currentUser?.email;
    return (
      <section className="section">
        <div className="container has-text-centered">
          Hello {userName}! You're now signed in
          <div className="title">My Feed</div>
          <ul>
            {this.state.data &&
              this.state.data.Items.map((item, index) => {
                return (
                  <li key={index}>
                    {item.message} from {item.userKey} on {item.timestamp}
                  </li>
                );
              })}
          </ul>
          <hr></hr>
          <div className="title">Create a post</div>
          <div>
            <input
              type="text"
              onChange={(event) =>
                this.setState({ newPostMessage: event.target.value })
              }
            ></input>
            <input
              type="file"
              onChange={(event) =>
                this.setState({ newFile: event.target.files[0] })
              }
            ></input>
          </div>
          <div>
            <button onClick={() => this.submit()}>Submit</button>
          </div>
          <button onClick={() => this.signOut()}>Sign out</button>
        </div>
      </section>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    if (this.state.user) {
      return <SignedInComponent user={this.state.user} />;
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
