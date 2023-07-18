import View from "./view.js";

export default function main() {
    const _view = new View();
    _view.render();

    for (let i = 0; i < 30; i++) {
        setTimeout(
            () => {
                _view.count += 1;
                console.log(`Count is now ${_view.count}`);
            },
            1000
        );
    };
}

main();