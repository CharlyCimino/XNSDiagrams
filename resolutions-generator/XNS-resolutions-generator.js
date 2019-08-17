window.onload = function() {
    var diagramBuilder, diagram, p, t1, t2, img;
    diagramBuilder = new XNSDiagram();
    document.title = titulo + "-RESUELTO" // titulo declarado en el .js
    p = document.createElement("p");
    p.classList.add("nombre")
    p.innerHTML = titulo;
    t1 = document.createElement("h1");
    t1.innerHTML = "Diagrama de clases";
    t2 = document.createElement("h1");
    t2.innerHTML = "Explotación de métodos";
    img = document.createElement("img");
    img.src = titulo + ".png" // titulo declarado en el .js

    document.body.appendChild(p);
    document.body.appendChild(t1);
    document.body.appendChild(img);
    document.body.appendChild(t2);
    metodosNS.forEach(metodo => {
        var divNS = document.createElement("div");
        document.body.appendChild(divNS)
        diagramBuilder.render(divNS, metodo);
    });
}