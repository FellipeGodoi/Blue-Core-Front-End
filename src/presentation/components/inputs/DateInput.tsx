import { useEffect, useState } from "react";

interface CampoDataSimplesProps {
    id: string;
    label: string;
    saveDate: (data: string) => void;
    date?: string | null;
}

const DateField: React.FC<CampoDataSimplesProps> = ({ id, label, saveDate, date }) => {
    const [localDate, setLocalDate] = useState<string>('');

    useEffect(() => {
        if (date) setLocalDate(date);
    }, [date]);

    const updateDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        setLocalDate(newDate);
        saveDate(newDate);
    }

    return (
        <div className="mb-2">
            <label htmlFor={id} className="fw-semibold" hidden={label === ""}>{label}</label>
            <input
                className={`form-control`}
                type="date"
                id={id}
                value={localDate}
                onChange={updateDate}
            />
        </div>
    );
}

export default DateField;
