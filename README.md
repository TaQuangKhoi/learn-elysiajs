# Ứng Dụng Quản Lý Doanh Nghiệp Khoan Giếng với ElysiaJS và Clean Architecture

Dự án này là một ứng dụng backend cho hệ thống quản lý doanh nghiệp khoan giếng, được xây dựng với ElysiaJS và tuân thủ nguyên tắc Clean Architecture.

## Cấu Trúc Dự Án (Clean Architecture)

Dự án được tổ chức theo các lớp của Clean Architecture:

```
src/
├── core/                  # Lớp trung tâm, độc lập với framework
│   ├── domain/            # Quy tắc nghiệp vụ cốt lõi
│   │   ├── entities/      # Các đối tượng nghiệp vụ
│   │   └── repositories/  # Interfaces cho repositories
│   └── use-cases/         # Logic nghiệp vụ ứng dụng
├── infrastructure/        # Chi tiết kỹ thuật
│   ├── data-sources/      # Triển khai cụ thể cho repositories
│   └── services/          # Dịch vụ bên ngoài (SMS, email, v.v.)
└── presentation/          # Giao tiếp với thế giới bên ngoài
    ├── controllers/       # Xử lý request/response
    ├── models/            # Validation schemas, DTOs
    └── routes/            # Định nghĩa API routes
```

### Các Lớp Chính

1. **Core Layer**: Chứa logic nghiệp vụ cốt lõi, không phụ thuộc vào bất kỳ framework hay thư viện bên ngoài nào.
   - **Domain**: Định nghĩa các entities và repository interfaces.
   - **Use Cases**: Triển khai các hành động cụ thể mà người dùng có thể thực hiện.

2. **Infrastructure Layer**: Chứa các triển khai cụ thể cho repositories và services.
   - **Data Sources**: Triển khai cụ thể cho việc truy cập dữ liệu (MariaDB, MongoDB, v.v.).
   - **Services**: Tích hợp với các dịch vụ bên ngoài (SMS, email, bản đồ, v.v.).

3. **Presentation Layer**: Xử lý việc giao tiếp với người dùng thông qua API.
   - **Controllers**: Xử lý request/response.
   - **Models**: Validation schemas và DTOs.
   - **Routes**: Định nghĩa API endpoints.

## Ví Dụ API

### Tạo Dự Án Khoan Mới

```http
POST /api/v1/projects
Content-Type: application/json

{
  "clientId": "client123",
  "location": {
    "address": "123 Đường Lê Lợi, TP.HCM",
    "latitude": 10.7769,
    "longitude": 106.7009
  },
  "expectedDepth": 150
}
```

## Cài Đặt và Chạy

### Yêu Cầu
- Bun runtime

### Cài Đặt
```bash
# Clone repository
git clone <repository-url>

# Cài đặt dependencies
bun install
```

### Phát Triển
```bash
# Chạy server phát triển
bun run dev
```

Truy cập http://localhost:3000/swagger để xem tài liệu API.

## Mở Rộng Ứng Dụng

### Thêm Entity Mới
1. Tạo file entity mới trong `src/core/domain/entities/`
2. Định nghĩa repository interface trong `src/core/domain/repositories/`
3. Triển khai use cases trong `src/core/use-cases/`

### Thêm API Endpoint Mới
1. Tạo controller mới hoặc thêm method vào controller hiện có
2. Định nghĩa validation schema trong `src/presentation/models/`
3. Thêm route mới trong `src/presentation/routes/`

## Kiểm Thử
```bash
# Chạy file test
bun run src/test.ts
```
