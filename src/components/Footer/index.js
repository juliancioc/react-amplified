import React from 'react';

import {
    Container,
    FooterContainer
} from './styles';

const Footer = () => {

    return (
        <Container>
            <FooterContainer>
                <p>1. O valor do dólar é obtido diretamente do site do Banco Central do Brasil sempre do dia anterior.</p>
                <p>2. O resultado do cálculo é apenas uma estimativa e seu valor pode variar de acordo com o cenário de sua importação.</p>
                <p>3. Não nos responsabilizamos por qualquer divergência de valores cobrados na sua importação.</p>
            </FooterContainer>
        </Container>
    );
}

export default Footer;