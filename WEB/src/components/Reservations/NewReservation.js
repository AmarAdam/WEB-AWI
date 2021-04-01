import React,  { Component } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Col , Badge} from 'reactstrap';
import { Redirect } from 'react-router'

class NewReservation extends Component {
    constructor(props){
        super(props);
        this.state={
            festival: this.props.location.state.festival,
            exhibitors: [],
            games: [],
            gamesSelected: [],
            areas: [],
            areasSelected: [],
            values: [''],
            fields: [],
            showSubmitButton: false,
            redirectToReservation: false,
            reservation: {}
        }
        this.handleReservationSubmit = this.handleReservationSubmit.bind(this);
        this.handleChangeMultipleArea = this.handleChangeMultipleArea.bind(this);
    }

    componentDidMount(){
        this.getData();
    }

    getData = () => {
        axios.get(process.env.REACT_APP_DB + 'reservations/new/' + this.state.festival._id)
        .then(res => {
            this.setState({exhibitors: res.data.exhibitors});
            this.setState({games: res.data.games});
            this.setState({areas: res.data.areas});
        })
    }

    handleReservationSubmit(event){
        event.preventDefault();
        const data = new FormData(event.target);
        var newReservation = {};
        newReservation.festivalId = this.state.festival._id;
        newReservation.name = data.get('name');
        newReservation.note = data.get('note');
        newReservation.exhibitor = data.get('exhibitor');
        newReservation.games = this.getGamesName(this.state.gamesSelected);
        newReservation.places = this.createAreaObj(this.state.areasSelected, data.getAll('place'));
        axios.post(process.env.REACT_APP_DB+'reservations/', newReservation )
        .then(res => {
            this.setState({reservation: res.data});
            this.setState({redirectToReservation :  true})
        })
    }

    getGamesName(ids) {
        var names = [];
        var games = this.state.games;
        for (var i = 0; i < ids.length; i++) {
            for (var j = 0; j < games.length; j++) {
                if(ids[i] == games[j]._id) {
                    names.push(games[j].name)
                }
            }
        }
        return names
    }

    createAreaObj = (selectedAreas, inputs) => {
        var result = [];
        for (var i = 0; i < selectedAreas.length; i++) {
            result.push({
                "id": selectedAreas[i]._id,
                "value": inputs[i],
                "areaNumber": selectedAreas[i].number
            });
        }
        return result
    }

    handleChangeMultipleGame = (e) => {
        const { gamesSelected } = this.state;
        const tempGames = [...gamesSelected];
        if (e.target && e.target.value) {
            const valueInput = e.target.value;
            const indexG = tempGames.findIndex(d => d === valueInput);
            (indexG >= 0) ? tempGames.splice(indexG, 1) : tempGames.push(valueInput);
            this.setState({ gamesSelected: tempGames });
        }
    }

    handleChangeMultipleArea = (e) => {
        const { areasSelected } = this.state;
        const tempAreas = [...areasSelected];
        if (e.target && e.target.value) {
            const valueInput = e.target.value;
            const indexG = tempAreas.findIndex(t => t._id === valueInput);
            (indexG >= 0) ? tempAreas.splice(indexG, 1) : tempAreas.push(this.state.areas.find(area => area._id === valueInput));
            this.setState({ areasSelected: tempAreas });
        }
    }
   
    validateAreaSize(field, e){     
        
        var max = e.target.max;
        var value = e.target.value;

        /*let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});*/
    }

    render(){

        if (this.state.redirectToReservation) {
            //Affichage de la redirection
            return <Redirect
                to={{
                pathname: '/reservation/' + this.state.reservation._id,
                state: { reservation: this.state.reservation }
            }}
            />

        }

        return(
            <div className="container">
            <br/>
                <h1><Badge color="success">Ajouter une nouvelle réservation</Badge></h1>
                <br/>
                <Form onSubmit={this.handleReservationSubmit}>
                    <FormGroup>
                        <Label for="name">Nom</Label>
                        <Input type="text" name="name" id="reservationName" placeholder="Nom de la réservation"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="note">Note</Label>
                        <Input type="textarea" name="note" id="reservationNote" placeholder="Note sur la réservation"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exhibitor">Exposant</Label>
                        <Input type="select" name="exhibitor" id="reservationExhibitor">
                            {this.state.exhibitors.map((ex, indexEx) => (
                                <option id={ex._id} key={indexEx} value={ex.name} >{ex.name}</option>
                            ))}
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="selectMultiGames">Jeux</Label>
                        <Input type="select" name="selectMultiGames" id="selectMultiGames" values={this.state.games} multiple onChange={this.handleChangeMultipleGame}>
                            { this.state.games.map((game, i) => 
                                <option value={game._id} key={i} style={{ backgroundColor: this.state.gamesSelected.find(e => e === game._id) ? 'green' : '', color: this.state.gamesSelected.find(e => e === game._id) ? 'white' : ''}}>{game.name}</option>
                            )}
                          </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="selectMultiAreas">Zones</Label>
                        <Input type="select" name="selectMultiAreas" id="selectMultiAreas" values={this.state.areas} multiple onChange={this.handleChangeMultipleArea}>
                            { this.state.areas.map((area, i) => 
                                <option value={area._id} key={i}>Zone {area.number}</option>
                            )}
                          </Input>
                    </FormGroup>

                    { this.state.areasSelected.map((area, i) =>
                        <FormGroup row key={i}>
                            <Label for="area" sm="2">Zone {area.number}</Label>
                            <Col sm="10">
                            <Input type="number" name="place" id="place" min="0" max={area.sizeAvailable} placeholder="Choisir la taille de l'emplacement" onChange={this.validateAreaSize.bind(this, "area")} />
                            </Col>
                        </FormGroup>
                    )}

                    <br/>
                    <br/>

                    <Button color="success" size="lg">Enregistrer</Button>
                </Form>
            <br/>
            <br/>
            </div>

            
        )
    }

}

export default NewReservation;