import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IProcessor} from "../../../domain/types/product/InterfaceProduct.ts";
import "./StyleProductPage.css"
import axiosClient from "../../../api/axios/AxiosClient.ts";
import i3 from "../../../data/images/productImages/I3.png";
import i5 from "../../../data/images/productImages/i5.png";
import i7 from "../../../data/images/productImages/intel-i7.png";
import i9 from "../../../data/images/productImages/intel-i9.png";
import ryzen3 from "../../../data/images/productImages/Ryzen3.png";
import ryzen5 from "../../../data/images/productImages/Ryzen5.png";
import ryzen7 from "../../../data/images/productImages/Ryzen7.png";
import ryzen9 from "../../../data/images/productImages/Ryzen9.png";
import {Container} from "react-bootstrap";
import {addToCart} from "../../../utils/services/CartService.ts";


const processorImages: { [key: string]: string } = {
    'i3': i3,
    'i5': i5,
    'i7': i7,
    'i9': i9,
    'ryzen3': ryzen3,
    'ryzen5': ryzen5,
    'ryzen7': ryzen7,
    'ryzen9': ryzen9,
};

const getImageUrl = (series: string) => {
    return processorImages[series.toLowerCase()] || '';
};

export default function ProductPage() {
    const {code} = useParams<{ code: string }>();
    const [processor, setProcessor] = useState<IProcessor | null>(null)

    useEffect(() => {
        const searchProduct = async () => {
            try {
                const resp = await axiosClient.get(`/processors/barcode/${code}`)
                setProcessor(resp.data)
                console.log(resp.data)
            } catch (error) {
                console.error(error)
            }
        }
        searchProduct();
    }, [code])

    const [qtd, setQtd] = useState<number>(1);

    const handleAdd = () => {
        if (!processor?.id) {
            alert("Produto inválido. ID não encontrado.");
            return;
        }

        addToCart(
            processor.id,
            qtd,
        );
    };


    return (
        processor ? (
            <Container className="d-flex flex-column mt-5 ">
                <div className="d-flex flex-column flex-md-row justify-content-between mb-2 gap-1">
                    <div className="d-flex justify-content-center align-items-md-center col-md-6">
                        <img
                            className="imageProcessor"
                            src={getImageUrl(processor.linha)}
                            alt={processor.linha}
                            style={{ height: "50vh" }}

                        />
                    </div>

                    <div className="col-md-5 shadow rounded p-4 m-3 bg-white d-flex flex-column justify-content-between">
                        <div>
                            <h3 className="fw-bold  processor-model">{processor.modelo}</h3>

                            <div className="d-flex justify-content-between text-muted mb-2">
                                <span>{processor.brand}</span>
                                <span>Estoque: {processor.estoque} unidades</span>
                            </div>
                        </div>

                        <hr style={{ borderTop: "1px dotted var(--cinza-escuro)" }} />

                        <p className="text-secondary small">
                            codigo: {processor.codigo}
                        </p>

                        <div className="mb-2 text-end">
                            <p className="text-muted text-decoration-line-through mb-0" style={{ fontSize: '0.9rem' }}>
                                de R$ {processor.precoOriginal.toFixed(2)}
                            </p>
                            <p className="text-success fw-bold mb-0">por apenas</p>
                            <p className="text-success fs-4 fw-bold">R$ {processor.precoVenda.toFixed(2)}</p>
                        </div>

                        <div className="d-grid gap-2">
                            <div className="d-flex gap-4 align-items-center">
                                <p>
                                    Quantidade
                                </p>
                                <input
                                    type="number"
                                    min="1"
                                    value={qtd}
                                    onChange={(e) => setQtd(Number(e.target.value))}
                                    className="form-control mb-2"
                                    placeholder="Quantidade"
                                    style={{ textAlign: "center" }}
                                />
                            </div>
                            <button className="btn btn-success" onClick={handleAdd}>
                                Adicionar ao carrinho
                            </button>
                            <button className="btn btn-success">Comprar</button>
                        </div>
                    </div>
                </div>

                <div className="specs-card p-4 rounded">
                    <h5 className="fw-bold mb-4">Ficha técnica</h5>
                    <table className="table  specs-table">
                        <tbody>
                        <tr>
                            <td>Modelo</td>
                            <td className="text-end">{processor.modelo}</td>
                        </tr>
                        <tr>
                            <td>Marca</td>
                            <td className="text-end">{processor.brand}</td>
                        </tr>
                        <tr>
                            <td>Socket</td>
                            <td className="text-end">{processor.socket.modelo}</td>
                        </tr>
                        <tr>
                            <td>Linha</td>
                            <td className="text-end">{processor.linha}</td>
                        </tr>
                        <tr>
                            <td>Memoria</td>
                            <td className="text-end">{processor.memorias}</td>
                        </tr>
                        <tr>
                            <td>Cache L2:</td>
                            <td className="text-end">{processor.cacheL2} MB</td>
                        </tr>
                        <tr>
                            <td>Cache L3:</td>
                            <td className="text-end">{processor.cacheL3} MB</td>
                        </tr>

                        <tr>
                            <td>Clock base</td>
                            <td className="text-end">{processor.clockBase} GHz</td>
                        </tr>

                        <tr>
                            <td>Clock turbo</td>
                            <td className="text-end">{processor.clockMax} GHz</td>
                        </tr>
                        <tr>
                            <td>Núcleos</td>
                            <td className="text-end">{processor.nucleos} </td>
                        </tr>
                        <tr>
                            <td>Threads</td>
                            <td className="text-end">{processor.threads} </td>
                        </tr>
                        <tr>
                            <td>TDP</td>
                            <td className="text-end">{processor.tdp} W</td>
                        </tr>
                        <tr>
                            <td>Pci</td>
                            <td className="text-end">{processor.pci}</td>
                        </tr>
                        <tr>
                            <td>Arquitetura construção</td>
                            <td className="text-end">{processor.arquiteturaContrucao}</td>
                        </tr>
                        <tr>
                            <td>Arquitetura Bits</td>
                            <td className="text-end">{processor.arquiteturaBits}</td>
                        </tr>

                        <tr>
                            <td>Desbloqueado</td>
                            <td className="text-end">{processor.desbloqueado ? "Sim" : "Não"}</td>
                        </tr>
                        <tr>
                            <td>Cooler</td>
                            <td className="text-end">{processor.cooler ? "Sim" : "Não"}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                {processor.gpu && (
                    <div>
                        {processor.gpu.id}
                        <div className="specs-card p-4 rounded">
                            <h5 className="fw-bold mb-4">GPU</h5>
                            <table className="table  specs-table">
                                <tbody>
                                <tr>
                                    <td>Modelo</td>
                                    <td className="text-end">{processor.gpu.modelo}</td>
                                </tr>
                                <tr>
                                    <td>Clock Base</td>
                                    <td className="text-end">{processor.gpu.clockBase}</td>
                                </tr>
                                <tr>
                                    <td>Unidades graficas</td>
                                    <td className="text-end">{processor.gpu.clockUnit}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </Container>
        ) : (
            <div>
                produto não encontrado
            </div>
        )
    )
}