function init(n){
    //Selects the main container for later use
    const container = document.querySelector('#container');

    //Removes all children nodes of container for full reset
    let child = container.lastElementChild;
    while (child){
        container.removeChild(child)
        child = container.lastElementChild;
    }
    sortArray = [];
    //Create array
    for (i=1; i<= n; i++){
        sortArray.push(i);
    }
    sortArray = shuffle(sortArray);
    container.style.gridTemplateColumns = columnInit(sortArray);
    //Initialise grid and set css attributes for all bars
    let current;
    let count = 0;
    let width = 1/n * 100 + "%";
    console.log(sortArray);
    for (const i of sortArray){
        current = document.createElement('div');
        current.setAttribute("id", "bar"+i);
        current.style.width = width;
        current.style.height = i*99/n +"%";
        current.style.float = 'left';
        current.style.backgroundColor = 'blue';
        current.style.border = '1px solid black';
        current.style.marginTop = 'auto';
        current.style.order = count;
        count++;
        container.appendChild(current);
    }  
}

function shuffle(array){
    //Shuffles an array using the Fischer-Yates shuffle
    for (i = array.length-1; i>0; i--){
        j = Math.floor(Math.random() * i);
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

async function insertionSort(array){
    //Performs insertion sort on the given array
    let i = 1;
    let time = 100/array.length;
    
    while (i < array.length){
        let m = i;
        
        while (m > 0 && array[m-1] > array[m]){
            await sleep(time);
            swapColumns(array,m, m-1);
            temp = array[m];
            array[m] = array[m-1];
            array[m-1] = temp;
            m--;
        }
        let column = document.querySelector("#bar"+array[m]);
        column.style.backgroundColor = 'green';
        i++;
    }
    return array;
}

async function selectionSort(array){
    //Performs selection sort on given array
    let time = 100/array.length;
    for (i=0; i<array.length;i++){
        let jMin = i;
        for (j=i+1; j < array.length; j++){
            if (array[j] < array[jMin]){
                jMin = j;
            }
        }
        if(jMin != i){
            await sleep(time);
            swapColumns(array,i, jMin);
            temp = array[i];
            array[i] = array[jMin];
            array[jMin] = temp;
        }
        let column = document.querySelector("#bar"+array[jMin]);
        column.style.backgroundColor = 'green';
    }
    console.log(array);
}

async function bubbleSort(array){
    //Implements bubble sort to given array
    let time = 100/array.length;
    n = array.length;
    let swapped;
    do {
        swapped = false;
        for (i=1; i<=n-1; i++){
            if (array[i-1] > array[i]){
                //Swaps elements when i-1th element is > ith
                await sleep(time);
                swapColumns(array,i, i-1);
                temp = array[i];
                array[i] = array[i-1];
                array[i-1] = temp;
                swapped = true;
            }
        }
        //When a value is sorted colour is green
        let column = document.querySelector("#bar"+array[i-1]);
        column.style.backgroundColor = 'green';
        n-=1;
    }while(swapped != false);
    //For the values that do not need to be sorted, they are changed to green
    for (j = 0; j<= i; j++){
        let column = document.querySelector("#bar"+array[j]);
        column.style.backgroundColor = 'green';
    }
    console.log(array);
}

function columnInit(array){
    //Initialise columns gridtemplate
    let n = array.length;
    let outString ="";
    for (i=1;i<=n;i++){
        if (i!=n){
            outString += "auto ";
        }else{
            outString +="auto";
        }
        
    }
    return outString;
}

function swapColumns(array, a, b){
    //Swaps columns given m position, used to visualize swap
    let column1 = document.querySelector("#bar"+array[a]);
    let column2 = document.querySelector("#bar"+array[b]);
    let temp = column1.style.order;
    column1.style.order = column2.style.order;
    column2.style.order = temp;
}

function sleep(ms) {
    //Sleep for ms time
    return new Promise(resolve => setTimeout(resolve, ms));
}
  


let slider = document.getElementById("myRange");
let output = document.getElementById("demo");
output.textContent = "Value: " + slider.value;
slider.oninput = function(){
    output.textContent = "Value: " + this.value; 
}


let sortArray = [];
//Reset button reinitialises with n sized array
const resetButton = document.querySelector('#resetButton');
resetButton.onclick = () => init(slider.value);

//Sorting algorithm buttons
const insertionButton = document.querySelector("#insertionSortButton");
const selectionButton = document.querySelector("#selectionSortButton");
const bubbleButton = document.querySelector("#bubbleSortButton");
insertionButton.onclick = () => insertionSort(sortArray);
selectionButton.onclick = () => selectionSort(sortArray);
bubbleButton.onclick = () => bubbleSort(sortArray);