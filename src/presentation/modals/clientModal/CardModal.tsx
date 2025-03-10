import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import NumberInput from "../../components/inputs/NumberInput.tsx";
import TextField from "../../components/inputs/TextField.tsx";
import PasswordField from "../../components/inputs/PasswordField.tsx";
import { createCardService, updateCardService } from "../../../utils/services/CardService.ts";
import {Card} from "../../../domain/types/client/CardType.ts";
import {CardBrands} from "../../../domain/enums/CardBrand.ts";
import SelectEnumField from "../../components/inputs/EnumSelect.tsx";
import DateField from "../../components/inputs/DateInput.tsx";

type CardModalProps = {
    open: boolean;
    close: () => void;
    card?: Card;
    cpf?: string;
    onSave: (card: Card) => void;
};

const CardModal: React.FC<CardModalProps> = ({ open, close, card, cpf, onSave }) => {
    const [id, setId] = useState<string | undefined>(card?.id);
    const [numeroCartao, setNumeroCartao] = useState<string>(card?.numeroCartao || "");
    const [nomePresente, setNomePresente] = useState<string>(card?.nomePresenteNoCartao || "");
    const [cardBrand, setCardBrand] = useState<CardBrands | string>(card?.bandeira || "");
    const [codigoSeguranca, setCodigoSeguranca] = useState<string>(card?.codigoSeguranca || "");
    const [apelido, setApelido] = useState<string>(card?.apelidoCartao || "");
    const [vencimentoDoCartao, setVencimentoDoCartao] = useState<Date | null>(null)

    useEffect(() => {
        if (card) {
            setId(card.id);
            setNumeroCartao(card.numeroCartao);
            setNomePresente(card.nomePresenteNoCartao);
            setCardBrand(card.bandeira);
            setCodigoSeguranca(card.codigoSeguranca);
            setApelido(card.apelidoCartao);
            setVencimentoDoCartao(card.vencimentoDoCartao ? new Date(card.vencimentoDoCartao) : null);
        }
    }, [card]);

    const cancel = () => {
        setId(undefined);
        setNumeroCartao("");
        setNomePresente("");
        setCardBrand("");
        setCodigoSeguranca("");
        setApelido("");
        setVencimentoDoCartao(null);

        close();
    };

    const handleSave = async () => {
        const newCard : Card = ({
            id,
            apelidoCartao: apelido,
            numeroCartao,
            bandeira: cardBrand as string,
            vencimentoDoCartao: vencimentoDoCartao || new Date(),
            nomePresenteNoCartao: nomePresente,
            codigoSeguranca,
        });

        if (card?.id) {
            const updatedCard = await updateCardService(newCard);
            if (updatedCard) {
                onSave(updatedCard);
            }
        } else if (cpf) {
            const createdCard = await createCardService(newCard, cpf);
            if (createdCard) {
                onSave(createdCard);
            }
        }

        cancel();
    };

    return (
        <>
            <Modal show={open} onHide={cancel} backdrop="static">
                <Modal.Header closeButton>
                    {card ? `Editar ${card.apelidoCartao}` : "Cadastrar novo cartão"}
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <NumberInput
                            id="numeroCartao"
                            label="Número do cartão"
                            saveNumber={setNumeroCartao}
                            number={numeroCartao || ""}
                            maxLength={16}
                        />
                        <TextField
                            id="apelidoCartao"
                            label="Apelido do cartão"
                            saveText={setApelido}
                            text={apelido || ""}
                        />
                        <TextField
                            id="nomePresenteNoCartao"
                            label="Nome presente no cartão"
                            saveText={setNomePresente}
                            text={nomePresente || ""}
                        />
                        <PasswordField
                            id="codigoSeguranca"
                            label="Código de segurança"
                            savePassword={setCodigoSeguranca}
                            password={codigoSeguranca || ""}
                        />
                        <SelectEnumField
                            id="bandeira"
                            label="Bandeira"
                            saveValue={setCardBrand}
                            selectedValue={cardBrand}
                            enumClass={CardBrands}

                        />
                        <div className="form-group">
                            <label htmlFor="vencimentoDoCartao">Vencimento (Mês/Ano)</label>
                            <DateField
                                id="vencimentoDoCartao"
                                label="Vencimento do Cartao"
                                saveDate={(date) => setVencimentoDoCartao(date ? new Date(date) : null)} date={vencimentoDoCartao?.toISOString().split('T')[0] || ""}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancel}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        {card ? "Salvar" : "Adicionar"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CardModal;
