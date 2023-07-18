export default class View {
    count;

    constructor(
        count = 0,
    ) {
        console.log(`View param count is ${count}`);
        this.count = count;
        console.log(`View property count is ${this.count}`);
        this.root = document.querySelector("#root");
    }

    render() {
        const count_paragraph = document.createElement("p");
        count_paragraph.textContent = `Count is ${this.count}`;
        this.root.appendChild(count_paragraph);
    }

    update() {
        const count_paragraph_handle = document.querySelector("p");
        count_paragraph_handle.textContent = `Count is ${this.count}`;
    }
}