const uuid = require('uuid')
const path = require('path');
const {Guitar, GuitarInfo} = require('../models/models')
const ApiError = require('../error/ApiError');

class GuitarController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const guitar = await Guitar.create({name, price, brandId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    GuitarInfo.create({
                        title: i.title,
                        description: i.description,
                        guitarId: guitar.id
                    })
                )
            }

            return res.json(guitar)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let guitars;
        if (!brandId && !typeId) {
            guitars = await Guitar.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            guitars= await Guitar.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            guitars = await Guitar.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            guitars = await Guitar.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(guitars)
    }

    async getOne(req, res) {
        const {id} = req.params
        const guitar = await Guitar.findOne(
            {
                where: {id},
                include: [{model: GuitarInfo, as: 'info'}]
            },
        )
        return res.json(guitar)
    }
}

module.exports = new GuitarController()