document.addEventListener("DOMContentLoaded", function() {
    const shopLink = document.querySelectorAll('a[href^="#shop"]');
    shopLink.forEach(link => {
        link.addEventListener("click", function(event) {
            const shopSection = document.querySelector("#shop");
            if (shopSection) {
                event.preventDefault();
                shopSection.scrollIntoView({
                     behavior: "smooth", 
                     block: "start"
                });
            }
        });
    });
});