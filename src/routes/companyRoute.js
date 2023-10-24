const companyRouter = require('express').Router()
const { registerCompany } = require('../controllers/companyController')

companyRouter.post('/register', registerCompany)

module.exports = companyRouter;