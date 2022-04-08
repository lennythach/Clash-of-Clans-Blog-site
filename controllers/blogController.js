const Blog = require('../models/blogs');

const blog_index = (req,res)=>{
    Blog.find().sort({ createdAt:-1 })
        .then((result)=>{
            res.render('blogs/index',{ title:'All Blogs', bloggers: result})
        })
        .catch((err)=>{
            console.log(err)
        })
};

const blog_create_index = (req,res)=> {
    res.render('blogs/create',{ title:'Create' });
};

// Allows users to post on the blog
const blog_create_post = (req,res)=>{
    const blog = new Blog(req.body);

    blog.save()
        .then((result)=>{
            res.redirect('/blogs')
        })
        .catch((err)=>console.log(err))
};

const blog_get_id = (req, res)=>{
    const id = req.params.id;
    console.log(id)
    Blog.findById(id)
    .then(result=> {
        res.render('blogs/details',{title:'Blogs Details', blog:result});
    })
    .catch((err)=>console.log(err))
};

const blog_delete = (req,res)=>{
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect:'/blogs' })
        })
        .catch(err=>{
            console.log(err)
        })
};


module.exports = {
    blog_index,
    blog_create_index,
    blog_create_post,
    blog_get_id,
    blog_delete
}