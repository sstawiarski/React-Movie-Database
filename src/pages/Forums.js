import React from 'react';

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import ForumItem from '../components/ForumItem'
import Button from 'react-bootstrap/Button'
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';

import { store } from '../authentication/UserProvider';
import {Link} from "react-router-dom";

const Forums = ({ history, breadcrumbs }) => {

    const value = React.useContext(store);
    const { isAdmin } = value.state;

    const [forumList, setForumList] = React.useState(null)
    const [createForum, setCreateForum] = React.useState(false)
    const [forumName, setForumName] = React.useState(null);
    const [forumId, setForumId] = React.useState(null);
    const [created, setCreated] = React.useState(false);

    React.useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_ADDR + "/forums")
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

        fetch(process.env.REACT_APP_SERVER_ADDR + "/forums", {
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
                setCreateForum(!createForum);
                setForumName(null);
                setForumId(null);
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
            {breadcrumbs.map(({ match, breadcrumb }, idx) => {
                let separator = " / ";
                let style = {
                    color: "black",
                };
                if (idx === (breadcrumbs.length-1)) {
                    separator = "";
                    style.color = "rgb(1,123,255)";
                }
                return (
                    <span key={match.url}>
                        <Link to={match.url} style={style}>{breadcrumb}</Link>
                        {separator}
                    </span>
                )
            })}
            <h3 style={{marginTop: "10px"}}>Forums</h3>
            {isAdmin ? <Button variant="link" style={{display: "block", margin: "10px auto 0 auto"}} onClick={() => setCreateForum(!createForum)}>[Create new forum]</Button> : null}
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
                <hr />
            </Form>
            : null}
            <div style={{ display: "flex", alignContent: "center" }}>
                {forumList ?
                    <Table style={{ flexBasis: "1" }} bordered striped hover>
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

export default withBreadcrumbs()(Forums);