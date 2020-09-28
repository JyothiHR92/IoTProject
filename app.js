// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
    apiKey: "",
    authDomain: "iotproject-290319.firebaseapp.com",
    databaseURL: "https://iotproject-290319.firebaseio.com",
    projectId: "iotproject-290319",
    storageBucket: "iotproject-290319.appspot.com",
    messagingSenderId: "705189081050",
    appId: "1:705189081050:web:56081ab5028f8240275ae3"
  };
  firebase.initializeApp(config);
  var firestore = firebase.firestore();

  const docRef = firestore.doc("devices/myiotdevice");
  const outputheader = document.querySelector("#iotDevicedata");
  //const load = document.querySelector("loadButton");

  //loadButton.addEventListener("onclick", function() {
    var temp1_data = [];
    var hum1_data = [];
    var time1_data = [];
    function load(){
      docRef.get().then(function (doc) {
          if(doc && doc.exists) {
            const myData = doc.data();
              console.log("data retreived" + JSON.stringify(myData));
              temp1_data.push(myData.temperature);
              hum1_data.push(myData.humidity);
              time1_data.push(myData.timecollected);
              console.log("templist" +temp1_data[0]); 
              console.log("humlist" +hum1_data[0]); 
              console.log("time"+ time1_data[0]);
              console.log("length"+ time1_data.length);
              console.log("temp" + temp1_data.length);
              console.log("hum" + hum1_data.length);
              for(i = 0; i < time1_data.length; i++)
              {
                  console.log(time1_data[i]);
              }

              document.getElementById("iotDevicedata").innerHTML = "iotDeviceData" + myData.temperature + myData.humidity;
              
              $('#table').bootstrapTable({});
            var data = [{
                        temp: myData.temperature,
                        hum: myData.humidity
                    }];
                $('#table').bootstrapTable("load", data);
                }
          
      }).catch(function (error) {
          console.log("error", error);
      
      });


    }

    function loadGraph()
 {
    var ctxL = document.getElementById("mycanvas").getContext('2d');
    var myLineChart = new Chart(ctxL, {
        type: 'line',
        data: {
        labels: time1_data,
        datasets: [{
        label: "My First dataset",
        data: temp1_data,
        backgroundColor: [
        'rgba(105, 0, 132, .2)',
        ],
        borderColor: [
        'rgba(200, 99, 132, .7)',
        ],
        borderWidth: 2
        },
        {
        label: "My Second dataset",
        data: hum1_data,
        backgroundColor: [
        'rgba(0, 137, 132, .2)',
        ],
        borderColor: [
        'rgba(0, 10, 130, .7)',
        ],
        borderWidth: 2
        }
        ]
        },
        options: {
        responsive: true
      }
    });

    // for(i = 0; i < time1_data.length; i++)
    // {
    //     var myLineChart = new Chart(ctxL, {
    //         type: 'line',
    //         data: {
    //         labels: [time1_data[i]],
    //         datasets: [{
    //         label: "My First dataset",
    //         data: [temp1_data[i]],
    //         backgroundColor: [
    //         'rgba(105, 0, 132, .2)',
    //         ],
    //         borderColor: [
    //         'rgba(200, 99, 132, .7)',
    //         ],
    //         borderWidth: 2
    //         },
    //         {
    //         label: "My Second dataset",
    //         data: [hum1_data[i]],
    //         backgroundColor: [
    //         'rgba(0, 137, 132, .2)',
    //         ],
    //         borderColor: [
    //         'rgba(0, 10, 130, .7)',
    //         ],
    //         borderWidth: 2
    //         }
    //         ]
    //         },
    //         options: {
    //         responsive: true
    //       }
    //     });
    // }
}
              
         


//});

//line

function draw() {
    
}

$(function() { 
    draw();
});








