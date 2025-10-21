import { useAppContext } from '../context/AppContext'
import React, { useState } from 'react'

const Item = ({ product }) => {
  const { navigate, currency } = useAppContext()
  const [hovered, setHovered] = useState(false)
  const [size, setSize] = useState(product.sizes[0])

  // Sakura pastel colors
  const colors = ["#FFE4E1", "#FFDCE3", "#FFF0F3"]
  const bgcolor = colors[(parseInt(product._id?.slice(-4) || "0", 16)) % colors.length]

  return (
    <div
      className="transition-all duration-300 cursor-pointer"
      onClick={() => {
        navigate(`/collection/${product._id}`)
        scrollTo(0, 0)
      }}
    >
      {/* Card container */}
      <div className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all bg-white">
        {/* Image */}
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="flex items-center justify-center h-[182px] w-full relative rounded-t-2xl"
          style={{ backgroundColor: bgcolor }}
        >
          <img
            src={hovered && product.images.length > 1 ? product.images[1] : product.images[0]}
            alt={product.title}
            className="h-36 w-36 object-contain transition-transform duration-300 hover:scale-105"
          />

          {/* Product type badge */}
          <p className="absolute top-2 right-2 px-3 py-0.5 bg-white/60 text-pink-700 text-[10px] rounded-full ring-1 ring-pink-200">
            {product.type}
          </p>
        </div>

        {/* Info */}
        <div className="p-3">
          <div className="flex justify-between items-center">
            <h5 className="text-sm font-medium uppercase line-clamp-1 text-gray-800">
              {product.title}
            </h5>
            <p className="text-sm font-semibold text-gray-900">
              {currency}{product.price[size]}.00
            </p>
          </div>
          <p className="text-xs text-gray-600 line-clamp-2 pt-1">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Item
