import { DOMHelpsters } from "../services/DOMHelpsters.js";
export class DialogBox {
    constructor() { }
    create() {
        const parentNode = document.getElementById("body");
        const boxWrapper = DOMHelpsters.createElement("div", [
            "boxWrapper",
        ]);
        const content = `
          <div id="window">
              <p class="o-text-18-op-4" id="info">Enter your name:</p>
              <input placeholder="Username" id="input" class="o-text-18-op-4"/>   
              <button id="signup" class="o-text-18-op-4 button-style-default">Submit</button>
              <button id="cancel" class="o-text-18-op-4 button-style-default">Cancel</button>
          </div>`;
        if (parentNode) {
            parentNode.appendChild(boxWrapper);
            DOMHelpsters.renderElement(boxWrapper, content);
        }
        else
            throw new Error("ParentNode not found");
    }
    update() {
        return new Promise((resolve, reject) => {
            const signUpBtn = document.getElementById("signup");
            const inputNode = document.getElementById("input");
            const cancelBtn = document.getElementById("cancel");
            const boxWrapper = document.querySelector(".boxWrapper");
            const boxIinfo = document.getElementById("info");
            const minInput = 3;
            const userLogInteraction = (event) => {
                if (inputNode.value.length >= minInput) {
                    this.name = inputNode.value;
                    boxWrapper.remove();
                    resolve(this.name);
                    inputNode.value = "";
                }
                else {
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
