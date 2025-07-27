var board = (function () {
    var ITEM_BASEITEM = '✴️',
        ITEM_BUG = '🐞',
        ITEM_SPAWNPOINT = '⬇️',
        ITEM_VOID = '⬜️',
        ITEM_WALL = '🅾️',
        ANIMATE_CHANGE = '🔄',
        ANIMATE_REMOVE = '🗑️',
        ANIMATE_SPAWN = '✳️';

    function init() {
    }

    function getBoardRows(board) {
        return board.length;
    }

    function getBoardCols(board) {
        return Array.from(new Intl.Segmenter().segment(board[0])).length;
    }

    function getBoardItem(board, x, y) {
        return Array.from(new Intl.Segmenter().segment(board[y]))[x].segment;
    }

    function funcGetRows(repository) {
        return getBoardRows(repository.cleaned);
    }

    function funcGetCols(repository) {
        return getBoardCols(repository.cleaned);
    }

    function funcGetItem(repository, x, y) {
        return getBoardItem(repository.cleaned, x, y);
    }

    function funcIsItemMovable(item) {
        return (item !== ITEM_VOID) && (item !== '⚪️') && (item !== ITEM_WALL) && (item !== ITEM_SPAWNPOINT);
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

    function funcCleanItem(repository, x, y) {
        var line = Array.from(new Intl.Segmenter().segment(repository.cleaned[y]), s => s.segment);
        line[x] = ITEM_VOID;
        repository.cleaned[y] = line.join('');

        line = Array.from(new Intl.Segmenter().segment(repository.animate[y]), s => s.segment);
        line[x] = ANIMATE_REMOVE;
        repository.animate[y] = line.join('');
    }

    function changeInitialItem(repository, x, y, item) {
        var line = Array.from(new Intl.Segmenter().segment(repository.initial[y]), s => s.segment);
        line[x] = item;
        repository.initial[y] = line.join('');
    }

    function funcChangeItem(repository, x, y, item) {
        var line = Array.from(new Intl.Segmenter().segment(repository.cleaned[y]), s => s.segment);
        line[x] = item;
        repository.cleaned[y] = line.join('');

        line = Array.from(new Intl.Segmenter().segment(repository.animate[y]), s => s.segment);
        line[x] = ANIMATE_CHANGE;
        repository.animate[y] = line.join('');
    }

    function spawnItem(repository, x, y, item) {
        var line = Array.from(new Intl.Segmenter().segment(repository.cleaned[y]), s => s.segment);
        line[x] = item;
        repository.cleaned[y] = line.join('');

        line = Array.from(new Intl.Segmenter().segment(repository.animate[y]), s => s.segment);
        line[x] = ANIMATE_SPAWN;
        repository.animate[y] = line.join('');
    }

    function funcAnimateItem(repository, startX, startY, targetX, targetY) {
        var line = Array.from(new Intl.Segmenter().segment(repository.cleaned[startY]), s => s.segment);
        line[startX] = ITEM_VOID;
        repository.cleaned[startY] = line.join('');

        line = Array.from(new Intl.Segmenter().segment(repository.animate[startY]), s => s.segment);
        if (startX === targetX) {
            switch (startY - targetY) {
                case 2: line[startX] = '⏫️'; break;
                case 1: line[startX] = '🔼'; break;
                case -1: line[startX] = '🔽'; break;
                case -2: line[startX] = '⏬️'; break;
                default: line[startX] = ITEM_BUG;
            }
        } else if (startY === targetY) {
            switch (startX - targetX) {
                case 2: line[startX] = '⏪️'; break;
                case 1: line[startX] = '◀️'; break;
                case -1: line[startX] = '▶️'; break;
                case -2: line[startX] = '⏩️'; break;
                default: line[startX] = ITEM_BUG;
            }
        } else {
            line[startX] = ITEM_BUG;
        }
        repository.animate[startY] = line.join('');
    }

    function dropItem(repository, startX, startY, targetX, targetY) {
        var line = Array.from(new Intl.Segmenter().segment(repository.cleaned[startY]), s => s.segment);
        var startItem = line[startX];
        line[startX] = ITEM_VOID;
        repository.cleaned[startY] = line.join('');

        line = Array.from(new Intl.Segmenter().segment(repository.cleaned[targetY]), s => s.segment);
        line[targetX] = startItem;
        repository.cleaned[targetY] = line.join('');

        line = Array.from(new Intl.Segmenter().segment(repository.animate[targetY]), s => s.segment);
        if (startX === targetX) {
            switch (startY - targetY) {
                case -1: line[targetX] = '1️⃣'; break;
                case -2: line[targetX] = '2️⃣'; break;
                case -3: line[targetX] = '3️⃣'; break;
                case -4: line[targetX] = '4️⃣'; break;
                case -5: line[targetX] = '5️⃣'; break;
                case -6: line[targetX] = '6️⃣'; break;
                case -7: line[targetX] = '7️⃣'; break;
                case -8: line[targetX] = '8️⃣'; break;
                case -9: line[targetX] = '9️⃣'; break;
                case -10: line[targetX] = '🔟'; break;
                default: line[targetX] = ITEM_BUG;
            }
        } else {
            line[targetX] = ITEM_BUG;
        }
        repository.animate[targetY] = line.join('');
    }

    function funcCopyRepository1to1(repository) {
        return {
            initial: repository.initial.map(function(arr) { return arr.slice(); }),
            cleaned: repository.cleaned.map(function(arr) { return arr.slice(); }),
            animate: repository.animate.map(function(arr) { return arr.slice(); }),
        };
    }

    function funcCopyRepositoryFromDesign(design) {
        var repository = {
            initial: design.map(function(arr) { return arr.slice(); }),
            cleaned: design.map(function(arr) { return arr.slice(); }),
            animate: [],
        };

        var rows = funcGetRows(repository);
        var cols = funcGetCols(repository);

        for (var y = 0; y < rows; ++y) {
            repository.animate[y] = '';
            for (var x = 0; x < cols; ++x) {
                repository.animate[y] += ITEM_VOID;
            }
        }

        return repository;
    }

    function funcCopyRepositoryFromRepository(repository) {
        return funcCopyRepositoryFromDesign(repository.cleaned);
    }

/*    function funcRefillBoard(repository) {
        repository = funcCopyRepositoryFromRepository(repository);

        var rows = funcGetRows(repository);
        var cols = funcGetCols(repository);

        for (var x = 0; x < cols; ++x) {
            for (var y = rows - 1; y >= 0; --y) {
                var item = funcGetItem(repository, x, y);

                if (ITEM_VOID === item) {
                    item = getRandomBaseItem();
                    spawnItem(repository, x, y, item);
                }
            }
        }

        return repository;
    }*/

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
        var initial = repository.initial.map(function(arr) { return arr.slice(); });

        do {
            repository = solve.board(repository);
            if (config.debug && !funcEqualBoards(repository.initial, repository.cleaned)) {
                console.table('Spawn board - solve');
            }

            repository = funcRemoveAdvancedItems(repository);
            if (config.debug && !funcEqualBoards(repository.initial, repository.cleaned)) {
                console.table('Spawn board - remove advanced items');
            }

            var refilled = false;
            do {
                repository = funcCopyRepositoryFromRepository(repository);
                repository = funcStepDropItems(repository);
                repository = funcStepRefill(repository);
                if (config.debug && !funcEqualBoards(repository.initial, repository.cleaned)) {
                    refilled = true;
                }
            } while (!funcEqualBoards(repository.initial, repository.cleaned));

            if (!refilled) {
                break;
            }
            if (config.debug) {
                console.table('Spawn board - drop items and refill');
            }
        } while (true);

        repository.initial = initial.map(function(arr) { return arr.slice(); });
        return repository;
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
                        console.debug(leftBoard[y]);
                        console.debug(rightBoard[y]);
                    }
                    return false;
                }
            }
        }
        return true;
    }

    function funcEqualBoards(leftBoard, rightBoard) {
        return equalBoards(leftBoard, rightBoard, false);
    }

    function funcEqualBoardsWithLogging(leftBoard, rightBoard) {
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
        var item1 = getBoardItem(repository.initial, x1, y1);
        var item2 = getBoardItem(repository.initial, x2, y2);

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
        copyRepository1to1: funcCopyRepository1to1,
        copyRepositoryFromDesign: funcCopyRepositoryFromDesign,
        copyRepositoryFromRepository: funcCopyRepositoryFromRepository,
        equalBoards: funcEqualBoards,
        equalBoardsWithLogging: funcEqualBoardsWithLogging,
        getCols: funcGetCols,
        getItem: funcGetItem,
        getRows: funcGetRows,
        isBaseItem: funcIsBaseItem,
        isItemMovable: funcIsItemMovable,
//        refillBoard: funcRefillBoard,
        removeAdvancedItems: funcRemoveAdvancedItems,
        spawn: funcSpawn,
        stepDropItems: funcStepDropItems,
        stepRefill: funcStepRefill,
        swapInitialPosition: funcSwapInitialPosition,
        swapPosition: funcSwapPosition,
    };
}());