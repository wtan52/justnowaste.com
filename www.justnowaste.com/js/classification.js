var currentLocation = window.location;

var url = new URL(currentLocation);
var target = url.searchParams.get("target");

var url = '';

if (target == "Total_Land_Waste_Amount") {
    var url = 'https://just-no-waste.s3-ap-southeast-2.amazonaws.com/Total_Land_Waste_Amount.json';
    document.getElementById("class-name").innerHTML = "Land Waste";
} else if (target == "Total_Air_Fugitive_Waste_Amount") {
    var url = 'https://just-no-waste.s3-ap-southeast-2.amazonaws.com/Total_Air_Fugitive_Waste_Amount.json';
    document.getElementById("class-name").innerHTML = "Air Fugitive Waste";

} else if (target == "Total_Air_Point_Waste_Amount") {
    var url = 'https://just-no-waste.s3-ap-southeast-2.amazonaws.com/Total_Air_Point_Waste_Amount.json';
    document.getElementById("class-name").innerHTML = "Air Point Waste";

} else if (target == "Total_Air_Waste_Amount") {
    var url = 'https://just-no-waste.s3-ap-southeast-2.amazonaws.com/Total_Air_Waste_Amount.json';
    document.getElementById("class-name").innerHTML = "Air Waste";

} else {
    var url = 'https://just-no-waste.s3-ap-southeast-2.amazonaws.com/Total_Water_Waste_Amount.json';
    document.getElementById("class-name").innerHTML = "Water Waste";

}

fetch(url)
    .then(res => res.json())
    .then(function (data) {

        console.log(data);

        var currentLocation = window.location;

        var url = new URL(currentLocation);
        var target = url.searchParams.get("target");


        for (var i = 1; i < data.length; i++) {

            var results = document.getElementById('results');
            var tr = document.createElement('tr');

            var rank_td = document.createElement('td');
            var facility_name_td = document.createElement('td');
            var total_class_amount_td = document.createElement('td');
            var btn_td = document.createElement('BUTTON');

            var subString = data[i].substance_name;

            btn_td.id = i;
            btn_td.onclick = function (data) {
                window.location.href = "substances.html?substance_name=" + subString;
            };

            var rank_name = document.createTextNode(i);
            var facility_names = document.createTextNode(data[i].facility_name);

            if (target == "Total_Land_Waste_Amount") {

                var total_class_amount = document.createTextNode(data[i].Total_Land_Waste_Amount);

            } else if (target == "Total_Air_Fugitive_Waste_Amount") {

                var total_class_amount = document.createTextNode(data[i].Total_Air_Fugitive_Waste_Amount);

            } else if (target == "Total_Air_Point_Waste_Amount") {

                var total_class_amount = document.createTextNode(data[i].Total_Air_Point_Waste_Amount);

            } else if (target == "Total_Air_Waste_Amount") {

                var total_class_amount = document.createTextNode(data[i].Total_Air_Waste_Amount);

            } else if (target == "Total_Water_Waste_Amount") {

                var total_class_amount = document.createTextNode(data[i].Total_Water_Waste_Amount);

            }


            var action_button = document.createTextNode("Impacts");


            rank_td.appendChild(rank_name);
            facility_name_td.appendChild(facility_names);
            total_class_amount_td.appendChild(total_class_amount);
            btn_td.appendChild(action_button);

            tr.appendChild(rank_td);
            tr.appendChild(facility_name_td);
            tr.appendChild(total_class_amount_td);
            tr.appendChild(btn_td);

            results.appendChild(tr);
        }

    })
    .catch(function (e) {
        console.log("Error:", e);
    });
