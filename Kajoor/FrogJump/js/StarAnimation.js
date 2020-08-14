 class StarAnimation {

	constructor()
	{
		
		this.x= this.y = this.scal = -2;
		this.vx=this.vy= this.star =  0;
		this.r = RandomInt(0,360);
		this.g = RandomInt(0,360);
		this.b = RandomInt(0,360);
		this.Cnt=0;
		
	}
	setAni(_x,_y,_vx,_vy, _star, _cnt)
	{
		this.x = _x;
		this.y = _y;
		this.vx=_vx;
		this.vy=_vy;
		this.star=Math.abs(_star);
		this.scal = 1.5;
		this.Cnt = _cnt;
		this.r   = RandomInt(0,255);
		this.g   = RandomInt(0,255);
		this.b   = RandomInt(0,255);
	}
	UpdateAni()
	{
		this.Cnt++;
		if(this.Cnt>15)
		{
		  this.x += this.vx;
		  this.vy -=.005;  
		}
		else
		  this.vy +=.002;
		this.y += this.vy;
		this.scal-=.01;
	}

	check()
	  {
		 // console.log("StarAnimation  ===  "+  this.x+"      "+this.vy+"      "+this.vx+"     "+this.scal+"  "+this.Cnt);
	  }
 }