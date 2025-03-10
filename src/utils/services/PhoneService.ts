import AxiosClient from "../../api/axios/AxiosClient.ts";
import {Phone} from "../../domain/types/client/PhoneTypes.ts";

export const createPhoneService = async (phone: Phone, cpf: string) => {
    try {
        const url = `phone/${cpf}`;
        const response = await AxiosClient.post(url, phone);

        if (response.status === 200) {
            console.log('Telefone cadastrado com sucesso:', response.data);
            return response.data;
        } else {
            console.error('Erro ao cadastrar telefone, verificar dados');
        }
    } catch (error) {
        console.error(error);
    }
}

export const updatePhoneService = async (phone: Phone) => {
    try {
        const url = `phones/${phone.phoneId}`;
        const response = await AxiosClient.put(url, phone);

        if (response.status === 200) {
            console.log('Telefone atualizado com sucesso:', response.data);
            return response.data;
        } else {
            console.error('Erro ao atualizar telefone, verificar dados');
        }
    } catch (error) {
        console.error(error);
    }
}

export const deletePhoneService = async (phone: Phone) => {
    try {
        const url = `phones/${phone.phoneId}`;
        const response = await AxiosClient.delete(url);

        if (response.status === 204) {
            console.log('Telefone deletado com sucesso');
            return true;
        } else {
            console.error('Erro ao deletar telefone:', response.status, response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Erro ao tentar deletar telefone:', error);
        return false;
    }
}
