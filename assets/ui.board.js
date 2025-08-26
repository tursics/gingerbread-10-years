var uiBoard = (function () {
    var boardID = 'board',
        boardDIV = null,
        boardItemID = 'board-item-',
        boardBlocked = true,
        keyboardItemID = 'board-item-keyboard-focus';

    function init() {
        var div = document.getElementById(boardID);

        if (null === div) {
            div = document.createElement('div');
            div.id = boardID;
            document.body.appendChild(div);
        }

        boardBlocked = true;
        boardDIV = document.getElementById(boardID);
    }

    function notifyFreeBoard() {
        boardBlocked = false;

        uiKeyboard.showFocusRing();
    }

    function notifyBlockBoard() {
        boardBlocked = true;

        uiKeyboard.hideFocusRing();
    }

    function funcIsInputBlocked() {
        return boardBlocked;
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

        boardBlocked = false;
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
        notifyBlockBoard();

        switchItemsPreAnimation(startX, startY, endX, endY, false);
    }

    function switchItemsPreAnimation(startX, startY, endX, endY, rollback) {
        if (!board.swapPosition(uiLevel.get(), startX, startY, endX, endY)) {
            notifyFreeBoard();
            return;
        }

        var divStart = funcGetItemDIV(startX, startY);
        var divEnd = funcGetItemDIV(endX, endY);
        var left = divStart.style.left;
        var top = divStart.style.top;
        var id = divStart.id;

        divStart.classList.add('animate');
        divStart.style.zIndex = 102;
        divStart.style.left = divEnd.style.left;
        divStart.style.top = divEnd.style.top;
        divStart.id = divEnd.id;

        divEnd.classList.add('animate');
        divEnd.style.zIndex = 101;
        divEnd.style.left = left;
        divEnd.style.top = top;
        divEnd.id = id;

        setTimeout(function() {
            switchItemsPostAnimation(startX, startY, endX, endY, rollback);
        }, 250 + 50);
    }

    function switchItemsPostAnimation(startX, startY, endX, endY, rollback) {
        var divStart = funcGetItemDIV(startX, startY);
        var divEnd = funcGetItemDIV(endX, endY);

        divStart.classList.remove('animate');
        divStart.style.removeProperty('z-index');

        divEnd.classList.remove('animate');
        divEnd.style.removeProperty('z-index');

        if (rollback) {
            notifyFreeBoard();
            return;
        }

        uiLevel.set(solve.move(uiLevel.get(), endX, endY, startX, startY));
        if (board.equalBoards(uiLevel.get().initial, uiLevel.get().cleaned)) {
            switchItemsPreAnimation(startX, startY, endX, endY, true);
        } else {
            animateItems();
        }
    }

    function animateItems() {
        hideHint();

        animateItemsPreAnimation();
    }

    function animateItemsPreAnimation() {
        var rows = board.getRows(uiLevel.get());
        var cols = board.getCols(uiLevel.get());

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var item = board.getAnimateItem(uiLevel.get(), x, y);
                if (board.isAnimateRemoveItem(item)) {
                    var div = funcGetItemDIV(x, y);
                    div.classList.add('animate');
                    div.style.opacity = 0;
                } else if (board.isAnimateChangeItem(item)) {
                    var div = funcGetItemDIV(x, y);
                    div.style.zIndex = 103;
                } else if (board.isAnimateMoveOneUpItem(item)) {
                    var div = funcGetItemDIV(x, y);
                    div.classList.add('animate');
                    div.style.top = funcGetItemDIV(0, y - 1).style.top;
                    div.style.zIndex = 102;
                } else if (board.isAnimateMoveTwoUpItem(item)) {
                    var div = funcGetItemDIV(x, y);
                    div.classList.add('animate');
                    div.style.top = funcGetItemDIV(0, y - 2).style.top;
                    div.style.zIndex = 101;
                } else if (board.isAnimateMoveOneDownItem(item)) {
                    var div = funcGetItemDIV(x, y);
                    div.classList.add('animate');
                    div.style.top = funcGetItemDIV(0, y + 1).style.top;
                    div.style.zIndex = 102;
                } else if (board.isAnimateMoveTwoDownItem(item)) {
                    var div = funcGetItemDIV(x, y);
                    div.classList.add('animate');
                    div.style.top = funcGetItemDIV(0, y + 2).style.top;
                    div.style.zIndex = 101;
                } else if (board.isAnimateMoveOneLeftItem(item)) {
                    var div = funcGetItemDIV(x, y);
                    div.classList.add('animate');
                    div.style.left = funcGetItemDIV(x - 1, 0).style.left;
                    div.style.zIndex = 102;
                } else if (board.isAnimateMoveTwoLeftItem(item)) {
                    var div = funcGetItemDIV(x, y);
                    div.classList.add('animate');
                    div.style.left = funcGetItemDIV(x - 2, 0).style.left;
                    div.style.zIndex = 101;
                } else if (board.isAnimateMoveOneRightItem(item)) {
                    var div = funcGetItemDIV(x, y);
                    div.classList.add('animate');
                    div.style.left = funcGetItemDIV(x + 1, 0).style.left;
                    div.style.zIndex = 102;
                } else if (board.isAnimateMoveTwoRightItem(item)) {
                    var div = funcGetItemDIV(x, y);
                    div.classList.add('animate');
                    div.style.left = funcGetItemDIV(x + 2, 0).style.left;
                    div.style.zIndex = 101;
                }
            }
        }

        setTimeout(function() {
            animateItemsPostAnimation();
        }, 250 + 50);
    }

    function animateItemsPostAnimation() {
        var rows = board.getRows(uiLevel.get());
        var cols = board.getCols(uiLevel.get());
        var changeItemCount = 0;

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var item = board.getAnimateItem(uiLevel.get(), x, y);
                if (board.isAnimateRemoveItem(item)) {
                    var div = funcGetItemDIV(x, y);
                    div.classList.remove('animate');
                    div.innerHTML = '';
                    div.style.removeProperty('opacity');
                } else if (board.isAnimateChangeItem(item)) {
                    var div = funcGetItemDIV(x, y);
                    div.style.removeProperty('z-index');
                    ++changeItemCount;
                } else if (board.isAnimateMoveOneUpItem(item) || board.isAnimateMoveTwoUpItem(item) || board.isAnimateMoveOneDownItem(item) || board.isAnimateMoveTwoDownItem(item)) {
                    var div = funcGetItemDIV(x, y);
                    div.classList.remove('animate');
                    div.style.top = funcGetItemDIV(0, y).style.top;
                    div.innerHTML = '';
                    div.style.removeProperty('z-index');
                } else if (board.isAnimateMoveOneLeftItem(item) || board.isAnimateMoveTwoLeftItem(item) || board.isAnimateMoveOneRightItem(item) || board.isAnimateMoveTwoRightItem(item)) {
                    var div = funcGetItemDIV(x, y);
                    div.classList.remove('animate');
                    div.style.left = funcGetItemDIV(x, 0).style.left;
                    div.innerHTML = '';
                    div.style.removeProperty('z-index');
                }
            }
        }

        if (changeItemCount > 0) {
            changeItemFaces();
        } else {
            refillItems();
        }
    }

    function changeItemFaces() {
        changeItemFacesPreAnimation();
    }

    function changeItemFacesPreAnimation() {
        var rows = board.getRows(uiLevel.get());
        var cols = board.getCols(uiLevel.get());

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var item = board.getAnimateItem(uiLevel.get(), x, y);
                if (board.isAnimateChangeItem(item)) {
                    var div = funcGetItemDIV(x, y);
                    div.classList.add('animate');
                    div.style.transform = 'rotate(360deg)';
                }
            }
        }

        setTimeout(function() {
            changeItemFacesMiddleAnimation();
        }, 250 / 2);
        setTimeout(function() {
            changeItemFacesPostAnimation();
        }, 250 + 50);
    }

    function changeItemFacesMiddleAnimation() {
        var rows = board.getRows(uiLevel.get());
        var cols = board.getCols(uiLevel.get());

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var item = board.getAnimateItem(uiLevel.get(), x, y);
                if (board.isAnimateChangeItem(item)) {
                    var newItem = board.getItem(uiLevel.get(), x, y);
                    var div = funcGetItemDIV(x, y);
                    div.innerHTML = newItem;
                }
            }
        }
    }

    function changeItemFacesPostAnimation() {
        var rows = board.getRows(uiLevel.get());
        var cols = board.getCols(uiLevel.get());

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var item = board.getAnimateItem(uiLevel.get(), x, y);
                if (board.isAnimateChangeItem(item)) {
                    var div = funcGetItemDIV(x, y);
                    div.classList.remove('animate');
                    div.style.removeProperty('transform');
                }
            }
        }

        refillItems();
    }

    function refillItems() {
        var repository = board.copyRepositoryFromRepository(uiLevel.get());
        repository = board.stepDropItems(repository);
        uiLevel.set(board.stepRefill(repository));

        if (!board.equalBoards(uiLevel.get().initial, uiLevel.get().cleaned)) {
            refillItemsReorderSpawItems();
        } else {
            switchItemsDone();
        }
    }

    function refillItemsReorderSpawItems() {
        var rows = board.getRows(uiLevel.get());
        var cols = board.getCols(uiLevel.get());

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var item = board.getAnimateItem(uiLevel.get(), x, y);
                if (board.isAnimateSpawnItem(item)) {
                    for (var y2 = y; y2 < (rows - 1); ++y2) {
                        var item2 = board.getAnimateItem(uiLevel.get(), x, y2 + 1);
                        if (!board.isAnimateDropOneItem(item2)) {
                            var div = funcGetItemDIV(x, y2);
                            div.style.top = funcGetItemDIV(0, y - 1).style.top;
                            break;
                        }
                    }
                }
            }
        }

//        requestAnimationFrame(refillItemsPreAnimation);
        setTimeout(function() {
            refillItemsReorderOtherItems();
        }, 50);
    }

    function refillItemsReorderOtherItems() {
        var rows = board.getRows(uiLevel.get());
        var cols = board.getCols(uiLevel.get());

        for (var y = rows - 1; y >= 0; --y) {
            for (var x = 0; x < cols; ++x) {
                var item = board.getAnimateItem(uiLevel.get(), x, y);
                if (board.isAnimateDropOneItem(item)) {
                    var sourceDiv = funcGetItemDIV(x, y - 1);
                    var div = funcGetItemDIV(x, y);
                    var id = sourceDiv.id;
                    sourceDiv.id = div.id;
                    div.id = id;
                } else if (board.isAnimateSpawnItem(item)) {
                    var div = funcGetItemDIV(x, y);
                    div.style.top = funcGetItemDIV(0, y - 1).style.top;
                }
            }
        }

        refillItemsPreAnimation();
    }

    function refillItemsPreAnimation() {
        var rows = board.getRows(uiLevel.get());
        var cols = board.getCols(uiLevel.get());

        for (var y = rows - 1; y >= 0; --y) {
            for (var x = 0; x < cols; ++x) {
                var item = board.getAnimateItem(uiLevel.get(), x, y);
                if (board.isAnimateDropOneItem(item)) {
                    var div = funcGetItemDIV(x, y);
                    div.classList.add('animate-drop');
                    div.style.top = funcGetItemDIV(0, y).style.top;
                } else if (board.isAnimateSpawnItem(item)) {
                    var newItem = board.getItem(uiLevel.get(), x, y);
                    var div = funcGetItemDIV(x, y);
                    div.classList.add('animate-drop');
                    div.style.top = funcGetItemDIV(0, y).style.top;
                    div.style.zIndex = 101;
                    div.innerHTML = newItem;

                    div = funcGetItemDIV(x, y - 1);
                    div.style.zIndex = 102;
                }
            }
        }

        var repository = uiLevel.get();
        setTimeout(function() {
            refillItemsPostAnimation(repository);
//        }, 250 + 50);
        }, 250);
        setTimeout(function() {
            refillItems();
        }, 250 - 50);
    }

    function refillItemsPostAnimation(repository) {
        var rows = board.getRows(repository);
        var cols = board.getCols(repository);

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var item = board.getAnimateItem(repository, x, y);
                if (board.isAnimateDropOneItem(item)) {
                    var div = funcGetItemDIV(x, y);
                    div.classList.remove('animate-drop');
                } else if (board.isAnimateSpawnItem(item)) {
                    var div = funcGetItemDIV(x, y);
                    div.classList.remove('animate-drop');
                    div.style.removeProperty('z-index');

                    div = funcGetItemDIV(x, y - 1);
                    div.style.removeProperty('z-index');
                }
            }
        }

//        refillItems();
    }

    function switchItemsDone() {
        setTimeout(function() {
            switchItemsDonePaused();
        }, 50 + 50);
    }

    function switchItemsDonePaused() {
        uiLevel.set(solve.board(uiLevel.get()));
        if (!board.equalBoards(uiLevel.get().initial, uiLevel.get().cleaned)) {
            animateItems();

            return;
        }

        notifyFreeBoard();

        var hints = solve.hint(uiLevel.get());
        if (hints.length === 0) {
            boardDIV.classList.add('unsolvable');
        } else {
            showHint(hints);
        }
    }

    function showHint(hints) {
        if (hints.length === 0) {
            return;
        }

        var hint = hints[Math.floor(Math.random() * hints.length)];
        var div1 = uiBoard.getItemDIV(hint.x1, hint.y1);
        var div2 = uiBoard.getItemDIV(hint.x2, hint.y2);

        div1.classList.add('hint');
        div2.classList.add('hint');
    }

    function hideHint() {
        var divs = document.getElementsByClassName('hint');
        Array.from(divs).forEach((div) => div.classList.remove('hint'));
    }

    init();

    return {
        getItemDIV: funcGetItemDIV,
        getKeyboardDiv: funcGetKeyboardDiv,
        isInputBlocked: funcIsInputBlocked,
        showRepository: funcShowRepository,
        switchItems: funcSwitchItems,
    };
}());