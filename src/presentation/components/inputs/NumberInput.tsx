import React, {useEffect, useState} from "react";

interface NumberInputProps {
    id: string;
    label: string;
    saveNumber: (value: string) => void;
    maxLength: number;
    number?: string | null;
}

const NumberInput: React.FC<NumberInputProps> = ({ id, label, saveNumber, maxLength, number }) => {
    const [localNumber, setLocalNumber] = useState<string>( '');

    useEffect(() => {
        if (number) setLocalNumber(number);
    }, [number]);
    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (/^\d*$/.test(inputValue) && inputValue.length <= maxLength) {
            setLocalNumber(inputValue);
            saveNumber(inputValue);
        }
    };

    return (
        <div className="mb-2">
            <label htmlFor={id} className="fw-semibold" hidden={label === ""}>{label}</label>
            <input
                className="form-control"
                type="text"
                id={id}
                value={localNumber}
                onChange={handleNumberChange}
                maxLength={maxLength}
            />
        </div>
    );
}

export default NumberInput;
