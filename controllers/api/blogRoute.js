const router = require("express").Router();
const { Blog } = require("../../models");

router.post('/', async (req, res) => {
  console.log(req.body);
    try {
        // console.log(req.session);
      const newPost = await Blog.create({
        title: req.body.title,
        description: req.body.post
      });
      
  
      res.status(200).json(newPost);
    } catch (err) {
        console.log(err);
      res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
      const postdb = await Blog.findOne({
        where: {
          id: req.params.id
        }
      });
  
      if (postdb.user_id === req.session.user_id) {
        const deletePost = await Blog.destroy({
          where: {
            id: req.params.id,
          }
        })
        console.log('blog was deleted');
        res.status(200).json(deletePost);
      } else {
        res.status(402).json({message: "no blog found"})
      }
  
    } catch (err) {
      res.status(400).json(err);
    }
  })

  router.delete('/:id', async (req, res) => {
    try {
      const postdb = await Blog.findOne({
        where: {
          id: req.params.id
        }
      });
  
      if (postdb.user_id === req.session.user_id) {
        const deletePost = await Blog.destroy({
          where: {
            id: req.params.id,
          }
        })
        console.log('post was deleted');
        res.status(200).json(deletePost);
      } else {
        res.status(402).json({message: "no post found"})
      }
  
    } catch (err) {
      res.status(400).json(err);
    }
  })
  
  
  module.exports = router;