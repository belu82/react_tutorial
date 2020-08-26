import React from 'react';
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import firebase from "firebase";
import PropTypes from "prop-types";
import Login from "./Login";
import base,{firebaseApp} from "../base";



class Inventory extends React.Component{
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func,
    };

    state = {
        uid: null,
        owner: null
    };
    
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.authHandler({user});
            }
        })
    }
    authHandler = async authData => {
        //look up the current store in the firebase db
        const store = await base.fetch(this.props.storeId, {context:this}); 
        console.log(store);
        //claim it if there is no owner
        if(!store.owner){
            await base.post(`${this.props.storeId}/owner`,{
                data: authData.user.uid
            });
        }
        //set the state of the inventory component to reflect the current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        })
    };


    authenticate = provider => {
        //alert(provider);
        //const authProvider = new firebase.auth.FacebookAuthProvider();
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    };

    logout = async () => {
        console.log("Logging out bro");
        await firebase.auth().signOut();    
        this.setState({uid:null})
    }

    render(){
    

        const logout = <button onClick={this.logout}>Logout!</button>
        //ellenőrizni, h be van-e jelentkezve:
        if(!this.state.uid){
            return <Login authenticate={this.authenticate}/>;
        }

        //ellenőrizni, hogy az owner van bent:
        if(this.state.uid !== this.state.owner){
            return (
                <div>
                    <p>Sorry you aren't the owner</p>
                    {logout}
                </div>
            );
        }
        
        //else
        return (<div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => <EditFishForm key={key}
         index = {key} fish={this.props.fishes[key]} updateFish={this.props.updateFish} deleteFish={this.props.deleteFish}/>)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSampleFishes} >load sample fishes</button>
        </div>
        );
    }
}

export default Inventory;