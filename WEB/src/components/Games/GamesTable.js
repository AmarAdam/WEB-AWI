import React,  { Component } from 'react';
import { MDBDataTable } from 'mdbreact';

function GamesTable(props){

    const games = props.data
    const newgames = []

    var i = 0;
    while(i<games.length){
        console.log(games[i])
        const game = {
            name : games[i].name,
            description : games[i].description,
            editorName : games[i].editorName
        }
        newgames.push(game)
        i++
    }

    console.log(newgames)

    const data = {
        columns: [{
            label: 'Nom',
            field: 'name',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Description',
            field: 'description',
            sort: 'asc',
            width: 270
          },
          {
            label: 'Editeur',
            field: 'editorName',
            sort: 'asc',
            width: 200
          }],
          rows: [] = games
    } 

      return(
        <div>
            <MDBDataTable striped bordered small data={data}/>
        </div>
        );  
}

export default GamesTable;
