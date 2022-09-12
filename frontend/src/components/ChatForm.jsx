import * as Yup from "yup";
import { Button, Alert, Form  } from "react-bootstrap";
import { Formik, Form as FormikForm, useFormik } from "formik";
import {useSelector, useDispatch} from 'react-redux';

import useApi from "../hooks/useApi.js";
import useAuth from "../hooks/useAuth.js";

const messageValidation = Yup.object().shape({
    message: Yup.string().min(3, "Too short").max(40, "Please enter no more than 40 characters").required( "Please enter your message" ),
});

const ChatForm = ({ className, children }) => {
    const api = useApi();
    const { user } = useAuth();
    const { currentRoomId } = useSelector((state) => state.roomsInfo);
    
    const messageSubmit = (values, { setStatus, setSubmitting }) => {
        setStatus();
        setSubmitting(true);
        const message = {
            message: values.message,
            roomId: currentRoomId,
            username: user.userName
        };
        console.log(message, currentRoomId, '!!!!!!!!');
        api.sendMessage(
            message,
            () => {
                setSubmitting(false);
            },
            () => {
                console.log('error');
                setStatus('error.code');
                setSubmitting(false);
            },
        );
        values.message = '';
    };
    
    return (
        <Formik
            initialValues= {{ message: ""}}
            validationSchema={messageValidation}
            onSubmit={messageSubmit}
            >
            {(formik) => (
                <FormikForm
                    className = {`chat-form ${className} border`}
                    >
                    <Form.Group className="input-group">
                        <Form.Control type="text" name="message" placeholder="Enter message" isInvalid={formik.errors.message} value={formik.values.message} onChange={formik.handleChange} className="border-0 p-0 ps-2 form-control"/>
                        <Button className="btn btn-group-vertical" type="submit" disabled={formik.isSubmitting}>Send</Button>
                        <Form.Control.Feedback type="invalid">{formik.errors.message}</Form.Control.Feedback>
                    </Form.Group>
                </FormikForm>
            )}
        </Formik>
    );
}

export default ChatForm;
