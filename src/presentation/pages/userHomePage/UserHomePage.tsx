import {useEffect, useState} from "react";
import {IShopCardProcessor} from "../../../domain/types/product/InterfaceCardProcessor.tsx";
import AxiosClient from "../../../api/axios/AxiosClient.ts";
import ShopCardProcessor from "../../components/productCart/ShopCardProcessor.tsx";
import {Button} from "react-bootstrap";
import BrandFilter from "../../components/filtros/BrandFilter.tsx";


export default function UserHomePage() {

    const [searchQuery] = useState<string | null>("");
    const [socketModel, setSocketModel] = useState<string | null>("");
    const [gpuModel, setGpuModel] = useState<string | null>("");
    const [hasIntegratedGrafics, setHasIntegratedGrafics] = useState<boolean | null>(null);
    const [brand, setBrand] = useState<string | null>("");
    const [size, setSize] = useState<number>(9);
    const [limit, setLimit] = useState<boolean>(false);

    const [urlProduto, setUrlProduto] = useState<string>("");
    const [produtos, setProdutos] = useState<IShopCardProcessor[]>([]);

    const loadMoreProducts = () => {
        setSize(prevValue => prevValue + 6)
    }

    const limparFiltro = () => {
        setSocketModel("");
        setGpuModel("");
        setHasIntegratedGrafics(null);
        setBrand("");
        setSize(6)
        setLimit(false)
    }

    useEffect(() => {
        const params: Record<string, string> = {};
        if (socketModel) params["socketModel"] = socketModel;
        if (gpuModel) params["gpuModel"] = gpuModel;
        if (hasIntegratedGrafics !== null) params["hasIntegratedGraphics"] = String(hasIntegratedGrafics);
        if (brand) params["brand"] = brand;
        if (searchQuery) params["searchQuery"] = searchQuery;
        params["size"] = String(size);

        const queryString = new URLSearchParams(params).toString();
        setUrlProduto(`/processors?${queryString}`);
    }, [socketModel, gpuModel, hasIntegratedGrafics, brand, searchQuery, size]);

    console.log(produtos);
    useEffect(() => {
        const buscaProdutos = async () => {
            try {
                const response = await AxiosClient.get(urlProduto);
                setProdutos(response.data.content);
                setLimit(response.data.last);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };

        if (urlProduto) {
            buscaProdutos();
        }
    }, [urlProduto]);

    return (
        <div>
            <div className="container-lg d-flex justify-content-between gap-1 mb-3">
                <div className="d-none d-md-flex justify-content-start col-3 border row">
                    <div className="align-items-center">
                        <BrandFilter brand={brand} setBrand={(value) => setBrand(value)} />
                        <Button className="px-5 text-center" id="limparFiltros" onClick={limparFiltro} style={{
                            backgroundColor: "var(--cinza-escuro)",
                            border: "none",
                            maxHeight: "50px",
                            width: "100%"
                        }}> Limpar Filtros </Button>

                    </div>
                </div>
                <div className="d-flex col-lg-9 justify-content-center border flex-wrap gap-md-3">
                    {produtos.length > 0 ? (
                        produtos.map((produto) => (
                            <ShopCardProcessor key={produto.codigo} processor={produto}/>
                        ))
                    ) : (
                        <h3>Nenhum produto com esses parametros</h3>
                    )}


                </div>
            </div>
            <div className="container d-flex justify-content-center mb-3">
               {
                   !limit &&(
                       <Button className="fw-bold px-5" id="MaisProdutos" style = {{backgroundColor : "var(--azul-principal", border: "none"}} onClick={() => loadMoreProducts()}>
                           Mais produtos
                       </Button>
                   )
               }
           </div>
        </div>
    )
}

// /processors?hasIntegratedGraphics=&brand=AMD&searchQuery=3&sortBy=price_asc&size=5
// <iframe
//     src="https://typebot.co/my-typebot-pi35kr4"
//     style={{border: "none", width: "100%", height: "600px"}}
// ></iframe>