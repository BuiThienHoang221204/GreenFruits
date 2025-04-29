          ---> route / ---> controller ---> models
         /           \----> middleware
        /
server  
       \ ---->configs

- Cách jwt hoạt động trong dự án
1. Người dùng đăng kí hoặt đăng nhập 
  + Clien gửi thông tin đăng nhập đến server (ví dụ: email, password).
  + Server kiểm tra thông tin đăng nhập.
  + Nếu thông tin hợp lệ, server tạo một JWT (JSON Web Token) chứa thông tin người dùng và chữ ký.
2. Server gửi JWT về cho client. (lưu ở localStorage hoặc cookie)
3. Gửi token trong các yêu cầu tiếp theo đến server (Mỗi khi gọi API, client gửi kèm JWT trong header hoặc cookie)
4. Server kiểm tra xác thực token (Có hợp lệ không ?, Có bị chỉnh sửa không ? ,Còn hạn không ? )s