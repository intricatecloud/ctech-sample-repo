import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import LandingPageBody from './LandingPageBody'
import SignUpPage from './SignUpPage'

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feed: null,
      newPostMessage: null,
      // newFile: null,
    };
  }

  async refreshFeed() {
    const token = 'fake1'
    console.log(token);

    try {
      const response = await fetch("http://localhost:8080/data", {
        headers: {
          Authorization: token,
        },
      });
      if (response.status === 401) {
        console.log("unauthorized");
      } else {
        const data = await response.json();
        this.setState({ feed: data });
      }
    } catch (err) {
      console.error(err);
    }
  }

  componentDidMount() {
    this.refreshFeed();
  }

  signOut() {

  }

  async submit() {
    const token = 'fake'

    try {
      const response = await fetch("http://localhost:8080/data", {
        method: "POST",
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
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
    const userName = 'foobar'
    return (
      <section className="section">
        <div className="container has-text-centered">
          Hello {userName}! You're now signed in
          <div className="title">My Feed</div>
          <ul>
            {this.state.feed &&
              this.state.feed.map((item, index) => {
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
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPageBody />}>
          </Route>
          <Route path="/signup" element={<SignUpPage />}>
          </Route>
          <Route path="/dashboard" element={<DashboardPage user={this.state.user} />}>
          </Route>
        </Routes>
      </Router>
    )
  }
}


export default App;
