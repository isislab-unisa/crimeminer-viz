// ritorna una stringa con il giorno/mese/anno e l'ora:minuti:secondi 
function date(){
	try{
	
		data = new Date();
		
	}catch(err){
		console.log(err);
		return  "";
	}
	ora = data.getHours();
	minuti = data.getMinutes();
	secondi = data.getSeconds();
	nomeGiorno = data.getDay();
	mese = data.getMonth()+1;
	giorno = data.getDate();
	year = data.getFullYear();

	if(minuti < 10) minuti = "0" + minuti;
	if(secondi < 10) secondi = "0" + secondi;
	if(ora <10) ora = "0" + ora;
	
	var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
	
	var date = " "+ weekday[nomeGiorno]+" " + giorno + "/" + mese + "/" + year + " - ora " + ora + 
		":" + minuti + ":" + secondi;
	return date;
}