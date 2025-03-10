import AxiosClient from "../../api/axios/AxiosClient.ts";
import {Card} from "../../domain/types/client/CardType.ts";

export const createCardService = async (card: Card, cpf: string) => {
    try {
        const url = `card/${cpf}`;
        const response = await AxiosClient.post(url, card);

        if (response.status === 200) {
            console.log('Cartão cadastrado com sucesso:', response.data);
            return response.data;
        } else {
            console.error('Erro ao cadastrar cartão, verificar dados');
        }
    } catch (error) {
        console.error(error);
    }
}

export const updateCardService = async (card: Card) => {
    try {
        const url = `card/${card.id}`;
        const response = await AxiosClient.put(url, card);

        if (response.status === 200) {
            console.log('Cartão atualizado com sucesso:', response.data);
            return response.data;
        } else {
            console.error('Erro ao atualizar cartão, verificar dados');
        }
    } catch (error) {
        console.error(error);
    }
}

export const deleteCardService = async (card: Card) => {
    try {
        const url = `card/${card.id}`;
        const response = await AxiosClient.delete(url);

        if (response.status === 204) {
            console.log('Cartão deletado com sucesso');
            return true;
        } else {
            console.error('Erro ao deletar cartão:', response.status, response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Erro ao tentar deletar cartão:', error);
        return false;
    }
}
