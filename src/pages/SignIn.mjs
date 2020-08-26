import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

import { auth } from '../firebase/firebase.utils';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const { email, password } = this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' });
        } catch (error) {
            console.error('Could not log in user.')
        }

    }

    handleChange = (e) => {
        const { value, type } = e.target;
        this.setState({ [type]: value });
    }

    render() {
        return (
            <div className="sign-in" style={{ display: "flex" }}>
                <div className="sign-in-container" style={{ flex: "50%" }}>
                    <span className="label">Sign In</span>
                    <div className="sign-in-form" style={{ marginTop: "40px", marginRight: "10px" }}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formEmail">
                                <Form.Control 
                                type="email" 
                                value={this.state.email} 
                                placeholder="Enter email"
                                onChange={this.handleChange}
                                required />
                            </Form.Group>
                            <Form.Group controlId="formPassword">
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
                    </div>
                </div>
                <div className="sign-in-container" style={{ flex: "50%", marginLeft: "20px" }}>
                    <span className="label">Register</span>
                </div>
            </div>
        );
    }

}

export default SignIn;