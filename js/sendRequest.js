 //Эта функция должна генерировать токен  но она почему то это не делает(
/*window.onload = function getToken (){
	if (localStorage.getItem("token") != null) return 0; // Если ключ уже есть то не получать его занного

	var thisLoc = location.href;

	location.href = "https://oauth.vk.com/authorize?client_id=6818569&display=page&scope=friends,status,messages,offline&response_type=token&v=5.52";

	var loc = document.location.href;

	history.go(-1);

	console.log(loc.slice(loc.search('token') + 6, loc.indexOf('&', 50)));

	//localStorage.setItem("token", location.slice(location.search('token') + 6, location.indexOf('&', 50)));


	//https://oauth.vk.com/blank.html#access_token=66ce4b0239e2bf41c8b0975fbfad81c119f1624fec0a95b887b78c691cd452008d4c02c9e7d4847617794&expires_in=0&user_id=183457480
}*/

// Функция принимает метод и его параметры и возврощяет url строку для http запроса
function getUrl (method, params, version){
	
	if (!method) throw new Error('You did not specify a method!'); // Если метод не был указан при вызове функций то будет создана ошибка

	params = params || {}; // Проверка если параметры не переданы то преобразуем их в пустой обьект

	params['access_token'] = localStorage.getItem("token");

	return 'https://api.vk.com/method/'+ method + '?' + $.param(params) + '&v=' + version;
}
// Функция создает запрос принимая название метода его параметры и функцию калбека при успешном выполнение
function sendRequest (method, params, func, version='5.52'){ 
	$.ajax({
		url: getUrl(method, params, version),
		method: 'GET',
		dataType: 'JSONP',
		//statusCode: { 200: () => //do something },
		//error: (jqXHR, textStatus) => console.log(jqXHR),
		success: func
	});
}

/*
// функция для запроса long poll 
function longPollRequest(func){
	//перый запрос для получения сервира ключя и ts этого сианся
	sendRequest("messages.getLongPollServer", {}, (data) => longPollResponse(data.response, func));

	//в переменной res = response хранится адресс сервера ключь и тс
	function longPollResponse(res, func){
		var server = res.server;
		var key = res.key; 
		var ts = res.ts;
		getUpdate(server, key, ts,func);

	}
}
function getUpdate(server, key, ts, func){
	$.ajax({
		url: "https://" + server + "?act=a_check&key=" + key + "&ts=" + ts + "&wait=25&mode=8&version=2" ,
		method: 'GET',
		dataType: 'JSONP',
		success: func
	});
}*/