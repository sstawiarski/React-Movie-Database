import React from 'react';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import ForumItem from '../components/ForumItem';

import { store } from '../authentication/UserProvider';

const ForumDetails = ({ history, ...props }) => {

    const [forumThreads, setForumThreads] = React.useState(null);
    const [formEntry, showFormEntry] = React.useState(false);
    const [threadTitle, setThreadTitle] = React.useState(null);
    const [postBody, setPostBody] = React.useState(null);
    const [created, setCreated] = React.useState(false);

    const Context = React.useContext(store);
    const { user } = Context.state;

    React.useEffect(() => {
        fetch(`http://localhost:4000/forums/${props.match.params.id}`)
            .then(response => response.json())
            .then(json => {
                if (json.threadsFound) setForumThreads(json.threadList);
            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [created])

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const body = {
            threadTitle: threadTitle,
            postBody: postBody
        };

        fetch(`http://localhost:4000/forums/${props.match.params.id}`, {
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
                setCreated(!created);
                setThreadTitle(null);
                setPostBody(null);
                showFormEntry(!formEntry);
            }
        })
    }

    const handleChange = (event) => {
        const { value, id } = event.target;
        if (id === "threadTitle") setThreadTitle(value);
        else if (id === "postBody") setPostBody(value);
    }

    return (
        <Container>
            {user ? <Button variant="link" onClick={() => showFormEntry(!formEntry)}>[Create new thread]</Button> : null}
            {formEntry ?
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="threadTitle">
                        <Form.Label>Thread title:</Form.Label>
                        <Form.Control type="text" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="postBody">
                        <Form.Label>Post Body:</Form.Label>
                        <Form.Control as="textarea" rows="5" onChange={handleChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">Submit</Button>
                    <hr />
                </Form>
                : null}
            {forumThreads ?
                <div>
                    <Table bordered striped>
                        <thead>
                            <tr>
                                <th>Post Title</th>
                                <th>Created By</th>
                                <th>Date Posted</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forumThreads.map(item => {
                                return <ForumItem key={item.id} name={item.threadTitle} id={props.match.params.id} threadId={item.id} postCreator={item.postCreator} dateCreated={item.dateCreated} history={history} />;
                            })}
                        </tbody>
                    </Table>
                </div>
                : null}
        </Container>
    );
};

export default ForumDetails;