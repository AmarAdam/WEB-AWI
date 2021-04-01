import React,  { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router'
import { Badge, Jumbotron, Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

class Reservation extends Component {
    constructor(props){
        super(props);
        this.state={
            reservation: this.props.location.state.reservation,
            redirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        console.log(this.state.reservation);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        var Reservation = {};
        console.log(this.state.reservation._id);
        Reservation.workflow = data.get('workflow');
        Reservation.note = data.get('note');
        console.log(Reservation);
        axios.patch(process.env.REACT_APP_DB+"reservations/"+this.state.reservation._id, Reservation )
        .then(res => {
            this.setState({redirectToReservation :  true})
        })
    }

    render(){

        if (this.state.redirectToReservation) {
            //Affichage de la redirection
            return <Redirect
                to={{
                pathname: '/festival/' + this.state.reservation.festivalId,
            }}
            />

        }

        return(
            <div className="container">
            <br/>
                <h1><Badge color="primary">Détails Réservation :</Badge></h1>

                <div>
                    <Jumbotron>
                        <h4>{this.state.reservation.name}</h4>
                        <p className="lead">Note : {this.state.reservation.note}</p>
                        <hr className="my-2" />
                        <p>Jeux : {this.state.reservation.games}</p>
                        <hr className="my-2" />
                        <p className="lead">
                            Workflow : {this.state.reservation.workflow}
                        </p>
                        <p className="lead">
                            Id : {this.state.reservation._id}
                        </p>
                    </Jumbotron>
                </div>

                <div className="container">
                <Form onSubmit={this.handleSubmit}>
                            <br/>
                            <Row form>
                                <Col sm="12" md={{ size: 6, offset: 3 }}>       
                                    <FormGroup>
                                            <Label>
                                                Workflow :
                                            </Label>
                                            <Input type="select" name="workflow" id="workflow">
                                                <option>Pas encore contacté</option>
                                                <option>Contacté</option>
                                                <option>Discussion en cours</option>
                                                <option>Réservation confirmée</option>
                                                <option>Jeux demandés</option>
                                                <option>Jeux confirmés</option>
                                            </Input>
                                    </FormGroup>
                                    <FormGroup>
                                            <Label>
                                                Note :
                                            </Label>
                                            <Input type="text" name="note" placeholder={this.state.reservation.note} />
                                    </FormGroup>
                                    <Button type="submit">Modifier</Button>
                                    <br/>
                                    <br/>
                                    <Button color="warning" onClick={this.handleFestivalFormShow}>Annuler</Button>
                                </Col>
                            </Row>
                        </Form>
                </div>
            <br/>
            </div>

            
        )
    }

}

export default Reservation;