function ProductCard({ product, onAddToCart }) {
    return (
        <div className="group bg-zinc-900 rounded-xl overflow-hidden
                border border-zinc-800
                hover:border-zinc-700
                transition shadow-md hover:shadow-xl">

            <div className="aspect-square bg-zinc-800 flex items-center justify-center">
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-40 object-contain group-hover:scale-105 transition"
                />

            </div>

            <div className="p-4 space-y-2">
                <h3 className="text-sm font-medium line-clamp-2 text-zinc-100">
                    {product.title}
                </h3>


                <p className="text-lg font-semibold text-indigo-400">
                    ${product.price}
                </p>


                <button
                    className="w-full mt-2 rounded-md
                 bg-zinc-800 hover:bg-indigo-600
                 text-sm font-medium py-2
                 transition"
                    onClick={() => onAddToCart(product)}>
                    Add to cart
                </button>
            </div>



        </div>
    );
}


export default ProductCard;