const jsonUtils = require("../json");
const commentsFile = require("../datas/comments.json")
const comments = jsonUtils.jsonReader(commentsFile);
function create(comment){
	comment.id = jsonUtils.generateNextId(comments);
	comments.push(comment);
	jsonUtils.saveDataToFile(comments,commentsFile);
	return comment
}

function removeComment(commentId){
	const index = comments.findIndex((comment)=>comment.id === commentId)
	if(index !== -1){
		return comments.splice(index,1)
	} else {
		return null;
	}
}
function getById(id){
	const index = comments.findIndex((comment)=>comment.id === id);
	return comments[index]
}
module.exports = {
	create,removeComment,getById
}