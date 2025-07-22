var config = {
    debug: true,
};

function selfTest() {
    var testLevels = level.getTests();

    testLevels.forEach(testLevel => {
        var method = testLevel.method;
        var repository = board.copyRepositoryFromDesign(testLevel.design);

        switch (method) {
            case 'solve.board':
                repository = solve.board(repository);
                break;
            case 'board.spawn':
                repository = board.spawn(repository);
                break;
            default:
                console.error('No method defined');
        }

        var success = board.equalBoardsWithLogging(repository.initial, testLevel.design) && board.equalBoardsWithLogging(repository.cleaned, testLevel.expectedResult) && board.equalBoardsWithLogging(repository.animate, testLevel.expectedAnimation);

        if (!success) {
            console.error('Test "' + testLevel.title + '" failed.');
            console.table(repository.initial);
            console.table(repository.cleaned);
            console.table(repository.animate);
        }
    });
}

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
}

function simulateGame() {
    spawnBoardWithLevel(0);
}

window.onload = function() {
    var div = document.getElementById('starting');
    div.style.display = 'none';

    selfTest();
//    selfDebug();

    simulateGame();
}
