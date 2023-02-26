export class User {
  name: string;
  private isLoggedIn: boolean;
  private votedUp: string[];
  private votedDown: string[];
  private favouriteComments: string[];
  avatarUrl: string;

  constructor() {
    this.name = "";
    this.isLoggedIn = false;
    this.votedUp = [];
    this.votedDown = [];
    this.favouriteComments = [];
    this.avatarUrl = "";
  }

  public login(name: string): void {
    this.name = name;
    this.isLoggedIn = true;
    this.createAvatar();
    this.loadUserFromStorage();
  }

  public logout(): void {
    this.isLoggedIn = false;
    this.votedUp = [];
    this.votedDown = [];
    this.favouriteComments = [];
    this.avatarUrl = "";
    // this.saveUserToStorage();
  }

  public voteUp(commentId: string): void {
    if (!this.votedUp.includes(commentId)) {
      this.votedUp.push(commentId);
      this.saveUserToStorage();
    }
  }

  public voteDown(commentId: string): void {
    if (!this.votedDown.includes(commentId)) {
      this.votedDown.push(commentId);
      this.saveUserToStorage();
    }
  }

  public addCommentToFavourites(commentId: string): void {
    if (!this.favouriteComments.includes(commentId)) {
      this.favouriteComments.push(commentId);
      this.saveUserToStorage();
    }
  }

  public getVotedUpComments(): string[] {
    return this.votedUp;
  }

  public getVotedDownComments(): string[] {
    return this.votedDown;
  }

  public getFavouriteComments(): string[] {
    return this.favouriteComments;
  }

  private createAvatar(): void {
    const numImages: number = 10;
    const imageIndex: number = Math.floor(Math.random() * numImages);
    const imageUrl: string = `https://picsum.photos/id/${imageIndex}/200`;
    fetch(imageUrl)
      .then((response) => {
        if (response.ok) {
          response.blob().then((blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              const imageUrl = reader.result as string;
              this.avatarUrl = imageUrl;
              this.saveUserToStorage();
            };
          });
        } else {
          console.log("Error retrieving avatar image");
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  private saveUserToStorage(): void {
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

  public loadUserFromStorage(): void | boolean {
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
    else return false;
  }

  public userLogged() {
    return this.isLoggedIn;
  }

  public userHasName() {
    return this.name;
  }

  public userHasAvatar() {
    return this.avatarUrl;
  }
}
