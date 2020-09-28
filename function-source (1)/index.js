const {Firestore} = require('@google-cloud/firestore');
 
const db = new Firestore({
    projectId: 'iotproject-290319'
});

// Get a reference to the Pub/Sub component
const { PubSub } = require('@google-cloud/pubsub');
const pubsub = new PubSub();
const dbcollection = 'devices';

//gcloud pubsub topics publish cmpeiotdevicehw1 --message "test pubsub"
/**
 * Background Cloud Function to be triggered by Pub/Sub.
 * This function is exported by index.js, and executed when
 * the trigger topic receives a message.
 *
 * @param {object} data The event payload.
 * @param {object} context The event metadata.
 */
exports.iothw1 = async (data, context) => {
    const pubSubMessage = data;
    const name = pubSubMessage.data
        ? Buffer.from(pubSubMessage.data, 'base64').toString()
        : 'World';
        console.log(pubSubMessage.data);

    console.log('Hello, ${name}!');

    const iotdata = JSON.parse(name);
    console.log(iotdata.registry_id);
    console.log(`devices/${iotdata.device_id}`);
    //  "Hello, {"registry_id": "CMPEIoT1", "device_id": "cmpe181dev1", "timecollected": "2020-04-27 02:00:21", "zipcode": "94043", "latitude": "37.421655", "longitude": "-122.085637", "temperature": "25.15", "humidity": "78.93", "image_file": "img9.jpg"}!"   

    //Inserts data into Firestore db
    //const document = db.doc(`iottests/${iotdata.device_id}`);
   
    try {
      await db.collection("devices").doc("myiotdevice").set({
        'timecollected': iotdata.timecollected,
        'zipcode': iotdata.zipcode,
      'latitude': iotdata.latitude,
      'longitude': iotdata.longitude,
        'temperature': iotdata.temperature,
        'humidity': iotdata.humidity
        });
    console.log(`State updated for ${iotdata.device_id}`);
    } catch (error) {
    console.error(error);
    }
};