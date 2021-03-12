import React from 'react';
import ReactDOM from 'react-dom';

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import MarkdownPreview from '../components/MarkdownPreview'


const PostCreator = (props) => {

    const [{
        value,
        isLive
    }, setState] = React.useState({
        value: "",
        isLive: false
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        let newPost = {
            content: value,
        };
        try {
            fetch(process.env.REACT_APP_SERVER_ADDR + "/postings", {
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


        setState({ value: "" });
    }

    const handleChange = (event) => {
        const { value } = event.target;
        setState(prevState => ({
            ...prevState,
            value: value 
        }))
    }

    const renderPreview = () => {
        if (!isLive) setState(prevState => ({ ...prevState, isLive: true }));
    }

    const cancelPreview = (event) => {
        setState(prevState => ({ ...prevState, isLive: false }));
    }

  

    return (
        <Card bg={props.bg} id="post-creator">
            <Card.Header>Create New Post</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="newPostBody">
                        <Form.Control as="textarea" rows="5" onChange={handleChange} placeholder="Type a post here..." />
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                    <Button variant="outline-secondary" onClick={renderPreview}>Preview Markdown</Button>
                </Form>
                <div id="preview-container">
                    {isLive ? <MarkdownPreview source={value} onClick={cancelPreview} /> : null}
                </div>
            </Card.Body>
        </Card>
    );
}

export { PostCreator };