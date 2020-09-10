import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

import { withRouter } from 'react-router-dom'
import { store } from '../authentication/UserProvider'
import { auth } from '../firebase/firebase.utils';

const SignIn = (props) => {

    const userState = React.useContext(store);
    const { dispatch } = userState;

    const [{
        email,
        registerEmail,
        password,
        registerPassword,
        duplicatePassword,
        username,
        registerUsername,
        isAdmin,
        loginStatus,
    }, setState] = React.useState({
        email: '',
        registerEmail: '',
        password: '',
        registerPassword: '',
        duplicatePassword: '',
        username: '',
        registerUsername: '',
        isAdmin: false,
        loginStatus: ''
    })

    const handleSubmit = async (event) => {
        event.preventDefault();

        const body = {
            username: username,
            password: password,
        }


        try {
            const response = await fetch('http://localhost:4000/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })

            const json = await response.json();

            dispatch({
                type: 'login', payload: {
                    user: json.user,
                    isAdmin: json.isAdmin
                }
            })
            props.history.push("/")
        } catch (err) {
            setState({
                email: '',
                registerEmail: '',
                password: '',
                registerPassword: '',
                duplicatePassword: '',
                username: '',
                registerUsername: '',
                isAdmin: false,
                loginStatus: 'failed'
            });

        }

    }

    const handleRegister = async (event) => {
        event.preventDefault();

        if (registerPassword !== duplicatePassword) {
            alert("ERROR: passwords do not match");
            return;
        }

        const body = {
            username: registerUsername,
            email: registerEmail,
            password: registerPassword,
            isAdmin: isAdmin
        }

        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        const json = await response.json();

        if (json.registerSuccess) {
            alert("registration successful");
            props.history.push("/")
        }
        else {
            alert("registration failed");
        }

    }

    const handleChange = (e) => {
        let { value, id } = e.target;
        if (id === "isAdmin") value = e.target.checked;
        if (id === "registerPassword") ReactDOM.render(null, document.getElementById("incorrect-password"));
        setState(prevState => ({
            ...prevState,
            [id]: value,
            loginStatus: ''
        }))
    }

    const handleDuplicateChange = (e) => {
        const { value, id } = e.target;
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))

        if (registerPassword !== duplicatePassword) {
            ReactDOM.render(<span style={{ color: "red", fontSize: "10px" }}>Passwords do not match.</span>, document.getElementById("incorrect-password"))
        }
    }

    return (
        <div className="sign-in" style={{ display: "flex" }}>
            <div className="sign-in-container" style={{ flex: "50%" }}>
                <span className="label">Sign In</span>
                <div className="sign-in-form" style={{ marginTop: "40px", marginRight: "10px" }}>
                    <Form id="sign-in-entry" onSubmit={handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Control
                                type="username"
                                value={username}
                                placeholder="Enter username"
                                onChange={handleChange}
                                required />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Control
                                type="password"
                                value={password}
                                placeholder="Password"
                                onChange={handleChange}
                                required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                </Button>
                    </Form>
                    {loginStatus === "failed" ? <div className="error-message"><span style={{ color: "red", fontSize: "15px" }}>Incorrect username and/or password entered</span></div> : null}
                </div>
            </div>
            <div className="sign-in-container" style={{ flex: "50%", marginLeft: "20px" }}>
                <span className="label">Register</span>
                <div className="sign-in-form" style={{ marginTop: "40px", marginRight: "10px" }}>
                    <Form id="register-form" onSubmit={handleRegister}>
                        <Form.Group controlId="registerEmail">
                            <Form.Control
                                type="email"
                                value={registerEmail}
                                placeholder="Email"
                                onChange={handleChange}
                                required />
                        </Form.Group>
                        <Form.Group controlId="registerUsername">
                            <Form.Control
                                type="username"
                                value={registerUsername}
                                placeholder="Username"
                                onChange={handleChange}
                                required />
                        </Form.Group>
                        <Form.Group controlId="registerPassword">
                            <Form.Control
                                type="password"
                                value={registerPassword}
                                placeholder="Password"
                                onChange={handleChange}
                                required />
                        </Form.Group>

                        <Form.Group controlId="duplicatePassword">
                            <Form.Control
                                type="password"
                                value={duplicatePassword}
                                placeholder="Confirm password"
                                onChange={handleDuplicateChange}
                                required />
                            <div id="incorrect-password">

                            </div>
                        </Form.Group>

                        <Form.Group controlId="isAdmin">
                            <Form.Label>Is admin?</Form.Label>
                            <Form.Control
                                type="checkbox"
                                value={isAdmin}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                            </Button>
                    </Form>
                </div>
            </div>
        </div>
    );

}

export default withRouter(SignIn);