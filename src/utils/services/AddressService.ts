
import AxiosClient from "../../api/axios/AxiosClient.ts";
import {Address} from "../../domain/types/client/AddressType.ts";

export const createAddressService = async (address: Address, clientID: string) => {
    try {
        const url = `address/${clientID}`;
        const response = await AxiosClient.post(url,address );

        if (response.status === 200) {
            console.log('Endereço cadastrado com sucesso:', response.data);
            return response.data;
        } else {
            console.error('Erro ao cadastrar endereço, verificar dados')
        }
    }catch(error){
        console.error(error);
    }
}

export const updateAddressService = async (address: Address) => {
    try{
        const url = `address/${address.id}`
        const response = await AxiosClient.put(url, address);

        if (response.status === 200) {
            console.log('Endereço Atualizado com sucesso:', response.data);
            return response.data;
        } else {
            console.error('Erro ao Atualizar endereço, verificar dados')
        }
    }catch(error){
        console.error( error);
    }
}

export const deleteAddressService = async (address: Address) => {
    try{
        const url = `address/${address.id}`
        const response = await AxiosClient.delete(url);

        if (response.status === 204) {
            console.log('endereço deletado com sucesso');
            return true;
        } else {
            console.error('Erro ao deletar endereço:', response.status, response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Erro ao tentar deletar endereço:', error);
        return false;
    }
}