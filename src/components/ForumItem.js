import React from 'react';

const ForumItem = ({ name, id, history, threadId, dateCreated, postCreator, ...rest }) => {
    let newId = id;
    if (threadId) newId = newId + `/${threadId}`;
    return (
        <tr className="clickable-row" onClick={() => history.push(`/forums/${newId}`)}>
            <td>{name}</td>
            {rest.lastPostFound ? <td>{new Date(rest.lastPost.dateCreated).toLocaleDateString()}</td> : dateCreated ? <td>{new Date(dateCreated).toLocaleDateString()}</td>: null}
            {rest.lastPostFound ? <td>{rest.lastPost.postCreator}</td> : postCreator ? <td>{postCreator}</td> : null}
            {postCreator ? <td>{postCreator}</td> : null}
            {dateCreated ? <td>{new Date(dateCreated).toLocaleDateString()}</td> : null}
        </tr>
    );
}

export default ForumItem;