
const becryptService = require('../services/bcrypt.services');
const jwtService = require('../services/jwt.services');
const resModel = require('../lib/resModel');
const userServices = require('../services/user.service');

/**
 * @api {post} /api/user/signup Signup User
 * @apiName Signup User
 * @apiGroup User
 * @apiBody {String} first_name User FirstName.
 * @apiBody {String} last_name User LastName.
 * @apiBody {String} email User Email.
 * @apiBody {Integer} role_id RoleId.
 * @apiBody {String} password Password.
 * @apiDescription User Service...
 * @apiSampleRequest http://localhost:2001/api/user/signup
 */
module.exports.signupUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        const userCheck = await userServices().getUserByEmail(email);
        if (userCheck) {
            resModel.success = false;
            resModel.message = "User  Already Exists";
            resModel.data = null;
            res.status(201).json(resModel);
        } else {
            let passwordHash = await becryptService.generatePassword(password)
            if (passwordHash) {
                let userInfo = {
                    email: email.toLowerCase(),
                    password: passwordHash,
                    role_id: 2,
                    first_name: first_name?.length > 0 ? first_name.toLowerCase() : null,
                    last_name: last_name?.length > 0 ? last_name.toLowerCase() : null,
                }

                const users = await userServices().addUser(userInfo);
                if (users) {
                    resModel.success = true;
                    resModel.message = "User Added Successfully";
                    resModel.data =  users 
                    res.status(200).json(resModel)

                } else {
                    resModel.success = false;
                    resModel.message = "Error while creating User";
                    resModel.data = null;
                    res.status(400).json(resModel);
                }
            } else {
                resModel.success = false;
                resModel.message = "Something went wrong";
                resModel.data = null;
                res.status(500).json(resModel)
            }
        }
    } catch (error) {
        resModel.success = false;
        resModel.message = "Internal Server Error";
        resModel.data = null;
        res.status(500).json(resModel);

    }
}
