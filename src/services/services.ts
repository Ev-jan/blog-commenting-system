export class Services {

  static getInputValue(event: Event) {
    let target: HTMLTextAreaElement | HTMLInputElement | null =
      event.target as HTMLTextAreaElement | HTMLInputElement | null;
    if (target) {
      let inputValue: string = target.value;
      if (inputValue) {
        return inputValue;
      }
    } else {
      console.error("element does not exist");
    }
  }

  static getCurrentTimeStamp(): string {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      return `${day}.${month} ${hours}:${minutes}`;
    

  }


  static createUserProfile() {}
  // function to be shared amongst multiple entities:
  // 1. CommentForm: checks if user is logged in or not. If yes, takes his nickname from cash, otherwise - runs its default scenario.
  // 2. comment: posted comment should run this check to ensure that:
  //    a user can  vote down or up only once
  static checkCash() {}

  static currentId: number = 0;

  static generateId(): number {
    return ++this.currentId;
  }
}
