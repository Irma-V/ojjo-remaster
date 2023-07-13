
/* отключенная логика auth */
// import { BaseApiService } from "./BaseApiService";

// export class Auth extends BaseApiService {
//   async login(data) {
//     // let isAuth = false;
//     let authUrl = `${this.authBaseUrl}/login`;
//     return await fetch(authUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + this.token,
//       },
//       body: JSON.stringify({
//         username: data.username,
//         password: data.password,
//         expiresInMins: 1, // optional
//       }),
//     })
//       .then((response) => response.json())
//       // .then((result) => console.log(result));
//       // isAuth = true
//       // console.log(isAuth);
//   }

//   async logout() {
//     localStorage.removeItem('auth-token')
//   }
// }
