import {IProcessor} from "../product/InterfaceProduct.ts";

export class CartType {
    id?: number;
    itens?: CartItem[];
    total?: number;
}

export class CartItem {
    id?: number;
    processor?: IProcessor;
    qtd?: number;
    precoTotal?: number;
    podeVender?: boolean;
}