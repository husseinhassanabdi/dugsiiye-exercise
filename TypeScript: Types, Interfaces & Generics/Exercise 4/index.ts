interface User {
    readonly id: number
    username: string
    password: string
    email?: string
}

function login(user: User): void {
    console.log(user.username)
}

login ( {id:7654567, username: "alimohamed" , email: "example@gmail.com" , password: '30'} )

// login ( {id:7654567, username: "alimohamed" , password: '30'} )

interface Book {
    readonly id: number;
    title: string;
}

const b: Book = {
    id: 123,
    title: "TypeScript Handbook"
};

b.id = 969; // ❌ Error!
  