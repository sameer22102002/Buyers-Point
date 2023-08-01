import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { userRequest } from "../requestMethods";
import { format } from "timeago.js";
import { nullCart, nullUser } from "../redux/apiCalls";
import { updateUser, deleteUser } from "../redux/apiCalls";
import BuyAgain from "../components/BuyAgain"


const ProfileContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const ProfileContent = styled.div`
  flex: 1;
  margin-left: 200px;
  margin-top: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;

  @media screen and (max-width: 768px) {
    margin-left: 0;
    max-width: 100%;
  }
`;

const DeleteButtonContainer = styled.div`
  position: absolute;
  top: 90px;
  right: 10px;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

const ProfileInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const ProfileButton = styled.button`
  padding: 10px;
  width: 150px;
  background-color: teal;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 16px;

  &:hover {
    background-color: #128c7e;
  }
`;

const DeleteButton = styled.button`
  padding: 10px;
  width: 120px;
  background-color: tomato;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 16px;

  &:hover {
    background-color: #d63025;
  }
`;

const RecentCommentsContainer = styled.div`
  flex: 1;
  margin-left: 20px;
  margin-right: 190px;
  margin-top: 40px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  max-height: 400px;
  max-width: 500px;
  overflow: auto;
  
`;


const RecentCommentHead = styled.div`
  background-color: white;
  border-bottom: 1px solid grey;
  top: 0;
  z-index: 3;
  padding: 10px;
  border-radius: 8px 8px 0 0;
  font-size: 18px;
  font-weight: bold;
`;

const CommentData = styled.div`
  margin-top: 20px;
`;

const CommentItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 8px;

  &:hover {
    background-color: #e3e3e3;
  }
`;

const CommentContent = styled.p`
  margin: 0;
  margin-bottom: 5px;
`;

const CommentOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const CommentDate = styled.span`
  font-size: 12px;
  color: gray;
`;

const CommentLink = styled.a`
  display: ${({ show }) => (show ? "inline" : "none")};
  font-size: 12px;
  color: blue;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const CommentDeleteButton = styled.button`
  display: ${({ show }) => (show ? "inline" : "none")};
  font-size: 12px;
  padding: 4px;
  background-color: tomato;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #d63025;
  }
`;

const ProfilePage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [curPassword, setCurPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [contact, setContact] = useState(currentUser.contact || "");
  const [address, setAddress] = useState(currentUser.address || "");
  const [hoveredCommentId, setHoveredCommentId] = useState(null);
  const [comments, setComments] = useState([]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = {
      userId: currentUser._id,
      username,
      email,
      curPassword,
      newPassword,
      contact,
      address,
    };
    try {
      const response = await userRequest.put(
        `/users/${currentUser._id}`,
        updatedUser
      );
      console.log("User updated successfully");
      alert("updated successfully");
      // Dispatch remaining
      // console.log(response.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      try {
        await userRequest.delete(`/users/${currentUser._id}`);
        nullUser(dispatch);
        nullCart(dispatch);
        console.log("Account deleted successfully");
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

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

  const handleCommentHover = (commentId) => {
    setHoveredCommentId(commentId);
  };

  const handleCommentLeave = () => {
    setHoveredCommentId(null);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await userRequest.get(
          `/comment/${currentUser._id}/${currentUser.username}`
        );
        setComments(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
    console.log(comments);
  }, []);

  return (
    <>
      <Navbar />
      <Announcement />
      <ProfileContainer>
        <ProfileContent>
          <DeleteButtonContainer>
            <DeleteButton onClick={handleDelete}>Delete Account</DeleteButton>
          </DeleteButtonContainer>
          <recentCommentHead>My Profile</recentCommentHead>
          <ProfileForm onSubmit={handleUpdate}>
            <ProfileInput
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <ProfileInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <ProfileInput
              type="text"
              placeholder="Contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <ProfileInput
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <ProfileInput
              type="password"
              placeholder="Current Password"
              value={curPassword}
              required
              onChange={(e) => setCurPassword(e.target.value)}
            />
            <ProfileInput
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <ProfileButton type="submit">Update</ProfileButton>
          </ProfileForm>
        </ProfileContent>
        <RecentCommentsContainer>
          <RecentCommentHead>
            <h3>My Recent Comments</h3>
          </RecentCommentHead>
          <CommentData>
            {comments.map((comment) => (
              <CommentItem
                key={comment._id}
                onMouseEnter={() => handleCommentHover(comment._id)}
                onMouseLeave={handleCommentLeave}
              >
                <CommentContent>{comment.content}</CommentContent>
                <CommentDate>{format(comment.createdAt)}</CommentDate>
                <CommentOptions>
                  <CommentLink
                    href={`/product/${comment.productId}`}
                    show={comment._id === hoveredCommentId}
                  >
                    Visit
                  </CommentLink>
                  <CommentDeleteButton
                    onClick={() => handleDeleteComment(comment._id)}
                    show={comment._id === hoveredCommentId}
                  >
                    Delete
                  </CommentDeleteButton>
                </CommentOptions>
              </CommentItem>
            ))}
          </CommentData>
        </RecentCommentsContainer>
      </ProfileContainer>
      <BuyAgain/>
      <Newsletter />
      <Footer />
    </>
  );
};

export default ProfilePage;
