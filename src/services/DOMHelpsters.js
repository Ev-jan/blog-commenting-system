export class DOMHelpsters {
    static getElementOOClass(idSelector, classSelector) {
        let reqElement;
        if (!!classSelector) {
            let arr = this.getArrOfElements(classSelector);
            if (!!arr) {
                reqElement = arr.find((element) => element.id === idSelector);
                return reqElement;
            }
        }
        else {
            reqElement = document.querySelector(idSelector);
            return reqElement;
        }
    }
    static getArrOfElements(selector) {
        const nodes = document.getElementsByClassName(selector);
        const arrayOfElements = [...nodes];
        return arrayOfElements;
    }
    static renderElement(element, content) {
        if (element) {
            element.innerHTML = content;
        }
        else
            console.log(element);
    }
    static deletElementById(id) {
        const element = document.getElementById(id);
        if (element) {
            element.remove();
            return true;
        }
        else {
            return false;
        }
    }
}
DOMHelpsters.createElement = (tag, classes) => {
    const element = document.createElement(tag);
    if (classes) {
        element.classList.add(...classes);
    }
    return element;
};
