import React from "react";
import { Container, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Completion = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5 text-center">
      <Card>
        <Card.Body>
          <Card.Title>Registration Successful!</Card.Title>
          <Card.Text>Thank you for registering. Proceed to the final step.</Card.Text>
          <Button variant="success" onClick={() => navigate("/finished")}>
            Continue
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Completion;
