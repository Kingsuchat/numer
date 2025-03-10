import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { derivative, evaluate } from "mathjs";

const Sample = () => {
    const print = () => {
        console.log(data);
        return (
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">X</th>
                            <th width="30%">f(X)</th>
                            <th width="30%">Error</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>{element.iteration}</td>
                                    <td>{element.X.toFixed(6)}</td>
                                    <td>{element.fX.toFixed(6)}</td>
                                    <td>{element.error.toFixed(6)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Container>
        );
    };

    const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    const CalNewtonRaphson = (x0) => {
        let x1, fX, fXPrime, ea;
        let iter = 0;
        const MAX = 50;
        const e = 0.00001;
        const obj = {};
        
        do {
            let scope = { x: x0 };
            fX = evaluate(Equation, scope);
            fXPrime = evaluate(derivative(Equation, "x").toString(), scope);

            x1 = x0 - fX / fXPrime;  // Newton-Raphson formula
            ea = error(x0, x1);

            iter++;
            obj.iteration = iter;
            obj.X = x1;
            obj.fX = fX;
            obj.error = ea;

            data.push({ ...obj });
            x0 = x1;
        } while (ea > e && iter < MAX);

        setX(x1);
    };

    const data = [];
    const [Equation, setEquation] = useState("(x^4)-13");
    const [X, setX] = useState(0);
    const [initialX, setInitialX] = useState(0);
    const [html, setHtml] = useState(null);

    const inputEquation = (event) => {
        console.log(event.target.value);
        setEquation(event.target.value);
    };

    const inputInitialX = (event) => {
        console.log(event.target.value);
        setInitialX(parseFloat(event.target.value));
    };

    const calculateRoot = () => {
        CalNewtonRaphson(initialX);
        setHtml(print());
    };

    return (
        <Container>
            <h1>Newton-Raphson</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                    <input
                        type="text"
                        id="equation"
                        value={Equation}
                        onChange={inputEquation}
                        style={{ width: "20%", margin: "0 auto" }}
                        className="form-control"
                    />
                    <Form.Label>Input Initial Guess (X0)</Form.Label>
                    <input
                        type="number"
                        id="initialX"
                        onChange={inputInitialX}
                        style={{ width: "20%", margin: "0 auto" }}
                        className="form-control"
                    />
                </Form.Group>
                <Button variant="dark" onClick={calculateRoot}>
                    Calculate
                </Button>
            </Form>
            <br />
            <h5>Answer = {X.toPrecision(7)}</h5>
            <Container>{html}</Container>
        </Container>
    );
};

export default Sample;
