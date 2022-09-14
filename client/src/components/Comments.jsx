import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Comment from "./Comment";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {createComments} from "../redux/slices/commentSlice";
import {useLocation} from "react-router-dom";


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
const CommentBtn = styled.button`
  background-color: transparent;
  font-weight: 500;
  color: ${({theme}) => theme.textSoft};
  border: 1px solid;
  border-radius: 3px;
  height: max-content;
  padding: 5px 12px;
  cursor: pointer;
`;

const Comments = ({videoId}) => {
    const dispatch = useDispatch()
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const path = useLocation().pathname.split('/')[2]

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`/comments/${videoId}`);
                setComments(res.data)
            }catch (e) {
            }
        }
        fetchComments();
    },[videoId]);



    return (
        <Container>
            <NewComment>
                <UserAva/>
                <CommentInput
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder='Добавить коментарий...'/>
                <CommentBtn> Отправить </CommentBtn>
            </NewComment>
            {
                comments.map((comment) => <Comment key={comment._id} comment={comment}/>)
            }
            {/*<Comment/>
            <Comment/>
            <Comment/>*/}
        </Container>
    );
};

export default Comments;
