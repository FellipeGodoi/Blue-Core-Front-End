import {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import TextField from "../../components/inputs/TextField.tsx";
import PasswordField from "../../components/inputs/PasswordField.tsx";
import DateField from "../../components/inputs/DateInput.tsx";
import GenderField from "../../components/inputs/GenderField.tsx";
import NumberInput from "../../components/inputs/NumberInput.tsx";
import {createClientService, deleteClientService, updateClientService} from "../../../utils/services/ClientService.ts";
// import AxiosClient from "../../../api/axios/AxiosClient.ts";
import AddressList from "../../components/lists/AddressList.tsx";
import {Client} from "../../../domain/types/client/ClienteTypes.ts";
import AxiosClient from "../../../api/axios/AxiosClient.ts";
import {Genero} from "../../../domain/enums/Genero.ts";
import {Address} from "../../../domain/types/client/AddressType.ts";

import "./StyleClientModals.css"
import {Card} from "../../../domain/types/client/CardType.ts";
import CardList from "../../components/lists/CardList.tsx";
import PhoneList from "../../components/lists/PhoneList.tsx";
import {Phone} from "../../../domain/types/client/PhoneTypes.ts";

type ClientModalType = {
    open: boolean;
    close: () => void;
    cpfCliente?: string;
};

const ClientModal: React.FC<ClientModalType> = ({ open, close, cpfCliente }) => {
    const [idClient, setIdClient] = useState<string | undefined>(undefined);
    const [cpf, setCpf] = useState<string>("");
    const [nameClient, setNameClient] = useState<string>("");
    const [emailClient, setEmailClient] = useState<string>("");
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [password, setPassword] = useState<string>("");
    const [isActive, setIsActive] = useState<boolean>(true);
    const [gender, setGender] = useState<Genero | null>(null);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [cards, setCards] = useState<Card[]>([]);
    const [phones, setPhones] = useState<Phone[]>([]);

    useEffect(() => {
        const buscaCliente = async (cpfCliente: string) => {
            try{
                const response = await AxiosClient.get(`clients/cpf/${cpfCliente}`);
                const client = response.data;
                setIdClient(client.idClient);
                setCpf(client.cpf);
                setNameClient(client.nameClient);
                setEmailClient(client.emailClient);
                setBirthDate(client.birthDate ? new Date(client.birthDate) : null);
                setPassword(client.password);
                setIsActive(client.isActive);
                setGender(client.gender ? client.gender as Genero : null);
                setAddresses(client.addresses || []);
                setCards(client.cards || []);
                setPhones(client.phones || []);
            } catch (error) {
                console.error('Erro ao buscar dados do cliente:', error);

            }
        }
        if (cpfCliente) {
            buscaCliente(cpfCliente);
        } else {
            limpar();
        }
    }, [cpfCliente]);

    const limpar = () => {
        setIdClient(undefined);
        setCpf("");
        setNameClient("");
        setEmailClient("");
        setBirthDate(null);
        setPassword("");
        setIsActive(true);
        setGender(Genero.OUTRO);
        setAddresses([]);
        setCards([]);
        setPhones([]);
    };

    const cancelar = () => {
        limpar();
        close();
    };

    const createClient = async () => {
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
            limpar();
            cancelar();
        }
    };

    const updateClient = async () => {
        const updatedClient: Client = {
            idClient,
            cpf,
            nameClient,
            emailClient,
            birthDate: birthDate || new Date(),
            password,
            isActive,
            gender: gender || Genero.OUTRO,
        };

        const result = await updateClientService(updatedClient);
        if (result) {
            limpar();
            cancelar();
        }
    };

    const removeClient = async () => {
        if (cpf) {
            const result = await deleteClientService(cpf);
            if (result) {
                limpar();
                cancelar();
            }
        } else {
            console.error("CPF não encontrado para deletar.");
        }
    };

    return (
        <Modal show={open} onHide={cancelar} backdrop="static" size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{cpfCliente ? `Editar ${nameClient}` : 'Cadastrar Cliente'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <TextField id="nameClient" label="Nome completo" saveText={setNameClient} text={nameClient} />
                    <NumberInput id="cpf" label="CPF" saveNumber={setCpf} number={cpf} maxLength={11} />
                    <TextField id="emailClient" label="E-mail" saveText={setEmailClient} text={emailClient} />
                    <PasswordField id="password" label="Senha" savePassword={setPassword} password={password} />
                    <DateField id="birthDate" label="Data de nascimento" saveDate={(date) => setBirthDate(date ? new Date(date) : null)} date={birthDate?.toISOString().split('T')[0] || ""} />
                    <GenderField id="gender" label="Gênero" saveGender={setGender} gender={gender} />
                </form>
                {cpfCliente && <AddressList addresses={addresses} cpf={cpf} onUpdateAddresses={setAddresses} />}
                {cpfCliente && <CardList cards={cards} cpf={cpf} onUpdateCards={setCards} />}
                {cpfCliente && <PhoneList phones={phones} cpf={cpf} onUpdatePhones={setPhones} />}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={cancelar}>Cancelar</Button>
                {cpfCliente ? (
                    <>
                        <Button variant="danger" onClick={removeClient}>Deletar Cliente</Button>
                        <Button variant="primary" onClick={updateClient}>Salvar</Button>
                    </>
                ) : (
                    <Button variant="primary" onClick={createClient}>Cadastrar</Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default ClientModal;