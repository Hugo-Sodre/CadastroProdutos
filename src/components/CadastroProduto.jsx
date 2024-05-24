import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Corrigir o caminho aqui
import { ref, set, onValue } from "firebase/database";

export default function CadastroProduto() {
  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    price: "",
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsRef = ref(db, "products/");
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const productList = data
        ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
        : [];
      setProducts(productList);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productId = new Date().getTime(); // Gera um ID único para cada produto
    try {
      await set(ref(db, "products/" + productId), {
        name: product.name,
        quantity: parseInt(product.quantity),
        price: parseFloat(product.price),
      });
      console.log("Product submitted: ", product);
      // Resetar o formulário
      setProduct({ name: "", quantity: "", price: "" });
    } catch (e) {
      console.error("Error adding product: ", e);
    }
  };

  return (
    <div className="min-h-screen flex gap-8 items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4 items-center justify-center max-w-sm h-[450px] bg-white shadow-md rounded p-8"
      >
        <h2 className="text-2xl  text-center">Cadastro de Produto</h2>
        <div className="">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nome
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Nome do Produto"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="quantity"
          >
            Quantidade
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="quantity"
            type="number"
            placeholder="Quantidade"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Preço
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            placeholder="Preço"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 items-center flex text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Cadastrar
        </button>
      </form>
      <div className="w-full max-w-sm h-[450px] bg-white shadow-md rounded overflow-x-hidden p-8">
        <h2 className="text-2xl  text-center">Produtos Cadastrados</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id} className="mb-2 shadow-md">
              <div className="text-gray-700">
                <strong>Nome:</strong> {product.name}
              </div>
              <div className="text-gray-700">
                <strong>Quantidade:</strong> {product.quantity}
              </div>
              <div className="text-gray-700">
                <strong>Preço:</strong>{" "}
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
