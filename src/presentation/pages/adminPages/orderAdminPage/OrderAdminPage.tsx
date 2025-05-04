import {OrderGet} from "../../../../domain/types/order/OrderType.ts";
import {useEffect, useState} from "react";
import axiosClient from "../../../../api/axios/AxiosClient.ts";
import {OrderStatus} from "../../../../domain/enums/OrderStatus.ts";
import {Container} from "react-bootstrap";
import OrderModal from "../../../modals/orderModal/OrderModal.tsx";

export default function OrderAdminPage() {
    const [order, setOrder] = useState<OrderGet[]>([]);
    const [orderStatus, setOrderStatus] = useState<OrderStatus>(OrderStatus.EM_PROCESSAMENTO);
    const [searchId, setSearchId] = useState<string>("");
    const [searchingById, setSearchingById] = useState<boolean>(false);

    useEffect(() => {
        if (searchingById) return;

        const searchOrdersByStatus = async () => {
            try {
                const resp = await axiosClient.get(`/orders/status/${orderStatus}`);
                setOrder(resp.data);
            } catch (error) {
                console.log(error);
            }
        };

        searchOrdersByStatus();
    }, [orderStatus, searchingById]);

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOrderStatus(e.target.value as OrderStatus);
        setSearchingById(false);
    };

    const handleSearchIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchId(e.target.value);
    };

    const handleSearchById = async () => {
        if (!searchId) return;

        try {
            const resp = await axiosClient.get(`/orders/${searchId}`);
            setOrder([resp.data]);
            setSearchingById(true);
        } catch (error) {
            console.log("Pedido não encontrado ou erro:", error);
            setOrder([]);
        }
    };

// modal config -------------------------------------------------------------------

    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = (orderId: number) => {
        setSelectedOrderId(orderId);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedOrderId(null);
    };

    return (
        <>
        <Container>
            <div className="mb-3 d-flex gap-2 align-items-end">
                <div>
                    <label htmlFor="status-select" className="form-label fw-bold">Selecionar status:</label>
                    <select
                        id="status-select"
                        className="form-select "
                        value={orderStatus}
                        onChange={handleStatusChange}
                        disabled={!!searchId}
                    >
                        {Object.values(OrderStatus).map((status) => (
                            <option key={status} value={status}>
                                {status.replace(/_/g, " ")}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="search-id" className="form-label fw-bold" >Buscar por ID:</label>
                    <input
                        id="search-id"
                        type="number"
                        className="form-control"
                        value={searchId}
                        onChange={handleSearchIdChange}

                    />
                </div>

                <button className="btn text-white" style={{ backgroundColor: "var(--azul-principal)" }} onClick={handleSearchById}>Buscar</button>
            </div>

            <table className="table table-striped ">
                <thead className="table-dark" >
                <tr >
                    <th style={{ backgroundColor: "var(--azul-principal)" }}>ID</th>
                    <th style={{ backgroundColor: "var(--azul-principal)" }}>Data</th>
                    <th style={{ backgroundColor: "var(--azul-principal)" }}>CPF do Cliente</th>
                    <th style={{ backgroundColor: "var(--azul-principal)" }}>Preço</th>
                </tr>
                </thead>
                <tbody>
                {order.length > 0 ? (
                    order.map((order) => (
                        <tr key={order.orderId} onClick={() => openModal(order.orderId)} style={{ cursor: "pointer" }}>
                            <td>{order.orderId}</td>
                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                            <td>{order.clientCPF}</td>
                            <td>R$ {order.totalAmount.toFixed(2)}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={4} className="text-center">Nenhum pedido encontrado.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </Container>
            <OrderModal
                show={modalOpen}
                onClose={closeModal}
                orderId={selectedOrderId}
            />
        </>
    );
}