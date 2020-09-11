import React from 'react';

import Container from 'react-bootstrap/Container';
import ForumPost from  '../components/ForumPost';

const ForumThread = (props) => {
    const [posts, setPosts] = React.useState(null);

    React.useEffect(() => {
        fetch(`http://localhost:4000/forums/${props.match.params.id}/${props.match.params.threadId}`)
        .then(response => response.json())
        .then(json => {
            if (json.postsFound) setPosts(json.posts);
        })
    }, [])

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
        </Container>
    );
}

export default ForumThread;