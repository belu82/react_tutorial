import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";


class App extends React.Component{
    state= {
        fishes: {},
        order: {}
    };

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
              <Order/>
              <Inventory addFish = {this.addFish} loadSampleFishes = {this.loadSampleFishes}/>
            </div>
        );
    }

}

export default App;