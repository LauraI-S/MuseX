import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

type MusicianDetailsProps = {
  musician: Musician;
};

type Musician = {
  _id: string;
  name: string;
  instrument: string[];
  summary: string;
  hasEquipment: boolean;
};

const MusicianInfo: React.FC<MusicianDetailsProps> = ({ musician }) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<string[]>([]);

  const handleLike = () => {
    // Implement logic to toggle the liked state and send a like to the server
    setLiked(!liked);
  };

  const handleComment = () => {
    // Implement logic to post a comment to the server and update the comments list
    setComments([...comments, comment]);
    setComment("");
  };

  return (
    <Card className="musician-details">
      <Card.Img src={musician.img} alt={musician.name} />
      <Card.Body>
        <Card.Title>{musician.name}</Card.Title>
        <Card.Text>
          <strong>Instrument:</strong> {musician.instrument.join(", ")}
        </Card.Text>
        <Card.Text>
          <strong>Summary:</strong> {musician.summary}
        </Card.Text>
        <Card.Text>
          <strong>Has Equipment:</strong> {musician.hasEquipment ? "Yes" : "No"}
        </Card.Text>
        <Button
          variant={liked ? "danger" : "secondary"}
          className="like-button"
          onClick={handleLike}
        >
          {liked ? "Unlike" : "Like"} ♥️
        </Button>
        <Form className="add-comment-form">
          <Form.Control
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            variant="secondary"
            onClick={handleComment}
            disabled={!comment}
          >
            Add Comment
          </Button>
        </Form>
        <div className="comment-list">
          <h5>Comments:</h5>
          <ul>
            {comments.map((c, index) => (
              <li key={index}>{c}</li>
            ))}
          </ul>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MusicianInfo;
