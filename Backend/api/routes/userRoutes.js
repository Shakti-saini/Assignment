
/* Controller import starts */
const userCntrl = require('../controllers/userController');
const emailCntrl  = require('../controllers/emailController');
/* Controller import  ends */

/* validate model import starts */
const userModel = require('../validate-models/userModel');
/* validate model  import  ends */

/* validate model import starts */
const emailModel = require('../validate-models/emailValidation');
/* validate model  import  ends */

/**Multer services */
const upload = require("../services/multerService")


const auth = require('../middleware/auth');


module.exports = function (app, validator) {
   /**User Routes Start */
   app.post('/api/user/signup',validator.body(userModel.signupUser),userCntrl.signupUser);
 /**User Routes Ends */


  /**Email Routes Start */
   app.post('/api/email/send' ,upload.array("attachments", 5),validator.body(emailModel.emailSchema),emailCntrl.sendEmail);  // max 5 files
 /**Email Routes Ends */
}
