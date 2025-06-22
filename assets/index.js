var config = {
    debug: true,
};

function selfTest() {
    var repository = level.getDebug();
    console.log(repository.design);

    var ret = solve.board(repository);
    console.log(ret);
}

window.onload = function() {
    var div = document.getElementById('starting');
    div.style.display = 'none';

    selfTest();
}
