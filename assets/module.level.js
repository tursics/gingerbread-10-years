var level = (function () {
    var debugLevel = {
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
    };
    var gameLevel = [
        {
            'design': [
                '🅾️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️🅾️',
                '🅾️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️🅾️',
                '🅾️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️🅾️',
                '🅾️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️🅾️',
                '🅾️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️🅾️',
                '🅾️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️🅾️',
                '🅾️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️🅾️',
                '🅾️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️🅾️',
                '🅾️⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬜️🅾️',
                '🅾️🅾️🅾️🅾️🅾️🅾️🅾️🅾️🅾️🅾️'
            ]
        },
    ];

    function init() {
    }

    function funcGetDebug() {
        return debugLevel;
    }

    function funcGet(id) {
        return gameLevel[id];
    }

    function funcLength() {
        return gameLevel.length;
    }

    init();

    return {
        get: funcGet,
        getDebug: funcGetDebug,
        length: funcLength,
    };
}());