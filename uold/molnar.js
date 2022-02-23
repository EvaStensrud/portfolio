

    let twrk = {};


    //COORDINATES

    twrk.scale = function ({ width, height }) {
        if (width) {
            twrk.width = width;
            twrk.res = window.innerWidth / twrk.width;
            twrk.height = window.innerHeight / twrk.res;
        } else if (height) {
            twrk.height = height;
            twrk.res = window.innerHeight / twrk.height;
            twrk.width = window.innerWidth / twrk.res;
        }
        twrk.center = { x: twrk.width / 2, y: twrk.height / 2 };
    }
    twrk.scale({ height: 120 });


    //SVG

    let svg = {};

    svg.nameSpace = "http://www.w3.org/2000/svg";

    svg.path = function (ia) {

        let output = "M ";
        for (var i = 0; i < ia.length; i++) {
            output += ia[i].x * twrk.res + " " + ia[i].y * twrk.res + " ";
        }
        output += "z";

        return output;
    };

    svg.makeLayer = function ({ parent, id, x = 0, y = 0 }) {
        dom[id] = document.createElementNS(svg.nameSpace, "svg");
        dom[id].id = id;
        dom[id].style.transform = "translateX(" + (x * twrk.res) + "px) translateY(" + (y * twrk.res) + "px)";
        parent.appendChild(dom[id]);
    };

    svg.makeLine = function ({ parent, id, d = "", color = "#ff00ff", stroke = 1, cap = "butt", join = "round" }) {
        dom[id] = document.createElementNS(svg.nameSpace, "path");
        dom[id].setAttributeNS(null, "fill", "none");
        dom[id].setAttributeNS(null, "d", d);
        dom[id].setAttributeNS(null, "stroke-width", stroke * twrk.res);
        dom[id].setAttributeNS(null, "stroke", color);
        dom[id].setAttributeNS(null, "stroke-linecap", cap);
        dom[id].setAttributeNS(null, "stroke-join", join);
        dom[id].id = id;
        parent.appendChild(dom[id]);
    };

    svg.makeShape = function ({ parent, id, d = "", color = "#ff00ff" }) {
        dom[id] = document.createElementNS(svg.nameSpace, "path");
        dom[id].setAttributeNS(null, "fill", color);
        dom[id].setAttributeNS(null, "d", d);
        dom[id].id = id;
        parent.appendChild(dom[id]);
    };


    //DOM

    let dom = {};

    //stage
    dom.stage = document.createElement("stage");
    dom.stage.style.transform = "translateX(" + (twrk.center.x * twrk.res) + "px) translateY(" + (twrk.center.y * twrk.res) + "px)";
    dom.stage.id = "stage";
    document.body.appendChild(dom.stage);

    //svg layer
    svg.makeLayer({ parent: dom.stage, id: "svgLayer", x: 0, y: 0 });

    //drawing
   
    svg.makeShape({ parent: dom.svgLayer, id: "form", color: "#be250a", d: svg.path([{ x: -24, y: -27}, { x: -21, y: 27 }, { x: -24, y: 27 }, {x: -21, y: -27}]) })
    svg.makeShape({ parent: dom.svgLayer, id: "form", color: "#be250a", d: svg.path([{ x: -15, y: -27}, { x: -12, y: 27 }, { x: -15, y: 27 }, {x: -12, y: -27}]) })
    svg.makeShape({ parent: dom.svgLayer, id: "form", color: "#be250a", d: svg.path([{ x: -6, y: -27}, { x: -3, y: 27 }, { x: -6, y: 27 }, {x: -3, y: -27}]) })
    svg.makeShape({ parent: dom.svgLayer, id: "form", color: "#be250a", d: svg.path([{ x: 15, y: -27}, { x: 12, y: 27 }, { x: 12, y: 27}, {y: -27}]) })
    //svg.makeLine({ parent: dom.svgLayer, id: "linie", stroke: 1, color: "#f0f", d: svg.path([{ x: -50, y: -50 }, { x: 50, y: 30 }]) })
    svg.makeShape({ parent: dom.svgLayer, id: "form", color: "#be250a", d: svg.path([{ x: 24, y: -27}, { x: 21, y:27 }, { x: 24, y: 27 }, {x: 21, y: -27}]) })
    svg.makeShape({ parent: dom.svgLayer, id: "form", color: "#be250a", d: svg.path([{ x: 3, y: -27}, { x: 0, y: 27 }, { x: 3, y: 27 }, {x: 0, y: -27}]) })
    svg.makeShape({ parent: dom.svgLayer, id: "form", color: "#be250a", d: svg.path([{ x: 21, y: -27}, { x: 18, y: 27 }, { x: 21, y: 27 }, {x: 18, y: -27}]) })
    svg.makeShape({ parent: dom.svgLayer, id: "form", color: "#be250a", d: svg.path([{ x: 9, y: -27}, { x: 6, y: 27 }, { x: 9, y: 27 }, {x: 6, y: -27}]) })
    svg.makeShape({ parent: dom.svgLayer, id: "form", color: "#be250a", d: svg.path([{ x: 18, y: -27}, { x: 15, y: 27 }, { x: 18, y: 27 }, {x: 15, y: -27}]) })

    //svg.makeLine({ parent: dom.svgLayer, id: "punkt", cap: "round", stroke: 10, color: "#ff0", d: svg.path([{ x: -30, y: -30 }]) })


</script>

</html>