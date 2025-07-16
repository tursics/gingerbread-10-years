var board = (function () {
    var ITEM_VOID = '⬜️',
        ITEM_BUG = '🐞',
        ANIMATE_CHANGE = '🔄',
        ANIMATE_REMOVE = '🗑️',
        ANIMATE_SPAWN = '✳️';

    function init() {
    }

    function funcGetRows(repository) {
        return repository.cleaned.length;
    }

    function funcGetCols(repository) {
        return Array.from(new Intl.Segmenter().segment(repository.cleaned[0])).length;
    }

    function funcGetItem(repository, x, y) {
        return Array.from(new Intl.Segmenter().segment(repository.cleaned[y]))[x].segment;
    }

    function funcIsItemMovable(item) {
        return (item !== '⬜️') && (item !== '⚪️') && (item !== '🅾️') && (item !== '⬇️');
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
            var diff = startY - targetY;
            line[startX] = diff === 2 ? '⏫️' : diff === 1 ? '🔼' : diff === -1 ? '🔽' : diff === -2 ? '⏬️' : '🐞';
        } else if (startY === targetY) {
            var diff = startX - targetX;
            line[startX] = diff === 2 ? '⏪️' : diff === 1 ? '◀️' : diff === -1 ? '▶️' : diff === -2 ? '⏩️' : '🐞';
        } else {
            line[startX] = ITEM_BUG;
        }
        repository.animate[startY] = line.join('');
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

    function funcRefillBoard(repository) {
        repository = funcCopyRepositoryFromRepository(repository);

        var rows = funcGetRows(repository);
        var cols = funcGetCols(repository);

        for (var x = 0; x < cols; ++x) {
            for (var y = rows - 1; y >= 0; --y) {
                var item = board.getItem(repository, x, y);

                if (ITEM_VOID === item) {
                    item = getRandomBaseItem();
                    spawnItem(repository, x, y, item);
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
                var item = board.getItem(repository, x, y);

                if (!funcIsBaseItem(item) && funcIsItemMovable(item)) {
                    funcCleanItem(repository, x, y);
                }
            }
        }

        return repository;
    }

    function equalBoards(leftBoard, rightBoard, logging) {
        var l = leftBoard.length;
        var r = rightBoard.length;

        if (l !== r) {
            if (logging && config.debug) {
                console.debug('Length mismatch');
            }
            return false;
        }

        for (var i = 0; i < l; ++i) {
            if (leftBoard[i] !== rightBoard[i]) {
                if (logging && config.debug) {
                    console.debug(leftBoard[i]);
                    console.debug(rightBoard[i]);
                }
                return false;
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

    init();

    return {
        animateItem: funcAnimateItem,
        cleanItem: funcCleanItem,
        changeItem: funcChangeItem,
        copyRepositoryFromDesign: funcCopyRepositoryFromDesign,
        copyRepositoryFromRepository: funcCopyRepositoryFromRepository,
        equalBoards: funcEqualBoards,
        equalBoardsWithLogging: funcEqualBoardsWithLogging,
        getCols: funcGetCols,
        getItem: funcGetItem,
        getRows: funcGetRows,
        isBaseItem: funcIsBaseItem,
        isItemMovable: funcIsItemMovable,
        refillBoard: funcRefillBoard,
        removeAdvancedItems: funcRemoveAdvancedItems,
    };
}());