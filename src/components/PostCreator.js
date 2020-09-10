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


        setState({ value: "" });
    }

    const handleChange = (event) => {
        const { value } = event.target;
        setState({ value: value })
    }

    const renderPreview = () => {
        if (!isLive) setState({ isLive: true });
    }

    const cancelPreview = (event) => {
        setState({ isLive: false });
    }

    React.useEffect(() => {
        if (isLive) {
            ReactDOM.render(<MarkdownPreview source={value} onClick={cancelPreview} />, document.getElementById("preview-container"));
        } else {
            ReactDOM.render(null, document.getElementById("preview-container"));
        }
    }, [isLive, value])

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
                {<div id="preview-container"></div>}
            </Card.Body>
        </Card>
    );
}

export { PostCreator };