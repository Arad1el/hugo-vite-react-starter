import { useState } from 'react';
import '../scss/incrementer.scss';

const Incrementor = () => {
  const [counter, setCounter] = useState(0);
    const handleButtonClick = () => {
        setCounter((prev) => prev + 1);
    }
    return (
        <div className="react-page">
            <div>
                The button has been clicked <span className="counter">{counter}</span> times!
            </div>
            <button onClick={handleButtonClick}>Click me!</button>
        </div>
    )
}

export default Incrementor;
