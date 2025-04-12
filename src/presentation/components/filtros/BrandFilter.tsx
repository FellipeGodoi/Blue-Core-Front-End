interface Props {
    brand: string | null;
    setBrand: (brand: string) => void;
}

export default function BrandFilter({ brand, setBrand }: Props) {
    return (
        <div className="mb-3">
            <h5>Marca</h5>
            <div className="d-flex flex-column gap-2">
                <button
                    className={`btn ${brand === "AMD" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setBrand("AMD")}
                >
                    AMD
                </button>
                <button
                    className={`btn ${brand === "Intel" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setBrand("Intel")}
                >
                    Intel
                </button>
            </div>
        </div>
    );
}
