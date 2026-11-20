
/*Pixel Guild JavaScript*/


/*products*/

const products = {

    "dont-be-late": {

        name: "Don't Be Late Tee",

        description:
            "A simple reminder to show up, get moving, and make the most of the day.",

        price: 499,

        color: "White",

        colorHex: "#FFFFFF",

        images: [
            "../images/products/dont-be-late-front.jpg",
            "../images/products/dont-be-late-back.jpg"
        ],

        imageLabels: [
            "FRONT",
            "BACK"
        ]

    },


    "find-your-comfort": {

        name: "Find Your Comfort Tee",

        description:
            "A plain, comfortable tee designed for everyday wear.",

        price: 499,

        color: "Beige",

        colorHex: "#D8C5A3",

        images: [
            "../images/products/find-your-comfort-front.jpg",
            "../images/products/find-your-comfort-back.jpg"
        ],

        imageLabels: [
            "FRONT",
            "BACK"
        ]

    },


    "do-good-work": {

        name: "Do Good Work Tee",

        description:
            "A simple statement for people who believe good work speaks for itself.",

        price: 499,

        color: "Black",

        colorHex: "#222222",

        images: [
            "../images/products/do-good-work-front.jpg",
            "../images/products/do-good-work-back.jpg"
        ],

        imageLabels: [
            "FRONT",
            "BACK"
        ]

    }

};


/*product key stuff*/

const productKey = document.body.dataset.product;

const product = products[productKey];

if (product) {

    initializeProductPage(product);

}


/*product page, will update if u change title*/

function initializeProductPage(product) {

    // update page title

    document.title = `${product.name} | Sense`;


    // update product name

    document.getElementById("product-name").textContent =
        product.name;


    // update product description

    document.getElementById("product-description").textContent =
        product.description;


    // update product price

    document.getElementById("product-price").textContent =
        `₱${product.price.toFixed(2)}`;


    // Initialize product interactions

    initializeGallery(product);

    initializeColor(product);

    initializeSize();

    initializeQuantity(product);

    initializeOrder(product);

}


/*image gallery*/

function initializeGallery(product) {

    const productImage =
        document.getElementById("product-image");

    const imageLabel =
        document.getElementById("image-view-label");

    const previousButton =
        document.getElementById("previous-image");

    const nextButton =
        document.getElementById("next-image");


    let currentImageIndex = 0;


    function updateGallery() {

        productImage.src =
            product.images[currentImageIndex];

        productImage.alt =
            `${product.imageLabels[currentImageIndex]} view of ${product.name}`;

        imageLabel.textContent =
            product.imageLabels[currentImageIndex];


        // Disable arrows when there are no more images

        previousButton.disabled =
            currentImageIndex === 0;

        nextButton.disabled =
            currentImageIndex === product.images.length - 1;

    }


    // previous image

    previousButton.addEventListener("click", function() {

        if (currentImageIndex > 0) {

            currentImageIndex--;

            updateGallery();

        }

    });


    // next image

    nextButton.addEventListener("click", function() {

        if (currentImageIndex < product.images.length - 1) {

            currentImageIndex++;

            updateGallery();

        }

    });


    // display initial image

    updateGallery();

}


/*colors*/

function initializeColor(product) {

    const colorSwatch =
        document.getElementById("color-swatch");

    const selectedColor =
        document.getElementById("selected-color");


    // set the product color automatically yey

    colorSwatch.style.backgroundColor =
        product.colorHex;

    colorSwatch.setAttribute(
        "aria-label",
        `Select ${product.color}`
    );


    // select the color when clicked

    colorSwatch.addEventListener("click", function() {

        colorSwatch.classList.add("selected");

        colorSwatch.setAttribute("aria-pressed", "true");

        selectedColor.textContent =
            product.color;

    });


    selectedColor.textContent =
        product.color;

}


/*6. size */

function initializeSize() {

    const sizeButtons =
        document.querySelectorAll(".size-button");


    sizeButtons.forEach(function(button) {

        button.addEventListener("click", function() {


            // remove previous selection

            sizeButtons.forEach(function(item) {

                item.classList.remove("selected");

                item.setAttribute("aria-pressed", "false");

            });

            button.classList.add("selected");

            button.setAttribute("aria-pressed", "true");

        });

    });

}


/*quantity stuff but i decided to make it add n subtract based on how much bulk orders u wanna get*/



function initializeQuantity(product) {

    let quantity = 1;

    const quantityOutput =
        document.getElementById("quantity");

    const decreaseButton =
        document.getElementById("decrease-quantity");

    const increaseButton =
        document.getElementById("increase-quantity");

    // Use the existing product price element
    const totalPrice =
        document.getElementById("product-price");


    if (!quantityOutput || !decreaseButton ||
        !increaseButton || !totalPrice) {

        console.error("Quantity selector: Missing HTML element.");
        return;

    }


    function updateDisplay() {

        quantityOutput.textContent = quantity;

        const total = product.price * quantity;

        totalPrice.textContent = "₱" +
            total.toLocaleString("en-PH", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

        decreaseButton.disabled = quantity <= 1;

    }


    // Increase quantity
    increaseButton.addEventListener("click", function() {

        quantity++;

        updateDisplay();

    });


    // Decrease quantity
    decreaseButton.addEventListener("click", function() {

        if (quantity > 1) {

            quantity--;

            updateDisplay();

        }

    });


    // Initial display
    updateDisplay();

}



/*order neow*/

function initializeOrder(product) {

    const orderButton =
        document.getElementById("order-now");


    orderButton.addEventListener("click", function() {


        // Get selected product size

        const selectedSize =
            document.querySelector(".size-button.selected");


        if (!selectedSize) {

            alert("Please select a shirt size before ordering.");

            return;

        }


        const size =
            selectedSize.dataset.size;


        // get selected color

        const color =
            product.color;


        // get quantity

        const quantity =
            Number(document.getElementById("quantity").textContent);


        // calculate total

        const totalPrice =
            product.price * quantity;


        // email stuff

        const recipient =
            "orders@examplewebsite142.com";


        const subject =
            `Order Inquiry - ${product.name}`;


        const message =

`Hello Sense!

I would like to inquire about ordering the following product:

Product: ${product.name}
Color: ${color}
Size: ${size}
Quantity: ${quantity}

Unit Price: PHP ${product.price.toFixed(2)}
Total Price: PHP ${totalPrice.toFixed(2)}

Please let me know how I can proceed with my order.

Thank you!`;


        // Encode email contents

        const mailtoLink =

            `mailto:${recipient}` +

            `?subject=${encodeURIComponent(subject)}` +

            `&body=${encodeURIComponent(message)}`;


        // Open the visitor's email application

        window.location.href = mailtoLink;

    });

}


/* 9. contact us form!!!!!*/

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const message =
            document.getElementById("message").value.trim();


        // email recipient

        const recipient =
            "hello@examplewebsite142.com";


        const subject =
            encodeURIComponent("Website Inquiry");


        const body = encodeURIComponent(

            `Name: ${name}\n` +

            `Email: ${email}\n` +

            `Message: ${message}`

        );


        // open email application

        const mailtoLink =

            `mailto:${recipient}` +

            `?subject=${subject}` +

            `&body=${body}`;


        window.location.href = mailtoLink;

    });

}
