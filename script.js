let URL= "https://restcountries.com/v3.1/all"

const question = () => {
    fetch(URL)
    .then(res => {return res.json()})
    .then(data =>{
        let random=randomize(0,250)
        let question = data[random].capital
        let max = window.matchMedia("(max-width: 520px)")
        document.getElementById('question').innerHTML= question + " is the capital city of";
        let answer = data[random].name.common;
        let option=[answer];

        let j=0
        while(j<3){
            let opt= data[randomize(0,250)].name.common
            let temp = false
            for(let i=0;i<option.length;i++){
                if(opt==option[i]){
                    temp=true
                    break
                }
            }
            if (temp == false){
                option.push(opt)
                j++
            }
        }
        option=shuffle(option)

        for(let i=0;i<4;i++){
            content="content"+(i+1)
            document.getElementById(content).innerHTML=option[i]
            sizing(option[i],content,max)
        }

        document.getElementById('ans').innerHTML= answer
    });
};

const flag = () => {
    fetch(URL)
    .then(res => {return res.json()})
    .then(data =>{
        let random=randomize(0,250)
        let flag = data[random].flags.png
        let max = window.matchMedia("(max-width: 520px)")
        document.getElementById('flag').src=flag
        document.getElementById('flag').style.width="100px"
        document.getElementById('flag').style.height="60px"

        let answer = data[random].name.common;
        let option=[answer];

        let j=0
        while(j<3){
            let opt= data[randomize(0,250)].name.common
            let temp = false
            for(let i=0;i<option.length;i++){
                if(opt==option[i]){
                    temp=true
                    break
                }
            }
            if (temp == false){
                option.push(opt)
                j++
            }
        }
        option=shuffle(option)

        for(let i=0;i<4;i++){
            content="content"+(i+1)
            document.getElementById(content).innerHTML=option[i]
            sizing(option[i],content,max)
        }

        document.getElementById('ans').innerHTML= answer
    });
};

function generate(){
    for (i = 0; i < 4; i++) {
        document.querySelector("#option"+(i+1)+" span.indicator").style.display="none"
        document.querySelector("#option"+(i+1)+" span.indicatorx").style.display="none"
        document.getElementById("option-box"+(i+1)).style.backgroundColor= "#FFFFFF"
        document.getElementById("option"+(i+1)).style.color= "rgba(96, 102, 208, 0.8)"
        document.getElementById("option-box"+(i+1)).style.borderColor= "rgba(96, 102, 208, 0.8)"
        document.querySelector("button#option-box"+(i+1)).disabled=false
    }
    document.getElementById("next").style.display="none"

    x=Math.floor(Math.random()*(2))
    if (x==0){
        document.getElementById("question-box").style.height="580px"
        document.getElementById("flag").style.display="none"
        document.getElementById("quest").style.display="none"
        document.getElementById("question").style.display="block"
        question()
    }

    else if(x==1){
        document.getElementById("question-box").style.height="655px"
        document.getElementById("flag").style.display="block"
        document.getElementById("quest").style.display="block"
        document.getElementById("question").style.display="none"
        flag()
    }
        
}

function sizing(string,content,max){
    let length=string.length;
    if(max.matches){
        if (length>20 && length<=30){
            document.getElementById(content).style.fontSize="9px";
        }
        else if (length>30){
            document.getElementById(content).style.fontSize="8px";
        }
        else{
            document.getElementById(content).style.fontSize="13px";
        }
    }
    else{
        if (length>30 && length<=40){
            document.getElementById(content).style.fontSize="14px";
        }
        else if (length>40){
            document.getElementById(content).style.fontSize="11px";
        }
        else{
            document.getElementById(content).style.fontSize="18px";
        }
    }
}

function shuffle(array){
    let newArr=[...array]
    for (let i = 0; i < 4; i++) {
        let randomPosition = randomize(0,4-i)
        let randomItem = newArr.splice(randomPosition, 1)
    
        newArr.push(...randomItem)
      }
    return newArr
}

function randomize(min,max){
    return Math.floor(Math.random()*(max+1))+min
}

function hover(id){
    document.getElementById("option-box"+id).style.backgroundColor= "#F9A826"
    document.getElementById("option"+id).style.color= "#FFFFFF"
    document.getElementById("option-box"+id).style.borderColor= "#F9A826"
}

function out(id){
    document.getElementById("option-box"+id).style.backgroundColor= "#FFFFFF"
    document.getElementById("option"+id).style.color= "rgba(96, 102, 208, 0.8)"
    document.getElementById("option-box"+id).style.borderColor= "rgba(96, 102, 208, 0.8)"
}


function answer(id){
    let answer=document.getElementById('ans').textContent
    content="content"+id
    choose=document.getElementById(content).textContent

    if(answer==choose){
        document.querySelector("#option"+id+" span.indicator").style.display="block"
        document.getElementById("option-box"+id).style.backgroundColor= "#60BF88"
        document.getElementById("option"+id).style.color= "#FFFFFF"
        document.getElementById("option-box"+id).style.borderColor= "#60BF88"

        for (i = 0; i < 4; i++) {
            document.querySelector("button#option-box"+(i+1)).disabled=true
        }
        document.getElementById("next").style.display="inline"
        correct()
    }

    if(answer!=choose){
        document.querySelector("#option"+id+" span.indicatorx").style.display="block"
        document.getElementById("option-box"+id).style.backgroundColor= "#EA8282"
        document.getElementById("option"+id).style.color= "#FFFFFF"
        document.getElementById("option-box"+id).style.borderColor= "#EA8282"

        let right
        let i
        for (i = 0; i < 4; i++) {
            index="content"+(i+1)
            right=document.getElementById(index).textContent
            if(right==answer){
                break
            }
        }
        document.querySelector("#option"+(i+1)+" span.indicator").style.display="block"
        document.getElementById("option-box"+(i+1)).style.backgroundColor= "#60BF88"
        document.getElementById("option"+(i+1)).style.color= "#FFFFFF"
        document.getElementById("option-box"+(i+1)).style.borderColor= "#60BF88"
        
        for (i = 0; i < 4; i++) {
            document.querySelector("button#option-box"+(i+1)).disabled=true
        }

        document.getElementById("next").style.display="inline"
    }

}

function total(){
    let total=Number(document.getElementById("total").textContent)

    if(total==10){
        document.getElementById("image-icon").style.display="none"
        document.getElementById("create").style.display="none"
        document.getElementById("complete").style.display="block"
        document.getElementById("question-box").style.height="540px"

        document.getElementById("result").innerHTML=document.getElementById("correct").textContent
    }

    total+=1
    document.getElementById("total").innerHTML=total
}

function correct(){
    let correct=Number(document.getElementById("correct").textContent)
    correct+=1
    document.getElementById("correct").innerHTML=correct
}

function next(){
    generate()
    total()
}

next()