import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import ReactMarkdown from 'react-markdown';
import ReactDOM from 'react-dom';

class PostCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            isLive: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderPreview = this.renderPreview.bind(this);
        this.cancelPreview = this.cancelPreview.bind(this);
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
        if (this.state.isLive) {
            this.setState({ value: event.target.value });
            this.renderPreview(event);
        } else {
            event.preventDefault();
            this.setState({ value: event.target.value });
        }
    }

    renderPreview(event) {
        event.preventDefault();
        if (!this.state.isLive) this.setState({ isLive: true });
        ReactDOM.render(<MarkdownPreview source={this.state.value} onClick={this.cancelPreview} />, document.getElementById("preview-container"));
    }

    cancelPreview(event) {
        event.preventDefault();
        ReactDOM.render(null, document.getElementById("preview-container"));
        this.setState({ isLive: false });
    }

    render() {
        return (
            <Card bg={this.props.bg} id="post-creator">
                <Card.Header>Create New Post</Card.Header>
                <Card.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="newPostBody">
                            <Form.Control as="textarea" rows="5" onChange={this.handleChange} value={this.state.value} placeholder="Type a post here..." />
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                        <Button variant="outline-secondary" onClick={this.renderPreview}>Preview Markdown</Button>
                    </Form>
                    {<div id="preview-container"></div>}
                </Card.Body>
            </Card>
        );
    }
}

class MarkdownPreview extends React.Component {
    render() {
        return (
            <div id="markdown-preview">
                <Button variant="outline-danger" className="ml-auto" onClick={this.props.onClick}>Cancel Preview</Button>
                <br />
                <br />
                <br />
                <br />
                <Card bg="light">
                    <Card.Body>
                        <ReactMarkdown source={this.props.source} />
                    </Card.Body>
                </Card>

            </div>
        );
    }
}

export { PostCreator };