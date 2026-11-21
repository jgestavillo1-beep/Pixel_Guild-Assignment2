const products = {
    "dont-be-late": {
        name: "Don't Be Late Tee",
        description: "A simple reminder to show up, get moving, and make the most of the day.",
        price: 499,
        color: "White",
        colorHex: "#FFFFFF",
        images: [
            "../images/products/dont-be-late-front.jpg",
            "../images/products/dont-be-late-back.jpg"
        ],
        imageLabels: ["FRONT", "BACK"]
    },
    "find-your-comfort": {
        name: "Everyday Comfort Tee",
        description: "A plain, comfortable tee designed for everyday wear.",
        price: 499,
        color: "Beige",
        colorHex: "#D8C5A3",
        images: [
            "../images/products/find-your-comfort-front.jpg",
            "../images/products/find-your-comfort-back.jpg"
        ],
        imageLabels: ["FRONT", "BACK"]
    },
    "do-good-work": {
        name: "Do Good Work Tee",
        description: "A simple statement for people who believe good work speaks for itself.",
        price: 499,
        color: "Black",
        colorHex: "#222222",
        images: [
            "../images/products/do-good-work-front.jpg",
            "../images/products/do-good-work-back.jpg"
        ],
        imageLabels: ["FRONT", "BACK"]
    }
};

const productKey = document.body.dataset.product;
const currentProduct = products[productKey];
if (currentProduct) {
    initializeProductPage(currentProduct);
}
function initializeProductPage(product) {
    const productName = document.getElementById("product-name");
    const productDescription = document.getElementById("product-description");
    const productPrice = document.getElementById("product-price");
    if (!productName || !productDescription || !productPrice) {
        console.error("Product page is missing one or more required HTML elements.");
        return;
    }
    document.title = `${product.name} | Sense`;
    productName.textContent = product.name;
    productDescription.textContent = product.description;
    initializeGallery(product);
    initializeColor(product);
    initializeSize();
    initializeQuantity(product);
    initializeOrder(product);
}
function initializeGallery(product) {
    const productImage = document.getElementById("product-image");
    const imageLabel = document.getElementById("image-view-label");
    const previousButton = document.getElementById("previous-image");
    const nextButton = document.getElementById("next-image");
    if (!productImage || !imageLabel || !previousButton || !nextButton) {
        console.error("Product gallery is missing one or more HTML elements.");
        return;
    }
    let currentImageIndex = 0;
    function updateGallery() {
        productImage.src = product.images[currentImageIndex];
        productImage.alt = `${product.imageLabels[currentImageIndex]} view of ${product.name}`;
        imageLabel.textContent = product.imageLabels[currentImageIndex];
        previousButton.disabled = currentImageIndex === 0;
        nextButton.disabled = currentImageIndex === product.images.length - 1;
    }
    // Previous image
    previousButton.addEventListener("click", function () {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateGallery();
        }
    });
    // Next image
    nextButton.addEventListener("click", function () {
        if (currentImageIndex < product.images.length - 1) {
            currentImageIndex++;
            updateGallery();
        }
    });
    // Display initial image
    updateGallery();
}
function initializeColor(product) {
    const colorSwatch = document.getElementById("color-swatch");
    const selectedColor = document.getElementById("selected-color");
    if (!colorSwatch || !selectedColor) {
        console.error("Product color controls are missing from the page.");
        return;
    }
    colorSwatch.style.backgroundColor = product.colorHex;
    colorSwatch.setAttribute("aria-label", `Selected color: ${product.color}`);
    selectedColor.textContent = product.color;
    colorSwatch.addEventListener("click", function () {
        colorSwatch.classList.add("selected");
        colorSwatch.setAttribute("aria-pressed", "true");
    });
}
function initializeSize() {
    const sizeButtons = document.querySelectorAll(".size-button");
    sizeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            // Remove previous selection
            sizeButtons.forEach(function (item) {
                item.classList.remove("selected");
                item.setAttribute("aria-pressed", "false");
            });
            // Select clicked size
            button.classList.add("selected");
            button.setAttribute("aria-pressed", "true");
        });
    });
}
function initializeQuantity(product) {
    let quantity = 1;
    const quantityOutput = document.getElementById("quantity");
    const decreaseButton = document.getElementById("decrease-quantity");
    const increaseButton = document.getElementById("increase-quantity");
    const totalPrice = document.getElementById("product-price");
    if (!quantityOutput || !decreaseButton || !increaseButton || !totalPrice) {
        console.error("Quantity selector is missing one or more HTML elements.");
        return;
    }
    function updateDisplay() {
        quantityOutput.textContent = quantity;
        const total = product.price * quantity;
        totalPrice.textContent = "₱" + total.toLocaleString("en-PH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        decreaseButton.disabled = quantity <= 1;
    }
    // Increase quantity
    increaseButton.addEventListener("click", function () {
        quantity++;
        updateDisplay();
    });
    // Decrease quantity
    decreaseButton.addEventListener("click", function () {
        if (quantity > 1) {
            quantity--;
            updateDisplay();
        }
    });
    // Initial display
    updateDisplay();
}
function initializeOrder(product) {
    const orderButton = document.getElementById("order-now");
    const feedback = document.getElementById("order-feedback");
    if (!orderButton) {
        console.error("Order Now button was not found.");
        return;
    }
    orderButton.addEventListener("click", function () {
        // Get selected product size
        const selectedSize = document.querySelector(".size-button.selected");
        if (!selectedSize) {
            if (feedback) {
                feedback.textContent = "Please select a shirt size before ordering.";
            } else {
                alert("Please select a shirt size before ordering.");
            }
            return;
        }
        const size = selectedSize.dataset.size;
        const color = product.color;
        const quantity = Number(document.getElementById("quantity").textContent);
        const totalPrice = product.price * quantity;
        // Order email recipient
        const recipient = "orders@examplewebsite142.com";
        const subject = `Order Inquiry - ${product.name}`;
        const message = [
            "Hello Sense!",
            "",
            "I would like to inquire about ordering the following product:",
            "",
            `Product: ${product.name}`,
            `Color: ${color}`,
            `Size: ${size}`,
            `Quantity: ${quantity}`,
            "",
            `Unit Price: PHP ${product.price.toFixed(2)}`,
            `Total Price: PHP ${totalPrice.toFixed(2)}`,
            "",
            "Please let me know how I can proceed with my order.",
            "",
            "Thank you!"
        ].join("\r\n");
        // Prepare the email draft
        const mailtoLink =
            `mailto:${recipient}` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(message)}`;
        // Open the visitor's email application
        window.location.href = mailtoLink;
    });

}
function initializeContactForm() {
    const form = document.getElementById("contact-form");
    // Other pages do not contain this form.
    if (!form) {
        return;
    }
    const modalElement = document.getElementById("feedback-modal");
    const continueButton = document.getElementById("continue-email");
    const feedbackIcon = document.getElementById("feedback-icon");
    const feedbackTitle = document.getElementById("feedback-title");
    const feedbackHeading = document.getElementById("feedback-heading");
    const feedbackText = document.getElementById("feedback-text");

    if (!modalElement || !continueButton || !feedbackIcon ||
        !feedbackTitle || !feedbackHeading || !feedbackText ||
        typeof bootstrap === "undefined") {
        console.error("Contact form modal is incomplete or Bootstrap is unavailable.");
        return;
    }
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    const recipient = "hello@examplewebsite142.com";
    let emailLink = "";
    // These paths match the actual PNG files in images/contact/.
    const messages = {
        incomplete: {
            icon: "images/contact/warning-sign-9769_128.png",
            title: "Incomplete Form",
            heading: "Please complete the required fields.",
            text: "Some required information is missing or the email address is invalid. Kindly complete all fields marked with an asterisk (*) before proceeding."
        },
        missing: {
            icon: "images/contact/error-1158_128.png",
            title: "Missing Message",
            heading: "You haven't written a message yet!",
            text: "Please enter your concern, question, or inquiry in the message box before proceeding."
        },
        ready: {
            icon: "images/contact/check-symbol-4794_128.png",
            title: "Ready to Send",
            heading: "Your message is ready!",
            text: "Continue to your email application to review and send your message to Sense."
        }
    };

    function showMessage(key) {
        const item = messages[key];
        feedbackIcon.src = item.icon;
        feedbackTitle.textContent = item.title;
        feedbackHeading.textContent = item.heading;
        feedbackText.textContent = item.text;
        if (key === "ready") {
            continueButton.classList.remove("d-none");
        } else {
            continueButton.classList.add("d-none");
        }
        modal.show();
    }
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const nameField = form.elements["full-name"];
        const emailField = form.elements["email"];
        const phoneField = form.elements["phone"];
        const countryField = form.elements["country"];
        const messageField = form.elements["message"];

        if (!nameField || !emailField || !phoneField || !countryField || !messageField) {
            console.error("A Contact form field is missing or its name attribute has changed.");
            return;
        }
        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const phone = phoneField.value.trim();
        const country = countryField.value.trim();
        const message = messageField.value.trim();

        // Scenario 1: one or more required contact fields are incomplete.
        if (!name || !email || !country || !emailField.checkValidity()) {
            emailLink = "";
            showMessage("incomplete");
            return;
        }
        // Scenario 2: other required information is complete, but message is empty.
        if (!message) {
            emailLink = "";
            showMessage("missing");
            return;
        }
        // Scenario 3: all required information is complete.
        const subject = "Website Inquiry from " + name;
        const body = [
            "Name: " + name,
            "Email: " + email,
            "Phone: " + (phone || "Not provided"),
            "Country/Region: " + country,
            "",
            "Message:",
            message
        ].join("\r\n");

        emailLink = "mailto:" + recipient +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(body);

        showMessage("ready");
    });

    continueButton.addEventListener("click", function () {
        if (emailLink) {
            window.location.href = emailLink;
        }
    });
}

// The script is loaded at the end of the HTML pages. DOMContentLoaded
// also makes initialization safe if the script is later moved to the head.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
        initializeContactForm();
    });
} else {
    initializeContactForm();
}
