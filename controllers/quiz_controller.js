/*
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
*/

var models = require('../models/models.js');
/*
//GET /quizes/question

exports.question = function (req, res){
	models.Quiz.findAll().then(
		function(quiz){
			res.render('quizes/question', { title: 'Pregunta', pregunta: quiz[0].pregunta});
		})
};
//GET /quizes/answer
exports.answer = function (req, res){ 
	models.Quiz.findAll().then(
		function(quiz){
			if(req.query.respuesta === quiz[0].respuesta){
				res.render('quizes/answer', {title: 'Respuesta', respuesta: '¡Correcto!'});
			}else{
				res.render('quizes/answer', {title: 'Respuesta', respuesta: '¡Incorrecto!'});
			}
		})
};
*/
// Autoload :id - factoriza el código si ruta incluye :quizId
exports.load = function (req, res, next, quizId){
	models.Quiz.find({
where: {
id: Number(quizId)
},
}).then(
		function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			}else{next(new Error('No existe quizId='+quizId));}
		}
	).catch(function(error){next(error);});
};

//GET /quizes
exports.index = function (req, res){
	models.Quiz.findAll().then(
		function(quizes){
			res.render('quizes/index.ejs', { quizes: quizes, errors: []});
		}
	).catch(function(error){next(error);});
};

//GET /quizes/:id
exports.show = function (req, res){
	res.render('quizes/show', { quiz: req.quiz, errors: []});
	
};

//GET /quizes/:id/answer
exports.answer = function (req, res){
	var resultado = '¡Incorrecto!';
	if(req.query.respuesta === req.quiz.respuesta){
		resultado = '¡Correcto!';
	}
	res.render('quizes/answer', { 
		quiz: req.quiz, 
		respuesta: resultado, 
		errors: [] 
	}
	);
};

//GET /author

exports.author = function (req, res){
	res.render('author', {title: 'Créditos', autor: 'Adrián Luis Blanco Calleja'});
};

//GET /quizes/new
exports.new = function(req, res) {
	var quiz = models.Quiz.build( //crea objeto quiz
		{pregunta: "Pregunta", respuesta: "Respuesta"}
	);
    res.render('quizes/new', {quiz: quiz, errors: []});
};

//GET /quizes/create
exports.create = function(req, res) {
    var quiz = models.Quiz.build( req.body.quiz );

  quiz
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('quizes/new', {quiz: quiz, errors: err.errors});
      } else {
        quiz // save: guarda en DB campos pregunta y respuesta de quiz
        .save({fields: ["pregunta", "respuesta", "UserId"]})
        .then( function(){ res.redirect('/quizes')}) 
      }      // res.redirect: Redirección HTTP a lista de preguntas
    }
  ).catch(function(error){next(error)});
};
