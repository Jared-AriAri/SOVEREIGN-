import React, { useState, useMemo } from "react";
import { products, Product, generateWhatsAppLink } from "@/data/products";

interface ProductCatalogProps {
  onAssessmentClick: () => void;
}

const categories = [
  { value: "all", label: "All Products" },
  { value: "home", label: "Home" },
  { value: "clinic", label: "Clinic" },
  { value: "community", label: "Community" },
  { value: "industrial", label: "Industrial" },
];

const capacityRanges = [
  { value: "all", label: "Any Capacity" },
  { value: "0-50", label: "0–50 L/day" },
  { value: "50-500", label: "50–500 L/day" },
  { value: "500-5000", label: "500–5,000 L/day" },
  { value: "5000+", label: "5,000+ L/day" },
];

const resolveProductImage = (product: Product) => {
  const m = String(product.model ?? "").toUpperCase();

  if (m.includes("GEN-L")) return "/GEN-L.png";
  if (m.includes("GEN-M-PRO") || m.includes("GEN M PRO") || m.includes("GEN-M PRO")) return "/GEN-M-PRO.png";
  if (m.includes("GEN-M1") || m.includes("GEN M1")) return "/GEN-M1.png";
  if (m.includes("GENNY+")) return "/GENNY+.png";

  return product.image;
};

const ProductCatalog: React.FC<ProductCatalogProps> = ({ onAssessmentClick }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeCapacity, setActiveCapacity] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (activeCategory !== "all" && p.category !== activeCategory) return false;
      if (activeCapacity !== "all") {
        const cap = p.capacityLitersDay;
        if (activeCapacity === "0-50" && cap > 50) return false;
        if (activeCapacity === "50-500" && (cap < 50 || cap > 500)) return false;
        if (activeCapacity === "500-5000" && (cap < 500 || cap > 5000)) return false;
        if (activeCapacity === "5000+" && cap < 5000) return false;
      }
      return true;
    });
  }, [activeCategory, activeCapacity]);

  const handleQuote = (product: Product) => {
    const msg = `Hello, I'm interested in the ${product.model} (${product.capacityLitersDay} L/day) for my community. Please provide pricing and availability information.`;
    window.open(generateWhatsAppLink(msg), "_blank");
  };

  return (
    <section id="products" className="relative py-16 md:py-24 bg-[#071A22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase text-[#00A99D] bg-[#00A99D]/10 rounded-full mb-4">
            Product Catalog
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F7F9FB] mb-4">Find Your Water Solution</h2>
          <p className="text-[#F7F9FB]/60 max-w-2xl mx-auto">
            From homes to large facilities — atmospheric water generation systems for every scale. Powered by Watergen
            GENius™ technology, distributed by Awanube.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  activeCategory === cat.value
                    ? "bg-[#0077C8] text-white shadow-lg shadow-[#0077C8]/20"
                    : "bg-[#0d2a35] text-[#F7F9FB]/60 hover:text-[#F7F9FB] hover:bg-[#0d2a35]/80 border border-[#0077C8]/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <select
            value={activeCapacity}
            onChange={(e) => setActiveCapacity(e.target.value)}
            className="px-4 py-2 text-sm bg-[#0d2a35] border border-[#0077C8]/10 text-[#F7F9FB]/70 rounded-full focus:border-[#00A99D] outline-none"
          >
            {capacityRanges.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => {
            const imgSrc = resolveProductImage(product);

            return (
              <div
                key={product.id}
                className="group relative bg-gradient-to-b from-[#0d2a35] to-[#091f28] border border-[#0077C8]/10 rounded-2xl overflow-hidden hover:border-[#0077C8]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0077C8]/5"
              >
                {product.badge && (
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 text-xs font-semibold bg-[#0077C8] text-white rounded-full">
                    {product.badge}
                  </div>
                )}

                <div className="relative h-56 overflow-hidden bg-[#071A22]">
                  <img
                    src={imgSrc}
                    alt={product.model}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d2a35] via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#00A99D] bg-[#00A99D]/10 rounded-full">
                      {product.categoryLabel}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#F7F9FB] mb-1">{product.model}</h3>
                  <p className="text-sm text-[#F7F9FB]/50 mb-4 line-clamp-2">{product.description}</p>

                  <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="text-center p-2 bg-[#071A22]/50 rounded-lg">
                      <div className="text-xs text-[#F7F9FB]/40 mb-1">Capacity</div>
                      <div className="text-sm font-semibold text-[#0077C8]">{product.capacityLitersDay} L/day</div>
                    </div>
                    <div className="text-center p-2 bg-[#071A22]/50 rounded-lg">
                      <div className="text-xs text-[#F7F9FB]/40 mb-1">Power</div>
                      <div className="text-sm font-semibold text-[#00A99D]">
                        {product.powerConsumptionW >= 1000
                          ? `${(product.powerConsumptionW / 1000).toFixed(1)} kW`
                          : `${product.powerConsumptionW} W`}
                      </div>
                    </div>
                    <div className="text-center p-2 bg-[#071A22]/50 rounded-lg">
                      <div className="text-xs text-[#F7F9FB]/40 mb-1">Tank</div>
                      <div className="text-sm font-semibold text-[#2BA84A]">
                        {product.storageTankLiters ? `${product.storageTankLiters} L` : "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="text-xs text-[#F7F9FB]/40 mb-2">Ideal for:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {product.idealFor.slice(0, 3).map((use, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-[10px] text-[#F7F9FB]/50 bg-[#F7F9FB]/5 rounded-full"
                        >
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 px-4 py-2.5 text-sm font-medium text-[#0077C8] border border-[#0077C8]/30 hover:bg-[#0077C8]/10 rounded-xl transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleQuote(product)}
                      className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-[#2BA84A] hover:bg-[#239E3F] rounded-xl transition-colors"
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#F7F9FB]/50">No products match your current filters. Try adjusting your selection.</p>
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductDetailPanel
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onQuote={handleQuote}
          onAssessment={onAssessmentClick}
        />
      )}
    </section>
  );
};

interface DetailPanelProps {
  product: Product;
  onClose: () => void;
  onQuote: (p: Product) => void;
  onAssessment: () => void;
}

const ProductDetailPanel: React.FC<DetailPanelProps> = ({ product, onClose, onQuote, onAssessment }) => {
  const specs = [
    { label: "Daily Capacity", value: `${product.capacityLitersDay} L/day (${product.capacityGallonsDay} gal/day)` },
    {
      label: "Storage Tank",
      value: product.storageTankLiters ? `${product.storageTankLiters} L` : "External tank recommended",
    },
    { label: "Power Consumption", value: `${product.powerConsumptionW} W` },
    { label: "Energy Efficiency", value: product.energyEfficiency },
    { label: "Humidity Range", value: product.operatingHumidityRange },
    { label: "Temperature Range", value: product.operatingTempRange },
    { label: "Dimensions", value: product.dimensions },
    { label: "Weight", value: product.weight },
    { label: "Noise Level", value: product.noiseLevel },
    { label: "Filtration", value: product.filtration },
    { label: "Water Temperature", value: product.waterTemp },
    { label: "Warranty", value: product.warranty },
  ];

  const imgSrc = resolveProductImage(product);

  return (
    <div className="fixed inset-0 z-[90] flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl bg-[#0d2a35] border-l border-[#0077C8]/20 overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slideInRight 0.3s ease-out" }}
      >
        <style>{`@keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>

        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right z-10 p-2 bg-[#071A22]/80 rounded-full text-[#F7F9FB]/60 hover:text-[#F7F9FB] transition-colors mr-4 mt-4"
          aria-label="Close panel"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="h-64 md:h-80 overflow-hidden">
          <img src={imgSrc} alt={product.model} className="w-full h-full object-cover" />
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-6">
            {product.badge && (
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-[#0077C8] text-white rounded-full mb-3">
                {product.badge}
              </span>
            )}
            <h2 className="font-display text-3xl font-bold text-[#F7F9FB] mb-2">{product.model}</h2>
            <span className="text-sm text-[#00A99D] font-medium">{product.categoryLabel}</span>
            <p className="mt-3 text-[#F7F9FB]/60 leading-relaxed">{product.description}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-semibold text-[#F7F9FB]/80 uppercase tracking-wider mb-3">Key Benefits</h3>
            <ul className="space-y-2">
              {product.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#F7F9FB]/65">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2BA84A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 flex-shrink-0"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-semibold text-[#F7F9FB]/80 uppercase tracking-wider mb-3">
              Technical Specifications
            </h3>
            <div className="bg-[#071A22]/50 rounded-xl overflow-hidden">
              {specs.map((spec, i) => (
                <div
                  key={i}
                  className={`flex justify-between items-center px-4 py-3 ${i % 2 === 0 ? "bg-[#071A22]/30" : ""}`}
                >
                  <span className="text-sm text-[#F7F9FB]/50">{spec.label}</span>
                  <span className="text-sm font-medium text-[#F7F9FB]/80">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-semibold text-[#F7F9FB]/80 uppercase tracking-wider mb-3">Ideal For</h3>
            <div className="flex flex-wrap gap-2">
              {product.idealFor.map((use, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-sm text-[#00A99D] bg-[#00A99D]/10 border border-[#00A99D]/20 rounded-lg"
                >
                  {use}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => onQuote(product)}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#2BA84A] hover:bg-[#239E3F] text-white font-semibold rounded-xl transition-colors shadow-lg shadow-[#2BA84A]/20"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Request Quote via WhatsApp
            </button>
            <button
              onClick={onAssessment}
              className="w-full px-6 py-3 border border-[#0077C8]/30 hover:bg-[#0077C8]/10 text-[#0077C8] font-medium rounded-xl transition-colors"
            >
              Request Full Assessment
            </button>
          </div>

          <p className="mt-4 text-xs text-[#F7F9FB]/30 text-center">
            Powered by Watergen GENius™ technology. Distributed by Awanube.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;