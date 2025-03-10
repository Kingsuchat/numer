import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs';

const Sample = () => {

    const print = () => {
        console.log(data);
        setValueIter(data.map((x) => x.iteration));
        setValueXl(data.map((x) => x.Xl));
        setValueXm(data.map((x) => x.Xm));
        setValueXr(data.map((x) => x.Xr));
        return (
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">XL</th>
                            <th width="30%">XM</th>
                            <th width="30%">XR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>{element.iteration.toFixed(6)}</td>
                                    <td>{element.Xl.toFixed(6)}</td>
                                    <td>{element.Xm.toFixed(6)}</td>
                                    <td>{element.Xr.toFixed(6)}</td>
                                </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
        );
    }

    const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    const CalFalsePosition = (xl, xr) => {
        let xm, fXm, fXr, fXl, ea = 100;  
        let iter = 0;
        const MAX = 100;
        const e = 0.000001;
        let obj = {};

        do {
            xm = xr - (evaluate(Equation, {x: xr}) * (xl - xr)) / (evaluate(Equation, {x: xl}) - evaluate(Equation, {x: xr}));
            fXr = evaluate(Equation, {x: xr});
            fXm = evaluate(Equation, {x: xm});
            fXl = evaluate(Equation, {x: xl});
            
            iter++;

            if (fXm * fXr > 0) {
                ea = error(xr, xm);
                obj = {
                    iteration: iter,
                    Xl: xl,
                    Xm: xm,
                    Xr: xr
                };
                data.push(obj);
                xr = xm;
            } else if (fXm * fXl > 0) {
                ea = error(xl, xm);
                obj = {
                    iteration: iter,
                    Xl: xl,
                    Xm: xm,
                    Xr: xr
                };
                data.push(obj);
                xl = xm;
            }

            // If the error is smaller than the tolerance, break out of the loop
            // if (ea < e) {
            //     break;
            // }
            
        } while (ea > e && iter < MAX);

        setX(xm);  // Set the final result
    }

    const data = [];
    const [valueIter, setValueIter] = useState([]);
    const [valueXl, setValueXl] = useState([]);
    const [valueXm, setValueXm] = useState([]);
    const [valueXr, setValueXr] = useState([]);

    const [html, setHtml] = useState(null);
    const [Equation, setEquation] = useState("(x^4)-13");  // Example equation
    const [X, setX] = useState(0);
    const [XL, setXL] = useState(0);
    const [XR, setXR] = useState(0);

    const inputEquation = (event) => {
        console.log(event.target.value);
        setEquation(event.target.value);
    }

    const inputXL = (event) => {
        console.log(event.target.value);
        setXL(event.target.value);
    }

    const inputXR = (event) => {
        console.log(event.target.value);
        setXR(event.target.value);
    }

    const calculateRoot = () => {
        const xlnum = parseFloat(XL);
        const xrnum = parseFloat(XR);
        CalFalsePosition(xlnum, xrnum);

        setHtml(print());

        console.log(valueIter);
        console.log(valueXl);
    }

    return (
        <Container>
            <h1>False Position</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                    <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                    <Form.Label>Input XL</Form.Label>
                    <input type="text" id="XL" onChange={inputXL} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                    <Form.Label>Input XR</Form.Label>
                    <input type="text" id="XR" onChange={inputXR} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                </Form.Group>
                <Button variant="dark" onClick={calculateRoot}>
                    Calculate
                </Button>
            </Form>
            <br />
            <h5>Answer = {X.toPrecision(7)}</h5>
            <Container>
                {html}
            </Container>
        </Container>
    );
}

export default Sample;
