import React, { useState, useEffect, useRef } from 'react';

const CustomSelect = ({ options, onChange, value }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(
        value
            ? options.find(opt => opt.value === value) || options[0]
            : options[0]
    );
    const selectRef = useRef(null);

    // Function to close the dropdown when a click occurs outside the component
    const handleClickOutside = event => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        // Add a click event listener to the document
        document.addEventListener('click', handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (value) {
            const option = options.find(opt => opt.value === value);
            if (option) {
                setSelectedOption(option);
            }
        }
    }, [value, options]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = option => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onChange) {
            onChange(option.value);
        }
    };

    return (
        <div
            className="custom-select custom-select-2 flex-shrink-0 relative"
            ref={selectRef}
        >
            <div
                className={`select-selected whitespace-nowrap ${
                    isOpen ? 'select-arrow-active' : ''
                }`}
                onClick={toggleDropdown}
            >
                {selectedOption.label}
            </div>
            <div
                className={`select-items ${isOpen ? '' : 'select-hide'}`}
                style={{
                    maxHeight: '300px',
                    overflowY: 'auto',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#3b82f6 #f1f1f1',
                }}
            >
                {options.map((option, index) => (
                    <div
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className={`select-item ${
                            selectedOption.value === option.value
                                ? 'same-as-selected'
                                : ''
                        }`}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CustomSelect;
