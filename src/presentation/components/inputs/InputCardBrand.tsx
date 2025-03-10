import {useEffect, useState} from "react";
import AxiosClient from "../../../api/axios/AxiosClient.ts";

interface InputCardBrandProps {
    id: string;
    saveBrand: (selectedOption: string) => void;
    selectedOption: string | null;
}

const InputCardBrand: React.FC<InputCardBrandProps> = ({id,saveBrand, selectedOption}) => {
    const [options, setOptions] = useState<string[]>([]);
    const [localOption, setLocalOption] = useState<string>('');

    useEffect(() => {
        // Replace with your actual API call
        const fetchOptions = async () => {
            try {
                const response = await AxiosClient('/card-brands');
                setOptions(response.data);
            } catch (error) {
                console.error("Error fetching card brands:", error);
            }
        };
        fetchOptions();
    }, []);

    useEffect(() => {
        if (selectedOption) setLocalOption(selectedOption);
    }, [selectedOption]);

    const updateOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newBrand = e.target.value;
        setLocalOption(newBrand);
        saveBrand(newBrand); // Pass the selected option to parent
    };

    return (
        <div className="mb-2">
            <label htmlFor={id} className="fw-semibold" >
                Bandeira do cartão
            </label>
            <select
                className="form-select"
                id={id}
                value={localOption}
                onChange={updateOption}
            >
                <option value="">Selecione uma bandeira</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default InputCardBrand;