var uiBoard = (function () {
    var boardID = 'board',
        boardDIV = null;

    function init() {
        var div = document.getElementById(boardID);

        if (null === div) {
            div = document.createElement('div');
            div.id = boardID;
            document.body.appendChild(div);
        }

        boardDIV = document.getElementById(boardID);
    }

    function funcShowRepository(repository) {
        var rows = board.getRows(repository);
        var cols = board.getCols(repository);
        var div = null;

        boardDIV.style.height = rows + 'em';
        boardDIV.style.width = cols + 'em';
        boardDIV.style.left = (-cols / 2) + 'em';
        boardDIV.style.top = (-rows / 2) + 'em';

        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var item = board.getItem(repository, x, y);

                div = document.createElement('div');
                div.id = 'board-item-' + x + '-' + y;
                div.className = 'board-item';
                div.style.left = x + 'em';
                div.style.top = y + 'em';
                div.innerHTML = item;
                boardDIV.appendChild(div);
            }
        }
    }

    init();

    return {
        showRepository: funcShowRepository,
    };
}());