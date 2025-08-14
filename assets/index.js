var config = {
//    debug: false,
    debug: true,
};

function selfDebug() {
    if (config.debug) {
        var debugLevel = level.getDebug();

        var repository = board.copyRepositoryFromDesign(debugLevel.design);
        repository = solve.board(repository);

        console.table(repository.initial);
        console.table(repository.cleaned);
        console.table(repository.animate);
    }
}

function spawnBoardWithLevel(id) {
    var selectedLevel = level.get(id);
    var repository = board.copyRepositoryFromDesign(selectedLevel.design);

    repository = board.spawn(repository);

    if (config.debug) {
        console.table(repository.cleaned);
    }

    return repository;
}

function simulateGame() {
    var repository = spawnBoardWithLevel(0);

    uiBoard.showRepository(repository);
}

window.onload = function() {
    var div = document.getElementById('starting');
    div.style.display = 'none';

    test.run();
//    selfDebug();

    simulateGame();
}
