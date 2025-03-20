const userService = require('../services/user.service');

exports.register = async (req, res, next) => {
    try{
        const { username, email, password, gender, defAddress, favCategories, role, status } = req.body;
        if ( !username || !email || !password || !gender){
            return res.status(400).json({ message: 'Hiányzó adatok!'});
        }
        const user = await userService.registerUser(username, email, password, gender, defAddress, favCategories, role, status);
        res.status(201).json({success: true, message: "Sikeres regisztráció!"});
    }catch(error){
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        if (!email || !password){
            return res.status(400).json({ message: 'Hiányzó adatok!'});
        }
        const user = await userService.loginUser(email, password);
        res.status(200).json({user, message: 'Sikeres bejelentkezés!'});
    }catch(error){
        next(error);
    }
};
exports.image = async(req, res, next)=>{
    try{

        console.log('Body:', req.body);
        console.log('File:', req.file);
        
        // Ellenőrizzük, hogy van-e feltöltött fájl
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Nem található feltöltött fájl.',
            });
        }

        // Feltöltött fájl adatai
        const file = req.file;

        const image = req.file ? req.file.filename : null;

        if ( !image){
            return res.status(400).json({ message: 'Hiányzó adat!'});
        }
        const ad = await userService.uploadImg(req.params.id, image);
        res.status(201).json({success: true, message: "Profilkép feltöltése sikeres!"});
    }catch(error){
        console.log(error)
        next(error);
    }
};

exports.password = async (req, res, next) => {
    try {
        const {password, confirm} = req.body

        if (!req.params.id)
        {
            return res.status(400).json({ message: 'Hiányzó azonosító!'});
        }
        if (!password || !confirm) {
            return res.status(400).json({message: 'Hiányzó adatok'})
        }
        if (password != confirm)
        {
            return res.status(400).json({ message: 'A jelszavak nem egyeznek!'});
        }

        const user = userService.updatePassword(req.params.id, password)

        res.status(200).json({success:true, message: 'jelszó módosítás sikeres!'});
    } 
    catch (error) {
        next(error)
    }
};

exports.email = async (req, res, next) => {
    try {
        const {email} = req.body

        if (!req.params.id)
        {
            return res.status(400).json({ message: 'Hiányzó azonosító!'});
        }
        if (!email) {
            return res.status(400).json({message: 'Hiányzó adatok'})
        }

        const user = userService.updateEmail(req.params.id, email)

        res.status(200).json({success:true, message: 'Email cím módosítás sikeres!'});
    } 
    catch (error) {
        next(error)
    }
};

exports.username = async (req, res, next) => {
    try {
        const {username} = req.body

        if (!req.params.id)
        {
            return res.status(400).json({ message: 'Hiányzó azonosító!'});
        }
        if (!username) {
            return res.status(400).json({message: 'Hiányzó adatok'})
        }

        const user = userService.updateUsername(req.params.id, username)

        res.status(200).json({success:true, message: 'Felhasználónév módosítás sikeres!'});
    } 
    catch (error) {
        next(error)
    }
}