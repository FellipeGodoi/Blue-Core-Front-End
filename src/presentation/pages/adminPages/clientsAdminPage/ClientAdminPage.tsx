import {useEffect, useState} from "react";
import {SimpleClient} from "../../../../domain/types/client/SimplifiedClient.ts";
import AxiosClient from "../../../../api/axios/AxiosClient.ts";
import ClientModal from "../../../modals/clientModal/ClientModal.tsx";
import {Container, InputGroup,  Form, Table, Button} from "react-bootstrap";

export default function ClientAdminPage() {

    const [clients, setClients] = useState<SimpleClient[]>([]);
    const [filtro, setFiltro] = useState<string>("");
    const [modalClient, setModalClient] = useState<{
        show: boolean;
        editIndex: number | null;
    }>({ show: false, editIndex: null });


    useEffect(() => {
        const fetchClients = async () => {
            try {
                const resp = await AxiosClient.get(`clients?filter=` + encodeURIComponent(filtro));
                setClients(resp.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchClients();
    }, [filtro, modalClient]);

    const openModal = (index: number | null) => {
        setModalClient({
            show: true,
            editIndex: index,
        });
    };

    const closeModal = () => {
        setModalClient({
            show: false,
            editIndex: null,
        });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFiltro(e.target.value);
    };

    return (
        <>
            <div className="d-flex flex-column justify-content-center">
                <ClientModal
                    open={modalClient.show}
                    close={closeModal}
                    cpfCliente={modalClient.editIndex !== null ? clients[modalClient.editIndex].cpf : undefined}
                />
                <Container className="align-middle">
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Busque por nome ou cpf"
                            id="searchClient"
                            value={filtro}
                            onChange={handleSearchChange}
                        />
                        <Button className="search-button" id="button-searchClient">
                            Buscar
                        </Button>
                    </InputGroup>
                    <Table hover striped responsive="lg" className=" table-client w-100">
                        <thead className="client-table-head">
                        <tr>
                            <th className="col-3 align-middle">CPF</th>
                            <th className="col-6 align-middle">Nome</th>
                            <th className="col-3">
                                <Button className="w-100 cad-client-button fw-bold" onClick={() => openModal(null)}>
                                    Cadastrar Cliente
                                </Button>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="client-table-row">
                        {clients.map((client, index) => (
                            <tr key={index} className="align-middle">
                                <td className="" onClick={() => openModal(index)}>
                                    {client.cpf}
                                </td>
                                <td colSpan={2} onClick={() => openModal(index)}>{client.name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Container>
            </div>
        </>
    )
}