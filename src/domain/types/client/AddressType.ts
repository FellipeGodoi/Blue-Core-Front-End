import {TipoLogradouro} from "../../enums/TipoLogradouro.ts";
import {TipoResidencial} from "../../enums/TipoResidencial.ts";

export class Address {
    id?: number;
    apelidoEndereco: string;
    cep: string;
    numero: string;
    estado: string;
    cidade: string;
    tipoLogradouro: TipoLogradouro;
    logradouro: string;
    tipoResidencial: TipoResidencial;
    bairro: string;
    complemento: string;

    constructor(
        apelidoEndereco: string,
        cep: string,
        numero: string,
        estado: string,
        cidade: string,
        tipoLogradouro: TipoLogradouro,
        logradouro: string,
        tipoResidencial: TipoResidencial,
        bairro: string,
        complemento: string,
        id?: number,
    ) {
        this.id = id;
        this.apelidoEndereco = apelidoEndereco;
        this.cep = cep;
        this.numero = numero;
        this.estado = estado;
        this.cidade = cidade;
        this.tipoLogradouro = tipoLogradouro;
        this.logradouro = logradouro;
        this.tipoResidencial = tipoResidencial;
        this.bairro = bairro;
        this.complemento = complemento;
    }
}
