import React, { useEffect, useState } from "react";

interface CepInputProps {
    id: string;
    label: string;
    saveCep: (value: string) => void;
    onSearchCep: () => void;
    cep?: string | null;
}

const CepInput: React.FC<CepInputProps> = ({ id, label, saveCep, onSearchCep, cep }) => {
    const [localCep, setLocalCep] = useState<string>("");

    useEffect(() => {
        if (cep) setLocalCep(cep);
    }, [cep]);

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (/^\d*$/.test(inputValue) && inputValue.length <= 8) {
            setLocalCep(inputValue);
            saveCep(inputValue);
        }
    };

    const handleSearchClick = () => {
        onSearchCep();
    };

    return (
        <div className="mb-2">
            <label htmlFor={id} className="fw-semibold" hidden={label === ""}>{label}</label>
            <div className="input-group">
                <input
                    className="form-control"
                    type="text"
                    id={id}
                    value={localCep}
                    onChange={handleCepChange}
                    maxLength={8}
                    placeholder="Digite o CEP"
                />
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSearchClick}
                >
                    Buscar
                </button>
            </div>
        </div>
    );
}

export default CepInput;
