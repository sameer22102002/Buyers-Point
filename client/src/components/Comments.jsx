import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { userRequest, publicRequest } from "../requestMethods";
import "./searchInput.css"

const Container = styled.div`
  margin-top: 20px;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 20px 20px;
  border-radius: 15px;
`;

const CommentsContainer = styled.div`
  max-height: 600px;
  overflow-y: auto;
`;

const CommentsHeading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const NoComments = styled.p`
  color: #888;
  margin-top: 10px;
`;

const CommentsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CommentItem = styled.li`
  margin-bottom: 20px;
  margin-right:10px;
  padding: 15px;
  border-radius: 8px;
  background-color: #f7f7f7;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-7px);
  }

  &:hover .delete-icon,
  &:hover .edit-icon {
    opacity: 1;
  }
`;

const CommentContent = styled.p`
  font-size: 14px;
  margin-bottom: 5px;
`;

const CommentUser = styled.p`
  font-size: 12px;
  color: #555;
  margin-bottom: 5px;
`;

const CommentDate = styled.p`
  font-size: 12px;
  color: #888;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommentInputContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
  width: 500px;
`;

const AddCommentButton = styled.button`
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;

const DeleteIconStyled = styled(DeleteIcon)`
  font-size: 16px;
  color: #888;
  cursor: pointer;
  margin-top: 5px;
  opacity: 0.7;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

const EditNoteIconStyled = styled(EditNoteIcon)`
  font-size: 16px;
  color: #888;
  cursor: pointer;
  margin-top: 5px;
  opacity: 0.7;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

const Comments = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const [editMode, setEditMode] = useState({});

  const fetchComments = async () => {
    try {
      const response = await publicRequest.get(`/comment/${productId}`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [productId]);

  const toggleEditMode = (commentId) => {
    setEditMode((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const handleEditSubmit = async (commentId, updatedContent) => {
    try {
      await userRequest.put(`/comment/${commentId}`, {
        content: updatedContent,
      });
      fetchComments();
    } catch (error) {
      console.error("Error updating comment:", error);
    } finally {
      toggleEditMode(commentId);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await userRequest.delete(`/comment/${commentId}`);
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      await userRequest.post("/comment/", {
        productId,
        content: newComment,
        userId: user.username,
      });

      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Container>
      <CommentsHeading>Comments</CommentsHeading>
      <CommentsContainer>
        {comments.length === 0 ? (
          <NoComments>
            No comments yet! Be the first one to comment...
          </NoComments>
        ) : (
          <CommentsList>
            {comments.map((comment) => (
              <CommentItem key={comment._id}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    {editMode[comment._id] ? (
                      <CommentInput
                        type="text"
                        value={comment.content}
                        onChange={(e) => setComments(e.target.value)}
                      />
                    ) : (
                      <>
                        <CommentContent>{comment.content}</CommentContent>
                        <CommentUser>{comment.userId}</CommentUser>
                      </>
                    )}
                  </div>
                  {user?.username === comment.userId && (
                    <IconsContainer>
                      {!editMode[comment._id] ? (
                        <IconWrapper>
                          <EditNoteIconStyled
                            className="edit-icon"
                            onClick={() => toggleEditMode(comment._id)}
                          />
                        </IconWrapper>
                      ) : (
                        <IconWrapper>
                          <DeleteIconStyled
                            className="delete-icon"
                            onClick={() => handleDelete(comment._id)}
                          />
                        </IconWrapper>
                      )}
                      {editMode[comment._id] && (
                        <IconWrapper>
                          <EditNoteIconStyled
                            className="save-icon"
                            onClick={() =>
                              handleEditSubmit(comment._id, newComment)
                            }
                          />
                        </IconWrapper>
                      )}
                    </IconsContainer>
                  )}
                </div>
                <CommentDate>{format(comment.createdAt)}</CommentDate>
              </CommentItem>
            ))}
          </CommentsList>
        )}
        <CommentInputContainer>
          <CommentInput
            type="text"
            placeholder="Enter your comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <AddCommentButton onClick={handleCommentSubmit}>
            Add Comment
          </AddCommentButton>
        </CommentInputContainer>
      </CommentsContainer>
    </Container>
  );
};

export default Comments;
