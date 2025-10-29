import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/data";
import toast from "react-hot-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

const Dashboard = () => {
  const { user, axios, getToken } = useAppContext();
  const [dashboardData, setDashboardData] = useState({
    orders: [],
    totalOrders: 0,
    totalRevenue: 0,
  });

  const formatPrice = (price) => Number(price).toLocaleString("vi-VN") + " ₫";

  const getDashboardData = async (forceRefresh = false) => {
    const cached = localStorage.getItem("dashboard_cache");
    if (cached && !forceRefresh) {
      const parsed = JSON.parse(cached);
      setDashboardData(parsed);
    }

    try {
      const { data } = await axios.get("/api/orders/", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      if (data.success) {
        setDashboardData(data.dashboardData);
        localStorage.setItem(
          "dashboard_cache",
          JSON.stringify(data.dashboardData)
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Lỗi khi tải dữ liệu dashboard");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const { data } = await axios.post(
        "/api/orders/status",
        { orderId, status: event.target.value },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        await getDashboardData(true);
        toast.success("Cập nhật trạng thái đơn hàng thành công");
      }
    } catch (error) {
      toast.error("Lỗi khi cập nhật trạng thái đơn hàng");
    }
  };

  useEffect(() => {
    if (user) getDashboardData();
  }, [user]);

  const totalRevenueWithDelivered =
    dashboardData.totalRevenue +
    dashboardData.orders
      .filter(
        (order) =>
          order.status === "Delivered" && order.paymentMethod === "COD"
      )
      .reduce((sum, order) => sum + Number(order.amount || 0), 0);

  return (
    <div className="md:px-8 py-6 xl:py-8 m-1 sm:m-3 h-[97vh] lg:w-11/12 bg-primary shadow rounded-xl flex flex-col">
      {/* Tổng quan cố định */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flexStart gap-7 p-5 bg-[#fff4d2] lg:min-w-56 rounded-xl">
          <img src={assets.graph} alt="" className="hidden sm:flex w-8" />
          <div>
            <h4 className="h4">
              {dashboardData.totalOrders.toString().padStart(2, "0")}
            </h4>
            <h5 className="h5 text-secondary">Tổng số đơn hàng</h5>
          </div>
        </div>
        <div className="flexStart gap-7 p-5 bg-[#fff4d2] lg:min-w-56 rounded-xl">
          <img src={assets.dollar} alt="" className="hidden sm:flex w-8" />
          <div>
            <h4 className="h4">{formatPrice(totalRevenueWithDelivered)}</h4>
            <h5 className="h5 text-secondary">Tổng doanh thu</h5>
          </div>
        </div>
      </div>

      {/* Danh sách đơn hàng cuộn */}
      <ScrollArea className="flex-1 bg-primary rounded-xl p-2">
        {dashboardData.orders.map((order) => (
          <div key={order._id} className="bg-white p-3 mb-4 rounded-2xl hover:shadow-md transition">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="text-gray-600 flex flex-col lg:flex-row gap-4 mb-3"
              >
                <div className="flex flex-[2] gap-x-3">
                  <div className="flexCenter bg-primary rounded-xl">
                    <img
                      src={item.product.images[0]}
                      alt=""
                      loading="lazy"
                      className="max-h-20 max-w-20 object-contain"
                    />
                  </div>
                  <div className="block w-full">
                    <h5 className="h5 uppercase line-clamp-1">
                      {item.product.title}
                    </h5>
                    <div className="flex flex-wrap gap-3 max-sm:gap-y-1 mt-1">
                      <div className="flex items-center gap-x-2">
                        <h5 className="medium-14">Giá:</h5>
                        <p>{formatPrice(item.product.price[item.size])}</p>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <h5 className="medium-14">Số lượng:</h5>
                        <p>{item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <h5 className="medium-14">Dung tích:</h5>
                        <p>{item.size}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-t border-gray-300 pt-3">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-x-2">
                  <h5 className="medium-14">Mã đơn hàng:</h5>
                  <p className="text-gray-400 text-sm break-all">{order._id}</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-x-2">
                    <h5 className="medium-14">Khách hàng:</h5>
                    <p className="text-gray-400 text-sm">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <h5 className="medium-14">Số điện thoại:</h5>
                    <p className="text-gray-400 text-sm break-all">
                      {order.address.phone}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-x-2">
                    <h5 className="medium-14">Thanh toán:</h5>
                    <p className="text-gray-400 text-sm break-all">
                      {order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                    </p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <h5 className="medium-14">Phương thức:</h5>
                    <p className="text-gray-400 text-sm break-all">
                      {order.paymentMethod === "COD"
                        ? "Thanh toán khi nhận hàng"
                        : "Thanh toán qua Stripe"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <h5 className="medium-14">Trạng thái:</h5>
                <select
                  onChange={(e) => statusHandler(e, order._id)}
                  value={order.status}
                  className="text-xs font-semibold p-1 ring-1 ring-slate-900/5 rounded max-w-36 bg-primary"
                >
                  <option value="Order Placed">Đã đặt hàng</option>
                  <option value="Packing">Đang chuẩn bị hàng</option>
                  <option value="Shipping">Đang vận chuyển</option>
                  <option value="Out for delivery">Đang giao hàng</option>
                  <option value="Delivered">Đã giao hàng thành công</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default Dashboard;
