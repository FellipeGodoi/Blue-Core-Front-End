import {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import TextField from "../../components/inputs/TextField.tsx";
import NumberInput from "../../components/inputs/NumberInput.tsx";

import CepInput from "../../components/inputs/CepInput.tsx";
import {Address} from "../../../domain/types/client/AddressType.ts";
import {createAddressService, updateAddressService} from "../../../utils/services/AddressService.ts";
import {TipoLogradouro} from "../../../domain/enums/TipoLogradouro.ts";
import TipoLogradouroField from "../../components/inputs/TipoLogradouroField.tsx";
import {TipoResidencial} from "../../../domain/enums/TipoResidencial.ts";
import EnumSelect from "../../components/inputs/EnumSelect.tsx";

type AddressModalProps = {
    open: boolean;
    close: () => void;
    address?: Address;
    cpf?: string;
    onUpdateAddress: (updatedAddress: Address) => void;
}

const AddressModal: React.FC<AddressModalProps> = ({ open, close, address, cpf, onUpdateAddress }) => {
    // @ts-ignore
    const [id, setId] = useState<number | undefined>(undefined);
    const [apelidoEndereco, setApelidoEndereco] = useState<string>("");
    const [cep, setCep] = useState<string>("");
    const [numero, setNumero] = useState<string>("");
    const [estado, setEstado] = useState<string>("");
    const [cidade, setCidade] = useState<string>("");
    const [tipoLogradouro, setTipoLogradouro] = useState<TipoLogradouro | null>(null);
    const [logradouro, setLogradouro] = useState<string>("");
    const [tipoResidencial, setTipoResidencial] = useState<TipoResidencial | null>(null);
    const [bairro, setBairro] = useState<string>("");
    const [complemento, setComplemento] = useState<string>("");

    useEffect(() => {
        if (address) {
            setId(address.id);
            setApelidoEndereco(address.apelidoEndereco || "");
            setCep(address.cep || "");
            setNumero(address.numero || "");
            setEstado(address.estado || "");
            setCidade(address.cidade || "");
            setTipoLogradouro(address.tipoLogradouro ? address.tipoLogradouro : null);
            setLogradouro(address.logradouro || "");
            setTipoResidencial(address.tipoResidencial ? tipoResidencial : null);
            setBairro(address.bairro || "");
            setComplemento(address.complemento || "");
        }
    }, [address]);

    const fetchAddressByZipCode = async () => {
        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    setLogradouro(data.logradouro || "");
                    setBairro(data.bairro || "");
                    setCidade(data.localidade || "");
                    setEstado(data.uf || "");
                } else {
                    alert("CEP não encontrado.");
                }
            } catch (error) {
                console.error("Erro ao buscar o endereço:", error);
            }
        } else {
            alert("Digite um CEP válido.");
        }
    };

    const cancel = () => {
        setId(undefined);
        setApelidoEndereco("");
        setCep("");
        setNumero("");
        setEstado("");
        setCidade("");
        setTipoLogradouro(TipoLogradouro.ALAMEDA);
        setLogradouro("");
        setTipoResidencial(TipoResidencial.CASA);
        setBairro("");
        setComplemento("");
        close();
    };

    const handleSave = async () => {
        const newAddress: Address = {
            id: address?.id,
            apelidoEndereco: apelidoEndereco,
            cep: cep,
            numero: numero,
            estado: estado,
            cidade: cidade,
            tipoLogradouro: tipoLogradouro || TipoLogradouro.AVENIDA,
            logradouro: logradouro,
            tipoResidencial: tipoResidencial || TipoResidencial.CASA,
            bairro: bairro,
            complemento: complemento
        };

        if (address?.id) {
            const updatedAddress = await updateAddressService(newAddress);
            if (updatedAddress) {
                onUpdateAddress(updatedAddress);
            }
        } else if (cpf) {
            const createdAddress = await createAddressService(newAddress, cpf);
            if (createdAddress) {
                onUpdateAddress(createdAddress);
            }
        }
        cancel();
    };


    return (
        <>
            <Modal show={open} size={"lg"} onHide={close} overlay backdrop={"static"}>
                <Modal.Header closeButton>
                    <h3>
                        {address ? `Editar ${address.apelidoEndereco}` : "Cadastrar novo endereço"}
                    </h3>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <TextField id="apelidoEndereco" label="Nome do endereço" saveText={setApelidoEndereco} text={apelidoEndereco} />
                        <div className="d-flex align-items-end">
                            <CepInput id="cep" label="CEP" saveCep={setCep} onSearchCep={fetchAddressByZipCode} cep={cep} />
                        </div>

                        <div className="d-flex justify-content-between">
                            <TextField id="Estado" label="Estado" saveText={setEstado} text={estado} />
                            <TextField id="Bairro" label="Bairro" saveText={setBairro} text={bairro} />
                            <TextField id="Cidade" label="Cidade" saveText={setCidade} text={cidade}/>
                        </div>

                        <div className="d-flex col justify-content-between ">
                            <div className="col-4">
                                <TipoLogradouroField id="tipoLogradouro" label="Tipo de Logradouro" saveTipoLogradouro={setTipoLogradouro}
                                                     tipoLogradouro={tipoLogradouro}/>
                            </div>
                            <div className="col-7">
                                <TextField id="Logradouro" label="Logradouro" saveText={setLogradouro} text={logradouro}/>
                            </div>

                        </div>
                        <div className="d-flex col justify-content-between col-12">
                            <div className="col-6">
                            <EnumSelect id="tipoResidencial"
                                        label="Tipo de Residência"
                                        saveValue={(value) => setTipoResidencial(value as TipoResidencial)}
                                        selectedValue={tipoResidencial ?? ""}
                                        enumClass={TipoResidencial}/>
                            </div>
                            <div className="col-5">
                            <NumberInput id="numero" label="Número" saveNumber={setNumero}
                                         number={numero} maxLength={10}/>
                            </div>

                        </div>


                        <TextField id="complemento" label="Complemento" saveText={setComplemento}
                                   text={complemento}/>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancel}>Cancelar</Button>
                    <Button variant="primary" onClick={handleSave}>
                        {address ? "Salvar" : "Adicionar"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddressModal;
