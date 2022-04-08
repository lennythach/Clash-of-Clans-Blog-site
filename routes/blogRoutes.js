const express = require('express');
const blogController = require('../controllers/blogController');
const { requireAuth } = require('../middleware/authMiddleware');
const routes = express();


routes.get('/blogs', requireAuth, blogController.blog_index);

routes.get('/blogs/create', requireAuth, blogController.blog_create_index);

routes.post('/blogs', requireAuth, blogController.blog_create_post);

routes.get('/blogs/:id', requireAuth, blogController.blog_get_id);

routes.delete('/blogs/:id', requireAuth, blogController.blog_delete);



module.exports = routes;