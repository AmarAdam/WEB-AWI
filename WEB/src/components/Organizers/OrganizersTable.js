import React,  { Component } from 'react';
import { MDBDataTable } from 'mdbreact';

function OrganizersTable(props){

    const organizers = props.data
    const neworgs = []

    var i = 0;
    while(i<organizers.length){
        console.log(organizers[i])
        const neworg = {
            name : organizers[i].name,
            email : organizers[i].email,
            access : organizers[i].access,
            date : organizers[i].date
        }
        neworgs.push(neworg)
        i++
    }

    console.log(neworgs)

    const data = {
        columns: [{
            label: 'Name',
            field: 'name',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Email',
            field: 'email',
            sort: 'asc',
            width: 270
          },
          {
            label: 'Access',
            field: 'access',
            sort: 'asc',
            width: 200
          },
          {
            label: 'Date',
            field: 'date',
            sort: 'asc',
            width: 100
          }],
          rows: [] = neworgs
    } 

      return(
        <div>
            <MDBDataTable striped bordered small data={data}/>
        </div>
        );  
}

export default OrganizersTable;
