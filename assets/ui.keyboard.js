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
        if (selectionX > 0) {
            --selectionX;
            updateSelection();
        }
    }

    function moveRight() {
        if (selectionX < (board.getRows(currentRepository) - 1)) {
            ++selectionX;
            updateSelection();
        }
    }

    function moveUp() {
        if (selectionY > 0) {
            --selectionY;
            updateSelection();
        }
    }

    function moveDown() {
        if (selectionY < (board.getCols(currentRepository) - 1)) {
            ++selectionY;
            updateSelection();
        }
    }

    function funcInitRepository(repository) {
        selectionX = 1;
        selectionY = 1;
        selectionDIV = uiBoard.getKeyboardDiv();
        currentRepository = repository;

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