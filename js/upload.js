const API_URL = "https://mammographie-cancer-api.onrender.com";

let gaugeCharts = {};


// =====================================================
// ENVOI IMAGE
// =====================================================

async function sendImage() {


    const input = document.getElementById("imageInput");

    const file = input?.files?.[0];


    if(!file){

        alert("Veuillez choisir une image");

        return;
    }



    // =========================
    // PREVIEW
    // =========================

    const preview =
        document.getElementById("preview");


    if(preview){

        preview.src =
        URL.createObjectURL(file);

        preview.style.display="block";

    }



    const btn =
    document.getElementById("submitBtn");


    if(btn){

        btn.disabled=true;

        btn.innerText="🔄 Analyse IA...";

    }



    try{


        const formData =
        new FormData();


        formData.append(
            "file",
            file
        );



        const response =
        await fetch(

            `${API_URL}/predict`,

            {

            method:"POST",

            body:formData

            }

        );



        const data =
        await response.json();



        if(!response.ok){

            throw new Error(
                data.detail ||
                "Erreur API"
            );

        }



        console.log(
            "PREDICTION:",
            data
        );




        // =========================
        // DONNEES RESULTAT
        // =========================


        const confidence =
        Number(data.confidence);



        const percent =
        (confidence*100).toFixed(2);



        const diagnosis =
        data.diagnosis ||

        (

        data.prediction==="MALIGNE"

        ?

        "Cancer malin détecté"

        :

        "Lésion bénigne détectée"

        );




        document.getElementById(
            "cancerType"
        ).innerText =
        data.prediction;



        document.getElementById(
            "resultLabel"
        ).innerText =
        data.prediction;



        document.getElementById(
            "diagnosis"
        ).innerText =
        diagnosis;




        // =========================
        // GAUGES IA
        // =========================


        updateGauges(
            confidence,
            data.prediction
        );



        updateCertainty(
            confidence*100
        );






        // =========================
        // GRADCAM
        // =========================


        console.log(
            "Demande GradCAM..."
        );



        const gradcamResponse =
        await fetch(

        `${API_URL}/generate-gradcam`,

        {

        method:"POST",

        headers:{

        "Content-Type":"application/json"

        },


        body:JSON.stringify({

            image_path:data.image_path

        })


        }

        );



        const gradcamData =
        await gradcamResponse.json();



        console.log(
            "GRADCAM:",
            gradcamData
        );



        const gradcamImg =
        document.getElementById(
            "gradcamResult"
        );



        if(

        gradcamResponse.ok &&

        gradcamData.gradcam_image &&

        gradcamImg

        ){


            gradcamImg.src =
            API_URL +
            gradcamData.gradcam_image;


            gradcamImg.style.display="block";

        }



    }


    catch(error){


        console.error(error);


        alert(
            error.message
        );

    }


    finally{


        if(btn){

            btn.disabled=false;

            btn.innerText=
            "🧠 Lancer le diagnostic IA";

        }

    }


}






// =====================================================
// BOUTON
// =====================================================


document.addEventListener(
"DOMContentLoaded",

()=>{


const btn =
document.getElementById(
"submitBtn"
);


if(btn){

btn.addEventListener(
"click",
sendImage
);

}



});









// =====================================================
// GAUGES ECHARTS
// =====================================================


function createGauge(
id,
value,
color,
label
){



const element =
document.getElementById(id);



if(!element)
return;



if(gaugeCharts[id]){

gaugeCharts[id].dispose();

}



const chart =
echarts.init(element);



chart.setOption({

series:[{


type:"gauge",


startAngle:210,


endAngle:-30,


min:0,

max:100,


radius:"90%",



progress:{


show:true,


width:18,


itemStyle:{

color:color

}

},



axisLine:{


lineStyle:{


width:18,


color:[

[0.5,"#22c55e"],

[0.75,"#f59e0b"],

[1,"#ef4444"]

]

}

},



pointer:{


itemStyle:{

color:color

}

},



axisTick:{

show:false

},


splitLine:{

show:false

},



axisLabel:{

show:false

},



detail:{


formatter:

"{value}%",


fontSize:25,


fontWeight:"bold"


},



data:[{

value:value

}]



}]

});



gaugeCharts[id]=chart;


window.addEventListener(
"resize",
()=>chart.resize()
);



}







function updateGauges(
confidence,
prediction
){



let score =
confidence*100;



let malignancy =
prediction==="MALIGNE"

?

score

:

100-score;



createGauge(

"confidenceGauge",

score,

"#2563eb",

"Confiance"

);



createGauge(

"malignancyGauge",

malignancy,

"#dc2626",

"Malignité"

);



createGauge(

"predictionGauge",

score,

"#16a34a",

"Probabilité"

);



}







// =====================================================
// CERTITUDE IA
// =====================================================


function updateCertainty(score){


let text;


if(score>=90)

text="TRÈS ÉLEVÉ";

else if(score>=70)

text="ÉLEVÉ";

else if(score>=50)

text="MODÉRÉ";

else

text="FAIBLE";



const el =
document.getElementById(
"certainty"
);


if(el)

el.innerText=text;


}