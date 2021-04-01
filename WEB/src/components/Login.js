import React, { useState } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Container, Row, Col, Jumbotron, Card, CardBody, Badge} from "reactstrap";
import axios from 'axios';

function Login(props) {  
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [token, setToken]= useState("");    

    async function Login() {
        const user = {email,password};
                
        axios.post(process.env.REACT_APP_DB+'user/login', user )
        .then(res => {
            console.log(res.data)
            setToken(res.data)
            localStorage.setItem('token',res.data);
            console.log('from le local '+localStorage.getItem('token'))
            window.location.reload();
        })
    }

    return(

    <Router>
    <br/>
    <br/>
    <div className="container" >
      <Container>
        <Row>
          <Col />
          <Col lg="8">
            <Jumbotron>
              <h3>
              <Badge color="primary">
                <u>HandleFest</u>
              </Badge>
              </h3>
              <hr />
              <Card>
                <CardBody>
                <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} />
                        </div>
                        
                    <button type="submit" className="btn btn-primary btn-block" onClick={Login} >Connexion</button>                
                </CardBody>
              </Card>
            </Jumbotron>
          </Col>
          <Col />
        </Row>
      </Container>
      </div> 
    </Router>
       
        );  
    }

export default Login;