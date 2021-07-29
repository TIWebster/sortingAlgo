function init(){
    //Selects the main container for later use
    const container = document.querySelector('#container');
    //Create array
    let sortArray = []
    for (i=0; i<= 19; i++){
        sortArray.push(i);
    }
    sortArray = shuffle(sortArray);
    container.style.gridTemplateColumns = columnInit(sortArray);
    //Initialise grid and set css attributes for all bars
    let current;
    let count = 0;
    for (const i of sortArray){
        current = document.createElement('div');
        current.setAttribute("id", "bar"+i);
        current.style.width = '5%';
        current.style.height = (20 + (i*20)).toString() + 'px';
        current.style.float = 'left';
        current.style.backgroundColor = 'blue';
        current.style.border = '1px solid black';
        current.style.marginTop = 'auto';
        current.style.order = count;
        count++;
        container.appendChild(current);
    }
    return sortArray;
    
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
    while (i < array.length){
        let m = i;
        while (m > 0 && array[m-1] > array[m]){
            await sleep(75);
            swapColumns(array,m);
            temp = array[m];
            array[m] = array[m-1];
            array[m-1] = temp;
            m--;
        }
        i++;
    }
    return array;
}

function columnInit(array){
    //Initialise columns gridtemplate
    let n = array.length;
    let outString =""
    for (i=1;i<=n;i++){
        if (i!=n){
            outString += "auto "
        }else{
            outString +="auto"
        }
        
    }
    return outString
}

function swapColumns(array,m){
    //Swaps columns given m position, used to visualize swap
    let column1 = document.querySelector("#bar"+array[m]);
    let column2 = document.querySelector("#bar"+array[m-1]);
    let temp = column1.style.order;
    column1.style.order = column2.style.order;
    column2.style.order = temp;
}

function sleep(ms) {
    //Sleep for ms time.
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
const btn = document.querySelector("#btn");
sortArray = init();
btn.onclick = () => insertionSort(sortArray);;
