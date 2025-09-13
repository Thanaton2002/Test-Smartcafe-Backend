import multer from "multer";
import fs from "fs";
import path from "path";

const desty = path.join(process.cwd(), "src/temp_files");
if (!fs.existsSync(desty)) {
    fs.mkdirSync(desty, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, desty),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}_${Math.round(Math.random() * 1e6)}${ext}`
        cb(null, filename);
    }
});

const upload = multer({storage})

export default upload