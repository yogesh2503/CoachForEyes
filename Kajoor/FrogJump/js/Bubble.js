
 
class Bubble {

      constructor()
      {
      	this.x=10,this.y=10,this.z=0,this.vz=0,this.tras=0;
		this.mAtime=0,this.Cnt=0;
		this.isShow=false;
      }
	  check()
	  {
		 // console.log("Bubble  ==="+this.x+"      "+this.y+"      ");
	  }
	
		set(_x, _y)
		{
			this.x  	   = _x;
			this.y  	   = _y;
			this.z      = 1;
			this.tras   = 1; 
			this.vz     = 1.01;
			this.isShow =false;
			this.Cnt=0;
			this.mAtime =RandomInt(0,60);
		}
		updateBubble()
		{
			this.Cnt++;
			if(this.Cnt>this.mAtime)
			{
			  this.z    *= this.vz;
			  this.isShow =true;
			}
			
			if(this.z>5)
			{
			  this.set(this.x,this.y);
			}
		}


}