import React from 'react';

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'

import UserContext from '../UserContext';
import { Row, Col, Button } from 'react-bootstrap';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: this.props.match.params.email,
            profileText: '',
            username: '',
            age: '',
            location: ''
        }
    }

    componentDidMount() {
        fetch(`http://localhost:4000/profile/${this.props.match.params.email}`)
            .then(response => response.json())
            .then(json => {
                json = JSON.parse(json);
                this.setState({ 
                    username: json.username,
                    profileText: json.profileText,
                    age: json.age,
                    location: json.location
                })
            });
    }

    render() {
        return (
            <div className="edit-profile" style={{ marginTop: "10px" }}>
                <Card bg="light">
                    <Card.Header>Edit profile information</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    Email
                                    </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={this.state.email} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formUsername">
                                <Form.Label column sm="2">
                                    Username
                                    </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="username" placeholder="Username" value={this.state.username}/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formAge">
                                <Form.Label column sm="2">
                                    Age
                                    </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="age" placeholder="Age" value={this.state.age} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formLocation">
                                <Form.Label column sm="2">
                                    Location
                                    </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="location" placeholder="Location" value={this.state.location} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formProfileText">
                                <Form.Label column sm="2">
                                    Profile text
                                    </Form.Label>
                                <Col sm="10">
                                    <Form.Control as="textarea" rows="5" value={this.state.profileText} />
                                </Col>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>

        );
    }
}

export default EditProfile;