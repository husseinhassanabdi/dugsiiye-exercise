"use strict";
function login(user) {
    console.log(user.username);
}
login({ id: 7654567, username: "alimohamed", email: "example@gmail.com", password: '30' });
const b = {
    id: 123,
    title: "TypeScript Handbook"
};
b.id = 969; // ❌ Error!
