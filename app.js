// delgetstei ajillah
var uiController = (function(){
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValues: '.add__value',
        addBtn: '.add__btn',
        incomeList: '.income__list',
        expenseList: '.expenses__list',
        tusuvLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        containerDiv: '.container',
        deleteBtn: '.item__delete--btn'
    };
    //   

    return{
        getInput: function(){
            return{
                type : document.querySelector(DOMstrings.inputType).value,
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : parseInt(document.querySelector(DOMstrings.inputValues).value)
            }
        },
        getDOMstrings: function(){
            return DOMstrings;
        },
        clearFields: function (params) {
            // elem songoh
            var fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValues);

            // list to array
            var fieldsArr = Array.prototype.slice.call(fields);


            // clear hiih
            fieldsArr.forEach(function(el, index, array){
                el.value = '';
            });
            // for( var i = 1; i < fieldsArr.length; i++ ){
            //     fieldsArr[i].value = '';
            // }

            // change focus
            fieldsArr[0].focus();
            // console.log(fields);
        },
        tusviigUzuuleh:function(tusuv){
            document.querySelector(DOMstrings.tusuvLabel).textContent = tusuv.tusuv;
            document.querySelector(DOMstrings.incomeLabel).textContent = tusuv.totalInc;
            document.querySelector(DOMstrings.expenseLabel).textContent = tusuv.totalExp;
            document.querySelector(DOMstrings.percentageLabel).textContent = tusuv.huvi + '%';
        },
        addListItem: function(item, type){
            // element beltgeh
            var html, list;
            if( type === 'inc' ){
                list = DOMstrings.incomeList;
                html = '<div class="item clearfix" id="inc-'+item.id+'"><div class="item__description">'+item.description+'</div><div class="right clearfix"><div class="item__value">'+item.value+'</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                list = DOMstrings.expenseList;
                html = '<div class="item clearfix" id="exp-'+item.id+'"><div class="item__description">'+item.description+'</div><div class="right clearfix"><div class="item__value">- '+item.value+'</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // dom butsaah
            document.querySelector(list).insertAdjacentHTML("beforeend",html);

            // input tseverleh
            
        },
        deleteListItem( id ){
            var el = document.getElementById(id);
            el.parentNode.removeChild(el);
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
        this.percentage = -1;
    }

    Expense.prototype.calcPercentage = function( totalIncome ){
        if( totalIncome > 0 ){
            this.percentage = Math.round(this.value / totalIncome * 100);
        } else {
            this.percentage = 0;
        }
    }

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    }

    var data = {
        items: {
            inc :[],
            exp :[],
        },
        totals: {
            inc: 0,
            exp: 0
        },
        tusuv: 0,
        huvi: 0
    };

    var calculateTotal = function(type){
        var sum = 0;
        data.items[type].forEach(function(el){
            sum += el.value;
        });

        data.totals[type] = sum;
    }

    return {
        addItem: function(type, desc, val){
            var id = data.items[type].length === 0 ? 1 : data.items[type][data.items[type].length - 1].id + 1;
            var item = type === 'inc' ? new Income(id,desc,val) : new Expense(id,desc,val);
            data.items[type].push(item); 
            return item;
        },
        data:function(){
            return data;
        },
        tusuvTootsooloh: function(){
            // niit orlogo
            calculateTotal('inc');

            // niit zarlalga
            calculateTotal('exp');

            // tusuv shineer tootsoh
            data.tusuv = data.totals.inc - data.totals.exp;

            // orlogo zarlaga huwi
            if( data.totals.exp && data.totals.inc ){
                data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.huvi = 0;
            }
            
        },
        tusuvAwah: function(){
            return {
                tusuv: data.tusuv,
                huvi: data.huvi,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
            }
        },
        deleteItem: function(type,id){
            var ids = data.items[type].map(function(el){
                return el.id;
            });

            var index = ids.indexOf(id);

            if( index !== -1 ){
                data.items[type].splice(index,1);

            }
        },
        calculatePercentages: function(){
            data.items.exp.forEach(function(el){
                el.calcPercentage(data.totals.inc);
            });
        },
        getPercentages:function(){
            var allPercentages= data.items.exp.map(function(el){
                return el.getPercentage();
            });

            return allPercentages;
        }
    }
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


        document.querySelector(DOM.containerDiv).addEventListener('click', function(event){
            var id = event.target.parentNode.parentNode.parentNode.parentNode.id;

            if( id ){
                var arr = id.split('-');
                var type = arr[0];
                var itemId = parseInt(arr[1]);


                // sanhuu data-s hasna
                financeController.deleteItem(type, itemId);

                // delgetsees hasna.
                uiController.deleteListItem(id);

                // uldegdel shinechlene.
                updateTusuv();
            }
            
            // event.target();
            // var id = split(el);
        });
    };


    var ctrlAddItem = function (){
        // 1. data olj awah
        var input = uiController.getInput();

        if( input.description !== '' && input.value !== ''){
            // 2. olj awsan datagaa sanhuu - ruu damjuulna
            var item = financeController.addItem(input.type, input.description, input.value);
            // console.log(financeController.data());

            // 3. datagaa tohiroh hesegt ni gargana.
            uiController.addListItem(item, input.type);
            uiController.clearFields();

            // tusuv shinechlej
            updateTusuv();
        }
    }

    var updateTusuv = function(){
        //toswiig olno.
        financeController.tusuvTootsooloh();

        //  tusuv awah
        var tusuv = financeController.tusuvAwah();

        // tootsoog delgetsend gargana.
        uiController.tusviigUzuuleh(tusuv);

        // zarlagiin ezleh huwi tootsoh
        financeController.calculatePercentages();

        // huwuudiig awah
        var expPercentages = financeController.getPercentages();

        // delgetsend gargah
        // uiController.updatePercentages(expPercentages);
    }


    return{
        init: function(){
            uiController.tusviigUzuuleh({
                tusuv: 0,
                huvi:0,
                totalInc:0,
                totalExp:0
            });
            setupEventListener();
        }
    }

    console.log('appController');
})(uiController, financeController);


appController.init();