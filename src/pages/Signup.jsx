import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Input = (props) => (
  <input {...props} className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg " />
);

const validationSchema = yup.object({
  name: yup.string().required('Digite seu nome'),
  username: yup.string().required('Digite seu username'),
  email: yup.string().required('Digite seu email').email('E-mail inválido'),
  password: yup.string().required('Digite sua senha'),
});

function Signup() {
  const formik = useFormik({
    onSubmit: async (values) => {
      await axios.post(`http://localhost:9901/signup`, {
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.password,
      });
      useNavigate('/home');
    },
    initialValues: {
      email: '',
      password: '',
    },
    validateOnMount: true,
    validationSchema,
  });
  const { values, handleSubmit, handleChange, handleBlur, isSubmitting, errors, isValid, touched } =
    formik;
  return (
    <>
      <div className="h-full flex flex-col justify-center items-center space-y-6">
        <h1 className="text-3xl">Crie sua conta</h1>

        <form className="space-y-1" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <Input
              type="text"
              name="name"
              placeholder="Digite seu nome"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
            />
            {touched.name && errors.name && (
              <div className="text-red-500 text-sm">{errors.name}</div>
            )}
          </div>
          <div className="space-y-1">
            <Input
              type="text"
              name="username"
              placeholder="Digite seu usuario"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
            />
            {touched.username && errors.username && (
              <div className="text-red-500 text-sm">{errors.username}</div>
            )}
          </div>
          <div className="space-y-1">
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
          <div className="space-y-1">
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
            {isSubmitting ? 'Enviando...' : 'Criar conta'}
          </button>
          <span className="text-sm text-silver">
            Já tem conta?{' '}
            <Link className="text-birdBlue" to="/">
              Faça Login
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}

export default Signup;
