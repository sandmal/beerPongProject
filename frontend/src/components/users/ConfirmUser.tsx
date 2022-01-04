import { useMutation } from '@apollo/client';
import { USER_CONFIRM } from '../../graphql';
import { Form, Formik } from 'formik';
import { DefaultConfirmValues } from '../../types';
import { read } from '../../helpers/LocalStorage';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/Auth.context';
import { useContext } from 'react';

function ConfirmUser() {
  const [confirmUser] = useMutation(USER_CONFIRM);
  const navigate = useNavigate();
  const { token } = useParams();
  const { state, dispatch } = useContext(AuthContext);
  return (
    <div>
      <h1>Confirm user</h1>
      <p>Check your email for confirmation token</p>
      <Formik
        initialValues={DefaultConfirmValues}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const email = state.email !== '' ? state.email : read('email');
          const confirmData = await confirmUser({
            variables: { input: { email: email, confirmToken: token } },
          });
          if (confirmData.data.confirmUser !== null) {
            dispatch({ type: 'USER_CONFIRMED' });
            navigate('/user/profile');
          }
        }}>
        <Form>
          <button type='submit' className='login-button'>
            <span>Confirm</span>
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default ConfirmUser;
