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
    <div className='w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0'>
      <div className='w-full sm:max-w-md p-5 mx-auto'>
        <h2 className='mb-12 text-center text-5xl font-extrabold'>Login</h2>
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
            <div className='mb-4'>
              <label className='block mb-1' htmlFor='email'>
                Email-Address
              </label>
              <Field
                className='py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full'
                name='email'
                type='text'
              />
              <ErrorMessage name='email' component={'div'} />
            </div>
            <div className='mb-4'>
              <label className='block mb-1' htmlFor='password'>
                Password
              </label>
              <Field
                className='py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full'
                name='password'
                type='password'
              />
              <ErrorMessage name='password' component={'div'} />
            </div>
            <div className='mt-6'>
              <button
                type='submit'
                className='w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition'>
                Login
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
