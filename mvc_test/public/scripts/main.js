import View from "./view.js";

export default function main() {
    const _view = new View();
    _view.render();

    let [i, max] = [0, 10]
    let timer = setInterval(
        () => {
            _view.count += 1;
            _view.update();
            console.log(`Count is now ${_view.count}`);
            i++;
            if (i >= max) {
                clearInterval(timer);
            }
        },
        500
    );
}

main();