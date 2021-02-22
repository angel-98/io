const express=require('express');
const bodyParser=require("body-parser");//para trabajarcon JSon
const mongoose = require("mongoose");

 // const io = require("WebSocket");
//var io = require('socket.io');
var mqtt= require('mqtt'); // des comentar todo los apartdos de mqtt cuando se instake 

const  Dispositivo=require('./models/dispositivo');
const app=express();
// const wss = new WebSocket.Server({ app });
// const ioW = new socket.io.Server({app});

mongoose.connect('mongodb://localhost:27017',
 {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('conection to database success!');
});


//------------------Nuevo 
var optionsMqtt={
	ClientId:"nodeserver1",
	username:" steve",
	password: "password",
	clean:true
}
var mqttClient = mqtt.connect("mqtt://192.168.2.264", optionsMqtt);

mqttClient.on("connect", function(){
	console.log("Conectado al MQTT");
	mqttClient.subscribe("utpti/c10/C1/ventilador encender")
});


//Middleware
//para usar el body parse y lo comvierta en json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

app.use((req, res, next)=>{
	console.log('primer Middleware');

	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, x-Requested-with,XMLHttpRequest, Content-Type, Accept");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE,OPTIONS")
	next();

});

// app.use((req, res, next)=>{
// 	app.send("hello from express");

// });

// app.get("/api/hola", ((req, resp, next)=>{
// 	console.log('Api ejecutandoce ');
// 	var objr={msj:'OK'};
// 	resp.status(200).json(objr)

// }));



//prueba rapida
// app.get("/api/disp/1",(req, resp, next)=>{
// 	const disp=new Dispositivo();

// 	disp.nombre='req.body.nombre';
// 	disp.descripcion='req.body.descripcion';
// 	disp.estatus=false;
	

// 	disp.save(function(err, dato){
// 		if (err) {
// 			console.error(err);
// 			resp.status(500).json({msj:'eror con la base de datos'});
// 		}else
// 			resp.status(200).json(dato);
// 	});

// });

//acciones
app.get("/", (req, resp, next)=>{

});
app.get("/api/hola", (req, resp, next)=>{

});
app.post("/api/disp",(req, resp, next)=>{
	const disp=new Dispositivo();

	disp.nombre=req.body.nombre;
	disp.descripcion=req.body.descripcion;
	disp.estatus=req.body.estatus;
	disp.tipo=req.body.tipo;
	disp.nivel=req.body.nivel;

	disp.save(function(err, dato){
		if (err) {
			console.error(err);
			resp.status(500).json({msj:'eror con la base de datos'});
		}else
			resp.status(200).json(dato);
	});

});
app.get("/api/disp", (req, resp, next)=>{
	Dispositivo.find(function(err, disps){
		if (err) {
			console.error(err);
			resp.status(500).json({msj:'erro con la base de datos'})
		}
		else
			resp.status(200).json(disps);
	});
});

app.get("/api/disp/:id", (req, resp, next)=>{
	Dispositivo.findById(req.params.id, function(err, disp){
		if (err) {

		}
		else{
			if (disp==null) {
				resp.status(500).json('No se encontro el dispositivo');
			}else{
				var options={
					retain:true,
					qos:1
				};
				if (mqttClient.connected==true) {
					//utpti/c10/C1/ventilador
					mqttClient.publish(disp.descripcion, "apagado", options);
					resp.status(200).json('Mensaje enviado');

				}else{
					resp.status(500).json('No se encontro el broker');
				}
			}
		}
	});

});

//mqtt events
mqttClient.on('message', function(topic, message, packet){
	console.log("message is" + message);
	console.log("topic is" + topic);
	Dispositivo.findOne({descripcion: topic}, function(err, disp){
		if (err) {
			console.log(err);
		}
		else{
			if (disp==null) {
				console.error('no se encontro el dispositivo');
			}
			else{
				if (message == 'encendido') {
					dispo.estatus=true;
					dispo.last_conn=Date.now;
					disp.save(function(err, data){
						if (err) {
							console.error(err);
						}
						else{
							console.log('evento registrado');
						}//posiblemente borrar el conchete
					});
				}
				if (message=='apagado') {
					dispo.estatus=false;
					dispo.last_conn=Date.now;
					disp.save(function(err, data){
						if (err) {
							console.error(err);
						}
						else{
							console.log('evento registrado');
						}//posiblemente borrar el conchete
					});

				}
			}
		}

	});


});

// wss.on('message', function( message, packet){
// 		console.log("message is" + message);
// });

// ioW.on('connection', function (socket) {
//   socket.on('subscribe', function (data) {
//     console.log('Subscribing to '+data.topic);
//     socket.join(data.topic);
//     client.subscribe(data.topic);
//   });


//   socket.on('publish', function (data) {
//     console.log('Publish to '+data.message);
//     var options = {qos: 0, retain:true};
//     client.publish(data.topic, data.message, options);
//   });  
// });

// client.on('message', function (topic, message) {
//   console.log(topic+'='+message);
//   io.sockets.in(topic).emit('mqtt',{'topic': String(topic),
//     'message':String(message) });  
// });


module.exports=app; 