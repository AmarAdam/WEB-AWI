import React,  { Component } from 'react';
import axios from 'axios';

class GamesDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            game: {},
            editor: {}
        };
    }
    
    componentDidMount(){
        this.getGame();
        //mettre une promise pour avoir l'info du jeu avant de lancer le get editor !
        //this.getEditor();
    }

    getGame = () => {
        var uri = this.props.location.pathname;
        var gameId = uri.split("/").pop();
        console.log(gameId);
        axios.get(process.env.REACT_APP_DB+'games/details/' + gameId)
        .then(res => {
            this.setState({game: res.data.game});
            console.log(res.data.game)
        })
    }

    getEditor = () => {
        console.log(this.state.game.editorId);
        axios.get(process.env.REACT_APP_DB+'editor/details/'+this.state.game.editorId)
        .then(res => {
            this.setState({editor: res.data.editor});
            console.log(res.data.editor)
        })
    }
    
    render() {

        return (
            <div>
                <h1>{this.state.game.name}</h1>
                <h3>{this.state.game.description}</h3>
            </div>
        )
    }
}

export default GamesDetails;