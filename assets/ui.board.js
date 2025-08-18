var uiBoard = (function () {
    var boardID = 'board',
        boardDIV = null,
        boardItemID = 'board-item-',
        keyboardItemID = 'board-item-keyboard-focus';

    function init() {
        var div = document.getElementById(boardID);

        if (null === div) {
            div = document.createElement('div');
            div.id = boardID;
            document.body.appendChild(div);
        }

        boardDIV = document.getElementById(boardID);
    }

    function funcShowRepository(repository) {
        var rows = board.getRows(repository);
        var cols = board.getCols(repository);
        var div = null;

        boardDIV.style.height = rows + 'em';
        boardDIV.style.width = cols + 'em';
        boardDIV.style.left = (-cols / 2) + 'em';
        boardDIV.style.top = (-rows / 2) + 'em';

        var height = 1 / (rows + 1) * 100;
        var width = 1 / (cols + 1) * 100;

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var item = board.getItem(repository, x, y);

                div = document.createElement('div');
                div.id = boardItemID + x + '-' + y;
                div.className = 'board-item';
                div.style.height = height.toFixed(4) + '%';
                div.style.width = width.toFixed(4) + '%';
                div.style.left = ((x + .5) * width).toFixed(4) + '%';
                div.style.top = ((y + .5) * height).toFixed(4) + '%';
                div.innerHTML = item;
                boardDIV.appendChild(div);
            }
        }
    }

    function funcGetKeyboardDiv() {
        var div = document.getElementById(keyboardItemID);

        if (null === div) {
            div = document.createElement('div');
            div.id = keyboardItemID;
            boardDIV.appendChild(div);
        }

        return document.getElementById(keyboardItemID);
    }

    function funcGetItemDIV(x, y) {
        return document.getElementById(boardItemID + x + '-' + y);
    }

    init();

    return {
        getItemDIV: funcGetItemDIV,
        getKeyboardDiv: funcGetKeyboardDiv,
        showRepository: funcShowRepository,
    };
}());