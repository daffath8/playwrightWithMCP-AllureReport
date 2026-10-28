export const validUsers = {
    User1: {
        username: 'customer3@practicesoftwaretesting.com',
        password: 'pass123',
    }
} as const;

export const invalidUsers = {
    User1: {
        username: 'asal@yopmail.com',
        password: 'pass123',
    },
     User2: {
        username: 'customer3@practicesoftwaretesting.com',
        password: 'pass1234',
    }
} as const;
