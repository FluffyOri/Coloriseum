var ButtJoin = true;

function join(){
						if (ButtJoin === true) {

								$('#ButtonJoin').animate({ x: '100px' });
							    $('#ButtonJoin').animate({ opacity: '1' }, { duration:400, queue:false });
								ButtJoin = false;
								}
								
								else if (ButtJoin === false) {

								$('#ButtonJoin').animate({ x: '-25px' });
							   	 $('#ButtonJoin').animate({ opacity: '0' }, { duration:400, queue:false });
                                ButtJoin = true;
								}
							}
							 