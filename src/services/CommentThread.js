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
    storeMessage(ownId, storedUser, storedAvatar, timeStamp, date, text, votes, isAddedTofavourite, replyCount, currentUser, currentUserAvatar, parentId) {
        const commentToStore = {
            ownId: ownId,
            storedUser: storedUser,
            storedAvatar: storedAvatar,
            timeStamp: timeStamp,
            date: date,
            text: text,
            votes: votes,
            addedTofavourite: isAddedTofavourite,
            replyCount: replyCount,
            currentUser: currentUser,
            currentUserAvatar: currentUserAvatar,
            parentId: parentId,
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
    updateStoredData(commentId, fieldToUpdate, updatedValue) {
        let commentThread = this.getCommentThread();
        if (commentThread && commentThread.length > 0) {
            let updatedComments = commentThread.map((commentJSON) => {
                const comment = JSON.parse(commentJSON);
                if (comment.ownId === commentId) {
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
    arrStringToArrObj(commentThread) {
        const arrOfObj = [];
        for (const commentString of commentThread) {
            const threadItem = JSON.parse(commentString);
            arrOfObj.push(threadItem);
        }
        return arrOfObj;
    }
    initCommentThread() {
        const emptyCommentThread = [];
        localStorage.setItem("commentThread", JSON.stringify(emptyCommentThread));
    }
}
