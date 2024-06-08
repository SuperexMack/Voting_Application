const express = require("express")
const router = express.Router()
const zod = require("zod")
const jwt = require("jsonwebtoken")
const { Partie } = require("../Schema/schema")
const { Voter } = require("../Schema/schema")
const { PartyRegulator } = require("../Schema/schema")
const SecretCode = "06062003"

const AuthMiddleWare = (req, res, next) => {
    const checker = req.headers.authorization
    if (!checker.startsWith("Bearer ") || !checker) {
        return res.json({
            msg: "Something is wrong with your authorization"
        })
    }
    let token = checker.split(' ')[1]
    try {

        let response = jwt.verify(token, SecretCode)
        if (response.tokenValue) {
            req.userValue = response.tokenValue
            next()
        }
    }

    catch{
        return res.status(404).json({
            msg:"Whole middleware authentication is failed || you had done something extremly wrong "
        })
    }

}

module.exports = AuthMiddleWare