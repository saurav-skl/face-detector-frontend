import React, { Component } from "react";
import Particles from "react-particles-js";
import "./App.css";
import Navigation from "./Components/Navigation/Navigation.jsx";
import Card from "./Components/Card/Card.jsx";
import Box from "./Components/Box/Box";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition.jsx";
import Signin from "./Components/Signin/Signin.jsx";
import Register from "./Components/Register/Register.jsx";
import Rank from "./Components/Rank/Rank.jsx";

const particlesOptions = {
  particles: {
    shape: {
      type: "images",
    },
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 700,
      },
    },
  },
};

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: "",
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onButtonSubmit = () => {
    // console.log("apple");
    this.setState({ imageUrl: this.state.input });
    fetch("https://agile-dusk-05419.herokuapp.com/imageUrl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .catch((err) => console.log)
      .then((response) => {
        if (response) {
          fetch("https://agile-dusk-05419.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch((err) => console.log(err));
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => alert(err + "\nSorry " + this.state.user.name));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
      // console.log(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div>
        <Particles params={particlesOptions} className="particles" />
        <Navigation
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === "home" ? (
          <div>
            <Card />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <Box
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </div>
        ) : this.state.route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}
export default App;
