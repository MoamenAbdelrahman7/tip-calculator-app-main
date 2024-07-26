const bill_input=document.getElementById("bill-input");
const tipSelectionButtons=document.querySelectorAll(".items .item button");
const numOfPeople_input=document.getElementById("numOfPeople");
console.log(tipSelectionButtons);

const custom_tip_input=document.getElementById("custom-tip");

const showCalculatedTipAmount = (tip_amount_value)=>{
    const tip_amount = document.getElementById("tip-amount");
    if (tip_amount_value !== 0){
    tip_amount.innerHTML = `$${tip_amount_value}`;
    }
    else{
        tip_amount.innerHTML = `$0.00`;
    }
}

const showTotalAmount=(totalAmount)=>{
    const total_bill_amount=document.getElementById("total-bill");
    if(totalAmount  !== 0){
    total_bill_amount.innerHTML=`$${totalAmount}`;
    }
    else{
        total_bill_amount.innerHTML=`$0.00`;

    }
};

const calculateTipAmount = (bill_amount, selectedTip, numOfPeople)=>{

    if (bill_amount >0 && selectedTip >0 && numOfPeople >0){
        let tip_amount_value = Math.round((bill_amount * selectedTip / 100 ) / numOfPeople);
        showCalculatedTipAmount(tip_amount_value);
        let totalAmount=Math.round(bill_amount+tip_amount_value);
        showTotalAmount(totalAmount);
        activeResetBt();
    }
    else if(numOfPeople === 0){
        validateNumOfPeople_input();
        disableResetBt()
    }
    else{
        showTotalAmount(0);
        showCalculatedTipAmount(0);
        disableResetBt()
    }
}

// add event listener for tip buttons
tipSelectionButtons.forEach(bt => {
    bt.addEventListener("click",(event)=>{
        let selectedTip=event.target.id;
        tipSelectionButtons.forEach(unSelectedBt =>{
            unSelectedBt.classList.remove("selected");
        });
        event.target.classList.add("selected");
        custom_tip_input.value="";
        console.log(selectedTip);
        calculateTipAmount(parseFloat(bill_input.value),parseInt(event.target.id),parseInt(numOfPeople_input.value));
    });
});

// add event listener for custom tip input
custom_tip_input.addEventListener("keyup",(event)=>{
    let customTipValue=parseFloat(event.target.value);
    // if(customTipValue !==0){
        tipSelectionButtons.forEach(unSelectedBt =>{
        unSelectedBt.classList.remove("selected");
    });
    selectedTip=customTipValue;
    calculateTipAmount(parseFloat(bill_input.value),selectedTip,parseInt(numOfPeople_input.value));
// }
});


// number of people input validation
const validateNumOfPeople_input = () => {
    const error_msg= document.querySelector(".error-msg");
    error_msg.style.display="block";
    numOfPeople_input.style.border="2px solid red";
}

numOfPeople_input.addEventListener("blur",()=>{
    if(parseInt(numOfPeople_input.value) !== 0){
        const error_msg= document.querySelector(".error-msg");
        error_msg.style.display="none";
        numOfPeople_input.style.border="transparent";
    }
});


// add event listener for reset button 
const resetBt=document.getElementById("resetBt");
resetBt.addEventListener("click",()=>{
    bill_input.value="";
    numOfPeople_input.value="";
    tipSelectionButtons.forEach(unSelectedBt =>{
        unSelectedBt.classList.remove("selected");
    });
    custom_tip_input.value="";

    const tip_amount=document.getElementById("tip-amount");
    const total_bill_amount=document.getElementById("total-bill");
    tip_amount.innerHTML="$0.00";
    total_bill_amount.innerHTML="$0.00";
    disableResetBt();
});
function activeResetBt(){
    resetBt.style.backgroundColor="hsl(172, 67%, 45%)";
    resetBt.style.color="hsl(183, 100%, 15%)";
}
function disableResetBt(){
    resetBt.style.backgroundColor="hsl(184, 14%, 56%)";
    resetBt.style.color="hsl(186, 14%, 43%)";
}




















