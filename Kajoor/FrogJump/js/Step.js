
class Step {

	 constructor( _x,_On)
      {
      	 this.x= _x;
      	 this.isOn  = _On;
		 this.Watch = false;
		 this.no=0;
		 this.moveCnt =RandomInt(0,360);
      }
	  set(_x, _On,_no) 
	  {
	    this.x = _x;
		this.isOn=_On;
		this.Watch = false;
		this.no = _no;
		this.moveCnt =RandomInt(0,360);
	  }
	  
	  check()
	  {
		// console.log("Step  ==="+this.x+"      "+this.isOn+"      ");
	  }

}