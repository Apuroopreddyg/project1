import React from "react";
import { Container, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5 text-center">
      <Card>
        <Card.Body>
          <Card.Title>Welcome to Our Platform</Card.Title>
          <Card.Text>Click below to register and get started!</Card.Text>
          <Button variant="primary" onClick={() => navigate("/register")}>
            Go to Register
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;
