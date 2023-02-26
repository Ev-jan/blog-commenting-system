export class User {
    constructor() {
        this.name = "";
        this.isLoggedIn = false;
        this.votedUp = [];
        this.votedDown = [];
        this.favouriteComments = [];
        this.avatarUrl = "";
    }
    login(name) {
        this.name = name;
        this.isLoggedIn = true;
        this.createAvatar();
        this.loadUserFromStorage();
    }
    logout() {
        this.isLoggedIn = false;
        this.votedUp = [];
        this.votedDown = [];
        this.favouriteComments = [];
        this.avatarUrl = "";
        // this.saveUserToStorage();
    }
    voteUp(commentId) {
        if (!this.votedUp.includes(commentId)) {
            this.votedUp.push(commentId);
            this.saveUserToStorage();
        }
    }
    voteDown(commentId) {
        if (!this.votedDown.includes(commentId)) {
            this.votedDown.push(commentId);
            this.saveUserToStorage();
        }
    }
    addCommentToFavourites(commentId) {
        if (!this.favouriteComments.includes(commentId)) {
            this.favouriteComments.push(commentId);
            this.saveUserToStorage();
        }
    }
    getVotedUpComments() {
        return this.votedUp;
    }
    getVotedDownComments() {
        return this.votedDown;
    }
    getFavouriteComments() {
        return this.favouriteComments;
    }
    createAvatar() {
        const numImages = 10;
        const imageIndex = Math.floor(Math.random() * numImages);
        const imageUrl = `https://picsum.photos/id/${imageIndex}/200`;
        fetch(imageUrl)
            .then((response) => {
            if (response.ok) {
                response.blob().then((blob) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = () => {
                        const imageUrl = reader.result;
                        this.avatarUrl = imageUrl;
                        this.saveUserToStorage();
                    };
                });
            }
            else {
                console.log("Error retrieving avatar image");
            }
        })
            .catch((error) => {
            throw new Error(error);
        });
    }
    saveUserToStorage() {
        const userData = JSON.stringify({
            name: this.name,
            isLoggedIn: this.isLoggedIn,
            votedUp: this.votedUp,
            votedDown: this.votedDown,
            favouriteComments: this.favouriteComments,
            avatarUrl: this.avatarUrl,
        });
        localStorage.setItem("user", userData);
    }
    loadUserFromStorage() {
        const userData = localStorage.getItem("user");
        if (userData) {
            const user = JSON.parse(userData);
            this.name = user.name;
            this.isLoggedIn = user.isLoggedIn;
            this.votedUp = user.votedUp;
            this.votedDown = user.votedDown;
            this.favouriteComments = user.favouriteComments;
            this.avatarUrl = user.avatarUrl;
        }
        else
            return false;
    }
    userLogged() {
        return this.isLoggedIn;
    }
    userHasName() {
        return this.name;
    }
    userHasAvatar() {
        return this.avatarUrl;
    }
}
