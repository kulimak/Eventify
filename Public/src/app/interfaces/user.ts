export interface UserLogin {
  email: '';
  password: '';
}

export interface UserRegister {
    username: '';
    email: '';
    password: '';
    confirm:'';
    gender: '[tesztadat]';
    defAddress?: '';
    favCategories: '';
    birthDate: '';
    image?: '';
    role: 'user';
    status: 'active';
}
