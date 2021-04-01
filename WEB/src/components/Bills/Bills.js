import React,  { Component } from 'react';
import { Table, Button, Form, Row, Col, FormGroup, Label, Input, Badge } from 'reactstrap';
import axios from 'axios';
import DataTable from 'react-data-table-component';

class Bills extends Component {
    constructor(props){
        super(props);
        this.state={
            bills: [],
            results: {}
        }
    }

    componentDidMount(){
        this.getBills();
    }

    getBills = () => {
        axios.get(process.env.REACT_APP_DB + 'bills')
        .then(res => {
            this.setState({bills: res.data.bills});
            this.setState({results: res.data.results});
        })
    }

    render(){

        const data = this.state.bills;
        const columns = [
            {
                name: 'Festival',
                selector: 'festivalName',
                sortable: true,
            },
            {
                name: 'Etat',
                selector: 'state',
                sortable: true,
            },
            {
                name: 'Prix (en €)',
                selector: 'price',
                sortable: true,
            }
        ];
        
        return(
            <div className="container">
            <br/>
            <h1> <Badge color="info">Liste des Factures :</Badge></h1>
            <br/>
            <br/>

            <Table striped bordered>
                <thead>
                    <tr>
                        {Object.keys(this.state.results).map(key => (
                            <th>Festival {key}</th> 
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {Object.keys(this.state.results).map(key => (
                            <td>{this.state.results[key]} €</td> 
                        ))}
                    </tr>
                </tbody>
            </Table>

            <DataTable
                columns={columns}
                data={data}
                defaultSortField="festivalName"
                noDataComponent="Pas encore de factures"
            />
            </div>
        )
    }

}

export default Bills;