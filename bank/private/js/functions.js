// ----------------------- DOM MANIPULATION --------------------------

function createRekeningDiv(reknr, waarde){
  var div = document.createElement('div');
  div.class = 'rekening'+reknr;
  div.innerHTML = rekeningNr(reknr) + " - &euro;" + waarde;
  div.onclick = rekeningPagina.bind(this,reknr);

  var container = document.getElementById('rekeningen');
  container.appendChild(div);
}

// ----------------------- RANDOM -------------------------

function rekeningNr(id){
  switch(id.length){
    case 1:
      return "FNB0000" + id;
      break;
    case 2:
      return "FNB000" + id;
      break;
    case 3:
      return "FNB00" + id;
      break;
    case 4:
      return "FNB0" + id;
      break;
    case 5:
      return "FNB" + id;
      break;
  }
}

// ---------------------- LOCATIE HEADERS -----------------------

function rekeningPagina(reknr){
  window.location = './show.php?reknr='+reknr;
}

// --------------------- REQUESTS -----------------------

function nieuweRekening(id){

  var obj = {}
  obj.gebruiker_id = id;
  obj.waarde = 50000;

  var data = JSON.stringify(obj);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp.responseText);

        var rekeningNummer = rekeningNr(xhttp.responseText);
        createRekeningDiv(xhttp.responseText, obj.waarde);

      }
  };

  xhttp.open("POST", "../../private/actions/rekeningen/create.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("data="+data);

}

function transactie(reknr){

  var obj = {}
  obj.waarde = document.getElementById('waarde').value;
  obj.vanRekening = reknr;
  obj.naarRekening = document.getElementById('naarRekening').value;
  obj.vanBankCode = 'FNB';
  obj.naarBankCode = 'FNB';
  obj.timestamp = new Date();
  obj.opmerking = document.getElementById('opmerking').value;

    var data = JSON.stringify(obj);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp.responseText);
          location.reload();
        }
    };

    xhttp.open("POST", "../../private/actions/transacties/create.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("data="+data);
}
