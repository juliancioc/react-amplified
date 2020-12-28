import React from 'react';

import {
    Container,
    ArticleContainer
} from './styles';

const Article = () => {
    return (
        <Container>
            <ArticleContainer>
                <h1>Entenda os principais conceitos sobre Imposto de Importação</h1>
                <h2>O que é imposto de importação?</h2>
                <p>
                    O <span>imposto de importação</span> também conhecido pela sigla II é um tributo cobrado pela Receita Federal
                    para todas as mercadorias que chegam ao Brasil de origem exterior. O valor depende da forma de importação
                    mas em geral é (60%) sobre o valor aduaneiro.
                </p>

                <h2>Como calcular imposto de importação?</h2>
                <p>
                    Pegue o valor aduaneiro de sua importação e atribua o valor do imposto de importação, por exemplo:
                    Valor aduaneiro: $ 3000
                    Valor convertido: $ 3000 x R$ 5,43 (dólar do dia) = R$ 16.290
                    Imposto de importação: 60 x 16.290 = 977 agora divida esse valor por 100, fica assim 977/100 e teremos o
                    custo do <span>imposto de importação</span> que no exemplo acima é de R$ 9.774
                </p>

                <h2>Outros custos em um processo de importação</h2>
                <p>
                    Tenha em mente que além do custo de <span>imposto de importação</span> você terá outros custos como, por exemplo ICMS, IOF,
                    frete, Seguro e despachante aduaneiro. Por isso é importante que você tenha todas essas informações antes de
                    iniciar o procedimento de importação, dessa forma quando a mercadoria chegar no Brasil e você iniciar a
                    comercialização saberá exatamente o custo total e poderá calcular o valor de venda após atribuir o seu lucro.
                </p>

                <h2>Qual o próximo passo?</h2>
                <p>
                    Você fez o cálculo do <span>imposto de importação</span> e agora que você tem uma visão geral de sua importação poderá
                    decidir se faz sentido iniciar o processo, caso não seja pode negociar com o fornecedor, melhores condições
                    de frete e valor por unidade. Utilize os campos da ferramenta para inserir novos valores até obter o resultado ideal.
                    Não esqueça de verificar qual o valor comercializado da mercadoria aqui no Brasil, verifique se o custo por unidade é
                    interessante comparado com o valor de venda do produto por algumas lojas.
                </p>

                <h2>Considerações finais</h2>
                <p>
                    Criamos esse sistema para ajudar importadores a realizar o cálculo de <span>imposto de importação</span> de uma simples e objetiva.
                </p>


                <div className='links'>
                    <a target="_blank" href="http://receita.economia.gov.br/acesso-rapido/tributos/imposto-importacao">
                        mais informações sobre imposto de importação
                    </a>
                </div>

            </ArticleContainer>
        </Container>
    );
}

export default Article;