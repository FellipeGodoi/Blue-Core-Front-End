import { useParams } from 'react-router-dom';
import {Address} from "../../../domain/types/client/AddressType.ts";
import {useEffect, useState} from "react";
import {Phone} from "../../../domain/types/client/PhoneTypes.ts";
import {Card} from "../../../domain/types/client/CardType.ts";
import {Genero} from "../../../domain/enums/Genero.ts";
import AxiosClient from "../../../api/axios/AxiosClient.ts";
import CardList from "../../components/lists/CardList.tsx";
import AddressList from "../../components/lists/AddressList.tsx";
import PhoneList from "../../components/lists/PhoneList.tsx";
import TextField from "../../components/inputs/TextField.tsx";
import PasswordField from "../../components/inputs/PasswordField.tsx";
import checkPasswordStrength from "../../../utils/functions/checkPasswordStrength.ts";
import EnumSelect from "../../components/inputs/EnumSelect.tsx";
import DateField from "../../components/inputs/DateInput.tsx";
import {Button} from "react-bootstrap";
import {Client} from "../../../domain/types/client/ClienteTypes.ts";
import {updateClientService} from "../../../utils/services/ClientService.ts";


export default function UserProfilePage() {
    const { cpfUrl } = useParams<string>();
    const [activeTab, setActiveTab] = useState<string>('addresses');


    const [cpf, setCpf] = useState<string>("");
    const [nameClient, setNameClient] = useState<string>("");
    const [emailClient, setEmailClient] = useState<string>("");
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [cards, setCards] = useState<Card[]>([]);
    const [phones, setPhones] = useState<Phone[]>([]);

    const [passwordStrength, setPasswordStrength] = useState<string>("");


    useEffect(() => {
        const buscaCliente = async (cpfUrl: string) => {
            try {
                const response = await AxiosClient.get(`clients/cpf/${cpfUrl}`);
                const client = response.data;
                setCpf(client.cpf);
                setNameClient(client.nameClient);
                setEmailClient(client.emailClient);
                setBirthDate(client.birthDate ? new Date(client.birthDate) : null);
                setPassword(client.password);
                setGender(client.gender ? client.gender : null);
                setAddresses(client.addresses || []);
                setCards(client.cards || []);
                setPhones(client.phones || []);
            } catch (error) {
                console.error('Erro ao buscar dados do cliente:', error);
            }
        };

        if (cpfUrl) {
            buscaCliente(cpfUrl);
        }
    }, [cpfUrl]);


    const atualizarCliente = async () => {
        if (password != password2 || password === "Fraca") {
            return alert("verifique sua senha ela pode estar fraca ou não compativel com a confirmação");
        }
        const updatedClient: Client = {
            cpf,
            nameClient,
            emailClient,
            birthDate: birthDate || new Date(),
            password,
            isActive: true,
            gender: gender || Genero.OUTRO,
        };
        const result = await updateClientService(updatedClient);
        if (result) {
            window.location.reload();
        } else {
            alert("Verifique os campos que estao faltando e tente novamente.")
        }
    }


    useEffect(() => {
        setPasswordStrength(checkPasswordStrength(password));
    },[password]);

    const cancelar = () => {
        window.location.reload();
    }
    return (
        <div className="container d-flex col-12 gap-4">
            <div className="profile-divider col-6">
                <TextField id="nameClient" label="Nome completo" saveText={setNameClient} text={nameClient} />
                <TextField id="emailClient" label="E-mail" saveText={setEmailClient} text={emailClient} />
                <div className="d-flex column mb-4">
                    <div className="gap-2 d-flex row align-items-center ">
                        <div className="col-11">
                            <PasswordField id="password" label="Nova Senha" savePassword={setPassword} password={password} />
                        </div>
                        <div className="col-11 d-flex justify-content-center">
                            {
                                passwordStrength === "Fraca" ? (<span className="pass-fraca fw-medium">Segurança da senha: {passwordStrength} </span>)
                                    : passwordStrength === "Média" ? (<span className="pass-media fw-medium">Segurança da senha: {passwordStrength }</span>)
                                        : passwordStrength === "Forte" ?(<span className="pass-forte fw-medium">Segurança da senha: {passwordStrength}</span>) :
                                            (<></>)
                            }
                        </div>
                    </div>
                    <div className="gap-2 d-flex row justify-content-between align-items-center">
                        <div className="col-11">
                            <PasswordField id="password-confirm" label="Confirm sua senha nova" savePassword={setPassword2} password={password2} />
                        </div>
                        <div className="d-flex justify-content-center">
                            {password !== password2 ? (
                                <span className="equal-text fw-semibold">
                                        As senhas precisam estar identicas
                                    </span>
                            ) : (<div/>)}
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between gap-2 column ">
                    <div className="col-5">
                        <EnumSelect id="genero" label="Genero" enumClass={Genero} saveValue={setGender} selectedValue={gender}/>
                    </div>
                    <div className="col-6">
                        <DateField id="birthDate" label="Data de nascimento" saveDate={(date) => setBirthDate(date ? new Date(date) : null)} date={birthDate?.toISOString().split('T')[0] || ""} />
                    </div>
                </div>
                <div className="d-flex gap-2 justify-content-end">
                    <Button
                        onClick={cancelar}
                        className="fw-semibold"
                        style={{
                            color: "var(--azul-principal)",
                            background: "var(--azul-claro)",
                            border: "var(--azul-claro) 1px solid",
                        }}>Cancelar</Button>
                    <Button
                        onClick={atualizarCliente}
                        className="fw-semibold"
                        style={{
                            background: "var(--azul-principal)",
                            border: "var(--azul-principal) 1px solid",
                    }}>Atualizar meus dados</Button>

                </div>
            </div>

            {/*----- segunda metade da tela --------*/}
            <div className="container d-flex col-12 gap-4">
                <div className="profile-divider  col-6">
                    <ul className="nav nav-tabs" id="userProfileTabs" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a
                                className={`nav-link ${activeTab === 'addresses' ? 'active' : ''}`}
                                id="addresses-tab"
                                data-bs-toggle="tab"
                                role="tab"
                                aria-controls="addresses"
                                aria-selected={activeTab === 'addresses'}
                                onClick={() => setActiveTab('addresses')}
                                style={{
                                    cursor: 'pointer',
                                }}
                            >
                                Endereços
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className={`nav-link ${activeTab === 'cards' ? 'active' : ''}`}
                                id="cards-tab"
                                data-bs-toggle="tab"
                                role="tab"
                                aria-controls="cards"
                                aria-selected={activeTab === 'cards'}
                                onClick={() => setActiveTab('cards')}
                                style={{
                                    cursor: 'pointer',
                                }}
                            >
                                Cartões
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className={`nav-link ${activeTab === 'phones' ? 'active' : ''}`}
                                id="phones-tab"
                                data-bs-toggle="tab"
                                role="tab"
                                aria-controls="phones"
                                aria-selected={activeTab === 'phones'}
                                onClick={() => setActiveTab('phones')}
                                style={{
                                    cursor: 'pointer',
                                }}
                            >
                                Telefones
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className={`nav-link ${activeTab === 'pedidos' ? 'active' : ''}`}
                                id="pedidos-tab"
                                data-bs-toggle="tab"
                                role="tab"
                                aria-controls="pedidos"
                                aria-selected={activeTab === 'pedidos'}
                                onClick={() => setActiveTab('pedidos')}
                                style={{
                                    cursor: 'pointer',
                                }}
                            >
                                Pedidos
                            </a>
                        </li>
                    </ul>

                    <div className="tab-content" id="userProfileTabsContent">
                        <div
                            className={`tab-pane fade ${activeTab === 'addresses' ? 'show active' : ''}`}
                            id="addresses"
                            role="tabpanel"
                            aria-labelledby="addresses-tab"
                        >
                            <AddressList addresses={addresses} onUpdateAddresses={setAddresses} cpf={cpf} />
                        </div>
                        <div
                            className={`tab-pane fade ${activeTab === 'cards' ? 'show active' : ''}`}
                            id="cards"
                            role="tabpanel"
                            aria-labelledby="cards-tab"
                        >
                            <CardList cards={cards} cpf={cpf} onUpdateCards={setCards} />
                        </div>
                        <div
                            className={`tab-pane fade ${activeTab === 'phones' ? 'show active' : ''}`}
                            id="phones"
                            role="tabpanel"
                            aria-labelledby="phones-tab"
                        >
                            <PhoneList phones={phones} cpf={cpf} onUpdatePhones={setPhones} />
                        </div>
                        <div
                            className={`tab-pane fade ${activeTab === 'pedidos' ? 'show active' : ''}`}
                            id="pedidos"
                            role="tabpanel"
                            aria-labelledby="pedidos-tab"
                        >
                            <h3>
                                Você ainda não realizou nenhum pedido
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}