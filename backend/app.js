const express=require('express');
const bodyParser=require("body-parser");//para trabajarcon JSon
const mongoose = require("mongoose");

 //Libreria
var mqtt= require('mqtt'); // des comentar todo los apartdos de mqtt cuando se instake 
//Solucion al error cors
const cors = require('cors');

const  Dispositivo=require('./models/dispositivo');
const WebSocket = require('ws');
const app=express();

//servidor Websocket
const wss = new WebSocket.Server({port : 8000});

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
//	username:" steve",
//	password: "password",
//	clean:true
}
var mqttClient = mqtt.connect("mqtt://192.168.1.72", optionsMqtt);


//Middleware
//para usar el body parse y lo comvierta en json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
//CORS
app.use(cors())

app.use((req, res, next)=>{
	console.log('primer Middleware');

	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, x-Requested-with,XMLHttpRequest, Content-Type, Accept");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE,OPTIONS")
	next();

});

//Mqtt
mqttClient.on("connect", function(){
    console.log("Mqtt connected");
    mqttClient.subscribe('utpti/c10/#'); 
    // function (err){
    //     if (!err){
    //         mqttClient.publish('utpti/c10/cuh', 'Hello mqtt');
    //     }
    // });
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
app.delete("/api/disp/:id", (req, resp, next)=>{
	Dispositivo.findByIdAndRemove(req.params.id, function(err, disps){
		if (err) {
			console.error(err);
			resp.status(500).json({msj:'erro con la base de datos'})
		}
		else
			resp.status(200).json(disps);
	});
  
});






// app.put("/api/disp/:id", (req, resp, next)=>{
// 	Dispositivo.findByIdAndUpdate(req.params.id, req.body,function(err, disps){
// 		if (err) {
// 			console.error(err);
// 			resp.status(500).json({msj:'erro con la base de datos'})
// 		}
// 		else
// 			resp.status(200).json(disps);
// 	});
// });

app.get("/api/disp/:id", (req, resp, next)=>{
  Dispositivo.findById(req.params.id, function(err, disp){
      if(err){
          console.error(err);
          resp.status(500).json({msj: 'Error con la base de datos'});
      }
      else
          resp.status(200).json(disp);
  });
});




app.get("/api/disp/on/:id", (req, resp, next)=>{
	Dispositivo.findById(req.params.id, function(err, disp){
		if (err) {
			 console.error(err);
        	resp.status(500).json({msj:'Error con la base de datos'});
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
					mqttClient.publish(disp.descripcion, "on", options);
					resp.status(200).json('Mensaje enviado');

				}else{
					resp.status(500).json('No se encontro el broker');
				}
			}
		}
	});

});

app.get("/api/disp/off/:id",(req, resp, next)=>{
    Dispositivo.findById(req.params.id,function(err, disp){
      if(err){
        console.error(err);
        resp.status(500).json({msj:'Error con la base de datos'});
      }
      else{
        if(disp == null){
          resp.status(500).json('No se encontro el dispositivo!');
        }else {
          var options={
            retain:true,
            qos:1
            };
          if (mqttClient.connected == true){
            //room1/kitchen/tv1

            mqttClient.publish(disp.descripcion, "off" , options);
            resp.status(200).json('Mensaje enviado!');
            
          }else{
            resp.status(500).json('No se encontro el broker!');
          }
        }
      }
    });
  
  });




//mqtt events
mqttClient.on('message', function(topic, message, packet){
	console.log("message is: " + message);
	console.log("topic is: " + topic);
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
					disp.estatus=true;
					disp.last_conn=Date.now();
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
					disp.estatus=false;
					disp.last_conn=Date.now();
					disp.save(function(err, data){
						if (err) {
							console.error(err);
						}
						else{
						console.log('evento registrado');
						wss.clients.forEach(function each(client) {
                          if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify(dato));
                          }
                        }); 
						}//posiblemente borrar el conchete
					});

				}
			}
		}

	});


});
//Websocket events
wss.on('connection', ws => {
  console.log('new connection');
  ws.on('message', message => {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  ws.on('error', error => {
    console.log(error);
  });

  ws.send(JSON.stringify('Servidor Websocket'));

});



module.exports=app; 