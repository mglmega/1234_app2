// delgetstei ajillah
var uiController = (function(){
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValues: '.add__value',
        addBtn: '.add__btn',
    };
    
    return{
        getInput: function(){
            return{
                type : document.querySelector(DOMstrings.inputType).value,
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : document.querySelector(DOMstrings.inputValues).value
            }
        },
        getDOMstrings: function(){
            return DOMstrings;
        }
    }
})();





// sanhuu
var financeController = (function(){
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        allItems: {
            inc :[],
            exp :[],
        },
        totals: {
            inc: 0,
            exp: 0
        }
    };

    


})();






// holbogch controller
var appController = (function(uiController, financeController){
   

    var setupEventListener = function(){
        var DOM = uiController.getDOMstrings();

        // enter darah
        document.addEventListener('keypress', function(event){
            // if( event.code === 'Enter' ){
            if( event.keyCode === 13 || event.which === 13 ){
                ctrlAddItem();
            }

        });

        // add towch darah
        document.querySelector(DOM.addBtn).addEventListener('click', function(){
            ctrlAddItem();
        });
    };
    


    var ctrlAddItem = function (){
        // 1. data olj awah
        console.log(uiController.getInput());
        // 2. olj awsan datagaa sanhuu - ruu damjuulna
        // 3. datagaa tohiroh hesegt ni gargana.
        // 4. toswiig olno.
        // 5. tootsoog delgetsend gargana.
    }


    return{
        init: function(){
            setupEventListener();
        }
    }

    console.log('appController');
})(uiController, financeController);


appController.init();