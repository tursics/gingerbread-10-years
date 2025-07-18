var config = {
    debug: true,
};

function selfTest() {
    var testLevels = level.getTests();

    testLevels.forEach(testLevel => {
        var repository = board.copyRepositoryFromDesign(testLevel.design);
        repository = solve.board(repository);

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

function spawnBoard(id) {
    var selectedLevel = level.get(id);
    var repository = board.copyRepositoryFromDesign(selectedLevel.design);

    do {
        repository = solve.board(repository);
        if (config.debug && !board.equalBoards(repository.initial, repository.cleaned)) {
            console.table('Spawn board - solve');
        }

        repository = board.removeAdvancedItems(repository);
        if (config.debug && !board.equalBoards(repository.initial, repository.cleaned)) {
            console.table('Spawn board - remove advanced items');
        }

        var refilled = false;
        do {
            repository = board.copyRepositoryFromRepository(repository);
            repository = board.stepDropItems(repository);
            repository = board.stepRefill(repository);
            if (config.debug && !board.equalBoards(repository.initial, repository.cleaned)) {
                refilled = true;
            }
        } while (!board.equalBoards(repository.initial, repository.cleaned));

        if (!refilled) {
            break;
        }
        if (config.debug) {
            console.table('Spawn board - Drop items and refill');
        }
    } while (true);

    if (config.debug) {
        console.table(repository.cleaned);
    }
}

function simulateGame() {
    spawnBoard(0);
}

window.onload = function() {
    var div = document.getElementById('starting');
    div.style.display = 'none';

    selfTest();
//    selfDebug();

    simulateGame();
}
