import React, { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function DropdownButton() {
    const [selectedOptions, setSelectedOptions] = useState({
        gender: null,
        occasion: null,
        style: null,
    });
    const genderOptions = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        { value: "Neutral", label: "Neutral" },
    ];
    const occasionOptions = [
        { value: "Casual", label: "Casual" },
        { value: "Formal", label: "Formal" },
        { value: "Business", label: "Business" },
    ];
    const styleOptions = [
        { value: "Minimalist", label: "Minimalist" },
        { value: "Athletic", label: "Athletic" },
        { value: "Street ware", label: "Street ware" },
    ];

    function handleOptionSelect(option, name) {
        setSelectedOptions({ ...selectedOptions, [name]: option });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const { gender, occasion, style } = selectedOptions;
        console.log("Selected Gender:", gender);
        console.log("Selected Occasion:", occasion);
        console.log("Selected Style:", style);
        // You can do whatever you want with the selected options here
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Dropdown
                    options={genderOptions}
                    onChange={(option) => handleOptionSelect(option, "gender")}
                    value={selectedOptions.gender}
                    placeholder="Gender"
                />
                {selectedOptions.gender && (
                    <div>
                        {selectedOptions.gender.value === "Male" ||
                        selectedOptions.gender.value === "Female" ||
                        selectedOptions.gender.value === "Neutral" ? (
                            <div>
                                <div>Style</div>
                                {selectedOptions.gender.label}
                            </div>
                        ) : (
                            selectedOptions.gender.label
                        )}
                    </div>
                )}

                <Dropdown
                    options={occasionOptions}
                    onChange={(option) => handleOptionSelect(option, "occasion")}
                    value={selectedOptions.occasion}
                    placeholder="Occasion"
                />
                {selectedOptions.occasion && (
                    <div>
                        {selectedOptions.occasion.value === "Casual" ||
                        selectedOptions.occasion.value === "Formal" ||
                        selectedOptions.occasion.value === "Business" ? (
                            <div>
                                <div>Style</div>
                                {selectedOptions.occasion.label}
                            </div>
                        ) : (
                            selectedOptions.occasion.label
                        )}
                    </div>
                )}

                <Dropdown
                    options={styleOptions}
                    onChange={(option) => handleOptionSelect(option, "style")}
                    value={selectedOptions.style}
                    placeholder="Style"
                />
                {selectedOptions.style && (
                    <div>
                        {selectedOptions.style.value === "Minimalist" ||
                        selectedOptions.style.value === "Athletic" ||
                        selectedOptions.style.value === "Street ware" ? (
                            <div>
                                <div>Style</div>
                                {selectedOptions.style.label}
                            </div>
                        ) : (
                            selectedOptions.style.label
                        )}
                    </div>
                )}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default DropdownButton;
