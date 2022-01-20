import { useMutation } from '@apollo/client';
import { USER_REGISTER } from '../graphql';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { DefaultRegisterValues } from '../types';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [register] = useMutation(USER_REGISTER);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Name must be atleast 4 characters long').max(20, 'Name must not be more than 20 characters long').required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email required'),
    password: Yup.string()
      .min(5, 'Password must be atleast 5 characters long')
      .max(20, 'Password must not be longer than 20 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .min(5, 'Password must be atleast 5 characters long')
      .max(20, 'Password must not be longer than 20 characters')
      .required('Password is required'),
  });
  return (
    <div className='w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0'>
      <div className='w-full sm:max-w-md p-5 mx-auto'>
        <h2 className='mb-12 text-center text-5xl font-extrabold'>Register</h2>
        <Formik
          initialValues={DefaultRegisterValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            const registerData = await register({
              variables: { input: { name: values.name, email: values.email, password: values.password } },
            });

            if (registerData.data.registerUser !== null) {
              navigate('/login');
            }
          }}>
          <Form>
            <div className='mb-4'>
              <label className='block mb-1' htmlFor='name'>
                Name
              </label>
              <Field
                className='py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full'
                name='name'
                type='text'
              />
              <ErrorMessage name='name' component={'div'} />
            </div>
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
            <div className='mb-4'>
              <label className='block mb-1' htmlFor='confirmPassword'>
                Confirm Password
              </label>
              <Field
                className='py-2 px-3 border border-gray-300 focus:border-red-300 focus:outline-none focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 mt-1 block w-full'
                name='confirmPassword'
                type='password'
              />
              <ErrorMessage name='confirmPassword' component={'div'} />
            </div>
            <div className='mt-6'>
              <button
                type='submit'
                className='w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold capitalize text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 transition'>
                Register
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Register;
