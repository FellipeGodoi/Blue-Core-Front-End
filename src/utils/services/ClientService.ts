import AxiosClient from "../../api/axios/AxiosClient.ts";
import {Client} from "../../domain/types/client/ClienteTypes.ts";
import {SimpleClient} from "../../domain/types/client/SimplifiedClient.ts";

export const createClientService = async (client: Client) => {
    try {
        const url = `clients`;
        const response = await AxiosClient.post(url, client);

        if (response.status === 201) {
            console.log('Cliente criado com sucesso:', response.data);
            return response.data;
        } else {
            console.error('Erro ao criar cliente:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Erro ao tentar criar cliente:', error);
    }
};

export const updateClientService = async (client: Client) => {
    try {
        const url = `clients/cpf/${client.cpf}`;
        const response = await AxiosClient.put(url, client);

        if (response.status === 200) {
            console.log('Cliente atualizado com sucesso:', response.data);
            return response.data;
        } else {
            console.error('Erro ao atualizar cliente:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Erro ao tentar atualizar cliente:', error);
    }
};

export const deleteClientService = async (cpf: string) => {
    try {
        const url = `clients/cpf/${cpf}`;
        const response = await AxiosClient.delete(url);

        if (response.status === 204) {
            console.log('Cliente deletado com sucesso');
            return true;
        } else {
            console.error('Erro ao deletar cliente:', response.status, response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Erro ao tentar deletar cliente:', error);
        return false;
    }
};

export const getAllClients = async (filter: string = "") => {
    try {
        const url = filter ? `clients?filter=${filter}` : 'clients';
        const response = await AxiosClient.get(url);

        if (response.status === 200) {
            console.log('Clientes recebidos com sucesso:', response.data);
            return response.data as SimpleClient[];
        } else {
            console.error('Erro ao buscar clientes:', response.status, response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Erro ao tentar buscar clientes:', error);
        return null;
    }
};
