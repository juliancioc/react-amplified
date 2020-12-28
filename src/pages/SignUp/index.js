import React, { useCallback, useRef, useEffect, useState, FC } from "react";
import { FiMail, FiLock, FiUserCheck, FiUser } from "react-icons/fi";
import * as Yup from "yup";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { useHistory } from "react-router-dom";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";

import api from "../../services/api";
import { ContentModal } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import getValidationErrors from "../../utils/getValidationErrors";
import { useToast } from "../../hooks/toast";
import { createAccount, infoAccount } from "../../store/modules/login/actions";


window.dataLayer = window.dataLayer || [];

const SignUp = () => {
  const formRef = useRef(null);
  const { addToast } = useToast();
  const dispatch = useDispatch();
  const status = useSelector(
    (state) => state.isCreateAccountUser
  );
  console.log(status)
  const statusInfoAccount = useSelector(
    (state) => state.isInfoAccountUser
  );
  const history = useHistory();

  const handleSubmitSignUp = useCallback(
    async (data) => {
      window.dataLayer.push({ event: "signup", btn_label: "Criar conta" });
      window.dataLayer.push({
        event: "create_account_second",
        btn_label: "Criar conta",
      });

      data.email = data.email.toLowerCase();

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          fullname: Yup.string().required("Nome obrigatório"),
          cpfCnpj: Yup.string()
            .max(11, "Máximo 11 digitos")
            .min(11, "CPF incompleto")
            // .matches(/^\d{3}.\d{3}.\d{3}-\d{2}$/, "Utilize ponto e traço")
            .required("CPF obrigatório"),
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Digite um e-mail válido"),
          password: Yup.string().matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            "Sua senha deve conter mais de 8 dígitos, números, letras minúsculas, letras maiúsculas e caracteres especiais"
          ),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref("password"), undefined],
            "Confirmação incorreta"
          ),
        });

        delete data.passwordConfirmation;

        await schema.validate(data, {
          abortEarly: false,
        });

        data.webSiteUrl = window.location.origin;
        const res = await api.post("/signup", data);

        window.dataLayer.push({ event: "signup_success" });

        dispatch(createAccount({ isCreateAccount: false }));
        dispatch(infoAccount({ isInfoAccount: true }));
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          window.dataLayer.push({
            event: "signup_badEntry",
            errorField: errors,
          });
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: "error",
          title: "Erro na criação de usuário",
          description: "Verifique as informações inseridas",
        });
      }
    },
    [history]
  );

  const handleOk = (e) => {
    dispatch(createAccount({ isCreateAccount: false }));
  };

  const handleCancel = (e) => {
    dispatch(createAccount({ isCreateAccount: false }));
  };

  const handleCancelInfo = useCallback(() => {
    dispatch(infoAccount({ isInfoAccount: false }));
  }, []);

  return (
    <>
      <Modal
        footer={null}
        title=""
        visible={status.isCreateAccount}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Entrar"
        style={{ top: 5 }}
      >
        <ContentModal>
          <img width="250" src="" alt="" />
          <Form ref={formRef} onSubmit={handleSubmitSignUp}>
            <Input
              icon={FiUser}
              placeholder="Nome completo"
              id="fullname"
              name="fullname"
              type="text"
            />
            <Input
              icon={FiUserCheck}
              placeholder="CPF"
              id="cpfCnpj"
              name="cpfCnpj"
              type="number"
            />
            <Input
              icon={FiMail}
              placeholder="E-mail"
              id="email"
              name="email"
              type="email"
            />
            <Input
              icon={FiLock}
              placeholder="Senha"
              id="password"
              name="password"
              type="password"
            />
            <Input
              icon={FiLock}
              placeholder="Confirmar senha"
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
            />

            <Button type="submit">Criar conta</Button>
          </Form>
        </ContentModal>
      </Modal>

      {infoAccount && (
        <Modal
          footer={null}
          title=""
          visible={statusInfoAccount.isInfoAccount}
          onCancel={handleCancelInfo}
        >
          <ContentModal>
            <img width="250" src="" alt="" />

            <p>Prezado cliente, </p>
            <p>Enviamos e-mail para ativação da conta.</p>
            <p>Por favor, verifique a caixa de entrada.</p>

            <Button className="btn-modal-info" onClick={handleCancelInfo}>
              OK
            </Button>
          </ContentModal>
        </Modal>
      )}
    </>
  );
};

export default SignUp;
