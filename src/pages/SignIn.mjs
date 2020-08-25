import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

const SignIn = () => (
    <div className="sign-in" style={{ display: "flex" }}>
        <div className="sign-in-container" style={{ flex: "50%" }}>
            <span className="label">Sign In</span>
            <div className="sign-in-form" style={{ marginTop: "40px", marginRight: "10px" }}>
                <Form>
                    <Form.Group controlId="formEmail">
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Control type="password" placeholder="Password" />
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

export default SignIn;