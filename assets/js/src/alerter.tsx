import { useState } from 'react';
import '../scss/alerter.scss';

const Alerter = () => {
  const [counter, setCounter] = useState(0);
    const handleButtonClick = () => {
        setCounter((prev) => prev + 1);
        alert(`You've clicked me ${counter} times!`);
    }
    return (
        <div className="react-page">
            <button onClick={handleButtonClick}>Click me!</button>
        </div>
    )
}

export default Alerter;
