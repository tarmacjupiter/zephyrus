import React, { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function DropdownButton() {
    const [selectedOption, setSelectedOption] = useState(null);
    const options = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        { value: "Neutral", label: "Neutral" },
    ];

    function handleOptionSelect(option) {
        setSelectedOption(option);
    }

    return (
        <div>
            <Dropdown
                options={options}
                onChange={handleOptionSelect}
                value={selectedOption}
                placeholder="Gender"
            />
            {selectedOption && (
                <div>
                    {selectedOption.value === "masculine" ||
                    selectedOption.value === "feminine" ||
                    selectedOption.value === "neutral" ? (
                        <div>
                            <div>Style</div>
                            {selectedOption.label}
                        </div>
                    ) : (
                        selectedOption.label
                    )}
                </div>
            )}
            <Dropdown
                options={options}
                onChange={handleOptionSelect}
                value={selectedOption}
                placeholder="Occasion"
            />
            {selectedOption && (
                <div>
                    {selectedOption.value === "Casual" ||
                    selectedOption.value === "Formal" ||
                    selectedOption.value === "Business" ? (
                        <div>
                            <div>Style</div>
                            {selectedOption.label}
                        </div>
                    ) : (
                        selectedOption.label
                    )}
                </div>
            )}
            <Dropdown
                options={options}
                onChange={handleOptionSelect}
                value={selectedOption}
                placeholder="Style"
            />
            {selectedOption && (
                <div>
                    {selectedOption.value === "Minimalist" ||
                    selectedOption.value === "Athletic" ||
                    selectedOption.value === "Street ware" ? (
                        <div>
                            <div>Style</div>
                            {selectedOption.label}
                        </div>
                    ) : (
                        selectedOption.label
                    )}
                </div>
            )}
        </div>

    );
}

export default DropdownButton;
