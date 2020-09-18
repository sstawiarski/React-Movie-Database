import React from 'react';

import Container from 'react-bootstrap/Container';
import ForumPost from  '../components/ForumPost';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { store } from '../authentication/UserProvider';

const ForumThread = (props) => {
    const [posts, setPosts] = React.useState(null);
    const [createPost, setCreatePost] = React.useState(false);
    const [postBody, setPostBody] = React.useState('');

    const userState = React.useContext(store);

    React.useEffect(() => {
        fetch(`http://localhost:4000/forums/${props.match.params.id}/${props.match.params.threadId}`)
        .then(response => response.json())
        .then(json => {
            if (json.postsFound) setPosts(json.posts);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();

        const body = {
            postContent: postBody
        }

        fetch(`http://localhost:4000/forums/${props.match.params.id}/${props.match.params.threadId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(body)
        })
            .then(response => response.json())
            .then(json => {
                if (json.success) {
                    setCreatePost(!createPost);
                    setPostBody('');
                }
            })
    }

    const handleChange = (event) => {
        setPostBody(event.target.value)
    }

    return (
        <Container>
            {posts ? 
            <div>
                {posts.map(item => {
                    return (
                        <ForumPost key={item._id}
                        postId={item._id}
                        postContent={item.postContent}
                        postCreator={item.postCreator}
                        dateCreated={new Date(item.dateCreated).toLocaleDateString()}
                        dateUpdated={item.dateUpdated}
                        editedBy={item.editedBy} />
                    );
                })}
            </div> 
            : null}
            {userState.state.user ? <Button variant="link" style={{display: "block", textAlign: "center", marginBottom: "10px", marginLeft: "auto", marginRight: "auto"}} onClick={() => setCreatePost(!createPost)}>[Create new post]</Button> : null}
            {createPost ?
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="forumName">
                        <Form.Label>Forum name:</Form.Label>
                        <Form.Control as={"textarea"} rows={5} onChange={handleChange} />
                    </Form.Group>
                    <Button type="submit" variant="primary">Submit</Button>
                    <hr />
                </Form>
                : null}
        </Container>
    );
}

export default ForumThread;