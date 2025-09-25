var board = (function () {
    var ITEM_BASEITEM = '✴️',
        ITEM_BUG = '🐞',
        ITEM_SPAWNPOINT = '⬇️',
        ITEM_VOID = '⬜️',
        ITEM_WALL = '🅾️',
        SET_CHANGE = '🔀',
        ANIMATE_CHANGE = '🔄',
        ANIMATE_DROP_1 = '1️⃣',
        ANIMATE_MOVE_1UP = '🔼',
        ANIMATE_MOVE_2UP = '⏫️',
        ANIMATE_MOVE_1DOWN = '🔽',
        ANIMATE_MOVE_2DOWN = '⏬️',
        ANIMATE_MOVE_1LEFT = '◀️',
        ANIMATE_MOVE_2LEFT = '⏪️',
        ANIMATE_MOVE_1RIGHT = '▶️',
        ANIMATE_MOVE_2RIGHT = '⏩️',
        ANIMATE_REMOVE = '🗑️',
        ANIMATE_SPAWN = '✳️';
    var segmenter = null;

    function init() {
        segmenter = new Intl.Segmenter();
    }

    function getBoardRows(board) {
        return board.length;
    }

    function getBoardCols(board) {
        return board[0].length;
    }

    function getBoardItem(board, x, y) {
        return board[y][x];
    }

    function funcGetRows(repository) {
        return getBoardRows(repository.cleaned_);
    }

    function funcGetCols(repository) {
        return getBoardCols(repository.cleaned_);
    }

    function funcGetItem(repository, x, y) {
        return getBoardItem(repository.cleaned_, x, y);
    }

    function funcGetAnimateItem(repository, x, y) {
        return getBoardItem(repository.animate_, x, y);
    }

    function funcIsItemMovable(item) {
        return (item !== ITEM_VOID) && (item !== '⚪️') && (item !== ITEM_WALL) && (item !== ITEM_SPAWNPOINT);
    }

    function funcIsAnimateRemoveItem(item) {
        return (item === ANIMATE_REMOVE);
    }

    function funcIsSetChangeItem(item) {
        return (item === SET_CHANGE);
    }

    function funcIsAnimateChangeItem(item) {
        return (item === ANIMATE_CHANGE);
    }

    function funcIsAnimateDropOneItem(item) {
        return (item === ANIMATE_DROP_1);
    }

    function funcIsAnimateSpawnItem(item) {
        return (item === ANIMATE_SPAWN);
    }

    function funcIsAnimateMoveOneUpItem(item) {
        return (item === ANIMATE_MOVE_1UP);
    }

    function funcIsAnimateMoveTwoUpItem(item) {
        return (item === ANIMATE_MOVE_2UP);
    }

    function funcIsAnimateMoveOneDownItem(item) {
        return (item === ANIMATE_MOVE_1DOWN);
    }

    function funcIsAnimateMoveTwoDownItem(item) {
        return (item === ANIMATE_MOVE_2DOWN);
    }

    function funcIsAnimateMoveOneLeftItem(item) {
        return (item === ANIMATE_MOVE_1LEFT);
    }

    function funcIsAnimateMoveTwoLeftItem(item) {
        return (item === ANIMATE_MOVE_2LEFT);
    }

    function funcIsAnimateMoveOneRightItem(item) {
        return (item === ANIMATE_MOVE_1RIGHT);
    }

    function funcIsAnimateMoveTwoRightItem(item) {
        return (item === ANIMATE_MOVE_2RIGHT);
    }

    function funcIsItemValid(item) {
        return item !== ITEM_BUG;
    }

    function funcIsBaseItem(item) {
        return (item === '🍎') || (item === '🍐') || (item === '🍋')
            || (item === '🥥') || (item === '🫐') || (item === '🍠');
    }

    function getRandomBaseItem() {
        var num = Math.floor(Math.random() * 6);

        switch (num) {
            case 0: return '🍎';
            case 1: return '🍐';
            case 2: return '🍋';
            case 3: return '🥥';
            case 4: return '🫐';
            case 5: return '🍠';
        }

        return ITEM_BUG;
    }

    function funcGetBaseItem(item) {
        if (funcIsBaseItem(item)) {
            return item;
        }

        if (item === '🐷') {
            return '🍎';
        }
        if (item === '🐖') {
            return '🍎';
        }
        if (item === '🐮') {
            return '🍐';
        }
        if (item === '🐄') {
            return '🍐';
        }
        if (item === '🐯') {
            return '🍋';
        }
        if (item === '🐅') {
            return '🍋';
        }
        if (item === '🐦') {
            return '🥥';
        }
        if (item === '🦢') {
            return '🥥';
        }
        if (item === '🐭') {
            return '🫐';
        }
        if (item === '🐁') {
            return '🫐';
        }
        if (item === '🐵') {
            return '🍠';
        }
        if (item === '🐒') {
            return '🍠';
        }

        return ITEM_BUG;
    }

    function funcGetStripesHItem(item) {
        if (item === '🍎') {
            return '🐷';
        }
        if (item === '🍐') {
            return '🐮';
        }
        if (item === '🍋') {
            return '🐯';
        }
        if (item === '🥥') {
            return '🐦';
        }
        if (item === '🫐') {
            return '🐭';
        }
        if (item === '🍠') {
            return '🐵';
        }
        return ITEM_BUG;
    }

    function funcGetStripesVItem(item) {
        if (item === '🍎') {
            return '🐖';
        }
        if (item === '🍐') {
            return '🐄';
        }
        if (item === '🍋') {
            return '🐅';
        }
        if (item === '🥥') {
            return '🦢';
        }
        if (item === '🫐') {
            return '🐁';
        }
        if (item === '🍠') {
            return '🐒';
        }
        return ITEM_BUG;
    }

    function cleanLeft(repository, x, y) {
        while (x > 0) {
            --x;

            var item = funcGetItem(repository, x, y);
            if (funcIsItemMovable(item)) {
                funcCleanItem(repository, x, y);
            }
        }
    }

    function cleanRight(repository, x, y) {
        while (x < (funcGetCols(repository) - 1)) {
            ++x;

            var item = funcGetItem(repository, x, y);
            if (funcIsItemMovable(item)) {
                funcCleanItem(repository, x, y);
            }
        }
    }

    function cleanUp(repository, x, y) {
        while (y > 0) {
            --y;

            var item = funcGetItem(repository, x, y);
            if (funcIsItemMovable(item)) {
                funcCleanItem(repository, x, y);
            }
        }
    }

    function cleanDown(repository, x, y) {
        while (y < (board.getRows(repository) - 1)) {
            ++y;

            var item = funcGetItem(repository, x, y);
            if (funcIsItemMovable(item)) {
                funcCleanItem(repository, x, y);
            }
        }
    }

    function cleanRecursive(repository, x, y, item) {
        var baseItem = funcGetBaseItem(item);
        var stripeVItem = funcGetStripesVItem(baseItem);
        var stripeHItem = funcGetStripesHItem(baseItem);

        if ((ITEM_BUG !== stripeHItem) && (stripeHItem === item)) {
            cleanLeft(repository, x, y);
            cleanRight(repository, x, y);
        }
        if ((ITEM_BUG !== stripeVItem) && (stripeVItem === item)) {
            cleanUp(repository, x, y);
            cleanDown(repository, x, y);
        }
    }

    function funcCleanItem(repository, x, y) {
        var oldItem = repository.cleaned_[y][x];

        repository.cleaned_[y][x] = ITEM_VOID;
        repository.animate_[y][x] = ANIMATE_REMOVE;

        cleanRecursive(repository, x, y, oldItem);
    }

    function changeInitialItem(repository, x, y, item) {
        repository.initial_[y][x] = item;
    }

    function funcChangeItem(repository, x, y, item) {
        repository.cleaned_[y][x] = item;
        repository.animate_[y][x] = ANIMATE_CHANGE;
    }

    function funcChangeItemNoAnimation(repository, x, y, item) {
        repository.cleaned_[y][x] = item;
        repository.animate_[y][x] = SET_CHANGE;
    }

    function spawnItem(repository, x, y, item) {
        repository.cleaned_[y][x] = item;
        repository.animate_[y][x] = ANIMATE_SPAWN;
    }

    function funcAnimateItem(repository, startX, startY, targetX, targetY) {
        var oldItem = repository.cleaned_[startY][startX];

        var item = ITEM_BUG;
        if (startX === targetX) {
            switch (startY - targetY) {
                case 2: item = ANIMATE_MOVE_2UP; break;
                case 1: item = ANIMATE_MOVE_1UP; break;
                case -1: item = ANIMATE_MOVE_1DOWN; break;
                case -2: item = ANIMATE_MOVE_2DOWN; break;
            }
        } else if (startY === targetY) {
            switch (startX - targetX) {
                case 2: item = ANIMATE_MOVE_2LEFT; break;
                case 1: item = ANIMATE_MOVE_1LEFT; break;
                case -1: item = ANIMATE_MOVE_1RIGHT; break;
                case -2: item = ANIMATE_MOVE_2RIGHT; break;
            }
        }

        repository.cleaned_[startY][startX] = ITEM_VOID;
        repository.animate_[startY][startX] = item;

        cleanRecursive(repository, startX, startY, oldItem);
    }

    function dropItem(repository, startX, startY, targetX, targetY) {
        var startItem = repository.cleaned_[startY][startX];
        repository.cleaned_[startY][startX] = ITEM_VOID;
        repository.cleaned_[targetY][targetX] = startItem;

        var item = ITEM_BUG;
        if (startX === targetX) {
            switch (startY - targetY) {
                case -1: item = ANIMATE_DROP_1; break;
                case -2: item = '2️⃣'; break;
                case -3: item = '3️⃣'; break;
                case -4: item = '4️⃣'; break;
                case -5: item = '5️⃣'; break;
                case -6: item = '6️⃣'; break;
                case -7: item = '7️⃣'; break;
                case -8: item = '8️⃣'; break;
                case -9: item = '9️⃣'; break;
                case -10: item = '🔟'; break;
            }
        }
        repository.animate_[targetY][targetX] = item;
    }

    function deconstruct(board) {
        return board.map(function(row) {
            return Array.from(segmenter.segment(row)).map(function(column) {
                return column.segment;
            });
        });
    }

    function funcCopyRepository1to1(repository) {
        return {
            initial_: repository.initial_.map(function(arr) { return arr.slice(); }),
            cleaned_: repository.cleaned_.map(function(arr) { return arr.slice(); }),
            animate_: repository.animate_.map(function(arr) { return arr.slice(); }),
        };
    }

    function funcCopyRepositoryFromDesign(design) {
        if ('string' === typeof design[0]) {
            design = deconstruct(design);
        }

        var repository = {
            initial_: design.map(function(arr) { return arr.slice(); }),
            cleaned_: design.map(function(arr) { return arr.slice(); }),
            animate_: [],
        };

        var rows = funcGetRows(repository);
        var cols = funcGetCols(repository);

        for (var y = 0; y < rows; ++y) {
            repository.animate_[y] = [];
            for (var x = 0; x < cols; ++x) {
                repository.animate_[y][x] = ITEM_VOID;
            }
        }

        return repository;
    }

    function funcCopyRepositoryFromRepository(repository) {
        if (repository.cleaned_) {
            return funcCopyRepositoryFromDesign(repository.cleaned_);
        }

        return funcCopyRepositoryFromDesign(deconstruct(repository.cleaned));
    }

    function funcStepRefill(repository) {
//        repository = funcCopyRepositoryFromRepository(repository);

        var rows = funcGetRows(repository);
        var cols = funcGetCols(repository);

        for (var x = 0; x < cols; ++x) {
            for (var y = rows - 1; y >= 1; --y) {
                var item = funcGetItem(repository, x, y);
                var above = funcGetItem(repository, x, y - 1);

                if ((ITEM_VOID === item) && (ITEM_SPAWNPOINT === above)) {
                    item = getRandomBaseItem();
                    spawnItem(repository, x, y, item);
                }
            }
        }

        return repository;
    }

    function funcStepDropItems(repository) {
//        repository = funcCopyRepositoryFromRepository(repository);

        var rows = funcGetRows(repository);
        var cols = funcGetCols(repository);

        for (var x = 0; x < cols; ++x) {
            var rowCount = 0;

            for (var y = rows - 1; y >= 0; --y) {
                var item = funcGetItem(repository, x, y);

                if (ITEM_VOID === item) {
                    ++rowCount;
                    rowCount = Math.min(rowCount, 1);
                } else if ((rowCount > 0) && funcIsItemMovable(item)) {
                    dropItem(repository, x, y, x, y + rowCount);
                } else {
                    rowCount = 0;
                }
            }
        }

        return repository;
    }

    function funcRemoveAdvancedItems(repository) {
        repository = funcCopyRepositoryFromRepository(repository);

        var rows = funcGetRows(repository);
        var cols = funcGetCols(repository);

        for (var x = 0; x < cols; ++x) {
            for (var y = rows - 1; y >= 0; --y) {
                var item = funcGetItem(repository, x, y);

                if (!funcIsBaseItem(item) && funcIsItemMovable(item)) {
                    funcCleanItem(repository, x, y);
                }
            }
        }

        return repository;
    }

    function funcSpawn(repository) {
        var initial = repository.initial_.map(function(arr) { return arr.slice(); });

        do {
            repository = solve.board(repository);
            if (config.debug && !funcEqualBoards(repository.initial_, repository.cleaned_)) {
                console.table('Spawn board - solve');
            }

            repository = funcRemoveAdvancedItems(repository);
            if (config.debug && !funcEqualBoards(repository.initial_, repository.cleaned_)) {
                console.table('Spawn board - remove advanced items');
            }

            var refilled = false;
            do {
                repository = funcCopyRepositoryFromRepository(repository);
                repository = funcStepDropItems(repository);
                repository = funcStepRefill(repository);
                if (!funcEqualBoards(repository.initial_, repository.cleaned_)) {
                    refilled = true;
                }
            } while (!funcEqualBoards(repository.initial_, repository.cleaned_));

            if (!refilled) {
                break;
            }
            if (config.debug) {
                console.table('Spawn board - drop items and refill');
            }
        } while (true);

        repository.initial_ = initial.map(function(arr) { return arr.slice(); });

        return repository;
    }

    function funcSpawnSolvable(repository) {
        var workingRepository = null;
        var hints = null;

        do {
            workingRepository = funcCopyRepositoryFromRepository(repository);
            workingRepository = funcSpawn(workingRepository);

            hints = solve.hint(workingRepository);
        } while (hints.length === 0);

        return workingRepository;
    }

    function equalBoards(leftBoard, rightBoard, logging) {
        var leftRows = getBoardRows(leftBoard);
        var leftCols = getBoardCols(leftBoard);
        var rightRows = getBoardRows(rightBoard);
        var rightCols = getBoardCols(rightBoard);

        if (leftRows !== rightRows) {
            if (logging && config.debug) {
                console.debug('Length mismatch');
            }
            return false;
        }
        if (leftCols !== rightCols) {
            if (logging && config.debug) {
                console.debug('Length mismatch');
            }
            return false;
        }

        for (var y = 0; y < leftRows; ++y) {
            for (var x = 0; x < leftCols; ++x) {
                var leftItem = getBoardItem(leftBoard, x, y);
                var rightItem = getBoardItem(rightBoard, x, y);

                if (leftItem !== rightItem) {
                    if ((ITEM_BASEITEM === leftItem) && funcIsBaseItem(rightItem)) {
                        continue;
                    }
                    if ((ITEM_BASEITEM === rightItem) && funcIsBaseItem(leftItem)) {
                        continue;
                    }

                    if (logging && config.debug) {
                        console.debug(leftBoard[y].join(''));
                        console.debug(rightBoard[y].join(''));
                    }
                    return false;
                }
            }
        }
        return true;
    }

    function funcEqualBoards(leftBoard, rightBoard) {
        if ('string' === typeof leftBoard[0]) {
            leftBoard = deconstruct(leftBoard);
        }
        if ('string' === typeof rightBoard[0]) {
            rightBoard = deconstruct(rightBoard);
        }

        return equalBoards(leftBoard, rightBoard, false);
    }

    function funcEqualBoardsWithLogging(leftBoard, rightBoard) {
        if ('string' === typeof leftBoard[0]) {
            leftBoard = deconstruct(leftBoard);
        }
        if ('string' === typeof rightBoard[0]) {
            rightBoard = deconstruct(rightBoard);
        }

        return equalBoards(leftBoard, rightBoard, true);
    }

    function funcSwapPosition(repository, x1, y1, x2, y2) {
        var item1 = funcGetItem(repository, x1, y1);
        var item2 = funcGetItem(repository, x2, y2);

        if (funcIsItemMovable(item1) && funcIsItemMovable(item2)) {
            funcChangeItem(repository, x1, y1, item2);
            funcChangeItem(repository, x2, y2, item1);
            return true;
        }

        return false;
    }

    function funcSwapInitialPosition(repository, x1, y1, x2, y2) {
        var item1 = getBoardItem(repository.initial_, x1, y1);
        var item2 = getBoardItem(repository.initial_, x2, y2);

        if (funcIsItemMovable(item1) && funcIsItemMovable(item2)) {
            changeInitialItem(repository, x1, y1, item2);
            changeInitialItem(repository, x2, y2, item1);
            return true;
        }

        return false;
    }

    init();

    return {
        animateItem: funcAnimateItem,
        cleanItem: funcCleanItem,
        changeItem: funcChangeItem,
        changeItemNoAnimation: funcChangeItemNoAnimation,
        copyRepository1to1: funcCopyRepository1to1,
        copyRepositoryFromDesign: funcCopyRepositoryFromDesign,
        copyRepositoryFromRepository: funcCopyRepositoryFromRepository,
        equalBoards: funcEqualBoards,
        equalBoardsWithLogging: funcEqualBoardsWithLogging,
        getAnimateItem: funcGetAnimateItem,
        getBaseItem: funcGetBaseItem,
        getCols: funcGetCols,
        getItem: funcGetItem,
        getRows: funcGetRows,
        getStripesHItem: funcGetStripesHItem,
        getStripesVItem: funcGetStripesVItem,
        isAnimateChangeItem: funcIsAnimateChangeItem,
        isAnimateDropOneItem: funcIsAnimateDropOneItem,
        isAnimateMoveOneDownItem: funcIsAnimateMoveOneDownItem,
        isAnimateMoveOneLeftItem: funcIsAnimateMoveOneLeftItem,
        isAnimateMoveOneRightItem: funcIsAnimateMoveOneRightItem,
        isAnimateMoveOneUpItem: funcIsAnimateMoveOneUpItem,
        isAnimateMoveTwoDownItem: funcIsAnimateMoveTwoDownItem,
        isAnimateMoveTwoLeftItem: funcIsAnimateMoveTwoLeftItem,
        isAnimateMoveTwoRightItem: funcIsAnimateMoveTwoRightItem,
        isAnimateMoveTwoUpItem: funcIsAnimateMoveTwoUpItem,
        isAnimateRemoveItem: funcIsAnimateRemoveItem,
        isAnimateSpawnItem: funcIsAnimateSpawnItem,
        isBaseItem: funcIsBaseItem,
        isItemMovable: funcIsItemMovable,
        isItemValid: funcIsItemValid,
        isSetChangeItem: funcIsSetChangeItem,
        removeAdvancedItems: funcRemoveAdvancedItems,
        spawn: funcSpawn,
        spawnSolvable: funcSpawnSolvable,
        stepDropItems: funcStepDropItems,
        stepRefill: funcStepRefill,
        swapInitialPosition: funcSwapInitialPosition,
        swapPosition: funcSwapPosition,
    };
}());