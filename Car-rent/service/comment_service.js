const commentRep = require("../repository/comment_repository")

function create(comment){
	return commentRep.create(comment);
}
function removeComment(id){
	return commentRep.removeComment(id);
}
function getById(id){
	return commentRep.getById(id);
}
module.exports = {
	create,removeComment,getById
}