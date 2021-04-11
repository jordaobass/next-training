import React, {useCallback, useRef, useContext} from "react";
import {FiLogIn, FiMail, FiLock} from 'react-icons/fi'
import Input from '../../components/Input'
import Button from '../../components/Button'
import {Form} from '@unform/web'
import {FormHandles} from '@unform/core'
import {Container, Content, BackGround} from './style';
import logiImg from '../../assets/logo.svg';
import * as Yup from "yup";
import getValidationErrors from "../../utils/getValidationErrors";
import {AuthHook} from "../../hooks/AuthHook";
import {useToast} from "../../hooks/ToastHook";
import {Link} from 'react-router-dom'

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const {token, signIn} = useContext(AuthHook);


  const {addToast} = useToast()

  const HandleSubmit = useCallback(async (data: SignInFormData) => {
    try {

      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required("Obrigatorio").email("Digite um email valido"),
        password: Yup.string().required("Obrigatorio")
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        email: data.email,
        password: data.password,
      });

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        console.log(err)

        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      } else {
        addToast({
          type: "error",
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.'
        });
      }


    }
  }, [signIn, addToast]);

  return (
      <Container>
        <Content>
          <img src={logiImg} alt="logo"/>
          <Form ref={formRef} onSubmit={HandleSubmit}>
            <h1>Faça seu Logon</h1>
            <Input name="email" icon={FiMail} placeholder="email"/>
            <Input name="password" icon={FiLock} type="password" placeholder="senha"/>

            <Button type="submit">Entrar</Button>
          </Form>

          <Link to="signUp"><FiLogIn/> CriarConta</Link>

        </Content>
        <BackGround>

        </BackGround>
      </Container>

  );
}
export default SignIn
