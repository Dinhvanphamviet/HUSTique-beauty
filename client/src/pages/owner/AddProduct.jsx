import React, {useState} from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets } from '../../assets/data'
import toast from 'react-hot-toast'

const AddProduct =() => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  })

  const [input, setInput] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    popular: false,
  })

  const [sizePrice, setSizePrice] = useState([])
  const [newSize, setNewSize] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [loading, setLoading] = useState(false)

  const allCagegories = ["Chăm sóc tóc", "Chăm sóc cơ thể", "Chăm sóc da mặt"]
  const allTypes = ["Dầu gội", "Sữa tắm", "Sữa rửa mặt", "Kem dưỡng ẩm", "Mặt nạ", "Serum", "Xịt khoáng"]

  return (
    <div>AddProduct</div>
  )
}

export default AddProduct