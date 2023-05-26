const dbPool = require("../config/mysql");

const createFeedback = (user_id, offer_id, rating, comment, recipient_id) => {
    const SQLQuery = `INSERT INTO Reviews (reviewer_id, offer_id, rating, comment, created_at, recipient_id ) VALUES ('${user_id}', '${offer_id}', '${rating}', '${comment}', NOW(), '${recipient_id}')`;
    return dbPool.execute(SQLQuery);
};
const getSumRating = (recipient_id) => {
    const SQLQuery = `SELECT SUM(rating) AS cumulative_rating, COUNT(*) AS review_count FROM Reviews WHERE recipient_id = '${recipient_id}'`;
    return dbPool.execute(SQLQuery);
};

module.exports = {
    createFeedback,
    getSumRating
};