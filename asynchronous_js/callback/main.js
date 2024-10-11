//Example 1:
// function one(call_two){
//     console.log("step 1 complete. Please call step 2");
//     call_two();
// }

// function two(){
//     console.log("step 2");
// }

// one(two); //Gọi một hàm khác ở trong hàm này --> Gọi là callback

// Example 2
// let order = (call_production) => {
//     console.log("order placed, please call production");
//     call_production();
// };

// let production = () => {
//     console.log("order received, starting production");
// };

// order(production);

// Example 3: Make icream
let stocks = {
    Fruits:["strawberry", "grapes", "banana", "apple"],
    liquid:["water", "ice"],
    holder:["cone", "cup", "stick"],
    toppings:["chocolate", "peanuts"]
};

let order = (Fruit_name, call_production) => {
    setTimeout(() =>{
        console.log(`${stocks.Fruits[Fruit_name]} was selected`);
        call_production();
    }, 2000)
}

let production = () => {
    setTimeout(() => {
        console.log("production has started");

        setTimeout(() => {
            console.log("the fruit has been chopped");

            setTimeout(() => {
                console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} was added`);
                setTimeout(() => {
                    console.log("the machine was started");
                    setTimeout(() => {
                        console.log(`ice cream was placed on ${stocks.holder[0]} `);
                        setTimeout(() => {
                            console.log(`${stocks.toppings[0]} was added as topping`);
                            setTimeout(() => {
                                console.log("serve ice cream");
                            }, 2000);
                        }, 3000);
                    }, 2000);
                }, 1000);
            }, 1000);
        }, 2000);
    }, 0);
};

order(0, production);

// Hình dáng đoạn code trên người ta gọi là Callback Hell --> Rất là khó đọc và khó hiểu --> Promise ra đời
// Callback nó triển khai theo quan hệ cha -> con -> cháu -> ...
// Còn promise triển khai theo quan hệ cái này -> đến cái này -> đến cái này -> ...