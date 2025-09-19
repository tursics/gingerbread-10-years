var solve = (function () {
    var solveFuncs = [];

    function init() {
        solveFuncs.push(solve3colPlusStripe);
        solveFuncs.push(solve3rowPlusStripe);
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

    function countSameItem(repository, startX, startY, diffX, diffY) {
        var item = board.getItem(repository, startX, startY);
        if (!board.isItemMovable(item)) {
            return 0;
        }

        var rows = board.getRows(repository);
        var cols = board.getCols(repository);
        var x = startX + diffX;
        var y = startY + diffY;
        var count = 0;

        while ((x >= 0) && (y >= 0) && (x < cols) && (y < rows) && (board.getItem(repository, x, y) === item)) {
            ++count;
            x += diffX;
            y += diffY;
        }

        return count;
    }

    function countSameBaseColor(repository, startX, startY, diffX, diffY) {
        var item = board.getBaseItem(board.getItem(repository, startX, startY));
        if (!board.isItemMovable(item) || !board.isItemValid(item)) {
            return 0;
        }

        var rows = board.getRows(repository);
        var cols = board.getCols(repository);
        var x = startX + diffX;
        var y = startY + diffY;
        var count = 0;

        while ((x >= 0) && (y >= 0) && (x < cols) && (y < rows) && (board.getBaseItem(board.getItem(repository, x, y)) === item)) {
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
                    var item = board.getItem(repository, x, y);
                    if (board.isBaseItem(item)) {
                        board.cleanItem(repository, x, y + 0);
                        board.cleanItem(repository, x, y + 1);
                        board.cleanItem(repository, x, y + 2);
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
                    var item = board.getItem(repository, x, y);
                    if (board.isBaseItem(item)) {
                        board.cleanItem(repository, x + 0, y);
                        board.cleanItem(repository, x + 1, y);
                        board.cleanItem(repository, x + 2, y);
                    }
                }
            }
        }
    }

    function solve4col(repository, newX, newY, oldX, oldY) {
        var rows = board.getRows(repository);
        var cols = board.getCols(repository);

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var countDown = countSameItem(repository, x, y, 0, 1);
                if (countDown === 3) {
                    var item = board.getItem(repository, x, y);

                    if (((x == newX) && ((y + 2) == newY)) || ((x == oldX) && ((y + 2) == oldY))) {
                        if (board.isBaseItem(item)) {
                            board.animateItem(repository, x, y + 0, x, y + 2);
                            board.animateItem(repository, x, y + 1, x, y + 2);
                            board.changeItem (repository, x, y + 2, board.getStripesHItem(item));
                            board.animateItem(repository, x, y + 3, x, y + 2);
                        }
                    } else {
                        if (board.isBaseItem(item)) {
                            board.animateItem(repository, x, y + 0, x, y + 1);
                            board.changeItem (repository, x, y + 1, board.getStripesHItem(item));
                            board.animateItem(repository, x, y + 2, x, y + 1);
                            board.animateItem(repository, x, y + 3, x, y + 1);
                        }
                    }
                }
            }
        }
    }

    function solve4row(repository, newX, newY, oldX, oldY) {
        var rows = board.getRows(repository);
        var cols = board.getCols(repository);

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var countRight = countSameItem(repository, x, y, 1, 0);
                if (countRight === 3) {
                    var item = board.getItem(repository, x, y);

                    if((((x + 2) == newX) && (y == newY)) || (((x + 2) == oldX) && (y == oldY))) {
                        if (board.isBaseItem(item)) {
                            board.animateItem(repository, x + 0, y, x + 2, y);
                            board.animateItem(repository, x + 1, y, x + 2, y);
                            board.changeItem (repository, x + 2, y, board.getStripesVItem(item));
                            board.animateItem(repository, x + 3, y, x + 2, y);
                        }
                    } else {
                        if (board.isBaseItem(item)) {
                            board.animateItem(repository, x + 0, y, x + 1, y);
                            board.changeItem (repository, x + 1, y, board.getStripesVItem(item));
                            board.animateItem(repository, x + 2, y, x + 1, y);
                            board.animateItem(repository, x + 3, y, x + 1, y);
                        }
                    }
                }
            }
        }
    }

    function solve5col(repository) {
        var rows = board.getRows(repository);
        var cols = board.getCols(repository);

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var countDown = countSameItem(repository, x, y, 0, 1);
				if (countDown === 4) {
                    var item = board.getItem(repository, x, y);
                    if (board.isBaseItem(item)) {
                        board.animateItem(repository, x, y + 0, x, y + 2);
                        board.animateItem(repository, x, y + 1, x, y + 2);
                        board.changeItem (repository, x, y + 2, '🏵️');
                        board.animateItem(repository, x, y + 3, x, y + 2);
                        board.animateItem(repository, x, y + 4, x, y + 2);
                    }
				}
			}
		}
	}

    function solve5row(repository) {
        var rows = board.getRows(repository);
        var cols = board.getCols(repository);

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var countRight = countSameItem(repository, x, y, 1, 0);
				if (countRight === 4) {
                    var item = board.getItem(repository, x, y);
                    if (board.isBaseItem(item)) {
                        board.animateItem(repository, x + 0, y, x + 2, y);
                        board.animateItem(repository, x + 1, y, x + 2, y);
                        board.changeItem (repository, x + 2, y, '🏵️');
                        board.animateItem(repository, x + 3, y, x + 2, y);
                        board.animateItem(repository, x + 4, y, x + 2, y);
                    }
				}
			}
		}
    }

    function solve3colPlusStripe(repository) {
        var rows = board.getRows(repository);
        var cols = board.getCols(repository);

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var countDown = countSameBaseColor(repository, x, y, 0, 1);
                if (countDown === 2) {
                    var baseItem = board.getBaseItem(board.getItem(repository, x, y));
                    var stripeVItem = board.getStripesVItem(baseItem);
                    var stripeHItem = board.getStripesHItem(baseItem);
                    var found =
                           board.getItem(repository, x, y + 0) === stripeVItem
                        || board.getItem(repository, x, y + 0) === stripeHItem
                        || board.getItem(repository, x, y + 1) === stripeVItem
                        || board.getItem(repository, x, y + 1) === stripeHItem
                        || board.getItem(repository, x, y + 2) === stripeVItem
                        || board.getItem(repository, x, y + 2) === stripeHItem;

                    if (found) {
                        board.cleanItem(repository, x, y + 0);
                        board.cleanItem(repository, x, y + 1);
                        board.cleanItem(repository, x, y + 2);
                    }
                }
            }
        }
    }

    function solve3rowPlusStripe(repository) {
        var rows = board.getRows(repository);
        var cols = board.getCols(repository);

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var countRight = countSameBaseColor(repository, x, y, 1, 0);
                if (countRight === 2) {
                    var baseItem = board.getBaseItem(board.getItem(repository, x, y));
                    var stripeVItem = board.getStripesVItem(baseItem);
                    var stripeHItem = board.getStripesHItem(baseItem);
                    var found =
                           board.getItem(repository, x + 0, y) === stripeVItem
                        || board.getItem(repository, x + 0, y) === stripeHItem
                        || board.getItem(repository, x + 1, y) === stripeVItem
                        || board.getItem(repository, x + 1, y) === stripeHItem
                        || board.getItem(repository, x + 2, y) === stripeVItem
                        || board.getItem(repository, x + 2, y) === stripeHItem;

                    if (found) {
                        board.cleanItem(repository, x + 0, y);
                        board.cleanItem(repository, x + 1, y);
                        board.cleanItem(repository, x + 2, y);
                    }
                }
            }
        }
    }

    function solveBoard(repository, newX, newY, oldX, oldY) {
        repository = board.copyRepositoryFromRepository(repository);

        for (var s = 0; s < solveFuncs.length; ++s) {
            solveFuncs[s](repository, newX, newY, oldX, oldY);
        }

        return repository;
    }

    function funcBoard(repository) {
        return solveBoard(repository);
    }

    function funcMove(repository, newX, newY, oldX, oldY) {
        return solveBoard(repository, newX, newY, oldX, oldY);
    }

    function funcHint(repository) {
        var sourceRepository = board.copyRepository1to1(repository);
        var rows = board.getRows(repository);
        var cols = board.getCols(repository);
        var ret = [];

        for (var y = 0; y < rows; ++y) {
            for (var x = 1; x < cols; ++x) {
                repository = board.copyRepository1to1(sourceRepository);

                board.swapPosition(repository, x, y, x - 1, y);
                repository = funcMove(repository, x - 1, y, x, y);

                var changed = !board.equalBoards(sourceRepository.animate_, repository.animate_);
                if (changed) {
                    ret.push({
                        x1: x - 1,
                        y1: y,
                        x2: x,
                        y2: y
                    });
                }
            }
        }

        for (var y = 1; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                repository = board.copyRepository1to1(sourceRepository);

                board.swapPosition(repository, x, y, x, y - 1);
                repository = funcMove(repository, x, y - 1, x, y);

                var changed = !board.equalBoards(sourceRepository.animate_, repository.animate_);
                if (changed) {
                    ret.push({
                        x1: x,
                        y1: y - 1,
                        x2: x,
                        y2: y
                    });
                }
            }
        }

        return ret;
    }

    init();

    return {
        board: funcBoard,
        hint: funcHint,
        move: funcMove,
    };
}());