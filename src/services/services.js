export class Services {
    static render(element, content) {
        if (element) {
            element.innerHTML = content;
        }
        else
            console.log(element);
    }
    static validateInput(input) {
        return typeof input === 'string';
    }
}
