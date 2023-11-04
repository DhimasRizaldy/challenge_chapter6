const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getPagination } = require("../handler/pagination");
const path = require('path');
const imagekit = require("../libs/imagekit");


module.exports = {
  // Create a new gallery
  createGalery: async (req, res, next) => {
    try {
      const { title, description } = req.body;
      const imageFile = req.file;

      if (!imageFile) {
        return res.status(400).json({
          status: false,
          message: 'Image file not found',
        });
      }

      const strFile = imageFile.buffer.toString('base64');

      const { url } = await imagekit.upload({
        fileName: Date.now() + path.extname(imageFile.originalname),
        file: strFile,
      });

      const newGallery = await prisma.galery.create({
        data: {
          title,
          description,
          image: url,
        },
      });

      res.status(201).json({
        status: true,
        message: 'Gallery created successfully!',
        data: newGallery,
      });
    } catch (err) {
      next(err);
    }
  },

  // get all galery
  getAllGalery: async (req, res, next) => {
    try {
      let { limit = 10, page = 1 } = req.query;
      limit = Number(limit);
      page = Number(page);

      let galery = await prisma.galery.findMany({
        skip: (page - 1) * limit,
        take: limit,
      });

      const { _count } = await prisma.galery.aggregate({
        _count: { id: true }
      });

      let pagination = getPagination(req, _count.id, page, limit);

      res.status(200).json({
        status: true,
        message: 'OK',
        data: { pagination, galery }
      });
    } catch (err) {
      next(err);
    }
  },

  // get detail galery by id
  getDetailGalery: async (req, res, next) => {
    try {
      let { id } = req.params;
      let galery = await prisma.galery.findUnique({ where: { id: Number(id) } });

      if (!galery) {
        return res.status(400).json({
          status: false,
          message: 'Bad Request',
          data: 'No Galery Found With Id ' + id
        });
      }

      res.status(200).json({
        status: true,
        message: 'Detail Galery',
        data: galery
      });
    } catch (err) {
      next(err);
    }
  },

  // update galery
  updateGalery: async (req, res, next) => {
    try {
      let { id } = req.params;
      let { title, description } = req.body;
      const imageFile = req.file;

      if (!imageFile) {
        return res.status(400).json({
          status: false,
          message: 'Image file not found',
        });
      }

      const strFile = imageFile.buffer.toString('base64');

      const { url } = await imagekit.upload({
        fileName: Date.now() + path.extname(imageFile.originalname),
        file: strFile,
      });

      let updateOperation = await prisma.galery.update({
        where: { id: Number(id) },
        data: {
          title,
          description,
          image: url
        }
      });

      res.status(200).json({
        status: true,
        message: 'Updated Galery Succesfully!',
        data: updateOperation
      });
    } catch (err) {
      next(err);
    }
  },

  // delete galery
  deleteGalery: async (req, res, next) => {
    try {
      let { id } = req.params;

      let deleteOperation = await prisma.galery.delete({
        where: { id: Number(id) }
      });

      if (!deleteOperation) {
        return res.status(400).json({
          status: false,
          message: 'Bad Request',
          data: 'No Galery Found With Id ' + id
        });
      }

      res.status(200).json({
        status: true,
        message: 'Delete Galery Successfuly!',
        data: deleteOperation
      });
    } catch (err) {
      next(err);
    }
  },

  // delete image
  deleteImage: async (req, res, next) => {
    try {
      let { id } = req.params;

      let updateOperation = await prisma.galery.update({
        where: { id: Number(id) },
        data: {
          image: null, // Menghapus gambar dengan mengatur nilainya ke null
        }
      });

      res.status(200).json({
        status: true,
        message: 'Gambar Berhasil Dihapus!',
        data: updateOperation
      });
    } catch (err) {
      next(err);
    }
  }

}