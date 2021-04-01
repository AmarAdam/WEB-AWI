import React,  { Component } from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button, Form, Row, Col, FormGroup, Label, Input, Badge, Jumbotron} from 'reactstrap';
import axios from 'axios';

class Editors extends Component {
    constructor(props){
        super(props);
        this.state={
            editors: [],
            showForm: false
        };
        this.handleEditorFormShow = this.handleEditorFormShow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount(){
        this.getEditors()
    }

    getEditors = () => {
        axios.get(process.env.REACT_APP_DB+'editors/')
        .then(res => {
            console.log(res.data)
            this.setState({editors: res.data})
        })
    }

    deleteEditor = (editor) =>{
        var answer = window.confirm("êtes-vous sûr de vouloir supprimer cet élément ?");
        if (answer) {
            console.log(editor)
            var del = false;
            var i = 0;
            while(!del){
                if(editor._id==this.state.editors[i]._id){
                    axios.delete(process.env.REACT_APP_DB+'editors/'+editor._id)
                    .then(res => {
                        console.log(res.data)
                    })
                    del = true;
                    var res = this.state.editors;
                    res.splice(i,1);
                    this.setState({editors : res})
                }else{
                    i++;
                }
            }
        }
    }

    handleEditorFormShow = () => {
        var current = this.state.showForm;
        this.setState({
            showForm: !current
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        var newEditor = {};
        newEditor.name = data.get('name');
        newEditor.address = data.get('address');
        newEditor.contact = data.get('contact');
        if (data.get('exhibitor') == 'on'){
            newEditor.exhibitor = true;
        }else{
            newEditor.exhibitor = false;
        }
        console.log(newEditor);
        axios.post(process.env.REACT_APP_DB+'editors/', newEditor )
        .then(res => {
            this.setState({editors: [...this.state.editors, res.data]});
        })
        this.handleEditorFormShow()
    }
    
    render() {

        const noEditor = (this.state.editors.length < 1);

        return (
            <div className="container">
            <br/>
            <h1> <Badge color="info">Liste des Editeurs : </Badge></h1>

            {!noEditor ?
                <ListGroup>
                    {this.state.editors.map((editor, index) => (
                        <ListGroupItem key={index}>
                            <ListGroupItemHeading>
                            <h3> <Badge color="primary">{editor.name} : </Badge></h3>
                            </ListGroupItemHeading>
                            <ListGroupItemText>
                            {editor.exhibitor ? "Editeur exposant" : "Editeur non exposant"} 
                            </ListGroupItemText>
                            <Jumbotron>
                                {editor.contact}
                            </Jumbotron>
                            <ListGroupItemText>
                                <Button color="danger" onClick={() => this.deleteEditor(editor)}>Supprimer</Button>
                            </ListGroupItemText>
                        </ListGroupItem>    
                    ))}
                </ListGroup>
                :

                <h3>Aucun Editeur disponible...</h3>
            }
            <br/>
                
                <div className="text-align: center">
                    {!this.state.showForm && (
                        <Button onClick={this.handleEditorFormShow}>Ajouter un Editeur</Button>
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
                                                Contact :
                                            </Label>
                                            <Input type="text" name="contact" placeholder="Contact..."/>
                                    </FormGroup>
                                    <FormGroup>
                                            <Label>
                                                Adresse :
                                            </Label>
                                            <Input type="text" name="address" placeholder="Adresse..."/>
                                    </FormGroup>
                                    <FormGroup>
                                            <Label>
                                                <Input type="checkbox" name="exhibitor" />{' '}
                                                ... est Exposant 
                                            </Label>
                                    </FormGroup>
                                    <Button color="success" type="submit">Ajoutez</Button>
                                    <br/>
                                    <br/>
                                    <Button color="warning" onClick={this.handleEditorFormShow}>Annuler</Button>
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

export default Editors;