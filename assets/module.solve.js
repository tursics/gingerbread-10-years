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

    function getRows(data) {
        return data.cleaned.length;
    }

    function getCols(data) {
        return Array.from(new Intl.Segmenter().segment(data.cleaned[0])).length;
    }

    function getItem(data, x, y) {
        return Array.from(new Intl.Segmenter().segment(data.cleaned[y]))[x].segment;
    }

    function cleanItem(data, x, y) {
        var line = Array.from(new Intl.Segmenter().segment(data.cleaned[y]), s => s.segment);
        line[x] = '⬜️';
        data.cleaned[y] = line.join('');

        line = Array.from(new Intl.Segmenter().segment(data.animate[y]), s => s.segment);
        line[x] = '🗑️';
        data.animate[y] = line.join('');
    }

    function changeItem(data, x, y, face) {
        var line = Array.from(new Intl.Segmenter().segment(data.cleaned[y]), s => s.segment);
        line[x] = face;
        data.cleaned[y] = line.join('');

        line = Array.from(new Intl.Segmenter().segment(data.animate[y]), s => s.segment);
        line[x] = '🔄';
        data.animate[y] = line.join('');
    }

    function animateItem(data, startX, startY, targetX, targetY) {
        var line = Array.from(new Intl.Segmenter().segment(data.cleaned[startY]), s => s.segment);
        line[startX] = '⬜️';
        data.cleaned[startY] = line.join('');

        line = Array.from(new Intl.Segmenter().segment(data.animate[startY]), s => s.segment);
        if (startX === targetX) {
            var diff = startY - targetY;
            line[startX] = diff === 2 ? '⏫️' : diff === 1 ? '🔼' : diff === -1 ? '🔽' : diff === -2 ? '⏬️' : '🐞';
        } else if (startY === targetY) {
            var diff = startX - targetX;
            line[startX] = diff === 2 ? '⏪️' : diff === 1 ? '◀️' : diff === -1 ? '▶️' : diff === -2 ? '⏩️' : '🐞';
        } else {
            line[startX] = '🐞';
        }
        data.animate[startY] = line.join('');
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

    function countSameItem(data, startX, startY, diffX, diffY) {
        var item = getItem(data, startX, startY);
        if (!isItemMovable(item)) {
            return 0;
        }

        var rows = getRows(data);
        var cols = getCols(data);
        var x = startX + diffX;
        var y = startY + diffY;
        var count = 0;

        while ((x >= 0) && (y >= 0) && (x < cols) && (y < rows) && (getItem(data, x, y) === item)) {
            ++count;
            x += diffX;
            y += diffY;
        }

        return count;
    }

    function solve3col(data) {
        var rows = getRows(data);
        var cols = getCols(data);

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var countDown = countSameItem(data, x, y, 0, 1);
                if (countDown === 2) {
                    var item = getItem(data, x, y);
                    if (isBaseItem(item)) {
                        cleanItem(data, x, y + 0);
                        cleanItem(data, x, y + 1);
                        cleanItem(data, x, y + 2);
                    }
                }
            }
        }
    }

    function solve3row(data) {
        var rows = getRows(data);
        var cols = getCols(data);

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var countRight = countSameItem(data, x, y, 1, 0);
                if (countRight === 2) {
                    var item = getItem(data, x, y);
                    if (isBaseItem(item)) {
                        cleanItem(data, x + 0, y);
                        cleanItem(data, x + 1, y);
                        cleanItem(data, x + 2, y);
                    }
                }
            }
        }
    }

    function solve4col(data, posX, posY, altX, altY) {
        var rows = getRows(data);
        var cols = getCols(data);

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var countDown = countSameItem(data, x, y, 0, 1);
                if (countDown === 3) {
                    var item = getItem(data, x, y);

                    if (((x == posX) && ((y + 2) == posY)) || ((x == altX) && ((y + 2) == altY))) {
                        if (isBaseItem(item)) {
                            animateItem(data, x, y + 0, x, y + 2);
                            animateItem(data, x, y + 1, x, y + 2);
                            changeItem (data, x, y + 2, getStripesHItem(item));
                            animateItem(data, x, y + 3, x, y + 2);
                        } else {
                            cleanItem(data, x, y + 0);
                            cleanItem(data, x, y + 1);
                            cleanItem(data, x, y + 2);
                            cleanItem(data, x, y + 3);
                        }
                    } else {
                        if (isBaseItem(item)) {
                            animateItem(data, x, y + 0, x, y + 1);
                            changeItem (data, x, y + 1, getStripesHItem(item));
                            animateItem(data, x, y + 2, x, y + 1);
                            animateItem(data, x, y + 3, x, y + 1);
                        } else {
                            cleanItem(data, x, y + 0);
                            cleanItem(data, x, y + 1);
                            cleanItem(data, x, y + 2);
                            cleanItem(data, x, y + 3);
                        }
                    }
                }
            }
        }
    }

    function solve4row(data, posX, posY, altX, altY) {
        var rows = getRows(data);
        var cols = getCols(data);

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var countRight = countSameItem(data, x, y, 1, 0);
                if (countRight === 3) {
                    var item = getItem(data, x, y);

                    if((((x + 2) == posX) && (y == posY)) || (((x + 2) == altX) && (y == altY))) {
                        if (isBaseItem(item)) {
                            animateItem(data, x + 0, y, x + 2, y);
                            animateItem(data, x + 1, y, x + 2, y);
                            changeItem (data, x + 2, y, getStripesVItem(item));
                            animateItem(data, x + 3, y, x + 2, y);
                        } else {
                            cleanItem(data, x + 0, y);
                            cleanItem(data, x + 1, y);
                            cleanItem(data, x + 2, y);
                            cleanItem(data, x + 3, y);
                        }
                    } else {
                        if (isBaseItem(item)) {
                            animateItem(data, x + 0, y, x + 1, y);
                            changeItem (data, x + 1, y, getStripesVItem(item));
                            animateItem(data, x + 2, y, x + 1, y);
                            animateItem(data, x + 3, y, x + 1, y);
                        } else {
                            cleanItem(data, x + 0, y);
                            cleanItem(data, x + 1, y);
                            cleanItem(data, x + 2, y);
                            cleanItem(data, x + 3, y);
                        }
                    }
                }
            }
        }
    }

    function solve5col(data, posX, posY, altX, altY) {
        var rows = getRows(data);
        var cols = getCols(data);

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var countDown = countSameItem(data, x, y, 0, 1);
				if (countDown === 4) {
					animateItem(data, x, y + 0, x, y + 2);
					animateItem(data, x, y + 1, x, y + 2);
                    changeItem (data, x, y + 2, '🏵️');
					animateItem(data, x, y + 3, x, y + 2);
					animateItem(data, x, y + 4, x, y + 2);
				}
			}
		}
	}

    function solve5row(data, posX, posY, altX, altY) {
        var rows = getRows(data);
        var cols = getCols(data);

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var countRight = countSameItem(data, x, y, 1, 0);
				if (countRight === 4) {
					animateItem(data, x + 0, y, x + 2, y);
					animateItem(data, x + 1, y, x + 2, y);
                    changeItem (data, x + 2, y, '🏵️');
					animateItem(data, x + 3, y, x + 2, y);
					animateItem(data, x + 4, y, x + 2, y);
				}
			}
		}
    }

    function funcBoard(repository) {
        var ret = {
            initial: repository.design.map(function(arr) { return arr.slice(); }),
            cleaned: repository.design.map(function(arr) { return arr.slice(); }),
            animate: [],
        };

        var rows = getRows(ret);
        var cols = getCols(ret);

        for (var y = 0; y < rows; ++y) {
            ret.animate[y] = '';
            for (var x = 0; x < cols; ++x) {
                ret.animate[y] += '⬜️';
            }
        }

        for (var s = 0; s < solveFuncs.length; ++s) {
            solveFuncs[s](ret);
        }

        return ret;
    }

    init();

    return {
        board: funcBoard,
    };
}());