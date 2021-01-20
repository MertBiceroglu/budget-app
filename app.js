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




totalIncome = 0;
totalExpense = 0;

eventListeners();

function eventListeners(){
    addButton.addEventListener('click',addToUI);
    mainWrapper.addEventListener('click',deleteFromUI);
}

function addToUI(){
    if(determineOption(selection)==='+'){
        addIncomeToUI(valueInput,descriptionInput,listOfIncomes);
        ResetUI(true);
    }
    else{
        addExpenseToUI(valueInput,descriptionInput,listOfExpenses);
        ResetUI(false);
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