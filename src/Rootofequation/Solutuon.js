import { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";

const Sample = () => {

    const print = () => {
        console.log(data);
        return (
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Step</th>
                            {matrix[0].map((_, colIndex) => (
                                <th key={colIndex}>x{colIndex + 1}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                {row.map((value, idx) => (
                                    <td key={idx}>{value.toFixed(6)}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        );
    };

    const GaussianElimination = (mat, vec) => {
        const n = mat.length;
        const augmentedMatrix = mat.map((row, i) => [...row, vec[i]]);
        const steps = [];

        // Forward Elimination
        for (let i = 0; i < n; i++) {
            for (let k = i + 1; k < n; k++) {
                const factor = augmentedMatrix[k][i] / augmentedMatrix[i][i];
                for (let j = i; j <= n; j++) {
                    augmentedMatrix[k][j] -= factor * augmentedMatrix[i][j];
                }
            }
            // Store each step
            steps.push(augmentedMatrix.map(row => [...row]));
        }

        // Back Substitution
        const result = Array(n).fill(0);
        for (let i = n - 1; i >= 0; i--) {
            result[i] = augmentedMatrix[i][n] / augmentedMatrix[i][i];
            for (let k = i - 1; k >= 0; k--) {
                augmentedMatrix[k][n] -= augmentedMatrix[k][i] * result[i];
            }
            steps.push(result.slice());  // Store current solution vector
        }

        setX(result);
        setData(steps);
    };

    const [matrix, setMatrix] = useState([
        [2, 1, -1],
        [-3, -1, 2],
        [-2, 1, 2],
    ]);
    const [vector, setVector] = useState([8, -11, -3]);
    const [X, setX] = useState([]);
    const [data, setData] = useState([]);
    const [html, setHtml] = useState(null);

    const inputMatrix = (event, row, col) => {
        const newMatrix = [...matrix];
        newMatrix[row][col] = parseFloat(event.target.value);
        setMatrix(newMatrix);
    };

    const inputVector = (event, row) => {
        const newVector = [...vector];
        newVector[row] = parseFloat(event.target.value);
        setVector(newVector);
    };

    const calculateSolution = () => {
        GaussianElimination(matrix, vector);
        setHtml(print());
    };

    return (
        <Container>
            <h1>Solution of Linear Equations</h1>
            <Form>
                <Form.Group className="mb-3">
                    {matrix.map((row, rowIndex) => (
                        <div key={rowIndex}>
                            {row.map((_, colIndex) => (
                                <input
                                    key={`${rowIndex}-${colIndex}`}
                                    type="number"
                                    value={matrix[rowIndex][colIndex]}
                                    onChange={(e) => inputMatrix(e, rowIndex, colIndex)}
                                    style={{ width: "60px", margin: "5px" }}
                                />
                            ))}
                            <span>=</span>
                            <input
                                type="number"
                                value={vector[rowIndex]}
                                onChange={(e) => inputVector(e, rowIndex)}
                                style={{ width: "60px", margin: "5px" }}
                            />
                        </div>
                    ))}
                </Form.Group>
                <Button variant="dark" onClick={calculateSolution}>
                    Calculate
                </Button>
            </Form>
            <br />
            <h5>Solution = [{X.map(x => x.toFixed(6)).join(", ")}]</h5>
            <Container>{html}</Container>
        </Container>
    );
};

export default Sample;
