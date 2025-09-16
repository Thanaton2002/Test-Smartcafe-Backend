# SmartCafe Backend API

REST API สำหรับระบบ SmartCafe - ระบบจัดการเมนูและคำสั่งซื้อของร้านกาแฟ

## Tech Stack
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MySQL with Prisma ORM  
- **Validation:** Zod
- **Authentication:** JWT (jsonwebtoken)
- **File Upload:** Multer + Cloudinary
- **Security:** bcryptjs for password hashing

## Features
- 🔐 User Authentication (Register/Login)
- 📋 Menu Management (Create/Read with image upload)
- 🛒 Order Management (Create/Read/Update)
- 📸 Image upload to Cloudinary
- 🔒 JWT-based authentication
- ✅ Request validation with Zod

## API Endpoints

### Authentication
- `POST /api/authen/register` - สมัครสมาชิก
- `POST /api/authen/login` - เข้าสู่ระบบ

### Menu
- `GET /api/menu/` - ดึงรายการเมนูทั้งหมด
- `POST /api/menu/` - เพิ่มเมนูใหม่ (ต้อง login)

### Order
- `POST /api/order/` - สร้างออเดอร์ใหม่
- `GET /api/order/:orderId` - ดูข้อมูลออเดอร์
- `PATCH /api/order/:orderId` - อัพเดทออเดอร์

## Installation & Setup

### Steps
1. Clone repository
```bash
git clone https://github.com/Thanaton2002/Test-Smartcafe-Backend.git
cd Test-Smartcafe-Backend
```

2. Install dependencies
```bash
pnpm install
```

3. Database setup
```bash
# Generate Prisma client
pnpm prisma generate

# Run database migration
pnpm prisma migrate dev --name init
```

4. Run development server
```bash
pnpm dev
```

Server จะรันที่ `http://localhost:7777`

## Environment Variables
สร้างไฟล์ `.env` ในโฟลเดอร์ root และใส่ค่าดังนี้:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/smartcafe_db"

# JWT
JWT_SECRET="your_jwt_secret_key"
JWT_EXPIRES_IN="7d"

# Cloudinary
CLOUDINARY_NAME="your_cloudinary_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# App
PORT=7777
```

## Database Schema
- **User:** เก็บข้อมูลผู้ใช้ (username, password)
- **Menu:** เก็บข้อมูลเมนู (name, price, image)
- **Order & OrderItem:** เก็บข้อมูลคำสั่งซื้อและรายการสินค้า

## Scripts
- `pnpm dev` - Run development server with nodemon
- `pnpm prisma studio` - Open Prisma Studio
- `pnpm prisma migrate dev` - Run database migration
- `pnpm prisma generate` - Generate Prisma client