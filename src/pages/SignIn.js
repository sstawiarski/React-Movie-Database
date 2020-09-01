import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

import { withRouter } from 'react-router-dom'

import { auth } from '../firebase/firebase.utils';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            registerPassword: '',
            duplicatePassword: '',
            username: '',
            isAdmin: false,
            loginStatus: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const { email, password } = this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' });
            this.props.history.push('/');
        } catch (error) {
            console.error('Could not log in user.')
            this.setState({ loginStatus: "failed" })
        }

    }

    handleChange = (e) => {
        const { value, id } = e.target;
        if (id === "registerPassword") ReactDOM.render(null, document.getElementById("incorrect-password"));
        this.setState({ [id]: value, loginStatus: '' });
    }

    handleDuplicateChange = (e) => {
        const { value, id } = e.target;
        this.setState({ [id]: value }, () => {
            if (this.state["registerPassword"] !== this.state["duplicatePassword"]) {
                ReactDOM.render(<span style={{ color: "red", fontSize: "10px" }}>Passwords do not match.</span>, document.getElementById("incorrect-password"))
            }
        });
    }

    render() {
        return (
            <div className="sign-in" style={{ display: "flex" }}>
                <div className="sign-in-container" style={{ flex: "50%" }}>
                    <span className="label">Sign In</span>
                    <div className="sign-in-form" style={{ marginTop: "40px", marginRight: "10px" }}>
                        <Form id="sign-in-entry" onSubmit={this.handleSubmit}>
                            <Form.Group controlId="email">
                                <Form.Control
                                    type="email"
                                    value={this.state.email}
                                    placeholder="Enter email"
                                    onChange={this.handleChange}
                                    required />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Control
                                    type="password"
                                    value={this.state.password}
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                    required />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                </Button>
                        </Form>
                        {this.state.loginStatus === "failed" ? <div className="error-message"><span style={{ color: "red", fontSize: "15px" }}>Incorrect username and/or password entered</span></div> : null}
                    </div>
                </div>
                <div className="sign-in-container" style={{ flex: "50%", marginLeft: "20px" }}>
                    <span className="label">Register</span>
                    <div className="sign-in-form" style={{ marginTop: "40px", marginRight: "10px" }}>
                        <Form id="register-form" onSubmit={this.handleSubmit}>
                            <Form.Group controlId="registerEmail">
                                <Form.Control
                                    type="email"
                                    value={this.state.registerEmail}
                                    placeholder="Email"
                                    onChange={this.handleChange}
                                    required />
                            </Form.Group>
                            <Form.Group controlId="registerUsername">
                                <Form.Control
                                    type="username"
                                    value={this.state.registerUsername}
                                    placeholder="Username"
                                    onChange={this.handleChange}
                                    required />
                            </Form.Group>
                            <Form.Group controlId="registerPassword">
                                <Form.Control
                                    type="password"
                                    value={this.state.registerPassword}
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                    required />
                            </Form.Group>

                            <Form.Group controlId="duplicatePassword">
                                <Form.Control
                                    type="password"
                                    value={this.state.duplicatePassword}
                                    placeholder="Confirm password"
                                    onChange={this.handleDuplicateChange}
                                    required />
                                <div id="incorrect-password">

                                </div>
                            </Form.Group>

                            <Form.Group controlId="isAdmin">
                                <Form.Label>Is admin?</Form.Label>
                                <Form.Control
                                    type="checkbox"
                                    value={this.state.isAdmin}
                                    onChange={this.handleChange}
                                    required />
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

}

export default withRouter(SignIn);