if (document.querySelectorAll) {
    function load(elements) {
        elements.forEach(a => {
            a.addEventListener("click", function (event) {
                event.preventDefault();
                a.classList.add("fadeOut")
                a.addEventListener('animationend', () => {
                    console.log(a.href)
                    fetch(a.href).then(body => body.text()).then(body => {
                        console.log(body)
                        document.body.innerHTML = body
                        load(document.querySelectorAll(".info,.terug"));
                        
                    })
                });

            });
        })
    }
    load(document.querySelectorAll(".info,.terug"));
}