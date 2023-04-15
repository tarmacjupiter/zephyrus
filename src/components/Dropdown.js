import React, { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "./Dropdown.css"

function DropdownButton({ type, options, onSubmit }) {
    const [selectedOptions, setSelectedOptions] = useState(null);
   
    function handleOptionsSelect(option) {
        setSelectedOptions(option);
        onSubmit(type, option.value)
    }

    return (
        <div>
              <Dropdown 
              className="dropdown-styling"
              options={options}
              onChange={handleOptionsSelect}
              value={selectedOptions}
              placeholder={type}
              />
        </div>
    );
}

export default DropdownButton;
