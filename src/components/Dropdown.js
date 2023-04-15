import React, { useState } from "react";

function DropdownButton() {
    const [isOpen, setIsOpen] = useState(false);
    const options = ["Option 1", "Option 2", "Option 3"];

    function toggleDropdown() {
        setIsOpen(!isOpen);
    }

    function handleOptionClick(option) {
        console.log(option);
        setIsOpen(false);
    }

    return (
        <div>
            <button onClick={toggleDropdown}>Select an option</button>
            {isOpen && (
                <ul>
                    {options.map((option) => (
                        <li key={option} onClick={() => handleOptionClick(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DropdownButton;
