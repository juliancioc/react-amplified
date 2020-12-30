import React, { useState } from "react";
import { useSelector } from "react-redux";

import totalImport from "../../assets/total-import.svg";
import totalTax from "../../assets/total-tax.svg";
import costUnity from "../../assets/cost-unity.svg";
import Header from "../../components/Header";
import Form from "../../components/Form";
import { createAccount } from "../../store/modules/login/actions";
import formatValue from "../../utils/formatValue";
import SignUp from "../../pages/SignUp";
import { Container, CardContainer, Card, TableContainer } from "./styles";
import SignIn from "../SignIn";

const Dashboard = () => {
  const [totalValueImport, setTotalValueImport] = useState("");
  const [totalValueTax, setTotalValueTax] = useState("");
  const [unity, setUnity] = useState("");
  const status = useSelector((state) => state.login);

  const callBack = (valueImport, valueTax, amountUnity, methodShip) => {
    if (methodShip === "importaFacil") {
      setTotalValueImport(valueImport + 250);
    } else {
      setTotalValueImport(valueImport);
    }
    setTotalValueTax(valueTax);
    setUnity(amountUnity);
  };

  const clearDashboard = () => {
    setTotalValueImport("");
    setTotalValueTax("");
    setUnity("");
  };

  return (
    <>
      <Header />
      <Container>
        {status.status && <SignIn />}
        {createAccount && <SignUp />}
        <CardContainer>
          <Card className="card">
            <header>
              <p>Total da importação</p>
              <img width="32" src={totalImport} alt="Total da Importação" />
            </header>
            <h1>
              {totalValueImport ? formatValue(totalValueImport) : "R$ 0,00"}
            </h1>
          </Card>
          <Card className="card">
            <header>
              <p>Total de impostos</p>
              <img width="32" src={totalTax} alt="Total de Impostos" />
            </header>
            <h1>{totalValueTax ? formatValue(totalValueTax) : "R$ 0,00"}</h1>
          </Card>
          <Card total className="card">
            <header>
              <p>Custo por unidade</p>
              <img width="32" src={costUnity} alt="Custo por unidade" />
            </header>
            <h1>
              {totalValueImport
                ? formatValue(totalValueImport / unity)
                : "R$ 0,00"}
            </h1>
          </Card>
        </CardContainer>
      </Container>
      <Form callBack={callBack} clearDashboard={clearDashboard} />
    </>
  );
};

export default Dashboard;
