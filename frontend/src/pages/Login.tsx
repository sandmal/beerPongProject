import { gql, useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/HOC/AuthProviderHOC';
import { useContext } from 'react';
import { store } from '../helpers/Auth';
const USERLOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input)
  }
`;

interface SigninValues {
  email: string;
  password: string;
}

export default function Login() {
  const [login] = useMutation(USERLOGIN);
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const initialValues: SigninValues = {
    email: '',
    password: '',
  };
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email required'),
    password: Yup.string()
      .max(20, 'Password must be at least 20 characters')
      .required('Password is required'),
  });

  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const test = await login({
            variables: { input: { email: values.email, password: values.password } },
          });
          if (test.data.login !== null) {
            context.setAuth({ ...context.auth, isLoggedIn: true });
            store('isLoggedIn', true);
            navigate('/user');
          }
          setSubmitting(false);
        }}
      >
        <Form>
          <Field name="email" type="text" placeholder="Email" />
          <ErrorMessage name="email" component={'div'} />

          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component={'div'} />

          <button type="submit" className="login-button">
            <span>Login</span>
          </button>
        </Form>
      </Formik>
    </div>
  );
}
