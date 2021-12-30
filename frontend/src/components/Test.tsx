import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import * as Yup from 'yup';

const USERLOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input)
  }
`;

interface SigninValues {
  email: string;
  password: string;
}

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

export default function Test() {
  const [formData, setFormData] = useState({});
  const [signin, { data }] = useMutation(USERLOGIN);

  console.log(data);
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  async function handleSubmit(e: any) {
    e.preventDefault();
    await signin({
      variables: { input: formData },
    });
  }

  return (
    <div>
      <h1>Signin</h1>
      <form
        onSubmit={async (e) => {
          handleSubmit(e);
        }}
      >
        <label>
          email:
          <input type="email" placeholder="email" name="email" onChange={handleChange} />
        </label>
        <label>
          password:
          <input type="password" name="password" onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
