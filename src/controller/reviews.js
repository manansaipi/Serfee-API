const ReviewsModel = require("../models/reviews");
const UsersModel = require("../models/users");

// updateing user data (rating)
const updateUserData = async (recipient_id, rating) => {
    try {
        // Retrieve the cumulative rating and review count for the user
        const [results] = await ReviewsModel.getSumRating(recipient_id);
        const cumulativeRating = parseFloat(results[0].cumulative_rating);
        const currentReviewCount = parseFloat(results[0].review_count);

        // Calculate the new cumulative rating and review count
        const newCumulativeRating = (cumulativeRating + rating);
        const review_count = (currentReviewCount + 1);

        // Calculate the average rating
        const newRating = (newCumulativeRating / review_count);

        await UsersModel.updateUserRating(recipient_id, newRating);
    } catch (error) {
        console.error("Error updating user data:", error);
    }
};

// create feedback by user to tasker after finished his job/task
const createFeedback = async (req, res) => {
    const firebase_uid = req.user.uid;
    const { body } = req;
    const offer_id = body.offer_id;
    const rating = parseFloat(body.rating);
    const comment = body.comment;   
    const recipient_id = body.recipient_id;

    try {
        // get user_id in table sql
        const [data] = await UsersModel.getUser_id(firebase_uid);
        const user_id = (data[0].user_id);
        // insert into sql feedback from user
        updateUserData(recipient_id, rating);
        await ReviewsModel.createFeedback(user_id, offer_id, rating, comment, recipient_id);
        res.json({
            message: "Create feedback success",
            body
        });
    } catch (error) {
        console.error(error);
        res.send({ error });
    }
};

module.exports = {
    createFeedback
};