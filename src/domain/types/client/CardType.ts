export class Card {
    id?: string;
    apelidoCartao: string;
    numeroCartao: string;
    bandeira: string;
    vencimentoDoCartao: Date;
    nomePresenteNoCartao: string;
    codigoSeguranca: string;

    constructor(
        apelidoCartao: string,
        numeroCartao: string,
        bandeira: string,
        vencimentoDoCartao: string | Date,
        nomePresenteNoCartao: string,
        codigoSeguranca: string,
        id?: string,
    ) {
        this.id = id;
        this.apelidoCartao = apelidoCartao;
        this.numeroCartao = numeroCartao;
        this.bandeira = bandeira;
        this.vencimentoDoCartao = typeof vencimentoDoCartao === "string" ? new Date(vencimentoDoCartao): vencimentoDoCartao;
        this.nomePresenteNoCartao = nomePresenteNoCartao;
        this.codigoSeguranca = codigoSeguranca;
    }
}
