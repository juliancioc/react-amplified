import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";

import api from "../../services/api";
import formatValue from "../../utils/formatValue";
import { Container } from "./styles";
import Logo from "../../assets/logo-2.svg";
import Flag from "../../assets/flag.svg";

const Header = ({ size = "large" }) => {
  const [dollarToday, setDollarToday] = useState();

  useEffect(() => {
    async function loadDollar() {
      const response = await api.get();
      const dollar = response.data[0].high;

      setDollarToday(parseFloat(dollar));
    }

    loadDollar();
  }, []);

  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />

        <div className="flag">
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
      </header>
    </Container>
  );
};

export default Header;
