import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { deleteCardService } from "../../../utils/services/CardService.ts";
import CardModal from "../../modals/clientModal/CardModal.tsx";
import {Card} from "../../../domain/types/client/CardType.ts";

type CardListProps = {
    cards: Card[];
    cpf: string | null;
    onUpdateCards: (updatedCards: Card[]) => void;
};

const CardList: React.FC<CardListProps> = ({ cards, cpf, onUpdateCards }) => {
    const [cardModal, setCardModal] = useState<{ show: boolean; editIndex: number | null }>({
        show: false,
        editIndex: null,
    });

    const openCardModal = (index: number | null) => {
        setCardModal({ show: true, editIndex: index });
    };

    const closeCardModal = () => {
        setCardModal({ show: false, editIndex: null });
    };

    const handleDeleteCard = async (card: Card) => {
        const result = await deleteCardService(card);
        if (result) {
            onUpdateCards(cards.filter((crd) => crd.id !== card.id));
        }
    };

    const handleSaveCard = (updatedCard: Card) => {
        if (cardModal.editIndex !== null) {
            const updatedCards = cards.map((card, index) => (index === cardModal.editIndex ? updatedCard : card));
            onUpdateCards(updatedCards);
        } else {
            onUpdateCards([...cards, updatedCard]);
        }
        closeCardModal();
    };

    return (
        <>
            {cardModal.show && <div className="overlay"></div>}
            <CardModal
                open={cardModal.show}
                close={closeCardModal}
                card={cardModal.editIndex !== null ? cards[cardModal.editIndex] : undefined}
                cpf={cpf ? cpf : undefined}
                onSave={handleSaveCard}
            />

            <Table striped hover>
                <thead>
                <tr>
                    <th>Cartões</th>
                    <th className="col-1">
                        <Button onClick={() => openCardModal(null)}> + </Button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {cards.map((card, index) => (
                    <tr key={index}>
                        <td onClick={() => openCardModal(index)}>{card.apelidoCartao || `Cartão ${index + 1}`}</td>
                        <td>
                            <Button variant="danger" className="ri-delete-bin-5-fill" onClick={() => handleDeleteCard(card)} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
};

export default CardList;