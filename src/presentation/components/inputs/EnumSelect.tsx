import React from "react";

function enumToOptions<T extends Record<string, string | number>>(enumObject: T) {
    return Object.entries(enumObject)
        //@ts-ignore
        .filter(([key, value]) => typeof value === "string")
        .map(([key, value]) => ({
            value: key,
            label: value as string,
        }));
}

interface EnumSelectProps<T extends Record<string, string | number>> {
    id: string;
    label: string;
    enumClass: T;
    saveValue: (value: string) => void;
    selectedValue?: string | null;
}

function EnumSelect<T extends Record<string, string | number>>({
                                                                   id,
                                                                   label,
                                                                   enumClass,
                                                                   saveValue,
                                                                   selectedValue,
                                                               }: EnumSelectProps<T>) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        saveValue(e.target.value);
    };

    const options = enumToOptions(enumClass);

    return (
        <div className="mb-2">
            <label htmlFor={id} className="fw-semibold me-2">
                {label}
            </label>
            <select id={id} className="form-select" value={selectedValue || ""} onChange={handleChange}>
                <option value="" disabled>
                    Selecione
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default EnumSelect;
