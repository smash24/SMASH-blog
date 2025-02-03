const  mongoose = require("mongoose")


const commentSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },
    blogId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Blog"
    }
},{timestamps:true})

const  CommentModel = mongoose.model( "Comment", commentSchema )

// const Comment = mongoose.model("Comment", commentSchema);

module.exports = CommentModel;


//copliot code


// const mongoose = require("mongoose");

// const commentSchema = new mongoose.Schema({
//     comment: {
//         type: String,
//         required: true
//     },
//     createdBy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//     },
//     blogId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Blog"
//     }
// }, { timestamps: true });

// const Comment = mongoose.model("Comment", commentSchema); // Correct usage

// module.exports = Comment;

