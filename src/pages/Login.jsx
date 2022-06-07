import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const Input = (props) => (
  <input
    {...props}
    className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none focus:border-platinum"
  />
);

const validationSchema = yup.object({
  email: yup.string().required('Digite seu email').email('E-mail inválido'),
  password: yup.string().required('Digite sua senha'),
});

export function Login({ signInUser, user }) {
  const navigate = useNavigate();
  useEffect(() => user && navigate('/home'), []);
  const formik = useFormik({
    onSubmit: async (values) => {
      const res = await axios.get(`${import.meta.env.VITE_API_HOST}/login`, {
        auth: {
          username: values.email,
          password: values.password,
        },
      });
      signInUser(res.data);
      navigate('/home');
    },
    initialValues: {
      email: '',
      password: '',
    },
    validateOnMount: true,
    validationSchema,
  });

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    isSubmitting,
    touched,
    errors,
    isValid,
  } = formik;

  return (
    <div className="h-full flex justify-center">
      <div className="bg-birdBlue lg:flex-1"></div>
      <div className="flex-1 flex justify-center items-center p-12 space-y-6">
        <div className="max-w-md flex-1">
          <h1 className="text-3xl">Acesse sua conta</h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Input
                type="text"
                name="email"
                placeholder="E-mail"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
              {touched.email && errors.email && (
                <div className="text-red-500 text-sm">{errors.email}</div>
              )}
            </div>

            <div className="space-y-2">
              <Input
                type="password"
                name="password"
                placeholder="Senha"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
              />
              {touched.password && errors.password && (
                <div className="text-red-500 text-sm">{errors.password}</div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-birdBlue py-4 rounded-full disabled:opacity-50 text-lg"
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? 'Enviando...' : 'Entrar'}
            </button>
          </form>

          <span className="text-sm text-silver text-center">
            Não tem conta?{' '}
            <Link className="text-birdBlue" to="/signup">
              Inscreva-se
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
