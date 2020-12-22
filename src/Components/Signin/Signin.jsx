import React from "react";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitChange = () => {
    console.log(this.state);
    fetch('http://localhost:3001/signin',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        email:this.state.signInEmail,
        password:this.state.signInPassword,
      })
    })
    .then(response => response.json())
    .then(user =>{
      if(user.id){
        this.props.loadUser(user);
        this.props.onRouteChange("home");
      }
    })
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className=" tc center mw8 b--black-10 mv6 ">
        <main className="pa4 black-80 shadow-2">
          <div className="measure">
            <div id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f5 fw6 ph0 mh0 tc">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange = {this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input 
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="password"
                name="password"
                id="password"
                onChange = {this.onPasswordChange}
                />
              </div>
            </div>
            <div className="">
              <input
                onClick={this.onSubmitChange}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange("register")}
                className="f6 link dim black db grow pointer"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
