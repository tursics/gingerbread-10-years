var solve = (function () {
    var solveFuncs = [];

    function init() {
//        solveFuncs.push( this.solveStripedStriped);
        solveFuncs.push(solve5col);
        solveFuncs.push(solve5row);
//        solveFuncs.push( this.solveCross);
//        solveFuncs.push( this.solveSquare);
//        solveFuncs.push( this.solveLTopLeft);
//        solveFuncs.push( this.solveLTopRight);
//        solveFuncs.push( this.solveLBottomLeft);
//        solveFuncs.push( this.solveLBottomRight);
//        solveFuncs.push( this.solveTTop);
//        solveFuncs.push( this.solveTRight);
//        solveFuncs.push( this.solveTBottom);
//        solveFuncs.push( this.solveTLeft);
        solveFuncs.push(solve4col);
        solveFuncs.push(solve4row);
        solveFuncs.push(solve3col);
        solveFuncs.push(solve3row);
    }

    function getItem(repository, x, y) {
        return Array.from(new Intl.Segmenter().segment(repository.cleaned[y]))[x].segment;
    }

    function cleanItem(repository, x, y) {
        var line = Array.from(new Intl.Segmenter().segment(repository.cleaned[y]), s => s.segment);
        line[x] = '⬜️';
        repository.cleaned[y] = line.join('');

        line = Array.from(new Intl.Segmenter().segment(repository.animate[y]), s => s.segment);
        line[x] = '🗑️';
        repository.animate[y] = line.join('');
    }

    function changeItem(repository, x, y, face) {
        var line = Array.from(new Intl.Segmenter().segment(repository.cleaned[y]), s => s.segment);
        line[x] = face;
        repository.cleaned[y] = line.join('');

        line = Array.from(new Intl.Segmenter().segment(repository.animate[y]), s => s.segment);
        line[x] = '🔄';
        repository.animate[y] = line.join('');
    }

    function animateItem(repository, startX, startY, targetX, targetY) {
        var line = Array.from(new Intl.Segmenter().segment(repository.cleaned[startY]), s => s.segment);
        line[startX] = '⬜️';
        repository.cleaned[startY] = line.join('');

        line = Array.from(new Intl.Segmenter().segment(repository.animate[startY]), s => s.segment);
        if (startX === targetX) {
            var diff = startY - targetY;
            line[startX] = diff === 2 ? '⏫️' : diff === 1 ? '🔼' : diff === -1 ? '🔽' : diff === -2 ? '⏬️' : '🐞';
        } else if (startY === targetY) {
            var diff = startX - targetX;
            line[startX] = diff === 2 ? '⏪️' : diff === 1 ? '◀️' : diff === -1 ? '▶️' : diff === -2 ? '⏩️' : '🐞';
        } else {
            line[startX] = '🐞';
        }
        repository.animate[startY] = line.join('');
    }

    function isItemMovable(item) {
        return (item !== '⬜️') && (item !== '⚪️') && (item !== '🅾️') && (item !== '⬇️');
    }

    function isBaseItem(item) {
        return (item === '🍎') || (item === '🍐') || (item === '🍋')
            || (item === '🥥') || (item === '🫐') || (item === '🍠');
    }

    function getStripesHItem(item) {
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
        return '🐞';
    }

    function getStripesVItem(item) {
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
        return '🐞';
    }

    function countSameItem(repository, startX, startY, diffX, diffY) {
        var item = getItem(repository, startX, startY);
        if (!isItemMovable(item)) {
            return 0;
        }

        var rows = board.getRows(repository);
        var cols = board.getCols(repository);
        var x = startX + diffX;
        var y = startY + diffY;
        var count = 0;

        while ((x >= 0) && (y >= 0) && (x < cols) && (y < rows) && (getItem(repository, x, y) === item)) {
            ++count;
            x += diffX;
            y += diffY;
        }

        return count;
    }

    function solve3col(repository) {
        var rows = board.getRows(repository);
        var cols = board.getCols(repository);

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var countDown = countSameItem(repository, x, y, 0, 1);
                if (countDown === 2) {
                    var item = getItem(repository, x, y);
                    if (isBaseItem(item)) {
                        cleanItem(repository, x, y + 0);
                        cleanItem(repository, x, y + 1);
                        cleanItem(repository, x, y + 2);
                    }
                }
            }
        }
    }

    function solve3row(repository) {
        var rows = board.getRows(repository);
        var cols = board.getCols(repository);

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var countRight = countSameItem(repository, x, y, 1, 0);
                if (countRight === 2) {
                    var item = getItem(repository, x, y);
                    if (isBaseItem(item)) {
                        cleanItem(repository, x + 0, y);
                        cleanItem(repository, x + 1, y);
                        cleanItem(repository, x + 2, y);
                    }
                }
            }
        }
    }

    function solve4col(repository, posX, posY, altX, altY) {
        var rows = board.getRows(repository);
        var cols = board.getCols(repository);

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var countDown = countSameItem(repository, x, y, 0, 1);
                if (countDown === 3) {
                    var item = getItem(repository, x, y);

                    if (((x == posX) && ((y + 2) == posY)) || ((x == altX) && ((y + 2) == altY))) {
                        if (isBaseItem(item)) {
                            animateItem(repository, x, y + 0, x, y + 2);
                            animateItem(repository, x, y + 1, x, y + 2);
                            changeItem (repository, x, y + 2, getStripesHItem(item));
                            animateItem(repository, x, y + 3, x, y + 2);
                        }
                    } else {
                        if (isBaseItem(item)) {
                            animateItem(repository, x, y + 0, x, y + 1);
                            changeItem (repository, x, y + 1, getStripesHItem(item));
                            animateItem(repository, x, y + 2, x, y + 1);
                            animateItem(repository, x, y + 3, x, y + 1);
                        }
                    }
                }
            }
        }
    }

    function solve4row(repository, posX, posY, altX, altY) {
        var rows = board.getRows(repository);
        var cols = board.getCols(repository);

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var countRight = countSameItem(repository, x, y, 1, 0);
                if (countRight === 3) {
                    var item = getItem(repository, x, y);

                    if((((x + 2) == posX) && (y == posY)) || (((x + 2) == altX) && (y == altY))) {
                        if (isBaseItem(item)) {
                            animateItem(repository, x + 0, y, x + 2, y);
                            animateItem(repository, x + 1, y, x + 2, y);
                            changeItem (repository, x + 2, y, getStripesVItem(item));
                            animateItem(repository, x + 3, y, x + 2, y);
                        }
                    } else {
                        if (isBaseItem(item)) {
                            animateItem(repository, x + 0, y, x + 1, y);
                            changeItem (repository, x + 1, y, getStripesVItem(item));
                            animateItem(repository, x + 2, y, x + 1, y);
                            animateItem(repository, x + 3, y, x + 1, y);
                        }
                    }
                }
            }
        }
    }

    function solve5col(repository, posX, posY, altX, altY) {
        var rows = board.getRows(repository);
        var cols = board.getCols(repository);

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var countDown = countSameItem(repository, x, y, 0, 1);
				if (countDown === 4) {
                    var item = getItem(repository, x, y);
                    if (isBaseItem(item)) {
                        animateItem(repository, x, y + 0, x, y + 2);
                        animateItem(repository, x, y + 1, x, y + 2);
                        changeItem (repository, x, y + 2, '🏵️');
                        animateItem(repository, x, y + 3, x, y + 2);
                        animateItem(repository, x, y + 4, x, y + 2);
                    }
				}
			}
		}
	}

    function solve5row(repository, posX, posY, altX, altY) {
        var rows = board.getRows(repository);
        var cols = board.getCols(repository);

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var countRight = countSameItem(repository, x, y, 1, 0);
				if (countRight === 4) {
                    var item = getItem(repository, x, y);
                    if (isBaseItem(item)) {
                        animateItem(repository, x + 0, y, x + 2, y);
                        animateItem(repository, x + 1, y, x + 2, y);
                        changeItem (repository, x + 2, y, '🏵️');
                        animateItem(repository, x + 3, y, x + 2, y);
                        animateItem(repository, x + 4, y, x + 2, y);
                    }
				}
			}
		}
    }

    function funcBoard(selectedLevel) {
        var repository = board.copyRepositoryFromDesign(selectedLevel.design);

        for (var s = 0; s < solveFuncs.length; ++s) {
            solveFuncs[s](repository);
        }

        return repository;
    }

    init();

    return {
        board: funcBoard,
    };
}());