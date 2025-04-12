import {ProcessorSeries} from "../../enums/ProcessorSerie.ts";

export interface IShopCardProcessor {
    codigo: string;
    modelo: string;
    linha:ProcessorSeries;
    precoVenda: number;
    precoOriginal: number;
    podeSerVendido: boolean;
}