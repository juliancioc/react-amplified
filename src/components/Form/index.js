import React, { useState, useEffect } from 'react';
import {
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    TextField,
    InputAdornment,
    Button,
    Switch,
    FormGroup,
    FormHelperText
} from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../services/api';

import {
    Container,
    ContainerContent,
    FormCalc,
    ContainerButton,
    ContainerImpost
} from './styles'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1.5),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '45ch',
    },
    formControl: {
        margin: theme.spacing(1),
        width: '45ch',
        marginLeft: 14
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const Form = ({ callBack, clearDashboard }) => {
    const classes = useStyles();
    const [freight, setFreight] = useState('');
    const [merchandise, setMerchandise] = useState('');
    const [safe, setSafe] = useState(0);
    const [tax, setTax] = useState(60);
    const [icms, setIcms] = useState(18);
    const [iof, setIof] = useState(6.38);
    const [unity, setUnity] = useState('');

    const [errorInputFreight, setErrorInputFreight] = useState(false)

    const [methodShip, setMethodShip] = useState('');

    const [dollarToday, setDollarToday] = useState()

    useEffect(() => {
        async function loadDollar() {
            const response = await api.get();
            const dollar = response.data[0].high;

            setDollarToday(dollar)
        }

        loadDollar();
    }, []);

    const calcTotal = () => {
        const valueConvertedFreight = freight * dollarToday
        const valueConvertedMerchandise = merchandise * dollarToday
        const valueConvertedSafe = safe * dollarToday

        const totalMerchandise = unity * valueConvertedMerchandise;

        const totalImport = valueConvertedFreight + totalMerchandise + valueConvertedSafe;
        const icmsConverted = icms / 100;
        const totalTax = (tax * totalImport) / 100;
        const totalIcms = (totalImport + totalTax) / (1 - icmsConverted) * icmsConverted
        const totalIof = (iof * totalImport) / 100;

        const valueTotalTax = totalTax + totalIcms + totalIof;
        const totalGeralImport = totalImport + valueTotalTax

        callBack(totalGeralImport, valueTotalTax, unity, methodShip)
    }

    const clearData = () => {
        setFreight('');
        setMerchandise('');
        setSafe(0);
        setUnity('');
        clearDashboard();
        setMethodShip();
    }

    const handleChange = (e) => {
        setMethodShip(e.target.value)
    }

    return (
        <Container>
            <ContainerContent>
                <FormCalc>
                    <p className="title-form">Simule o custo de sua importação</p>
                    <div>
                        <FormGroup row>
                            <FormControl
                                variant="outlined"
                                className={classes.formControl}
                            >
                                <InputLabel id="demo-simple-select-outlined-label" helperText={methodShip === 'importaFacil' ? 'Até $ 3.000 por remessa' : ''}>Forma da importação</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={methodShip}
                                    onChange={handleChange}
                                    label="Forma da importação"
                                >
                                    <MenuItem value="">
                                        <em>Nenhum</em>
                                    </MenuItem>
                                    <MenuItem value={'courrier'}>Courier</MenuItem>
                                    <MenuItem value={'importaFacil'}>Importa Fácil (Correios)</MenuItem>
                                </Select>
                                <FormHelperText>
                                    {methodShip === 'importaFacil' ? 'Até $ 3.000 por remessa' : ''}
                                </FormHelperText>
                            </FormControl>

                            {methodShip === 'importaFacil' ?
                                <TextField
                                    disabled
                                    label="Desembaraço prestado pelos Correios"
                                    value='250,00'
                                    className={clsx(classes.margin, classes.textField)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                    }}
                                    variant="outlined"
                                /> : ''}

                        </FormGroup>
                        <TextField
                            error={(merchandise.indexOf(',') > -1)}
                            helperText={(merchandise.indexOf(',') > -1) ? 'Troque a vírgula por um ponto ex.: 1.99' : ''}
                            label="Valor do produto por unidade"
                            onChange={(e) => {
                                { setMerchandise(e.target.value) }
                            }
                            }
                            required
                            id="outlined-start-adornment"
                            value={merchandise}
                            className={clsx(classes.margin, classes.textField)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            variant="outlined"
                        />
                        <TextField
                            label="Quantidade"
                            required
                            onChange={(e) => { setUnity(e.target.value) }}
                            id="outlined-start-adornment"
                            value={unity}
                            className={clsx(classes.margin, classes.textField)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                            }}
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <TextField
                            label="Valor do frete"
                            error={errorInputFreight}
                            helperText={errorInputFreight ? 'Troque a vírgula por um ponto ex.: 1.99' : ''}
                            required
                            value={freight}
                            onChange={(e) => {
                                setFreight(e.target.value)
                                if (e.target.value.indexOf(',') > -1) {
                                    setErrorInputFreight(true)
                                } else {
                                    setErrorInputFreight(false)
                                }
                            }}
                            id="outlined-start-adornment"
                            className={clsx(classes.margin, classes.textField)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            variant="outlined"
                        />
                        <TextField
                            label="Valor do seguro"
                            id="outlined-start-adornment"
                            value={safe}
                            onChange={(e) => { setSafe(e.target.value) }}
                            className={clsx(classes.margin, classes.textField)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            variant="outlined"
                        />
                    </div>

                    <ContainerImpost>
                        <TextField
                            style={{ maxWidth: '29.3ch' }}
                            label="Imposto de Importação"
                            id="outlined-start-adornment"
                            required
                            value={tax}
                            onChange={(e) => { setTax(e.target.value) }}
                            className={clsx(classes.margin, classes.textField)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">%</InputAdornment>,
                            }}
                            variant="outlined"
                        />
                        <TextField
                            style={{ maxWidth: '29.3ch' }}
                            label="ICMS"
                            id="outlined-start-adornment"
                            className={clsx(classes.margin, classes.textField)}
                            value={icms}
                            required
                            onChange={(e) => { setIcms(e.target.value) }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">%</InputAdornment>,
                            }}
                            variant="outlined"
                        />

                        <TextField
                            style={{ maxWidth: '29.3ch' }}
                            required
                            label="IOF"
                            id="outlined-start-adornment"
                            value={iof}
                            onChange={(e) => { setIof(e.target.value) }}
                            className={clsx(classes.margin, classes.textField)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">%</InputAdornment>,
                            }}
                            variant="outlined"
                        />
                        <ContainerButton>
                            <Button
                                onClick={calcTotal}
                                className="button-calc"
                                color="primary"
                                variant="contained"
                                disabled={!freight || !merchandise || !unity || !tax || !icms || !iof}
                            >
                                Calcular
                            </Button>

                            <Button
                                onClick={() => { clearData() }}
                                className="button-calc"
                                color="primary"
                                variant="contained"
                                disabled={!merchandise || !unity}
                            >
                                Limpar
                            </Button>
                        </ContainerButton>
                    </ContainerImpost>
                </FormCalc>
            </ContainerContent>
        </Container>
    )
}

export default Form;