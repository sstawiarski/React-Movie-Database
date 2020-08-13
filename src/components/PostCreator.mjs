import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';

class PostCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let newPost = {
            content: this.state.value,
        };
        try {
            fetch("http://localhost:4000/postings", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPost)
            }).then(res => res.json())
                .then((json) => {
                    if (json.success) {
                        document.location.reload();
                    } else {
                        alert("Could not create new post");
                    }
                })
        }
        catch {
            console.log("Error adding new post");
        }


        this.setState({ value: "" });
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <Card bg={this.props.bg} id="post-creator">
                <Card.Header>Create New Post</Card.Header>
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="newPostBody">
                            <Form.Control as="textarea" onChange={this.handleChange} value={this.state.value} placeholder="Type a post here..." />
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                    {<div id="texting"></div>}
                </Card.Body>
            </Card>
        );
    }
}

export { PostCreator };