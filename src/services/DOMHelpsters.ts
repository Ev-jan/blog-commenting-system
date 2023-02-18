import { CommentComponent } from "../components/Comment";

export class DOMHelpsters {
  static getElementOOClass(
    idSelector: string,
    classSelector?: string
  ): HTMLElement | HTMLButtonElement | null | undefined {
    let reqElement: HTMLElement | null | undefined;
    if (!!classSelector) {
      let arr = this.getArrOfElements(classSelector);
      if (!!arr) {
        reqElement = arr.find((element) => element.id === idSelector);
        return reqElement;
      }
    } else {
      reqElement = document.querySelector(idSelector) as HTMLElement;
      return reqElement;
    }
  }

  static getArrOfElements(selector: string): Array<HTMLElement> | null {
    const nodes: HTMLCollectionOf<HTMLElement> =
      document.getElementsByClassName(
        selector
      ) as HTMLCollectionOf<HTMLElement>;
    const arrayOfElements = [...nodes];
    return arrayOfElements;
  }

  static createElement = (tag: string, classes?: string[]): HTMLElement => {
    const element = document.createElement(tag);
    if (classes) {
      element.classList.add(...classes);
    }
    return element;
  };

  static appendElement(parent: HTMLElement, child: HTMLElement): void {
    parent.appendChild(child);
  };

  static renderElement(element: HTMLElement | null, content: string) {
    
    if (element) {
      element.innerHTML = content;
    } else console.log(element);
  }

  static deletElementById(id: string): boolean {
    const element = document.getElementById(id);
    if (element) {
      element.remove();
      return true;
    } else {
      return false;
    }
  }
}
