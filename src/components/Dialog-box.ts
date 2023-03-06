import { DOMHelpsters } from "../services/DOMHelpsters.js";
import { User } from "./User.js";
import { Services } from "../services/services.js";

export class DialogBox {
  name: string | undefined;
  constructor() {}
  public create() {
    const parentNode = document.getElementById("body");
    const boxWrapper: HTMLElement = DOMHelpsters.createElement("div", [
      "boxWrapper",
    ]);

    const content: string = `
          <div id="window">
              <p class="o-text-18-op-4" id="info">Enter your name:</p>
              <input placeholder="Username" id="input" class="o-text-18-op-4"/>   
              <button id="signup" class="o-text-18-op-4 button-style-default">Submit</button>
              <button id="cancel" class="o-text-18-op-4 button-style-default">Cancel</button>
          </div>`;

    if (parentNode) {
      parentNode.appendChild(boxWrapper);
      DOMHelpsters.renderElement(boxWrapper, content);
    } else throw new Error("ParentNode not found");
  }

  public update(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const signUpBtn = document.getElementById("signup") as HTMLButtonElement;
      const inputNode = document.getElementById("input") as HTMLInputElement;
      const cancelBtn = document.getElementById("cancel") as HTMLButtonElement;
      const boxWrapper = document.querySelector(
        ".boxWrapper"
      ) as HTMLDivElement;
      const boxIinfo = document.getElementById("info") as HTMLParagraphElement;
      const minInput: number = 3;

      const userLogInteraction = (event: Event) => {
        if (inputNode.value.length >= minInput) {
          this.name = inputNode.value;
          boxWrapper.remove();
          resolve(this.name);
          inputNode.value = "";
        } else {
          inputNode.value = "";
          boxIinfo.textContent = "Your name must have at least 3 characters";
          setTimeout(() => {
            boxIinfo.textContent = "Input your name:";
          }, 2000);
        }
      };
      signUpBtn.addEventListener("click", userLogInteraction);
      cancelBtn.addEventListener("click", () => {
        boxWrapper.remove();
        reject(new Error("Cancelled"));
        window.location.reload();
      });
    });
  }
}
