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

    function funcShowRepository() {
        var rows = board.getRows(uiLevel.get());
        var cols = board.getCols(uiLevel.get());
        var div = null;

        boardDIV.style.height = rows + 'em';
        boardDIV.style.width = cols + 'em';
        boardDIV.style.left = (-cols / 2) + 'em';
        boardDIV.style.top = (-rows / 2) + 'em';

        var height = 1 / (rows + 1) * 100;
        var width = 1 / (cols + 1) * 100;

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var item = board.getItem(uiLevel.get(), x, y);

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
            div.tabIndex = -1;
            boardDIV.appendChild(div);
        }

        return document.getElementById(keyboardItemID);
    }

    function funcGetItemDIV(x, y) {
        return document.getElementById(boardItemID + x + '-' + y);
    }

    function funcSwitchItems(startX, startY, endX, endY) {
        switchItemsPreAnimation(startX, startY, endX, endY, false);
    }

    function switchItemsPreAnimation(startX, startY, endX, endY, rollback) {
        if (!board.swapPosition(uiLevel.get(), startX, startY, endX, endY)) {
            return;
        }

        var itemStart = funcGetItemDIV(startX, startY);
        var itemEnd = funcGetItemDIV(endX, endY);
        var left = itemStart.style.left;
        var top = itemStart.style.top;
        var id = itemStart.id;

        itemStart.classList.add('animate');
        itemStart.style.zIndex = 102;
        itemStart.style.left = itemEnd.style.left;
        itemStart.style.top = itemEnd.style.top;
        itemStart.id = itemEnd.id;

        itemEnd.classList.add('animate');
        itemEnd.style.zIndex = 101;
        itemEnd.style.left = left;
        itemEnd.style.top = top;
        itemEnd.id = id;

        setTimeout(function() {
            switchItemsPostAnimation(startX, startY, endX, endY, rollback);
        }, 250 + 50);
    }

    function switchItemsPostAnimation(startX, startY, endX, endY, rollback) {
        var itemStart = funcGetItemDIV(startX, startY);
        var itemEnd = funcGetItemDIV(endX, endY);

        itemStart.classList.remove('animate');
        itemStart.style.removeProperty('z-index');

        itemEnd.classList.remove('animate');
        itemEnd.style.removeProperty('z-index');

        if (rollback) {
             return;
        }

        uiLevel.set(solve.move(uiLevel.get(), endX, endY, startX, startY));
        if (board.equalBoards(uiLevel.get().initial, uiLevel.get().cleaned)) {
            switchItemsPreAnimation(startX, startY, endX, endY, true);
        } else {
console.log(uiLevel.get());
            console.table(uiLevel.get().cleaned);
            console.table(uiLevel.get().animate);
        }
    }

    init();

    return {
        getItemDIV: funcGetItemDIV,
        getKeyboardDiv: funcGetKeyboardDiv,
        showRepository: funcShowRepository,
        switchItems: funcSwitchItems,
    };
}());