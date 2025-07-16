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

    console.table(repository.initial);

    do {
        console.table(' ');
        console.table('Solve board');
        console.table(' ');
        repository = solve.board(repository);

        console.table(repository.cleaned);
        console.table(repository.animate);

/*    removeSwapItems(repository);

    console.table(repository.initial);
    console.table(repository.cleaned);
    console.table(repository.animate);*/

/*    dropItems(repository);

    console.table(repository.initial);
    console.table(repository.cleaned);
    console.table(repository.animate);*/

        console.table(' ');
        console.table('Refill board');
        console.table(' ');
        repository = board.refillBoard(repository);

        console.table(repository.cleaned);
        console.table(repository.animate);
    } while (!board.equalBoards(repository.initial, repository.cleaned));

/*
		board.dropGems( function() {
			board.refillBoard( function() {
				touch.thaw();

				if( dirty) {
					board.garbageCollection( touch, null, callback);
				} else {
					try {
						callback.apply( this);
					} catch(e) {
						console.error( 'CBoard callback error', e);
					}
				}
			});
		});
	});*/
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
