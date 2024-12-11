/* eslint-disable react/prop-types */

import { Pencil, Trash2 } from 'lucide-react';

const ProductCard = ({ product, onEdit }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={`http://localhost:3000/api/v1/product/product-photo/${product._id}`}
          alt={product.name}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {product.name}
          </h3>
          <span className="text-lg font-bold text-green-600">
            ${product.price}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 flex items-center justify-center gap-1 py-2 px-2 text-sm font-medium rounded-lg transition-colors bg-blue-50 text-blue-600 hover:bg-blue-100"
          >
            <Pencil size={16} />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-1 py-2 px-2 text-sm font-medium rounded-lg transition-colors bg-red-50 text-red-600 hover:bg-red-100">
            <Trash2 size={16} />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;