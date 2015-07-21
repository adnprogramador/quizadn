//GET /quizes/question

exports.question = function (req, res){
	res.render('quizes/question', {title: 'Pregunta', pregunta: '¿Cuál es la capital de Italia?'});
};

//GET /quizes/answer

exports.answer = function (req, res){
	if(req.query.respuesta === 'Roma'){
		res.render('quizes/answer', {title: 'Respuesta', respuesta: '¡Correcto!'});
	}else{
		res.render('quizes/answer', {title: 'Respuesta', respuesta: '¡Incorrecto!'});
	}
};

//GET /author

exports.author = function (req, res){
	res.render('author', {title: 'Créditos', autor: 'Adrián Luis Blanco Calleja'});
};
