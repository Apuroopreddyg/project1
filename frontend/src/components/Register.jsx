import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";
import "../styles/Register.css"; // Import CSS
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    college_name: "",
    degree: "B.Tech",
    year_of_study: "1st",
    cgpa: "",
    tech_stack: "",
    other_skills: "",
    project_idea: "",
    linkedin: "",
    github: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null); // Ensure previous errors are cleared
    setLoading(true);
  
    try {
      const res = await axios.post("https://project1-front-dcgz.onrender.com/api/register", formData, {
        headers: { "Content-Type": "application/json" },
      });
  
      setMessage(res.data.message); // Set success message
      setError(null); // Ensure error is cleared
  
      setFormData({
        full_name: "",
        email: "",
        phone_number: "",
        college_name: "",
        degree: "B.Tech",
        year_of_study: "1st",
        cgpa: "",
        tech_stack: "",
        other_skills: "",
        project_idea: "",
        linkedin: "",
        github: "",
      });
      navigate("/completion")
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
      setMessage(null); // Ensure message is cleared on error
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Container className="register-container">
      <h2>Google Forms Styled Registration</h2>
      {message ? (
        <Alert variant="success">{message}</Alert>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : null}


      <Form onSubmit={handleSubmit}>
        <Form.Group className="form-group">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>College Name</Form.Label>
          <Form.Control type="text" name="college_name" value={formData.college_name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>Degree</Form.Label>
          <Form.Select name="degree" value={formData.degree} onChange={handleChange}>
            <option>B.Tech</option>
            <option>M.Tech</option>
            <option>MBA</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>Year of Study</Form.Label>
          <Form.Select name="year_of_study" value={formData.year_of_study} onChange={handleChange}>
            <option>1st</option>
            <option>2nd</option>
            <option>3rd</option>
            <option>4th</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>CGPA</Form.Label>
          <Form.Control type="number" step="0.1" name="cgpa" value={formData.cgpa} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>Tech Stack (Comma Separated)</Form.Label>
          <Form.Control type="text" name="tech_stack" value={formData.tech_stack} onChange={handleChange} placeholder="e.g., React, Node.js, Python" />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>Other Skills</Form.Label>
          <Form.Control type="text" name="other_skills" value={formData.other_skills} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>Project Idea</Form.Label>
          <Form.Control as="textarea" name="project_idea" value={formData.project_idea} onChange={handleChange} minLength="50" />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>LinkedIn</Form.Label>
          <Form.Control type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>GitHub</Form.Label>
          <Form.Control type="url" name="github" value={formData.github} onChange={handleChange} />
        </Form.Group>

        <Button className="register-button" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Register"}
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
