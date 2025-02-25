import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path'

const app = express();

import { v2 as cloudinary } from 'cloudinary';
// Configuration
cloudinary.config({
    cloud_name: 'dykyxn2rc',
    api_key: '331795857647416',
    api_secret: 'ZiLsOxSXz6b-7hsuePOKC-np0p8'
});


const uri = "mongodb+srv://trinhnguyenluong182306:PnLzcfKx2ltHPMeb@cluster0.0tlff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
    .connect(
        uri,
        {
            "dbName": "Learning-Cloudinary"
        }
    )
    .then(() => {
        console.log('Mongodb connected');
    })
    .catch((error) => {
        console.log(error);
    });

const storage = multer.diskStorage({
    // destination: './public/upload',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })

const fileSchema = new mongoose.Schema({
    fileName: String,
    public_id: String,
    imgUrl: String
})

const File = mongoose.model('Cloudinary', fileSchema)

app.get('/', (req, res) => {
    res.render('index.ejs', { url: null })
})

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file.path;
        const cloudinaryResponse = await cloudinary.uploader.upload(file, {
            folder: 'Learning-Cloudinary'
        });

        const saveToDb = await File.create({
            filename: file.originalname,
            public_id: cloudinaryResponse.public_id,
            imgUrl: cloudinaryResponse.secure_url
        })

        res.render('index.ejs', { url: cloudinaryResponse.secure_url })
        console.log('Cloudinary response ', cloudinaryResponse, saveToDb);
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'File upload failed', error });
    }
})

app.listen(1000, () => {
    console.log('Server is running on port 1000');
})