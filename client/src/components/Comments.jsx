import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Comment from "./Comment";
import axios from "axios";
import {useSelector} from "react-redux";


const Container = styled.div`
  padding-top: 20px;
`;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserAva = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: black;
`;

const CommentInput = styled.input`
  border: none;
  color: ${({theme}) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 60%;
`;
const as = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Comments = ({videoId}) => {
    const [comments, setComments] = useState([]);
    const currentUser = useSelector(state => state.user.data);
    console.log(comments)
    /*useEffect(() => {
       /!*const fetchComments = async () => {
           try {
               const res = await axios.get(`/comments/${videoId}`)
               console.log(res)
               setComments(res.data)
           }catch (e) {
               console.log(e)
           }
           fetchComments()
       }
    },[videoId])*!/*/

    return (
        <Container>
            <NewComment>
                <UserAva src={currentUser.imgUrl}/>
                <CommentInput placeholder='Добавить коментарий...'/>
            </NewComment>
            {/*{
                comments.map(comment => (
                    <Comment key={comment.id} comment={comment}/>
                ))
            }*/}
            <Comment/>
            <Comment/>
            <Comment/>
        </Container>
    );
};

export default Comments;
