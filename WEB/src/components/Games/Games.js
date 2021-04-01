import React,  { Component } from 'react';
import {Link} from 'react-router-dom';
import { Table, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button, Form, Row, Col, FormGroup, Label, Input, Badge} from 'reactstrap';
import GamesTable from './GamesTable';
import axios from 'axios';

class Games extends Component {
    constructor(props){
        super(props);
        this.state = {
            games: [],
            editors: []
        }
        this.handleGameFormShow = this.handleGameFormShow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount(){
        this.getAllGames()
        this.getAllExhibitors()
    }

    getAllGames = () => {
        axios.get(process.env.REACT_APP_DB+'games/')
        .then(res => {
            this.setState({games: res.data})
        })
    }

    getAllExhibitors = () => {
        axios.get(process.env.REACT_APP_DB+'editors/exhibitors')
        .then(res => {
            this.setState({editors: res.data})
        })
    }

    handleGameFormShow = () => {
        var current = this.state.showForm;
        this.setState({
            showForm: !current
        })
    }
    

    deleteGame = (game) =>{
        var answer = window.confirm("êtes-vous sûr de vouloir supprimer cet élément ?");
        if (answer) {
            console.log(game)
            var del = false;
            var i = 0;
            while(!del){
                if(game._id==this.state.games[i]._id){
                    axios.delete(process.env.REACT_APP_DB+game._id)
                    .then(res => {
                        console.log(res.data)
                    })
                    del = true;
                    var res = this.state.games;
                    res.splice(i,1);
                    this.setState({games : res})
                }else{
                    i++;
                }
            }        
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        var newGame = {};
        newGame.name = data.get('name');
        newGame.description = data.get('description');
        newGame.editorId = data.get('editorid');
        var del = false;
        var i = 0;
        while(!del){
            if(newGame.editorId == this.state.editors[i]._id){
                newGame.editorName = this.state.editors[i].name
                del = true;
            }else{
                i++
            }
        }
        console.log(newGame);
        axios.post(process.env.REACT_APP_DB, newGame )
        .then(res => {
            this.setState({games: [...this.state.games, res.data]});
            this.handleGameFormShow();
        })
    }
    
    render() {
        
        const noGame = (this.state.games.length < 1);
        
        return (
            <div className="container">
            <br/>
            <h1> <Badge color="info">Liste des Jeux :</Badge></h1>
            <br/>
                {!noGame ? 

                <GamesTable data = {this.state.games}/>

                 : 
                
                <h3>Aucun Jeux disponible...</h3>
                            
                }

                
                <br/>

                <div className="text-align: center">
                    {!this.state.showForm && (
                        <Button onClick={this.handleGameFormShow}>Ajouter un Jeu</Button>
                    )}

                    {this.state.showForm && (
                        <Form onSubmit={this.handleSubmit}>
                            <Row form>
                                <Col sm="12" md={{ size: 6, offset: 3 }}>       
                                    <FormGroup>
                                            <Label>
                                               Nom :
                                            </Label>
                                            <Input type="text" name="name" placeholder="Nom..."/>
                                    </FormGroup>
                                    <FormGroup>
                                            <Label>
                                                Description :
                                            </Label>
                                            <Input type="text" name="description" placeholder="Description..."/>
                                    </FormGroup>
                                    <FormGroup>
                                            <Label>
                                                Editeur :
                                            </Label>
                                            <Input type="select" name="editorid" id="editorid">
                                                {this.state.editors.map((editor, index) =>(
                                                    <option key= {index} value={editor._id}>{editor.name}</option>
                                                ))}
                                            </Input>
                                    </FormGroup>
                                    <Button color="success" type="submit">Ajoutez</Button>
                                    <br/>
                                    <br/>
                                    <Button color="warning" onClick={this.handleFestivalFormShow}>Annuler</Button>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </div>
                <br/>  
        </div>
        )
    }
}

export default Games;