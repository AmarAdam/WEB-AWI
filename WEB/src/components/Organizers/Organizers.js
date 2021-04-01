import React,  { Component } from 'react';
import { Table, Button, Form, Row, Col, FormGroup, Label, Input, Badge } from 'reactstrap';
import axios from 'axios';
import OrganizersTable from './OrganizersTable';

class Organizers extends Component {
    constructor(props){
        super(props);
        this.state={
            organizers: [],
            showForm: false,
        }
        this.handleOrganizerFormShow = this.handleOrganizerFormShow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.getOrganizers();
    }

    getOrganizers = () => {
        axios.get(process.env.REACT_APP_DB+'users')
        .then(res => {
            this.setState({organizers: res.data});
            console.log(this.state.organizers)
        })
    }

    handleOrganizerFormShow = () => {
        var current = this.state.showForm;
        this.setState({
            showForm: !current
        })
    }

    deleteOrganizer = (organizer) =>{
        var answer = window.confirm("êtes-vous sûr de vouloir supprimer cet élément ?");
        if (answer) {
            var del = false;
            var i = 0;
            while(!del){
                if(organizer._id==this.state.organizers[i]._id){
                    axios.delete(process.env.REACT_APP_DB+'users/'+organizer._id)
                    .then(res => {
                        console.log(res.data)
                    })
                    del = true;
                    var res = this.state.organizers;
                    res.splice(i,1);
                    this.setState({organizers : res})
                }else{
                    i++;
                }
            }        
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        var newOrganizer = {};
        newOrganizer.name = data.get('name');
        newOrganizer.email = data.get('email');
        newOrganizer.password = data.get('password');
        newOrganizer.access = data.get('access');
        console.log(newOrganizer);
        axios.post(process.env.REACT_APP_DB+'user/register', newOrganizer )
        .then(res => {
            this.setState({organizers: [...this.state.organizers,res.data.user]})
        })
        this.handleOrganizerFormShow()
    }

    render(){
        
        return(
            <div className="container">
            <br/>
                <h1><Badge color="info">Liste des Organisateurs :</Badge></h1>
                <br/>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Pseudo</th>
                        <th>Email</th>
                        <th>Droits</th>
                        <th>Date d'ajout</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.organizers.map((organizer, index) =>(
                            <tr key={index}>
                                <td>{organizer.name}</td>
                                <td>{organizer.email}</td>
                                <td>{organizer.access}</td>
                                <td>{organizer.date}</td>
                                <Button color="danger" onClick={() => this.deleteOrganizer(organizer)}>X</Button>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                
                <br/>

                <div className="text-align: center">
                    {!this.state.showForm && (
                        <Button onClick={this.handleOrganizerFormShow}>Ajouter un Organisateur</Button>
                    )}
                    {this.state.showForm && (
                        <Form onSubmit={this.handleSubmit}>
                            <br/>
                            <Row form>
                                <Col sm="12" md={{ size: 6, offset: 3 }}>       
                                    <FormGroup>
                                            <Label>
                                                Pseudo :
                                            </Label>
                                            <Input type="text" name="name" placeholder="Pseudo..."/>
                                    </FormGroup>
                                    <FormGroup>
                                            <Label>
                                                Email :
                                            </Label>
                                            <Input type="text" name="email" placeholder="Email..."/>
                                    </FormGroup>
                                    <FormGroup>
                                            <Label>
                                                Droits d'accès :
                                            </Label>
                                            <Input type="select" name="access" id="access">
                                                <option>Admin</option>
                                                <option>SuperAdmin</option>
                                                <option>Visiteur</option>
                                            </Input>
                                    </FormGroup>
                                    <FormGroup>
                                            <Label>
                                                Mot de passe :
                                            </Label>
                                            <Input type="password" name="password" placeholder="Mot de passe..."/>
                                    </FormGroup>
                                    <Button type="submit">Ajoutez</Button>
                                    <br/>
                                    <br/>
                                    <Button color="warning" onClick={this.handleFestivalFormShow}>Annuler</Button>
                                </Col>
                            </Row>
                        </Form>
                    )}
                    <br/>
                </div> 
                <br/>
            </div>
        )
    }

}

export default Organizers;