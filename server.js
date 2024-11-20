// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Cấu hình CORS cho phép kết nối từ frontend chạy trên localhost:5001
app.use(cors({
    origin: 'http://localhost:5001'
}));

// Middleware để phân tích JSON từ request body
app.use(express.json());

// Kết nối tới MongoDB Atlas
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Kết nối thành công đến MongoDB Atlas'))
.catch((error) => console.error('Lỗi khi kết nối đến MongoDB:', error));

// Route Đăng ký người dùng mới
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Kiểm tra xem người dùng đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email này đã được sử dụng' });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Lưu người dùng vào MongoDB
        await newUser.save();
        res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi đăng ký người dùng', error });
    }
});

// Route Đăng nhập người dùng
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Tìm người dùng qua email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
        }

        // Tạo token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Đăng nhập thành công', token });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi đăng nhập', error });
    }
});

// Route kiểm tra kết nối server
app.get('/', (req, res) => {
    res.send('Server đang chạy và kết nối thành công đến MongoDB');
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});
