var ns = {};

class Stack {
    constructor() {
        this._array = [];
    }

    push(value) {
        this._array.push(value);
    }

    pop() {
        return this._array.pop();
    }

    clear() {
        this._array = [];
    }

    get count() {
        return this._array.length;
    }
}

$(document).ready(function() {
    var rpnStack = new Stack();
    var opStack = new Stack();
    var canAppend = true;
    var isResult = false;

    $("button").click(function() {
        var key = $(this).attr("data-value");
        console.log("clicked: " + key);
        handleKey(key);
    });

    $(document).keypress(function(e) {
        var pattern = /[0-9\+\-\*\/\.%c]/;
        var key = String.fromCharCode(e.which);

        if(pattern.test(key) || e.which === 13) {
            if(e.which === 13) key = "equal";
            handleKey(key)
        }
    });

    function handleKey(key) {
        if(isDigit(key)) {
            appendDisplay(key);
        } else if(isClear(key)) {
            reset();
        } else {
            canAppend = false;
            if(!isResult) {
                var operand = getDisplay();
                rpnStack.push(operand);
            }

            if(opStack.count > 0) {
                console.log("rpnStack count: " + rpnStack.count);
                var operator = opStack.pop();
                var a = rpnStack.pop();
                var b = rpnStack.pop();
                var result = operations[operator](a, b);

                rpnStack.push(result);
                setDisplay(result);
                isResult = true;
            }

            if(key !== "equal") {
                opStack.push(key);
                isResult = false;
            }
            
        }
    }

    function isDigit(data) {
        var pattern = /[0-9]/i;
        return pattern.test(data);
    }

    function isClear(key) {
        return key === "c";
    }

    function setDisplay(value) {
        $("#txtDisplay").val(value);
    }

    function getDisplay() {
        return Number($("#txtDisplay").val());
    }

    function appendDisplay(data) {
        var value = getDisplay();
        if(value == "0") value = "";

        if(canAppend) {
            value += "" + data;
        } else {
            value = data;
            canAppend = true;
        }

        setDisplay(value);
    }

    function reset() {
        setDisplay("0");
        rpnStack.clear();
        opStack.clear();
    }

    var operations = {
        '+': function(a, b) {
            return a + b;
        },
        '-': function(a, b) {
            return a - b;
        },
        '*': function(a, b) {
            return a * b;
        },
        '/': function(a, b) {
            return a / b;
        },
        '%': function(a, b) {
            return a * (b / 100);
        },
        equal: function() {

        }
    };

    function init() {
        $("button").addClass("btn")
            .addClass("btn-default")
            .addClass("btn-lg");

        $("#txtDisplay").show(150);
        $("button").show(150);
    }

    init();
});