import React from "react";
import {Genero} from "../../../domain/enums/Genero.ts";

interface GenderFieldProps {
    id: string;
    label: string;
    saveGender: (gender: Genero) => void;
    gender?: Genero | null;
}

const GenderField: React.FC<GenderFieldProps> = ({ id, label, saveGender, gender }) => {
    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        saveGender(e.target.value as Genero); // Garantindo que o valor seja do tipo Genero
    };

    return (
        <div className="mb-2">
            <label htmlFor={id} className="fw-semibold me-2">{label}</label>
            <select
                id={id}
                className="form-select"
                value={gender || ""}
                onChange={handleGenderChange}
            >
                <option value="" disabled>Selecione</option>
                <option value={Genero.MASCULINO}>{Genero.MASCULINO}</option>
                <option value={Genero.FEMININO}>{Genero.FEMININO}</option>
                <option value={Genero.OUTRO}>{Genero.OUTRO}</option>
            </select>
        </div>
    );
};

export default GenderField;
