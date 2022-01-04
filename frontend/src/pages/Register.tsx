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
    <div>
      <h1>Register</h1>
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
          <Field name='name' type='text' placeholder='Name' />
          <ErrorMessage name='name' component={'div'} />

          <Field name='email' type='text' placeholder='Email' />
          <ErrorMessage name='email' component={'div'} />

          <Field name='password' type='password' placeholder='Password' />
          <ErrorMessage name='password' component={'div'} />

          <Field name='confirmPassword' type='password' placeholder='Confirm Password' />
          <ErrorMessage name='confirmPassword' component={'div'} />

          <button type='submit' className='login-button'>
            <span>Register</span>
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;
