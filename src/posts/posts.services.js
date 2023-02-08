const { json } = require('sequelize ');
const postControllers = require( './posts.controllers');


const getAllPosts = (req, res) => {
    postsControllers.findAllPosts()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getPostById = (req, res) => {
    const id = Number(req.params.id);

    postsControllers.findPostById(id)
        .then(data => {
          if(data){
            res.status(200).json(data);
          }else {
            res.status(404).json({message: 'Post not found'})
          }
        })
        .catch(err => {
            res.status(400).json(err);
        });
};

const postNewPost = (req, res) => {
    const postObj = req.body;
    postControllers.createNewPost(postObj)
    .then(data => {
        res.status(201).json(data);
    })
    .cath(err => {
        res.status(400).json(err);
    });
};

const deletePost = (req, res) => {
  const id = req.params.id;

  postControllers.deletePost(id)
      .then(data => {
          if(data){
              res.status(204).json()
          } else {
              res.status(404).json({message: 'Post not found'});
          }
      })
      .catch(err => {
          res.status(400).json(err)
      });
};

const patchPost = (req, res) => {
  const id = req.params.id;
  const postObj = req.body;
  postControllers.updatePost(id, postObj)
      .then(data => {
          if(data){
              res.status(200).json({message: `Post with id: ${id} updated succesfully`});
          } else {
              res.status(404).json({message: 'Post not found'})
          }
      })
      .catch(err => {
          res.status(400).json(err);
      });
}

const putPost = (req, res) => {
    const id = req.params.id;
    const postObject = req.body;
    if (!postObject.content || !postObject.userName) {
        return res.status(400).json({
            message: "Missing Data",
            example_fields: {
            content: "This is my post content :D!",
            userName: "I'a Sahid, the author of this post!",
            isPublished: true,
            },
        });
    }

    postControllers
    .updatePost(id, postObject)
    .then((data) => {
        if (data) {
            res.status(200).json({
                message: `Post with id: ${id} updated succesfully`,
            });
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    })
    .catch((err) => {
        res.status(400).json(err);
    });
};

module.exports = {
    getAllPosts,
    getPostById,
    postNewPost,
    deletePost,
    patchPost,
    putPost
};