import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const Input = (props) => (
  <input {...props} className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg " />
);

const validationSchema = yup.object({
  email: yup.string().required('Digite seu email').email('E-mail inválido'),
  password: yup.string().required('Digite sua senha'),
});

function Login() {
  const formik = useFormik({
    onSubmit: () => {},
    validationSchema,
    validateOnMount: true,
    initialValues: {
      email: '',
      password: '',
    },
  });

  return (
    <>
      <div className="h-full flex flex-col justify-center items-center space-y-6">
        <h1 className="text-3xl">Login</h1>

        <form className="space-y-6">
          <div className="space-y-2">
            <Input
              type="text"
              name="email"
              placeholder="Digite seu E-mail"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}
          </div>

          <button
            type="button"
            className="w-full bg-birdBlue px-5 py-2 rounded-full disabled:opacity-50"
            disabled={!formik.isValid}
          >
            Entrar
          </button>
        </form>
        <span className="text-sm text-silver">
          Não tem conta?{' '}
          <a className="text-birdBlue" to="#">
            Inscreva-se
          </a>
        </span>
      </div>
    </>
  );
}

export default Login;
