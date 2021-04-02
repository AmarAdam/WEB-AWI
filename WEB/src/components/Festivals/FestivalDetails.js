import React,  { Component } from 'react';
import axios from 'axios';
import {Button, Form, Row, Col, FormGroup, Label, Input, Table, Badge, List} from 'reactstrap';
import {Link} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Redirect } from 'react-router';

//allow to handle details of the festival, all reservations, areas etc 
class FestivalDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            festival: {props},
            reservations: [],
            showAreaForm: false,
            areas: [],
            listgames: [],
            reservationSelected: {},
            redirectToReservation: false,
            showM: false
        };
        this.handleAreaFormShow = this.handleAreaFormShow.bind(this);
        this.handleAreaSubmit = this.handleAreaSubmit.bind(this);
    }
    
    componentDidMount(){
        this.getFestival();
        this.getListGames();
    }

    //get a string, it's resume informations of games
    getListGames = () =>{
        var uri = this.props.location.pathname;
        var festivalId = uri.split("/").pop();
        console.log("objet : "+festivalId)
        console.log(process.env.REACT_APP_DB)
        axios.get(process.env.REACT_APP_DB + 'reservations/listgames/'+festivalId)
        .then(res=>{
                console.log(res.data.listgames)
                this.setState({listgames: res.data.tabgames})
            }
        )
    }

    //get a festival and all informations necessary
    getFestival = () => {
        var uri = this.props.location.pathname;
        var festivalId = uri.split("/").pop();
        axios.get(process.env.REACT_APP_DB + 'festival/' + festivalId)
        .then(res => {
            this.setState({festival: res.data.festival});
            var reservations = res.data.reservations;
            for (var i = 0; i < reservations.length; i++) { // loop to take all the reservations, and all places
                var array = reservations[i].games.join(', ');
                reservations[i].games = array;
                var placeString = '';
                for (var j = 0; j < reservations[i].places.length; j++) {
                    placeString += "Zone " + reservations[i].places[j].areaNumber + " : " + reservations[i].places[j].value +"m²";
                    if(j < (reservations[i].places.length - 1)) {
                        placeString += ", ";
                    }
                }
                reservations[i].placeString = placeString;
            }
            this.setState({reservations: reservations}); //all reservations of the festival are set 
            this.setState({areas: res.data.areas});
        })
    }

    handleAreaFormShow = () => { //open and close form
        var current = this.state.showAreaForm;
        this.setState({
            showAreaForm: !current
        })
        console.log(this.state.areas)
    }

    //handle the add of area
    handleAreaSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        var newArea = {};
        newArea.number = data.get('number');
        newArea.description = data.get('description');
        newArea.size = data.get('size');
        newArea.price = data.get('price');
        newArea.festivalId = this.state.festival._id;
        axios.post(process.env.REACT_APP_DB + 'areas/', newArea )
        .then(res => {
            this.setState({areas: [...this.state.areas, res.data]});
            this.handleAreaFormShow();
        })
    }

    //delete an Area
    deleteArea = (area) => {
        var answer = window.confirm("êtes-vous sûr de vouloir supprimer cet élément ?");
        if (answer) {
            console.log(area)
            var del = false;
            var i = 0;
            while(!del){
                if(area._id==this.state.areas[i]._id){
                    axios.delete(process.env.REACT_APP_DB+'areas/'+area._id)
                    .then(res => {
                        console.log(res.data)
                    })
                    del = true;
                    var res = this.state.areas;
                    res.splice(i,1);
                    this.setState({areas : res})
                }else{
                    i++;
                }
            }        
        }
    }

    goToDetail = (e, id) => {
        this.setState({reservationSelected: this.state.reservations.filter(x => x._id == id)[0]})
        this.setState({redirectToReservation: true})
    }
    
    render() {

        const noResa = (this.state.reservations.length < 1);
        const noArea = (this.state.areas.length < 1);

        const data = this.state.reservations;
        const columns = [
            {
                name: 'Name',
                selector: 'name',
                sortable: true,
            },
            {
                name: 'Exposant',
                selector: 'exhibitor',
                sortable: true,
            },
            {
                name: 'Jeux',
                selector: 'games',
                sortable: false,
                grow: 2,
                wrap: true
            },
            {
                name: 'Emplacements',
                selector: 'placeString',
                sortable: false,
                grow: 2,
                wrap: true
            },
            {
                name: 'Facture',
                selector: 'billPrice',
                sortable: true,
            },
            {
                cell: (row) => <Button onClick={(e) => this.goToDetail(e, row._id)}>Détails</Button>,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
            }
        ];

        if (this.state.redirectToReservation) {
            return <Redirect
                to={{
                pathname: '/reservation/' + this.state.reservationSelected._id,
                state: { reservation: this.state.reservationSelected }
            }}
            />
        }

        return (
            <div className="container">
                <h1>{this.state.festival.name} </h1>
                {!noResa &&
                    <h4><Badge color="info">Réservations : </Badge> </h4>
                }
                {noResa &&
                    <h4><Badge color="info">Aucune Réservation disponible... </Badge> </h4>
                }
                <div className="container">

                    <DataTable
                        columns={columns}
                        data={data}
                        defaultSortField="name"
                        noDataComponent="Pas encore de reservations"
                    />
                    
                <br/>
                
                
                <h4><Badge color="info">Liste des Jeux :</Badge> </h4>
                    
                    <List type="inline">
                    {this.state.listgames.map((game, indexArea) => (
                        <li key={indexArea}>{game}</li>
                        ))}
                    </List>

                </div>
                <br/>          
                <Link to={{
                    pathname: '/newReservation/' + this.state.festival._id,
                    state: {
                        festival: this.state.festival
                    }
                    }}>
                        Ajouter une nouvelle réservation
                </Link>

                <br/>
                <br/>

                {!noArea &&
                    <h4><Badge color="info">Zones : </Badge> </h4>
                }

                {noArea &&
                    <h4><Badge color="info">Aucune Zone disponible...</Badge> </h4>
                }

                <br/>
                
                <div className="container">
                        
                        <Table dark>
                            <thead>
                                <tr>
                                <th>Zone n° :</th>
                                <th>Description :</th>
                                <th>Prix au m2 :</th>
                                <th>Taille initiale :</th>
                                <th>Taille disponible :</th>
                                </tr>
                            </thead>
                        {this.state.areas.map((area, indexArea) => (
                            <tbody>
                                <tr>
                                <td>{area.number}</td>
                                <td>{area.description}</td>
                                <td>{area.price}</td>
                                <td>{area.size}</td>
                                <td>{area.sizeAvailable}</td>
                                <Button color="danger" onClick={() => this.deleteArea(area)}>X</Button>
                                </tr>
                            </tbody>
                        ))}
                        </Table>
                </div>

                {!this.state.showAreaForm && (
                    <Button onClick={this.handleAreaFormShow}>Ajouter une zone</Button>
                )}
                
                <div className= "container">

                {this.state.showAreaForm && (
                
                <Form onSubmit={this.handleAreaSubmit}>
                    <Row form>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <FormGroup>
                            <Label>
                                Numéro :
                            </Label>
                                <Input type="number" name="number" placeholder="Numéro..."/>
                            </FormGroup>
                            <FormGroup>
                                <Label>
                                    Description :
                                </Label>
                                <Input type="text" name="description" placeholder="Description..."/>
                            </FormGroup>
                             <FormGroup>
                                <Label>
                                    Taille (en m2) :
                                </Label>
                                <Input type="number" name="size" id="sizeId"/>
                            </FormGroup>
                            <FormGroup>
                                <Label>
                                    Prix ( en € )
                                </Label>
                                <Input type="number" name="price"/>
                            </FormGroup>
                            <Button color="success"  type="submit">Ajouter</Button>
                        </Col>
                    </Row>
                    <br/>
                    <Button color="warning" onClick={this.handleAreaFormShow}>Annuler</Button>
                </Form>
            )} 

                </div>

                <br/>
            </div>
        )
    }
}

export default FestivalDetails;
