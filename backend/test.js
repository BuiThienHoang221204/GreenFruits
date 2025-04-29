// fetch('http://localhost:5000/api/user/register', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         name: 'Hoang',
//         email: 'example@gmail.com',
//         password: '123'
//     })
// })
// .then(res => res.json())
// .then(data => {
//     console.log('Phản hồi từ server:', data);
// })
// .catch(err => {
//     console.error('Lỗi:', err);
// });

// fetch('http://localhost:5000/api/user/login', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         email: 'example@gmail.com',
//         password: '123'
//     })
// })
// .then(res => res.json())
// .then(data => {
//     console.log('Phản hồi từ server:', data);
// })
// .catch(err => {
//     console.error('Lỗi:', err);
// });

// fetch('http://localhost:5000/api/user/logout', {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     // body: JSON.stringify({
//     //     email: '111example@gmail.com',
//     //     password: '123'
//     // })
// })
// .then(res => res.json())
// .then(data => {
//     console.log('Phản hồi từ server:', data);
// })
// .catch(err => {
//     console.error('Lỗi:', err);
// });
fetch('http://localhost:5000/api/seller/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: 'admin@gmail.com', // đổi thành email của bạn
        password: 'admin'        // đổi thành password của bạn
    }),
    credentials: 'include' // QUAN TRỌNG: để server trả cookie về client
})
.then(res => res.json())
.then(data => {
    console.log('Phản hồi từ server:', data);
})
.catch(err => {
    console.error('Lỗi:', err);
});
