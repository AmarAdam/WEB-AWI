import React, { useEffect, useState } from 'react';

function GamesForm(props) {

    useEffect(() => {

    }, []);
  
    const [item, setItem] = useState({});

    return(
        <div>
            <h1>Add Game's Form</h1>
            <div className= "col-sm-6 offset-sm-3">
                <input type="text" placeholder="Name" classeName="form-control" />
            <br/>
            <label>Choose the editor...</label>
            <br />
                <input type="text" placeholder="Editor" className="form-control" />
            <br />
                <button className="btn btn-primary">Submit</button>    
            </div> 
        </div>
        );  
    }

export default GamesForm;