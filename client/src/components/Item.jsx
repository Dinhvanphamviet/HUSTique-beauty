import { useAppContext } from '../context/AppContext'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AiFillStar, AiOutlineStar, AiTwotoneStar } from 'react-icons/ai' // import icon

const Item = ({ product }) => {
  const { navigate } = useAppContext()
  const [hovered, setHovered] = useState(false)
  const [size, setSize] = useState(product.sizes[0])
  const [ratingInfo, setRatingInfo] = useState({ avg: 0, count: 0 })

  const colors = ["#FFE4E1", "#FFDCE3", "#FFF0F3"]
  const bgcolor = colors[(parseInt(product._id?.slice(-4) || "0", 16)) % colors.length]

  const priceVNĐ = product.price[size]?.toLocaleString('vi-VN') || '0'

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axios.get(`/api/comments/${product._id}`)
        if (data.success) {
          const comments = data.comments
          const count = comments.length
          const avg = count === 0 ? 0 : comments.reduce((sum, c) => sum + c.rating, 0) / count
          setRatingInfo({ avg, count })
        }
      } catch (error) {
        console.error("Lỗi khi fetch bình luận:", error)
      }
    }
    fetchComments()
  }, [product._id])

  const renderStars = () => {
    const stars = []
    const fullStars = Math.floor(ratingInfo.avg)
    const halfStar = ratingInfo.avg - fullStars >= 0.5
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<AiFillStar key={i} className="text-yellow-400 w-4 h-4" />)
      } else if (i === fullStars && halfStar) {
        stars.push(<AiTwotoneStar key={i} className="text-yellow-400 w-4 h-4" />)
      } else {
        stars.push(<AiOutlineStar key={i} className="text-gray-300 w-4 h-4" />)
      }
    }
    return stars
  }

  return (
    <div
      className="transition-all duration-300 cursor-pointer"
      onClick={() => {
        navigate(`/collection/${product._id}`)
        scrollTo(0, 0)
      }}
    >
      <div className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all bg-white">
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
          <p className="absolute top-2 right-2 px-3 py-0.5 bg-white/60 text-pink-700 text-[10px] rounded-full ring-1 ring-pink-200">
            {product.type}
          </p>
        </div>

        <div className="p-3 flex flex-col gap-1">
          <h5 className="text-sm font-medium uppercase line-clamp-1 text-gray-800">
            {product.title}
          </h5>

          <p className="text-sm font-semibold text-gray-900">{priceVNĐ} ₫</p>

          <p className="text-xs text-gray-600 line-clamp-2 pt-1">
            {product.description}
          </p>

          <div className="flex items-center justify-between pt-2 text-xs text-gray-500">
            <div className="flex gap-1">{renderStars()}</div>
            <span>{ratingInfo.count} đánh giá</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
