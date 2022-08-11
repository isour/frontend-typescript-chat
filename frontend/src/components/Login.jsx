import React, {useState, useContext} from "react";
import { Button, Alert, Form  } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form as FormikForm, useFormik } from "formik";
import * as Yup from "yup";

import useAuth from "../hooks/useAuth.js";

import routes from "../routes";


const loginValidation = Yup.object().shape({
    username: Yup.string().min(3, "Too short").max(40, "Please enter no more than 40 characters").required( "Please enter your first name" ),
    password: Yup.string().min(5, "Too short").max(40, "Please enter no more than 40 characters").required("Please enter a password")
});


const Login = () => {
    const navigate = useNavigate();
    const { user, logIn } = useAuth();
    
    const [authFailed, setAuthFailed] = useState(false);

    const loginSubmit = async (values, { setSubmitting, setStatus }) => {
        setStatus();
        setAuthFailed(false);
        setSubmitting(true);
        try {
            const response = await axios.post(routes.backend.loginPath(), values);
            const token = response.data.token;
            setAuthFailed(false);
            setStatus("USER_LOGINED_IN");
            setSubmitting(false);
            logIn({
                token,
                userName: values.username
            });
            navigate(routes.chatPath());
        } catch(error) {
            console.log(error);
            setAuthFailed(true);
            setStatus(error.code);
            setSubmitting(false);
        }
    };
    
    return (
        <Formik
            initialValues= {{ password: "", username: ""}}
            validationSchema={loginValidation}
            onSubmit={loginSubmit}
            >
            {(formik) => (
                <div className="card-body p-5">
                    <h1 className="text-center mb-4">Login</h1>
                    <span>{user.userName}</span>
                    <span>{user.token}</span>
                    <FormikForm>
                        <Form.Group className="mb-3" controlId="login-username">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="text" name="username" placeholder="Enter username" isInvalid={formik.errors.username} value={formik.values.username} onChange={formik.handleChange}/>
                            <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="login-password">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="password"  name="password" placeholder="Enter password" isInvalid={formik.errors.password} value={formik.values.password} onChange={formik.handleChange}/>
                            <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                        </Form.Group>
                        {authFailed && <Alert variant="danger">{formik.status}</Alert>}
                        <Button className="w-100 btn" type="submit" disabled={formik.isSubmitting}>Enter</Button>
                    </FormikForm>
                </div>
            )}
        </Formik>
    );
}

export default Login;
