var level = (function () {
    var repository = {
        'debug': {
            'design': [
                '🅾️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️🅾️',
                '🅾️🍎🍐🍋🥥🫐🍠🍎🍐🍋🥥🅾️',
                '🅾️🍐🍐🍋🥥🫐🍠🍎🍐🍋🥥🅾️',
                '🅾️🍋🍋🍋🥥🫐🍠🍎🍐🍋🥥🅾️',
                '🅾️🥥🥥🥥🥥🫐🍠🍎🍐🍋🥥🅾️',
                '🅾️🫐🫐🫐🫐🫐🍠🍎🍐🍋🥥🅾️',
                '🅾️🍠🍠🍠🍠🍠🍠🍎🍐🍋🥥🅾️',
                '🅾️🍎🍎🍎🍎🍎🍎🍎🍐🍋🥥🅾️',
                '🅾️🍐🍐🍐🍐🍐🍐🍐🍐🍋🥥🅾️',
                '🅾️🅾️🅾️🅾️🅾️🅾️🅾️🅾️🅾️🅾️🅾️🅾️'
            ]
        }
    };

    function init() {
    }

    function funcGetDebug() {
        return repository.debug;
    }

    init();

    return {
        getDebug: funcGetDebug,
    };
}());