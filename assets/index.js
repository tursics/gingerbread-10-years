var config = {
    debug: true,
};

function selfTest() {
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
}
