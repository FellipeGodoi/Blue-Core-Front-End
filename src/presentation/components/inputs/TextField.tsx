import {useEffect, useState} from "react";

interface CampoTextoSimplesProps {
    id:string;
    label: string;
    saveText: (data: string) => void;
    text?: string | null;
}

const TextField: React.FC<CampoTextoSimplesProps> = ({id, label, saveText, text}) => {
    const [localText, setLocalText] = useState<string>('');

    useEffect(() => {
        if (text) setLocalText(text);
    }, [text]);


    const updateText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newText = e.target.value;
        setLocalText(newText);
        saveText(newText);
    }

    return(
        <div className="mb-2">
            <label htmlFor="buscatag" className="fw-semibold" hidden={label === ""}>{label}</label>
            <input
                className={`form-control`}
                type="text"
                id={id}
                value={localText}
                onChange={updateText}
            />
        </div>
    )
}


export default TextField;