// const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// const salesData = [100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const salesData = [10, 20, 40, 25, 17, 20, 15, 11,14 , 16, 35, 45];
const orderData = [10, 25, 45, 25, 35, 29, 30, 28,35 , 45, 48, 50];

// Define Data
const data = [{
    x: months,
    y: salesData,
    mode:"lines",
    line: {             // Specify line properties
        color: 'rgb(208, 177, 177)',   // Change line color to green
        width: 2          // Optional: Change line width
      }

  }];
  const orderChartData = [{
    x: months,
    y: orderData,
    mode: "lines",
    line: {
        color: 'rgb(208, 177, 177)',
        width: 2
    },
    name: 'Number of Orders'
}];
  
  // Define Layout
  const layout = {
    xaxis: {range: ['Jan', 'Dec'], title: "Month"},
    yaxis: {range: [10, 50], title: "Number of Sales"},  
    title: "Product Sales per Month"
  };
  const orderChartLayout = {
    xaxis: {range: ['Jan', 'Dec'], title: "Month"},
    yaxis: {range: [10, 50], title: "Number of Orders"},  
    title: "Number of Orders per Month"
};
  
 
  Plotly.newPlot("myPlot", data, layout);
  Plotly.newPlot("myPlot1", orderChartData, orderChartLayout);
 
  function showModal(containerIds) {
    containerIds.forEach(function(id) {
        document.getElementById(id).style.display = "block";
        document.getElementById('overlay').style.display = 'block';
    });
}

function closeModal(containerIds) {
    containerIds.forEach(function(id) {
        document.getElementById(id).style.display = "none";
        document.getElementById('overlay').style.display = 'none';
    });

    containerIds.forEach(function(id) {
        var modal = document.getElementById(id);
        var errorElements = modal.getElementsByClassName("error");

        for (var i = 0; i < errorElements.length; i++) {
            errorElements[i].innerHTML = "";
        }
    });

}
function showShade(containerIds, containerClass) {
    var hideElements = document.getElementsByClassName(containerClass);
    for (var i = 0; i < hideElements.length; i++) {
        hideElements[i].style.display = "none";
    }

    containerIds.forEach(function(id) {
        document.getElementById(id).style.display = "block";
    });
    
    
}


const adminCheckbox = document.getElementById('admin1');
const userCheckbox = document.getElementById('user1');

adminCheckbox.addEventListener('change', function() {
if (this.checked) {
    userCheckbox.checked = false;
}
});

userCheckbox.addEventListener('change', function() {
if (this.checked) {
    adminCheckbox.checked = false;
}
});

function showImage(selectedOption){
    var imageDiv = document.getElementById('image');
    var textDiv = document.getElementById('imag');

    if (selectedOption === 'productImage') {
        imageDiv.style.display = 'block';
        textDiv.style.display = 'none';
    } else {
        imageDiv.style.display = 'none';
        textDiv.style.display = 'block';
    }
};

function validationForm() {
    var name = document.getElementById('productName').value;
    var price = document.getElementById('productPrice').value;
    var category = document.getElementById('productCategory').value;
    var quantity = document.getElementById('productQuantity').value;
    var desc = document.getElementById('productDescription').value;
    var howtouse = document.getElementById('howToUse').value;
    var shade = document.getElementById('productShade').value;
    var image = document.getElementById('productImage').value;

    
    var Validation = true;

    //name Validation
    if(name == "" || !/^[a-zA-Z\s]+$/.test(name)){
        document.getElementById('nameError').innerHTML = "Please enter a valid product name";
        Validation= false;
    } else {
        document.getElementById('nameError').innerHTML = "";
    }

    //Price Validation
    if(price == "" || price < 0|| isNaN(price)){
        document.getElementById('priceError').innerHTML = "Please enter a valid product price";
        Validation = false;
    } else {
        document.getElementById('priceError').innerHTML = "";
    }

    //Category Validation
    if(category == ""){
        document.getElementById('categoryError').innerHTML = "Please choose product category";
        Validation = false;
    } else {
        document.getElementById('categoryError').innerHTML = "";
    }

    //Quantity Validation
    if(quantity == "" || quantity < 0|| isNaN(quantity)){
        document.getElementById('quantityError').innerHTML = "Please enter a valid product quantity";
        Validation = false;
    } else {
        document.getElementById('quantityError').innerHTML = "";
    }

    //Description Validation
    if(desc == ""){
        document.getElementById('descriptionError').innerHTML = "Please enter a valid product description";
        Validation = false;
    } else {
        document.getElementById('descriptionError').innerHTML = "";
    }

    //How to use Validation
    if(howtouse == ""){
        document.getElementById('howToUseError').innerHTML = "Please enter how to use product";
        Validation = false;
    } else {
        document.getElementById('howToUseError').innerHTML = "";
    }

    //Shade Validation
    if(shade == ""){
        document.getElementById('shadesError').innerHTML = "Please choose product shade";
        Validation = false;
    } else {
        document.getElementById('shadesError').innerHTML = "";
    }

    //Image Validation
    if(image == ""){
        document.getElementById('imageError').innerHTML = "Please upload product image";
        Validation = false;
    } else {
        document.getElementById('imageError').innerHTML = "";
    }

    return Validation;
}

function validationFormRemove() {
    var Yes = document.getElementById('Yes3');
    var No = document.getElementById('No3');
    var Validation = true;

    //Id Validation
    if(!Yes.checked && !No.checked) {
        document.getElementById('RadioProductsError').innerHTML = "Please select Yes or No";
        Validation = false;
    } else {
        document.getElementById('RadioProductsError').innerHTML = "";
    }
    return Validation;
}
function validationFormEdit() {
    var choice = document.getElementById('editField').value;
    var productField = document.getElementById('productChoice').value;
    var img = document.getElementById('productImage1').value;
    var Validation = true;
    //Choice Validation
    if(choice == "select") {
        document.getElementById('choiceError').innerHTML = "Please choose a field to edit";
        Validation = false;
    } else {
        document.getElementById('choiceError').innerHTML = "";
        //Field Validation
        if(choice == "productName") {
            if(productField == "" || !/^[a-zA-Z\s]+$/.test(productField)) {
                document.getElementById('valueError').innerHTML = "Please enter a valid product name";
                Validation = false;
            } else {
                document.getElementById('valueError').innerHTML = "";
            }
        } else if(choice == "productPrice") {
            if(productField == "" || productField < 0 || isNaN(productField)) {
                document.getElementById('valueError').innerHTML = "Please enter a valid product price";
                Validation = false;
            } else {
                document.getElementById('valueError').innerHTML = "";
            }
        } else if(choice == "productQuantity") {
            if(productField == "" || productField < 0 || isNaN(productField)) {
                document.getElementById('valueError').innerHTML = "Please enter a valid product quantity";
                Validation = false;
            } else {
                document.getElementById('valueError').innerHTML = "";
            }
        } else if(choice == "productDescription") {
            if(productField == "") {
                document.getElementById('valueError').innerHTML = "Please enter a valid product description";
                Validation = false;
            } else {
                document.getElementById('valueError').innerHTML = "";
            }
        } else if(choice == "howToUse") {
            if(productField == "") {
                document.getElementById('valueError').innerHTML = "Please enter how to use product";
                Validation = false;
            } else {
                document.getElementById('valueError').innerHTML = "";
            }
        } else if(choice == "productShades") {
            if(productField == "") {
                document.getElementById('valueError').innerHTML = "Please choose product shade";
                Validation = false;
            } else {
                document.getElementById('valueError').innerHTML = "";
            }
        } else if(choice == "productImage") {
            if(img == "") {
                document.getElementById('imageError1').innerHTML = "Please upload product image";
                Validation = false;
            } else {
                document.getElementById('imageError1').innerHTML = "";
            }
        }
    }

    return Validation;
}

function UserValidation(){
    var fname = document.getElementById('Fname').value;
    var lname = document.getElementById('Lname').value;
    var email = document.getElementById('email').value;
    var pass = document.getElementById('password').value;
    var user= document.getElementById('username').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;
    var admin = document.getElementById('admin1');
    var user = document.getElementById('user1');

    var Validation = true;

    //First Name Validation
    if(fname == "" || !/^[a-zA-Z\s]+$/.test(fname)){
        document.getElementById('fnameError').innerHTML = "Please enter a valid first name";
        Validation = false;
    } else {
        document.getElementById('fnameError').innerHTML = "";
    }

    //Last Name Validation
    if(lname == "" || !/^[a-zA-Z\s]+$/.test(lname)){
        document.getElementById('lnameError').innerHTML = "Please enter a valid last name";
        Validation = false;
    } else {
        document.getElementById('lnameError').innerHTML = "";
    }

    //Email Validation
    if(email == "" || !/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)){
        document.getElementById('emailError').innerHTML = "Please enter a valid email";
        Validation = false;
    } else {
        document.getElementById('emailError').innerHTML = "";
    }

    //Password Validation
    if(pass == "" || pass.length < 8 ||isNaN(pass)){
        document.getElementById('passwordError').innerHTML = "Please enter a valid password (min 8 characters)";
        Validation = false;
    } else {
        document.getElementById('passwordError').innerHTML = "";
    }

    //Username Validation
    if(user == "" || !/^[a-zA-Z0-9]+$/.test(user)){
        document.getElementById('usernameError').innerHTML = "Please enter a valid username";
        Validation = false;
    } else {
        document.getElementById('usernameError').innerHTML = "";
    }

    //Phone Validation
    if(phone == "" || phone.length < 11 ||phone.length > 11 || isNaN(phone)){
        document.getElementById('phoneError').innerHTML = "Please enter a valid phone number";
        Validation = false;
    } else {
        document.getElementById('phoneError').innerHTML = "";
    }

    //Address Validation
    if(address == ""){
        document.getElementById('addressError').innerHTML = "Please enter a valid address";
        Validation = false;
    } else {
        document.getElementById('addressError').innerHTML = "";
    }
    if(!admin.checked && !user.checked) {
        document.getElementById('UserAdminError').innerHTML = "Please select a role (Admin or User)";
        Validation = false;
    } else {
        document.getElementById('UserAdminError').innerHTML = "";
    }
    

    return Validation;
}
function UserValidationEdit(){
    var choicee = document.getElementById('editFieldd').value;
    var userField = document.getElementById('val').value;
    
    var Validation = true;

    //Choice Validation

    if(choicee == "select") {
        document.getElementById('optionError').innerHTML = "Please choose a field to edit";
        Validation = false;
    } else {
        document.getElementById('optionError').innerHTML = "";
        //Field Validation
        if(choicee == "email") {
            if(userField == "" || !/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(userField)) {
                document.getElementById('valError').innerHTML = "Please enter a valid email";
                Validation = false;
            } else {
                document.getElementById('valError').innerHTML = "";
            }
        } else if(choicee == "password") {
            if(userField == "" || userField.length < 8 ||isNaN(userField)) {
                document.getElementById('valError').innerHTML = "Please enter a valid password (min 8 characters)";
                Validation = false;
            } else {
                document.getElementById('valError').innerHTML = "";
            }
        } else if(choicee == "username") {
            if(userField == "" || !/^[a-zA-Z0-9]+$/.test(userField)) {
                document.getElementById('valError').innerHTML = "Please enter a valid username";
                Validation = false;
            } else {
                document.getElementById('valError').innerHTML = "";
            }
        } else if(choicee == "phone") {
            if(userField == "" || userField.length < 11 ||userField.length > 11 || isNaN(userField)) {
                document.getElementById('valError').innerHTML = "Please enter a valid phone number";
                Validation = false;
            } else {
                document.getElementById('valError').innerHTML = "";
            }
        } else if(choicee == "address") {
            if(userField == "") {
                document.getElementById('valError').innerHTML = "Please enter a valid address";
                Validation = false;
            } else {
                document.getElementById('valError').innerHTML = "";
            }
        }

 
}
 return Validation;
}
function UservalidationRemove() {
    var Yes = document.getElementById('Yes1');
    var No = document.getElementById('No1');
    var Validation = true;

    //Id Validation
    if(!Yes.checked && !No.checked) {
        document.getElementById('RadioError').innerHTML = "Please select Yes or No";
        Validation = false;
    } else {
        document.getElementById('RadioError').innerHTML = "";
    }
    return Validation;
}
function OrdersvalidationForm() {
    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    var Username = document.getElementById('orderusername').value;
    var Email = document.getElementById('orderemail').value;
    var Address = document.getElementById('orderaddress').value;
    var Phone = document.getElementById('orderphone').value;
    var Status = document.getElementById('orderstat').value;

    var Validation = true;

    //name Validation
    if(firstname == "" || !/^[a-zA-Z\s]+$/.test(firstname)){
        document.getElementById('firstnameError').innerHTML = "Please enter a valid First name";
        Validation= false;
    } else {
        document.getElementById('firstnameError').innerHTML = "";
    }

    if(lastname == "" || !/^[a-zA-Z\s]+$/.test(lastname)){
        document.getElementById('lastnameError').innerHTML = "Please enter a valid Last name";
        Validation= false;
    } else {
        document.getElementById('lastnameError').innerHTML = "";
    }


    //Email Validation
    if(Email == "" || !/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(Email)){
        document.getElementById('orderemailError').innerHTML = "Please enter a valid email";
        Validation = false;
    } else {
        document.getElementById('orderemailError').innerHTML = "";
    }
    //Username Validation
    if(Username == "" || !/^[a-zA-Z0-9]+$/.test(Username)){
        document.getElementById('orderusernameError').innerHTML = "Please enter a valid username";
        Validation = false;
    } else {
        document.getElementById('orderusernameError').innerHTML = "";
    }

    //Phone Validation
    if(Phone == "" || Phone.length < 11 ||Phone.length > 11 || isNaN(Phone)){
        document.getElementById('orderphoneError').innerHTML = "Please enter a valid phone number";
        Validation = false;
    } else {
        document.getElementById('orderphoneError').innerHTML = "";
    }

    //Address Validation
    if(Address == ""){
        document.getElementById('orderaddressError').innerHTML = "Please enter a valid address";
        Validation = false;
    } else {
        document.getElementById('orderaddressError').innerHTML = "";
    }
    if(Status == ""){
        document.getElementById('statusError').innerHTML = "Please choose Order Status";
        Validation = false;
    } else {
        document.getElementById('statusError').innerHTML = "";
    }

    

    return Validation;
}
function OrderValidationEdit(){
    var Choice = document.getElementById('changestatus').value;
    var Validation = true;

    //status Validation

    if(Choice == ""){
        document.getElementById('changestatusERROR').innerHTML = "Please choose Order Status";
        Validation = false;
    } else {
        document.getElementById('changestatusERROR').innerHTML = "";
    }

 return Validation;
}
function OrdervalidationRemove() {
    var Yes1 = document.getElementById('Yes2');
    var No1 = document.getElementById('No2');
    var Validation = true;

    //Id Validation
    if(!Yes1.checked && !No1.checked) {
        document.getElementById('RadioOrderError').innerHTML = "Please select Yes or No";
        Validation = false;
    } else {
        document.getElementById('RadioOrderError').innerHTML = "";
    }
    return Validation;
}
function toggleDarkMode() {
    var darkModeToggle = document.getElementById('dark-mode-toggle');
    document.body.classList.toggle('dark-mode', darkModeToggle.checked);
    localStorage.setItem('darkMode', darkModeToggle.checked);

    var darkModeToggle = document.getElementById('dark-mode-toggle');
    var myElements = document.getElementsByClassName('myElement');
    var elements = document.getElementsByClassName('bodyy');
    var logoo = document.getElementsByClassName('logo');
    var nav = document.getElementsByClassName('nav1');
    var table=document.getElementsByClassName('tab');
    var table1=document.getElementsByClassName('prod');
    var Text = document.getElementsByClassName('text');
    var button= document.getElementsByClassName('edit-button');
    var buttonprod= document.getElementsByClassName('But');
    var button1= document.getElementsByClassName('Remove-button');
    var button2= document.getElementsByClassName('add-button');
    var button3= document.getElementsByClassName('submit-btn');
    var button4= document.getElementsByClassName('view-button');
    var button5= document.getElementsByClassName('show-button');
    var User=document.getElementsByClassName('user');
    var text =document.getElementsByClassName('adduser');
    var window= document.getElementsByClassName('modal');
    var window1= document.getElementsByClassName('modal1');
    var window2= document.getElementsByClassName('modal2');
    var window3= document.getElementsByClassName('CART');
    var radio= document.getElementsByClassName('input-radio');
    var side1= document.getElementsByClassName('side');
    var prod=document.getElementsByClassName('Products');
    var windowprod1=document.getElementsByClassName('Add-container');
    var windowprod2=document.getElementsByClassName('Edit-container');
    var windowprod3=document.getElementsByClassName('Remove-container');
    if (darkModeToggle.checked) {
        for(var i = 0; i < myElements.length; i++) {
            myElements[i].style.backgroundColor = '#333333'; 
            myElements[i].style.borderColor = 'white';
        }
        for(var i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = '#333333'; // lighter black
        }
        for(var i = 0; i < logoo.length; i++) {
            logoo[i].style.filter = 'invert(80%)';
            // logoo[i].style.backgroundColor = 'transparent';
        }
        for(var i = 0; i < nav.length; i++) {
            nav[i].style.color = 'white';
        }
        for(var i = 0; i < table.length; i++) {
            table[i].style.borderColor = 'lightgrey';
            table[i].style.borderwidth = '2px';
        }
        for(var i = 0; i < table1.length; i++) {
            table1[i].style.borderColor = 'lightgrey';
            table1[i].style.borderwidth = '2px';
        }
        for(var i = 0; i < Text.length; i++) {
            Text[i].style.color = 'white';
            Text[i].style.borderColor = 'lightgrey';
        }
        for(var i=0;i<button.length;i++){
            button[i].style.backgroundColor='lightgrey';
            button[i].style.color='black';
        }
        for(var i=0;i<buttonprod.length;i++){
            buttonprod[i].style.backgroundColor='lightgrey';
            buttonprod[i].style.color='black';
        }
        for(var i=0;i<button1.length;i++){
            button1[i].style.backgroundColor='lightgrey';
            button1[i].style.color='black';
        }
        for(var i=0;i<button2.length;i++){
            button2[i].style.backgroundColor='lightgrey';
            button2[i].style.color='black';
        }
        for(var i=0;i<button3.length;i++){
            button3[i].style.backgroundColor='darkgrey';
            button3[i].style.color='black';
        }
        for(var i=0;i<button4.length;i++){
            button4[i].style.backgroundColor='lightgrey';
            button4[i].style.color='black';
        }
        for(var i=0;i<button5.length;i++){
            button5[i].style.backgroundColor='darkgrey';
            button5[i].style.color='black';
        }
        for(var i=0;i<User.length;i++){
            User[i].style.color='white';
        }
        for(var i=0;i<prod.length;i++){
            prod[i].style.color='white';
        }
        for(var i=0;i<window.length;i++){
            window[i].style.backgroundColor='lightgrey';
        }
        for(var i=0;i<window1.length;i++){
            window1[i].style.backgroundColor='lightgrey';
        }
        for(var i=0;i<window2.length;i++){
            window2[i].style.backgroundColor='lightgrey';
        }
        for(var i=0;i<window3.length;i++){
            window3[i].style.backgroundColor='lightgrey';
        }

        for(var i=0;i<text.length;i++){
            text[i].style.color='grey';
        }
        for(var i=0;i<radio.length;i++){
            radio[i].style.borderColor='white';
        }
        for(var i = 0; i < side1.length; i++) {
            side1[i].style.backgroundColor = 'grey';
        }
        for(var i=0;i<windowprod1.length;i++){
            windowprod1[i].style.backgroundColor='lightgrey';
        }
        for(var i=0;i<windowprod2.length;i++){
            windowprod2[i].style.backgroundColor='lightgrey';
        }
        for(var i=0;i<windowprod3.length;i++){
            windowprod3[i].style.backgroundColor='lightgrey';
        }



    }
    else {
        for(var i = 0; i < myElements.length; i++) {
            myElements[i].style.color = 'black';
            myElements[i].style.backgroundColor = 'white';
            myElements[i].style.borderColor = 'rgb(210, 167, 167)';
        }
        for(var i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = 'white';
        }
        for(var i = 0; i < logoo.length; i++) {
            logoo[i].style.filter = 'none';
        }
        for(var i = 0; i < nav.length; i++) {
            nav[i].style.color = 'rgb(208, 177, 177)';
        }
        for(var i = 0; i < table.length; i++) {
            table[i].style.borderColor = 'rgb(208, 177, 177)';
        }
        for(var i = 0; i < table1.length; i++) {
            table1[i].style.borderColor = 'rgb(208, 177, 177)';
        }
        for(var i = 0; i < Text.length; i++) {
            Text[i].style.color = 'black';
            Text[i].style.borderColor = 'rgb(208, 177, 177)';
        }
        for(var i=0;i<button.length;i++){
            button[i].style.backgroundColor='rgb(208, 177, 177)';
            button[i].style.color='white';
        }
        for(var i=0;i<button1.length;i++){
            button1[i].style.backgroundColor='rgb(208, 177, 177)';
            button1[i].style.color='white';
        }
        for(var i=0;i<button2.length;i++){
            button2[i].style.backgroundColor='rgb(208, 177, 177)';
            button2[i].style.color='white';
        }
        for(var i=0;i<button3.length;i++){
            button3[i].style.backgroundColor='rgb(208, 177, 177)';
            button3[i].style.color='white';
        }
        for(var i=0;i<button4.length;i++){
            button4[i].style.backgroundColor='rgb(208, 177, 177)';
            button4[i].style.color='white';
        }
        for(var i=0;i<button5.length;i++){
            button5[i].style.backgroundColor='rgb(208, 177, 177)';
            button5[i].style.color='white';
        }
        for(var i=0;i<buttonprod.length;i++){
            buttonprod[i].style.backgroundColor='rgb(208, 177, 177)';
            buttonprod[i].style.color='white';
        }
        for(var i=0;i<User.length;i++){
            User[i].style.color='rgb(208, 177, 177)';
        }
        for(var i=0;i<prod.length;i++){
            prod[i].style.color='rgb(208, 177, 177)';
        }
        for(var i=0;i<window.length;i++){
            window[i].style.backgroundColor='white';
        }
        for(var i=0;i<window1.length;i++){
            window1[i].style.backgroundColor='white';
        }
        for(var i=0;i<window2.length;i++){
            window2[i].style.backgroundColor='white';
        }
        for(var i=0;i<windowprod1.length;i++){
            windowprod1[i].style.backgroundColor='white';
        }
        for(var i=0;i<windowprod2.length;i++){
            windowprod2[i].style.backgroundColor='white';
        }
        for(var i=0;i<windowprod3.length;i++){
            windowprod3[i].style.backgroundColor='white';
        }
        for(var i=0;i<window3.length;i++){
            window3[i].style.backgroundColor='white';
        }
        for(var i=0;i<text.length;i++){
            text[i].style.color='rgb(208, 177, 177)';
        }
        for(var i=0;i<radio.length;i++){
          radio[i].style.borderColor='#ccc';

        }
        for(var i = 0; i < side1.length; i++) {
            side1[i].style.backgroundColor = 'rgb(208, 177, 177)';
        }
 

    }

}
window.onload = function() {
    var darkModeToggle = document.getElementById('dark-mode-toggle');
    var darkMode = localStorage.getItem('darkMode') === 'true';
    darkModeToggle.checked = darkMode;
    document.body.classList.toggle('dark-mode', darkMode);
    if (darkMode) toggleDarkMode();
}