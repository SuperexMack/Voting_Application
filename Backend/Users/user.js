const express = require("express")
const router = express.Router()
const zod = require("zod")
const jwt = require("jsonwebtoken")
const { Partie } = require("../Schema/schema")
const { Voter } = require("../Schema/schema")
const { PartyRegulator } = require("../Schema/schema")
const AuthMiddleWare = require("./MiddlewareAuth")
const OwnerAuthMiddleWare = require("./OwnerAuth")
const SecretCode = "06062003"

const checkerValidation = zod.object({ // this thing is for the general people
    username: zod.string(),
    aadharNumber: zod.string().min(8).max(8)
})

router.post("/postVote", async (req, res) => {
    let { success } = checkerValidation.safeParse(req.body)
    if (!success) {
        res.status(404).json({
            msg: "The Information added by you is not valid"
        })
    }

    else {
        let user = await Voter.create({
            username: req.body.username,
            aadharNumber: req.body.aadharNumber
        })

        let tokenValue = user._id

        try {
            let usertoken = jwt.sign({
                tokenValue
            }, SecretCode)

            res.status(200).json({
                token: usertoken,
                msg: "User created successfully"
            })
        }
        catch {
            res.status(404).json({
                msg: "Something went wrong while creating the user"
            })
        }
    }
})


router.post("/userEntered", async (req, res) => {
    let { success } = checkerValidation.safeParse(req.body)
    if (!success) {
        res.status(404).json({
            msg: "The Information added by you is not valid"
        })
    }

    let checker = await Voter.findOne({
        aadharNumber: req.body.aadharNumber,
        username: req.body.username
    })

    let tokenValue = checker._id

    if (checker) {
        let tokenofuser = jwt.sign({
            tokenValue
        }, SecretCode)

        res.json({
            token: tokenofuser,
            msg: "Welcome back you can vote at max 2 time"
        })
    }

})

// ----------------------------------------------------------------------------------------------


const checkOwner = zod.object({
    username: zod.string(),
    ElectionNumber: zod.string().min(8).max(8),
    password: zod.string()
})



router.post("/postOwner", async (req, res) => {
    let passwordOwner = req.body.password
    let { success } = checkOwner.safeParse(req.body)
    if (!success) {
        res.status(404).json({
            msg: "The Information added by you is not valid"
        })
    }

    else if (passwordOwner != "06062003") {
        return res.status(404).json({
            msg: "you are not the owner"
        })
    }

    else {
        let user = await PartyRegulator.create({
            username: req.body.username,
            ElectionNumber: req.body.ElectionNumber,
            Isowner : true
        })

        let tokenValue = user._id

        try {
            let usertoken = jwt.sign({
                tokenValue
            }, SecretCode)

            res.status(200).json({
                token: usertoken,
                msg: "User created successfully"
            })
        }
        catch {
            res.status(404).json({
                msg: "Something went wrong while creating the user"
            })
        }
    }
})


router.post("/OwnerEntry", async (req, res) => {
    let passwordOwner = req.body.password
    let { success } = checkOwner.safeParse(req.body)
    if (!success) {
        res.status(404).json({
            msg: "The Information added by you is not valid"
        })
    }

    else if (passwordOwner != "06062003") {
        return res.status(404).json({
            msg: "you are not the owner"
        })
    }

    let checker = await PartyRegulator.findOne({
        ElectionNumber: req.body.ElectionNumber
    })

    let tokenValue = checker._id

    if (checker) {
        let tokenofuser = jwt.sign({
            tokenValue
        }, SecretCode)

        res.json({
            token: tokenofuser,
            msg: "Welcome back you can vote at max 2 time"
        })
    }

})



// -----------------------------------------------------------------------------------------------


router.post("/addVote", AuthMiddleWare, async (req, res) => {
    let checkingUser = req.userValue;
    if (!checkingUser) {
        return res.status(404).json({
            msg: "You are not registered kindly either login or register"
        });
    }

    try {
        let votedOrNot = await Voter.findById(checkingUser);

        if (!votedOrNot) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        if (votedOrNot.voted) {
            return res.status(400).json({
                msg: "You have already voted"
            });
        }

        let Myvote = req.body.MyvoteTo;
        const partyBefore = await Partie.findOne({});
        console.log('Party before update:', partyBefore);
        if (Myvote == "BJP" || Myvote == "INC" || Myvote == "AAP") {
            if (Myvote == "BJP") {
                await Partie.updateOne({}, { $inc: { BJP: 1 } });
            }
            else if (Myvote == "AAP") {
                await Partie.updateOne({}, { $inc: { AAP: 1 } });
            }
            else {
                await Partie.updateOne({}, { $inc: { INC: 1 } });
            }

            // console.log('Update result:', result);

            // Verify the update by fetching the updated state
            const partyAfter = await Partie.findOne({});
            console.log('Party after update:', partyAfter);

            votedOrNot.voted = true;
            votedOrNot.MyvoteTo = Myvote;
            await votedOrNot.save();

            res.status(200).json({
                msg: "Your vote has been counted"
            });
        } else {
            res.status(400).json({
                msg: "Invalid party selection"
            });
        }
    } catch (error) {
        console.error("Error during voting process:", error);
        res.status(500).json({
            msg: "Something went wrong while voting"
        });
    }
});

router.get("/getVotesData", OwnerAuthMiddleWare, async (req, res) => {
    const ownerChecker = req.ownerValue;

    if (!ownerChecker) {
        return res.status(403).json({
            msg: "You are not authorized to view this data"
        });
    }
    try {
        const ownerCheckk = await PartyRegulator.findOne({ _id: ownerChecker, Isowner: true });
        if (!ownerCheckk) {
            return res.status(403).json({
                msg: "No owner is found"
            });
        }

        const getThevotes = await Partie.find({});
        if (getThevotes.length > 0) {
            return res.status(200).json({
                msg: "These are the votes data",
                votes: getThevotes.map(vote => ({
                    BJP: vote.BJP,
                    INC: vote.INC,
                    AAP: vote.AAP
                }))
            });
        } else {
            return res.status(404).json({
                msg: "No votes data found"
            });
        }
    } catch (error) {
        return res.status(500).json({
            msg: "An error occurred while fetching the votes data"
        });
    }
});


module.exports = router
