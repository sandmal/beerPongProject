import { useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { USER_LOGIN } from '../graphql';
import { DefaultSignValues } from '../types';
import { useContext } from 'react';
import { AuthContext } from '../context/Auth.context';
import jwt from 'jwt-decode';

export default function Login() {
  const [login] = useMutation(USER_LOGIN);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email required'),
    password: Yup.string().max(20, 'Password must be at least 20 characters').required('Password is required'),
  });

  const { dispatch } = useContext(AuthContext);
  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={DefaultSignValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const loginData = await login({
            variables: { input: { email: values.email, password: values.password } },
          });
          let decodedToken: any = jwt(loginData.data.login);
          if (loginData.data.login !== null) {
            const email = decodedToken.email;
            const isRegistered = decodedToken.active;
            dispatch({ type: 'USER_LOGIN', payload: { email: email, isRegistered: isRegistered } });
            navigate('/user');
          }
          setSubmitting(false);
        }}>
        <Form>
          <Field name='email' type='text' placeholder='Email' />
          <ErrorMessage name='email' component={'div'} />

          <Field name='password' type='password' placeholder='Password' />
          <ErrorMessage name='password' component={'div'} />

          <button type='submit' className='login-button'>
            <span>Login</span>
          </button>
        </Form>
      </Formik>
    </div>
  );
}
