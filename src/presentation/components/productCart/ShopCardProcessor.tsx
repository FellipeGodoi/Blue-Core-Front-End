import { IShopCardProcessor } from "../../../domain/types/product/InterfaceCardProcessor.tsx";
import i3 from "../../../data/images/productImages/I3.png";
import i5 from "../../../data/images/productImages/i5.png";
import i7 from "../../../data/images/productImages/intel-i7.png";
import i9 from "../../../data/images/productImages/intel-i9.png";
import ryzen3 from "../../../data/images/productImages/Ryzen3.png";
import ryzen5 from "../../../data/images/productImages/Ryzen5.png";
import ryzen7 from "../../../data/images/productImages/Ryzen7.png";
import ryzen9 from "../../../data/images/productImages/Ryzen9.png";

import "./StyleCardShop.css"
import {toMoneyFormat} from "../../../utils/functions/FormatosNumericos.ts";
import {Link} from "react-router-dom";

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

type Props = {
    processor: IShopCardProcessor;
};

const ShopCardProcessor: React.FC<Props> = ({ processor }) => {

    const imageUrl = getImageUrl(processor.linha);

    const desconto = Math.floor(((processor.precoOriginal - processor.precoVenda) / processor.precoOriginal) * 100);

    return (
        <div className="border shadow col-12 col-md-3 d-flex flex-md-column rounded gap-2 me-md-5 justify-content-between align-itens-bottom">
            <Link to={`/produto/${processor.codigo}`} className="text-decoration-none">
                <div className="descontoCardProcessor d-none d-md-flex justify-content-center rounded-top mb-2"> - {desconto}% OFF</div>
                { !processor.podeSerVendido && (
                    <span className="badge d-flex justify-content-center m-2" style={{backgroundColor: "var(--cinza-escuro)"}}>
                        Produto indisponivel no momento
                    </span>
                )}

                <div className="d-flex flex-column justify-content-center align-items-md-center mb-2">
                    {imageUrl ? <img className="imageCardShop" src={imageUrl} alt={processor.linha} /> : 'Imagem não disponível'}
                </div>
                <div className="modeloCardWrapper px-4">
                    <p className="modeloCardProcessor fs-5">{processor.modelo}</p>
                </div>
                <div className="px-4 d-flex flex-column mb-2 justify-content-between align align-items-md-end">
                    <span>de <span className="precoOriginalCardProcessor">{toMoneyFormat(processor.precoOriginal)}</span> por </span>
                    <span className="precoCardProcessor fs-5">{toMoneyFormat(processor.precoVenda)} à vista</span>
                </div>
            </Link>
        </div>
    );
};

export default ShopCardProcessor;
