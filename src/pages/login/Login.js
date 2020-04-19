import React from 'react';

import {ErrorMessage, Formik, Form, Field} from 'formik';
import * as yup from 'yup';
import './login.css';

const Login = () => {
    const handleSubmit = values => console.log(values)
    const validations = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).required()
    })

    return (
        <>
        <div>
        <h1>Test</h1>
        <h2>Este é um test</h2>

        <Formik initialValues={{}} onSubmit={handleSubmit} validationSchema={validations}>
            <Form className="Login">
                <div className="Login-Group">
                    <Field
                        name="email"
                        className="Login-Field"
                    />

                    <ErrorMessage 
                        component="span" 
                        name="email" 
                        className="Login-Error">
                    </ErrorMessage>

                </div>

                <div className="Login-Group">
                    <Field
                        name="password"
                        className="Login-Field"
                    />

                    <ErrorMessage 
                        component="span" 
                        name="password" 
                        className="Login-Error">
                    </ErrorMessage>

                </div>


                <button className="Login-Btn" type="submit">Login</button>
            </Form>
        </Formik>

        </div>
        </>
    )
}

export default Login;