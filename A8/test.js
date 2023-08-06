const {addition, subtraction, division, multiplication} = require('./functions');

describe("addition",function(){
    test("addition of 7 and 8 is 15", function(){
        expect(addition(7,8)).toBe(15);
    })

    test("addition of 7 and '9' is '79' ", function(){
        expect(addition(7,"9")).toBe("79");
    })

    test("addition of 5 and ' ' is '5' ", function(){
        expect(addition(5,"")).toBe("5");
    })

    test("Should throw an error if no arguments are passed", function(){
        expect(addition()).toThrow("No arguments passed");
    })
})

describe("subtraction",function(){
    test("subtraction of 77 and 46 is 31", function(){
        expect(subtraction(77,46)).toBe(31);
    })

    test("subtraction of -17 and 28 is -45 ", function(){
        expect(subtraction(-17,28)).toBe(-45);
    })

    test("subtraction of 5 and ' ' is 5 ", function(){
        expect(subtraction(5,"")).toBe(5);
    })

    test("Should throw an error if no arguments are passed", function(){
        expect(subtraction()).toThrow("No arguments passed");
    })
})

describe("division",function(){
    test("division of 15 and 3 is 5", function(){
        expect(division(15,3)).toBe(5);
    })

    test("division of 5 and ' ' is infinity ", function(){
        expect(division(5,"")).toBe(Infinity);
    })

    test("Should throw an error if no arguments are passed", function(){
        expect(division()).toThrow("No arguments passed");
    })
})

describe("multiplication",function(){
    test("multiplication of 15 and 3 is 45", function(){
        expect(multiplication(15,3)).toBe(45);
    })

    test("multiplication of 5 and ' ' is infinity ", function(){
        expect(multiplication(5,"")).toBe(0);
    })

    test("Should throw an error if no arguments are passed", function(){
        expect(multiplication()).toThrow("No arguments passed");
    })
})
