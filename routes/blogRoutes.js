const express = require('express');
const blogController = require('../controllers/blogController')
const routes = express();


routes.get('/blogs', blogController.blog_index);

routes.get('/blogs/create', blogController.blog_create_index);

routes.post('/blogs', blogController.blog_create_post);

routes.get('/blogs/:id', blogController.blog_get_id);

routes.delete('/blogs/:id', blogController.blog_delete);



module.exports = routes;