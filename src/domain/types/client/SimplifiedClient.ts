export class SimpleClient {
    idClient: string;
    cpf: string;
    name: string;

    constructor(idClient: string,
                cpf: string,
                name: string,
                ) {
        this.idClient = idClient;
        this.cpf = cpf;
        this.name = name;
    }
}