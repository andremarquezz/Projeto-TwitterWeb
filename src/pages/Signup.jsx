import { Link, useNavigate } from 'react-router-dom';
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
  name: yup.string().required('Digite seu nome'),
  username: yup.string().required('Digite um nome de usuário'),
  email: yup.string().required('Digite seu email').email('E-mail inválido'),
  password: yup.string().required('Digite sua senha'),
});

export function Signup({ signInUser }) {
  const navigate = useNavigate();
  const formik = useFormik({
    onSubmit: async (values) => {
      const res = await axios.post('http://localhost:9901/signup', {
        name: values.name,
        email: values.email,
        username: values.username,
        password: values.password,
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
    <div className="h-full flex flex-col justify-center p-12 space-y-6">
      <h1 className="text-3xl">Crie sua conta</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Input
            type="text"
            name="name"
            placeholder="Nome"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {touched.name && errors.name && (
            <div className="text-red-500 text-sm">{errors.name}</div>
          )}
        </div>

        <div className="space-y-2">
          <Input
            type="text"
            name="username"
            placeholder="Nome de usuário"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
          />
          {touched.username && errors.username && (
            <div className="text-red-500 text-sm">{errors.username}</div>
          )}
        </div>

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
          {isSubmitting ? 'Enviando...' : 'Cadastrar'}
        </button>
      </form>

      <span className="text-sm text-silver text-center">
        Já tem uma conta?{' '}
        <Link className="text-birdBlue" to="/login">
          Acesse sua conta.
        </Link>
      </span>
    </div>
  );
}
export default Signup;
