import React from 'react';
import ReactMarkdown from 'react-markdown';

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const MarkdownPreview = (props) => {
        return (
            <div id="markdown-preview">
                <Button variant="outline-danger" className="ml-auto" onClick={props.onClick}>Cancel Preview</Button>
                <br />
                <br />
                <br />
                <br />
                <Card bg="light">
                    <Card.Body>
                        <ReactMarkdown source={props.source} />
                    </Card.Body>
                </Card>

            </div>
        );
}

export default MarkdownPreview;