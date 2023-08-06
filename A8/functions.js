function addition(a,b)
{
    if(!a || !b)
    {
        throw new Error("Invalid Arguments");
    }
    if(a == undefined || b == undefined)
    {
        throw new Error("Invalid Arguments");
    }
    return a+b;
}

function subtraction(a,b)
{
    return a-b;
}

function division(a,b)
{
    return a/b;
}

function multiplication(a,b)
{
    return a*b;
}

module.exports = {addition, subtraction, division, multiplication};