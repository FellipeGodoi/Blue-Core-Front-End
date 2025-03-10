import React, {useState} from "react";
import {Button, Table} from "react-bootstrap";

import {deletePhoneService} from "../../../utils/services/PhoneService.ts";
import PhoneModal from "../../modals/clientModal/PhoneModal.tsx";
import {Phone} from "../../../domain/types/client/PhoneTypes.ts";

type PhoneListProps = {
    phones: Phone[];
    cpf: string | null;
    onUpdatePhones: (updatedPhones: Phone[]) => void;
}

const PhoneList: React.FC<PhoneListProps> = ({phones, cpf, onUpdatePhones}) => {
    const [phoneModal, setPhoneModal] = useState<{show: boolean, editIndex: number | null}>({show: false, editIndex: null});

    const handleSavePhone = (updatedPhones: Phone) => {
        if (phoneModal.editIndex !== null) {
            const updatedAddresses = phones.map((address, index) =>
                index === phoneModal.editIndex ? updatedPhones : address
            );
            onUpdatePhones(updatedAddresses);
        } else {
            onUpdatePhones([...phones, updatedPhones]);
        }
        closePhoneModal();
    };

    const openPhoneModal = (index: number | null) => {
        setPhoneModal({show: true, editIndex: index});
    };

    const closePhoneModal = () => {
        setPhoneModal({show: false, editIndex: null});
    };

    const handleDeletePhone = async (phone: Phone) => {
        const result = await deletePhoneService(phone);
        if (result) {
            onUpdatePhones(phones.filter(ph => ph.phoneId !== phone.phoneId));
        }
    };

    return (
        <>
            <PhoneModal open={phoneModal.show}
                        close={closePhoneModal}
                        phone={phoneModal.editIndex !== null ? phones[phoneModal.editIndex] : undefined}
                        cpf={cpf ? cpf : undefined}
                        onSave={handleSavePhone}/>

            <Table striped hover>
                <thead>
                <tr>
                    <th>Telefones</th>
                    <th className="col-1">
                        <Button onClick={() => openPhoneModal(null)}> + </Button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {phones.map((phone, index) => (
                    <tr key={index}>
                        <td onClick={() => openPhoneModal(index)}>{phone.phoneName}</td>
                        <td>
                            <Button variant="danger" className="ri-delete-bin-5-fill" onClick={() => handleDeletePhone(phone)}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
};

export default PhoneList;