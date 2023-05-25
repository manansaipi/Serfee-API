const ReviewsModel = require("../models/reviews");
const UsersModel = require("../models/users");

const createFeedback = async (req, res) => {
    const firebase_uid = req.user.uid;
    const { body } = req;
    const offer_id = body.offer_id;
    const rating = body.rating;
    const comment = body.comment;   
    const recipient_id = body.recipient_id;

    try {
        // get user_id in table sql
        const [data] = await UsersModel.getUser_id(firebase_uid);
        const user_id = (data[0].user_id);
        // insert into sql feedback from user
        await ReviewsModel.createFeedback(user_id, offer_id, rating, comment, recipient_id);
        res.json({
            message: "Create feedback success",
            body
        });
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};

module.exports = {
    createFeedback
};