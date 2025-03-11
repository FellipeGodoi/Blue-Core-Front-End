import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import NumberInput from "../../components/inputs/NumberInput.tsx";
import { createPhoneService, updatePhoneService } from "../../../utils/services/PhoneService.ts";
import {Phone} from "../../../domain/types/client/PhoneTypes.ts";
import {TipoTelefone} from "../../../domain/enums/TipoTelefone.ts";
import TextField from "../../components/inputs/TextField.tsx";
import EnumSelect from "../../components/inputs/EnumSelect.tsx";

type PhoneModalProps = {
    open: boolean;
    close: () => void;
    phone?: Phone;
    cpf?: string;
    onSave: (phone: Phone) => void;
};

const PhoneModal: React.FC<PhoneModalProps> = ({ open, close, phone, cpf, onSave }) => {
    const [idPhone, setIdPhone] = useState<string | null>(null);
    const [apelidoTelefone, setApelidoTelefone] = useState<string>("")
    const [areaCode, setAreaCode] = useState<string>(phone?.areaCode || "");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [tipoTelefone, setTipoTelefone] = useState<TipoTelefone>(phone?.phonetype ?? TipoTelefone.CELULAR);

    useEffect(() => {
        if (phone) {
            setIdPhone(phone.phoneId || null);
            setApelidoTelefone(phone.phoneName || "");
            setAreaCode(phone.areaCode || "");
            setPhoneNumber(phone.phoneNumber || "");
            setTipoTelefone(phone.phonetype ? phone.phonetype as TipoTelefone : TipoTelefone.CELULAR);
        }
    }, [phone]);

    const cancel = () => {
        setIdPhone(null);
        setAreaCode("");
        setPhoneNumber("");
        setTipoTelefone(TipoTelefone.CELULAR);
        close();
    };

    const handleSave = async () => {
        const newPhone : Phone = ({
            phoneId: phone?.phoneId,
            phoneName: apelidoTelefone,
            areaCode: areaCode,
            phoneNumber : phoneNumber,
            phonetype: tipoTelefone || TipoTelefone.CELULAR,
        });


        if (idPhone) {
            const updatedPhone = await updatePhoneService(newPhone);
            if (updatedPhone) {
                onSave(updatedPhone);
            }
        } else if (cpf) {
            const createdPhone = await createPhoneService(newPhone, cpf);
            if (createdPhone) {
                onSave(createdPhone);
            }
        }

        cancel();
    };

    return (
        <>
            <Modal show={open} onHide={cancel} backdrop="static">
                <Modal.Header closeButton>
                    {phone ? `Editar número de telefone` : "Cadastrar novo telefone"}
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <TextField id="apelidoTelefone" label="Apelido do telefone" saveText={setApelidoTelefone} text={apelidoTelefone}/>
                        <EnumSelect
                            id="tipoTelefone"
                            label="Tipo de telefone"
                            enumClass={TipoTelefone}
                            saveValue={(value) => setTipoTelefone(value as TipoTelefone)}
                            selectedValue={tipoTelefone ?? ""}
                        />
                        <NumberInput id="areaCode" label="DDD" saveNumber={setAreaCode} number={areaCode} maxLength={3} />
                        <NumberInput id="numberPhone" label="Número do telefone" saveNumber={setPhoneNumber} number={phoneNumber} maxLength={9} />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancel}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        {phone ? "Salvar" : "Adicionar"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PhoneModal;
