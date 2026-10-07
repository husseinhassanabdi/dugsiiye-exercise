import { useState } from "react";

const ToggleButton = () => {
    const[isOn, setIson] = useState(false);

    const toggle = () => setIson(!isOn);

    return (
        <div>
            <p>The button is {isOn ? 'ON' : 'OFF'}</p>
             <button onClick={toggle}>{isOn ? 'Turn OF' : 'Turn On'}</button>
        </div>

    );

};


export default ToggleButton;