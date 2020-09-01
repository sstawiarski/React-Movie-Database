import React from 'react';

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'

import UserContext from '../UserContext';
import { Row, Col, Button } from 'react-bootstrap';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            profileText: '',
            username: '',
            age: '',
            location: '',
            profilePicture: ''
        }

        this.baseState = this.state;
    }

    componentDidMount() {
        this.setState({email: this.props.match.params.email }, () => {
            fetch(`http://localhost:4000/profile/${this.props.match.params.email}`)
            .then(response => response.json())
            .then(json => {
                json = JSON.parse(json);
                this.setState({ 
                    username: json.username,
                    profileText: json.profileText,
                    age: json.age,
                    location: json.location,
                    profilePicture: json.profilePicture
                })
            });
        })
    }

    handleChange = (event) => {
        const {id, value } = event.target;
        this.setState({[id]: value})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const body = {
            profileText: this.state.profileText,
            username: this.state.username,
            age: this.state.age,
            profilePicture: this.state.profilePicture,
            location: this.state.location,
        };

        fetch(`http://localhost:4000/profile/${this.state.email}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },
            body: JSON.stringify(body)
        })
        .then(response=>response.json())
        .catch(err => console.error(err.message))
        .finally(() => {
            this.setState(this.baseState);
            this.props.history.push(`/profile/${this.props.match.params.email}`);
        });
    }

    render() {
        return (
            <div className="edit-profile" style={{ marginTop: "10px" }}>
                <Card bg="light">
                    <Card.Header>Edit profile information</Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group as={Row} controlId="plaintextEmail">
                                <Form.Label column sm="2">
                                    Email
                                    </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={this.state.email} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="username">
                                <Form.Label column sm="2">
                                    Username
                                    </Form.Label>
                                <Col sm="10">
                                    <Form.Control placeholder="Username" value={this.state.username} onChange={this.handleChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="profilePicture">
                                <Form.Label column sm="2">
                                    Username
                                    </Form.Label>
                                <Col sm="10">
                                    <Form.Control placeholder="Image URL" value={this.state.profilePicture} onChange={this.handleChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="age">
                                <Form.Label column sm="2">
                                    Age
                                    </Form.Label>
                                <Col sm="10">
                                    <Form.Control placeholder="Age" value={this.state.age} onChange={this.handleChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="location">
                                <Form.Label column sm="2">
                                    Location
                                    </Form.Label>
                                <Col sm="10">
                                    <Form.Control placeholder="Location" value={this.state.location} onChange={this.handleChange} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="profileText">
                                <Form.Label column sm="2">
                                    Profile text
                                    </Form.Label>
                                <Col sm="10">
                                    <Form.Control as="textarea" rows="5" value={this.state.profileText} onChange={this.handleChange} />
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