import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Input = (props) => (
  <input {...props} className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg " />
);

const validationSchema = yup.object({
  email: yup.string().required('Digite seu email').email('E-mail inválido'),
  password: yup.string().required('Digite sua senha'),
});

function Login({ signInUser, user }) {
  const navigate = useNavigate();
  useEffect(() => user && navigate('/home'), []);

  const formik = useFormik({
    onSubmit: async (values) => {
      const res = await axios.get(`http://localhost:9901/login`, {
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
  const { values, handleSubmit, handleChange, handleBlur, isSubmitting, errors, isValid } = formik;
  return (
    <>
      <div className="h-full flex flex-col justify-center items-center space-y-6">
        <h1 className="text-3xl">Login</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Input
              type="text"
              name="email"
              placeholder="Digite seu E-mail"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
            />
            {formik.touched.email && errors.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
            />
            {formik.touched.password && errors.password && (
              <div className="text-red-500 text-sm">{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? 'Enviando...' : 'Entrar'}
          </button>
        </form>
        <span className="text-sm text-silver">
          Não tem conta?{' '}
          <Link className="text-birdBlue" to="/signup">
            Inscreva-se
          </Link>
        </span>
      </div>
    </>
  );
}

export default Login;