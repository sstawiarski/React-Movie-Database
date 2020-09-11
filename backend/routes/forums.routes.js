const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login').ensureLoggedIn;
const connection = mongoose.connection;
const { checkIsAdmin } = require('../auth/utils');
const ForumDetails = require('../models/forum.model');
const { ensureLoggedIn } = require('connect-ensure-login');
const ForumPost = require('../models/forum-post.model');

router.get('/', async (req, res, err) => {
    try {
        let forums = {
            forumsFound: false,
            forumList: []
        };
        const forumSearch = await ForumDetails.find({}, { name: 1, id: 1, _id: 0 });
        for (let working of forumSearch) {
            forums.forumsFound = true;
            forums.forumList.push(working);
        }

        res.status(200).json(forums);
    }
    catch (err) {
        console.log(err.message);
        res.status(401).json({ message: "Error retreving forums", forumsFound: false });
    }
});

router.post('/', checkIsAdmin, async (req, res, err) => {
    const forumName = req.body.forumName;
    const id = req.body.id;

    try {
        await ForumDetails.create({
            name: forumName,
            id: id
        });
        res.sendStatus(200).json({
            message: `Forum successfully created with name ${forumName}`,
        });
    } catch (err) {

    }

});

//get all threads for a particular forum
router.get('/:id', async (req, res, err) => {
    const id = req.params.id;

    let forumThreads = {
        threadsFound: false,
        threadList: []
    };
    try {
        const forum = await ForumDetails.findOne({ "id": id })
        
        const threads = forum.threads;

        threads.forEach(item => {
            forumThreads.threadsFound = true;
            let threadItem = {
                id: item.id,
                dateCreated: item.dateCreated,
                threadTitle: item.threadTitle,
                postCreator: item.postCreator
            }
            forumThreads.threadList.push(threadItem)
        })

        res.status(200).json(forumThreads);

    } catch (err) {
        console.log(err.message)
        res.status(401).json({
            message: "Error getting forum posts",
            threadsFound: false
        })
    }

});

//post new thread
router.post('/:id', connectEnsureLogin('/signin'), async (req, res, err) => {
    const id = req.params.id;
    const threadTitle = req.body.threadTitle;
    const postCreator = req.user.username;
    try {
        const forum = await ForumDetails.findOne({ "id": id });
        const threads = forum.threads;
        const lastAddedPost = threads ? threads[threads.length - 1] : null;
        let lastID = 0;
        if (lastAddedPost) {
            lastID = lastAddedPost.id;
        }

        if (forum) {
            await forum.threads.push({
                dateCreated: Date.now(),
                threadTitle: threadTitle,
                postCreator: postCreator,
                id: ++lastID
            })
            await forum.save();
        }

        res.status(200).json({
            message: "New thread created",
            success: true
        })

    }
    catch (err) {
        console.log(err.message)
        res.status(401).json({
            postSuccessful: false,
            message: "Error creating new post"
        })
    }
});

//get first posts in thread
router.get('/:forumId/:threadId', async (req, res, err) => {
    const forumId = req.params.forumId;
    const threadId = req.params.threadId;
    const pageLimit = 25;

    const firstFewPosts = {
        postsFound: false,
        posts: []
    }

    try {
        const forum = await ForumDetails.findOne({ "id": forumId });
        const threads = forum.threads;
        //console.log(threads);
        const posts1 = threads.filter(item => {
            return item.id !== threadId;
        });

        for (let i = 0; i < posts1.length && i < 25; i++) {
            firstFewPosts.posts.push(posts1[i].forumPosts);
        }

        res.status(200).json(firstFewPosts);

    } catch (err) {
        console.log(err.message);
        res.status(401).json({
            message: "Error finding first posts",
            postsFound: false
        })
    }
});

//get page of posts in thread
router.get('/:forumId/:threadId/:pageNumber', async (req, res, err) => {
    const forumId = req.params.forumId;
    const threadId = req.params.threadId;
    const pageNumber = req.params.pageNumber;
    const pageLimit = 25;

    const pagePosts = {
        postsFound: false,
        posts: []
    }

    try {
        const forum = await ForumDetails.findOne({ "id": forumId });
        const threads = forum.threads;
        //console.log(threads);
        const posts = threads.filter(item => {
            return item.id !== threadId;
        });

        let isExceeded = true;
        for (let i = pageLimit*(pageNumber - 1); i < posts.length && i < (pageLimit*pageNumber); i++) {
            isExceeded = false;
            pagePosts.postsFound = true;
            pagePosts.posts.push(posts[i].forumPosts[i]);
        }

        if (isExceeded) {
            res.status(500).json({
                message: "Number of posts exceeded",
                postsFound: false
            })
        } else {
            res.status(200).json(pagePosts);
        }

    } catch (err) {
        console.log(err.message);
        res.status(401).json({
            message: "Error finding posts",
            postsFound: false
        })
    }
});

//post new post in thread
router.post('/:forumId/:threadId', connectEnsureLogin('/signin'), async (req, res, err) => {
    const forumId = req.params.forumId;
    const threadId = req.params.threadId;
    const postContent = req.body.postContent;
    const postCreator = req.user.username;
    try {
        const thread = await ForumDetails.findOne({ "id": forumId, "threads.id": threadId }, { threads: {
            $elemMatch: {
                id: threadId
            }
        }});
        if (thread) {
            const forumPosts = thread.threads[0].forumPosts;
            await forumPosts.push({
                dateCreated: Date.now(),
                postCreator: postCreator,
                postContent: postContent,
                editedBy: null,
                dateUpdated: null
            })
            await thread.save();
        }

        res.status(200).json({
            message: "New post created",
            success: true
        })

    }
    catch (err) {
        console.log(err.message)
        res.status(401).json({
            postSuccessful: false,
            message: "Error creating new post"
        })
    }
});

router.put('/:forumId/:threadId/:postId', connectEnsureLogin('/signin'), async (req, res, err) => {
    const forumId = req.params.forumId;
    const threadId = req.params.threadId;
    const postId = req.params.postId;
    const postContent = req.body.postContent;
    const editor = req.user.username;

    try {
        const thread = await ForumDetails.findOne({ "id": forumId, "threads.id": threadId }, { threads: {
            $elemMatch: {
                id: threadId
            }
        }});
        if (thread) {
            /*
            const forumPosts = thread.threads[0].forumPosts;
            const specificPost = forumPosts.filter(item => {
                return item.id === postId;
            }).pop();
            console.log(specificPost);*/

            const item = await ForumDetails.findOneAndUpdate({ "id": forumId, "threads.id": threadId, "threads.forumPosts._id": postId }, { $set: {
                postContent: postContent,
                dateUpdated: Date.now(),
                editedBy: editor
            }});
            console.log(item);

        }

        res.status(200).json({
            message: "Post updated",
            success: true
        })

    }
    catch (err) {
        console.log(err.message)
        res.status(401).json({
            postSuccessful: false,
            message: "Error updating post"
        })
    }
});

module.exports = router;