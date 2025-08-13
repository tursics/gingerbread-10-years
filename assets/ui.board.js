var uiBoard = (function () {
    var id = 'board';

    function init() {
        var div = document.getElementById(id);

        if (null === div) {
            div = document.createElement('div');
            div.id = id;
            div.style.cssText = 'position:absolute;width:100%;height:100%;background:#222;';
            document.body.appendChild(div);
        }
    }

    init();

    return {
    };
}());