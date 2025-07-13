var board = (function () {

    function init() {
    }

    function funcGetRows(repository) {
        return repository.cleaned.length;
    }

    function funcGetCols(repository) {
        return Array.from(new Intl.Segmenter().segment(repository.cleaned[0])).length;
    }

    function funcCopyRepositoryFromDesign(design) {
        var repository = {
            initial: design.map(function(arr) { return arr.slice(); }),
            cleaned: design.map(function(arr) { return arr.slice(); }),
            animate: [],
        };

        var rows = board.getRows(repository);
        var cols = board.getCols(repository);

        for (var y = 0; y < rows; ++y) {
            repository.animate[y] = '';
            for (var x = 0; x < cols; ++x) {
                repository.animate[y] += '⬜️';
            }
        }

        return repository;
    }

    init();

    return {
        getRows: funcGetRows,
        getCols: funcGetCols,
        copyRepositoryFromDesign: funcCopyRepositoryFromDesign,
    };
}());