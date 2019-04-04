
if (document.querySelectorAll) {
    function load(elements) {
        elements.forEach(a => {
            a.addEventListener("click", function (event) {
                if (offline === true) {
                    console.log("offline")
                    event.preventDefault();
                    alert("je bent offline");
                } else {
                    console.log("online")
                    event.preventDefault();
                    a.classList.add("fadeFast")
                    fade(document.querySelectorAll(".info,.terug"));
                    a.addEventListener('animationend', () => {
                        console.log(a.href)
                        fetch(a.href).then(body => body.text()).then(body => {
                            console.log(body)
                            document.body.innerHTML = body
                            load(document.querySelectorAll(".info,.terug"));
                            handler();
                        })
                    });
                }
            });
        })
    }

    function fade(elements) {
        elements.forEach(a => {

            a.classList.add("fadeOut")

        })

    }


    function handler() {
        const first = document.querySelector("#first");
        const second = document.querySelector("#second");

        setInterval(function () {
            first.classList.toggle("visible")
            first.classList.toggle("inVisible")
            second.classList.toggle("visible")
            second.classList.toggle("inVisible")
            console.log("ding")
        }, 2000)
    }
    handler()
    load(document.querySelectorAll(".info,.terug"));
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}