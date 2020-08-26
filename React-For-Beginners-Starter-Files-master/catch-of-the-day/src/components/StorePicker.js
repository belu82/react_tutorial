
import React from 'react';
import { getFunName } from "../helpers";
import PropTypes from "prop-types";


class StorePicker extends React.Component{

    static propTypes = {
        history: PropTypes.object
    };
    myInput = React.createRef();

    goToStore = (event) =>{

        event.preventDefault();
        const storeName = (this.myInput.current.value);
        this.props.history.push(`/store/${storeName}`);
    };
    
    render(){
        return (
            <form className="store-selector" onSubmit={this.goToStore }>
                <h2>Please enter the store</h2>
                <input type="text" required placeholder= "Store name" defaultValue={getFunName()} ref={this.myInput}></input>
                <button type="submit">Visit store</button>
            </form>

        )
    }
}

export default StorePicker;