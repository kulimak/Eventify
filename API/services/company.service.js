const { CompanyUser } = require('../models/companyUser.model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');
const { configDotenv } = require('dotenv');

exports.registerCompany = async (cegnev, adoszam, jegyzekszam, szekhely, nev, telefon, password, email, role)=>{
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const company = await CompanyUser.create({
        cegnev,
        adoszam,
        jegyzekszam,
        szekhely,
        nev,
        telefon,
        password: hashedPassword,
        email,
        role
    });

    return company
};
exports.uploadImg = async (id, image)=>{
    const company = CompanyUser.update(
        {
            image
        },
        {
            where: {id}
        });
        return company
};

exports.loginCompany = async (email, password) => {
    const company = await CompanyUser.findOne({where: { email }});

    if (!company) throw new Error('Nem regisztrált felhasználó!');
    if (!await bcrypt.compare(password, company.password)) throw new Error('Hibás jelszó!');
    
    const token = generateToken({ cegnev: company.cegnev, adoszam: company.adoszam, jegyzekszam: company.jegyzekszam, szekhely: company.szekhely, nev: company.nev, telefon: company.telefon, password: company.password, email: company.email, role: company.role});
    
    return { token }; 
};

/*exports.updatePassword = async(id ,password) => {
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

}*/