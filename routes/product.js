const express = require('express');
const router = express.Router();
const ProductModel = require('../model/product')
const Category = require('../model/category')
const cloudinary = require('cloudinary').v2;

// Configuration 
cloudinary.config({
    cloud_name: "dg0z2i7nh",
    api_key: "162913275226997",
    api_secret: "EmM_4wLiZFA10OEnoeEzgQXn8oU"
});


const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if (isValid) {
            uploadError = null
        }
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {

        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
})

const uploadOptions = multer({ storage: storage })

router.get('/', async (req, res) => {
    const product = await ProductModel.find().populate('category')
    //.select('name image -_id')
    if (!product) {
        res.status(500).json({
            error: "there are no products"
        })
    }
    res.status(200).json({
        products: product
    })
})



router.post('/',
    // uploadOptions.single('image'), 
    async (req, res) => {
        console.log(req.body)

        const category = await Category.findById(req.body.category)
        if (!category)
            return res.status(404).json({
                error: "Invalid categroy id"
            })

        // const file = req.file;
        // if (!file) return res.status(400).send('No image in the request')

        // const fileName = file.filename
        // const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        const imagefile = req.files.image;
        cloudinary.uploader.upload(imagefile.tempFilePath, (err, result) => {
            const product = ProductModel({
                name: req.body.name,
                description: req.body.description,
                richDescription: req.body.richDescription,
                // image: `${basePath}${fileName}`,
                image: result.url,
                brand: req.body.brand,
                price: req.body.price,
                category: req.body.category,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                isFeatured: req.body.isFeatured,
            })
            product.save().then((result) => {
                res.status(200).json({
                    data: result
                })
            }).catch((err) => {
                res.status(500).json({
                    error: err
                });
            })



        })




    })


router.get('/:id', async (req, res) => {
    const product = await ProductModel.findById(req.params.id)
    if (!product) {
        res.status(500).json({
            error: "there are no products"
        })
    }
    res.status(200).json({
        products: product
    })
})


router.put('/:id', async (req, res) => {
    const product = await ProductModel.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        }

    )
    if (!product) {
        res.status(500).json({
            error: "there are no products"
        })
    }
    res.status(200).json({
        products: product
    })
})
router.delete('/:id', async (req, res) => {
    const product = await ProductModel.findByIdAndDelete(req.params.id)
    if (!product) {
        res.status(500).json({
            error: "there are no products"
        })
    }
    res.status(200).json({
        products: product
    })
})




router.put(
    '/gallery-images/:id',
    uploadOptions.array('images', 10),
    async (req, res) => {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).send('Invalid Product Id')
        }
        const files = req.files
        let imagesPaths = [];
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

        if (files) {
            files.map(file => {
                imagesPaths.push(`${basePath}${file.filename}`);
            })
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                images: imagesPaths
            },
            { new: true }
        )

        if (!product)
            return res.status(500).send('the gallery cannot be updated!')

        res.send(product);
    })

module.exports = router;