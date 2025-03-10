import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { deleteAddressService } from "../../../utils/services/AddressService.ts";
import {Address} from "../../../domain/types/client/AddressType.ts";
import AddressModal from "../../modals/clientModal/AddressModal.tsx";

type AddressListProps = {
    addresses: Address[];
    cpf: string | null;
    onUpdateAddresses: (updatedAddresses: Address[]) => void;
};

const AddressList: React.FC<AddressListProps> = ({ addresses, cpf, onUpdateAddresses }) => {
    const [addressModal, setAddressModal] = useState<{ show: boolean; editIndex: number | null }>({
        show: false,
        editIndex: null,
    });

    const openAddressModal = (index: number | null) => {
        setAddressModal({ show: true, editIndex: index });
    };

    const closeAddressModal = () => {
        setAddressModal({ show: false, editIndex: null });
    };

    const handleDeleteAddress = async (address: Address) => {
        const result = await deleteAddressService(address);
        if (result) {
            onUpdateAddresses(addresses.filter(addr => addr.id !== address.id));
        }
    };

    const handleSaveAddress = (updatedAddress: Address) => {
        if (addressModal.editIndex !== null) {
            const updatedAddresses = addresses.map((address, index) =>
                index === addressModal.editIndex ? updatedAddress : address
            );
            onUpdateAddresses(updatedAddresses);
        } else {
            onUpdateAddresses([...addresses, updatedAddress]);
        }
        closeAddressModal();
    };

    return (
        <>
            {addressModal.show && <div className="overlay"></div>}
            <AddressModal
                open={addressModal.show}
                close={closeAddressModal}
                address={addressModal.editIndex !== null ? addresses[addressModal.editIndex] : undefined}
                cpf={cpf ? cpf : undefined}
                onUpdateAddress={handleSaveAddress}
            />

            <Table striped hover>
                <thead>
                <tr>
                    <th>Endereços</th>
                    <th className="col-1">
                        <Button onClick={() => openAddressModal(null)}> + </Button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {addresses.map((address) => (
                    <tr key={address.id}>
                        <td onClick={() => openAddressModal(addresses.findIndex(addr => addr.id === address.id))}>
                            {address.apelidoEndereco || `Endereço ${addresses.findIndex(addr => addr.id === address.id) + 1}`}
                        </td>
                        <td>
                            <Button variant="danger" className="ri-delete-bin-5-fill" onClick={() => handleDeleteAddress(address)} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
};

export default AddressList;