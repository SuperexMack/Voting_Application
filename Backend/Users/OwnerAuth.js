const express = require("express")
const router = express.Router()
const zod = require("zod")
const jwt = require("jsonwebtoken")
const { Partie } = require("../Schema/schema")
const { Voter } = require("../Schema/schema")
const { PartyRegulator } = require("../Schema/schema")
const SecretCode = "06062003"

const OwnerAuthMiddleWare = async (req, res, next) => {
    const checker = req.headers.authorization;
    if (!checker || !checker.startsWith("Bearer ")) {
        return res.status(401).json({
            msg: "Authorization header is missing or invalid"
        });
    }
    const token = checker.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SecretCode);
        const owner = await PartyRegulator.findOne({ _id: decoded.tokenValue, Isowner: true });
        if (!owner) {
            return res.status(403).json({
                msg: 'Not allowed'
            });
        }
        req.ownerValue = decoded.tokenValue;
        next();
    } catch (error) {
        return res.status(403).json({
            msg: "Authentication failed",
            error: error.message
        });
    }
};


module.exports = OwnerAuthMiddleWare