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
    twrk.scale({ height: 150 });


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

    svg.paths = function (ia) {

        let output = "";
        for (var i = 0; i < ia.length; i++) {
            output += svg.path(ia[i]);
        }
        return output;
    };

    svg.makeLayer = function ({ parent, id, x = 0, y = 0 }) {
        dom[id] = document.createElementNS(svg.nameSpace, "svg");
        dom[id].id = id;
        dom[id].style.transform = "translateX(" + (x * twrk.res) + "px) translateY(" + (y * twrk.res) + "px)";
        parent.appendChild(dom[id]);
    };

    svg.makeLine = function ({ parent, id, d = "", color = "black", stroke = 2, cap = "butt", join = "round" }) {
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

    svg.makeShape = function ({ parent, id, d = "", color = "black" }) {
        dom[id] = document.createElementNS(svg.nameSpace, "path");
        dom[id].setAttributeNS(null, "fill", color);
        dom[id].setAttributeNS(null, "d", d);
        dom[id].id = id;
        parent.appendChild(dom[id]);
    };

    //drehung
    lineRotation = function ({ point, long, rotation}) {
        return [{x: point.x, y: point.y}, {x: point.x + Math.sin(rotation)*10, y:point.y + Math.cos(rotation)*30}]; 
    };

    console.log(lineRotation({point: {x: -5, y: -5}, long: -200, rotation: 1.5}))


    //DOM

    let dom = {};

    //stage
    dom.stage = document.createElement("stage");
    dom.stage.style.transform = "translateX(" + (twrk.center.x * twrk.res) + "px) translateY(" + (twrk.center.y * twrk.res) + "px)";
    dom.stage.id = "stage";
    document.body.appendChild(dom.stage);

    //svg layer
    svg.makeLayer({ parent: dom.stage, id: "svgLayer", x: 0, y: 0 });

    let simplex = new SimplexNoise();

    //drawing
      
        let step = 5;
        let position = {x: -50, y: -80};
        let resolution = 1; // wie man die auflösung einstellt ist sehr wichtig.. 
        let speed = 0.0001;

        svg.makeLine({parent: dom.svgLayer, id: "lines", cap: "round", stroke: 0.5, color: "black", d: ""});

        function loop(time) {
           
            let collect = [];

            for (let y =5; y < 25; y++) {
                for (let x = 0; x < 25; x++) {

                    //let radian = simplex.noise2D (x * resolution, y * resolution) * Math.PI;

                    // let foo = simplex.noise2D(2, 1)

                    // Rotationswinkel bestimmen
                    // Zufallsfaktor (Perlin)
                    let perlinX = x * resolution
                    let perlinY = y * resolution
                    let perlinZ = time * speed

                    let perlinFactor = simplex.noise3D (perlinX, perlinY, perlinZ)
                    // console.log(perlinFactor)
                    let oneEighty = Math.PI
                    let radian =  perlinFactor * oneEighty; // statt y nehmen wir time
                    
                    // Variablen-Recycling: die Werte von vorher werden nicht mehr gebraucht, aber 
                    // es wird nochmal der genau gleiche Ablauf gemacht, darum können sie überschrieben werden.
                    perlinX = y * resolution
                    perlinY = y * resolution
                    perlinZ = time * speed
                    let perlinFactorLength = simplex.noise3D (perlinX, perlinY, perlinZ) + 1;

                    let distance = perlinFactorLength * 3; //Linienlaenge
         
                    collect.push(lineRotation({
                        point: {x: position.x + x * step, y: position.y + y * step},
                        rotation: radian/4 + Math.PI,
                        long: distance 
                    }));
                }
            }
            
            dom["lines"].setAttributeNS(null, "d", svg.paths(collect));

            requestAnimationFrame(loop); // diese Funktion ist wichtig.. 
    };

    loop(); // loop aufrufen