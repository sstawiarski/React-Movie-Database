import React from 'react';

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'

import { Row, Col, Button } from 'react-bootstrap';

const EditProfile = (props) => {

    const [{
        email,
        profileText,
        username,
        age,
        location,
        profilePicture
    }, setState] = React.useState({
        email: '',
        profileText: '',
        username: props.match.params.username,
        age: '',
        location: '',
        profilePicture: ''
    })

    React.useEffect(() => {
        const getProfileInfo = async () => {
            const response = await fetch(`http://localhost:4000/profile/${username}`);
            let json = await response.json();
            setState({
                profileText: json.profileText,
                age: json.age,
                location: json.location,
                profilePicture: json.profilePicture,
                email: json.email,
                username: json.username
            })
        }

        getProfileInfo();
    }, [username]);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const body = {
            profileText: profileText,
            username: username,
            age: age,
            profilePicture: profilePicture,
            location: location,
        };

        fetch(`http://localhost:4000/profile/${username}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            },
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(js => console.log(js.message))
            .catch(err => console.error(err.message))
            .finally(() => {
                props.history.push(`/profile/${username}`);
            });
    }

    return (
        <div className="edit-profile" style={{ marginTop: "10px" }}>
            <Card bg="light">
                <Card.Header>Edit profile information</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} controlId="plaintextEmail">
                            <Form.Label column sm="2">
                                Email
                                    </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext readOnly value={email} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="username">
                            <Form.Label column sm="2">
                                Username
                                    </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue={username} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="profilePicture">
                            <Form.Label column sm="2">
                                Profile Picture
                                    </Form.Label>
                            <Col sm="10">
                                <Form.Control placeholder="Image URL" value={profilePicture} onChange={handleChange} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="age">
                            <Form.Label column sm="2">
                                Age
                                    </Form.Label>
                            <Col sm="10">
                                <Form.Control placeholder="Age" value={age || ""} onChange={handleChange} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="location">
                            <Form.Label column sm="2">
                                Location
                                    </Form.Label>
                            <Col sm="10">
                                <Form.Control placeholder="Location" value={location} onChange={handleChange} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="profileText">
                            <Form.Label column sm="2">
                                Profile text
                                    </Form.Label>
                            <Col sm="10">
                                <Form.Control as="textarea" rows="5" value={profileText} onChange={handleChange} />
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

export default EditProfile;