import React from 'react';
import withBreadcrumbs from 'react-router-breadcrumbs-hoc';

import Container from 'react-bootstrap/Container';
import ForumPost from '../components/ForumPost';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import {store} from '../authentication/UserProvider';
import {Link} from "react-router-dom";

const ForumThread = ({ history, breadcrumbs, forumName, ...props}) => {

    const [posts, setPosts] = React.useState(null);
    const [createPost, setCreatePost] = React.useState(false);
    const [postBody, setPostBody] = React.useState('');
    const [postSuccess, setPostSuccess] = React.useState(false);
    const [threadTitle, setThreadTitle] = React.useState('');
    const [totalPosts, setTotalPosts] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(0);

    const pageLimit = 2;

    const userState = React.useContext(store);

    React.useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_ADDR}/forums/${props.match.params.id}/${props.match.params.threadId}`)
            .then(response => response.json())
            .then(json => {
                if (json.postsFound) setPosts(json.posts);
                setThreadTitle(json.threadTitle);
                setTotalPosts(json.totalPosts);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postSuccess])

    const handleSubmit = (event) => {
        event.preventDefault();

        const body = {
            postContent: postBody
        }

        fetch(`${process.env.REACT_APP_SERVER_ADDR}/forums/${props.match.params.id}/${props.match.params.threadId}`, {
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
                    setPostSuccess(!postSuccess)
                }
            })
    }

    const handleChange = (event) => {
        setPostBody(event.target.value)
    }

    const handleClick = (event) => {

    }

    return (
        <Container>
            {breadcrumbs.map(({ match, location, breadcrumb }, idx) => {
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
            {posts ?
                <div>
                    <h3 style={{marginTop: "10px"}}>{threadTitle}</h3>
                    {posts.map(item => {
                        return (
                            <ForumPost key={item._id}
                                       postId={item._id}
                                       postContent={item.postContent}
                                       postCreator={item.postCreator}
                                       dateCreated={new Date(item.dateCreated).toLocaleDateString()}
                                       dateUpdated={item.dateUpdated}
                                       editedBy={item.editedBy}/>
                        );
                    })}
                </div>
                : null}
            {userState.state.user ? <Button variant="link" style={{
                display: "block",
                textAlign: "center",
                marginBottom: "10px",
                marginLeft: "auto",
                marginRight: "auto"
            }} onClick={() => setCreatePost(!createPost)}>[Create new post]</Button> : null}
            {createPost ?
                <div>
                    <hr/>

                    <Form onSubmit={handleSubmit} style={{width: "80%", margin: "10px auto 0 auto"}}>
                        <Form.Group controlId="postContent">
                            <Form.Label>Post content:</Form.Label>
                            <Form.Control as={"textarea"} rows={5} onChange={handleChange}/>
                        </Form.Group>
                        <Button type="submit" variant="primary">Submit</Button>
                    </Form>
                </div>
                : null}

        </Container>
    );
}

export default withBreadcrumbs()(ForumThread);