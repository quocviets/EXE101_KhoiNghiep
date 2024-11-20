// ServicePay.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ServicePay.css';

const pricingData = [
  { title: "Gói Lẻ", price: "300,000 VND" },
  { title: "Gói Cơ Bản: “Mẹ Tròn Con Vuông”", price: "2,000,000 VND" },
  { title: "Gói Nâng Cao: “Hồi Phục Toàn Diện”", price: "4,000,000 VND" },
  { title: "Gói Cao Cấp: “Chăm Sóc Vàng”", price: "6,000,000 VND" }
];

const ServicePay = () => {
  const location = useLocation();
  const { name, email, phone, message, servicePackage } = location.state || {};
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

  if (!name || !email) {
    return <div className="servicepay-container">Không có thông tin dịch vụ. Vui lòng thử lại.</div>;
  }

  const selectedPackage = pricingData.find(pkg => pkg.title === servicePackage);
  const price = selectedPackage ? selectedPackage.price : "Không có giá";

  const handleConfirmPayment = () => {
    setIsPaymentConfirmed(true);
  };

  return (
    <div className="servicepay-container">
      {isPaymentConfirmed ? (
        <div className="thank-you-message">
          <h2>Cảm ơn quý khách đã sử dụng dịch vụ</h2>
          <p>Chúng tôi sẽ liên hệ lại sớm nhất để xác nhận và phục vụ quý khách.</p>
        </div>
      ) : (
        <div className="servicepay-card">
          <h2 className="servicepay-title">Xác nhận dịch vụ</h2>
          <div className="servicepay-info">
            <p><strong>Họ và tên:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Số điện thoại:</strong> {phone}</p>
            <p><strong>Lời nhắn:</strong> {message}</p>
            <p><strong>Gói dịch vụ:</strong> {servicePackage}</p>
          </div>

          <div className="servicepay-total">
            <h3>Tổng hóa đơn:</h3>
            <p>{price}</p>
          </div>

          <div className="servicepay-qrcode">
            <img src="/assets/qr.jpg" alt="QR code" />
          </div>

          <button onClick={handleConfirmPayment} className="servicepay-confirm-button">
            Xác nhận & Thanh toán
          </button>
        </div>
      )}
    </div>
  );
};

export default ServicePay;
