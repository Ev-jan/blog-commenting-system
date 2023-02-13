export class Services {
  static render(element: HTMLElement | null, content: string) {
    if (element) {
      element.innerHTML = content;
    } else console.log(element);
  }

  static validateInput(input: any): input is string {
    return typeof input === "string";
  }

  static getCurrentTimeStamp(): string {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    return `${day}.${month} ${hours}:${minutes}`;
  }

  static displayCurrentDateTime(): void {
    const currentDateTime = this.getCurrentTimeStamp();
  }
}
