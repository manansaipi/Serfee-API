const firebaseConfig = require("../config/firebase"); // Import firebase configuration

// CRUD

// C
const pushMessage = (req, res) => {
    const { message } = req.body;
    try {
        // write message to database into "message" collection
        const newMessageRef = firebaseConfig.admin.database().ref("message").push({ // message same like root folder so every message here will push to message
            message,
            timestamp: new Date().getTime()
        });
        const messageId = newMessageRef.key; // get the ID of the newly created message
        res.status(200).json({
            message: "Success to send message",
            data: {
                messageId,
                message
            }
        });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).send("Error sending message");
    }
};

// R
const getMessage = async (req, res) => {
    try {
        // get a database refer to "message2" collection 
        const snapshot = await firebaseConfig.admin.database().ref("message").once("value");
        const messages = [];
        
        // looping every message inside snapshot var
        snapshot.forEach((childSnapshot) => {
            const messageId = childSnapshot.key; // get the message id
            const message = childSnapshot.val(); // get message
            
            messages.push({
                id: messageId,
                message
            });
        });
        
        res.status(200).json({
            message: "Success to get all messages",
            data: {
                messages
            }
        });
    } catch (error) {
        console.error("Error retrieving messages:", error);
        res.status(500).send("Error retrieving messages");
    }
};

// U
const updateMessage = (req, res) => {
    const messageId = req.params.id;
    const updatedMessage = req.body;
    try {
        // get a database reference to the message with the given ID
        const messageRef = firebaseConfig.admin.database().ref(`/message/${messageId}`);

        // update message in the database
        messageRef.update(updatedMessage);
        res.status(200).json({
            message: "Update message success",
            data: {
                messageId,
                ...updatedMessage
            }
        }); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to update message");
    }
};

// D
const deleteMessage = (req, res) => {
    const messageId = req.params.id;

    // get a database reference to the message with the given ID
    const messageRef = firebaseConfig.admin.database().ref(`message/${messageId}`);
    try {
        // deleting message
        messageRef.remove();
        res.status(200).json({
            message: `Message with id -> ${messageId}, successfully deleted`,
        });
    } catch (error) {
        res.status(500).json({
            message: `Error deleting message ${messageId}`,
            serverMessage: error,
        });
    }
};

module.exports = {
    getMessage,
    pushMessage,
    updateMessage,
    deleteMessage
};