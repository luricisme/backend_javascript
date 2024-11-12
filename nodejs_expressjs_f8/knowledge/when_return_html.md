# Khi nào thì backend trả về API JSON/XML?
Ứng dụng Single Page Application (SPA):

Mô hình phổ biến: Frontend được xây dựng bằng các framework như React, Angular, hoặc Vue.js. Backend chỉ cung cấp các API để lấy dữ liệu và frontend sẽ xử lý hiển thị.

Ví dụ: Backend chỉ trả về dữ liệu JSON từ API, và frontend (như React) sẽ dùng dữ liệu này để cập nhật giao diện người dùng.

# Khi nào thì backend trả về HTML động?
Ứng dụng Server-Side Rendering (SSR):

Mô hình truyền thống: Server xử lý và render toàn bộ trang HTML trước khi gửi về client. Điều này có thể cải thiện tốc độ tải trang và SEO.

Ví dụ: Backend sử dụng các template engine như Handlebars, EJS, hoặc Pug để tạo ra các trang HTML động dựa trên dữ liệu từ server.