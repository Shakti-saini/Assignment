const EmailLog = require("../models/models/emailLog");
const Models = require('../models');
const emailModel = Models.emailLog;
const { sendMailService } = require("../services/mail.services");
const resModel = require('../lib/resModel');

module.exports.sendEmail = async (req, res, next) => {
    try {
        const { to, cc, bcc, subject, body } = req.body;
        await sendMailService(req.body, req.files);

        let emailRes = await emailModel.create({
            to_emails:to,
            cc_emails:cc,
           cc_emails: bcc,
            subject,
            body,
            status: "SUCCESS",
        });
        if (emailRes) {
            resModel.success = false;
            resModel.message = "Email sent successfully";
            resModel.data = emailRes;
            res.status(200).json(resModel);
        } else {
            resModel.success = false;
            resModel.message = "Something went wrong";
            resModel.data = null;
            res.status(500).json(resModel)
        }


    } catch (error) {
        await EmailLog.create({
            subject: req.body.subject,
            body: req.body.body,
            status: "FAILED",
        });

        resModel.success = false;
        resModel.message = "Internal Server Error";
        resModel.data = null;
        res.status(500).json(resModel);
    }
};