import React from 'react';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import ForumItem from '../components/ForumItem';

const ForumDetails = ({ history, ...props}) => {

    const [forumThreads, setForumThreads] = React.useState(null);

    React.useEffect(() => {
        fetch(`http://localhost:4000/forums/${props.match.params.id}`)
        .then(response => response.json())
        .then(json => {
            if (json.threadsFound) setForumThreads(json.threadList);
        })
    }, [])

    return (
        <Container>
            {forumThreads ? 
            <div>
                <Table>
                    <thead>
                        <th>Post Title</th>
                        <th>Created By</th>
                        <th>Date Posted</th>
                    </thead>
                    <tbody>
                        {forumThreads.map(item => {
                            return <ForumItem key={item.id} name={item.threadTitle} id={props.match.params.id} threadId={item.id} postCreator={item.postCreator} dateCreated={item.dateCreated} history={history}/>;
                        })}
                    </tbody>
                </Table>
            </div>
            : null}
        </Container>
    );
};

export default ForumDetails;