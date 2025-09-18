var uiTouch = (function () {
    var touched = [];

    function init() {
        document.addEventListener("touchstart", onTouchStart);
        document.addEventListener("touchend", onTouchEnd);
        document.addEventListener("touchcancel", onTouchEnd);
        document.addEventListener("touchmove", onTouchMove);
    }

    function onTouchStart(e) {
        if (uiBoard.isInputBlocked()) {
            return;
        }

        if (e.target.classList.contains('board-item')) {
            var touches = e.changedTouches;

            for (var t = 0; t < touches.length; ++t) {
                var touch = touches[t];
                var obj = {
                    selected: touch.target,
                    startX: touch.pageX,
                    startY: touch.pageY,
                    selectionX: parseInt(touch.target.id.split('-')[2], 10),
                    selectionY: parseInt(touch.target.id.split('-')[3], 10),
                    identifier: touch.identifier
                };

                var item = board.getItem(uiLevel.get(), obj.selectionX, obj.selectionY);

                if (board.isItemMovable(item)) {
                    touched.push(obj);
                }
            }
        }
    }

    function onTouchEnd(e) {
        var touches = e.changedTouches;

        for (var t = 0; t < touches.length; ++t) {
            var touch = touches[t];
            var idx = touched.findIndex((element) => element.identifier === touch.identifier);

            if (idx !== -1) {
                touched.splice(idx, 1);
            }
        }
    }

    function onTouchMove(e) {
        var touches = e.changedTouches;

        for (var t = 0; t < touches.length; ++t) {
            var touch = touches[t];
            var obj = touched.find((element) => element.identifier === touch.identifier);

            if (obj) {
                var angle = getAngle(touch, obj);
                var distance = getDistance(touch, obj);

                if (distance > .6) {
                    angle -= 45;

                    if (angle < 0) {
                        switchLeft(obj);
                    } else if (angle < 90) {
                        switchUp(obj);
                    } else if (angle < 180) {
                        switchRight(obj);
                    } else if (angle < 270) {
                        switchDown(obj);
                    } else {
                        switchLeft(obj);
                    }

                    touched = [];
                    return;
                }
            }
        }
    }

    function getAngle(e, obj) {
        var x = obj.startX - e.pageX;
        var y = obj.startY - e.pageY;
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

    function getDistance(e, obj) {
        var x = obj.startX - e.pageX;
        var y = obj.startY - e.pageY;
        var length = Math.sqrt(x * x + y * y);

        return length / obj.selected.offsetWidth;
    }

    function switchLeft(obj) {
        uiBoard.switchItems(obj.selectionX, obj.selectionY, obj.selectionX - 1, obj.selectionY);
    }

    function switchRight(obj) {
        uiBoard.switchItems(obj.selectionX, obj.selectionY, obj.selectionX + 1, obj.selectionY);
    }

    function switchUp(obj) {
        uiBoard.switchItems(obj.selectionX, obj.selectionY, obj.selectionX, obj.selectionY - 1);
    }

    function switchDown(obj) {
        uiBoard.switchItems(obj.selectionX, obj.selectionY, obj.selectionX, obj.selectionY + 1);
    }

    function funcInitRepository() {
    }

    init();

    return {
        initRepository: funcInitRepository,
    };
}());