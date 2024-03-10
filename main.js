const front  = document.getElementById("front")
const back  = document.getElementById("back")

var GCD = function(a, b) {
    if (!b) { // if b is zero
      return a;
    }
  
    return GCD(b, a % b);
  }


function toRoman(num) {
    let str = ""
    if (num<4) {
        for (let i=0; i < num; i++) {
            str += "I"
        }
    } else if (num ==4) {
        str = "IV"
    } else if (num > 4 && num < 9) {
        str = "V"
        for (let i = 0; i > num-5; i++) {
            str += "I"
        }
    } else if (num == 9) {
        str = "IX"
    } else {
        str = "X"
    }

    return str
}

function simplify (a,b) {
    
    const gcd = GCD(a,b)
    
    if (a==b) return ["",""];
    


    return [toNothing(a/gcd),toNothing(b/gcd)]

}

function toNothing(num) {
    if (num==1) {return "";} else {return num}
}




const transitionMetals = [
    {"name":"copper", "symbol":"Cu","ic":2,"ous":1,"traditional":"cupr"},
    {"name":"mercury", "symbol":"Hg","ic":2,"ous":1},
    {"name":"gold", "symbol":"Au","ic":3,"ous":1,"traditional":"aur"},
    {"name":"iron", "symbol":"Fe","ic":3,"ous":2,"traditional":"ferr"},
    {"name":"nickel", "symbol":"Ni","ic":3,"ous":2,"traditional":"nickel"},
    {"name":"cobalt", "symbol":"Co","ic":3,"ous":2  },
    {"name":"cromium", "symbol":"Cr","ic":3,"ous":2},
    {"name":"lead", "symbol":"Pb","ic":4,"ous":2,"traditional":"plumb"},
    {"name":"tin", "symbol":"Sn","ic":4,"ous":2,"traditional":"stann"},
    {"name":"manganese", "symbol":"Mn","ic":4,"ous":2},
    {"name":"zinc","symbol":"Zn","charge":2},
    {"name":"silver","symbol":"Ag","charge":1},
    {"name":"ammonium","charge":1,"symbol":"(NH4)"},
]



function regenerate() {
    const compound = generateIonicCompound()
    front.innerHTML = compound[0]
    back.innerHTML = compound[1]
}

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

const polyatomicIons = [
    {root:"nitr",os:3,charge:1,symbol:"N","varying-oxidation":true},
    {root:"chlor",os:3,charge:1,symbol:"Cl","varying-oxidation":true},
    {root:"carbon",os:3,charge:2,symbol:"C","varying-oxidation":true},
    {root:"silic",os:3,charge:2,symbol:"Si","varying-oxidation":false},
    {root:"sulf",os:4,charge:2,symbol:"S","varying-oxidation":true},
    {root:"chrom",os:4,charge:2,symbol:"Cr","varying-oxidation":false},
    {root:"arsen",os:4,charge:3,symbol:"As","varying-oxidation":false},
    {root:"phosph",os:4,charge:3,symbol:"P","varying-oxidation":true},
    {name:"thiosulfate",charge:2,formula:"S2O3"},
    {name:"dichromate",charge:2,formula:"Cr2O7"},
    {name:"permanganate",charge:1,formula:"MnO4"},
    {name:"cyanide",charge:1,formula:"CN"},
    {name:"hydroxide",charge:1,formula:"OH"},
    {name:"acetate",charge:1,formula:"CH3COO"},
    {name:"peroxide",charge:2,formula:"O2"}


]
//    {name:"ammonium",charge:1,formula:"S2O3"},


const generateIonicCompound = () => {
    // return [name, formula]
    let name = ""
    let formula  = ""

    const metal = generateMetal()

    name += metal[0] + " "
    

    const ion = generatePolyIon()

    name += ion[0]

    console.log([metal[1],ion[1]])
    const charges = simplify(metal[1],ion[1])
    
    console.log(charges)
    if (charges[0] == "") {
        formula += metal[2]+charges[1]+ion[2]

    } else {
        formula += metal[2]+charges[1]+"("+ion[2]+")"+charges[0]

    }

    return [name,formula]


}   

const generateMetal = () => {
    const index = getRandomIntInclusive(1,transitionMetals.length-1)

    if (transitionMetals[index].hasOwnProperty("traditional")) {
        const rand = getRandomIntInclusive(1,2)
        if (rand == 2)  {
            return [transitionMetals[index]["traditional"] + "ic",transitionMetals[index]["ic"],transitionMetals[index]["symbol"]]
        }
        if (rand == 1)  {
            return [ transitionMetals[index]["traditional"] + "ous", transitionMetals[index]["ous"],transitionMetals[index]["symbol"]]
        }

    } else if (transitionMetals[index].hasOwnProperty("charge")) {
        console.log ([transitionMetals[index]["name"], transitionMetals[index]["charge"],transitionMetals[index]["symbol"]])
        return [transitionMetals[index]["name"], transitionMetals[index]["charge"],transitionMetals[index]["symbol"]]

    } else {
        const rand = getRandomIntInclusive(1,2)
        if (rand == 2)  {
            return [transitionMetals[index]["name"] + "("+toRoman(transitionMetals[index]["ic"])+")", transitionMetals[index]["ic"],transitionMetals[index]["symbol"]]
        }
        if (rand == 1)  {
            return [transitionMetals[index]["name"] + "("+toRoman(transitionMetals[index]["ous"])+")",transitionMetals[index]["ous"],transitionMetals[index]["symbol"]]
        }

    }
}

function generatePolyIon () {
    const index = getRandomIntInclusive(1,polyatomicIons.length-1)

    if (!polyatomicIons[index].hasOwnProperty("varying-oxidation")) {
        return [polyatomicIons[index].name,polyatomicIons[index].charge,polyatomicIons[index].formula ]
    }

    if (polyatomicIons[index]["varying-oxidation"]==false) {
        return [polyatomicIons[index].root +"ate", polyatomicIons[index].charge, polyatomicIons[index].symbol+"O"+polyatomicIons[index].os.toString()]
    } else if (polyatomicIons[index].os == 4) {

        const oxidization = getRandomIntInclusive(-2,1)
        let suffix = ""
        let prefix = ""
        if (oxidization==1) {
            prefix = "per"
            suffix = "ate"
        } else if (oxidization==0) {
            prefix = ""
            suffix = "ate"
        } else if (oxidization==-1) {
            prefix = ""
            suffix = "ite"
        } else if (oxidization==-2) {
            prefix = "hypo"
            suffix = "ite"
        } 

        return [prefix + polyatomicIons[index].root +suffix, polyatomicIons[index].charge, polyatomicIons[index].symbol+"O"+(polyatomicIons[index].os+oxidization).toString()]
 
    } else {
        const oxidization = getRandomIntInclusive(-1,0)
        let suffix = ""

        if (oxidization==-1) {
            suffix = "ite"
        } else if (oxidization==0) {
            suffix = "ate"
        } 

        return [polyatomicIons[index].root +suffix, polyatomicIons[index].charge, polyatomicIons[index].symbol+"O"+(polyatomicIons[index].os+oxidization).toString()]

    }
}




