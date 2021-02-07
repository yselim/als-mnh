import React, { Component } from "react";
import AppContext from "../../AppContext";
import { authUser } from "../../firestoreMethods";
import { Redirect } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";

class LoginPage extends Component {
    static contextType = AppContext;
    
  
    constructor(props) {
      super(props);
      this.state = {
        email: "",
        pass: "",
      };
    }
  
    componentDidMount() {}
  
  
    handleLogin= async ()=>{
        let user = await authUser(this.state.email, this.state.pass);
        this.context.changeCentralState("loggedOnUser", user);
        
    }

    
  
    render() {

      if(this.context.loggedOnUser.rol===1)
          return  <Redirect to="/admin" />;
      else if(this.context.loggedOnUser.rol===3)
      return  <Redirect to="/nurse" />;
  
      return (
        <AppContext.Consumer>
          {(value) => {
  
            return (
              <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginTop:50}}>
                <b>KULLANICI GİRİŞİ</b>
                <div style={{display:"flex", alignItems:"center", margin:"30px", justifyContent:"center" }}>
                  <span style={{marginRight:"20px"}}>E-Mail</span>
                  <TextField
                    variant="standard"
                    value={this.setState.email}
                    onChange={(event) =>
                      this.setState({
                        email: event.target.value,
                      })
                    }
                  />
                </div>
  
                <div style={{display:"flex", alignItems:"center", margin:"30px", justifyContent:"center" }}>
                <span style={{marginRight:"20px"}}>Şifre</span>
                  <TextField
                    variant="standard"
                    type="password"
                    value={this.setState.pass}
                    onChange={(event) =>
                      this.setState({
                          pass: event.target.value,
                      })
                    }
                  />
                </div>
  
                <Button
            variant="contained"
            color="primary"
            onClick={this.handleLogin}
          >
            GİRİŞ
          </Button>
              </div>
            );
          }}
        </AppContext.Consumer>
      );
    }
  }
  
  export default LoginPage;
