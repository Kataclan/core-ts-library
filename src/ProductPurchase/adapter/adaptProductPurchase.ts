import ProductPurchase from '../entity/ProductPurchase';

export default function adaptProductPurchase(json: any): ProductPurchase {
  const productPurchase = new ProductPurchase();

  productPurchase.id = json.id;

  return productPurchase;
}
