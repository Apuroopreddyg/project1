import React from "react";
import { Container, Button, Card } from "react-bootstrap";

const Finished = () => {
  return (
    <Container className="mt-5 text-center">
      <Card>
        <Card.Body>
          <Card.Title>You're All Set!</Card.Title>
          <Card.Text>Your registration process is now complete. You can now explore the platform.</Card.Text>
          <Button variant="primary" href="/">Go to Home</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Finished;
