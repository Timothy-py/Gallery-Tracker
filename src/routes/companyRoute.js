const companyRouter = require('express').Router()
const { createCompany } = require('../controllers/companyController')

companyRouter.post('/', createCompany)

module.exports = companyRouter;