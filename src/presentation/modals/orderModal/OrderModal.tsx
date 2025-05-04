import { Modal, Button } from "react-bootstrap";
import {Order} from "../../../domain/types/order/OrderType.ts";
import {useEffect, useState} from "react";
import axiosClient from "../../../api/axios/AxiosClient.ts";
import {OrderStatus} from "../../../domain/enums/OrderStatus.ts";

type OrderModalProps = {
    show: boolean;
    onClose: () => void;
    orderId: number | null;
};

export default function OrderModal({ show, onClose, orderId }: OrderModalProps) {
    const [order, setOrder] = useState<Order>();

    useEffect(() => {
        if (orderId) {
            const buscarPedido = async () => {
                try {
                    const resp = await axiosClient.get(`/orders/${orderId}`);
                    setOrder(resp.data);
                    setNewStatus(resp.data.status);
                }
                catch (error) {
                    console.log(error);
                }
            }
            buscarPedido();
        }
    }, [orderId])

    const [showProducts, setShowProducts] = useState(false);
    const toggleProducts = () => setShowProducts(!showProducts);

    const [newStatus, setNewStatus] = useState<OrderStatus | "">("");

    const atualizarStatus = async () => {
        if (!order) return;

        try {
            await axiosClient.patch(`/orders/${order.id}/status`, null, {
                params: { newStatus }
            });
            alert("Status atualizado com sucesso!");
            onClose();
        } catch (error) {
            console.error(error);
            alert("Erro ao atualizar status.");
        }
    };

    return (
        <Modal className="modal-xl" show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Detalhes do Pedido</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {order? (
                    <>
                        <div>
                            <div className="d-flex justify-content-between">
                                <p>Codigo do pedido: <strong>{order.id}</strong></p>
                                <p>Data do pedido: {new Date(order.orderDate).toLocaleDateString()}</p>
                                <p>Status do pedido: {order.status}</p>

                            </div>
                            <div className="d-flex justify-content-between">
                                <p>Cliente: {order.clientCPF}</p>
                                <p>Valor pago: R${order.totalAmount.toFixed(2)}</p>
                            </div>
                        </div>
                        <hr />
                        <h5>
                            Produtos{" "}
                            <button className="btn btn-sm btn-outline-primary ms-2" onClick={toggleProducts}>
                                {showProducts ? "Esconder Produtos" : "Mostrar Produtos"}
                            </button>
                        </h5>
                        {showProducts && (
                            <div className="mt-3">
                                {order.items.map((product, index) => (
                                    <div key={index} className="border-bottom py-2">
                                        <div className="d-flex justify-content-between">
                                            <strong>{product.productName}</strong>
                                            unidades: {product.quantity}<br />
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <small className="text-muted">id: {product.id}</small>
                                            <span>Valor unitário:<strong> R$ {product.productPriceAtOrder.toFixed(2)}</strong></span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {order.discountCouponId || order.refundCouponId && (
                            <div>
                                <h5>Cupons de desconto usados </h5>
                                <p>{order.discountCouponId}</p>
                                <p>{order.refundCouponId}</p>
                                <hr/>
                            </div>
                        )}

                        {order.paymentCards && (
                            <div className="mt-3">
                                <h5>Cartões usados</h5>
                                {order.paymentCards.map((card) => (
                                    <>

                                        <div className="d-flex justify-content-between">
                                            <p>Numero cartão: {card.cardNumber}</p>
                                            <p>Total Pago: <strong>  R$ {card.amountPaid.toFixed(2)}</strong></p>
                                        </div>
                                    </>
                                )) }
                            </div>


                        )}
                        <div>
                            <h5>Endereço de entrega</h5>
                            <div className="d-flex justify-content-between">
                                <p>Numero: {order.deliveryAddress.number}</p>
                                <p>CEP: {order.deliveryAddress.postalCode}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>Cidade: {order.deliveryAddress.city}</p>
                                <p>Estado: {order.deliveryAddress.state}</p>
                                <p>Rua: {order.deliveryAddress.street}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>Bairro: {order.deliveryAddress.neighborhood}</p>
                                <p>Complemento: {order.deliveryAddress.complement}</p>
                            </div>

                        </div>
                    </>
                ) : (
                    <p>Nenhum pedido selecionado.</p>
                )}

            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <div className="d-flex align-items-center gap-2">
                    <label htmlFor="status-select" className="mb-0">Status:</label>
                    <select
                        id="status-select"
                        className="form-select"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                    >
                        {Object.values(OrderStatus).map((status) => (
                            <option key={status} value={status}>
                                {status.replace(/_/g, " ")}
                            </option>
                        ))}
                    </select>
                    <Button variant="success" onClick={atualizarStatus}>Salvar</Button>
                </div>

                <Button variant="secondary" onClick={onClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
