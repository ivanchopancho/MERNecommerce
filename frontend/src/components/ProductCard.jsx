function ProductCard({ product, onAddToCart }) {
    return (
        <div>

            <img src={product.image} alt={product.title} width={100} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>


            <button className="rounded bg-blue-600 p-1" onClick={() => onAddToCart(product)}>
                Add to cart
            </button>

        </div>
    );
}


export default ProductCard;