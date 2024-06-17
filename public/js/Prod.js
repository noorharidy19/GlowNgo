function showPopup(containerIds) {
    containerIds.forEach(function(id) {
        document.getElementById(id).style.display = "block";
        document.getElementById('overlay').style.display = 'block';
    });
}

function hidePopup(containerIds) {
    containerIds.forEach(function(id) {
        document.getElementById(id).style.display = "none";
        document.getElementById('overlay').style.display = 'none';
    });
}
function showP(containerIds) {
    containerIds.forEach(function(id) {
        document.getElementById(id).style.display = "block";
    });
}

function hideP(containerIds) {
    containerIds.forEach(function(id) {
        document.getElementById(id).style.display = "none";
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


function des() {
    var darkMode = localStorage.getItem('darkMode') === 'true';
    var nourhanElements = document.getElementsByClassName("nourhan");
    var btn1Elements = document.getElementsByClassName("btn1");
    var btn2Elements = document.getElementsByClassName("btn2");
    var noorElements = document.getElementsByClassName("noor");
    for (var i = 0; i < nourhanElements.length; i++) {
        nourhanElements[i].style.display = "inline-block";
    }
    for (var i = 0; i < btn1Elements.length; i++) {
        btn1Elements[i].style.backgroundColor = darkMode ? "darkgray" : "pink";
    }
    for (var i = 0; i < btn2Elements.length; i++) {
        btn2Elements[i].style.backgroundColor = darkMode ? "whitesmoke" : "whitesmoke";
    }
    for (var i = 0; i < noorElements.length; i++) {
        noorElements[i].style.display = "none";
    }
}

function use() {
    var darkMode = localStorage.getItem('darkMode') === 'true';
    var noorElements = document.getElementsByClassName("noor");
    var btn2Elements = document.getElementsByClassName("btn2");
    var btn1Elements = document.getElementsByClassName("btn1");
    var nourhanElements = document.getElementsByClassName("nourhan");
    for (var i = 0; i < noorElements.length; i++) {
        noorElements[i].style.display = "inline-block";
    }
    for (var i = 0; i < btn2Elements.length; i++) {
        btn2Elements[i].style.backgroundColor = darkMode ? "darkgray" : "pink";
    }
    for (var i = 0; i < btn1Elements.length; i++) {
        btn1Elements[i].style.backgroundColor = darkMode ? "whitesmoke" : "whitesmoke";
    }
    for (var i = 0; i < nourhanElements.length; i++) {
        nourhanElements[i].style.display = "none";
    }
}
function x(selectedOption, brandDropdownId, container) {
    var brandDropdown = document.getElementById(brandDropdownId);
    var containerElement = document.getElementById(container);
    if (selectedOption) {
        switch (selectedOption) {
            case "A-Z":
                sortDivsAlphabetically(container);
                console.log("Sorting A-Z");
                break;
            case "Z-A":
                sortDivsAlphabeticallyZA(container);
                console.log("Sorting Z-A");
                break;
            case "By price(LOWER->HIGHER)":
                sortProductsByPrice(container);
                console.log("Sorting by price (lower to higher)");
                break;
            case "BY BRAND":
                if (brandDropdown) {
                    brandDropdown.style.display = "inline-block";
                }
                if (containerElement) {
                    containerElement.style.display = "none";
                }
                console.log("Showing brand dropdown");
                break;
            case "By price(HIGHER->LOWER)":
                sortProductsByPriceDescending(container);
                console.log("Sorting by price (higher to lower)");
                break;
            default:
                if (brandDropdown) {
                    brandDropdown.style.display = "none";
                }
                if (containerElement) {
                    containerElement.style.display = "flex";
                }
                console.log("Hiding brand dropdown");
                console.log("Please select an option");
                break;
               
        }
    } else {
        console.log("Please select an option");
    }
}
function sortDivsAlphabetically(containerClass) {
    console.log("Sorting divs alphabetically...");
    var parentContainer = document.querySelector('.' + containerClass);
    if (!parentContainer) {
        console.log("Parent container not found");
        return;
    }
    var originalOrder = Array.from(parentContainer.children); 
    var divs = Array.from(parentContainer.children);
    if (!divs.length) {
        console.log("No child divs found");
        return;
    }
    divs.sort(function(a, b) {
        var h2A = a.querySelector('h2');
        var h2B = b.querySelector('h2');
        var textA = h2A ? h2A.textContent.toUpperCase() : '';
        var textB = h2B ? h2B.textContent.toUpperCase() : '';
        if (textA < textB) {
            return -1;
        }
        if (textA > textB) {
            return 1;
        }
        return 0;
    });
    function resetToOriginalOrder() {
        while (parentContainer.firstChild) {
            parentContainer.removeChild(parentContainer.firstChild);
        }
        originalOrder.forEach(function(div) {
            parentContainer.appendChild(div);
        });
    }
    document.getElementById('sortSelect').addEventListener('change', function() {
        var selectedOption = this.value;
        if (selectedOption === 'Select') {
            resetToOriginalOrder();
        }
    });
    while (parentContainer.firstChild) {
        parentContainer.removeChild(parentContainer.firstChild);
    }
    divs.forEach(function(div) {
        parentContainer.appendChild(div);
    });
}
function sortDivsAlphabeticallyZA(containerClass) {
    console.log("Sorting divs alphabetically Z to A...");
    var parentContainer = document.querySelector('.' + containerClass);
    if (!parentContainer) {
        console.log("Parent container not found");
        return;
    }
    var originalOrder = Array.from(parentContainer.children); 
    var divs = Array.from(parentContainer.children);
    if (!divs.length) {
        console.log("No child divs found");
        return;
    }
    divs.sort(function(a, b) {
        var h2A = a.querySelector('h2');
        var h2B = b.querySelector('h2');
        var textA = h2A ? h2A.textContent.toUpperCase() : '';
        var textB = h2B ? h2B.textContent.toUpperCase() : '';
        if (textA < textB) {
            return 1; 
        }
        if (textA > textB) {
            return -1; 
        }
        return 0;
    });

    function resetToOriginalOrder() {
        while (parentContainer.firstChild) {
            parentContainer.removeChild(parentContainer.firstChild);
        }
        originalOrder.forEach(function(div) {
            parentContainer.appendChild(div);
        });
    }

    document.getElementById('sortSelect').addEventListener('change', function() {
        var selectedOption = this.value;
        if (selectedOption === 'Select') {
            resetToOriginalOrder();
        }
    });

    while (parentContainer.firstChild) {
        parentContainer.removeChild(parentContainer.firstChild);
    }
    divs.forEach(function(div) {
        parentContainer.appendChild(div);
    });
}


function sortProductsByPrice(containerClass) {
    console.log("Sorting products by price...");
    var parentContainer = document.querySelector('.' + containerClass);
    if (!parentContainer) {
        console.log("Parent container not found");
        return;
    }
    var originalOrder = Array.from(parentContainer.children); 
    var productElements = Array.from(parentContainer.children);
    if (!productElements.length) {
        console.log("No child divs found");
        return;
    }
    productElements.sort(function(a, b) {
        var h3A = a.querySelector('h3');
        var h3B = b.querySelector('h3');
        var priceA = h3A ? parseFloat(h3A.textContent.replace('$', '')) : 0;
        var priceB = h3B ? parseFloat(h3B.textContent.replace('$', '')) : 0;
        return priceA - priceB;
    });

    function resetToOriginalOrder() {
        while (parentContainer.firstChild) {
            parentContainer.removeChild(parentContainer.firstChild);
        }
        originalOrder.forEach(function(product) {
            parentContainer.appendChild(product);
        });
    }

    document.getElementById('sortSelect').addEventListener('change', function() {
        var selectedOption = this.value;
        if (selectedOption === 'Select') {
            resetToOriginalOrder();
        }
    });

    productElements.forEach(function(product) {
        parentContainer.appendChild(product);
    });
}


function sortProductsByPriceDescending(containerClass) {
    console.log("Sorting products by price (descending)...");
    var parentContainer = document.querySelector('.' + containerClass);
    if (!parentContainer) {
        console.log("Parent container not found");
        return;
    }
    var originalOrder = Array.from(parentContainer.children);
    var productElements = Array.from(parentContainer.children);
    if (!productElements.length) {
        console.log("No child divs found");
        return;
    }
    productElements.sort(function(a, b) {
        var h3A = a.querySelector('h3');
        var h3B = b.querySelector('h3');
        var priceA = h3A ? parseFloat(h3A.textContent.replace('$', '')) : 0;
        var priceB = h3B ? parseFloat(h3B.textContent.replace('$', '')) : 0;
        return priceB - priceA;
    });

    function resetToOriginalOrder() {
        while (parentContainer.firstChild) {
            parentContainer.removeChild(parentContainer.firstChild);
        }
        originalOrder.forEach(function(product) {
            parentContainer.appendChild(product);
        });
    }

    document.getElementById('sortSelect').addEventListener('change', function() {
        var selectedOption = this.value;
        if (selectedOption === 'Select') {
            resetToOriginalOrder();
        }
    });

    productElements.forEach(function(product) {
        parentContainer.appendChild(product);
    });
}

// ---------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('sortSelect').addEventListener('change', function() {
        var selectedOption = this.value;
        if (selectedOption === 'BY BRAND') {
            document.getElementById('brandOptions').style.display = 'inline-block';
        } else {
            document.getElementById('brandOptions').style.display = 'none';
            if(selectedOption === 'Select') {
                showAllProducts();
            } else {
                filterProducts(selectedOption);
            }
        }
    });

    document.getElementById('brandOptions').addEventListener('change', function() {
        var selectedBrand = this.value;
        filterProductsByBrand(selectedBrand);
    });

    function filterProducts(option) {
        var products = document.querySelectorAll('.AllProducts');
        products.forEach(function(product) {
            product.style.display = 'block';
        });
    }

    function filterProductsByBrand(brand) {
        var products = document.querySelectorAll('.AllProducts');
        products.forEach(function(product) {
            if (!product.classList.contains(brand)) {
                product.style.display = 'none';
            } else {
                product.style.display = 'block';
            }
        });
    }

    function showAllProducts() {
        var products = document.querySelectorAll('.AllProducts');
        products.forEach(function(product) {
            product.style.display = 'block';
        });
    }
});

let initialPrices = {};

function changeQuantity(change, quantityId, priceId) {
    let quantityElement = document.getElementById(quantityId);
    let quantity = parseInt(quantityElement.textContent);
    
    quantity += change;
    if (quantity < 1) {
      quantity = 1;
    } else if (quantity > 5) {
      quantity = 5;
    }
    
    let priceElement = document.getElementById(priceId);
    if (!initialPrices[priceId]) {
      initialPrices[priceId] = parseFloat(priceElement.textContent);
    }
    
    let pricePerItem = initialPrices[priceId];
    
    quantityElement.textContent = quantity;
    priceElement.textContent = (pricePerItem * quantity).toFixed(2);
    getTotalPrice();
  }
function getTotalPrice() {
//     var total1 = document.getElementsByClassName('total1')[0].textContent;
// var total2 = document.getElementsByClassName('total2')[0].textContent;
    let priceIds = ['price1', 'price2', 'price3']; 
    let totalPrice = 0;
    priceIds.forEach(function(priceId) {
      let priceElement = document.getElementById(priceId);
      totalPrice += parseFloat(priceElement.textContent);
    //   total1+=totalPrice;
    //   total2+=totalPrice;
    });
    document.getElementById('total').textContent = totalPrice.toFixed(2);
    // document.getElementByClassName('total1').textContent = total1.toFixed(2);
    // document.getElementByClassName('total2').textContent = total2.toFixed(2);
  }
  window.onload = function() {
    getTotalPrice();
  };
//   function toggleDarkMode() {
//     var darkModeToggle = document.getElementById('dark-mode-toggle');
//     document.body.classList.toggle('dark-mode', darkModeToggle.checked);
//     localStorage.setItem('darkMode', darkModeToggle.checked);
//     // Rest of your dark mode styling...
// }

// window.onload = function() {
//     var darkModeToggle = document.getElementById('dark-mode-toggle');
//     var darkMode = localStorage.getItem('darkMode') === 'true';
//     darkModeToggle.checked = darkMode;
//     document.body.classList.toggle('dark-mode', darkMode);
//     if (darkMode) toggleDarkMode();
// }

  function toggleDarkMode() {
    var darkModeToggle = document.getElementById('dark-mode-toggle');
    document.body.classList.toggle('dark-mode', darkModeToggle.checked);
    localStorage.setItem('darkMode', darkModeToggle.checked);
    // rest of your code...

    var darkModeToggle = document.getElementById('dark-mode-toggle');
    var myElements = document.getElementsByClassName('myElement');
    var elements = document.getElementsByClassName('bodyy');
    var cards= document.getElementsByClassName('shopp');
    var logoo = document.getElementsByClassName('logo');
    var nav = document.getElementsByClassName('nav1');
    var img = document.getElementsByClassName('imggel');
    var eye= document.getElementsByClassName('eye');
    var window= document.getElementsByClassName('Products-window');
    var text= document.getElementsByClassName('text');
    var bt1= document.getElementsByClassName('btn1');
    var bt2= document.getElementsByClassName('btn2');
    var p1= document.getElementsByClassName('p1');
    var o= document.getElementsByClassName('o');
    var z= document.getElementsByClassName('z');
    var lipprod= document.getElementsByClassName('lipprod');
    var Sponges= document.getElementsByClassName('Sponges');
    var facee= document.getElementsByClassName('facee');
    var Eylashes= document.getElementsByClassName('EyeLashes');
    var Mascara= document.getElementsByClassName('Mascara');
    var kohl= document.getElementsByClassName('kohl');
    var EyeLiner= document.getElementsByClassName('EyeLinear');
    var EyeShadow= document.getElementsByClassName('EyeShadow');
    var EyePrimer= document.getElementsByClassName('EyePrimer');
    var FaceBrush= document.getElementsByClassName('FaceBrush');
    var Curlers= document.getElementsByClassName('Curlers');
    var q1= document.getElementsByClassName('q1');
    var shop= document.getElementsByClassName('shop');
    var dropdownbtn = document.getElementsByClassName('dropdownbtn');
    var viewmore = document.getElementsByClassName('viewmore');
    var accountcontainer= document.getElementsByClassName('account-container');
    var profile= document.getElementsByClassName('profile-title');
    var info= document.getElementsByClassName('info');
    var n= document.getElementsByClassName('n');
    var popupp= document.getElementsByClassName('CART');
    var popupp2= document.getElementsByClassName('WISHLIST');
    var add= document.getElementsByClassName('add');
    var remove= document.getElementsByClassName('remove');
    var sub= document.getElementsByClassName('sub');
    var abouttitle= document.getElementsByClassName('about-title');
    var p= document.getElementsByClassName('a2');
    var h= document.getElementsByClassName('a1');
    var li= document.getElementsByClassName('l');
    var followtext= document.getElementsByClassName('follow-text');
    var checkoutcontainer= document.getElementsByClassName('checkout-container');
    var ordersummary= document.getElementsByClassName('order-summary');
    var payment= document.getElementsByClassName('payment-method-button');
    var confirm= document.getElementsByClassName('confirm-button');
    var total= document.getElementsByClassName('checkout-title');
    if (darkModeToggle.checked) {
        for(var i = 0; i < myElements.length; i++) {
            myElements[i].style.backgroundColor = '#333333'; // lighter black
            myElements[i].style.borderColor = 'white';
        }
        for(var i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = '#333333'; // lighter black
        }
        for(var i = 0; i < cards.length; i++) {
            cards[i].style.backgroundColor = 'rgb(152, 150, 150)';
            // darker pinkrgb(182, 127, 127)
        }
        for(var i = 0; i < logoo.length; i++) {
            logoo[i].style.filter = 'invert(80%)';
            // logoo[i].style.backgroundColor = 'transparent';
        }
        for(var i = 0; i < nav.length; i++) {
            nav[i].style.color = 'white';
        }
        for(var i = 0; i < img.length; i++) {
            img[i].style.borderColor = 'lightgray';
        }
        for(var i = 0; i < eye.length; i++) {
            eye[i].style.color = 'lightgray';
        }
        for(var i = 0; i < window.length; i++) {
            window[i].style.backgroundColor = 'lightgray';
        }
        for(var i = 0; i < text.length; i++) {
            text[i].style.color = 'lightgray';
        }
        for(var i = 0; i < bt1.length; i++) {
            bt1[i].style.backgroundColor = 'darkgray';
        }
        for(var i = 0; i < bt2.length; i++) {
            bt2[i].style.backgroundColor = 'white';
        }
        for(var i = 0; i < p1.length; i++) {
            p1[i].style.color = 'black';
        }
        for(var i = 0; i < z.length; i++) {
            z[i].style.color ='';
        }
        for(var i = 0; i < lipprod.length; i++) {
            lipprod[i].style.color = 'lightgray';
        }
        for(var i = 0; i < Sponges.length; i++) {
            Sponges[i].style.color = 'lightgray';
        }
        for(var i = 0; i < facee.length; i++) {
            facee[i].style.color = 'lightgray';
        }
        for(var i = 0; i < Eylashes.length; i++) {
            Eylashes[i].style.color = 'lightgray';
        }
        for(var i = 0; i < Mascara.length; i++) {
            Mascara[i].style.color = 'lightgray';
        }
        for(var i = 0; i < kohl.length; i++) {
            kohl[i].style.color = 'lightgray';
        }
        for(var i = 0; i < EyeLiner.length; i++) {
            EyeLiner[i].style.color = 'lightgray';
        }
        for(var i = 0; i < EyeShadow.length; i++) {
            EyeShadow[i].style.color = 'lightgray';
        }
        for(var i = 0; i < EyePrimer.length; i++) {
            EyePrimer[i].style.color = 'lightgray';
        }
        for(var i = 0; i < FaceBrush.length; i++) {
            FaceBrush[i].style.color = 'lightgray';
        }
        for(var i = 0; i < Curlers.length; i++) {
            Curlers[i].style.color = 'lightgray';
        }
        for(var i = 0; i < q1.length; i++) {
            q1[i].style.color = 'lightgray';
        }
        for(var i = 0; i < shop.length; i++) {
            shop[i].style.borderColor = 'gray';
            shop[i].style.backgroundColor = 'lightgray';
        } 
        for(var i = 0; i < dropdownbtn.length; i++) {
            dropdownbtn[i].style.color = 'white';
        }  
        for(var i = 0; i < viewmore.length; i++) {
            viewmore[i].style.color = 'white';
        }
        for(var i = 0; i < accountcontainer.length; i++) {
            accountcontainer[i].style.backgroundColor = 'lightgray';
        }
        for(var i = 0; i < profile.length; i++) {
            profile[i].style.color = 'black';
        }
        for(var i = 0; i < info.length; i++) {
            info[i].style.color = 'black';
        }
        for(var i = 0; i < n.length; i++) {
            n[i].style.color = 'black';
            n[i].style.backgroundColor = 'lightgray';
        }
        for(var i = 0; i < popupp.length; i++) {
            popupp[i].style.backgroundColor = 'lightgray';
        }
        for(var i = 0; i < popupp2.length; i++) {
            popupp2[i].style.backgroundColor = 'lightgray';
        }
        for(var i = 0; i < add.length; i++) {
            add[i].style.backgroundColor = 'darkgary';
        }
        for(var i = 0; i < remove.length; i++) {
            remove[i].style.backgroundColor = 'darkgary';
        }
        for(var i = 0; i < sub.length; i++) {
            sub[i].style.backgroundColor = 'darkgary';
        }
        for(var i = 0; i < abouttitle.length; i++) {
            abouttitle[i].style.color = 'black';
        }
        for(var i = 0; i < p.length; i++) {
            p[i].style.color = 'lightgray';
        }
        for(var i = 0; i < h.length; i++) {
            h[i].style.color = 'black';
        }
        for(var i = 0; i < li.length; i++) {
            li[i].style.color = 'white';
        }
        for(var i = 0; i < followtext.length; i++) {
            followtext[i].style.color = 'black';
        }
        for(var i = 0; i < checkoutcontainer.length; i++) {
            checkoutcontainer[i].style.backgroundColor = 'darkgray';
        }
        for(var i = 0; i < ordersummary.length; i++) { 
            ordersummary[i].style.backgroundColor = 'lightgray';
        }
        for(var i = 0; i < payment.length; i++) {
            payment[i].style.backgroundColor = 'lightgray';
            payment[i].style.color = 'black';
        }
        for(var i = 0; i < confirm.length; i++) {
            confirm[i].style.backgroundColor = 'lightgray';
            confirm[i].style.color = 'black';
        }
        for(var i = 0; i < total.length; i++) {
            total[i].style.color = 'black';
        }
      
        
    } else {
        for(var i = 0; i < myElements.length; i++) {
            myElements[i].style.color = 'black';
            myElements[i].style.backgroundColor = 'white';
            myElements[i].style.borderColor = 'rgb(210, 167, 167)';
        }
        for(var i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = 'white';
        }
        for(var i = 0; i < cards.length; i++) {
            cards[i].style.backgroundColor = 'rgb(255, 202, 202)'; 
        }
        for(var i = 0; i < logoo.length; i++) {
            logoo[i].style.filter = 'none';
        }
        for(var i = 0; i < nav.length; i++) {
            nav[i].style.color = 'rgb(208, 177, 177)';
        }
        for(var i = 0; i < img.length; i++) {
            img[i].style.borderColor = 'rgba(238, 193, 193, 0.749)';
        }
        for(var i = 0; i < eye.length; i++) {
            eye[i].style.color = 'rgb(208, 177, 177)';
        }
        for(var i = 0; i < window.length; i++) {
            window[i].style.backgroundColor = 'white';
        }
        for(var i = 0; i < text.length; i++) {
            text[i].style.color = 'pink';
        }
        for(var i = 0; i < bt1.length; i++) {
            bt1[i].style.backgroundColor = 'pink';
        }
        for(var i = 0; i < bt2.length; i++) {
            bt2[i].style.backgroundColor = 'whitesmoke';
        }
        for(var i = 0; i < p1.length; i++) {
            p1[i].style.color = 'rgb(221, 93, 140);';
        }
        for(var i = 0; i < z.length; i++) {
            z[i].style.color = 'rgb(222, 128, 128)';
        }
        for(var i = 0; i < lipprod.length; i++) {
            lipprod[i].style.color = 'rgb(208, 177, 177)';
        }
        for(var i = 0; i < Sponges.length; i++) {
            Sponges[i].style.color = 'rgb(208, 177, 177)';
        }
        for(var i = 0; i < facee.length; i++) {
            facee[i].style.color = 'rgb(208, 177, 177)';
        }
        for(var i = 0; i < Eylashes.length; i++) {
            Eylashes[i].style.color = 'rgb(208, 177, 177)';
        }
        for(var i = 0; i < Mascara.length; i++) {
            Mascara[i].style.color = 'rgb(208, 177, 177)';
        }
        for(var i = 0; i < kohl.length; i++) {
            kohl[i].style.color = 'rgb(208, 177, 177)';
        }
        for(var i = 0; i < EyeLiner.length; i++) {
            EyeLiner[i].style.color = 'rgb(208, 177, 177)';
        }
        for(var i = 0; i < EyeShadow.length; i++) {
            EyeShadow[i].style.color = 'rgb(208, 177, 177)';
        }
        for(var i = 0; i < EyePrimer.length; i++) {
            EyePrimer[i].style.color = 'rgb(208, 177, 177)';
        }
        for(var i = 0; i < FaceBrush.length; i++) {
            FaceBrush[i].style.color = 'rgb(208, 177, 177)';
        }
        for(var i = 0; i < Curlers.length; i++) {
            Curlers[i].style.color = 'rgb(208, 177, 177)';
        }
        for(var i = 0; i < q1.length; i++) {
            q1[i].style.color = ' rgb(222, 162, 162) ';
        }
        for(var i = 0; i < shop.length; i++) {
            shop[i].style.borderColor = 'rgb(222, 162, 162) ';
            shop[i].style.backgroundColor = 'white';
        }
        for(var i = 0; i < dropdownbtn.length; i++) {
            dropdownbtn[i].style.color = 'rgb(208, 177, 177)';
        }
        for(var i = 0; i < viewmore.length; i++) {
            viewmore[i].style.color = 'blue';
        }
        for(var i = 0; i < accountcontainer.length; i++) {
            accountcontainer[i].style.backgroundColor = 'white';
        }
        for(var i = 0; i < profile.length; i++) {
            profile[i].style.color = 'rgb(210, 167, 167)';
        }
        for(var i = 0; i < info.length; i++) {
            info[i].style.color = 'rgb(210, 167, 167)';
        }
        for(var i = 0; i < n.length; i++) {
            n[i].style.color = 'rgb(208, 177, 177)';
            n[i].style.backgroundColor = 'white';
        }
        for(var i = 0; i < popupp.length; i++) {
            popupp[i].style.backgroundColor = 'white';
        }
        for(var i = 0; i < popupp2.length; i++) {
            popupp2[i].style.backgroundColor = 'white';
        }
        for(var i = 0; i < add.length; i++) {
            add[i].style.backgroundColor = 'rgb(196, 194, 194)';
        }
        for(var i = 0; i < remove.length; i++) {
            remove[i].style.backgroundColor = 'rgb(196, 194, 194)';
        }
        for(var i = 0; i < sub.length; i++) {
            sub[i].style.backgroundColor = 'rgb(196, 194, 194)';
        }
        for(var i = 0; i < abouttitle.length; i++) {
            abouttitle[i].style.color = 'rgb(210, 167, 167)';
        }
        for(var i = 0; i < p.length; i++) {
            p[i].style.color = 'rgb(208, 177, 177)';
        }
        for(var i = 0; i < h.length; i++) {
            h[i].style.color = 'rgb(210, 167, 167)';
        }
        for(var i = 0; i < li.length; i++) {
            li[i].style.color = 'black';
        }
        for(var i = 0; i < followtext.length; i++) {
            followtext[i].style.color = 'rgb(210, 167, 167)';
        }
        for(var i = 0; i < checkoutcontainer.length; i++) {
            checkoutcontainer[i].style.backgroundColor = 'white';
        }
        for(var i = 0; i < ordersummary.length; i++) {
            ordersummary[i].style.backgroundColor = 'whitesmoke';
        }
        for(var i = 0; i < payment.length; i++) {
            payment[i].style.backgroundColor = 'rgb(210, 167, 167)';
            payment[i].style.color = 'white';
        }   
        for(var i = 0; i < confirm.length; i++) {
            confirm[i].style.backgroundColor = 'rgb(210, 167, 167)';
            confirm[i].style.color = 'white';
        }
        for(var i = 0; i < total.length; i++) {
            total[i].style.color = 'rgb(210, 167, 167)';
        }
       
    }
}
window.onload = function() {
    var darkModeToggle = document.getElementById('dark-mode-toggle');
    var darkMode = localStorage.getItem('darkMode') === 'true';
    darkModeToggle.checked = darkMode;
    document.body.classList.toggle('darkMode', darkMode);
    if (darkMode) toggleDarkMode();
}
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function openChangePassword() {
    var passwordForm = document.getElementById("password-form");
    if (passwordForm.style.display === "none") {
        passwordForm.style.display = "block";
    } else {
        passwordForm.style.display = "none";
    }
}

function changePassword() {
    var oldPassword = document.getElementById("oldPassword").value;
    var newPassword = document.getElementById("newPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    if (newPassword !== confirmPassword) {
        alert("New password and confirm password do not match!");
    } else {
        // Send request to change password
        alert("Password changed successfully!");
    }
}

function revealOffers() {
    var offersList = document.getElementById("offers-list");
    if (offersList.style.display === "none") {
        offersList.style.display = "block";
    } else {
        offersList.style.display = "none";
    }

}