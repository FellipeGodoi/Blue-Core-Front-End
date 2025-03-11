import {useEffect, useState} from "react";

interface CampoSenhaProps {
    id: string;
    label: string;
    savePassword: (data: string) => void;
    password?: string | null;
    erro?: string;
}

const PasswordField: React.FC<CampoSenhaProps> = ({
                                                   id,
                                                   label,
                                                   savePassword,
                                                   password,
                                                   erro,
                                               }) => {
    const [localPassword, setLocalPassword] = useState<string>("");
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    useEffect(() => {
        if (password) setLocalPassword(password);
    }, [password]);

    const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setLocalPassword(newPassword);
        savePassword(newPassword);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="mb-2">
            <label htmlFor={id} className="fw-semibold" hidden={label === ""}>
                {label}
            </label>
            <div className="input-group">
                <input
                    className={`form-control ${erro ? "is-invalid" : ""}`}
                    type={isPasswordVisible ? "text" : "password"}
                    id={id}
                    value={localPassword}
                    onChange={updatePassword}
                />
                <button
                    type="button"
                    className="btn btn-outline-success"
                    style={{ background: "var(--azul-principal)", border: "1px solid var(--azul-principal)", color: "white" }}
                    onClick={togglePasswordVisibility}
                >
                    {isPasswordVisible ? "Ocultar" : "Mostrar"}
                </button>
            </div>
            {erro && <div className="invalid-feedback">{erro}</div>}
        </div>
    );
};

export default PasswordField;
