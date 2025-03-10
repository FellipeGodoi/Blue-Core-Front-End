import {TipoTelefone} from "../../enums/TipoTelefone.ts";

export class Phone {
    phoneId?: string;
    phoneName: string;
    areaCode: string;
    phoneNumber: string;
    phonetype: TipoTelefone;

    constructor(
        phoneName: string,
        areaCode: string,
        phoneNumber: string,
        phonetype: TipoTelefone,
        phoneId?: string,
    ) {
        this.phoneId = phoneId;
        this.phoneName = phoneName;
        this.areaCode = areaCode;
        this.phoneNumber = phoneNumber;
        this.phonetype = phonetype;
    }
}
