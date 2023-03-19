import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import './UserRegistrationForm.css';


const UserRegistrationForm = () => {
  const initialValues = {
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarSenha: '',
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('O campo Nome é obrigatório'),
    email: Yup.string()
      .email('E-mail inválido')
      .required('O campo E-mail é obrigatório'),
    telefone: Yup.string()
      .min(14, 'Telefone inválido')
      .required('O campo Telefone é obrigatório'),
    senha: Yup.string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .required('O campo Senha é obrigatório'),
    confirmarSenha: Yup.string()
      .oneOf([Yup.ref('senha'), null], 'As senhas não coincidem')
      .required('O campo Confirmar Senha é obrigatório'),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      resetForm();
      setSubmitting(false);
    }, 400);
  };

  return (
    <div>
      <h1>Cadastro de Usuário</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div>
              <label htmlFor="nome">Nome</label>
              <Field type="text" name="nome" />
              <ErrorMessage name="nome" component="div" />
            </div>
            <div>
              <label htmlFor="email">E-mail</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label htmlFor="telefone">Telefone</label>
              <Field name="telefone">
                {({ field }) => (
                  <InputMask
                    {...field}
                    mask="(99) 99999-9999"
                    onChange={(e) => {
                      setFieldValue('telefone', e.target.value);
                    }}
                  />
                )}
              </Field>
              <ErrorMessage name="telefone" component="div" />
            </div>
            <div>
              <label htmlFor="senha">Senha</label>
              <Field type="password" name="senha" />
              <ErrorMessage name="senha" component="div" />
            </div>
            <div>
              <label htmlFor="confirmarSenha">Confirmar Senha</label>
              <Field type="password" name="confirmarSenha" />
              <ErrorMessage name="confirmarSenha" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Cadastrar'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserRegistrationForm;
