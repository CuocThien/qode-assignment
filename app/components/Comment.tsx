"use client";

import { useEffect, useState } from 'react';
import { Input, Button, message } from 'antd';
import { Photo } from '@/type';

interface CommentProps {
  photo: Photo;
  onCommentAdded: () => void;
}

const Comment = ({ photo, onCommentAdded }: CommentProps) => {
  const [text, setText] = useState('');

 const [comments, setComments] = useState([]);
  const fetchComments = async () => {
    const response = await fetch(`/api/comments/${photo.id}`);
    const data = await response.json();
    setComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, [photo.id]);

  const addComment = async () => {
    if (!text) return;
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ photoId: photo.id, text }),
    });
    if (response.ok) {
      message.success('Comment added!');
      setText('');
      onCommentAdded(); // Trigger data refresh
      fetchComments()
    } else {
      message.error('Failed to add comment.');
    }
  };

  const removeComment = async (commentId: number) => {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      message.success('Comment removed!');
      onCommentAdded(); // Trigger data refresh
      fetchComments()
    } else {
      message.error('Failed to remove comment.');
    }
  };

  return (
    <div>
      <div>
        {comments.map((comment: any) => (
          <div key={comment.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p>{comment.text}</p>
            <Button type="link" onClick={() => removeComment(comment.id)}>
              Remove
            </Button>
          </div>
        ))}
      </div>

      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment"
      />
      <Button onClick={addComment} type="primary">
        Comment
      </Button>
    </div>
  );
};

export default Comment;
