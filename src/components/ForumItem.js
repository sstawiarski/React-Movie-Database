import React from 'react';

const ForumItem = ({ name, id, history, threadId, dateCreated, postCreator }) => {
    let newId = id;
    if (threadId) newId = newId + `/${threadId}`;
    return (
        <tr className="clickable-row" onClick={() => history.push(`/forums/${newId}`)}>
            <td>{name}</td>
            {postCreator ? <td>{postCreator}</td> : null}
            {dateCreated ? <td>{new Date(dateCreated).toLocaleDateString()}</td> : null}
        </tr>
    );
}

export default ForumItem;