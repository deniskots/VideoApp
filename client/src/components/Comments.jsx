import React from 'react';
import styled from "styled-components";
import Comment from "./Comment";


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

const Comments = () => {
    return (
        <Container>
            <NewComment>
                <UserAva/>
                <CommentInput placeholder='Добавить коментарий...'/>
            </NewComment>
            <Comment/>
            <Comment/>
        </Container>
    );
};

export default Comments;
