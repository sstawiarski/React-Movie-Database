import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import ReactMarkdown from 'react-markdown';

class Body extends React.Component {

    constructor(props) {
        super(props);
        this.findFirst = this.findFirst.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            postDate: null,
            postMessage: null,
            nextPost: null,
            isNextPost: false,
            isPostBefore: false,
            postBefore: null
        };
    }

    async findFirst() {
        try {
            const res = await fetch('http://localhost:4000/postings');
            const parse = await res.json();
            const json = JSON.parse(parse);

            this.setState({ postDate: new Date(json.date).toLocaleDateString() });
            this.setState({ postMessage: json.content });

            if (json.previous === "") {
                this.setState({ isNextPost: false });
            } else {
                this.setState({ isNextPost: true, nextPost: json.previous });
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    handleClick(event) {
        event.preventDefault();

        let postToGoTo;
        if (event.target.id === "previous-btn") {
            postToGoTo = this.state.nextPost;
        } else if (event.target.id === "next-btn") {
            postToGoTo = this.state.postBefore;
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
                this.setState({
                    postDate: new Date(json.date).toLocaleDateString(),
                    postMessage: json.content,
                    nextPost: prevId,
                    isNextPost: hasPrev,
                    isPostBefore: hasBefore,
                    postBefore: beforeId
                })
            });

    }

    componentDidMount() {
        this.findFirst().catch(err => console.log(err));
    }

    render() {
        return (
            <Card>
                <Card.Header>News and Updates</Card.Header>
                <Card.Body>
                    {this.state.postDate ?
                        <div>
                            <p id="post-date">{this.state.postDate}</p>

                            <p id="post-content">{this.state.postMessage && <ReactMarkdown source={this.state.postMessage.replace(/\n/gi, '\n &nbsp;')} />}</p>

                            <div id="post-navigation">
                                {this.state.isNextPost && <Button variant="link" id="previous-btn" onClick={this.handleClick}>Previous Post</Button>}
                                {this.state.isPostBefore && <Button variant="link" id="next-btn" onClick={this.handleClick}>Next Post</Button>}
                            </div></div> : <p id="posts-missing">Posts not found</p>}
                </Card.Body>
            </Card>
        );
    }
}

export { Body };