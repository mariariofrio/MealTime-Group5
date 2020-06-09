const User = require("../models/User");
const Orders = require("../models/orders");
const path = require("path");

module.exports = function (app) {

    app.post("/api/createUser", (req, res) => {

        const user = req.body;
        user.passWord = bcrypt.hashSync(user.passWord, 10);
        User.create(user)
            .then(() => {
                res.redirect("/")
            })
    })

    app.post("/login", (req, res) => {

        const user = {
            userName: req.body.userName,
            passWord: req.body.passWord
        }

        User.findOne({
            where: {
                userName: user.userName,
                passWord: user.passWord
            }
        }).then(data => {


            if (data === null) {

               return res.send(false)
            } else if (data.dataValues.userName === user.userName &&
                data.dataValues.passWord === user.passWord) {
                    console.log("you got the conditionals right")
               return res.json(user);
            }else{
              return  console.log("something not quite right.")
            }

        })

    })






};