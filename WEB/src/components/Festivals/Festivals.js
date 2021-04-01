import React,  { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Jumbotron, Button, Form, FormGroup, Label, Input, Row, Col, Badge } from 'reactstrap';

class Festivals extends Component {
    constructor(props){
        super(props);
        this.state= {
            fests: [],
            showForm: false
        };
        this.handleFestivalFormShow = this.handleFestivalFormShow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount(){
        this.getFestivals();
    }

    getFestivals = () => {
        axios.get(process.env.REACT_APP_DB+'festivals/')
        .then(res => {
            console.log(res)
            this.setState({fests: res.data});
        })
    }

    deleteFestival = (festival) =>{
        var answer = window.confirm("êtes-vous sûr de vouloir supprimer cet élément ?");
        if (answer) {
            var del = false;
            var i = 0;
            while(!del){
                if(festival._id==this.state.fests[i]._id){
                    axios.delete(process.env.REACT_APP_DB+'festivals/'+festival._id)
                    .then(res => {
                        console.log(res.data)
                    })
                    del = true;
                    var res = this.state.fests;
                    res.splice(i,1);
                    this.setState({fests : res})
                }else{
                    i++;
                }
            }        
        }
    }

    handleFestivalFormShow = () => {
        var current = this.state.showForm;
        this.setState({
            showForm: !current
        })
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        var newFestival = {};
        newFestival.date = data.get('date');
        newFestival.description = data.get('description');
        newFestival.festivalcurrent = data.get('festivalcurrent');
        console.log(newFestival);
        axios.post(process.env.REACT_APP_DB+'festivals/', newFestival )
        .then(res => {
            this.setState({fests: [...this.state.fests, res.data]});
        })
        this.handleFestivalFormShow()
    }
    
    render() {
        return (
            <div className="container">
            <br/>
            <h1> <Badge color="info">Liste des Festivals : </Badge></h1>
            <br/>   
                    {this.state.fests.map((fest, index) => (
                        <Jumbotron key={index}>
                                <h2 classeName = "display-3">
                                <Badge color="light">
                                    <Link to={"/festival/" + fest._id}>
                                        Festival {fest.date} 
                                    </Link>
                                </Badge>
                                </h2>
                            <hr className="my-2" />
                            <p>Description : {fest.description}</p>
                            <p>
                            <Button color="danger" onClick={() => this.deleteFestival(fest)}>Supprimer</Button>    
                            </p>
                        </Jumbotron>
                    ))}
                <div className="text-align: center">
                    {!this.state.showForm && (
                        <Button onClick={this.handleFestivalFormShow}>Ajouter un Festival</Button>
                        )}
                <br/>

                    {this.state.showForm && (
                        <Form onSubmit={this.handleSubmit}>
                            <Row form>
                                <Col sm="12" md={{ size: 6, offset: 3 }}>       
                                    <FormGroup>
                                            <Label>
                                                Date :
                                            </Label>
                                            <Input type="select" name="date" id="date">
                                                <option>2017</option>
                                                <option>2018</option>
                                                <option>2019</option>
                                                <option>2020</option>
                                                <option>2021</option>
                                            </Input>                                    
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>
                                                Description :
                                            </Label>
                                            <Input type="text" name="description" id="description"/>                                    
                                        </FormGroup>
                                        <Label>Est le Festival courant :</Label>
                                        <FormGroup>
                                            <Input addon type="checkbox" name="festivalcurrent" id="festivalcurrent" />
                                        </FormGroup>
                                    <Button color="success" type="submit">Ajoutez</Button>
                                    <br/>
                                    <br/>
                                    <Button color="warning" onClick={this.handleFestivalFormShow}>Annuler</Button>
                                </Col>
                            </Row>
                        </Form>
                    )}
                    <br/>
                </div>                
            </div>
        )
    }
}

export default Festivals;