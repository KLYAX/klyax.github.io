import ProductHeroDescription from "./ProductHeroDescription";
import ProductHeroSpecifications from "./ProductHeroSpecifications";

const fillToFixedSize = (arr, size, filler = (el) => el) => {
  if (arr.length >= size || size < 0) return arr;

  const sizeDiff = size - arr.length;

  return [...arr, ...Array.from({ length: sizeDiff }, filler)];
};

const ProductHeroAbout = ({ product }) => {
  const { description, specifications } = product.about;

  return (
    <div className="control-cabinets-description">
      <div className="control-cabinets-description__header control-cabinets-description-header container">
        <ProductHeroDescription productName={product.name} description={description} />
      </div>
      <div className="control-cabinets-description__body">
        {Array.isArray(specifications) && (
          <ProductHeroSpecifications specifications={specifications} />
        )}
      </div>
    </div>
  );
};

export default ProductHeroAbout;
