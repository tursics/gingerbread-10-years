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
            console.table(' ');
            console.table('Solve board');
            console.table(' ');
            console.table(repository.cleaned);
            console.table(repository.animate);
        }

        repository = board.removeAdvancedItems(repository);
        if (config.debug && !board.equalBoards(repository.initial, repository.cleaned)) {
            console.table(' ');
            console.table('Remove advanced items');
            console.table(' ');
            console.table(repository.cleaned);
            console.table(repository.animate);
        }

/*    dropItems(repository);

    console.table(repository.initial);
    console.table(repository.cleaned);
    console.table(repository.animate);*/

        repository = board.refillBoard(repository);
        if (config.debug && !board.equalBoards(repository.initial, repository.cleaned)) {
            console.table('Spawn board - refill');
        }
    } while (!board.equalBoards(repository.initial, repository.cleaned));

/*
		board.dropGems( function() {
		});
	});*/

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
