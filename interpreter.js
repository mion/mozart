var vm = new VirtualMachine({scope: new Object()})
//FORMS
// atom null quote list label equal lambda
// +  - * / ^
//DATA
// Number, String, Array, Object
vm.def('square', (x) => { return x * x })
vm.square(25) == 625
vm.eval('(square 25)') == 625
////////////////////////////////////////////////////////////////////////////////
const Interpreter = function (args) {
    _.defaults(args, {
        scope: {}
    })
    return this
}

let interpreter = new Interpreter({
    scope: {
        foo: 123
    }
})

let execute = (command) => {
    let tokenizedCommand = interpreter.tokenize(command);
    let parsedCommand = interpreter.parse(command);
}
