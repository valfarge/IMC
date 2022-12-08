const BMIData = [ //data à retourner
    {name:"Maigreur",color:"midnightblue",range:[0,18.5]},
    {name:"Bonne santé",color:"green",range:[18.5,25]},
    {name:"Surpoids",color:"lightcoral",range:[25,30]},
    {name:"Obésité modérée",color:"orange",range:[30,35]},
    {name:"Obésité sévère",color:"crimson",range:[35,40]},
    {name:"Obésité morbide ",color:"purple",range:40},
]



const form = document.querySelector("form"); //const form


//lorsque l'evenement est déclenché, cela va envoyer la méthode "handleForm"
// qui va déclencher la --> (callback)

form.addEventListener("submit",handleForm)

function handleForm(e){  //creation call back
    e.preventDefault();//ne renvoie plus sur la meme page qd on click

    calculateBMI()
}

//Je vais avoir besoin de la valeur des inputs pour calculer IMC 
const inputs = document.querySelectorAll("input") // donc je créé une const


function calculateBMI(){ //calcul de la masse IMC
   const height = inputs[0].value; //recupere la valeur du 1er élément input id "height"
   const weight = inputs[1].value;
    
    //creation de condition pour ne pas avoir de chiffre negatif ou vide
    if(!height|| !weight || height <= 0 ||weight <= 0 ){   // si height ou weight est sans caractere
      handleError(); //alors on appelle d'une fonction en cas d'erreur
      return; //on est dans une fonction donc on return ,on sort de la fonction , on a pas envie d'executer le reste
    }

    const BMI = (weight / Math.pow(height/100,2)).toFixed(1)// Calcul de l'IMC, 
    //(math.pow sert a fairre un calcul au carré), la hauteur divisée par 100 puissance 2 , et toFixed (1)
    // sert a garder 1 chiffre apres la virgule. IMC = poids en kg / taille2 en m

    showResult(BMI)
}
//-----------------------------           ----------------------------------------//
const displayBMI = document.querySelector(".bmi-value"); //on récupère sur le HTML les élements
const result = document.querySelector(".result"); ////on récupère sur le HTML les élements

function handleError(){ //on creer la fonction qu'on va utiliser ci dessus avec les 2 selectors
    displayBMI.textContent = "Wops"; //cela affiche Wops si c'est mal remplis
    result.textContent = "Remplissez correctement les inputs." // avec remplissez correctement les inputs

}

function showResult(BMI){
    const rank = BMIData.find(data =>{ //appelle de BMI data avec le .find pour trouver, j'envoie une methode "callback" avec une valeur courrante que j'appelle data, 
        if(BMI >= data.range[0] && BMI < data.range[1])// la methode find avec les valeurs tableaux va me permettre de retourner le 1er element qui est retourné dans ma callback
         return data;                                   //
        else if(typeof data.range === "number" && BMI >= data.range)// typeof renvoie une chaine qui l'opérande, pour l'imc de plus de 40
        return data;    
    })
   displayBMI.textContent = BMI; //Résultat number affiché
   displayBMI.style.color = `${rank.color}`// rsultat chiffre en couleur selon obésité
   result.textContent = `Résultat : ${rank.name}` // affiche si bonne santé ou pas.

}