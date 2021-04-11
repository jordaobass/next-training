import React, {useCallback, useRef} from "react";
import {FiArrowLeft, FiMail, FiLock, FiUser} from 'react-icons/fi'
import Input from '../../components/Input'
import Button from '../../components/Button'
import {FormHandles} from '@unform/core'
import {Form} from '@unform/web'
import * as Yup from 'yup';
import getValidationErrors from "../../utils/getValidationErrors";

import {Link} from 'react-router-dom'

// @ts-ignore
import logiImg from '../../assets/logo.svg';

import {Container, Content, BackGround} from './style'

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  console.log(formRef)

  const HandleSubmit = useCallback(async (data: object) => {
    try {

      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required("Nome Obrigatorio"),
        email: Yup.string().required("Obrigatorio").email("Digite um email valido"),
        password: Yup.string().min(6, 'no minimo 6 caracteres obrigatorios')
      });

      await schema.validate(data, {
        abortEarly: false,
      });


    } catch (err) {
      console.log(err)

      const errors = getValidationErrors(err);

      formRef.current?.setErrors(
          errors
      );
    }
  }, []);


  return (<Container>
        <BackGround> </BackGround>
        <Content>
          <img src={logiImg} alt="logo"/>
          <Form ref={formRef} onSubmit={HandleSubmit}>
            <h1>Faça seu Cadastro</h1>
            <Input name="email" icon={FiUser} placeholder="email"/>
            <Input name="name" icon={FiMail} placeholder="nome"/>
            <Input name="password" icon={FiLock} type="password" placeholder="senha"/>

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/"><FiArrowLeft/> Voltar para logon</Link>

        </Content>


      </Container>
  )
}

export default SignUp
