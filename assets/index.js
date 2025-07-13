var config = {
    debug: true,
};

function areSameBoards(left, right) {
    var l = left.length;
    var r = right.length;

    if (l !== r) {
        if (config.debug) {
            console.debug('Length mismatch');
        }
        return false;
    }

    for (var i = 0; i < l; ++i) {
        if (left[i] !== right[i]) {
            if (config.debug) {
                console.debug(left[i]);
                console.debug(right[i]);
            }
            return false;
        }
    }
    return true;
}

function selfTest() {
    var repositories = level.getTests();

    repositories.forEach(repository => {
        var ret = solve.board(repository);
        var success = areSameBoards(ret.initial, repository.design) && areSameBoards(ret.cleaned, repository.expectedResult) && areSameBoards(ret.animate, repository.expectedAnimation);

        if (!success) {
            console.error('Test "' + repository.title + '" failed.');
            console.table(ret.initial);
            console.table(ret.cleaned);
            console.table(ret.animate);
        }
    });
}

function selfDebug() {
    var repository = level.getDebug();

    var ret = solve.board(repository);

    console.table(ret.initial);
    console.table(ret.cleaned);
    console.table(ret.animate);
}

window.onload = function() {
    var div = document.getElementById('starting');
    div.style.display = 'none';

    selfTest();
    selfDebug();
}
