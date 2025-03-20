const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');
const { configDotenv } = require('dotenv');

exports.registerUser = async (username, email, password, gender, defAddress, favCategories, role, status)=>{
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        gender,
        defAddress,
        favCategories,
        role,
        status,
    });

    return user
};
exports.uploadImg = async (id, image)=>{
    const user = User.update(
        {
            image
        },
        {
            where: {id}
        });
        return user
};

exports.loginUser = async (email, password) => {
    const user = await User.findOne({where: { email }});

    if (!user) throw new Error('Nem regisztrált felhasználó!');

    if (!await bcrypt.compare(password, user.password)) throw new Error('Hibás jelszó!');

    const token = generateToken({ username: user.username, email: user.email, password: user.password, gender: user.gender, defAddress: user.defAddress, favCategories: user.favCategories, role: user.role, status: user.status});
    
    return { token }; 
};

exports.updatePassword = async(id ,password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userPasswd = User.update({
        password: hashedPassword
    },
    {
        where: {id}
    });

    if (userPasswd == 0) throw new Error('A felhasználó nem található!');

    return 'Jelszó módosítás sikeres!'

};

exports.updateEmail = async(id ,email) => {
    const userEmail = User.update({
        email
    },
    {
        where: {id}
    });

    if (userEmail == 0) throw new Error('A felhasználó nem található!');

    return 'Email cím módosítás sikeres!'

}

exports.updateUsername = async(id ,username) => {
    const userEmail = User.update({
        username
    },
    {
        where: {id}
    });

    if (userEmail == 0) throw new Error('A felhasználó nem található!');

    return 'Felhasználónév módosítás sikeres!'

}