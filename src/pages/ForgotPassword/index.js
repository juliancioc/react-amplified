import React, { useCallback, useRef, useState } from "react";
import { FiMail } from "react-icons/fi";
import * as Yup from "yup";
import { Form } from "@unform/web";
import { Modal, message } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { Container, ContentModal } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import getValidationErrors from "../../utils/getValidationErrors";
import {
  loginApp,
  forgotPassword,
  infoAccount,
} from "../../store/modules/login/actions";
import api from "../../services/api";

const ForgotPassword = () => {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const status = useSelector(
    (state) => state.isForgotPasswordUser
  );

  const [mail, setEmail] = useState("");

  const statusInfoAccount = useSelector(
    (state) => state.isInfoAccountUser
  );

  const handleResendEmail = useCallback(async () => {
    const webSiteUrl = window.location.origin;

    try {
      const res = await api.post("/reset-password", {
        webSiteUrl,
        Email: mail,
      });
      message.success("Enviamos um novo e-mail para redefinição de senha");
    } catch (err) {
      message.success("Enviamos um novo e-mail para redefinição de senha");
    }
  }, [mail]);

  const handleSubmit = useCallback(async (data) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        Email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      data.webSiteUrl = window.location.origin;
      const res = await api.post("/reset-password", data);

      dispatch(forgotPassword({ isForgotPassword: false }));

      dispatch(infoAccount({ isInfoAccount: true }));
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      } else {
        dispatch(forgotPassword({ isForgotPassword: false }));

        dispatch(infoAccount({ isInfoAccount: true }));
      }
    }
  }, []);

  const handleOk = () => {
    dispatch(forgotPassword({ isForgotPassword: false }));
    dispatch(loginApp({ status: false }));
  };

  const handleCancel = () => {
    dispatch(forgotPassword({ isForgotPassword: false }));
    dispatch(loginApp({ status: false }));
  };

  const handleCancelInfo = useCallback(() => {
    dispatch(infoAccount({ isInfoAccount: false }));
  }, []);

  return (
    <Container>
      <Modal
        footer={null}
        title=""
        visible={status.isForgotPassword}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ContentModal>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              icon={FiMail}
              placeholder="E-mail"
              id="Email"
              name="Email"
              type="text"
              onChange={(value) => setEmail(value.target.value)}
            />

            <Button type="submit">Recuperar senha</Button>
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
            <p>Prezado cliente, </p>
            <p>Enviamos e-mail para troca de senha.</p>
            <p>Por favor, verifique a caixa de entrada.</p>

            <Button className="btn-modal-info" onClick={handleCancelInfo}>
              OK
            </Button>

            <Button className="btn-modal-info" onClick={handleResendEmail}>
              Reenviar E-mail
            </Button>
          </ContentModal>
        </Modal>
      )}
    </Container>
  );
};

export default ForgotPassword;
