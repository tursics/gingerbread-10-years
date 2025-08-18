var uiKeyboard = (function () {
    var selectionX = 0,
        selectionY = 0,
        selectionDIV = null,
        currentRepository = null;

    function init() {
        selectionX = 0;
        selectionY = 0;
        selectionDIV = null;

        document.addEventListener("keydown", onKeyDown);
    }

    function onKeyDown(e) {
        switch (e.code) {
            case 'ArrowUp': moveUp(); return;
            case 'ArrowDown': moveDown(); return;
            case 'ArrowLeft': moveLeft(); return;
            case 'ArrowRight': moveRight(); return;
        }
    }

    function moveLeft() {
        var x = selectionX;
        var y = selectionY;

        while (x > 0) {
            --x;

            var item = board.getItem(currentRepository, x, y);
            if (board.isItemMovable(item)) {
                selectionX = x;
                updateSelection();

                return;
            }
        }
    }

    function moveRight() {
        var x = selectionX;
        var y = selectionY;

        while (x < (board.getRows(currentRepository) - 1)) {
            ++x;

            var item = board.getItem(currentRepository, x, y);
            if (board.isItemMovable(item)) {
                selectionX = x;
                updateSelection();

                return;
            }
        }
    }

    function moveUp() {
        var x = selectionX;
        var y = selectionY;

        while (y > 0) {
            --y;

            var item = board.getItem(currentRepository, x, y);
            if (board.isItemMovable(item)) {
                selectionY = y;
                updateSelection();

                return;
            }
        }
    }

    function moveDown() {
        var x = selectionX;
        var y = selectionY;

        while (y < (board.getCols(currentRepository) - 1)) {
            ++y;

            var item = board.getItem(currentRepository, x, y);
            if (board.isItemMovable(item)) {
                selectionY = y;
                updateSelection();

                return;
            }
        }
    }

    function setFirstMovableItem() {
        var rows = board.getRows(currentRepository);
        var cols = board.getCols(currentRepository);

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var item = board.getItem(currentRepository, x, y);
                if (board.isItemMovable(item)) {
                    selectionX = x;
                    selectionY = y;

                    return;
                }
            }
        }

        selectionX = 0;
        selectionY = 0;
    }

    function funcInitRepository(repository) {
        selectionDIV = uiBoard.getKeyboardDiv();
        currentRepository = repository;
        setFirstMovableItem();

        var div = uiBoard.getItemDIV(selectionX, selectionY);
        if (div) {
            selectionDIV.style.height = div.style.height;
            selectionDIV.style.width = div.style.width;
        }

        updateSelection();
    }

    function updateSelection() {
        var div = uiBoard.getItemDIV(selectionX, selectionY);
        if (div) {
            selectionDIV.style.left = div.style.left;
            selectionDIV.style.top = div.style.top;
        }
    }

    init();

    return {
        initRepository: funcInitRepository,
    };
}());