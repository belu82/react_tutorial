    import React from 'react';
    import {formatPrice} from "../helpers";
    import {TransitionGroup, CSSTransition} from "react-transition-group";
    import PropTypes from "prop-types";

 
    class Order extends React.Component{
        static propTypes = {
            fishes:  PropTypes.object,
            order: PropTypes.object,
            removeFromOrder: PropTypes.func
        };
        renderOrder = (key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === "available";
            const transitionOptions = {classNames:"order", key:{key}, timeout:{enter: 250, exit: 250}};
            //ellenőrzi, hogy a fish biztos betöltésre került-e mielőtt tovább megyünk
            if(!fish) return null;
            if(!isAvailable){
                return (    
                    <CSSTransition {...transitionOptions}>
                        <li key={key}>Sorry {fish ? fish.name : "fish"} is no longer available</li>;
                    </CSSTransition>                )
            }
            return( 
            <CSSTransition classNames="order" key={key} timeout={{enter: 250, exit: 250}}>
                <li key={key}>
                <span>
                <TransitionGroup component="span" className="count">
                    <CSSTransition classNames="count" key={count} timeout={{enter:5000, exit:5000}}>
                        <span>
                            {count}
                        </span>
                    </CSSTransition>
                </TransitionGroup>
                    lbs {fish.name}
                    {formatPrice(count*fish.price)}
                    <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
                </span>
                </li>
                
            </CSSTransition>
            );
        };
        render(){
            const orderId = Object.keys(this.props.order);//iterate trought the state contains
            const total = orderId.reduce((prevTotal, key) => {
                const fish = this.props.fishes[key];
                const count = this.props.order[key];
                const isAvailable= fish && fish.status === "available";
                if(isAvailable) {
                    return prevTotal + (count *fish.price);
                }
                return prevTotal;
            },0);

            //object spread kerülendő
            return <div className="order-wrap">
                <h2>Order</h2>
                <TransitionGroup component="ul" className="order">
                    {orderId.map(/*key => <li>{key}</li>)*/ this.renderOrder)}
                </TransitionGroup>
                <div className="total">
                    Total: 
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        }
    }

    export default Order;