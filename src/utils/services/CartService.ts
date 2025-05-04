import axiosClient from "../../api/axios/AxiosClient.ts";

export async function addToCart(processorId: number, qtd: number): Promise<void> {
    const cpf = "23456789012";
    const url = `cart/add?cpf=${cpf}&processorId=${processorId}&qtd=${qtd}`;

    try {
        const response = await axiosClient.post(url);
        console.log("Produto adicionado ao carrinho:", response.data);
        alert("Produto adicionado ao carrinho!");
    } catch (error) {
        console.error("Erro ao adicionar produto ao carrinho:", error);
        alert("Erro ao adicionar produto ao carrinho.");
    }
}