interface IGPU {
    id: number;
    modelo: string;
    clockBase: number;
    clockUnit: number;
}

interface ISocket {
    id: number;
    modelo: string;
}

export interface IProcessor {
    id: number;
    modelo: string;
    linha: string;
    codigo: string;
    precoOriginal: number;
    precoVenda: number;
    clockBase: number;
    clockMax: number;
    estoque: number;
    nucleos: number;
    threads: number;
    cacheL2: number;
    cacheL3: number;
    tdp: number;
    pci: string;
    arquiteturaContrucao: string;
    arquiteturaBits: string;
    memorias: string;
    desbloqueado: boolean;
    cooler: boolean;
    podeSerVendido: boolean;
    brand: string;
    gpu?: IGPU; // opcional
    socket: ISocket;
}
