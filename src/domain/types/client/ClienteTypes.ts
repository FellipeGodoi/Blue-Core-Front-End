import {Genero} from "../../enums/Genero.ts";
import {Address} from "./AddressType.ts";
import {Phone} from "./PhoneTypes.ts";
import {Card} from "./CardType.ts";

export class Client {
    idClient?: string;
    cpf: string;
    emailClient: string;
    nameClient: string;
    birthDate: Date;
    password: string;
    isActive: boolean;
    gender: string;
    addresses?: Address[];
    cards?: Card[];
    phones?: Phone[];

    constructor(
        cpf: string,
        emailClient: string,
        nameClient: string,
        birthDate: string | Date,
        password: string,
        gender: Genero,
        isActive: boolean,
        idClient?: string,
        addresses?: Address[],
        cards?: Card[],
        phones?: Phone[]
    ) {
        this.idClient = idClient;
        this.cpf = cpf;
        this.emailClient = emailClient;
        this.nameClient = nameClient;
        this.birthDate = typeof birthDate === "string" ? new Date(birthDate) : birthDate;
        this.password = password;
        this.isActive = isActive;
        this.gender = gender;
        this.addresses = addresses;
        this.cards = cards;
        this.phones = phones;
    }
}



