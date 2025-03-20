const multer = require('multer');
const path = require('path');

// Fájlok tárolásának konfigurációja
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

// Fájlok szűrése (csak bizonyos típusokat engedünk)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Csak JPEG, PNG fájlok tölthetők fel.'));
    }
};

// Multer konfiguráció
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Maximális fájlméret: 5 MB
    },
    fileFilter: fileFilter,
});

module.exports = upload;
