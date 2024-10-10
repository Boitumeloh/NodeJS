const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id).populate('userid');
    res.render('post', {
        blogpost
    });
};