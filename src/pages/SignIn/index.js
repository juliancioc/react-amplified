import React, { useCallback, useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { Form } from "@unform/web";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { ContentModal, Container } from "./styles";
import Input from "../../components/Input";
import getValidationErrors from "../../utils/getValidationErrors";

import SignUp from "../SignUp";
import { useAuth } from "../../hooks/auth";
import { useToast } from "../../hooks/toast";
import {
  loginApp,
  createAccount,
  forgotPassword,
  infoUserInactive,
  infoAccount,
} from "../../store/modules/login/actions";
import ForgotPassword from "../ForgotPassword";
import Button from "../../components/Button";
import api from "../../services/api";


const SignIn = () => {
  const formRef = useRef(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.login);
  const statusUserActive = useSelector(
    (state) => state.isInfoActiveUser
  );
  const statusInfoAccount = useSelector(
    (state) => state.isInfoAccountUser
  );
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isActiveUser, setIsActiveUser] = useState(true);
  const [emailOrCpf, setEmailOrCpf] = useState("");

  useEffect(() => {
    if (statusUserActive.isActiveUser != undefined) {
      setIsActiveUser(statusUserActive.isActiveUser);
    }
  }, [statusUserActive]);

  const handleOk = () => {
    dispatch(loginApp({ status: false }));
  };

  const handleCancel = () => {
    setIsCreateAccount(false);
    dispatch(loginApp({ status: false }));
  };

  const handleSubmitLogin = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          login: Yup.string().required("E-mail/CPF obrigatório"),
          password: Yup.string().required("Senha obrigatória"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          login: data.login,
          password: data.password,
        });

        dispatch(loginApp({ status: false }));
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          window.dataLayer.push({
            event: "login_error",
            error_text: err.response.data.title,
          });
        }

        addToast({
          type: "error",
          title: "Erro na autenticação",
          description: "Verifique as informações inseridas",
        });
      }
    },
    [signIn, addToast, dispatch]
  );

  const openModalCreateAccount = () => {
    window.dataLayer.push({ event: "create_account_first", btn_label: "Criar conta" });

    dispatch(loginApp({ status: false }));
    dispatch(createAccount({ isCreateAccount: true }));

    setIsCreateAccount(true);
  };

  const forgotPasswordModal = () => {
    setIsForgotPassword(true);
    dispatch(loginApp({ status: false }));
    dispatch(forgotPassword({ isForgotPassword: true }));
  };

  const handleResendLink = useCallback(async () => {
    try {
      await api
        .put("/signup/re-confirm-email", {
          cpfCnpj: emailOrCpf.length < 12 ? emailOrCpf : "",
          email: emailOrCpf.length > 12 ? emailOrCpf : "",
          webSiteUrl: window.location.origin,
        })
        .then((res) => {
          dispatch(infoUserInactive({ isActiveUser: true }));
          dispatch(infoAccount({ isInfoAccount: true }));
        });
    } catch (err) {
      console.log(err);
    }
  }, [emailOrCpf]);

  const handleCancelInfo = () => {
    dispatch(infoAccount({ isInfoAccount: false }));
  };

  const handleCancelResendEmail = () => {
    dispatch(infoUserInactive({ isActiveUser: true }));
  };

  return (
    <Container>
      <Modal
        footer={null}
        title=""
        visible={status.status}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ContentModal>
          <Form ref={formRef} onSubmit={handleSubmitLogin}>
            <Input
              placeholder="E-mail/CPF"
              id="login"
              name="login"
              type="text"
              onChange={(value) => setEmailOrCpf(value.target.value)}
            />

            <Input
              placeholder="Senha"
              id="password"
              name="password"
              type="password"
            />

            <button type="submit">Entrar</button>

            <a onClick={forgotPasswordModal}>Esqueci minha senha</a>
            <p>É novo aqui?</p>
          </Form>
          <button
            onClick={openModalCreateAccount}
            className="btn-create-account"
          >
            Criar conta
          </button>
        </ContentModal>
      </Modal>
      {isCreateAccount && <SignUp />}
      {isForgotPassword && <ForgotPassword />}

      {!isActiveUser && (
        <Modal
          footer={null}
          title=""
          visible={!isActiveUser}
          onCancel={handleCancelResendEmail}
        >
          <ContentModal>
            <div className="text-modal">
              <p>Conta não ativada, </p>
              <p>
                Por favor, verifique e-mail enviado, incluindo lixo eletrônico e
                siga as instruções para ativação.
              </p>
              <p>Caso queira receber novo e-mail, clique no botão abaixo.</p>
            </div>
            <Button onClick={handleResendLink} className="btn-modal-info">
              Reenviar e-mail de ativação
            </Button>
          </ContentModal>
        </Modal>
      )}
      {infoAccount && (
        <Modal
          footer={null}
          title=""
          visible={statusInfoAccount.isInfoAccount}
          onCancel={handleCancelInfo}
        >
          <ContentModal>
            <p>Prezado cliente, </p>
            <p>Enviamos e-mail para ativação da conta.</p>
            <p>Por favor, verifique a caixa de entrada.</p>

            <Button className="btn-modal-info" onClick={handleCancelInfo}>
              OK
            </Button>
          </ContentModal>
        </Modal>
      )}
    </Container>
  );
};

export default SignIn;
