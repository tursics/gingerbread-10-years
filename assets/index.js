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
    var testLevels = level.getTests();

    testLevels.forEach(testLevel => {
        var repository = solve.board(testLevel);
        var success = areSameBoards(repository.initial, testLevel.design) && areSameBoards(repository.cleaned, testLevel.expectedResult) && areSameBoards(repository.animate, testLevel.expectedAnimation);

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

        var repository = solve.board(debugLevel);

        console.table(repository.initial);
        console.table(repository.cleaned);
        console.table(repository.animate);
    }
}

function refillBoard(repository) {

}

function spawnBoard(id) {
    var selectedLevel = level.get(id);
    var repository = solve.board(selectedLevel);

    console.table(repository.initial);
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

    refillBoard(repository);

    console.table(repository.initial);
    console.table(repository.cleaned);
    console.table(repository.animate);

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
