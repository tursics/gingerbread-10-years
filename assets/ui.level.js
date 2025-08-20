var uiLevel = (function () {
    var currentRepository = null;

    function init() {
        currentRepository = null;
    }

    function funcGet() {
        return currentRepository;
    }

    function funcSet(repository) {
        currentRepository = repository;
    }

    init();

    return {
        get: funcGet,
        set: funcSet,
    };
}());