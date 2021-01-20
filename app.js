selection = document.querySelector('.select-box');
addButton = document.querySelector('.add-box');
valueInput = document.querySelector('.amount-box');
descriptionInput = document.querySelector('.input-box');
listOfIncomes = document.querySelectorAll('.income-Container')[0];
listOfExpenses = document.querySelectorAll('.income-Container')[1];
incomeMiddle = document.querySelector('.allIncome');
expenseMiddle = document.querySelector('.allExpense');
moneyLeftMiddle = document.querySelector('.moneyLeft');
mainWrapper = document.querySelector('.wrapper-Main');
saveButton = document.querySelectorAll('.save')[0];
resetButton = document.querySelectorAll('.save')[1];

onPageLoad();
eventListeners();

function eventListeners(){
    addButton.addEventListener('click',addToUI);
    mainWrapper.addEventListener('click',deleteFromUI);
    saveButton.addEventListener('click',saveEverything);
    resetButton.addEventListener('click',resetEverything);
    
}

function addToUI(){
    if(determineOption(selection)==='+' && limitValue()){
        addIncomeToUI(valueInput,descriptionInput,listOfIncomes);
        ResetUI(true);

    }
    else if(determineOption(selection)==='-' && limitValue()){
        addExpenseToUI(valueInput,descriptionInput,listOfExpenses);
        ResetUI(false);

    }
    else{
        alert('Yanlış ve ya boş değer girdiniz.');
    }
}
function addIncomeToUI(value,description,listOfIncomes){
    newIncome = document.createElement('div')
    newIncome.className = 'Income-Box';
    newDescription = document.createElement('p');
    newDescription.textContent = description.value;
    newDescription.className = 'description';
    newAmount = document.createElement('p');
    newAmount.className = 'amount';
    newAmount.innerHTML = value.value +' '+'<i class="fa fa-trash"></i>';
    newIncome.appendChild(newDescription);
    newIncome.appendChild(newAmount);
    listOfIncomes.appendChild(newIncome);
}
function calculateTotalExpense(){
    newExpense = parseInt(valueInput.value);
    totalExpense+=newExpense;
    return totalExpense;
}
function calculateTotalIncome(){
    newIncome = parseInt(valueInput.value);
    totalIncome+=newIncome;
    return totalIncome;
}
function addExpenseToUI(value,description,listOfExpenses){
    newExpense = document.createElement('div')
    newExpense.className = 'Expense-Box';
    newDescription = document.createElement('p');
    newDescription.textContent = description.value;
    newDescription.className = 'description';
    newAmount = document.createElement('p');
    newAmount.className = 'amount';
    newAmount.innerHTML = value.value +' '+'<i class="fa fa-trash"></i>';
    newExpense.appendChild(newDescription);
    newExpense.appendChild(newAmount);
    listOfExpenses.appendChild(newExpense);
}
function determineOption(selection){
    return selection.value;
}
function deleteFromUI(e){
    if(e.target.className === 'fa fa-trash'){
        e.target.parentElement.parentElement.remove();
        if(e.target.parentElement.parentElement.className === 'Income-Box')
        {
            deletedIncome = parseInt(e.target.parentElement.textContent);
            totalIncome = totalIncome-deletedIncome;
            ResetUIMain();
        }
        if(e.target.parentElement.parentElement.className === 'Expense-Box')
        {
            deletedExpense = parseInt(e.target.parentElement.textContent);
            totalExpense = totalExpense-deletedExpense;
            ResetUIMain();
        }
    }
}
function ResetUIMain(){
    incomeMiddle.textContent = totalIncome + ' ₺';
    expenseMiddle.textContent = totalExpense + ' ₺';
    moneyLeftMiddle.textContent = totalIncome-totalExpense + ' ₺';
}
function ResetUI(check){
    if(check)
        incomeMiddle.textContent = calculateTotalIncome() + ' ₺';
    else
        expenseMiddle.textContent = calculateTotalExpense()+ ' ₺';
    
    moneyLeftMiddle.textContent = totalIncome-totalExpense + ' ₺';
    valueInput.value = '';
    descriptionInput.value ='';
}

function limitValue(){
    if (valueInput.value === ''){
        return false;
    }
    else{
        return true;
    }
}
function loadEverythingToUI(){

    incomeList = JSON.parse(localStorage.getItem('incomeList'));
    expenseList = JSON.parse(localStorage.getItem('expenseList'));

    if(incomeList != null)
        for(i = 0;i<incomeList.length;i++){
            listOfIncomes.innerHTML += incomeList[i];
        }
    if(expenseList != null)    
        for(i = 0;i<expenseList.length;i++){
            listOfExpenses.innerHTML += expenseList[i];
        }

    totalExpense = parseInt(localStorage.getItem('expenseTotal'));
    totalIncome = parseInt(localStorage.getItem('incomeTotal'));

    ResetUIMain();

}
function saveEverything(){

    incomeList =[];
    expenseList = [];

    for(i=0;i<document.querySelectorAll('.Income-Box').length;i++){
        incomeList.push(document.querySelectorAll('.Income-Box')[i].outerHTML);
    }
    for(i=0;i<document.querySelectorAll('.Expense-Box').length;i++){
        expenseList.push(document.querySelectorAll('.Expense-Box')[i].outerHTML);
    }



    localStorage.setItem('expenseTotal',totalExpense);
    localStorage.setItem('incomeTotal',totalIncome);
    localStorage.setItem('incomeList',JSON.stringify(incomeList));
    localStorage.setItem('expenseList',JSON.stringify(expenseList));

}
function resetEverything(){
    localStorage.removeItem('expenseList');
    localStorage.removeItem('incomeList');
    localStorage.removeItem('expenseTotal');
    localStorage.removeItem('incomeTotal');
    totalIncome = 0;
    totalExpense = 0;
    ResetUIMain();
    location.reload();
}

function onPageLoad(){
   
   if(localStorage.getItem('incomeTotal') === null){
    totalIncome = 0;
    totalExpense = 0;
    ResetUIMain();
    }
   else{
    loadEverythingToUI();
   }
    

}