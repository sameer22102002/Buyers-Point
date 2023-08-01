import React, { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { format } from "timeago.js";
import "./comments.css";

export default function CommentsPage() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await userRequest.get("/comment/all");
        const commentsData = response.data;
        setComments(commentsData.reverse());
        console.log(comments);
      } catch (error) {
        console.error("Error getting comments:", error);
      }
    };
    fetchComments();
  }, []);

  const handleDeleteComment = async (commentId) => {
    try {
      await userRequest.delete(`/comment/${commentId}`);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="commentsPage">
      <h1>Latest Comments</h1>
      <div className="commentsContainer">
        {comments.map((comment) => (
          <div className="commentItem" key={comment._id}>
            <p className="commentUser">User: {comment.userId}</p>
            <p className="commentText">
              <b>Comment:</b> {comment.content}
            </p>
            <p className="commentProduct">
              <b>Product:</b> {comment.productId}
            </p>
            <p className="commentDate">
              <b>Date:</b> {format(comment.createdAt)}
            </p>
            <button
              className="deleteButton"
              onClick={() => handleDeleteComment(comment._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
