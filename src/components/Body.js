import React from 'react';

import ReactMarkdown from 'react-markdown';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

const Body = (props) => {

    const [{
        postDate,
        postMessage,
        nextPost,
        isNextPost,
        isPostBefore,
        postBefore
    }, setState] = React.useState({
        postDate: null,
        postMessage: null,
        nextPost: null,
        isNextPost: false,
        isPostBefore: false,
        postBefore: null
    })

    const getPosts = async () => {
        try {
            const res = await fetch('http://localhost:4000/postings');
            const parse = await res.json();
            const json = parse;

            setState({ 
                postDate: new Date(json.date).toLocaleDateString(), 
                postMessage: json.content,
                isNextPost: json.previous === "" ? false : true,
                nextPost: json.previous === "" ? null : json.previous
             });
        }
        catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        getPosts()
    }, [])

    const handleClick = (event) => {
        event.preventDefault();

        let postToGoTo;
        if (event.target.id === "previous-btn") {
            postToGoTo = nextPost;
        } else if (event.target.id === "next-btn") {
            postToGoTo = postBefore;
        }

        fetch(`http://localhost:4000/postings/${postToGoTo}`)
            .then(res => res.json())
            .then(json => {
                json = JSON.parse(json);
                let hasPrev;
                let prevId;
                let hasBefore;
                let beforeId;
                if (json.previous) {
                    hasPrev = true;
                    prevId = json.previous;
                }

                if (json.before) {
                    hasBefore = true;
                    beforeId = json.before;
                }

                if (!json.before && !json.previous) {
                    hasPrev = false;
                    hasBefore = false;
                    prevId = null;
                    beforeId = null;
                }
                setState({
                    postDate: new Date(json.date).toLocaleDateString(),
                    postMessage: json.content,
                    nextPost: prevId,
                    isNextPost: hasPrev,
                    isPostBefore: hasBefore,
                    postBefore: beforeId
                })
            });

    }

    return (
        <Card>
            <Card.Header>News and Updates</Card.Header>
            <Card.Body>
                {postDate ?
                    <div>
                        <p id="post-date">{postDate}</p>

                        <div id="post-content">{postMessage && <ReactMarkdown source={postMessage.replace(/\\n/gi, '\n &nbsp;')} />}</div>

                        <div id="post-navigation">
                            {isNextPost && <Button variant="link" id="previous-btn" onClick={handleClick}>Previous Post</Button>}
                            {isPostBefore && <Button variant="link" id="next-btn" onClick={handleClick}>Next Post</Button>}
                        </div></div> : <p id="posts-missing">Posts not found</p>}
            </Card.Body>
        </Card>
    );
}

export { Body };