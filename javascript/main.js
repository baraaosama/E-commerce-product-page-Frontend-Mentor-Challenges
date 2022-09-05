
const cartBox = document.querySelector(".cart-box");
const cartIcon = document.querySelector(".cart-icon");
const lightBox = document.querySelector(".light-box");
const closeIcon = document.querySelector(".close");
const mainImage = document.querySelector(".main-image .main-image-display")
const displayImage = document.querySelector(".display-image .display-main-image");
let smallImages = Array.from(document.querySelectorAll(".small-images .image img"));
let wrapperImages = Array.from(document.querySelectorAll(".wrapper img"));
const nextElement = document.querySelector(".display-image .next");
const prevoiusElement = document.querySelector(".display-image .prevoius");
const menuIcon = document.querySelector(".menu");
const menuList = document.querySelector(".menu-list");
const mobileNextElement = document.querySelector(".next-element");
const mobilePreviousElement = document.querySelector(".previous-element");
const emptyCart = document.querySelector(".empty");
const addToCartButton = document.querySelector(".add-to-cart");
const checkoutButton = document.querySelector(".checkout");
const content = document.querySelector(".cart-box .content");
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const numberOfOneItem = document.querySelector(".number-of-item");
const numberofitemsInCart = document.querySelector(".number-of-elements");

/*Control Menu List in Mobile*/

menuIcon.addEventListener("click", () => {
    if (menuIcon.classList.contains("menu")) {
        menuList.style.cssText = "left:0;"
        menuIcon.src = "images/icon-close.svg";
        menuIcon.classList.toggle("menu")
    } else {
        menuList.style.cssText = "left:-100%;"
        menuIcon.src = "images/icon-menu.svg";
        menuIcon.classList.toggle("menu");
    }
})


cartIcon.addEventListener("click", () => {
    if (cartBox.style.display == "none") {
        cartBox.style.display = "block";
    } else {
        cartBox.style.display = "none";
    }
})

mainImage.addEventListener("click", () => {
    lightBox.style.display = "flex";
    displayImage.src = mainImage.src;
})
closeIcon.addEventListener("click", () => {
    lightBox.style.display = "none";
})

/* turns between images */
smallImages.map((e) => {
    e.addEventListener("click", () => {
        smallImages.forEach((el) => el.parentElement.classList.remove("active"));
        e.parentElement.classList.add("active");
        mainImage.src = e.src;
    })
})

wrapperImages.map((e) => {
    e.addEventListener("click", () => {
        wrapperImages.forEach((el) => el.classList.remove("active"));
        e.classList.add("active");
        displayImage.src = e.src;
    })
})
nextElement.addEventListener("click", () => {
    let indexOfnextElement = 0;
    for (i = 0; i < wrapperImages.length; i++) {
        if (wrapperImages[i].src == displayImage.src) {
            if (i < 3) {
                indexOfnextElement = i + 1;
            } else {
                indexOfnextElement = 0;
            }
        }
    }
    wrapperImages.forEach((el) => el.classList.remove("active"));
    wrapperImages[indexOfnextElement].classList.add("active");
    displayImage.src = wrapperImages[indexOfnextElement].src;

})
prevoiusElement.addEventListener("click", () => {
    let indexOfpreviousElement = 0;
    for (i = 0; i < wrapperImages.length; i++) {
        if (wrapperImages[i].src == displayImage.src) {
            if (i > 0) {
                indexOfpreviousElement = i - 1;
            } else {
                indexOfpreviousElement = 3;
            }
        }
    }
    wrapperImages.forEach((el) => el.classList.remove("active"));
    wrapperImages[indexOfpreviousElement].classList.add("active");
    displayImage.src = wrapperImages[indexOfpreviousElement].src;

})
mobilePreviousElement.addEventListener("click", () => {
    let indexOfpreviousElement = 0;
    for (i = 0; i < smallImages.length; i++) {
        if (smallImages[i].src == mainImage.src) {
            if (i > 0) {
                indexOfpreviousElement = i - 1;
            } else {
                indexOfpreviousElement = 3;
            }
        }
    }
    smallImages.forEach((el) => el.classList.remove("active"));
    smallImages[indexOfpreviousElement].classList.add("active");
    mainImage.src = smallImages[indexOfpreviousElement].src;
})
mobileNextElement.addEventListener("click", () => {
    let indexOfnextElement = 0;
    for (i = 0; i < smallImages.length; i++) {
        if (smallImages[i].src == mainImage.src) {
            if (i < 3) {
                indexOfnextElement = i + 1;
            } else {
                indexOfnextElement = 0;
            }
        }
    }
    smallImages.forEach((el) => el.classList.remove("active"));
    smallImages[indexOfnextElement].classList.add("active");
    mainImage.src = smallImages[indexOfnextElement].src

})


/* Functionality of add items to cart */

let totalItems = 0;
let counter = 0;

plus.addEventListener("click", () => {
    counter += 1;
    numberOfOneItem.innerHTML = counter;
})


minus.addEventListener("click", () => {
    if (counter > 0) {
        counter -= 1;
        numberOfOneItem.innerHTML = counter;
    } else {
        counter = 0;
        numberOfOneItem.innerHTML = counter;
    }
})


addToCartButton.addEventListener("click", () => {
    if (numberOfOneItem.innerHTML != 0) {
        numberOfOneItem.innerHTML = 0;
        emptyCart.style.display = "none"
        content.style.display = "block";
        total = counter * 125;
        let item = `<div class="item">
    <img src=${mainImage.src} alt="">
    <div class="price">
        <p>Fall limited Edition sneakers</p>
        <p>$125.00 x <span class="number">${counter}</span> <span class="total">$${total}.00</span></p>
    </div>
    <img src="images/icon-delete.svg" alt="" class="delete">
</div>`;
        content.innerHTML += item;
        totalItems += counter;
        numberofitemsInCart.innerHTML = totalItems;
        numberofitemsInCart.style.display = "flex";
        counter = 0;
    }
    if (emptyCart.style.display === "none") {
        checkoutButton.style.display = "flex"
    } else {
        checkoutButton.style.display = "none";
    }
    let deleteItem = document.querySelectorAll(".delete");
    function deleteItemFunctionality() {
        deleteItem.forEach((e) => {
            e.addEventListener("click", () => {
                let number = document.querySelector(".number");
                e.parentElement.remove();
                totalItems -= parseInt(number.innerHTML);
                if (totalItems == 0) {
                    numberofitemsInCart.style.display = "none";
                    checkoutButton.style.display = "none";
                    emptyCart.style.display = "flex"
                } else {
                    numberofitemsInCart.innerHTML = totalItems;
                }
            })
        })
    }
    deleteItemFunctionality();
})

checkoutButton.addEventListener("click", () => {
    cartBox.style.display = "none";
})





