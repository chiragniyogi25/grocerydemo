console.log("Welcome to my grocery");

class Message{
    show(type,displayMessage){
        let message = document.getElementById('message');
        message.innerHTML =`<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message:</strong> ${displaymessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
    }
}

let fetchfru = document.getElementById("fetchfruits");
fetchfru.addEventListener("click",showfruits);

let fetchveg = document.getElementById("fetchveg");
fetchveg.addEventListener("click",showvegetables);

function showfruits(){

    let h = document.getElementById("heading");
    h.innerText = "Fruits List";
    const xhr = new XMLHttpRequest();
    xhr.open('GET','http://localhost:6969/database',true);
    xhr.onload = function(){
        if(this.status==200){
            //Adding Table head
            let table_head = document.getElementById('tabhead');
            let t_head = `<tr>
                            <th scope="col">Name</th>
                            <th scope="col">Pieces</th>
                            <th scope="col">Price(Rs)</th>
                        </tr>`;
            table_head.innerHTML = t_head;

            //Adding table body
            let table_body = document.getElementById('tableBody');
            let obj = JSON.parse(this.responseText);
            let str = "";
            for(key in obj.fruits){
                str+=`<tr>
                        <td>${obj.fruits[key].name}</td>
                        <td>${obj.fruits[key].pieces}</td>
                        <td>${obj.fruits[key].price}</td>
                      </tr>`
            }
            table_body.innerHTML = str;

        }
    }

    xhr.send();
}

function showvegetables(){

    let h = document.getElementById("heading");
    h.innerText = "Vegetables List";
    const xhr = new XMLHttpRequest();
    xhr.open('GET','db.json',true);
    xhr.onload = function(){
        if(this.status==200){
            //Adding Table head
            let table_head = document.getElementById('tabhead');
            let t_head = `<tr>
                            <th scope="col">Name</th>
                            <th scope="col">Weight(KG)/th>
                            <th scope="col">Price(Rs)</th>
                        </tr>`;
            table_head.innerHTML = t_head;

            //Adding table body
            let table_body = document.getElementById('tableBody');
            let obj = JSON.parse(this.responseText);
            let str = "";
            for(key in obj.database.vegetables){
                str+=`<tr>
                        <td>${obj.database.vegetables[key].name}</td>
                        <td>${obj.database.vegetables[key].weight}</td>
                        <td>${obj.database.vegetables[key].price}</td>
                      </tr>`
            }
            table_body.innerHTML = str;

        }
    }

    xhr.send();
}

//choosing the option
let fruitoption = document.getElementById('showfruits');
fruitoption.onclick = function(){
    document.getElementById('addveg').disabled=true;
    document.getElementById('addfruit').disabled=false;
    
    let checkers_id = document.getElementById('chosenoption');
    if(checkers_id!=null){
        checkers_id.innerHTML = "";
    }

    let content = `<div class="my-3 form-group row" id = "chosenoption">
                        <label for="piece" class="form-label">Enter Number of Pieces</label>
                        <input type="text" class="form-control" id="pieceof" placeholder="Enter Number of pieces">
                    </div>`;

    if(checkers_id!=null){
        if(checkers_id.innerHTML==""){
            let checkers = document.getElementById('checker');
            checkers_id.innerHTML = content;
       }
    }else if(checkers_id==null){
        let checkers = document.getElementById('checker');
        checkers.insertAdjacentHTML('afterend',content);
    }
}

let vegoption = document.getElementById('showveg');
vegoption.onclick =function(){
    document.getElementById('addveg').disabled=false;
    document.getElementById('addfruit').disabled=true;

    let checkers_id = document.getElementById('chosenoption');
    if(checkers_id!=null){
        checkers_id.innerHTML = "";
    }

    let content = `<div class="my-3 form-group row id = "chosenoption"">
                        <label for="weights" class="form-label">Enter Weight</label>
                        <input type="text" class="form-control" id="weightof" placeholder="Enter Weight">
                    </div>`;
    if(checkers_id!=null){
        if(checkers_id.innerHTML==""){
            let checkers = document.getElementById('checker');
            checkers_id.innerHTML = content;
        }
    }else if(checkers_id==null){
        let checkers = document.getElementById('checker');
        checkers.insertAdjacentHTML('afterend',content);
    }
    
}

//for storing the data
let myform = document.getElementById('myform');
myform.addEventListener('submit',submitmyform);

function submitmyform(e){
    //fetching the whole JSON data in an object
    let json_data;
    let xhr1 = new XMLHttpRequest();
    // xhr1.overrideMimeType("application/json");
    xhr1.open('GET','http://localhost:3000');
    xhr1.onload = function(){
        if(this.status==200){
            json_data = JSON.parse(this.responseText);
        }
    }
    xhr1.send();

    
    let name = (document.getElementById('nameof').value).toString(); 
    let price = parseInt(document.getElementById('priceof').value); 
    let fruit1 = document.getElementById('pieceof');
    let veg1 = document.getElementById('weightof');

    if(fruit1!==null){
        var fruit = parseInt(document.getElementById('pieceof').value);
    }else if(veg1!=null){
        var veg = parseInt(document.getElementById('weightof').value);
    }

    let display = new Message();
    if(fruit!=null){
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000',true);
        xhr.setRequestHeader('Content-type','application/json; charset=UTF-8');
        
        // for(key in json_data.fruits){
        //     console.log(json_data.fruits[key]);
        // }
       

        // xhr.setRequestHeader('Content-type','application/json');
        xhr.onload=function(){
            if(xhr.status==200){
                display.show('success','Fruits added');
            }else{
                display.show('danger','Some Error Occured');
            }
        }
        params = `{"name": "${name}",
                   "price": ${price},
                   "pieces": ${fruit},
                    }`;

    xhr.send(params);
    }else if(veg!=null){
        let xhr = new XMLHttpRequest();
        xhr.open('POST',"http://localhost:3000/database",true);
        xhr.setRequestHeader('Content-type','application/json; charset=UTF-8');
        // xhr.setRequestHeader('Content-type','application/json');
        xhr.onload=function(){
            if(xhr.status==200){
                display.show('success','Vegetables added');
            }else{
                display.show('danger','Some Error Occured');
            }
            params = `{"name": "${name}",
                       "price": ${price},
                       "weight": ${veg},
                       }`;
            xhr.send(params);
         }
    }
    e.preventDefault();

}