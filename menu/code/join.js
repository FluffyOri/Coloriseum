
function nom()  {

$('.LesNoms').animate({ y: '1300px' },  { duration: 30000 });

}

function Pop()   {

								$('#ButtonStart').delay(2000);
								$('#ButtonStart').transition({ scale: 1.2 });
								$('#ButtonStart').transition({ scale:0.9} );
								$('#ButtonStart').delay(10);
								$('#ButtonStart').transition({ scale:1.0} );
								setTimeout("Pop()",750);



}


$(document).ready(function() {
      nom();
      Pop();
});
