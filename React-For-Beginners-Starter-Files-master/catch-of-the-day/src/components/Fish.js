import React from 'react';
import PropTypes from "prop-types";
import {formatPrice} from "../helpers";


class Fish extends React.Component{
    //22 lecture add proptypes to project

    static propTypes = {
        details: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
            desc: PropTypes.string,
            status: PropTypes.string

        }),
        addToOrder: PropTypes.func,
        index: PropTypes.string


    };

    handleClick = () => {
        this.props.addToOrder(this.props.index);
    }
    render(){
        //const image = this.props.details.image;
        //const name = this.props.details.name;
        const { image, name, price, desc, status } = this.props.details;
        const isAvailable = status === "available";

        return(

            <li className="menu-fish">
                <img src={image} alt={name}/>
                <h3 className="fish-name">
                {name}
                <span className="price">{formatPrice (price)}</span>
                </h3>
                <p>{desc}</p>
                <button disabled={!isAvailable} onClick={this.handleClick}>{isAvailable ? 'Add to order' : 'Sold out'}</button>
            </li>
        );
    }
}

export default Fish;