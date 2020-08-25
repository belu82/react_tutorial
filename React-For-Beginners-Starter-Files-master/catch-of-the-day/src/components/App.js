import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";
//import fishes from "../sample-fishes";

class App extends React.Component{
    state= {
        fishes: {},
        order: {}
    };

    //mirror database

    componentDidMount(){
        const {params} = this.props.match;

        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef){
            this.setState({order: JSON.parse(localStorageRef)});
        }
        this.ref = base.syncState(`${params.storeId}`,{
            context :this, 
            state: 'fishes'
        });
    }

    
    

    

    componentDidUpdate(){
        console.log(this.state.order);
        localStorage.setItem(
            this.props.match.params.storeId,
            JSON.stringify(this.state.order)
        );
    }
    

    //unmount the database
    componentWillUnmount(){
        base.removeBinding(this.ref);
    }

    addFish = fish => {
        //console.log("Adding fishsisihdfihiashsdf");
        //másolat készítése: 
        const fishes = {...this.state.fishes};
        //add new fish to that fishes variable
        fishes[`fish${Date.now()}`] = fish;

        this.setState({fishes});
    };

    addToOrder = (key) => {
        //tak a copy of state
        const order = {...this.state.order};
        //either add to the order, or update the number in our order
        order[key] = order[key] + 1 || 1;

        //setState to update our state object
        this.setState({order});
    }

    loadSampleFishes = () => {
        this.setState({fishes:sampleFishes});

    }
    render(){
        return(

            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="I'm menyus" age={21} cool={true} />
                    <ul className="fishes">

                        {Object.keys(this.state.fishes).map(key => < Fish key={key} index={key}details = {this.state.fishes[key]} addToOrder={this.addToOrder}/>)}

                    </ul>
                </div>
              <Order fishes={this.state.fishes} order={this.state.order}/>
              <Inventory addFish = {this.addFish} loadSampleFishes = {this.loadSampleFishes}/>
            </div>
        );
    }

}

export default App;