import { useState, useEffect } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { GET_FORM_DATA, SUBMIT_FORM_DATA } from "../../api";
import axiosInstance from "../../axiosConfig";
import ErrorModal from "../../common/ErrorModal";
import CustomNavbar from "../dashboard/navbar/CustomNavbar";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AgentType } from "./common/types";
import Swal from 'sweetalert2';

const ServiceForm = () => {
  const [formData, setFormData] = useState(null);
  const [agentList, setAgentList] = useState<AgentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  let { serviceId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`${GET_FORM_DATA}/${serviceId}`)
      .then((response) => {
        if (response.data.success === false) {
          setError(true);
          setErrorMsg(response.data.message);
        } else {
          const data = response.data.data;
          setFormData(data);

          setAgentList(data?.agent);

          const initialFormValues = {};
          const initialFileValues = {};
          data.form?.forEach((field) => {
            initialFormValues[field.label.toLowerCase()] = "";
            if (field.type === "file") {
              initialFileValues[
                `documentRequirement_${field.label.toLowerCase()}`
              ] = null;
            }
          });
          initialFormValues["agent_id"] = data.agent[0]["id"];
          initialFormValues["service_id"] = serviceId;

          data.documentRequirements?.forEach((doc, index) => {
            initialFileValues[`${doc}`] = null;
          });

          setFormValues(initialFormValues);
          setFileValues(initialFileValues);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setErrorMsg(err.message);
        setLoading(false);
      });
  }, [serviceId]);
  const [formValues, setFormValues] = useState({});
  const [fileValues, setFileValues] = useState({});

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setFileValues({ ...fileValues, [name]: e.target.files[0] });
    } else if (type === "checkbox") {
      setFormValues({ ...formValues, [name]: e.target.checked });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formValues) {
      formDataToSend.append(key, formValues[key]);
    }
    for (const key in fileValues) {
      formDataToSend.append(key, fileValues[key]);
    }
   
    axiosInstance.post(`${SUBMIT_FORM_DATA}`, formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      if(response.data.success){
        Swal.fire({
          title: 'Success!',
          text: 'Your Application has been submitted successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/dashboard');
          }
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error submitting your form. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/dashboard');
        }
      });
    });

  };
 
  useEffect(() => {
  }, [formValues, fileValues]);
  return (
    <div>
      <CustomNavbar />
      <div className="container mt-3">
        {loading && <Spinner animation="border" />}
        {error && <ErrorModal errorMessage={errorMsg} />}
        {formData && (
          <Form onSubmit={handleSubmit}>
            <h1>{formData.serviceName.toUpperCase()}</h1>
            {formData.form?.map((field, index) => {
              switch (field.type) {
                case "text":
                case "number":
                case "date":
                case "email":
                case "password":
                  return (
                    <Form.Group as={Row} className="mb-3" key={index}>
                      <Form.Label column sm="2">
                        {field.label}
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type={field.type}
                          name={field.label.toLowerCase()}
                          onChange={handleChange}
                        />
                      </Col>
                    </Form.Group>
                  );
                case "radio":
                  return (
                    <Form.Group as={Row} className="mb-3" key={index}>
                      <Form.Label as="legend" column sm="2">
                        {field.label}
                      </Form.Label>
                      <Col sm="10">
                        {field.options.map((option, idx) => (
                          <Form.Check
                            type="radio"
                            label={option}
                            name={field.label.toLowerCase()}
                            value={option}
                            id={`${field.label.toLowerCase()}_${idx}`}
                            key={idx}
                            onChange={handleChange}
                          />
                        ))}
                      </Col>
                    </Form.Group>
                  );
                case "checkbox":
                  return (
                    <Form.Group as={Row} className="mb-3" key={index}>
                      <Form.Label column sm="2">
                        {field.label}
                      </Form.Label>
                      <Col sm="10">
                        {field.options.map((option, idx) => (
                          <Form.Check
                            type="checkbox"
                            label={option}
                            name={`${field.label.toLowerCase()}_${idx}`}
                            value={option}
                            id={`${field.label.toLowerCase()}_${idx}`}
                            key={idx}
                            onChange={handleChange}
                          />
                        ))}
                      </Col>
                    </Form.Group>
                  );
                case "select":
                  return (
                    <Form.Group as={Row} className="mb-3" key={index}>
                      <Form.Label column sm="2">
                        {field.label}
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          as="select"
                          name={field.label.toLowerCase()}
                          onChange={handleChange}
                        >
                          {field.options.map((option, idx) => (
                            <option key={idx} value={option}>
                              {option}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Form.Group>
                  );
                case "textarea":
                  return (
                    <Form.Group as={Row} className="mb-3" key={index}>
                      <Form.Label column sm="2">
                        {field.label}
                      </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          as="textarea"
                          name={field.label.toLowerCase()}
                          rows={3}
                          onChange={handleChange}
                        />
                      </Col>
                    </Form.Group>
                  );
                default:
                  return null;
              }
            })}
            {formData.documentRequirements?.map((doc, index) => (
              <Form.Group as={Row} className="mb-3" key={index}>
                <Form.Label column sm="2">
                  {doc}
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="file"
                    name={`${doc}`}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Group>
            ))}
            <Form.Group
              as={Row}
              className={agentList.length < 2 ? "mb-3 d-none" : "mb-3"}
            >
              <Form.Label column sm="2">
                Select Agent
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  as="select"
                  name="agent_id"
                  onChange={handleChange}
                >
                  {agentList.map((agent, idx) => (
                    <option
                      key={agent.id}
                      value={agent.id}
                      selected={idx === 0}
                    >
                      {agent.name}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Submit</Button>
              </Col>
            </Form.Group>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ServiceForm;
