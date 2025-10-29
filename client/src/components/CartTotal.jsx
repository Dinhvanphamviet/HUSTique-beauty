import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import React, { useState, useEffect, useRef } from "react";

const CartTotal = () => {
  const {
    navigate,
    currency,
    cartItems,
    setCartItems,
    method,
    setMethod,
    delivery_charges,
    getCartCount,
    getCartAmount,
    axios,
    user,
    getToken,
    products,
  } = useAppContext();

  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectAddress, setSelectAddress] = useState(null);
  const addressRef = useRef(null);

  // Lấy danh sách địa chỉ
  const getAddress = async () => {
    if (user) {
      try {
        const { data } = await axios.get("/api/addresses", {
          headers: { Authorization: `Bearer ${await getToken()}` },
        });
        if (data.success) {
          setAddresses(data.addresses);
          if (data.addresses.length > 0) setSelectAddress(data.addresses[0]);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const deleteAddress = async (id) => {
    try {
      const { data } = await axios.delete(`/api/addresses/${id}`, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        toast.success("Đã xóa địa chỉ nhận hàng");
        setAddresses((prev) => prev.filter((addr) => addr._id !== id));
        if (selectAddress?._id === id) setSelectAddress(null);
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Đặt hàng
  const placeOrder = async () => {
    try {
      if (!selectAddress) return toast.error("Vui lòng chọn địa chỉ");

      const orderItems = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = structuredClone(
              products.find((p) => p._id === itemId),
            );
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[itemId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      if (orderItems.length === 0) return toast.error("Giỏ hàng trống");

      const items = orderItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        size: item.size,
      }));

      if (method === "COD") {
        const { data } = await axios.post(
          "/api/orders/cod",
          { items, address: selectAddress._id },
          { headers: { Authorization: `Bearer ${await getToken()}` } },
        );
        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        } else toast.error(data.message);
      } else {
        const { data } = await axios.post(
          "/api/orders/stripe",
          { items, address: selectAddress._id },
          { headers: { Authorization: `Bearer ${await getToken()}` } },
        );
        if (data.success) window.location.replace(data.url);
        else toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) getAddress();
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addressRef.current && !addressRef.current.contains(event.target))
        setShowAddress(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Tính toán
  const subtotal = getCartAmount();
  const shippingFee = getCartCount() > 0 ? delivery_charges : 0;
  const taxAmount = Math.round(subtotal * 0.02);
  const totalAmount = subtotal + shippingFee + taxAmount;

  return (
    <div>
      <h3 className="bold-22">
        Chi tiết đơn hàng{" "}
        <span className="bold-14 text-secondary">
          ({getCartCount()}) sản phẩm
        </span>
      </h3>
      <hr className="border-gray-300 my-5" />

      {/* Địa chỉ & thanh toán */}
      <div className="mb-5">
        <div className="my-5">
          <h4 className="h4 mb-5">Địa chỉ nhận hàng</h4>
          <div className="relative flex justify-between items-start mt-2">
            <p>
              {selectAddress
                ? `${selectAddress.street}, ${selectAddress.country}, ${selectAddress.state}, ${selectAddress.city}`
                : "Không có địa chỉ nào"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-secondary medium-14 hover:underline cursor-pointer"
            >
              Thay đổi
            </button>

            {/* Danh sách địa chỉ */}
            {showAddress && (
              <div
                ref={addressRef}
                className="absolute top-10 py-1 bg-white ring-1 ring-slate-900/10 text-sm w-full z-10 rounded-md shadow"
              >
                {addresses.map((address, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 hover:bg-gray-100 medium-14"
                  >
                    <p
                      onClick={() => {
                        setSelectAddress(address);
                        setShowAddress(false);
                      }}
                      className="cursor-pointer flex-1"
                    >
                      {address.street}, {address.city}, {address.state},{" "}
                      {address.country}
                    </p>
                    <button
                      onClick={() => deleteAddress(address._id)}
                      className="text-red-500 hover:text-red-700 ml-2 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <p
                  onClick={() => {
                    navigate("/address-form");
                    scrollTo(0, 0);
                  }}
                  className="p-2 text-center cursor-pointer hover:bg-tertiary hover:text-white"
                >
                  ➕ Thêm địa chỉ mới
                </p>
              </div>
            )}
          </div>
        </div>

        <hr className="border-gray-300 mt-5" />
        <div className="my-6">
          <h4 className="h4 mb-5">Phương thức thanh toán</h4>
          <div className="flex gap-3">
            <div
              onClick={() => setMethod("COD")}
              className={`${method === "COD" ? "btn-secondary" : "btn-outline"} !py-1 text-xs cursor-pointer text-center`}
            >
              Thanh toán khi nhận hàng
            </div>
            <div
              onClick={() => setMethod("Stripe")}
              className={`${method === "Stripe" ? "btn-secondary" : "btn-outline"} !py-1 text-xs cursor-pointer text-center`}
            >
              Thanh toán Online
            </div>
          </div>
        </div>
        <hr className="border-gray-300 mt-5" />
      </div>

      {/* Tổng kết đơn */}
      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <h5 className="h5">Giá sản phẩm</h5>
          <p className="font-bold">
            {subtotal.toLocaleString("vi-VN")} {currency}
          </p>
        </div>
        <div className="flex justify-between">
          <h5 className="h5">Phí vận chuyển</h5>
          <p className="font-bold">
            {shippingFee.toLocaleString("vi-VN")} {currency}
          </p>
        </div>
        <div className="flex justify-between">
          <h5 className="h5">Thuế (2%)</h5>
          <p className="font-bold">
            {taxAmount.toLocaleString("vi-VN")} {currency}
          </p>
        </div>
        <div className="flex justify-between">
          <h4 className="h4">Tổng thanh toán:</h4>
          <p className="bold-18">
            {totalAmount.toLocaleString("vi-VN")} {currency}
          </p>
        </div>
      </div>

      <button
        onClick={placeOrder}
        className="btn-secondary w-full mt-8 !rounded-md"
      >
        Tiến hành đặt hàng
      </button>
    </div>
  );
};

export default CartTotal;
