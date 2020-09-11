import React from 'react';

import Card from 'react-bootstrap/Card';

const ForumPost = ({ postId, postContent, postCreator, dateCreated, dateUpdated, editedBy }) => {

    const shortPostId = postId.substr(0, 7) + '...';
    return (
        <Card bg="light" id={postId}>
            <Card.Header><a href={postId}>#{`${shortPostId}`}</a>{`  ${postCreator}`}<span style={{ float: "right" }}>{`${dateCreated}`}</span></Card.Header>
            <Card.Body>
                {postContent}
            </Card.Body>
            {dateUpdated && editedBy ?
                <Card.Footer>Last Updated: {`${dateUpdated}`} by {`${editedBy}`}</Card.Footer>
                : null}
        </Card>
    );
};

export default ForumPost;