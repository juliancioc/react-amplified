import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import "antd/dist/antd.css";
import { useDispatch } from "react-redux";

import api from "../../services/api";
import formatValue from "../../utils/formatValue";
import { Container } from "./styles";
import Logo from "../../assets/logo-2.svg";
import Flag from "../../assets/flag.svg";
import { loginApp, createAccount } from "../../store/modules/login/actions";

const Header = ({ size = "large" }) => {
  const [dollarToday, setDollarToday] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadDollar() {
      const response = await api.get();
      const dollar = response.data[0].high;

      setDollarToday(parseFloat(dollar));
    }

    loadDollar();
  }, []);

  const handleCreateAccount = () => {
    dispatch(createAccount({ isCreateAccount: true }));
  };

  const handleLogin = () => {
    console.log('here')
    dispatch(loginApp({ status: true }));
  };

  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />

        <div className="flag">
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleCreateAccount}>Criar conta</button>
          <div className="dolar">
            {!dollarToday ? (
              <ReactLoading
                type="spinningBubbles"
                color="#FFF"
                width={32}
                height={32}
              />
            ) : (
              <>
                <img width="32px" src={Flag} alt="Cotação Dólar" />
                <p>{formatValue(dollarToday)}</p>
              </>
            )}
          </div>
        </div>
      </header>
    </Container>
  );
};

export default Header;
