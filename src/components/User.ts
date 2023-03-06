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
  }

  public createAvatar(): Promise<string> {
    return new Promise((resolve, reject) => {
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
                resolve(this.avatarUrl);
              };
            });
          } else {
            console.log("Error retrieving avatar image");
            reject(new Error("Error retrieving avatar image"));
          }
        })
        .catch((error) => {
          console.log("Error retrieving avatar image", error);
          reject(new Error("Error retrieving avatar image"));
        });
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
    } else return false;
  }

  public userLogged() {
    return this.isLoggedIn;
  }

  public userHasName() {
    return this.name;
  }

  public userHasAvatar(): string {
    return this.avatarUrl;
  }
}
