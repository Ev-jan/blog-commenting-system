export class Services {
  static getInputValue(event: Event) {
    let target: HTMLTextAreaElement | HTMLInputElement | null = event.target as
      | HTMLTextAreaElement
      | HTMLInputElement
      | null;
    if (target) {
      let inputValue: string = target.value;
      if (inputValue) {
        return inputValue;
      }
    } else {
      console.error("element does not exist");
    }
  }

  static getCurrentTimeStamp(
    format: "date" | "timestamp" = "timestamp"
  ): string | Date {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");

    switch (format) {
      case "date":
        return currentDate;
      case "timestamp":
      default:
        return `${day}.${month} ${hours}:${minutes}`;
    }
  }

  static generateId(): string {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    let hex = "";
    for (let i = 0; i < array.length; i++) {
      hex += array[i].toString(16).padStart(2, "0");
    }
    return hex;
  }
}
