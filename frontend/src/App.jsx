import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem("cart");
        return stored ? JSON.parse(stored) : [];
    });
    const [cartOpen, setCartOpen] = useState(false);


    // ### MAIN FETCH ###
    useEffect(() => {
        const API_URL = import.meta.env.VITE_API_URL
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${API_URL}/api/products`);
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error("Failed to load products", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();


    }, []);


    //    #####   HANDLERS   #####
    const addToCart = (product) => {

        setCart(prevCart => {
            const existing = prevCart.find(
                item => item.product.id === product.id
            );

            if (existing) {
                return prevCart.map(item =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }

            return [...prevCart, { product, quantity: 1 }];
        })
    }

    const clearCart = () => {
        if (!window.confirm("Clear your cart?")) return;
        setCart([]);
        localStorage.removeItem("cart");
    };

    const removeOneFromCart = (productId) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.product.id !== productId) return item;
                if (item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return null
            })
                .filter(Boolean);
        });
    };

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const subtotal = cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity, 0
    );

    const checkout = () => {
        if (cart.length === 0) return;
        const ok = window.confirm(
            `Confirm purchase of ${totalItems} items for $${subtotal.toFixed(2)}?`
        );
        if (!ok) return;
        setCart([]);
        localStorage.removeItem("cart");
        setCartOpen(false);

        alert("Purchase successful!!!!")
    }



    if (loading) return <p>Loading products...</p>

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">

            <button
                onClick={() => setCartOpen(true)}
                className="fixed right-6 top-4 z-50 flex items-center gap-2
           rounded-full bg-zinc-800 px-4 py-2 text-sm font-medium
           shadow-lg shadow-black/40
           hover:bg-zinc-700 transition">
                Cart {totalItems > 0 && (
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full
                 bg-indigo-600 text-xs font-semibold">
                        {totalItems}
                    </span>
                )}
            </button>

            {cartOpen && (
                <div className="fixed inset-0 z-50 flex">
                    {/* Overlay */}
                    <div className="flex-1 bg-black/40" onClick={() => setCartOpen(false)} />

                    {/* Drawer */}
                    <div className="w-96 bg-zinc-900 p-5 flex flex-col relative
                border-l border-zinc-800">
                        <button
                            onClick={() => setCartOpen(false)}
                            className="absolute top-3 right-3 text-zinc-400 hover:text-white
           rounded-md p-2 hover:bg-zinc-800 transition"
                            aria-label="Close cart"
                        >
                            X
                        </button>

                        <h2 className="text-lg font-semibold tracking-wide mb-4">Your Cart</h2>
                        <div className="flex-1 overflow-y-auto space-y-2">
                            {cart.map(item => (
                                <div
                                    key={item.product.id}
                                    className="border-b border-zinc-800 pb-3 text-sm"
                                >
                                    <p className="font-medium">{item.product.title}</p>
                                    <p>Amount: {item.quantity}</p>
                                    <button
                                        onClick={() => removeOneFromCart(item.product.id)}
                                        className="mt-1 text-xs text-red-400 hover:text-red-300 transition"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <div className="border-t pt-4 space-y-2">
                                <p className="font-semibold">
                                    Subtotal: ${subtotal.toFixed(2)}
                                </p>
                                <button onClick={checkout} className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500
                   text-white py-2 rounded-md font-medium transition">
                                    Checkout
                                </button>
                                <button onClick={clearCart} className="w-full bg-red-600 hover:bg-red-500
                   text-white py-2 rounded-md transition">Clear cart</button>
                            </div>

                        </div>

                    </div>
                </div>
            )}

            <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur
                   border-b border-zinc-800">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-center">
                    <h1 className="text-xl font-bold tracking-widest text-indigo-400">
                        404Store
                    </h1>
                </div>
            </header>

            <div className="
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 pb-48
            ">


                {
                    products.map(p => (
                        <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
                    ))
                }


            </div>




        </div>


    );
}


export default App;