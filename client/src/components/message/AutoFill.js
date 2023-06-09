import React, { useState } from "react";

const AutoFill = () => {
    const [text, setText] = useState('');

    const handleClick = () => {
        setText('Explain quantum computing in simple terms');
    };

    const handleChange = (event) => {
        setText(event.target.value);
    };


    return (
        <div>
            <button onClick={handleClick}>Explain quantum computing in simple terms</button>
            <textarea value={text} onChange={handleChange} />
        </div>
    );
}

export default AutoFill;