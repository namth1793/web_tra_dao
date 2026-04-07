const express = require('express');
const router = express.Router();
const { Resend } = require('resend');
const { db } = require('../db/database');

function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  return new Resend(process.env.RESEND_API_KEY);
}

function fmtVND(n) {
  return Number(n).toLocaleString('vi-VN') + 'đ';
}

function paymentLabel(p) {
  return p === 'bank' ? 'Chuyển khoản ngân hàng' : 'Thanh toán khi nhận hàng (COD)';
}

// POST /api/orders
router.post('/', async (req, res) => {
  const { product_id, product_name, product_price, quantity = 1, customer_name, customer_phone, customer_address, note, payment = 'cod' } = req.body;

  if (!product_name || !product_price || !customer_name || !customer_phone || !customer_address) {
    return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
  }

  const total = product_price * quantity;

  // Save to DB
  const result = db.prepare(`
    INSERT INTO orders (product_id, product_name, product_price, quantity, customer_name, customer_phone, customer_address, note, payment)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(product_id || null, product_name, product_price, quantity, customer_name, customer_phone, customer_address, note || null, payment);

  const orderId = result.lastInsertRowid;

  // Send email to admin
  const adminEmail = process.env.ADMIN_EMAIL;
  const resend = getResend();
  if (adminEmail && resend) {
    try {
      await resend.emails.send({
        from: 'Thế Giới Trà Đạo <onboarding@resend.dev>',
        to: adminEmail,
        subject: `[Đơn hàng #${orderId}] ${customer_name} - ${product_name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
            <div style="background: #7B2D2D; padding: 20px 28px;">
              <h2 style="color: #fff; margin: 0; font-size: 18px;">Đơn hàng mới #${orderId}</h2>
              <p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 13px;">thegioitradao.com</p>
            </div>
            <div style="padding: 24px 28px;">
              <h3 style="color: #1a0f05; font-size: 14px; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #f3e8da; padding-bottom: 8px;">Thông tin sản phẩm</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
                <tr style="background: #fdf8f3;">
                  <td style="padding: 10px 12px; font-weight: 600; color: #1a0f05; border-radius: 6px 0 0 6px;">${product_name}</td>
                  <td style="padding: 10px 12px; text-align: center; color: #6b7280;">x${quantity}</td>
                  <td style="padding: 10px 12px; text-align: right; font-weight: 700; color: #C0392B; border-radius: 0 6px 6px 0;">${fmtVND(total)}</td>
                </tr>
              </table>
              <h3 style="color: #1a0f05; font-size: 14px; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #f3e8da; padding-bottom: 8px;">Thông tin khách hàng</h3>
              <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin-bottom: 24px;">
                <tr><td style="padding: 6px 0; color: #6b7280; width: 130px;">Họ tên</td><td style="padding: 6px 0; font-weight: 600; color: #1a0f05;">${customer_name}</td></tr>
                <tr><td style="padding: 6px 0; color: #6b7280;">Điện thoại</td><td style="padding: 6px 0; font-weight: 600; color: #C0392B;"><a href="tel:${customer_phone}" style="color: #C0392B;">${customer_phone}</a></td></tr>
                <tr><td style="padding: 6px 0; color: #6b7280;">Địa chỉ</td><td style="padding: 6px 0; color: #1a0f05;">${customer_address}</td></tr>
                <tr><td style="padding: 6px 0; color: #6b7280;">Thanh toán</td><td style="padding: 6px 0; color: #1a0f05;">${paymentLabel(payment)}</td></tr>
                ${note ? `<tr><td style="padding: 6px 0; color: #6b7280; vertical-align: top;">Ghi chú</td><td style="padding: 6px 0; color: #1a0f05;">${note}</td></tr>` : ''}
              </table>
              <div style="background: #fdf8f3; border-left: 3px solid #C0392B; padding: 14px 16px; border-radius: 0 8px 8px 0;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 14px; font-weight: 600; color: #1a0f05;">Tổng tiền</span>
                  <span style="font-size: 20px; font-weight: 700; color: #C0392B;">${fmtVND(total)}</span>
                </div>
                <p style="margin: 6px 0 0; font-size: 12px; color: #6b7280;">Thanh toán khi nhận hàng — không thanh toán online</p>
              </div>
            </div>
            <div style="padding: 16px 28px; background: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">© thegioitradao.com — Đơn hàng #${orderId} · ${new Date().toLocaleString('vi-VN')}</p>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error('Resend error:', emailErr.message);
      // Vẫn trả success — đơn hàng đã lưu DB
    }
  }

  res.json({ ok: true, orderId });
});

module.exports = router;
