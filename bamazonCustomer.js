
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("easy-table");



var connection = mysql.createConnection({
    host: "3.137.34.84",
    port: 3306,
    user: "admin",
    password: "password",
    database: "bamazonDB"
});
connection.connect(function (err) {
    if (err) throw err
    initializeScreen();
})

function initializeScreen() {
    // console.log("This is running")
    var query = "SELECT * from products"
    var items = []
    connection.query(query, function (err, res) {
        if (err) throw err;
        // console.log(res)
        for (var i = 0; i < res.length; i++) {
            items.push(res[i].product_name)
        };
        items.push("Exit")
        var t = new Table;

        res.forEach(function (product) {
            t.cell('Item ID', product.item_id)
            t.cell('Product Name', product.product_name)
            t.cell('Price, USD', product.price, Table.number(2))
            t.cell('Stock Quantity', product.stock_quantity)
            t.newRow()
        });

        console.log(t.toString());
        whatToBuy(items);
    })
}

var itemInQuestion = "";
var quantityInQuestion = 0;
var newQuantity = 0;
var productSale = 0;

function whatToBuy(items) {
        inquirer
        .prompt([
            {
                type: "list",
                message: "What item would you like to purchase?",
                choices: items,
                name: "itemToBuy"
            },
        ])
        .then(function (response) {
            itemInQuestion = response.itemToBuy
            if(itemInQuestion === "Exit"){
                connection.end();
            }
            else{
                howMuchToBuy(); 
            }
        })
}

function howMuchToBuy(){
    var query = "SELECT * from products"
    connection.query(query, function(err,res){
        if (err) throw err;
        inquirer
        .prompt(
            {
                type: "input",
                message: "How many of this item would you like to purchase?",
                name: "quantity",
                validate: function (value) {
                    !isNaN(value);
                    return true;
                }
            }
        )
        .then(function(response){
            quantityInQuestion = response.quantity
            for (var i = 0; i < res.length; i++) {
                // console.log(res[i]);
                if(res[i].product_name === itemInQuestion && res[i].stock_quantity > quantityInQuestion){
                    newQuantity = res[i].stock_quantity - quantityInQuestion;
                    productSale = parseFloat(quantityInQuestion) * parseFloat(res[i].price)
                    updateProduct(newQuantity, productSale, itemInQuestion);
                }
                else if(res[i].product_name === itemInQuestion && res[i].stock_quantity < quantityInQuestion){
                    console.log("Insufficient quantity!")
                }
            };
            initializeScreen();
        })
    })
}

function updateProduct(val1, val2, loc) {
    console.log("Updating all" + loc + "quantities...\n");
    query = "UPDATE products SET stock_quantity = ?,product_sales = ? WHERE product_name = ?"
    query = connection.query(query,[val1,val2,loc],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated!\n");
        }
    );

    // logs the actual query being run
    console.log(query.sql);
}