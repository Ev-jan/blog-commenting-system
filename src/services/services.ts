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


  static currentId: number = 0;

  static generateId(): number {
    return ++this.currentId;
  }


}
