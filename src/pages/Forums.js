import React from 'react';

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import ForumItem from '../components/ForumItem'
import Button from 'react-bootstrap/Button'

import { store } from '../authentication/UserProvider';

const Forums = ({ history }) => {

    const value = React.useContext(store);
    const { isAdmin } = value.state;

    const [forumList, setForumList] = React.useState(null)
    const [createForum, setCreateForum] = React.useState(false)
    const [forumName, setForumName] = React.useState(null);
    const [forumId, setForumId] = React.useState(null);
    const [created, setCreated] = React.useState(false);

    React.useEffect(() => {
        fetch("http://localhost:4000/forums")
            .then(response => response.json())
            .then(json => {
                if (json.forumsFound) setForumList(json.forumList);
            });
    }, [created])

    const handleSubmit = (event) => {
        event.preventDefault();

        const body = {
            forumName: forumName,
            id: forumId
        };

        console.log(body);

        fetch("http://localhost:4000/forums", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(json => {
            if (json.success) {
                setCreated(true);
            }
        })
    };

    const handleChange = (e) => {
        const { value, id } = e.target;
        if (id === "forumName") setForumName(value);
        else if (id === "forumId") setForumId(value);
    }

    return (
        <Container>
            {isAdmin ? <Button variant="link" style={{display: "block", textAlign: "center", marginBottom: "10px"}} onClick={() => setCreateForum(!createForum)}>[Create new forum]</Button> : null}
            {createForum ? 
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="forumName">
                    <Form.Label>Forum name:</Form.Label>
                    <Form.Control type="text" onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="forumId">
                    <Form.Label>Forum ID:</Form.Label>
                    <Form.Control type="text" onChange={handleChange} />
                </Form.Group>
                <Button type="submit" variant="primary">Submit</Button>
            </Form>
            : null}
            <div style={{ display: "flex", alignContent: "center" }}>
                {forumList ?
                    <Table style={{ flexBasis: "1" }}>
                        <tbody>
                            {forumList.map(item => {
                                return <ForumItem key={item.id} history={history} name={item.name} id={item.id} />
                            })}
                        </tbody>
                    </Table>
                    : null}
            </div>
        </Container>
    );
}

export default Forums;