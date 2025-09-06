var uiMouse = (function () {
    var selected = null,
        startX = 0,
        startY = 0,
        selectionX = 0,
        selectionY = 0;

    function init() {
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mousemove', onMouseMove);
    }

    function onMouseDown(e) {
        if (uiBoard.isInputBlocked()) {
            return;
        }

        if (e.target.classList.contains('board-item')) {
            selected = e.target;
            startX = e.pageX;
            startY = e.pageY;
            selectionX = selected.id.split('-')[2];
            selectionY = selected.id.split('-')[3];

            var item = board.getItem(uiLevel.get(), selectionX, selectionY);

            if (!board.isItemMovable(item)) {
                selected = null;
            }
        }
    }

    function onMouseUp(e) {
        selected = null;
    }

    function onMouseMove(e) {
        if (selected) {
            var angle = getAngle(e);
            var distance = getDistance(e);

            if (distance > .75) {
                selected = null;
        		angle -= 45;

                if (angle < 0) {
                    switchLeft();
                } else if (angle < 90) {
                    switchUp();
                } else if (angle < 180) {
                    switchRight();
                } else if (angle < 270) {
                    switchDown();
                } else {
                    switchLeft();
                }
            }
        }
    }

    function getAngle(e) {
        var x = startX - e.pageX;
        var y = startY - e.pageY;
        var length = Math.sqrt(x * x + y * y);
        var angle = Math.acos(x / length) * 180 / Math.PI;

        if (isNaN(angle)) {
            angle = 0;
        }
        if (y < 0) {
            angle = 360 - angle;
        }

        return angle;
    }

    function getDistance(e) {
        var x = startX - e.pageX;
        var y = startY - e.pageY;
        var length = Math.sqrt(x * x + y * y);

        return length / selected.offsetWidth;
    }

    function switchLeft() {
        uiBoard.switchItems(selectionX, selectionY, selectionX - 1, selectionY);
    }

    function switchRight() {
        uiBoard.switchItems(selectionX, selectionY, selectionX + 1, selectionY);
    }

    function switchUp() {
        uiBoard.switchItems(selectionX, selectionY, selectionX, selectionY - 1);
    }

    function switchDown() {
        uiBoard.switchItems(selectionX, selectionY, selectionX, selectionY + 1);
    }

    function funcInitRepository() {
    }

    init();

    return {
        initRepository: funcInitRepository,
    };
}());