import React from "react";
import PropTypes from "prop-types";

const Login = props => (
    <nav className="login">
        <h2>Inventory login</h2>
        <p>Jelentkezz be, hogy menedzseld az inventorit</p>
        <button className="github" onClick={() => props.authenticate('Github')}>Login with GitHub</button>
        <button className="facebook" onClick={() => props.authenticate('Facebook')}>Login with Facebook    </button>

    </nav>
);

Login.propTypes={
    authenticate: PropTypes.func.isRequired
};

export default Login;