import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs';

const Sample = () => {

    const print = () => {
        console.log(data);
        setValueIter(data.map((x) => x.iteration));
        setValueX(data.map((x) => x.X));
        return (
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="90%">X</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>{element.iteration.toFixed(6)}</td>
                                    <td>{element.X.toFixed(6)}</td>
                                </tr>)
                        })}
                    </tbody>
                </Table>
            </Container>
        );
    }

    const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    const CalOnePoint = (x0) => {
        let xnew, ea = 100;  
        let iter = 0;
        const MAX = 1000;
        const e = 0.000001;
        let obj = {};

        do {
            xnew = evaluate(Equation, {x: x0});  
            ea = error(x0, xnew);
            iter++;

            obj = {
                iteration: iter,
                X: xnew
            };
            data.push(obj);

            x0 = xnew;

           
            if (ea < e) {
                break;
            }
            
        } while (ea > e && iter < MAX);

        setX(xnew);  
    }

    const data = [];
    const [valueIter, setValueIter] = useState([]);
    const [valueX, setValueX] = useState([]);

    const [html, setHtml] = useState(null);
    const [Equation, setEquation] = useState("cos(x) - x");  
    const [X, setX] = useState(0);
    const [X0, setX0] = useState(0);

    const inputEquation = (event) => {
        console.log(event.target.value);
        setEquation(event.target.value);
    }

    const inputX0 = (event) => {
        console.log(event.target.value);
        setX0(event.target.value);
    }

    const calculateRoot = () => {
        const x0num = parseFloat(X0);
        CalOnePoint(x0num);

        setHtml(print());

        console.log(valueIter);
        console.log(valueX);
    }

    return (
        <Container>
            <h1>One-Point Iteration</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Input g(x)</Form.Label>
                    <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                    <Form.Label>Input Initial Guess X0</Form.Label>
                    <input type="text" id="X0" onChange={inputX0} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
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
