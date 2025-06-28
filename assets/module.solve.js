var solve = (function () {
    var solveFuncs = [];

    function init() {
//        solveFuncs.push( this.solveStripedStriped);
//        solveFuncs.push( this.solve5row);
//        solveFuncs.push( this.solve5col);
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
//        solveFuncs.push( this.solve4row);
//        solveFuncs.push( this.solve4col);
//        solveFuncs.push( this.solve3row);
        solveFuncs.push(solve3col);
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
    }

    function countSameItem(data, startX, startY, diffX, diffY) {
        var item = getItem(data, startX, startY);
        if ((item === '⬜️') || (item === '🅾️')) {
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

    function solve3col(data)
    {
        var rows = getRows(data);
        var cols = getCols(data);

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var countDown = countSameItem(data, x, y, 0, 1);
                if (countDown === 2) {
                    cleanItem(data, x, y + 0);
                    cleanItem(data, x, y + 1);
                    cleanItem(data, x, y + 2);
                }
            }
        }
    }

    function funcBoard(repository) {
        var ret = {
            initial: repository.design.map(function(arr) { return arr.slice(); }),
            cleaned: repository.design.map(function(arr) { return arr.slice(); }),
        };

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