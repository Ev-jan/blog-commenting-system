export class CommentThread {
    constructor() {
        this.ownId = "";
        this.author = "";
        this.avatar = "";
        this.timeStamp = "";
        this.text = "";
        this.votes = 0;
        this.isAddedTofavourite = false;
        this.parentId = "";
        this.interlocutor = "";
    }
    storeMessage(ownId, storedUser, storedAvatar, timeStamp, text, votes, isAddedTofavourite, currentUser, currentUserAvatar, parentId) {
        const commentToStore = {
            ownId: ownId,
            storedUser: storedUser,
            storedAvatar: storedAvatar,
            timeStamp: timeStamp,
            text: text,
            votes: votes,
            isAddedTofavourite: isAddedTofavourite,
            currentUser: currentUser,
            currentUserAvatar: currentUserAvatar,
            parentId: parentId
        };
        const commentToString = JSON.stringify(commentToStore);
        const commentThreadJSON = localStorage.getItem("commentThread");
        if (commentThreadJSON) {
            let commentThread = JSON.parse(commentThreadJSON);
            if (commentThread) {
                commentThread.push(commentToString);
                const commentThreadToString = JSON.stringify(commentThread);
                localStorage.setItem("commentThread", commentThreadToString);
            }
        }
        else
            throw new Error("No commentThread available in localStorage");
    }
    // Retrieve the entire comment thread from the localStorage even if only a specific comment needs to be updated
    updateStoredData(commentId, fieldToUpdate, updatedValue) {
        let commentThread = this.getCommentThread();
        if (commentThread && commentThread.length > 0) {
            let updatedComments = commentThread.map((commentJSON) => {
                const comment = JSON.parse(commentJSON);
                if (comment.OwnId === commentId) {
                    comment[fieldToUpdate] = updatedValue;
                }
                return JSON.stringify(comment);
            });
            commentThread = updatedComments;
            localStorage.setItem("commentThread", JSON.stringify(commentThread));
        }
        else
            throw new Error("No commentThread available in localStorage");
    }
    getCommentThread() {
        const commentThread = localStorage.getItem("commentThread");
        if (commentThread) {
            return JSON.parse(commentThread);
        }
        else {
            this.initCommentThread();
        }
    }
    initCommentThread() {
        const emptyCommentThread = [];
        localStorage.setItem("commentThread", JSON.stringify(emptyCommentThread));
    }
}
