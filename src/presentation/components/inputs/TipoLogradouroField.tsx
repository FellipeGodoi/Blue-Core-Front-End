import React from "react";
import { TipoLogradouro } from "../../../domain/enums/TipoLogradouro"; // Importe seu enum TipoLogradouro

interface TipoLogradouroFieldProps {
    id: string;
    label: string;
    saveTipoLogradouro: (tipoLogradouro: TipoLogradouro) => void;
    tipoLogradouro?: TipoLogradouro | null;
}

const TipoLogradouroField: React.FC<TipoLogradouroFieldProps> = ({ id, label, saveTipoLogradouro, tipoLogradouro }) => {
    const handleTipoLogradouroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        saveTipoLogradouro(e.target.value as TipoLogradouro); // Garantindo que o valor seja do tipo TipoLogradouro
    };

    return (
        <div className="mb-2">
            <label htmlFor={id} className="fw-semibold me-2">{label}</label>
            <select
                id={id}
                className="form-select"
                value={tipoLogradouro || ""}
                onChange={handleTipoLogradouroChange}
            >
                <option value="" disabled>Selecione</option>
                <option value={TipoLogradouro.RUA}>{TipoLogradouro.RUA}</option>
                <option value={TipoLogradouro.AVENIDA}>{TipoLogradouro.AVENIDA}</option>
                <option value={TipoLogradouro.TRAVESSA}>{TipoLogradouro.TRAVESSA}</option>
                <option value={TipoLogradouro.ALAMEDA}>{TipoLogradouro.ALAMEDA}</option>
                <option value={TipoLogradouro.ESTRADA}>{TipoLogradouro.ESTRADA}</option>
                <option value={TipoLogradouro.RODOVIA}>{TipoLogradouro.RODOVIA}</option>
                <option value={TipoLogradouro.VIELA}>{TipoLogradouro.VIELA}</option>
                <option value={TipoLogradouro.BECO}>{TipoLogradouro.BECO}</option>
                <option value={TipoLogradouro.PRACA}>{TipoLogradouro.PRACA}</option>
            </select>
        </div>
    );
};

export default TipoLogradouroField;
