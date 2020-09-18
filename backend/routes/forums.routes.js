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
        res.status(200).json({
            message: `Forum successfully created with name ${forumName}`,
            success: true
        });
    } catch (err) {
        console.log(err.message);
        res.status(401).json({ message: "Error creating forum", success: false })
    }

});

//get all threads for a particular forum
router.get('/:id', async (req, res, err) => {
    const id = req.params.id;

    let forumThreads = {
        forumName: '',
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
                postCreator: item.postCreator,
                lastPost: null,
                lastPostFound: false
            }
            if (item.lastPost) {
                const post = item.forumPosts.filter(post => post._id.toString() === item.lastPost.toString());

                if (post.length) {
                    threadItem.lastPost = {
                        postCreator: post[0].postCreator,
                        dateCreated: post[0].dateCreated
                    }
                    threadItem.lastPostFound = true;
                }
            }

            forumThreads.threadList.unshift(threadItem)
        })
        forumThreads.forumName = forum.name;

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
    if (!req.user) {
        res.status(501).json({ message: "user not logged in" })
        return;
    }
    const id = req.params.id;
    const threadTitle = req.body.threadTitle;
    const postBody = req.body.postBody;
    const postCreator = req.user.username;
    try {
        const forum = await ForumDetails.findOne({ "id": id });
        const threads = forum.threads;
        const lastAddedPost = threads ? threads[threads.length - 1] : null;
        let lastID = 0;
        if (lastAddedPost) {
            lastID = lastAddedPost.id;
        }

        let threadsLength = 0;
        if (forum) {
            threadsLength = await forum.threads.push({
                dateCreated: Date.now(),
                threadTitle: threadTitle,
                postCreator: postCreator,
                id: ++lastID
            })
            await forum.save();
        }
        const threadId = forum.threads[forum.threads.length - 1].id;

        const thread = await ForumDetails.findOne({ "id": id, "threads.id": threadId }, {
            threads: {
                $elemMatch: {
                    id: threadId
                }
            }
        });

        let forumPosts = 0;
        let result = 0;
        if (thread) {
            forumPosts = thread.threads[0].forumPosts;
            const postLength = await forumPosts.push({
                dateCreated: Date.now(),
                postCreator: postCreator,
                postContent: postBody,
                editedBy: null,
                dateUpdated: null
            })
            result = forumPosts[postLength - 1]._id;
            await thread.save();
        }

        await ForumDetails.findOneAndUpdate({
            "id": id, "threads": {
                '$elemMatch': {
                    id: threadId
                }
            }
        }, {
            $set: {
                'threads.$.lastPost': mongoose.Types.ObjectId(result)
            }
        })

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
    const page = req.query.page || 1;
    const pageLimit = 2;

    const firstFewPosts = {
        postsFound: false,
        threadTitle: '',
        totalPosts: 0,
        posts: []
    }
    try {
        const forum = await ForumDetails.findOne({ "id": forumId });
        const threads = forum.threads;
        const posts1 = threads.filter(item => {
            return item.id.toString() === threadId;
        });



        firstFewPosts.totalPosts = posts1[0].forumPosts.length;
        firstFewPosts.threadTitle = posts1[0].threadTitle;
        for (let i = ((page-1)*(pageLimit)) || 0; i < posts1[0].forumPosts.length && i < page*pageLimit; i++) {
            firstFewPosts.postsFound = true;
            firstFewPosts.posts.push(posts1[0].forumPosts[i]);
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
        totalPosts: 0,
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
        pagePosts.totalPosts = posts.length;
        for (let i = pageLimit * (pageNumber - 1); i < posts.length && i < (pageLimit * pageNumber); i++) {
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
        const thread = await ForumDetails.findOne({ "id": forumId, "threads.id": threadId }, {
            threads: {
                $elemMatch: {
                    id: threadId
                }
            }
        });
        let result = null;

        if (thread) {
            const forumPosts = thread.threads[0].forumPosts;
            await forumPosts.push({
                dateCreated: Date.now(),
                postCreator: postCreator,
                postContent: postContent,
                editedBy: null,
                dateUpdated: null
            })
            result = forumPosts[forumPosts.length-1]._id;
            await thread.save();
        }

        await ForumDetails.findOneAndUpdate({
            "id": forumId, "threads": {
                '$elemMatch': {
                    id: threadId
                }
            }
        }, {
            $set: {
                'threads.$.lastPost': mongoose.Types.ObjectId(result)
            }
        })

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
        const thread = await ForumDetails.findOne({ "id": forumId, "threads.id": threadId }, {
            threads: {
                $elemMatch: {
                    id: threadId
                }
            }
        });
        if (thread) {
            const item = await ForumDetails.findOneAndUpdate({ "id": forumId, "threads.id": threadId, "threads.forumPosts._id": postId }, {
                $set: {
                    postContent: postContent,
                    dateUpdated: Date.now(),
                    editedBy: editor
                }
            });
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