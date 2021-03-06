
const train_data = [
  ["Sarı", 1, "Kavun"], ["Sarı", 1, "Kavun"], ["Sarı", 1, "Kavun"],  ["Sarı", 1, "Kavun"], ["Sarı", 1, "Kavun"],
  ["Sarı", 2, "Kavun"], ["Sarı", 2, "Kavun"], ["Sarı", 2, "Kavun"], ["Sarı", 2, "Kavun"], ["Sarı", 2, "Kavun"],
  ["Sarı", 3, "Kavun"], ["Sarı", 3, "Kavun"], ["Sarı", 3, "Kavun"], ["Sarı", 3, "Kavun"], ["Sarı", 3, "Kavun"], ["Sarı", 3, "Kavun"], ["Sarı", 3, "Kavun"],
  ["Sarı", 4, "Kavun"], ["Sarı", 4, "Kavun"], ["Sarı", 4, "Kavun"], ["Sarı", 4, "Kavun"],
  ["Sarı", 5, "Kavun"], ["Sarı", 5, "Kavun"], ["Sarı", 5, "Kavun"], ["Sarı", 5, "Kavun"],
  ["Sarı", 6, "Kavun"], ["Sarı", 6, "Kavun"], ["Sarı", 6, "Kavun"],
  ["Sarı", 7, "Kavun"],
  ["Sarı", 10, "Kavun"], ["Sarı", 10, "Kavun"],
  ["Sarı", 12, "Kavun"], ["Sarı", 12, "Kavun"],
  ["Yeşil", 3, "Karpuz"],
  ["Yeşil", 4, "Karpuz"],
  ["Yeşil", 6, "Karpuz"], ["Yeşil", 6, "Karpuz"],
  ["Yeşil", 7, "Karpuz"],
  ["Yeşil", 9, "Karpuz"], ["Yeşil", 9, "Karpuz"], ["Yeşil", 9, "Karpuz"], ["Yeşil", 9, "Karpuz"],
  ["Yeşil", 10, "Karpuz"], ["Yeşil", 10, "Karpuz"], ["Yeşil", 10, "Karpuz"], ["Yeşil", 10, "Karpuz"], ["Yeşil", 10, "Karpuz"],
  ["Yeşil", 11, "Karpuz"], ["Yeşil", 11, "Karpuz"], ["Yeşil", 11, "Karpuz"], ["Yeşil", 11, "Karpuz"], ["Yeşil", 11, "Karpuz"],
  ["Yeşil", 12, "Karpuz"], ["Yeşil", 12, "Karpuz"], ["Yeşil", 12, "Karpuz"], ["Yeşil", 12, "Karpuz"],
  ["Yeşil", 13, "Karpuz"], ["Yeşil", 13, "Karpuz"], ["Yeşil", 13, "Karpuz"], ["Yeşil", 13, "Karpuz"], ["Yeşil", 13, "Karpuz"], ["Yeşil", 13, "Karpuz"], ["Yeşil", 13, "Karpuz"],
  ["Yeşil", 14, "Karpuz"], ["Yeşil", 14, "Karpuz"], ["Yeşil", 14, "Karpuz"], ["Yeşil", 14, "Karpuz"], ["Yeşil", 14, "Karpuz"], ["Yeşil", 14, "Karpuz"], ["Yeşil", 14, "Karpuz"], ["Yeşil", 14, "Karpuz"],
];

const test_data = [["Sarı", 3, "Kavun"], ["Sarı", 4, "Kavun"], ["Sarı", 5, "Kavun"],
  ["Sarı", 5, "Kavun"], ["Sarı", 5, "Kavun"], ["Sarı", 6, "Kavun"],
  ["Sarı", 6, "Kavun"], ["Yeşil", 7, "Karpuz"], ["Yeşil", 7, "Karpuz"],
  ["Sarı", 7, "Kavun"], ["Yeşil", 8, "Karpuz"], ["Yeşil", 9, "Karpuz"],
  ["Yeşil", 9, "Karpuz"], ["Yeşil", 9, "Karpuz"], ["Yeşil", 11, "Karpuz"],
  ["Yeşil", 12, "Karpuz"], ["Yeşil", 12, "Karpuz"], ["Yeşil", 13, "Karpuz"]];

const buttonWidth = 180;
const buttonHeight = 60;
const  maxFrequency = 8;
const rectWidth = 70;
const rectHeight = 70;
const maxDiameter = 14;
const buttonX = innerWidth * 0.65;
const buttonY = innerHeight * 0.84;
const radius_label = [4,6,7,10,12,13,16,18,21,23,24,27,30];

let fruitPlaces = [];
let validDiameterIndex = 1;
let radiusDict = {};
let rectangleData = [];
let isDatasetTraining = true;
function manipulateRectangleData(data){
    radiusDict = {};
    rectangleData = [];
    data.forEach((entry)=>{
        if (radiusDict.hasOwnProperty(entry[1])){
            radiusDict[entry[1]].push(entry[2]);
        } else {
            radiusDict[entry[1]] = [entry[2]];
        }
    });
    Object.keys(radiusDict).forEach(function(d, i){
        rectangleData.push({'x': 105 * i + 50, 'y': 10, 'label': d, 'text': radius_label[i], 'color': 'beige'})
    });
}
function calculateFruitPlaces(){
    fruitPlaces = []
    for(let i = 0; i < maxFrequency; i++){
        for(let j = 1; j <= maxDiameter; j++){
            if(j in radiusDict) {
                if (i < radiusDict[j].length) {
                    if (radiusDict[j][i] === 'Karpuz') {
                        fruitPlaces.push({'x': 105 * validDiameterIndex - 55, 'y': 68 * i + 95, 'fruit_img': 'watermelon.png'})
                    } else {
                        fruitPlaces.push({'x': 105 * validDiameterIndex - 55, 'y': 68 * i + 95, 'fruit_img': 'melon.png'})
                    }
                }
                validDiameterIndex++;
            }
        }
        validDiameterIndex = 1
    }
}

//Section 0
const s0svg = d3.select("body").append("svg")
                                .style("background-color", "blue")
                                .attr("width", innerWidth)
                                .attr("id", "section0")
                                .attr("height", innerHeight);
//Section 1

const s1svg = d3.select("body").append("svg")
                                .style("background-color", "blue")
                                .attr("width", innerWidth)
                                .attr("id", "section1")
                                .attr("height", innerHeight);
const infoTextPost = [{x : innerWidth / 8, y : 50, text: "Elimizde Mehmet ve Ahmet'in tezgahlarındaki karpuz ve kavunların çap bilgileri var." +
    "<br><br>Amacımız karpuz ve kavunları birbirinden ayıran bir çap değeri bulmak." +
    "<br><br>Yani öyle bir çap değeri bulmalıyız ki onun üstündekilere karpuz altındakilere kavun diyebilelim"}] //'Faruk reistir'

s1svg.selectAll("text.infoText")
        .data(infoTextPost)
        .enter()
        .append("foreignObject")
        .attr("width", innerWidth / 1.5)
        .attr("height", 500)
        .attr("x", (d)=>{
           return d.x;
        })
        .attr("y", (d)=>{
            return d.y;
        })
        .append("xhtml:body")
        .style("font", "50px 'Arial'")
        .style("color", "white")
        .html((d)=>{
            return d.text;
        });






//Initial settings
manipulateRectangleData(train_data);
calculateFruitPlaces();

const s2svg = d3.select("body").append("svg")
                                .attr("width", innerWidth)
                                .attr("id", "section2")
                                .attr("height", innerHeight);

s2svg.append("text")
    .attr("x", innerWidth / 2.1)
    .attr("y", innerHeight * 0.9)
    .attr("baseline-alignment", "middle")
    .attr("text-anchor", "middle")
    .attr("font-size", 50)
    .attr("class", "tezgah_name")
    .text("Mehmet'in Tezgahı");

s2svg.append("rect")
        .attr('x', buttonX)
        .attr('y', buttonY)
        .attr('width', buttonWidth)
        .attr('height', buttonHeight)
        .attr("fill", "green")
        .attr('class', "button_rect")
        .attr('rx', 15)
        .attr('ry', 15)
        .on('click', ()=>{
            (isDatasetTraining)? calculateTest() : againTrain()
        });

s2svg.append("text")
    .attr("x", buttonX + buttonWidth / 2)
    .attr("y", buttonY + buttonHeight / 2)
    .attr("alignment-baseline", "middle")
    .attr("text-anchor", "middle")
    .attr("font-size", 18)
    .attr("class", "button_text")
    .attr("fill", "white")
    .on('click', () =>{ (isDatasetTraining)? calculateTest() : againTrain() })
    .text("Modeli Test Et");


var rectangles = s2svg.selectAll("rect.palette")
                            .data(rectangleData)
                            .enter()
                            .append("rect")
                            .attr("fill","beige")
                            .attr("class", "palette")
                            .attr("x", function (d) { return d.x; })
                            .attr("y", function (d) { return d.y; })
                            .attr("rx", 15)
                            .attr("width", function (d) { return 73; })
                            .attr("height", function (d, i) { return rectHeight * radiusDict[Object.keys(radiusDict)[i]].length + 80});
var texts = s2svg.selectAll("text.label")
    .data(rectangleData)
    .enter()
    .append('text')
    .attr("alignment-baseline", "middle")
    .attr("text-anchor", "middle")
    .classed('label', true)
    .transition()
    .duration(1000)
    .attr('x', calculateXForText)
    .attr('y', function (d) {
        return 55;
    })
    .attr("fill", "black")
    .text(function (d) {
        return d.text + "cm";
    })
    .style("font-size", "30px");
s2svg.selectAll("image").data(fruitPlaces).enter().append("svg:image").classed('fruit', true)
                            .transition().delay(1000).ease(d3.easeElastic).duration(2000)
                            .attr('x', function(d){
                                return d.x;
                            })
                            .attr('y', function(d){
                                return d.y;
                            })
                            .attr('width', rectWidth)
                            .attr('height', rectHeight)
                            .attr("xlink:href", function (d) {
                                return "../icons/" + d.fruit_img;
                            });
function calculateXForText(d, i){
    return 105 * i + 87;
}

//vtrcexrdctfyvgbhunıjıhbgvfcdrxsezxrdctfvygbuhnıjmoköjnhbgvftcdrxsexrdtfgybhunjımkoökjnhubgyvftcdrxseawzesxrdctfvg
function paintRectangles(){
    rectangleData.forEach(function (d, index) {
        if(+radius_label[index] >= theValue){
            d.color = "rgb(11, 229, 15)"
        } else {
            d.color = "rgb(228, 239, 14)"
        }
    });
}
function update(theValue){
    paintRectangles();
    s2svg.selectAll("rect.palette")
                            .data(rectangleData)
                            .transition()
                            .attr('fill', function (d) {
                                return d.color;
                            })
                            .duration(1100)
                            .ease(d3.easeBounce)
}
function calculateAccuracy(){
    let checkImgsData = [];
    let valid = 0;
    let invalid = 0;
    rectangleData.forEach(function(d, i){
        radiusDict[d.label].forEach(function(fruit, j){
            console.log(fruit, d.color);
            var resultImg = "success.png";
            if(d.color === "rgb(228, 239, 14)" && fruit === "Karpuz"){
                invalid++;
                resultImg = "error.png";
            }else if (d.color === "rgb(228, 239, 14)" && fruit === "Kavun"){
                valid++;
                resultImg = "success.png";
            }else if (d.color === "rgb(11, 229, 15)" && fruit === "Karpuz"){
                valid++;
                resultImg = "success.png"
            }else if (d.color === "rgb(11, 229, 15)" && fruit === "Kavun"){
                invalid++;
                resultImg = "error.png";
            }
            checkImgsData.push({'x': 105 * i + 50,'y': 68 * j + 95, 'resultImg': resultImg})
        });
    });
    const accuracy = valid / (valid + invalid) * 100;
    return [checkImgsData, accuracy];
}

function calculateTest(){
    isDatasetTraining = false;
    manipulateRectangleData(test_data);
    paintRectangles();
    calculateFruitPlaces();
    d3.select("text.button_text").text("Yeni Model Kur")
    d3.select("text.tezgah_name").text("Ahmet'in Tezgahı")

    //DANGEROUS HERE ANY OTHER g would be affected by that
    d3.select('.sliderAll').style('opacity','0');

    d3.selectAll('.button__text').text("Yeni Model Kur")
    s2svg.selectAll("rect.palette")
                            .data(rectangleData)
                            .attr("height", function (d, i) { return rectHeight * radiusDict[Object.keys(radiusDict)[i]].length + 80})
                            .attr('fill', function(d){return d.color})
                            .exit()
                                .remove();
    s2svg.selectAll("text.label")
        .data(rectangleData)
        .text(function(d){return d.text + "cm"})
        .attr('x', calculateXForText).exit().remove();



    const accuracyResults = calculateAccuracy();
    const checkImgsData = accuracyResults[0];
    const accuracy = accuracyResults[1].toFixed(0);

    s2svg.selectAll("image.tick").style('display', "block")
                            .data(checkImgsData)
                            .attr("xlink:href", function (d) {
                                return "../icons/" + d.resultImg;
                            })
                            .raise()
                            .enter()
                                .append("svg:image")
                                .classed('tick', true)
                                .transition()
                                .attr('x', function(d){
                                    return d.x;
                                })
                                .attr('y', function(d){
                                    return d.y;
                                })
                                .attr('width', rectWidth / 2)
                                .attr('height', rectHeight / 2)
                                .attr("xlink:href", function (d) {
                                    return "../icons/" + d.resultImg;
                                });

    s2svg.selectAll("image.fruit").data(fruitPlaces)
                            .attr('x', function(d){
                                return d.x;
                            })
                            .attr('y', function(d){
                                return d.y;
                            })
                            .attr('width', rectWidth)
                            .attr('height', rectHeight)
                            .attr("xlink:href", function (d) {
                                return "../icons/" + d.fruit_img;
                            }).exit().remove();

    s2svg.selectAll("text.accuracy").style('display',"block")
        .data([accuracy])
        .text("Başarı oranı: %" + 0)
        .enter()
        .append("text")
        .classed("accuracy", true)
        .text("Başarı oranı: %" + 0)
        .transition()
        .ease(d3.easeCircle)
        .duration(200)
        .attr("x", innerWidth * 0.7)
        .attr("y", innerHeight / 2);

    s2svg.selectAll("text.accuracy")
        .data([accuracy])
        .style("font-size", "30px")
        .transition()
        .duration(3000)
                .tween("text", function(d) {
                    var self = this;
                    var i = d3.interpolate(this.textContent, d),
                        prec = (d + "").split("."),
                        round = (prec.length > 1) ? Math.pow(10, prec[1].length) : 1;

                    return function(t) {
                        self.textContent = "Başarı oranı: %" + Math.round(i(t) * round) / round;
                    };
                });
}

function againTrain(){
    isDatasetTraining = true;
    manipulateRectangleData(train_data);
    paintRectangles();
    calculateFruitPlaces();

    console.log(radiusDict);
    console.log(rectangleData);

    d3.selectAll('text.button_text').text("Modeli Test Et");
    d3.selectAll('text.tezgah_name').text("Mustafa'nın Tezgahı");
    s2svg.selectAll("image.tick").style('display','none');
    s2svg.select(".sliderAll").style("opacity", '1');
    s2svg.selectAll('text.accuracy').style('display', 'none');
    s2svg.selectAll("rect.palette")
                            .data(rectangleData)
                            .enter()
                                .append("rect")
                                .attr('x', function(d) {return d.x})
                                .attr('y', function(d) {return d.y})
                                .attr("class", "palette")
                                .attr('width', rectWidth)
                                .attr("rx", 15)
                                .attr('height', rectHeight)
                                .attr('fill', function(d){return d.color});
    //Apply to both new-comers and old ones
    s2svg.selectAll("rect.palette").data(rectangleData)
        .attr("height", function (d, i) { return rectHeight * radiusDict[Object.keys(radiusDict)[i]].length + 80})
    //    .lower();
    s2svg.selectAll("text.label")
                .data(rectangleData)
                .text(function(d){return d.text + "cm"})
                .enter()
                    .append('text')
                    .classed('label', true)
                    .text(function(d){return d.text + "cm"})
                    .attr("alignment-baseline", "middle")
                    .attr("text-anchor", "middle")
                    .attr('x', calculateXForText)
                    .attr('y', 55)
                    .attr("fill", "black")
                    .style("font-size", "30px");

    s2svg.selectAll("image.fruit")
                .data(fruitPlaces)
                .attr('x', function(d){
                    return d.x;
                })
                .attr('y', function(d){
                    return d.y;
                })
                .attr("xlink:href", function (d) {
                    return "../icons/" + d.fruit_img;
                })
                .raise()
                .enter()
                    .append("svg:image")
                    .classed("fruit", true)
                    .attr('x', function(d){
                        return d.x;
                    })
                    .attr('y', function(d){
                        return d.y;
                    })
                        .attr("rx", 15)
                    .attr('width', rectWidth)
                    .attr('height', rectHeight)
                    .attr("xlink:href", function (d) {
                        return "../icons/" + d.fruit_img;
                    });
}

//scroll

d3.select("#scroll2").style("top", 2 * innerHeight * 0.95+ "px");
d3.select("#scroll1").style("top", innerHeight * 0.9 + "px");
d3.select("#scroll1").style("left", innerWidth * 0.68 + "px");
d3.select("#scroll2").style("left", innerWidth * 0.68 + "px");