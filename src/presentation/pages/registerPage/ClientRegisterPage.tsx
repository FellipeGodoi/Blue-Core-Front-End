import"./StyleClientRegisterPage.css"
import LogoSelo from "../../../data/images/BlueCoreImages/logo-selo.png";
import TextField from "../../components/inputs/TextField.tsx";
import {useEffect, useState} from "react";
import {Genero} from "../../../domain/enums/Genero.ts";
import {Client} from "../../../domain/types/client/ClienteTypes.ts";
import {createClientService} from "../../../utils/services/ClientService.ts";
import {useNavigate} from "react-router-dom";
import NumberInput from "../../components/inputs/NumberInput.tsx";
import PasswordField from "../../components/inputs/PasswordField.tsx";
import DateField from "../../components/inputs/DateInput.tsx";
import EnumSelect from "../../components/inputs/EnumSelect.tsx";
import {Button} from "react-bootstrap";

export default function ClientRegisterPage(){
    const navigate = useNavigate();

    const [cpf, setCpf] = useState<string>("");
    const [nameClient, setNameClient] = useState<string>("");
    const [emailClient, setEmailClient] = useState<string>("");
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [gender, setGender] = useState<string>();

    const [passwordStrength, setPasswordStrength] = useState<string>("");

    useEffect(() => {
        setPasswordStrength(checkPasswordStrength(password));
    },[password]);

    const checkPasswordStrength = (password: string): string => {
        const lengthCriteria = password.length >= 8;
        const numberCriteria = /\d/.test(password);
        const lowercaseCriteria = /[a-z]/.test(password);
        const uppercaseCriteria = /[A-Z]/.test(password);
        const specialCharacterCriteria = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password === ""){
            return ""
        }else{
            if (lengthCriteria && numberCriteria && lowercaseCriteria && uppercaseCriteria && specialCharacterCriteria) {
                return "Forte";
            } else if (lengthCriteria && (numberCriteria || lowercaseCriteria || uppercaseCriteria)) {
                return "Média";
            } else {
                return "Fraca";
            }
        }
    };

    const limpar = () => {
        setCpf("");
        setNameClient("");
        setEmailClient("");
        setBirthDate(null);
        setPassword((""));
        setPassword2("");
        setGender(Genero.OUTRO);

        window.location.reload();
    };

    const createClient = async () => {
        if (password != password2 || password === "Fraca") {
            return alert("verifique sua senha ela pode estar fraca ou não compativel com a confirmação");
        }
        const newClient: Client = {
            cpf,
            nameClient,
            emailClient,
            birthDate: birthDate || new Date(),
            password,
            isActive: true,
            gender: gender || Genero.OUTRO,
        };

        const result = await createClientService(newClient);
        if (result) {
            navigate("/perfil")
        } else {
            alert("Verifique os campos que estao faltando e tente novamente.")
        }
    };

    return(
        <>
            <div className="container d-flex justify-content-between col-12 gap-3 ">
                <div className="cad-divider d-none d-md-flex row col-4 ">
                    <div className="cad-image d-flex justify-content-center align-items-center py-5">
                        <img
                            alt="Logo"
                            src={LogoSelo}
                            className="img-fluid "
                            style={{height: '100%', width: 'auto', objectFit: 'contain', maxWidth: '350px'}}
                        />
                    </div>
                    <div className="cad-text ">
                        <span>
                            Esta é a etapa de pré-cadastro uma etapa crucial para criar uma conta
                            para voce, porem para realizar suas compras ainda será necessario
                            adicionar um endereço para entrega, um numero de telefone para contato
                            e um cartao para a forma de pagamento
                        </span>
                    </div>
                </div>

                {/* ---- Formulario ---- */}
                <div className="cad-formulario col-12 col-md-7">
                    <form>
                        <TextField id="nameClient" label="Nome completo" saveText={setNameClient} text={nameClient} />
                        <NumberInput id="cpf" label="CPF" saveNumber={setCpf} number={cpf} maxLength={11} />
                        <TextField id="emailClient" label="E-mail" saveText={setEmailClient} text={emailClient} />
                        <div className="gap-2 d-flex align-items-center">
                            <div className="col-8">
                                <PasswordField id="password" label="Senha" savePassword={setPassword} password={password} />
                            </div>
                            <div className="col-4 d-flex justify-content-center">
                                {
                                    passwordStrength === "Fraca" ? (<span className="pass-fraca fw-medium">Segurança da senha: {passwordStrength} </span>)
                                        : passwordStrength === "Média" ? (<span className="pass-media fw-medium">Segurança da senha: {passwordStrength }</span>)
                                        : passwordStrength === "Forte" ?(<span className="pass-forte fw-medium">Segurança da senha: {passwordStrength}</span>) :
                                                (<></>)
                                }

                            </div>
                        </div>
                        <div className="gap-2 d-flex align-items-center">
                            <div className="col-8">
                                <PasswordField id="password-confirm" label="Confirm sua senha" savePassword={setPassword2} password={password2} />

                            </div>
                            <div className="col-4 d-flex justify-content-center">
                                {password !== password2 ? (
                                    <span className="equal-text fw-semibold">
                                        as senhas precisam estar identicas
                                    </span>
                                ) : (<div/>)}
                            </div>
                        </div>
                        <DateField id="birthDate" label="Data de nascimento" saveDate={(date) => setBirthDate(date ? new Date(date) : null)} date={birthDate?.toISOString().split('T')[0] || ""} />
                        <EnumSelect id="gender" label="Gênero" enumClass={Genero} selectedValue={gender} saveValue={setGender} />
                    </form>
                    <div className="botoes-cad d-flex gap-3">
                        <Button className="btn-limpar" onClick={limpar}>Limpar</Button>
                        <Button className="btn-salvar fw-bold" onClick={createClient}>Cadastrar</Button>

                    </div>
                </div>

            </div>
        </>
    )
}