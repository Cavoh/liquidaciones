function verificarSalario() {
  var salario = parseFloat(document.getElementById("salario").value);
  var auxTrans = document.getElementById("auxTrans");
  if (salario < 2847000) {
    auxTrans.style.display = "block";
  } else {
    auxTrans.style.display = "none";
  }
}

function calcular() {
  // Obtener las fechas de ingreso y retiro
  var fechaIngreso = new Date(document.getElementById("fechaIngreso").value);
  var fechaRetiro = new Date(document.getElementById("fechaRetiro").value);

  // Convertir las fechas a milisegundos
  var tiempoIngreso = fechaIngreso.getTime();
  var tiempoRetiro = fechaRetiro.getTime();
  
  // Calcular la diferencia 
  var diferencia = tiempoRetiro - tiempoIngreso;

  // Convertir la diferencia a días
  var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  var diasEnAnio360 = dias / 365 * 360;

  // Redondear Dias del Año
  var diasRedondeado = Math.ceil(diasEnAnio360 / 10) * 10;

   // Obtener el salario
  var salario = parseFloat(document.getElementById("salario").value);

  // Calcular el salario por día
  function calcularSalarioPorDia() {
    var salario = parseFloat(document.getElementById("salario").value);
    var auxTrans = parseFloat(document.getElementById("auxTrans").value);
    var salarioPorDia = (salario + auxTrans) / 360;
    return salarioPorDia;
  }
   var salarioPorDia = calcularSalarioPorDia();  

  // calcula cesantias
    var anio = fechaRetiro.getFullYear();
    var fechaInicioAnio = new Date(anio, 0, 1);
    var tiempoInicioAnio = fechaInicioAnio.getTime();
    var diasCesantias = Math.floor((fechaRetiro.getTime() - tiempoInicioAnio) / (1000 * 60 * 60 * 24));
    var diasCesantiasRedondeado = Math.ceil(diasCesantias / -10) * -10;
    var promedioCes = diasCesantiasRedondeado * salarioPorDia;

    // calcula prima   
    var anio = fechaRetiro.getFullYear();
    var fechaFinAnio = new Date(anio, 0, 1);
    var tiempoFinAnio = fechaFinAnio.getTime();
    var diasPrimaSegSem = Math.floor((fechaRetiro.getTime() - tiempoFinAnio) / (1000 * 60 * 60 * 24));  

    if (diasPrimaSegSem > 180) {
      var fechaRetiroJulio = new Date(fechaRetiro.getFullYear(), 6, 1); // Crear la fecha del 01 de julio del año de fechaRetiro
      var tiempoRetiroJulio = fechaRetiroJulio.getTime(); // Convertir la fecha del 01 de julio a milisegundos
      var diasPrimaSegSem = Math.floor((fechaRetiro.getTime() - tiempoRetiroJulio) / (1000 * 60 * 60 * 24)); // Calcular los días entre fechaRetiro y el 01 de julio
    }    
     var diasPrimaRedondeado = Math.ceil(diasPrimaSegSem / -10) * -10;
     var promedioPri = diasPrimaRedondeado * salarioPorDia;

    // calcula vacaciones e intereses de cesantias    
      var promedioVac = (diasRedondeado * salario)/720;    
      var intces = promedioCes * 0.12 * 360/360;
      var intcesSinDecimales = intces;

    // Calcular indemnización
function calcularIndemnizacion() {
  var checkbox = document.getElementById("idcheckbox");
  if (checkbox.checked) {
    if (diasRedondeado <= 360) {
      indemnizacion = diasRedondeado * salario / 360;
    } else {
      var diasExcedentes = diasRedondeado - 360;
      indemnizacion = (1160000) + ((diasExcedentes * 773333) / 360);
    }
    document.getElementById("Indemnizacion").value = indemnizacion.toFixed(0);
  } else {
    indemnizacion = 0;
    document.getElementById("Indemnizacion").value = "";
  }
}

// Actualizar el valor de indemnización
calcularIndemnizacion();

// Mostrar el resultado en el cuadro de texto
document.getElementById("cesantias").value = "$" + promedioCes.toFixed(0);
document.getElementById("primaDeServicios").value = "$" + promedioPri.toFixed(0);
document.getElementById("interesesDeCesantias").value = "$" + intcesSinDecimales.toFixed(0);
document.getElementById("vacaciones").value = "$" + promedioVac.toFixed(0);


// Sumar los valores de cesantías, prima de servicios, intereses de cesantías, vacaciones y indemnización (si corresponde)
function sumarValores() {
  var ces = parseInt(document.getElementById("cesantias").value.replace("$", "").replace(",", "."));
  var primServi = parseInt(document.getElementById("primaDeServicios").value.replace("$", "").replace(",", "."));
  var intCesan = parseInt(document.getElementById("interesesDeCesantias").value.replace("$", "").replace(",", "."));
  var vacas = parseInt(document.getElementById("vacaciones").value.replace("$", "").replace(",", "."));
  var indemnizacion = 0;
  var checkbox = document.getElementById("idcheckbox");
  if (checkbox.checked) {
    indemnizacion = parseInt(document.getElementById("Indemnizacion").value.replace("$", "").replace(",", "."));
  }
  var total = ces + primServi + intCesan + vacas + indemnizacion;
  return total.toLocaleString("es-ES", { maximumFractionDigits: 2, useGrouping: true }).replace(".", ",");
}

// Seleccionar el elemento total
var totalElement = document.getElementById("total");

// Actualizar el valor total y agregar el color rojo
totalElement.value = "$" + sumarValores().toLocaleString("es-ES", { maximumFractionDigits: 2, useGrouping: true, minimumFractionDigits: 2 });
totalElement.style.color = "red";

}

