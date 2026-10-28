import type {RegisterData} from '../pages/registerSupport.ts';

// Email unik tiap run, supaya registrasi sukses tidak bentrok dengan akun yang sudah ada
// (timestamp + angka acak, karena Date.now() saja bisa sama jika test jalan paralel)
const uniqueEmail = (): string =>
    `budi.${Date.now()}.${Math.floor(Math.random() * 1_000_000)}@yopmail.com`;

const baseUser: RegisterData = {
    firstName: 'Budi',
    lastName: 'Santoso',
    dob: '1995-05-17',
    country: 'Indonesia',
    postalCode: '12345',
    houseNumber: '42',
    street: 'Jalan Sudirman',
    city: 'Jakarta',
    state: 'DKI Jakarta',
    phone: '081234567890',
    email: '',
    password: 'Str0ng!Pass#2026',
};

export const newUser = (): RegisterData => ({
    ...baseUser,
    email: uniqueEmail(),
});

export const invalidRegisterUsers = {
    // Email sudah terdaftar (akun bawaan practicesoftwaretesting)
    ExistingEmail: {
        ...baseUser,
        email: 'customer3@practicesoftwaretesting.com',
    },
    InvalidEmailFormat: {
        ...baseUser,
        email: 'budi-invalid-email',
    },
    ShortPassword: {
        ...baseUser,
        email: 'budi.shortpass@yopmail.com',
        password: 'abc',
    },
} as const;
