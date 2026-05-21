/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs=saveAs||function(e){"use strict";if(typeof e==="undefined"||typeof navigator!=="undefined"&&/MSIE [1-9]\./.test(navigator.userAgent)){return}var t=e.document,n=function(){return e.URL||e.webkitURL||e},r=t.createElementNS("http://www.w3.org/1999/xhtml","a"),o="download"in r,a=function(e){var t=new MouseEvent("click");e.dispatchEvent(t)},i=/constructor/i.test(e.HTMLElement)||e.safari,f=/CriOS\/[\d]+/.test(navigator.userAgent),u=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},s="application/octet-stream",d=1e3*40,c=function(e){var t=function(){if(typeof e==="string"){n().revokeObjectURL(e)}else{e.remove()}};setTimeout(t,d)},l=function(e,t,n){t=[].concat(t);var r=t.length;while(r--){var o=e["on"+t[r]];if(typeof o==="function"){try{o.call(e,n||e)}catch(a){u(a)}}}},p=function(e){if(/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)){return new Blob([String.fromCharCode(65279),e],{type:e.type})}return e},v=function(t,u,d){if(!d){t=p(t)}var v=this,w=t.type,m=w===s,y,h=function(){l(v,"writestart progress write writeend".split(" "))},S=function(){if((f||m&&i)&&e.FileReader){var r=new FileReader;r.onloadend=function(){var t=f?r.result:r.result.replace(/^data:[^;]*;/,"data:attachment/file;");var n=e.open(t,"_blank");if(!n)e.location.href=t;t=undefined;v.readyState=v.DONE;h()};r.readAsDataURL(t);v.readyState=v.INIT;return}if(!y){y=n().createObjectURL(t)}if(m){e.location.href=y}else{var o=e.open(y,"_blank");if(!o){e.location.href=y}}v.readyState=v.DONE;h();c(y)};v.readyState=v.INIT;if(o){y=n().createObjectURL(t);setTimeout(function(){r.href=y;r.download=u;a(r);h();c(y);v.readyState=v.DONE});return}S()},w=v.prototype,m=function(e,t,n){return new v(e,t||e.name||"download",n)};if(typeof navigator!=="undefined"&&navigator.msSaveOrOpenBlob){return function(e,t,n){t=t||e.name||"download";if(!n){e=p(e)}return navigator.msSaveOrOpenBlob(e,t)}}w.abort=function(){};w.readyState=w.INIT=0;w.WRITING=1;w.DONE=2;w.error=w.onwritestart=w.onprogress=w.onwrite=w.onabort=w.onerror=w.onwriteend=null;return m}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this.content);if(typeof module!=="undefined"&&module.exports){module.exports.saveAs=saveAs}else if(typeof define!=="undefined"&&define!==null&&define.amd!==null){define("FileSaver.js",function(){return saveAs})}


	var AAA=9;
	var win1;
	var WIN;
	var A = {Re:1, Im:2}
	var B = {Re:3, Im:4}
	var D = {Re:0, Im:0}
	var EuclidSK1=1;
	var EuclidSK2=2;
	var EuclidSK3=3;
	var EuclidSK4=4;
	var CM=1;
	var Eps = 0.001;
	var Att0={Lv:0, lay:["основной"], Chk:1};
	var Att1={Lv:1, lay:["основной"], Chk:1};
	var Att2={Lv:2, lay:["основной"], Chk:1};
	var Att3={Lv:3, lay:["основной"], Chk:1};
	var Att4={Lv:4, lay:["основной"], Chk:1};
	var Att5={Lv:5, lay:["основной"], Chk:1};
	var Att8={Lv:8, lay:["основной"], Chk:1};
	var DAtt={Lv:0, lay:["основной"], Chk:1};
	var Alg={Prog:[], NameList:[]};
	var arr = new Array();
	var A1=4;
	win1=5	
	function CopyAtt(B)
	{
		var A={Lv:0, lay:["основной"], Chk:1, Red: 0, Green: 0, Blue: 0};
		A.Lv=B.Lv;
		A.lay=B.lay;
		A.Chk=B.Chk;
		A.Red=B.Red;
		A.Green=B.Green;
		A.Blue=B.Blue	;
		return A;
	}

	var brn_Limited = 0;
	var brn_HalfLimited = 1;
	var brn_UnLimited = 2;

	var draw_usual = 0;
	var draw_hierarcy = 1;
	var draw_found = 2;

	var drw_Limited = 0;
	var drw_UnLimited = 1;
	var drw_Opposite = 2;
	var drw_Plus= 3 ;
	var drw_Minus= 4 ;
	var drw_Incidented= 5 ;
	var drw_Empty= 6 ;
	var drw_ShortIncidented = 7;
	
	var circ_full = 1;
	var circ_arc = 0;
	var circ_narc = 2;

	var KWDiskr = 180;
	var AllowAddInc = true;

	var SysVar =
	{
		AllowComplex:true
	}
	
	Success = false
	CMPOut = true
	znPlus=1
	znMinus=0
	var SG={Re:undefined, Im:undefined}
	var SCR;

	function InitSCR(X1,Y1,X2,Y2)
{     
	var U={Xm: undefined, Ym: undefined, XScreenMin: undefined, YScreenMin: undefined, XScreenMax: undefined, YScreenMax: undefined, M: undefined, SK: 1, Kf: 1, TP: "E", LineTail: 20, Mas:1,
	MasX:1, MasY:1, KCX:0.5, KCY:0.5}
	U.M=new Array(3,3);
	U.M[1,1]=1; U.M[1,2]=0; U.M[1,3]=0;
	U.M[2,1]=0; U.M[2,2]=1; U.M[2,3]=0;
	U.M[3,1]=0; U.M[3,2]=0; U.M[3,3]=1;
	U.XScreenMin=X1;
	U.YScreenMin=Y1;
	U.XScreenMax=X2;
	U.YScreenMax=Y2;
	U.Xm=X2;
	U.Ym=Y2;

	return U;
}

function TOBJ_Create(OB)
{
	OB.Incid=new Array();
	OB.HasGabarit=false;
	OB.Selected=false;
	return true;
}

function AddInc(A,B)
{
	A.Incid.push(B);
	B.Incid.push(A);
}
function TOChisl_Create(M,V,Att)
{	
	TOBJ_Create(M)
	M.C=V;
	M.OB="C";
	if (Att==undefined){M.FAtt=CopyAtt(Att0)} else
		{M.FAtt=CopyAtt(Att);}
	return true;
} // TOChisl_Create

function TOUsl_Create(M,V,Att)
{	
	TOBJ_Create(M)
	M.B=V;
	M.OB="G";
	M.FAtt=CopyAtt(Att);
	return true;
} // TOUsl_Create

function TOEmpty_Create(M,Att)
{	
	TOBJ_Create(M);
	M.OB="$";
	M.FAtt=CopyAtt(Att);
	return true;
} // TOEmpty_Create

function TOPoint_Create(P,X,Y,W,Att)
{	
	TOBJ_Create(P);
	P.X=X;
	P.Y=Y;
	P.W=W;
	P.OB="P";
	P.Dir=znPlus;
	P.FAtt=CopyAtt(Att);
	return true;
} // TOPoint_Create


function TOProeL_Create(O,X1,X2,X3,X4,Y1,Y2,Y3,Y4,Att)
{
	TOBJ_Create(O);
	O.OB="L";
	O.L1=X1;
	O.S1=X2;
	O.S2=X3;
	O.S3=X4;
	O.L2=Y1;
	O.D1=Y2;
	O.D2=Y3;
	O.D3=Y4;
	O.FAtt=CopyAtt(Att);
	return true;
} // TOProeL_Create

function CreateCopy(O,X)
{
	if (X.OB=="O")
	{
		TOLine_Create(O,X.X1,X.Y1,X.W1,X.X2,X.Y2,X.W2,X.draw_AsBorned,X.Vid,X.FAtt);	
	}
	if (X.OB=="C")
	{
		TOChisl_Create(O,X.C,X.FAtt);
	}
	if (X.OB=="P")
	{
		TOPoint_Create(O,X.X,X.Y,X.W,X.FAtt);	
	}
	if (X.OB=="$")
	{
		TOEmpty_Create(O,X.FAtt);	
	}
	if (X.OB=="D")
	{
		TODuga_Create(O,X.Xc,X.Yc,X.R,X.X1,X.Y1,X.X2,X.Y2,X.FAtt);	
	}
	if (X.OB=="L")
	{
		TOProeL_Create(O,X.L1,X.S1,X.S2,X.S3,X.L2,X.D1,X.D2,X.D3,X.FAtt);	
	}
	if (X.OB=="K")
	{
		TOCollin_Create(O,X.S1,X.S2,X.S3,X.S4,X.D1,X.D2,X.D3,X.D4,X.FAtt);	
	}
	if (X.OB=="k")
	{
		TOCorrel_Create(O,X.S1,X.S2,X.S3,X.S4,X.D1,X.D2,X.D3,X.D4,X.FAtt);	
	}
	if (X.OB=="Y")
	{
		TOKwadr_Create(O,X.PR1,X.PR2,X.PR3,X.PR4,X.PR5,X.FAtt);	
	}
	if (X.OB=="W")
	{
		TOKontur_Create(O,X.FAtt);
		for (var I=0; I<=X.Spis.length-1; I++)
		{
			var Lin = new Object()
			CreateCopy(Lin,X.Spis[I]);
			O.Spis.push(Lin);
		}
	}
	
}


function TOCollin_Create(O,A1,A2,A3,A4,B1,B2,B3,B4,Att)
{
	TOBJ_Create(O);

	O.OB="K";

	O.S1=new Object();
	O.S2=new Object();
	O.S3=new Object();
	O.S4=new Object();
	O.D1=new Object();
	O.D2=new Object();
	O.D3=new Object();
	O.D4=new Object();

	CreateCopy(O.S1,A1);
	CreateCopy(O.S2,A2);
	CreateCopy(O.S3,A3);
	CreateCopy(O.S4,A4);
	CreateCopy(O.D1,B1);
	CreateCopy(O.D2,B2);
	CreateCopy(O.D3,B3);
	CreateCopy(O.D4,B4);

	O.FAtt=CopyAtt(Att);
	return true;
} // TOCollin_Create

function TOCorrel_Create(O,A1,A2,A3,A4,B1,B2,B3,B4,Att)
{
	TOBJ_Create(O);

	O.OB="k";

	O.S1=new Object();
	O.S2=new Object();
	O.S3=new Object();
	O.S4=new Object();
	O.D1=new Object();
	O.D2=new Object();
	O.D3=new Object();
	O.D4=new Object();

	CreateCopy(O.S1,A1);
	CreateCopy(O.S2,A2);
	CreateCopy(O.S3,A3);
	CreateCopy(O.S4,A4);
	CreateCopy(O.D1,B1);
	CreateCopy(O.D2,B2);
	CreateCopy(O.D3,B3);
	CreateCopy(O.D4,B4);

	O.FAtt=CopyAtt(Att);
	return true;
} // TOCorrel_Create

function TOKwadr_Create(O,P1,P2,P3,P4,P5,Att)
{
	TOBJ_Create(O);
	O.OB="Y";
	
	O.PR1=new Object();
	O.PR2=new Object();
	O.PR3=new Object();
	O.PR4=new Object();
	O.PR5=new Object();

	CreateCopy(O.PR1,P1);
	CreateCopy(O.PR2,P2);
	CreateCopy(O.PR3,P3);
	CreateCopy(O.PR4,P4);
	CreateCopy(O.PR5,P5);
	O.FAtt=CopyAtt(Att);
	return true;
} // TOKwadr_Create

function TOKontur_Create(W,Att)
{
	TOBJ_Create(W);
	W.Spis=new Array();
	W.SubKonturs=new Array();
	W.OB="W";
	W.FAtt=CopyAtt(Att);
} // TOKontur_Create

function TOLine_Create(O,AA1,AA2,W1,BB1,BB2,W2,CK,Vid,Att)
{	
	var X1Re,X2Re,X1Im,X2Im,Y1Re,Y2Re,Y1Im,Y2Im;
	TOBJ_Create(O)
	O.W1=W1;
	O.W2=W2;
	O.OB="O";
	O.X1=MCompl(0,0);
	O.Y1=MCompl(0,0);
	O.X2=MCompl(0,0);
	O.Y2=MCompl(0,0);
	O.Dir=znPlus;
	O.Vid=Vid;
	O.FAtt=CopyAtt(Att);
	O.draw_AsBorned=CK;
	
	if ((W1==1) && (W2==1))
	{
		if (((Math.abs(AA1.Im)>Eps) && (Math.abs(BB1.Im)>Eps)) || ((Math.abs(AA2.Im)>Eps) && (Math.abs(BB2.Im)>Eps)))
		{
			if ((Math.abs(AA1.Im+BB1.Im)<Eps) && (Math.abs(AA2.Im+BB2.Im)<Eps)) 
			{
				X1Re=AA1.Re;
				Y1Re=AA2.Re;
				X2Re=BB1.Re;
				Y2Re=BB2.Re;
				X1Im=AA1.Im;
				Y1Im=AA2.Im;
				X2Im=BB1.Im;
				Y2Im=BB2.Im;
				O.X1.Re=X1Re+X1Im;
				O.Y1.Re=Y1Re+Y1Im;
				O.X2.Re=X2Re+X2Im;
				O.Y2.Re=Y2Re+Y2Im;
				O.X1.Im=0;
				O.X2.Im=0;
				O.Y1.Im=0;
				O.Y2.Im=0;
			} else
			{
				O.X1=AA1;
				O.Y1=AA2;
				O.X2=BB1;
				O.Y2=BB2;

			}
			CalcGabarit(O);
		} else
		{
			O.X1=AA1;O.Y1=AA2;O.X2=BB1;O.Y2=BB2;
//			SpecialSP;
			if ((Math.abs(O.X1.Re-O.X2.Re)<Eps) && (Math.abs(O.Y1.Re-O.Y2.Re)<Eps)
			&& (Math.abs(O.X1.Im-O.X2.Im)<Eps) && (Math.abs(O.Y1.Im-O.Y2.Im)<Eps)) 
			{
				O.Null=true;
				O.X2=O.X1; O.Y2=O.Y1;
			}
			O.Vid="sobstv"
			//CalcGabarit;
		}
	}

	if ((W1==0) && (W2==0)) 
	{
		O.X1=MCompl(1,0);
		O.Y1=MCompl(0,0);
		O.X2=MCompl(0,0);
		O.Y2=MCompl(1,0);
		O.Vid="nesobstv";
	}
	
	if ((W1==1) && (W2==0)) 
	{
		if (BB2.Im==0)
		{
			O.X1.Re=0+AA1.Re;
			O.X1.Im=0;
			O.Y1.Re=0+BA.Re;
			O.Y1.Im=0;
			Dl=Math.sqrt(Sqr(BB1.Re)+Sqr(BB2.Re));
			if (Dl>0)
			{
				S1=BB2.Re/Dl;
				C1=BB1.Re/Dl;
			}
			Df=Fi(0,1,S1,C1);
			if (Df<0) Df=2*Math.PI+Df;
			O.X2.Re=100*Math.cos(Df)+AA1.Re; O.X2.Im=0;
			O.Y2.Re=100*Math.sin(Df)+AA2.Re; O.Y2.Im=0;
		} else
		{
			O.X1=AA1;
			O.Y1=AA2;
			O.X2=BB1;
			O.Y2=BB2;
		}
		O.Vid="sobstv";
		O.W1=1; O.W2=1;
	}
	
	if ((W2==1) && (W1==0))
	{
		if (AA2.Im==0)
		{
			O.X1.Re=0+BB1.Re;
			O.X1.Im=0;
			O.Y1.Re=0+BB2.Re;
			O.Y1.Im=0;
			Dl=Math.sqrt(Sqr(AA1.Re)+Sqr(AA2.Re));
			if (Dl>0)
			{
				S1=AA2.Re/Dl;
				C1=AA1.Re/Dl;
			}
			Df=Fi(0,1,S1,C1);
			if (Df<0) Df=2*Math.PI+Df;
			O.X2.Re=100*Math.cos(Df)+BB1.Re; O.X2.Im=0;
			O.Y2.Re=100*Math.sin(Df)+BB2.Re; O.Y2.Im=0;
		} else
		{
			O.X1=AA1;
			O.Y1=AA2;
			O.X2=BB1;
			O.Y2=BB2;
		}
		O.Vid="sobstv";
		O.W1=1; O.W2=1;
	}
	
	return true;

} // TOLine_Create


function TODuga_Create(D,Xc,Yc,R,X1,Y1,X2,Y2,Att)
{	
	TOBJ_Create(D)
	D.Xc=Xc;
	D.Yc=Yc;
	D.R=R;
	D.X1=X1;
	D.Y1=Y1;
	D.X2=X2;
	D.Y2=Y2;
	D.OB="D";
	D.Dir=znPlus;
	D.FAtt=CopyAtt(Att);
	D.Vid=Att.Lv;
	D.Laba=0;
	return true;
} // TODuga_Create

function CompSum(X,Y) 
{
	var Z = {Re:0, Im:0}
	Z.Re=X.Re+Y.Re;
	Z.Im=X.Im+Y.Im;
	return Z
} // CompSum

function CompSub(X,Y) 
{
	var Z = {Re:0, Im:0}
	Z.Re=X.Re-Y.Re;
	Z.Im=X.Im-Y.Im;
	return Z
} // CompSub

function CompMul(X,Y) 
{
	var Z = {Re:0, Im:0}
	Z.Re=X.Re*Y.Re-X.Im*Y.Im;
	Z.Im=X.Re*Y.Im+Y.Re*X.Im;
	return Z;
} // CompMul

function MCompl(X,Y)
{
	var Z = {Re:0, Im:0}
	if (Math.abs(X)<Eps*Eps*Eps) {X=0}
	if (Math.abs(Y)<Eps*Eps*Eps) {Y=0}
	Z.Re=X;
	Z.Im=Y;
	return Z;
} // MCompl


function Diskr(P1,P2,P3,P4,P5,P6,P7,P8,P9)
{
	return P1*P5*P9+P4*P8*P3+P7*P2*P6-P7*P5*P3-P1*P8*P6-P4*P2*P9;
} // Diskr

function DiskrComp(P1,P2,P3,P4,P5,P6,P7,P8,P9)
{
	var S1 = {Re:0, Im:0}
	var S2 = {Re:0, Im:0}
	var S3 = {Re:0, Im:0}
	var S4 = {Re:0, Im:0}
	var S5 = {Re:0, Im:0}
	var S6 = {Re:0, Im:0}
	var D1 = {Re:0, Im:0}
	var D2 = {Re:0, Im:0}

	S1=CompMul(P1,CompMul(P5,P9));
	S2=CompMul(P4,CompMul(P8,P3));
	S3=CompMul(P7,CompMul(P2,P6));
	S4=CompMul(P7,CompMul(P5,P3));
	S5=CompMul(P1,CompMul(P8,P6));
	S6=CompMul(P4,CompMul(P2,P9));
	D1=CompSum(S1,CompSum(S2,S3));
	D2=CompSum(S4,CompSum(S5,S6));
	return CompSub(D1,D2);
} // DiskrComp

function CompNeg(X)
{
     return MCompl(-X.Re,-X.Im);
} // CompNeg

function CompSqr(X)
{
	return CompMul(X,X);
} // CompSqr

function CompSqrt(X)
{
	var A,B;
		V=Math.sqrt(X.Re*X.Re+X.Im*X.Im)+X.Re;
     	A=Math.sqrt(V/2);
		V=Math.sqrt((Math.sqrt(X.Re*X.Re+X.Im*X.Im)-X.Re)/2);
		if (X.Im>=0) {B=Math.sqrt((Math.sqrt(X.Re*X.Re+X.Im*X.Im)-X.Re)/2)} else {B=-Math.sqrt((Math.sqrt(X.Re*X.Re+X.Im*X.Im)-X.Re)/2)};
		return MCompl(A,B);
} // CompSqrt

function CompDiv(X,Y)
{
	var Z = {Re:undefined, Im:undefined}
	Success=true;
	if (Math.abs(Y.Re*Y.Re+Y.Im*Y.Im)<Eps) {Success=false}
	Z.Re=(X.Re*Y.Re+X.Im*Y.Im)/(Y.Re*Y.Re+Y.Im*Y.Im);
	Z.Im=(Y.Re*X.Im-X.Re*Y.Im)/(Y.Re*Y.Re+Y.Im*Y.Im);
	return Z;
} // CompDiv

function LinLin(X1,Y1,X2,Y2,X3,Y3,X4,Y4)
{
	var A1,B1,C1,A2,B2,C2,ZZ;
	var P = {X:undefined, Y:undefined, W:undefined,P:false}

	A1=Y1-Y2; B1=X2-X1;
	A2=Y3-Y4; B2=X4-X3;
	ZZ=A1*B2-B1*A2;
	P.P=false;
	if (Math.abs(ZZ)>1E-2) 
	{
		C1=X1*Y2-Y1*X2;
		C2=X3*Y4-Y3*X4;
		P.X=(B1*C2-C1*B2)/ZZ;
		P.Y=(C1*A2-A1*C2)/ZZ;
		P.W=1;
		P.P=true;
	}

	if ((Math.abs(ZZ)<=1E-2) || (Math.abs(P.X)>1000000000) || (Math.abs(P.Y)>1000000000)) 
	{
		P.X=B1;
		P.Y=-A1;
		P.W=0;
	}

    return P;
} // LinLin

function ProcA(X1,Y1,X2,Y2,Xt,Yt,V)
{
	var S,C,Dl,Dx,Xt1,Yt1,X3,Y3,X4,Y4,A,B;
	var XTD = {Xt:undefined, Yt:undefined, D:undefined, B:undefined}
	var	SCDP = {S:0, C:0, D:0, P:false}
	var Df;
	
	XTD.B=false;
	SCDP=SC(X1,Y1,X2,Y2);
	Df=Fi(0,1,SCDP.S,SCDP.C);
	Dx=90*Math.PI/180+Df;
	X3=Xt+200*Math.cos(Dx);
	Y3=Yt+200*Math.sin(Dx);
	X4=Xt-200*Math.cos(Dx);
	Y4=Yt-200*Math.sin(Dx);
	P=LinLin(X1,Y1,X2,Y2,X3,Y3,X4,Y4);
	A=(Xt-Xt1)*(Xt-P.X);
	B=(Yt-Yt1)*(Yt-P.Y);
	XTD.D=Math.sqrt(A+B);

	if (XTD.D<V)
	{
		XTD.Xt=P.X;
		XTD.Yt=P.Y;
		XTD.B=true;
	}
	return XTD;
} // ProcA

function LinLinComp(X1,Y1,X2,Y2,X3,Y3,X4,Y4)
{
	var A1,B1,C1,A2,B2,C2;
	var B,BB,BBB,Prizn;
	var V,XD;
	var R={XX:0,YY:0,ZZ:0,B:undefined}
	Prizn=false;
	if ((X1.Im==0) && (X2.Im==0) && (X3.Im==0) && (X4.Im==0) && (Y1.Im==0) && (Y2.Im==0) && (Y3.Im==0) && (Y4.Im==0)) 
	{
		V=0.0001;
		BB=ProcA(X1.Re,Y1.Re,X2.Re,Y2.Re,X3.Re,Y3.Re,V);
		BBB=ProcA(X1.Re,Y1.Re,X2.Re,Y2.Re,X4.Re,Y4.Re,V);
		if (BB.B && BBB.B)
		{
			B1=CompSub(X2,X1);
			A1=CompSub(Y1,Y2);
			XX=B1;
			YY=CompSub(MCompl(0,0),A1);
			ZZ=MCompl(0,0);
			R.XX=XX;
			R.YY=YY;
			R.ZZ=ZZ;
			R.B=Prizn;
			return R;
		}
	}

	A1=CompSub(Y1,Y2); B1=CompSub(X2,X1);
	A2=CompSub(Y3,Y4); B2=CompSub(X4,X3);
	ZZ=CompSub(CompMul(A1,B2),CompMul(B1,A2));
	if ((Math.abs(ZZ.Re)>1E-25) || (Math.abs(ZZ.Im)>1E-25)) 
	{
		C1=CompSub(CompMul(X1,Y2),CompMul(Y1,X2));
		C2=CompSub(CompMul(X3,Y4),CompMul(Y3,X4));
		Prizn=true
		XX=CompDiv(CompSub(CompMul(B1,C2),CompMul(C1,B2)),ZZ);
		if (Success==false) Prizn=false;
		YY=CompDiv(CompSub(CompMul(C1,A2),CompMul(A1,C2)),ZZ);
		if (Success==false) Prizn=false;
		ZZ=MCompl(1,0);
	}

	if ((Math.abs(ZZ.Re)<=1E-25) || (Math.abs(XX.Re)>1000000000) || (Math.abs(YY.Re)>1000000000)) 
	{
		XX=B1;
		YY=CompSub(MCompl(0,0),A1);
		ZZ=MCompl(0,0);
	}
	R.XX=XX;
	R.YY=YY;
	R.ZZ=ZZ;
	R.B=Prizn;
	return R;
} // LinLinComp


function SC(X1,Y1,X2,Y2)
{
	var Dx,Dy,SCDP;
	var	SCDP = {S:0, C:0, D:0, P:false}
	SCDP.P=false;
	Dx=X2-X1; Dy=Y2-Y1; SCDP.D=Math.sqrt(Dx*Dx+Dy*Dy);
	if (SCDP.D>0) 
	{
		SCDP.S=Dy/SCDP.D;	
		SCDP.C=Dx/SCDP.D;
		SCDP.P=true;
	}

	return SCDP
} // Sc

function printcomp(C)
{
	alert("re="+C.Re+" im="+C.Im)
}

function printchisl(C,Name)
{
	alert(Name+"  re="+C.C.Re+" im="+C.C.Im)
}

function printpoint(C,Name)
{
	alert(Name+"  X="+C.X.Re+","+C.X.Im+" Y="+C.Y.Re+","+C.Y.Im+" W="+C.W)
}

function printline(C,Name)
{
	alert(Name+"  X1="+C.X1.Re+","+C.X1.Im+" Y1="+C.Y1.Re+","+C.Y1.Im+" W1="+C.W1+"  X2="+C.X2.Re+","+C.X2.Im+" Y2="+C.Y2.Re+","+C.Y2.Im+" W2="+C.W2)
}

function printduga(C,Name)
{
	alert(Name+"  Xc="+C.Xc.Re+","+C.Xc.Im+" Yc="+C.Yc.Re+","+C.Yc.Im+" R="+C.R.Re+" "+C.R.Im)
}

function ArcSin(X)
{ 
	var A

	if ((X>-1) && (X<1))  A=Math.atan(X/Math.sqrt(1-X*X));
	if (X>1-Eps*Eps*Eps*Eps) A=Math.PI/2;
	if (X<-1+Eps*Eps*Eps*Eps) A=-Math.PI/2;
	return A;
} // ArcSin

function ArcCos(X)
{
	return (Math.PI/2-ArcSin(X));
} // ArcCos


function Fi(Sa,Ca,Sb,Cb)
{
	var Da1,Da2,Fi1,Fi2;
	Fi2=ArcSin(Sb);
	if ((Sa>=0) && (Ca>=0)) Fi1=ArcSin(Sa);
	if ((Sa>=0) && (Ca<0)) Fi1=Math.PI-ArcSin(Sa);
	if ((Sa<0) && (Ca>=0)) Fi1=ArcSin(Sa);
	if ((Sa<0) && (Ca<0)) Fi1=-Math.PI-ArcSin(Sa);
	if ((Sb>=0) && (Cb>=0)) Fi2=ArcSin(Sb);
	if ((Sb>=0) && (Cb<0)) Fi2=Math.PI-ArcSin(Sb);
	if ((Sb<0) && (Cb>=0)) Fi2=ArcSin(Sb);
	if ((Sb<0) && (Cb<0)) Fi2=-Math.PI-ArcSin(Sb);
	return Fi2-Fi1;
} // Fi


function EExecC0(M,V,Att,Sg)
{
	var S
	S=false
	if (V.OB==undefined) return false;
	TOChisl_Create(M,V.C,Att);
	S=true
	return S
} // EExecC0

function TOPoint(X,Y,W)
{
	this.X=X;
	this.Y=Y;
	this.W=W;
}



function EExecP0(P,X,Y,Att,Sg1,Sg2)
{
	S=false
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
//	P.X=X.C;
//	P.Y=Y.C;
//	P.W=1;
//	P.OB="P";
//	P.Dir=znPlus;
	TOPoint_Create(P,X.C,Y.C,1,Att);	
  	S=true;
  	return S;
} // EExecP0	


function EExecP1(P,P1,Dx,Dy,Att,Sg1,Sg2,Sg3)
{
  	S=false;
	if ((P1.OB==undefined) || (Dx.OB==undefined) || (Dy.OB==undefined)) return false;

	TOPoint_Create(P,CompSum(P1.X,Dx.C),CompSum(P1.Y,Dy.C),P1.W,Att);	

	S=true;
	return S;
} // EExecP1

function EExecPP(P,P1,P2,Att,Sg1,Sg2)
{
	var chisl={C:{Re:2,Im:0},OB:"C"};
	S=false;
	if ((P1.OB==undefined) || (P2.OB==undefined)) return false;

	if ((P1.OB=="P") && (P2.OB=="P") && IsSobstv(P1) && IsSobstv(P2))
	{
		A=(P1.X.Re+P2.X.Re)/2;
		B=(P1.X.Im+P2.X.Im)/2;
		C=(P1.Y.Re+P2.Y.Re)/2;
		D=(P1.Y.Im+P2.Y.Im)/2;
		TOPoint_Create(P,MCompl(A,B),MCompl(C,D),1,Att);	
	}
	else if (Att.Chk==1) {TOEmpty_Create(P,Att)}	
	S=true;
	return S;
} // EExecPP

function EExecDN(D,X,Y,Att,Sg1,Sg2)
{
	var chisl={C:{Re:2,Im:0},OB:"C"};
	S=false;
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	var c1=new Object();
	var c2=new Object();
	var p1=new Object();
	
	if ((X.OB=="P") && (Y.OB=="P") && IsSobstv(X) && IsSobstv(Y))
	{
		EExecC2(c1,X,Y,Att5,1,1);
		EExecAQ(c2,c1,chisl,Att5,1,1);
		EExecPP(p1,X,Y,Att5,1,1);
		EExecD0(D,p1,c2,Att,1,1);	
	}
	else if (Att.Chk==1) {TOEmpty_Create(D,Att)}	
	S=true;
	return S;
} // EExecDN


function EExecC7(CST,V,Att,Sg1)
{
	var VV={Re:undefined, Im: undefined};
	Result=false;
	if (V.OB==undefined) return false;
	if (V.OB=="O")
	{
		if (Sg1==1)
		{SCDP=SC(V.X1.Re,V.Y1.Re,V.X2.Re,V.Y2.Re)} else
		{SCDP=SC(V.X2.Re,V.Y2.Re,V.X1.Re,V.Y1.Re)}
		Df=Fi(0,1,SCDP.S,SCDP.C);
		if (Df<0) Df=2*Math.PI+Df;
		Df=Df*180/(Math.PI);
		VV=MCompl(Df,0);
		TOChisl_Create(CST,VV,Att);
	} else if (Att.Chk==1) TOEmpty_Create(CST,Att);
	Result=true;
	return Result;
} // EExecC7

function EExecCI(Cst,X,Y,Att,Sg1,Sg2)
{
	Result=false
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	if ((X.OB=="O") && (Y.OB=="O"))
	{
		if (Sg1==1)
		{SCDP=SC(X.X1.Re,X.Y1.Re,X.X2.Re,X.Y2.Re)} else
		{SCDP=SC(X.X2.Re,X.Y2.Re,X.X1.Re,X.Y1.Re)}
		Df1=Fi(0,1,SCDP.S,SCDP.C);
		if (Df1<0) Df1=2*Math.PI+Df1;

        if (Sg2==1)
		{SCDP=SC(Y.X1.Re,Y.Y1.Re,Y.X2.Re,Y.Y2.Re)} else
		{SCDP=SC(Y.X2.Re,Y.Y2.Re,Y.X1.Re,Y.Y1.Re)}
        Df2=Fi(0,1,SCDP.S,SCDP.C);
		if (Df2<0) Df2=2*Math.PI+Df2;

		if (Df2<Df1) Df2=Df2+2*Math.PI;
		Dx=(Df2-Df1)/Math.PI*180;
		TOChisl_Create(Cst,MCompl(Dx,0),Att);
	} else if (Att.Chk==1) TOEmpty_Create(Cst,Att);
	Result=true;
	return Result;
} // EExecCI

function EExecPR(PNT,X,Att,Sg1)
{
	var Vx={Re:undefined, Im: undefined};
	var Vy={Re:undefined, Im: undefined};
	Result=false;
	if (X.OB==undefined) return false;
	if (X.OB=="P")
	{
		Vx=X.X;
		Vy=X.Y;
		TOPoint_Create(PNT,MCompl(Vx.Re,-Vx.Im),MCompl(Vy.Re,-Vy.Im),1,Att);
		Result=true;
		
	} else if (Att.Chk==1) TOEmpty_Create(Cst,Att);

	Result=true;
	return Result;
} // EExecPR

function CalcCJ(X,Y,Z,Sg3)
{

	var A1={Re:undefined, Im: undefined};
	var B1={Re:undefined, Im: undefined};
	var A2={Re:undefined, Im: undefined};
	var B2={Re:undefined, Im: undefined};
	A = {X:undefined,Y:undefined,R:undefined}	
	A.R=true;
	
	if ((X.OB=="P") && (Y.OB=="P") && (Z.OB=="O"))
	{

//		if TOLine(Z).Null then begin CalcCJFALSE; Exit end;
		U=CalcPF(X.X,X.Y,Z);
		A1=U.A;
		B1=U.B;
		U=CalcPF(Y.X,Y.Y,Z);
		A2=U.A;
		B2=U.B;
		
		D=CompSqrt(CompSum(CompSqr(CompSub(A1,A2)),CompSqr(CompSub(B1,B2)) ));
		if (Math.abs(D.Re)<Eps) {A=MCompl(0,0); return true }
		if (Math.abs(A2.Re-A1.Re)>Eps)
		{
			C=Math.sign((A2.Re-A1.Re)/(Z.X1.Re-Z.X2.Re));
		} else
		if (Math.abs(B2.Re-B1.Re)>Eps)
		{
			C=Math.sign((B2.Re-B1.Re)/(Z.Y1.Re-Z.Y2.Re));
		} else {A.R=false;}

		A.X=D.Re*C*Sg3;
		A.Y=0;
	}
	return A;
	
} // CalcCJ


function EExecCJ(Out_Prm,X,Y,Z,Att,Sg1,Sg2,Sg3)
{
	
	if ((X.OB==undefined) || (Y.OB==undefined) || (Z.OB==undefined)) return false;

	if ((X.OB=="P") && (Y.OB=="P") && (Z.OB =="O"))
	if (IsSobstv(X) && IsSobstv(Y) && IsSobstv(Z))
	if (IsReal(X) && IsReal(Y) && IsReal(Z)) 
	{
		A=CalcCJ(X,Y,Z,Sg3);
		if (A.R)
		{
			TOChisl_Create(Out_Prm,MCompl(A.X,A.Y),Att);
			return true;
		}
	}
	if (Att.Chk==1) TOEmpty_Create(Out_Prm,Att);
	return true;
} // EExecCJ

function EExecO0(O, P1, P2, Att, Sg1, Sg2)
{
	
	var A={Re:undefined, Im: undefined};
	var B={Re:undefined, Im: undefined};
	var C={Re:undefined, Im: undefined};
	var D={Re:undefined, Im: undefined};

	var S=false;
	if ((P1.OB==undefined) || (P2.OB==undefined)) return false;
	
	
	if ((P1.OB=="P") && (P2.OB=="P"))
	{
		if ((P1.W==0) && (P2.W==0)) Vid="nesobstv" 
		else Vid="sobstv"
		
		if (IsSobstv(P1) && IsSobstv(P2))
		{
			A=P1.X;
			B=P1.Y;
			C=P2.X;
			D=P2.Y;
			TOLine_Create(O,P1.X,P1.Y,1,P2.X,P2.Y,1,brn_Limited,"sobstv",Att);	
			AddInc(O,P1);
			AddInc(O,P2);
			Result=true;
			return Result;
		}
		
		if ((P1.W==1) && (P2.W==0))
		{
			if (P2.Y.Im==0)
			{
				A=P1.X;
				B=P1.Y;

				var Dl=Math.sqrt(Sqr(P2.X.Re)+Sqr(P2.Y.Re));
				
				if (Dl>0) 
				{
					var S1=P2.Y.Re/Dl;
					var C1=P2.X.Re/Dl;
				}
				
				var Df=Fi(0,1,S1,C1);
				if (Df<0) Df=2*Math.PI+Df;

				C.Re=P1.X.Re+100*Math.cos(Df); C.Im=P1.X.Im;
				D.Re=P1.Y.Re+100*Math.sin(Df); D.Im=P1.Y.Im;
				TOLine_Create(O,A,B,1,C,D,1,brn_Limited,"sobstv",Att);	
			} else
			{
				TOLine_Create(O,P1.X,P1.Y,P1.W,P2.X,P2.Y,P2.W,brn_Limited,"sobstv",Att);	
			}
			AddInc(O,P1);
			AddInc(O,P2);
			Result=true;
			return Result;
		}

		if ((P2.W==1) && (P1.W==0))
		{
			if (P1.Y.Im==0)
			{
				A=P2.X;
				B=P2.Y;

				var Dl=Math.sqrt(Sqr(P1.X.Re)+Sqr(P1.Y.Re));

				if (Dl>0) 
				{
					var S1=P1.Y.Re/Dl;
					var C1=P1.X.Re/Dl;
				}
				   
				var Df=Fi(0,1,S1,C1);
				if (Df<0) Df=2*Math.PI+Df;

				C.Re=P2.X.Re+100*Math.cos(Df); C.Im=P2.X.Im;
				D.Re=P2.Y.Re+100*Math.sin(Df); D.Im=P2.Y.Im;
				TOLine_Create(O,A,B,1,C,D,1,brn_Limited,"sobstv",Att);	
			} else
			{
				TOLine_Create(O,P1.X,P1.Y,P1.W,P2.X,P2.Y,P2.W,brn_Limited,"sobstv",Att);	
			}
			AddInc(O,P1);
			AddInc(O,P2);
			Result=true;
			return Result;
		}		

		if ((P1.W==0) && (P2.W==0))
		{
			A=P1.X;
			A.Im=0;
			B=P1.Y;
			B.Im=0;
			C=P2.X;
			C.Im=0;
			D=P2.Y;
			D.Im=0;
			TOLine_Create(O,A,B,0,C,D,0,brn_UnLimited,"nesobstv",Att);	

			AddInc(O,P1);
			AddInc(O,P2);
			Result=true;
			return Result;
		}

	} else
	{
		if (Att.Chk==1) TOEmpty_Create(O,Att);
	}

  	S=true;
  	return S;
} // EExecO0	

function EExecP2(P,O1,O2,Att,Sg1,Sg2)
{
	var XX={Re:undefined, Im: undefined};
	var YY={Re:undefined, Im: undefined};
	var X1={Re:undefined, Im: undefined};
	var Y1={Re:undefined, Im: undefined};

	var S=false;

	if ((O1.OB==undefined) || (O2.OB==undefined)) return false;

	if ((O1.OB=="O") && (O2.OB=="O"))
	{
		
		
		if (IsNull(O1) && IsNull(O2))
		if (Att.Chk==1)
		{
			TOEmpty_Create(P,Att);
			return true;
		}

		if (IsNull(O1)) 
		{
			U=CalcPF(O1.X1,O1.Y1,O2);
			X1=U.A;
			Y1=U.B;
			if ((Math.abs(O1.X1.Re-X1.Re)<Eps) && ((Math.abs(O1.Y1.Re-Y1.Re)<Eps)))
			{
				TOPoint_Create(P,O1.X1,O1.Y1,1,Att);
				AddInc(O1,P);
				AddInc(O2,P);
			} else
			if (Att.Chk==1) TOEmpty_Create(P,Att);
			return true;
		}

		if (IsNull(O2)) 
		{
			U=CalcPF(O2.X1,O2,O1);
			X1=U.A;
			Y1=U.B;
			if ((Math.abs(O2.X1.Re-X1.Re)<Eps) && ((Math.abs(O2.Y1.Re-Y1.Re)<Eps)))
			{
				TOPoint_Create(P,O1.X1,O1.Y1,1,Att);
				AddInc(O1,P);
				AddInc(O2,P);
			} else
			if (Att.Chk==1) TOEmpty_Create(P,Att);
			return true;
		}
		
	
		
		
		if (IsSobstv(O1) && IsSobstv(O2))
		{
			Q=LinLinComp(O1.X1,O1.Y1,O1.X2,O1.Y2,O2.X1,O2.Y1,O2.X2,O2.Y2);


			var Def=true;

			if (Q.ZZ.Re==1) if (PointBelongs(O1,Q.XX.Re,Q.YY.Re) && PointBelongs(O2,Q.XX.Re,Q.YY.Re)) {Def=true} else {Def=false}
			if (!Def) 
			{
				if (Att.Chk==1) TOEmpty_Create(P,Att);
				Result=true;
				return Result;
			}

			if (Q.ZZ.Re==1) 
			{
				TOPoint_Create(P,Q.XX,Q.YY,Q.ZZ.Re,Att);	
				AddInc(P,O1);
				AddInc(P,O2);
				Result=true;
				return Result;
			}
			if ((Q.ZZ.Re==0) &&
			(((O1.draw_AsBorned==brn_UnLimited)|| (O1.draw_AsBorned==brn_HalfLimited)) ||
			((O1.FAtt.Lv==drw_UnLimited) || (O1.FAtt.Lv==drw_Incidented) || (O1.FAtt.Lv==drw_ShortIncidented) || (O1.FAtt.Lv==drw_Plus) || (O1.FAtt.Lv==drw_Minus) || (O1.FAtt.Lv==drw_Opposite))) &&
			(((O2.draw_AsBorned==brn_UnLimited) || (O2.draw_AsBorned==brn_HalfLimited)) ||
			((O2.FAtt.Lv==drw_UnLimited) || (O2.FAtt.Lv==drw_Incidented) || (O2.FAtt.Lv==drw_ShortIncidented) || (O2.FAtt.Lv==drw_Plus) || (O2.FAtt.Lv==drw_Minus) || (O2.FAtt.Lv==drw_Opposite))))
			{
				TOPoint_Create(P,Q.XX,Q.YY,Q.ZZ.Re,Att); 
				AddInc(O1,P);
				AddInc(O2,P);
				Result=true;
				return Result;
			} else
			{
				if (Att.Chk==1) TOEmpty_Create(P,Att);
				Result=true;
				return Result;
			}
		
		}
		if ((!IsSobstv(O1)) && (IsSobstv(O2))) 
		if (IsReal(O1) && IsReal(O2)) 
		{
			XX.Re=O2.X2.Re-O2.X1.Re; XX.Im=0;
			YY.Re=O2.Y2.Re-O2.Y1.Re; YY.Im=0;
			TOPoint_Create(P,XX,YY,0,Att);
			AddInc(O1,P);
			AddInc(O2,P);
			return true;
		}

		if (!IsSobstv(O2) && IsSobstv(O1)) 
		if (IsReal(O1) && IsReal(O2)) 
		{
			XX.Re=O1.X2.Re-O1.X1.Re; XX.Im=0;
			YY.Re=O1.Y2.Re-O1.Y1.Re; YY.Im=0;
			TOPoint_Create(P,XX,YY,0,Att);
			AddInc(O1,P);
			AddInc(O2,P);
			return true;
		}
		if (!IsSobstv(O1) && !IsSobstv(O2))
		{
			if (Att.Chk==1) TOEmpty_Create(P,Att);
			return true;
		}


		if (!IsSobstv(O1) && IsSobstv(O2)) 
		{
			SCDL=SC(O2.X1.Re,O2.Y1.Re,O2.X2.Re,O2.Y2.Re);
			Df=Fi(0,1,SCDL.S,SCDL.C);
			Df=Df*180/Math.PI;
			TOPoint_Create(P,MCompl(100*Math.cos(Df/180*Math.PI),0),MCompl(100*Math.sin(Df/180*Math.PI)),0,Att);
			return true;
		}



		if (!IsSobstv(O2) && IsSobstv(O1)) 
		{
			SCDL=SC(O1.X1.Re,O1.Y1.Re,O1.X2.Re,O1.Y2.Re);
			Df=Fi(0,1,SCDL.S,SCDL.C);
			Df=Df*180/Math.PI;
			TOPoint_Create(P,MCompl(100*Math.cos(Df/180*Math.PI),0),MCompl(100*Math.sin(Df/180*Math.PI)),0,0,Att);
			return true;
		}
		
	
	} else
	{
		if (Att.Chk==1) TOEmpty_Create(P,Att);
	}
  	S=true;	
  	return S;
} // EExecP2	

function EExecO2(OB,X1,Y1,X2,Y2,Att,Sg1,Sg2,Sg3,Sg4)
{
//	alert("EExecO2");
	var S=false
	if ((X1.OB==undefined) || (Y1.OB==undefined) || (X2.OB==undefined) || (Y2.OB==undefined)) return false;
//	OB.X1=X1.C;
//	OB.Y1=Y1.C;
//	OB.W1=1;
//	OB.X2=X2.C;
//	OB.Y2=Y2.C;
//	OB.W2=1;
//	OB.OB="O";
//	OB.Vid="sobstv";
//	OB.Dir=znPlus;
	TOLine_Create(OB,X1.C,Y1.C,1,X2.C,Y2.C,1,brn_Limited,"sobstv",Att);	

	S=true;
	return S;
} // EExecO2

function EExecO8(O1,O2,X,Y,Att1,Att2,Sg1,Sg2)
{
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	
	var S=false
	var X1
	var X2
	var Y1
	var Y2
	var SCDP
	var Ax = {Re:undefined, Im:undefined}
	var Ay = {Re:undefined, Im:undefined}
	var Bx = {Re:undefined, Im:undefined}
	var By = {Re:undefined, Im:undefined}
	var Cx = {Re:undefined, Im:undefined}
	var Cy = {Re:undefined, Im:undefined}
	var DDx = {Re:undefined, Im:undefined}
	var DDy = {Re:undefined, Im:undefined}
	if (Sg1==1) 
	{
		X1=X.X1;
		Y1=X.Y1;
		X2=X.X2;
		Y2=X.Y2;
	} else
	{
		X2=X.X1;
		Y2=X.Y1;
		X1=X.X2;
		Y1=X.Y2;
	}; 

	SCDP=SC(X1.Re,Y1.Re,X2.Re,Y2.Re);
	Df1=Fi(0,1,SCDP.S,SCDP.C);
	if (Df1<0) Df1=2*Math.PI+Df1;

	if (Sg2==1) 
	{
		X1=Y.X1;
		Y1=Y.Y1;
		X2=Y.X2;
		Y2=Y.Y2;
	} else
	{
		X2=Y.X1;
		Y2=Y.Y1;
		X1=Y.X2;
		Y1=Y.Y2;
	}; 

	SCDP=SC(X1.Re,Y1.Re,X2.Re,Y2.Re);
	Df2=Fi(0,1,SCDP.S,SCDP.C);
	if (Df2<0) Df2=2*Math.PI+Df2;
	if (Df2<Df1) Df2=Df2+2*Math.PI;
	Dx=(Df2-Df1)/2;
	Df1=Df1+Dx;
	Df2=Df1+Math.PI/2;
	

	U=LinLin(X.X1.Re,X.Y1.Re,X.X2.Re,X.Y2.Re,Y.X1.Re,Y.Y1.Re,Y.X2.Re,Y.Y2.Re);
	Bx.Re=U.X;
	By.Re=U.Y
	Ax.Im=0;
	Ay.Im=0;
	Bx.Im=0;
	By.Im=0;
	Ax.Re=Bx.Re+100*Math.cos(Df1);
	Ay.Re=By.Re+100*Math.sin(Df1);
	
	TOLine_Create(O1,Bx,By,1,Ax,Ay,1,brn_Limited,"sobstv",Att1);	

	DDx.Re=U.X;
	DDy.Re=U.Y
	Cx.Im=0;
	Cy.Im=0;
	DDx.Im=0;
	DDy.Im=0;
	Cx.Re=DDx.Re+100*Math.cos(Df2);
	Cy.Re=DDy.Re+100*Math.sin(Df2);

	TOLine_Create(O2,DDx,DDy,1,Cx,Cy,1,brn_Limited,"sobstv",Att2);	
	
	S=true;
	return S;
}  // EExecO8

function EExecD0(D,P,R,Att,Sg1,Sg2)
{	
//	alert("EExecD0")
	var S=false;
	if ((P.OB==undefined) || (R.OB==undefined)) return false;
//	D.Xc=P.X;
//	D.Yc=P.Y;
//	D.R=R.C;
//	D.OB="D";
//	D.Dir=znPlus;

	TODuga_Create(D,P.X,P.Y,R.C,P.X.Re+R.C.Re,P.Y.Re,P.X.Re+R.C.Re,P.Y.Re,Att);	
	S=true;
	return S;
} // EExecD0

function EExecD2(OOO,X,Y,Att,Sg1,Sg2)
{	
//	alert("EExecD2")
	var S=false;
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	var XCenter={Re:undefined, Im:undefined}
	var YCenter={Re:undefined, Im:undefined}
	var Radius={Re:undefined, Im:undefined}
	CoordAllow=false; 
	RadiusAllow=false;	

	if ((X.OB=="P") && IsSobstv(X)) 
	{
		XCentr=X.X;
		YCentr=X.Y;
		CoordAllow=true;
	}

	if (X.OB=="D")
	{
		XCentr=X.Xc;
		YCentr=X.Yc;
		CoordAllow=true;
	}

	if (Y.OB=="C")
	{
		Radius.Re= Y.C.Re/2;
		Radius.Im= Y.C.Im/2;
		RadiusAllow=true;
	}

	if ((Y.OB=="O") && (Y.FAtt.Lv==0)) 
	{
		Radius.Re=Math.sqrt(Sqr(Y.X2.Re-Y.X1.Re)+Sqr(Y.Y2.Re-Y.Y1.Re))/2;
		Radius.Im=0;
		RadiusAllow=true;
	}

	if (Y.OB=="D") 
	{
		Radius=Y.R;
		RadiusAllow=true;
	}

	if (CoordAllow && RadiusAllow) 
	{
		TODuga_Create(OOO,XCentr,YCentr,MCompl(Radius.Re*Sg2,Radius.Im*Sg2), 
		XCentr.Re+Radius.Re,YCentr.Re,XCentr.Re+Radius.Re,YCentr.Re,Att);
	}
	else if (Att.Chk==1) TOEmpty_Create(OOO,Att);

	Result=true;
	return Result;
} // EExecD2	

function EExecD3(D,P,R,Att,Sg1,Sg2)
{	
//	alert("EExecD3")
	var S=false;
	var V={Re:undefined, Im:undefined}


	if ((P.OB==undefined) || (R.OB==undefined)) return false;
	V.Re=R.C.Re/2/Math.PI;
	V.Im=R.C.Im/2/Math.PI;

	TODuga_Create(D,P.X,P.Y,V,P.X.Re+R.C.Re,P.Y.Re,P.X.Re+R.C.Re,P.Y.Re,Att);	
	S=true;
	return S;
} // EExecD3

function EExecD5(D,P,R,Att,Sg1,Sg2)
{	
//	alert("EExecD5")
	var S=false;
	var V={Re:undefined, Im:undefined}


	if ((P.OB==undefined) || (R.OB==undefined)) return false;
	V.Re=Math.sqrt(R.C.Re/Math.PI)*Math.sign(R.C.Re);
	V.Im=0;

	TODuga_Create(D,P.X,P.Y,V,P.X.Re+R.C.Re,P.Y.Re,P.X.Re+R.C.Re,P.Y.Re,Att);	
	S=true;
	return S;
} // EExecD5


function EExecD00(D,X,Y,Z,A,Sg1,Sg2,Sg3)
{	
	var S=false;
	var XCentr = {Re:undefined, Im:undefined}
	var YCentr = {Re:undefined, Im:undefined}
	var Radius = {Re:undefined, Im:undefined}

	var Att=CopyAtt(A);
	
	if ((Att.Lv==drw_Limited) || (Att.Lv==drw_Opposite)) Att.Lv=drw_UnLimited;
	
	if ((X.OB==undefined) || (Y.OB==undefined) || (Z.OB==undefined)) return false;

	if (((X.OB=="C") || (X.OB=="D")) && ((Y.OB=="C") || (Y.OB=="D")) && ((Z.OB=="C") || (Z.OB="O") || (Z.OB="D"))) 
	{
		if (X.OB=="C") XCentr=MCompl(Sg1*X.C.Re,X.C.Im);
		if (Y.OB=="C") YCentr=MCompl(Sg2*Y.C.Re,Y.C.Im);

		if (X.OB=="D") XCentr=MCompl(Sg1*X.Xc.Re,X.Xc.Im);
		if (Y.OB=="D") YCentr=MCompl(Sg2*Y.Yc.Re,Y.Yc.Im);

		if (Z.OB=="C") 
		{
			Radius= Z.C;
		}

		if ((Z.OB=="O") && (Z.OAtt.LV==0))
		{
			Radius=MCompl(Math.sqrt(Sqr(Z.X2.Re-Z.X1.Re)+Sqr(Z.Y2.Re-Z.Y1.Re)),0);
		}

		if (Z.OB=="D")
		{
			Radius=Z.R;
		}
		TODuga_Create(D,XCentr,YCentr,Radius,XCentr.Re+Radius.Re,YCentr.Re,XCentr.Re+Radius.Re,YCentr.Re,Att);
	}
	else if (Att.Chk==1) {Out_Prm1.OB="$"}	
	S=true;
	return S;	
} // EExecD00	

function CalcPF_A(X1,Y1,X2,Y2,XX,YY)
{
	var Dl,Dx,Df,SCDP;
	var LDummy,P;
	var X3,Y3,X4,Y4,Z;
	var AB={A:undefined, B:undefined}	
     
//	alert("CalcPF_A");

	AB.A=XX; AB.B=YY;
	SCDP=SC(X1.Re,Y1.Re,X2.Re,Y2.Re);
	Df=Fi(0,1,SCDP.S,SCDP.C);
	Dx=Math.PI/2+Df;
	X3=CompSum(AB.A,MCompl(200*Math.cos(Dx),0));
	Y3=CompSum(AB.B,MCompl(200*Math.sin(Dx),0));
	X4=CompSub(AB.A,MCompl(200*Math.cos(Dx),0));
	Y4=CompSub(AB.B,MCompl(200*Math.sin(Dx),0));
	P=LinLinComp(X1,Y1,X2,Y2,X3,Y3,X4,Y4);

//	alert("P "+P.XX.Re+" "+P.YY.Re)

	AB.A=P.XX;
	AB.B=P.YY;
	return AB;
} // CalcPF_A 


function CalcPF(XX,YY,Y)
{
	var X1,Y1,X2,Y2;

//	alert("CalcPF");
	X1=Y.X1;
	Y1=Y.Y1;
	X2=Y.X2;
	Y2=Y.Y2;
	AB=CalcPF_A(X1,Y1,X2,Y2,XX,YY);
 	return AB  
} // CalcPF


function EExecPF(OOO,X,Y,Att,Sg1,Sg2)
{
	var X1,Y1,X2,Y2,X3,Y3,X4,Y4,S,C,Dl,Df;
	var Xa,Ya,Xb,Yb,Xr,YR,AB,CC,DD
	var D1,D2;
	var Def,Prizn,PR
	var MyLine,CmpOut,S;

//	alert("EExecPF");
	S=false;
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;

	if ((X.OB=="P") && (Y.OB=="O"))
	{

		if ((X.W==1) && (IsSobstv(Y)))
		{
			AB=CalcPF(X.X,X.Y,Y);
			if (PointBelongs(Y,AB.A.Re,AB.B.Re)) {Def=true} else {Def=false};
		
			if (Def==false)
			{
				if (Att.Chk==1) 
				{
					TOEmpty_Create(OOO,Att);
					return true;
				}
			} else
			{
				TOPoint_Create(OOO,AB.A,AB.B,1,Att);
				AddInc(Y,OOO);
			}
			
		}
		
		else
		if ((X.W==0) && (IsSobstv(Y)))
		{
			TOPoint_Create(OOO,X.X,X.Y,0,Att);
			AddInc(Y,OOO);
		}
		else 
		if (Att.Chk==1) TOEmpty_Create(OOO,Att);
		S=true;
		
		
	}
	return S;

} // EExecPF 

function ComDuga1(Xc1,Yc1,Xc2,Yc2,R1,R2)
{
	var DeltaX,DeltaY,DeltaX_2,DeltaY_2,R1_2,R2_2,Xc1_2,Xc2_2,Yc1_2,Yc2_2,U,V,V1,V2,V3,A,B,C,D,P,Q,X1,Y1,X2,Y2;
	var S;
	var P= {X1:undefined,Y1:undefined,X2:undefined,Y2:undefined}

	DeltaX=CompSub(Xc2,Xc1);
	DeltaY=CompSub(Yc2,Yc1);
	R1_2=CompMul(R1,R1);
	R2_2=CompMul(R2,R2);
	Xc1_2=CompMul(Xc1,Xc1);
	Xc2_2=CompMul(Xc2,Xc2);
	Yc1_2=CompMul(Yc1,Yc1);
	Yc2_2=CompMul(Yc2,Yc2);
	U=CompSub(R1_2,R2_2);
	U=CompSub(U,Yc1_2);
	U=CompSum(U,Yc2_2);
	U=CompSub(U,Xc1_2);
	U=CompSum(U,Xc2_2);
	DeltaX_2=CompMul(DeltaX,DeltaX);
	DeltaY_2=CompMul(DeltaY,DeltaY);

	if ((Math.abs(Xc1.Re-Xc2.Re)>Eps) ||  (Math.abs(Xc1.Im-Xc2.Im)>Eps))
	{
		V=CompDiv(DeltaY_2,DeltaX_2,V);
		A=CompSum(V,MCompl(1,0));

		V1=CompDiv(CompMul(MCompl(2,0),DeltaY),DeltaX);
		V1=CompMul(V1,Xc1);
		V2=CompDiv(CompMul(U,DeltaY),DeltaX_2);
		V3=CompMul(MCompl(2,0),Yc1);
		B=CompSub(V1,V2);
		B=CompSub(B,V3);

		V1=CompDiv(CompMul(U,U),CompMul(MCompl(4,0),DeltaX_2));
		V2=CompDiv(U,DeltaX);
		C=CompSub(V1,CompMul(V2,Xc1));
		C=CompSum(C,Xc1_2);
		C=CompSum(C,Yc1_2);
		C=CompSub(C,R1_2);

		D=CompSub(CompMul(B,B),CompMul(MCompl(4,0),CompMul(A,C)));
		Y1=CompDiv(CompSum(CompNeg(B),CompSqrt(D)),CompMul(MCompl(2,0),A));
		Y2=CompDiv(CompSub(CompNeg(B),CompSqrt(D)),CompMul(MCompl(2,0),A));

		V1=CompSub(U,CompMul(MCompl(2,0),CompMul(Y1,DeltaY)));
		X1=CompDiv(V1,CompMul(MCompl(2,0),DeltaX));

		V1=CompSub(U,CompMul(MCompl(2,0),CompMul(Y2,DeltaY)));
		X2=CompDiv(V1,CompMul(MCompl(2,0),DeltaX));

		P=CompDiv(DeltaY_2,DeltaX_2,P);
		P=CompSum(P,MCompl(1,0));
		Q=CompMul(A,A);

		Q=CompDiv(D,Q);
		P=CompMul(Q,P);
		P=CompSqrt(P);
		P=CompDiv(P,MCompl(2,0));
	} else
	if ((Math.abs(Yc1.Re-Yc2.Re)>Eps) || (Math.abs(Yc1.Im-Yc2.Im)>Eps)) 
	{
		V=CompDiv(DeltaX_2,DeltaY_2);
		A=CompSum(V,MCompl(1,0));

		V1=CompDiv(CompMul(MCompl(2,0),DeltaX),DeltaY);
		V1=CompMul(V1,Yc1);
		V2=CompDiv(CompMul(U,DeltaX),DeltaY_2);
		V3=CompMul(MCompl(2,0),Xc1);
		B=CompSub(V1,V2);
		B=CompSub(B,V3);

		V1=CompDiv(CompMul(U,U),CompMul(MCompl(4,0),DeltaY_2));
		V2=CompDiv(U,DeltaY);
		C=CompSub(V1,CompMul(V2,Yc1));
		C=CompSum(C,Yc1_2);
		C=CompSum(C,Xc1_2);
		C=CompSub(C,R1_2);

		D=CompSub(CompMul(B,B),CompMul(MCompl(4,0),CompMul(A,C)));

		X1=CompDiv(CompSum(CompNeg(B),CompSqrt(D)),CompMul(MCompl(2,0),A));
		X2=CompDiv(CompSub(CompNeg(B),CompSqrt(D)),CompMul(MCompl(2,0),A));

		V1=CompSub(U,CompMul(MCompl(2,0),CompMul(X1,DeltaX)));
		Y1=CompDiv(V1,CompMul(MCompl(2,0),DeltaY));

		V1=CompSub(U,CompMul(MCompl(2,0),CompMul(X2,DeltaX)));
		Y2=CompDiv(V1,CompMul(MCompl(2,0),DeltaY));
	}
	P.X1=X1;
	P.Y1=Y1;
	P.X2=X2;
	P.Y2=Y2;
	return P;

} // ComDuga1

function Sqr(X) {return X*X}

function CalcP3(CMPOut,X,Y)
{
	var Xc1,Yc1,Xc2,Yc2,R1,R2,Dx,Dy;
	var Xb,Yb,Xe,Ye,Z,Xt,Yt,ZZ,Dummy;
	var Temp1,Temp2;
	var P= {X1:undefined,Y1:undefined,X2:undefined,Y2:undefined,Prizn:undefined,Def1:undefined,Def2:undefined}
	var X1= {X:undefined,Y:undefined}
	var Y1= {X:undefined,Y:undefined}
	var X2= {X:undefined,Y:undefined}
	var Y2= {X:undefined,Y:undefined}

//	alert("CalcP3")

	P.Prizn=false;
	//     	X1=undefined;
	//	X2=undefined;
	//	Y1=undefined;
	//	Y2=undefined;
	Xc1=X.Xc;
	Yc1=X.Yc;
	R1=X.R;
	Xc2=Y.Xc;
	Yc2=Y.Yc;
	R2=Y.R;
	Z=Sqr(Xc1.Re)-Sqr(Xc2.Re)+Sqr(Yc1.Re)-Sqr(Yc2.Re)-Sqr(R1.Re)+Sqr(R2.Re);
	Dx=CompSub(Xc2,Xc1);
	Dy=CompSub(Yc1,Yc2);
	if ((Math.abs(Dx.Re)<Eps) && (Math.abs(Dy.Re)<Eps) && (Math.abs(Dx.Im)<Eps) && (Math.abs(Dy.Im)<Eps)) 
	{
		P.Prizn=true;
		return;
	}

	P=ComDuga1(Xc1,Yc1,Xc2,Yc2,R1,R2);
	X1=P.X1;
	Y1=P.Y1;
	X2=P.X2;
	Y2=P.Y2;
	P.Prizn=false;
	//     	P=LinLin(X1.Re,Y1.Re,X2.Re,Y2.Re,Xc1.Re,Yc1.Re,Xc2.Re,Yc2.Re);
	Dummy=X.Xc.Re*(Y.Yc.Re-Y1.Re)+Y.Xc.Re*(Y1.Re-X.Yc.Re)+X1.Re*(X.Yc.Re-Y.Yc.Re);

	if (CMPOut==false) if (Dummy <= 0) 
	{
		Temp1=X1; Temp2=Y1;
		X1=X2; Y1=Y2;
		X2=Temp1; Y2=Temp2;
	}
	if (CMPOut) { P.Def1=true; P.Def2=true; return P }
	if (PointBelongs(X,X1.Re,Y1.Re) && PointBelongs(Y,X1.Re,Y1.Re)) {P.Def1=true} else {P.Def1=false}
	if (PointBelongs(X,X2.Re,Y2.Re) && PointBelongs(Y,X2.Re,Y2.Re)) {P.Def2=true} else {P.Def2=false}
	return P;
} // CalcP3 



function EExecP3(Out_Prm1,Out_Prm2,X,Y,Att1,Att2,Sg1,Sg2)
{
	var Def1,Def2,Prizn,Direction;
	var V;
	var X1= {X:undefined,Y:undefined}
	var Y1= {X:undefined,Y:undefined}
	var X2= {X:undefined,Y:undefined}
	var Y2= {X:undefined,Y:undefined}

	if ((X.OB==undefined) || (Y.OB==undefined)) return false;

	Def1=true;
	Def2=true;

//	alert("EExecP3")

	if ((X.OB=="D") && (Y.OB=="D"))
	{
		var CMPOut=SysVar.AllowComplex;
		P=CalcP3(CMPOut,X,Y,X1,Y1,X2,Y2);
		X1=P.X1;
		Y1=P.Y1;
		X2=P.X2;
		Y2=P.Y2;
		Def1=P.Def1;
		Def2=P.Def2;
		if (P.Prizn==false)
		{
			if (CMPOut==false)
			{
				Direction=false;
				if ((Math.abs(X1.Im)<Eps) && (Math.abs(Y1.Im)<Eps) && 
				(Math.abs(X2.Im)<Eps) && (Math.abs(Y2.Im)<Eps) && (Math.abs(X.Xc.Im)<Eps) 
				&& (Math.abs(X.Yc.Im)<Eps) && (Math.abs(Y.Xc.Im)<Eps) && (Math.abs(Y.Yc.Im)<Eps)) 
				{
					Direction=true;
					V=Diskr(X.Xc.Re,X.Yc.Re,1,Y.Xc.Re,Y.Yc.Re,1,X1.Re,Y1.Re,1);
					V=V*Math.sign(X.R.Re)*Math.sign(Y.R.Re)*Sg1*Sg2;
				}
				
				if (Def1) 
				{
					if (V<0) 
					{
						TOPoint_Create(Out_Prm1,X1,Y1,1,Att1);	
						AddInc(X,Out_Prm1);
						AddInc(Y,Out_Prm1);

					}
					else 
					{
						TOPoint_Create(Out_Prm2,X1,Y1,1,Att2);	
						AddInc(X,Out_Prm2);
						AddInc(Y,Out_Prm2);
					}

				} else if (Att1.Chk==1) TOEmpty_Create(Out_Prm1,Att1);
				

				if (Def2) 
				{
					if (V<0) 
					{	
						TOPoint_Create(Out_Prm2,X2,Y2,1,Att2);	
						AddInc(X,Out_Prm2);
						AddInc(Y,Out_Prm2);

					}
					else
					{
						TOPoint_Create(Out_Prm1,X2,Y2,1,Att1);	
						AddInc(X,Out_Prm1);
						AddInc(Y,Out_Prm1);
					}
				} else if (Att2.Chk==1) TOEmpty_Create(Out_Prm2,Att2);
			}
			
			if (CMPOut==true) 
			{
				Direction=false;
				if ((Math.abs(X1.Im)<Eps) && (Math.abs(Y1.Im)<Eps) && (Math.abs(X2.Im)<Eps) && (Math.abs(Y2.Im)<Eps)
				&& (Math.abs(X.Xc.Im)<Eps) && (Math.abs(X.Yc.Im)<Eps) && (Math.abs(Y.Xc.Im)<Eps) && (Math.abs(Y.Yc.Im)<Eps))
				{
					Direction=true;
					V=Diskr(X.Xc.Re,X.Yc.Re,1,Y.Xc.Re,Y.Yc.Re,1,X1.Re,Y1.Re,1);
					V=V*Math.sign(X.R.Re)*Math.sign(Y.R.Re)*Sg1*Sg2;
				}
				
				if (Def1 && CMPOut)
				{

					if (V<0) 
					{	
						TOPoint_Create(Out_Prm1,X1,Y1,1,Att1);	
						AddInc(X,Out_Prm1);
						AddInc(Y,Out_Prm1);
					}
					else 
					{
						TOPoint_Create(Out_Prm2,X1,Y1,1,Att2);	
						AddInc(X,Out_Prm2);
						AddInc(Y,Out_Prm2);
					}
				}
				else if (Att1.Chk==1) {TOEmpty_Create(Out_Prm1,Att1)}

				if (Def2 && CMPOut) 
				{
					if (V<0) 
					{
						TOPoint_Create(Out_Prm2,X2,Y2,1,Att2);	
						AddInc(X,Out_Prm2);
						AddInc(Y,Out_Prm2);

					}
					else
					{
						TOPoint_Create(Out_Prm1,X2,Y2,1,Att1);	
						AddInc(X,Out_Prm1);
						AddInc(Y,Out_Prm1);
					}
				} 
				else if (Att2.Chk==1) {TOEmpty_Create(Out_Prm2,Att2)}
			}
			return true;
		} 
		else
		{
		if (Att1.Chk==1) {TOEmpty_Create(Out_Prm1,Att1)}
		if (Att2.Chk==1) {TOEmpty_Create(Out_Prm2,Att2)}
		return true;
		}
	} 
	else
	{
	if (Att1.Chk==1) {TOEmpty_Create(Out_Prm1,Att1)}
	if (Att2.Chk==1) {TOEmpty_Create(Out_Prm2,Att2)}
	return true;
	}
} // EExecP3 

function CalcP6(CMPOut,X,Y)
{
	var Xb,Yb,Xe,Ye,T1,T2;
	var Aa,Bb,Cc,Xc1,Yc1,R1,A,B,C,D;
	var Temp1,Temp2;
	var P= {X1:undefined,Y1:undefined,X2:undefined,Y2:undefined,Prizn: false}
	var X1= {X:undefined,Y:undefined}
	var Y1= {X:undefined,Y:undefined}
	var X2= {X:undefined,Y:undefined}
	var Y2= {X:undefined,Y:undefined}

	P.Prizn=false;
	Xc1=Y.Xc;
	Yc1=Y.Yc;
	R1=Y.R;
	if (X.Dir==znPlus)
	{
		X1=X.X1;
		Y1=X.Y1;
		X2=X.X2;
		Y2=X.Y2;
	}
	else
	{
		X1=X.X2;
		Y1=X.Y2;
		X2=X.X1;
		Y2=X.Y1;
	}
	Xb=X1.Re;
	Yb=Y1.Re;
	Xe=X2.Re;
	Ye=Y2.Re;
	Aa=CompSub(Y2,Y1);
	Bb=CompSub(X2,X1);
	Cc=CompSub(CompMul(X1,Y2),CompMul(Y1,X2));

	if ((Math.abs(Aa.Re)<Eps) && (Math.abs(Bb.Re)<Eps) && (Math.abs(Aa.Im)<Eps) && (Math.abs(Bb.Im)<Eps))
	{
		P.Prizn=true;
		return P;
	}

	if (Math.abs(Bb.Re)>=Eps)
	{
		A=CompSum(CompSqr(Bb),CompSqr(Aa));
		B=CompMul((CompSum(CompSum(CompMul(Aa,Cc),CompMul(CompMul(Aa,Yc1),Bb)),CompMul(Xc1,CompSqr(Bb)))),MCompl(-2,0));
		C=CompSub(CompSum(CompSum(CompSum(CompMul(CompSqr(Xc1),CompSqr(Bb)),CompSqr(Cc)),CompMul(MCompl(2,0),CompMul(Cc,CompMul(Yc1,Bb)))),CompMul(CompSqr(Yc1),CompSqr(Bb))),CompMul(CompSqr(R1),CompSqr(Bb)));
		D=CompSub(CompSqr(B),CompMul(MCompl(4,0),CompMul(A,C)));

		if (Math.abs(D.Re)<Eps*Eps) D=MCompl(0,0);

		X1=CompDiv(CompDiv(CompSum(CompSub(MCompl(0,0),B),CompSqrt(D)),MCompl(2,0)),A);
		X2=CompDiv(CompDiv(CompSub(CompSub(MCompl(0,0),B),CompSqrt(D)),MCompl(2,0)),A);
		Y1=CompDiv(CompSub(CompMul(CompSum(MCompl(0,0),Aa),X1),Cc),Bb);
		Y2=CompDiv(CompSub(CompMul(CompSum(MCompl(0,0),Aa),X2),Cc),Bb);
	}
	else
	{
		Cc=CompSub(CompMul(Y1,X2),CompMul(X1,Y2));
		A=CompSum(CompSqr(Bb),CompSqr(Aa));
		B=CompMul((CompSum(CompSum(CompMul(Bb,Cc),CompMul(CompMul(Bb,Xc1),Aa)),CompMul(Yc1,CompSqr(Aa)))),MCompl(-2,0));
		C=CompSub(CompSum(CompSum(CompSum(CompMul(CompSqr(Yc1),CompSqr(Aa)),CompSqr(Cc)),CompMul(MCompl(2,0),CompMul(Cc,CompMul(Xc1,Aa)))),CompMul(CompSqr(Xc1),CompSqr(Aa))),CompMul(CompSqr(R1),CompSqr(Aa)));
		D=CompSub(CompSqr(B),CompMul(MCompl(4,0),CompMul(A,C)));

		if (Math.abs(D.Re)<Eps*Eps) D=MCompl(0,0);

		if (D.Re<0)
		{
			if (CMPOut==false) P.Prizn=true;
			Y1.Re=(-B.Re)/2/A.Re;
			Y2.Re=(-B.Re)/2/A.Re;
			Y1.Im=Math.sqrt(Math.abs(D.Re))/2/A.Re;
			Y2.Im=-Math.sqrt(Math.abs(D.Re))/2/A.Re;

			X1.Re=(-Bb.Re*Y1.Re-Cc.Re)/Aa.Re;
			X2.Re=(-Bb.Re*Y2.Re-Cc.Re)/Aa.Re;
			X1.Im=(-Bb.Re*Y1.Im)/Aa.Re;
			X2.Im=(-Bb.Re*Y2.Im)/Aa.Re;

			P.X1=X1;
			P.Y1=Y1;
			P.X2=X2;
			P.Y2=Y2;
			return P;
		} else
		{
			Y1.Re=(-B.Re+Math.sqrt(D.Re))/2/A.Re;
			Y2.Re=(-B.Re-Math.sqrt(D.Re))/2/A.Re;
			X1.Re=(-Bb.Re*Y1.Re-Cc.Re)/Aa.Re;
			X2.Re=(-Bb.Re*Y2.Re-Cc.Re)/Aa.Re;
		}
	}

	if ((Math.abs(X.X1.Im)<Eps) && (Math.abs(X.Y1.Im)<Eps) && (Math.abs(X.X2.Im)<Eps) && (Math.abs(X.Y2.Im)<Eps))
	{

		A=MCompl((Xe-Xb)/Math.sqrt(Sqr(Xe-Xb)+Sqr(Ye-Yb)),0);
		B=MCompl((Ye-Yb)/Math.sqrt(Sqr(Xe-Xb)+Sqr(Ye-Yb)),0);

		if (Math.abs(A.Re)>Eps) T1=(X1.Re-Xb)/A.Re;
		if (Math.abs(B.Re)>Eps) T1=(Y1.Re-Yb)/B.Re;
		if (Math.abs(A.Re)>Eps) T2=(X2.Re-Xb)/A.Re;
		if (Math.abs(B.Re)>Eps) T2=(Y2.Re-Yb)/B.Re;

		if (T1>T2) 
		{
			Temp1=X1; Temp2=Y1;
			X1=X2;Y1=Y2;
			X2=Temp1; Y2=Temp2;
		}
	}
	if (R1.Re<0)
	{
		Temp1=X1; Temp2=Y1;
		X1=X2;Y1=Y2;
		X2=Temp1; Y2=Temp2;

	}
	P.X1=X1;
	P.Y1=Y1;
	P.X2=X2;
	P.Y2=Y2;
	return P;
} // CalcP6

function EExecP6(Out_Prm1,Out_Prm2,X,Y,Att1,Att2,Sg1,Sg2)
{

	var Def,Prizn,Def1,Def2,CMPOut;
	var Xb,Yb,Xe,Ye,A,B,T1,T2;
	var P={X1:undefined,Y1:undefined,X2:undefined,Y2:undefined}
	var X1= {X:undefined,Y:undefined}
	var Y1= {X:undefined,Y:undefined}
	var X2= {X:undefined,Y:undefined}
	var Y2= {X:undefined,Y:undefined}


	if ((X.OB==undefined) || (Y.OB==undefined)) return false;

    CMPOut=SysVar.AllowComplex;

	 if ((X.OB =="O") && (Y.OB == "D") && ((X.W1==1) || (X.W2==1))) 
	{
		P=CalcP6(CMPOut,X,Y);
		X1=P.X1;
		Y1=P.Y1;
		X2=P.X2;
		Y2=P.Y2;
		Prizn=(P.Prizn);


		if (Prizn)
		{
			if (Att1.Chk=1) Out_Prm1.OB="$";
			if (Att2.Chk=1) Out_Prm2.OB="$";
			return true;
		}
		
		if ((CMPOut==false) && ((Math.abs(X1.Im)>Eps) || (Math.abs(Y1.Im)>Eps) || (Math.abs(X2.Im)>Eps) || (Math.abs(Y2.Im)>Eps)))
		{
			if (Att1.Chk=1) TOEmpty_Create(Out_Prm1,Att1);
		} else
		{
			if ((PointBelongs(X,X1.Re,Y1.Re) && PointBelongs(Y,X1.Re,Y1.Re)) || CMPOut) 
			{
			
				TOPoint_Create(Out_Prm1,X1,Y1,1,Att1);	
				AddInc(X,Out_Prm1);
				AddInc(Y,Out_Prm1);

			} 
			else if (Att1.Chk=1) TOEmpty_Create(Out_Prm1,Att1);
		}
		if ((CMPOut==false) && ((Math.abs(X1.Im)>Eps) || (Math.abs(Y1.Im)>Eps) || (Math.abs(X2.Im)>Eps) || (Math.abs(Y2.Im)>Eps))) 
		{
			if (Att2.Chk=1) TOEmpty_Create(Out_Prm2,Att2)
		} else
		{
			if ((PointBelongs(X,X2.Re,Y2.Re) && PointBelongs(Y,X2.Re,Y2.Re)) || CMPOut) 
			{
				TOPoint_Create(Out_Prm2,X2,Y2,1,Att2);	
				AddInc(X,Out_Prm2);
				AddInc(Y,Out_Prm2);

			} else if (Att2.Chk=1) TOEmpty_Create(Out_Prm2,Att2)
		}
		return true;
	} else
	{
		if (Att1.Chk=1) TOEmpty_Create(Out_Prm1,Att1);
		if (Att2.Chk=1) TOEmpty_Create(Out_Prm2,Att2);
		return true;
	}
	fin:;
} // EExecP6 

function AMax1L(X,Y)
{
     	A=X; if (Y>X) A=Y;
	return A;
} // AMax1L

function SK_GetPoint(A,B,SCR)
{ var SK={X:undefined, Y: undefined}


//  	SK.X=A;
//	SK.Y=B;
	
    SK.X=(A-SCR.Xm*SCR.KCX)/SCR.Mas/SCR.MasX;
    SK.Y=(-B+SCR.Ym*SCR.KCY)/SCR.Mas/SCR.MasY;
	return SK;
}

function SK_SetPoint(SCR,X,Y)
{ var SK={A:undefined, B: undefined}
  	SK.A=X;
	SK.B=Y;
	
//    SK.A=SCR.Xm*SCR.KCX+X*SCR.Mas*SCR.MasX;
//    SK.B=SCR.Ym*SCR.KCY-Y*SCR.Mas*SCR.MasY;
	
	return SK;
}

function Qwartet_Create(Xt1,Yt1,Xt2,Yt2)
{
	var U={X1:undefined, Y1: undefined, X2: undefined, Y2: undefined}
	U.X1=Xt1;
	U.Y1=Yt1;
	U.X2=Xt2;
	U.Y2=Yt2;
	return U;	

}

function LineIncidented(Typ,OBB,LineList)
{

	var Xt1={Re:undefined, Im: undefined }
	var Yt1={Re:undefined, Im: undefined }
	var Xt2={Re:undefined, Im: undefined }
	var Yt2={Re:undefined, Im: undefined }
	var T1={Re:undefined, Im: undefined }
	var T2={Re:undefined, Im: undefined }
	var T3={Re:undefined, Im: undefined }
	var T4={Re:undefined, Im: undefined }
	var AX=new Array();
	var AY=new Array();

    var IncidList=new Array();

    if (OBB.Incid.length>0)
    {
        XMin=1E30;
        YMin=1E30;
        XMax=-1E30;
        YMax=-1E30;
//		if not Assigned(TAlgWin(F).Navi) 
        {
          	XMin=OBB.Incid[0].X.Re;
          	YMin=OBB.Incid[0].Y.Re;
          	XMax=XMin;
          	YMax=YMin;
		}

        for (I=0; I<OBB.Incid.length; I++) 
		{
			OB=OBB.Incid[I];
			if ((OB.OB=="P")==false) continue;
//			if not OB.MatchLayer(SCR.Lay,Ignore)  continue;
			if (OB.W==0) continue;
			Xt=OBB.Incid[I].X.Re;
			Yt=OBB.Incid[I].Y.Re;
//			if not Assigned(TAlgWin(F).Navi) 
          	{
				XMin=Xt;
				YMin=Yt;
               	XMax=Xt;
               	YMax=Yt;
               	break;
          	}
		}

		for (I=0; I<OBB.Incid.length; I++)
		{
			OB=OBB.Incid[I];
			if ((OB.OB=="P")==false) continue;
//			if not OB.MatchLayer(SCR.Lay,Ignore)  continue;
			if (OB.W==0) continue;
			Xt=OBB.Incid[I].X.Re;
			Yt=OBB.Incid[I].Y.Re;
//			if not Assigned(TAlgWin(F).Navi) 
          	{
				// надо сделать "объезд" всех условий, т.к. иначе нарушается логика выбора
				if (((Xt<= -20000) || (Yt<= -20000) || (Xt>= 20000) || (Yt>= 20000))==false)
				{
					if (Xt> -20000) if (Xt<XMin) XMin=Xt;
					if (Yt> -20000) if (Yt<YMin) YMin=Yt;
					if (Xt< 20000) if (Xt>XMax) XMax=Xt;
					if (Yt< 20000) if (Yt>YMax) YMax=Yt;
				}
			}
		}
		
		for (I=0; I<OBB.Incid.length; I++)
		{
			
			OB=OBB.Incid[I];
//			if not Assigned(OB.Owner)  continue;

            if ((OB.OB=="P")==false) continue;
//			if not OB.MatchLayer(SCR.Lay,Ignore)  continue;
			if (IsReal(OB)==false) continue;
			if (OB.W==0) continue;
			if ((Math.abs(OB.X.Re)>10000) || (Math.abs(OB.Y.Re)>10000)) continue; // Исключение очень удаленных инцидентных точек
					
					
//          if Assigned(OB.Owner) 
//			{
//				Olist=OB.Owner;
//				if (not Assigned(Olist.Owner)) and (Owns.IndexOf(OB)<0)  continue;
//
//				PN=Olist.Owner;
//				if Assigned(PN) 
//				{
//					PTS=PN.Stroka;
//					if Assigned(PTS) 
//					{
//						if TAlg(SCR.Alg)<>PTS.Alg  continue;
//					}
//				}
//
//				if Assigned(TAlgWin(F).Navi) 
//				{
//					if not Assigned(PN)  continue;
//					if not Assigned(PN.Uk)  continue;
//
//					if TStroka(PN.Uk).Seq> TAlgWin(F).Navi.Counter  continue;
//
//				}
//
//
//			}
//
//
			
			if (OB.FAtt.lay.length>0) IncidList.push(OB)
			X=OBB.Incid[I].X.Re;
			Y=OBB.Incid[I].Y.Re;
			if (X<XMin) XMin=X;
			if (X>XMax) XMax=X;
			if (Y<YMin) YMin=Y;
			if (Y>YMax) YMax=Y; 
		}
	}

	if ((IncidList.length>1)) 
	{
		
		if (Math.abs(XMin-XMax)<Eps)
		{

			YMin=IncidList[0].Y.Re;
			YMax=YMin;

			for (I=1; I<=IncidList.Count-1; I++)
			{
				OB=IncidList[I];
				Y=OB.Y.Re;
				if (Y<YMin) YMin=Y;
				if (Y>YMax) YMax=Y;
			}

		}
		

		X=AMax1L(SCR.Xm,SCR.Ym);

		if ((Math.abs(XMin-XMax)<Eps) && (Math.abs(YMin-YMax)<Eps)) 
		{
			U=SK_SetPoint(SCR,OBB.X1.Re,OBB.Y1.Re);
			Xt1.Re=U.A;
			Yt1.Re=U.B;


			U=SK_SetPoint(SCR,OBB.X2.Re,OBB.Y2.Re);
			Xt2.Re=U.A;
			Yt2.Re=U.B;

			D=Math.sqrt(Sqr(Xt2.Re-Xt1.Re)+Sqr(Yt2.Re-Yt1.Re));
			Lx=(Xt2.Re-Xt1.Re)/D;
			Ly=(Yt2.Re-Yt1.Re)/D;

			{
				Rx=MCompl(X*SCR.Kf*Lx,0);
				Ry=MCompl(X*SCR.Kf*Ly,0);
				if (Typ=0)
				{
					LineList.push(Qwartet_Create(CompSub(Xt1,Rx),CompSub(Yt1,Ry),CompSum(Xt2,Rx),CompSum(Yt2,Ry)));
				}
				
				if (Typ=1) 
				{
					LineList.push(Qwartet_Create(Xt1,Yt1,CompSum(Xt2,Rx),CompSum(Yt2,Ry)));
				}
			}

			return true;
		}


		U=SK_SetPoint(SCR,XMin,YMin);
		Xa1=U.A;
		Ya1=U.B;
		U=SK_SetPoint(SCR,XMax,YMax);
		Xa2=U.A;
		Ya2=U.B;

		if (OBB.X1.Re<OBB.X2.Re) 
			{Xt1.Re=Xa1; Xt2.Re=Xa2} 
		else 
			{Xt1.Re=Xa2; Xt2.Re=Xa1}
          	
		if (OBB.Y1.Re<OBB.Y2.Re) 
			{Yt1.Re=Ya1; Yt2.Re=Ya2}
	 	else 
		 	{Yt1.Re=Ya2; Yt2.Re=Ya1}



		D=Math.sqrt(Sqr(Xt2.Re-Xt1.Re)+Sqr(Yt2.Re-Yt1.Re));
		Lx=(Xt2.Re-Xt1.Re)/D;
		Ly=(Yt2.Re-Yt1.Re)/D;


		if ((Math.abs(Xt1.Re)<10000) && (Math.abs(Yt1.Re)<10000) && (Math.abs(Xt2.Re)<10000) && (Math.abs(Yt2.Re)<10000)) 
		{
			Rx=MCompl(SCR.LineTail*SCR.Kf*Lx,0);
			Ry=MCompl(SCR.LineTail*SCR.Kf*Ly,0);
			if (Typ==0)
			{
				LineList.push(Qwartet_Create(CompSub(Xt1,Rx),CompSub(Yt1,Ry),CompSum(Xt2,Rx),CompSum(Yt2,Ry)));
			}

			if (Typ==1)
			{
				LineList.push(Qwartet_Create(Xt1,Yt1,CompSum(Xt2,Rx),CompSum(Yt2,Ry)));
			}
		} else
		{
			Rx=MCompl(SCR.LineTail*X*SCR.Kf*Lx,0);
			Ry=MCompl(SCR.LineTail*X*SCR.Kf*Ly,0);

			U=LinLin(Xt1.Re,Yt1.Re,Xt2.Re,Yt2.Re,0,0,X,0);
			Qx.Re=U.X;
			Qy.Re=U.Y;
			ZZ=U.W;
			Prizn=U.P;

			if (Prizn && (Qx.Re>0) && (Qx.Re<X)) 
			{
				LineList.push(Qwartet_Create(CompSub(Qx,Rx),CompSub(Qy,Ry),CompSum(Qx,Rx),CompSum(Qy,Ry)));
				return true;
			}

			U=LinLin(Xt1.Re,Yt1.Re,Xt2.Re,Yt2.Re,0,Y,X,Y);
			Qx.Re=U.X;
			Qy.Re=U.Y;
			ZZ=U.W;
			Prizn=U.P;

			if (Prizn && (Qx.Re>0) && (Qx.Re<X)) 
			{
				LineList.push(Qwartet_Create(CompSub(Qx,Rx),CompSub(Qy,Ry),CompSum(Qx,Rx),CompSum(Qy,Ry)));
				return true;
			}

			U=LinLin(Xt1.Re,Yt1.Re,Xt2.Re,Yt2.Re,0,0,0,Y);
			Qx.Re=U.X;
			Qy.Re=U.Y;
			ZZ=U.W;
			Prizn=U.P;

			if (Prizn && (Qy.Re>0) && (Qy.Re<Y)) 
			{
				LineList.push(Qwartet_Create(CompSub(Qx,Rx),CompSub(Qy,Ry),CompSum(Qx,Rx),CompSum(Qy,Ry)));
				return true;
			}

			U=LinLin(Xt1.Re,Yt1.Re,Xt2.Re,Yt2.Re,X,0,X,Y);
			Qx.Re=U.X;
			Qy.Re=U.Y;
			ZZ=U.W;
			Prizn=U.P;


			if (Prizn && (Qy.Re>0) && (Qy.Re<Y)) 
			{
				LineList.push(Qwartet_Create(CompSub(Qx,Rx),CompSub(Qy,Ry),CompSum(Qx,Rx),CompSum(Qy,Ry)));
				return true;
			}
		}
			
	} else
	{
		D=Math.sqrt(Sqr(Xt2.Re-Xt1.Re)+Sqr(Yt2.Re-Yt1.Re));
		Lx=(Xt2.Re-Xt1.Re)/D;
		Ly=(Yt2.Re-Yt1.Re)/D;
		X=AMax1L(SCR.Xm,SCR.Ym);
		Rx=MCompl(X*SCR.Kf*Lx,0);
		Ry=MCompl(X*SCR.Kf*Ly,0);

        U=SK_GetPoint(0,0,SCR);
		XLeft=U.X;
		YUp=U.Y;


        U=SK_GetPoint(SCR.Xm,SCR.Ym,SCR);
		XRight=U.X;
		YDown=U.Y;

		
		U=LinLin (OBB.X1.Re,OBB.Y1.Re,OBB.X2.Re,OBB.Y2.Re,XLeft,YUp,XRight,YUp); // Пересечение с верхней линией экрана
		XR1=U.X;
		YR1=U.Y;
		ZR1=U.W;

		U=LinLin (OBB.X1.Re,OBB.Y1.Re,OBB.X2.Re,OBB.Y2.Re,XLeft,YDown,XRight,YDown); // {Пересечение с нижней линией экрана
		XR2=U.X;
		YR2=U.Y;
		ZR2=U.W;

		U=LinLin (OBB.X1.Re,OBB.Y1.Re,OBB.X2.Re,OBB.Y2.Re,XLeft,YDown,XLeft,YUp); // Пересечение с левой линией экрана
		XR3=U.X;
		YR3=U.Y;
		ZR3=U.W;

		U=LinLin (OBB.X1.Re,OBB.Y1.Re,OBB.X2.Re,OBB.Y2.Re,XRight,YDown,XRight,YUp); // Пересечение с правой линией экрана
		XR4=U.X;
		YR4=U.Y;
		ZR4=U.W;

		
		IA=-1;
	
		if (ZR1==1) if ((XR1<=XRight) && (XLeft<=XR1)) { IA++; AX[IA]=XR1; AY[IA]=YUp }
		if (ZR2==1) if ((XR2<=XRight) && (XLeft<=XR2)) { IA++; AX[IA]=XR2; AY[IA]=YDown }
		if (ZR3==1) if ((YR3<=YUp) && (YDown<=YR3)) { IA++; AX[IA]=XLeft; AY[IA]=YR3 }
		if (ZR4==1) if ((YR4<=YUp) && (YDown<=YR4)) { IA++; AX[IA]=XRight; AY[IA]=YR4 }


		U=SK_SetPoint(SCR,AX[0],AY[0]);
		Xa1=U.A;
		Ya1=U.B;

		U=SK_SetPoint(SCR,AX[1],AY[1]);
		Xa2=U.A;
		Ya2=U.B;

		if (IA==1)
		{
			T1=MCompl(Xa1,0);
			T2=MCompl(Ya1,0);
			T3=MCompl(Xa2,0);
			T4=MCompl(Ya2,0);
			LineList.push(Qwartet_Create(T1,T2,T3,T4));
		}
	}
//  IncidList.Destroy;
} // LineIncidented


function ShortLineIncidented(OBB,LineList)
{
    var Koeff=2;
	var Xt1={Re:undefined, Im: undefined }
	var Yt1={Re:undefined, Im: undefined }
	var Xt2={Re:undefined, Im: undefined }
	var Yt2={Re:undefined, Im: undefined }
	
    
	if (OBB.Incid.length>1) 
	{


		XMin=OBB.Incid[0].X.Re;
		YMin=OBB.Incid[0].Y.Re;
		XMax=XMin;
		YMax=YMin;
		for (I=0; I<=OBB.Incid.length-1; I++)
		{
			OB=OBB.Incid[I];
			if (!(OB.OB=="P"))  continue;
//			if not OB.MatchLayer(SCR.Lay,Ignore)  continue;
			if (OB.W==0) continue;
			Xt=OBB.Incid[I].X.Re;
			Yt=OBB.Incid[I].Y.Re;
			XMin=Xt;
			YMin=Yt;
			XMax=Xt;
			YMax=Yt;
			break;
		}

		for (I=0; I<=OBB.Incid.length-1; I++)
		{
			OB=OBB.Incid[I];
			if (!(OB.OB=="P"))  continue;
//			if not OB.MatchLayer(SCR.Lay,Ignore)  continue;
			if (OB.W==0)  continue;
			Xt=OBB.Incid[I].X.Re;
			Yt=OBB.Incid[I].Y.Re;
			if (Xt<XMin)  XMin=Xt;
			if (Yt<YMin)  YMin=Yt;
			if (Xt>XMax)  XMax=Xt;
			if (Yt>YMax)  YMax=Yt;
		}

		if (Math.abs(XMin-XMax)<Eps) 
		{
			
			YMin=OBB.Incid[0].Y.Re;
			YMax=YMin;
			for (I=0; I<=OBB.Incid.length-1; I++)
			{

//				if not TOPoint(Incid.Items[I]).MatchLayer(SCR.Lay,Ignore)  continue;
				if (OBB.Incid[I].W==0)  continue;
				Y=OBB.Incid[I].Y.Re;
				if (Y<YMin) { YMin=Y }
				if (Y>YMax) { YMax=Y }
			
			}
		}

		if ((Math.abs(XMin-XMax)<Eps) && (Math.abs(YMin-YMax)<Eps)) 
		{
			X=AMax1L(SCR.Xm,SCR.Ym);
			U=SK_SetPoint(SCR,OBB.X1.Re,OBB.Y1.Re);
			Xt1.Re=U.A;
			Yt1.Re=U.B;

			U=SK_SetPoint(Xt2.Re,Yt2.Re,SCR,OBB.X2.Re,OBB.Y2.Re);
			Xt2.Re=U.A;
			Yt2.Re=U.B;

			D=Mat.sqrt(Sqr(Xt2.Re-Xt1.Re)+Sqr(Yt2.Re-Yt1.Re));
			Lx=(Xt2.Re-Xt1.Re)/D;
			Ly=(Yt2.Re-Yt1.Re)/D;
			{
				Rx=MCompl(X*SCR.Kf*Lx*Koeff,0);
				Ry=MCompl(X*SCR.Kf*Ly*Koeff,0);
				LineList.push(Qwartet_Create(CompSum(Xt1,Rx),CompSum(Yt1,Ry),Xt1,Yt1));
				LineList.push(Qwartet_Create(CompSub(Xt2,Rx),CompSub(Yt2,Ry),Xt2,Yt2));
			}
			return true;
		}

		U=SK_SetPoint(SCR,OBB.X1.Re,OBB.Y1.Re);
		Xt1.Re=U.A;
		Yt1.Re=U.B;


		U=SK_SetPoint(SCR,OBB.X2.Re,OBB.Y2.Re);
		Xt2.Re=U.A;
		Yt2.Re=U.B;
		
		D=Math.sqrt(Sqr(Xt2.Re-Xt1.Re)+Sqr(Yt2.Re-Yt1.Re));
		Lx=(Xt2.Re-Xt1.Re)/D;
		Ly=(Yt2.Re-Yt1.Re)/D;


		if ((Math.abs(Xt1.Re)<10000) && (Math.abs(Yt1.Re)<10000) && (Math.abs(Xt2.Re)<10000) && (Math.abs(Yt2.Re)<10000)) 
		{
			
			Rx=MCompl(SCR.LineTail*SCR.Kf*Lx*Koeff,0);
			Ry=MCompl(SCR.LineTail*SCR.Kf*Ly*Koeff,0);

			for (I=0; I<=OBB.Incid.length-1; I++)
			{
//				if not TOPoint(Incid.Items[I]).MatchLayer(SCR.Lay,Ignore)  continue;
				if (OBB.Incid[I].W==0)  continue;
				X=OBB.Incid[I].X.Re;
				Y=OBB.Incid[I].Y.Re;
				U=SK_SetPoint(SCR,X,Y);
				Xt1.Re=U.A;
				Yt1.Re=U.B;
				LineList.push(Qwartet_Create(CompSum(Xt1,Rx),CompSum(Yt1,Ry),CompSub(Xt1,Rx),CompSub(Yt1,Ry)));
			}
			

		} else
		{
			Rx=MCompl(SCR.LineTail*X*SCR.Kf*Lx*Koeff,0);
			Ry=MCompl(SCR.LineTail*X*SCR.Kf*Ly*Koeff,0);

			U=LinLin(Xt1.Re,Yt1.Re,Xt2.Re,Yt2.Re,0,0,X,0);
			Qx.Re=U.X;
			Qy.Re=U.Y;
			ZZ=U.W;
			Prizn=U.P;
			if (Prizn && (Qx.Re>0) && (Qx.Re<X)) 
			{
				LineList.push(Qwartet_Create(CompSub(Qx,Rx),CompSub(Qy,Ry),CompSum(Qx,Rx),CompSum(Qy,Ry)));
				return true;
			}

			U=LinLin(Xt1.Re,Yt1.Re,Xt2.Re,Yt2.Re,0,Y,X,Y);
			Qx.Re=U.X;
			Qy.Re=U.Y;
			ZZ=U.W;
			Prizn=U.P;

			if (Prizn && (Qx.Re>0) && (Qx.Re<X)) 
			{
				LineList.push(Qwartet_Create(CompSub(Qx,Rx),CompSub(Qy,Ry),CompSum(Qx,Rx),CompSum(Qy,Ry)));
				return true;
			}

			U=LinLin(Xt1.Re,Yt1.Re,Xt2.Re,Yt2.Re,0,0,0,Y);
			Qx.Re=U.X;
			Qy.Re=U.Y;
			ZZ=U.W;
			Prizn=U.P;

			if (Prizn && (Qy.Re>0) && (Qy.Re<Y)) 
			{
				LineList.push(Qwartet_Create(CompSub(Qx,Rx),CompSub(Qy,Ry),CompSum(Qx,Rx),CompSum(Qy,Ry)));
				return true;
			}

			U=LinLin(Xt1.Re,Yt1.Re,Xt2.Re,Yt2.Re,X,0,X,Y);
			Qx.Re=U.X;
			Qy.Re=U.Y;
			ZZ=U.W;
			Prizn=U.P;

			if (Prizn && (Qy.Re>0) && (Qy.Re<Y)) 
			{
				LineList.push(Qwartet_Create(CompSub(Qx,Rx),CompSub(Qy,Ry),CompSum(Qx,Rx),CompSum(Qy,Ry)));
				return true;
			}
		
		
		}

		
	} else
	{
		
		D=Math.sqrt(Sqr(Xt2.Re-Xt1.Re)+Sqr(Yt2.Re-Yt1.Re));
		Lx=(Xt2.Re-Xt1.Re)/D;
		Ly=(Yt2.Re-Yt1.Re)/D;
		Rx=MCompl(SCR.LineTail*SCR.Kf*Lx*Koeff,0);
		Ry=MCompl(SCR.LineTail*SCR.Kf*Ly*Koeff,0);
		{
			LineList.push(Qwartet_Create(CompSum(Xt1,Rx),CompSum(Yt1,Ry),CompSub(Xt1,Rx),CompSub(Yt1,Ry)));
		} 
		
	}

} //  ShortLineIncidented 


function Prohibited(Xt1,Yt1,Xt2,Yt2,SCR)
{
     return ((Xt1<SCR.XScreenMin) && (Xt2<SCR.XScreenMin)) ||
                  ((Xt1>SCR.XScreenMax) && (Xt2>SCR.XScreenMax)) ||
                  ((Yt1<SCR.YScreenMin) && (Yt2<SCR.YScreenMin)) ||
                  ((Yt1>SCR.YScreenMax) && (Yt2>SCR.YScreenMax));
} // Prohibited



function ParamLine(A,B)
{
	return true;
}

function DrawKind1(Lin,LineList,OBB)
{
	var Xt1={Re:undefined, Im: undefined }
	var Yt1={Re:undefined, Im: undefined }
	var Xt2={Re:undefined, Im: undefined }
	var Yt2={Re:undefined, Im: undefined }
	var AX=new Array();
	var AY=new Array();

	
// DrawKindStart
	if (Lin.Null)
	{
		LineList.push(Qwartet_Create(Xt1,Yt1,Xt2,Yt2));
		return true
	}
	var X=AMax1L(SCR.Xm,SCR.Ym);

	if (SCR.TP=="3") 
	{
		XA=SCR.M[1,1]*OBB.X1.Re+SCR.M[1,2]*OBB.Y1.Re+SCR.M[1,3]*0;
		YA=SCR.M[2,1]*OBB.X1.Re+SCR.M[2,2]*OBB.Y1.Re+SCR.M[2,3]*0;
		U=SK_SetPoint(SCR,XA,YA);
		Xt1.Re=U.A;
		Yt1.Re=U.B;

		XB=SCR.M[1,1]*OBB.X2.Re+SCR.M[1,2]*OBB.Y2.Re+SCR.M[1,3]*0;
		YB=SCR.M[2,1]*OBB.X2.Re+SCR.M[2,2]*OBB.Y2.Re+SCR.M[2,3]*0;
		U=SK_SetPoint(SCR,XB,YB);
		Xt2.Re=U.A;
		Yt2.Re=U.B;
	}


	if (SCR.TP=="E") 
	{
		U=SK_SetPoint(SCR,OBB.X1.Re,OBB.Y1.Re);
		Xt1.Re=U.A;
		Yt1.Re=U.B;

		U=SK_SetPoint(SCR,OBB.X2.Re,OBB.Y2.Re);
		Xt2.Re=U.A;
		Yt2.Re=U.B;
	}


	D=Math.sqrt(Sqr(Xt2.Re-Xt1.Re)+Sqr(Yt2.Re-Yt1.Re));
	Lx=(Xt2.Re-Xt1.Re)/D;
	Ly=(Yt2.Re-Yt1.Re)/D;
	
	switch (Lin.FAtt.Lv)
	{ 	


		case drw_Limited:

		switch (Lin.draw_AsBorned)
		{
			case brn_Limited:
			{
				if ((SCR.SK==EuclidSK1) || (SCR.SK==EuclidSK2) || (SCR.SK==EuclidSK3) || (SCR.SK==EuclidSK4)) 
				{
					LineList.push(Qwartet_Create(Xt1,Yt1,Xt2,Yt2));
				} 
				else ParamLine(0,1);
				
			}
			break;
			case brn_HalfLimited,brn_UnLimited:
			{
				LineIncidented(0,OBB,LineList);
			}
			break;
		} // case draw_AsBorned
		break
		
		case Lin.drw_Unlimited,Lin.drw_Empty:
		{
			if ((SCR.SK==EuclidSK1) || (SCR.SK==EuclidSK2) || (SCR.SK==EuclidSK3) || (SCR.SK==EuclidSK4)) 
			{
				Rx=MCompl(X*SCR.Kf*Lx,0);
				Ry=MCompl(X*SCR.Kf*Ly,0);
				if (Prohibited(Xt1.Re-Rx.Re,Yt1.Re-Ry.Re,Xt2.Re+Rx.Re,Yt2.Re+Ry.Re,SCR)==false)
				{

					U=SK_GetPoint(0,0,SCR);
					XLeft=U.X;
					YUp=U.Y;
					U=SK_GetPoint(SCR.Xm,SCR.Ym,SCR);
					XRight=U.X;
					YDown=U.Y;

					// Пересечение с верхней линией экрана
					U=LinLin(OBB.X1.Re,OBB.Y1.Re,OBB.X2.Re,OBB.Y2.Re,XLeft,YUp,XRight,YUp);
					XR1=U.X;
					YR1=U.Y;
					ZR1=U.W;

					// Пересечение с нижней линией экрана
					U=LinLin(OBB.X1.Re,OBB.Y1.Re,OBB.X2.Re,OBB.Y2.Re,XLeft,YDown,XRight,YDown);
					XR2=U.X;
					YR2=U.Y;
					ZR2=U.W;
 
					// Пересечение с левой линией экрана
					U=LinLin(OBB.X1.Re,OBB.Y1.Re,OBB.X2.Re,OBB.Y2.Re,XLeft,YDown,XLeft,YUp);
					XR3=U.X;
					YR3=U.Y;
					ZR3=U.W; 
			
					// Пересечение с правой линией экрана

					U=LinLin(OBB.X1.Re,OBB.Y1.Re,OBB.X2.Re,OBB.Y2.Re,XRight,YDown,XRight,YUp);
					XR4=U.X;
					YR4=U.Y;
					ZR4=U.W;  

					IA=-1;
					if (ZR1==1) if ((XR1<=XRight) && (XLeft<=XR1)) {IA++; AX[IA]=XR1; AY[IA]=YUp}
					if (ZR2==1) if ((XR2<=XRight) && (XLeft<=XR2)) {IA++; AX[IA]=XR2; AY[IA]=YDown}
					if (ZR3==1) if ((YR3<=YUp) && (YDown<=YR3)) {IA++; AX[IA]=XLeft; AY[IA]=YR3}
					if (ZR4==1) if ((YR4<=YUp) && (YDown<=YR4)) {IA++; AX[IA]=XRight; AY[IA]=YR4}


					U=SK_SetPoint(SCR,AX[0],AY[0]);
					Xa1=U.A;
					Ya1=U.B
					U=SK_SetPoint(SCR,AX[1],AY[1]);
					Xa2=U.A;
					Ya2=U.B

					if (IA=1)
					{
						LineList.push(Qwartet_Create(MCompl(Xa1,0),MCompl(Ya1,0),MCompl(Xa2,0),MCompl(Ya2,0)));
					}

				}
			} 
			else ParamLine(-1,2);
		}
		break;
		
		case drw_Opposite:
		switch (Lin.draw_AsBorned)
		{
			case brn_Limited:
			{
				if ((SCR.SK==EuclidSK1) || (SCR.SK=EuclidSK2) || (SCR.SK=EuclidSK3) || (SCR.SK=EuclidSK4)) 
				{
					Rx=MCompl(X*SCR.Kf*Lx,0);
					Ry=MCompl(X*SCR.Kf*Ly,0);
					LineList.push(Qwartet_Create(CompSub(Xt1,Rx),CompSub(Yt1,Ry),Xt1,Yt1));
					LineList.push(Qwartet_Create(Xt2,Yt2,CompSum(Xt2,Rx),CompSum(Yt2,Ry)));

				} 
				else
				{
					ParamLine(-1,0);
					ParamLine(1,2);
				}
				
			}
			break;
		} // case draw_AsBorned
		break;

		case drw_Plus:
		switch (Lin.draw_AsBorned)
		{
			case brn_Limited,brn_HalfLimited:
			{
				Rx=MCompl(X*SCR.Kf*Lx,0);
				Ry=MCompl(X*SCR.Kf*Ly,0);
				if ((SCR.SK==EuclidSK1) || (SCR.SK==EuclidSK2) || (SCR.SK==EuclidSK3) || (SCR.SK==EuclidSK4))
				{
					LineIncidented(1,OBB,LineList);
				} 
				else ParamLine(0,2);
			}
			break;
		} // case draw_AsBorned
		break;

		case drw_Minus:
		switch (Lin.draw_AsBorned)
		{
			case brn_Limited,brn_HalfLimited:
			{
				Rx=MCompl(X*SCR.Kf*Lx,0);
				Ry=MCompl(X*SCR.Kf*Ly,0);
				if ((SCR.SK==EuclidSK1) || (SCR.SK==EuclidSK2) || (SCR.SK==EuclidSK3) || (SCR.SK==EuclidSK4))
				{
					LineList.push(Qwartet_Create(Xt1,Yt1,CompSub(Xt1,Rx),CompSub(Yt1,Ry)));
				} else ParamLine(-1,0);
			}
			break;
		}
		break;

		case drw_Incidented: 
		{ 
			LineIncidented(0,OBB,LineList);
		}
		break;
	

		case drw_ShortIncidented:
		{
			ShortLineIncidented(OBB,LineList);
		}
		break;

	} // case LIN.FAtt.LV
} // TOLine.DrawKind1


var point=function(OB,fill,K)
{
	var SVGObj= document.createElementNS(NS,"circle");
	SVGObj.cx.baseVal.value=OB.X.Re;
	SVGObj.cy.baseVal.value=OB.Y.Re;
	SVGObj.r.baseVal.value=3*CM;
	SVGObj.style.fill=fill;
	SVGObj.style.stroke="black";
	SVGObj.setAttribute('stroke-width',K*CM);	
	svg.appendChild(SVGObj);

	if (!(OB.Name==undefined))
	{
	var SVGObj= document.createElementNS(NS,"text");
	SVGObj.setAttribute('x', OB.X.Re+5);
	SVGObj.setAttribute('y', OB.Y.Re+15);
	SVGObj.setAttribute('fill', '#000');
	SVGObj.textContent = OB.Name;	
	svg.appendChild(SVGObj);
	}
	return SVGObj;
}


var partline=function(OB,fill,wd)
{
	var SVGObj= document.createElementNS(NS,"line");
	SVGObj.x1.baseVal.value=OB.X1.Re;
	SVGObj.y1.baseVal.value=OB.Y1.Re;
	SVGObj.x2.baseVal.value=OB.X2.Re;
	SVGObj.y2.baseVal.value=OB.Y2.Re;
	SVGObj.style.stroke="black";
	SVGObj.setAttribute('stroke-width',wd*CM);	
	return SVGObj;
}

	

var line=function(OB,fill,wd)
{
		
	var LineList=new Array();
	var V=new Object();
	DrawKind1(OB,LineList,OB)
		
	for (I=0; I<LineList.length;I++)
	{
		X1=LineList[I].X1;
		Y1=LineList[I].Y1;
		X2=LineList[I].X2;
		Y2=LineList[I].Y2;
		TOLine_Create(V,X1,Y1,1,X2,Y2,1,0,0,0);	
		SVGObj=partline(V,fill,wd);
		svg.appendChild(SVGObj);
	}

	return SVGObj;
}

function Arcc(X,Y,St,En,R,SCR,wd)
{
    Pi2U=Math.PI*2;
    if (R>0) if (En<St) En=En+Pi2U;
    
	if (R<0)
    {
		F=En;
        En=St;
        St=F;
        while (En<=St) {En=En+Pi2U}
    }


    while ((St<0) || (En<0)) 
    {
		St=St+Pi2U;
		En=En+Pi2U;
    }


    V=360/Math.PI/2;
	Fis=St*V;
	Fie=En*V;
//	alert(X);
	// закрыто временно до определения функций границ
/*
	if (X+Math.abs(R)<0) return true;
	if (X-Math.abs(R)>SCR.Xm) return true;
	if (Y+Math.abs(R)<0) return true;
	if (Y-Math.abs(R)>SCR.Ym) return true;
*/
/*
	if (Math.abs(R)<10)
	{
     
//		if CV.Pen.Width>0 then CV.Arc(Trunc(X-Abs(R)),Trunc(Y-Abs(R)),Trunc(X+Abs(R)),Trunc(Y+Abs(R)), Trunc(X+Abs(R)*Cos(St)),Trunc(Y-Abs(R)*Sin(St)),Trunc(X+Abs(R)*Cos(En)),Trunc(Y-Abs(R)*Sin(En)))
	}
	else
*/	{
		Fiss=St;
		Fiee=En;
		
		A=Fiss;
		Step=(Fiee-Fiss)/100-1E-5;
		

		if (SCR.SK==EuclidSK1) { XI=1; YI=+1 }
		if (SCR.SK==EuclidSK2) { XI=-1; YI=1 }
		if (SCR.SK==EuclidSK3) { XI=1; YI=-1 }
		if (SCR.SK==EuclidSK4) { XI=-1; YI=-1 }
		Xk=X+Math.abs(R)*Math.cos(A)*XI;
		Yk=Y+Math.abs(R)*Math.sin(A)*YI; // заменить на минус
		Xks=Xk;
		Yks=Yk;
		if ((Math.abs(Xk)>32000) || (Math.abs(Yk)>32000)) return true;


//		CV.MoveTo(Xk,Yk);
		Xprev=Xk;
		Yprev=Yk;


		if (Math.abs(En-St)>Eps) 
		{
			while (A<Fiee) 
			{
				Xk=X+Math.abs(R)*Math.cos(A)*XI;
				Yk=Y+Math.abs(R)*Math.sin(A)*YI; // заменить на минус
				if ((Math.abs(Xk)>32000) || (Math.abs(Yk)>32000)) return true;
//				if (CV.Pen.Width>0) CV.LineTo(Xk,Yk);
				var V=new Object();
				TOLine_Create(V,MCompl(Xprev,0),MCompl(Yprev,0),1,MCompl(Xk,0),MCompl(Yk,0),1,0,0,Att0);	
				SVGObj=partline(V,"none",wd);
				svg.appendChild(SVGObj);
				Xprev=Xk;
				Yprev=Yk;
				
				A=A+Step;
			}
		}
		Xke=Xk;
		Yke=Yk;
	}
	return SVGObj;
		
} //Arcc

function IsDostup(P)
{
	Result=true;
	if (!IsSobstv(P)) {return false}
	if (Math.abs(P.X.Re)>1000000) {return false}
	if (Math.abs(P.Y.Re)>1000000) {return false}
	return Result;
} // IsDostup 


function KVP(FStart,FEnd,P1,P2,P3,P4,P5,wd)
{
	var Delta;
    var Was,Now,AI,B1,B2;
    var I;
	Was=false;
	AI=AllowAddInc;
	AllowAddInc=false;
	if (Math.abs(FEnd-FStart)<Eps) FEnd=FStart+90;
	Delta=(FEnd-FStart)/KWDiskr; // {1180}{1120}
	if (Math.abs(Delta)<Eps) return;

	var O1=new Object();
	var O2=new Object();
	var P6=new Object();
	var O3=new Object();
	var O5=new Object();
	var Cst=new Object();
	var AO4=new Object();
	var AP7=new Object();
	var AO6=new Object();
	var AP8=new Object();
	var AO7=new Object();
	var AP9=new Object();
	var V=new Object();
	
	EExecO0(O1,P5,P1,Att5,1,1);
	EExecO0(O2,P4,P2,Att5,1,1);
	EExecP2(P6,O1,O2,Att5,1,1);
	EExecO0(O3,P3,P1,Att5,1,1);
	EExecO0(O5,P3,P2,Att5,1,1);
	
	
	TOChisl_Create(Cst,MCompl(FStart,0),Att0);
	EExecO1(AO4,P4,Cst,Att5,1,1);
	EExecP2(AP7,O3,AO4,Att0,1,1);
	EExecO0(AO6,AP7,P6,Att5,1,1);
	EExecP2(AP8,O5,AO6,Att0,1,1);
	EExecO0(AO7,P5,AP8,Att5,1,1);
	EExecP2(AP9,AO7,AO4,Att0,1,1);
	if (!IsDostup(AP9)) Was=true;
	
//	XtSCR.M[1,1]*TOPoint(AP9).X.Re+SCR.M[1,2]*TOPoint(AP9).Y.Re{+SCR.M[1,3]*0};
//	YtSCR.M[2,1]*TOPoint(AP9).X.Re+SCR.M[2,2]*TOPoint(AP9).Y.Re{+SCR.M[2,3]*0};
	
//	with SCR do SK.SetPoint(X,Y,SCR,Xt,Yt);

	X=AP9.X.Re;
	Y=AP9.Y.Re;
	Dx3=1;
	Dy3=1;
	if (X<SCR.XScreenMin-Dx3) {Was=true}
	if (X>SCR.XScreenMax+Dx3) {Was=true}
	if (Y<SCR.YScreenMin-Dy3) {Was=true}
	if (Y>SCR.YScreenMax+Dy3) {Was=true}

//	if (!Was) Cv.MoveTo(Math.trunc(X),Math.trunc(Y));

	XPrev=X;
	YPrev=Y;
	FF=FStart;
	
	I=0;
	while (FF<=FEnd) 
	{
		TOChisl_Create(Cst,MCompl(FF,0),Att0);
		EExecO1(AO4,P4,Cst,Att5,1,1);
		EExecP2(AP7,O3,AO4,Att0,1,1);
		EExecO0(AO6,AP7,P6,Att5,1,1);
		EExecP2(AP8,O5,AO6,Att0,1,1);
		EExecO0(AO7,P5,AP8,Att5,1,1);
		EExecP2(AP9,AO7,AO4,Att0,1,1);

		Now=false;


		if (!IsDostup(AP9)) {Now=true} else {Now=false}

//		XtSCR.M[1,1]*TOPoint(AP9).X.Re+SCR.M[1,2]*TOPoint(AP9).Y.Re{+SCR.M[1,3]*0};
//		YtSCR.M[2,1]*TOPoint(AP9).X.Re+SCR.M[2,2]*TOPoint(AP9).Y.Re{+SCR.M[2,3]*0};
//		with SCR do SK.SetPoint(X,Y,SCR,Xt,Yt);

		X=AP9.X.Re;
		Y=AP9.Y.Re;

		if (X<SCR.XScreenMin-Dx3) Now=true;
		if (X>SCR.XScreenMax+Dx3) Now=true;
		if (Y<SCR.YScreenMin-Dy3) Now=true;
		if (Y>SCR.YScreenMax+Dy3) Now=true;

//		B1=((X<SCR.XScreenMin) || (X>SCR.XScreenMax) || (Y<SCR.YScreenMin-Dy3) || (Y>SCR.YScreenMax));
//		B2=((XPrev<SCR.XScreenMin) || (XPrev>SCR.XScreenMax) || (YPrev<SCR.YScreenMin-Dy3) || (YPrev>SCR.YScreenMax));

		B1=((X<-739) || (X>1478) || (Y<-283) || (Y>567));
		B2=((XPrev<-739) || (XPrev>1478) || (YPrev<-283) || (YPrev>567));

		if ((!B1 && B2) || (!B2 && B1) || (!B1 && !B2)) 
		{
//			Cv.MoveTo(Math.trunc(Xprev),Math.trunc(Yprev));
//			Cv.LineTo(Math.trunc(X),Math.trunc(Y));
			TOLine_Create(V,MCompl(XPrev,0),MCompl(YPrev,0),1,MCompl(X,0),MCompl(Y,0),1,0,0,Att0);	

			SVGObj=partline(V,"none",wd);
			svg.appendChild(SVGObj);
		}
		
		XPrev=X;
		YPrev=Y;
		Was=Now;
		FF=FF+Delta;
		I=I+1;
	}
	AllowAddInc=AI;
} // KVP

var conic=function(P,fill,wd)
{

	var OB=new Object();
	var P1=new Object();
	var P2=new Object();
	var P3=new Object();
	var P4=new Object();
	var P5=new Object();
	var PPP=new Object();
	CreateCopy(OB,P);
	P1=OB.PR1;
	P2=OB.PR2;
	P3=OB.PR3;
	P4=OB.PR3;
	P5=OB.PR3;
	if (IsSobstv(OB.PR4)) 
	{
		P4=OB.PR4;
		P5=OB.PR5;
	}

	if (!IsSobstv(OB.PR4)) 
	{
		P5=OB.PR4;
		P4=OB.PR5;
		if (!IsSobstv(P4)) 
		{
			P4=OB.PR3;
			P3=OB.PR5;
		}
	}

	if (!IsReal(P4) && IsReal(P1)) 
	{
		PPP=P4;
		P4=P1;
		P1=PPP;
	}

	if (!IsReal(P4) && IsReal(P2)) 
	{
		PPP=P4;
		P4=P2;
		P2=PPP;
	}
/*	


	Df1=Fi(0,1,S,C);
	if (Df1<0) Df1=2*Math.PI+Df1;
	if (Df1>Math.PI) Df1=Df1-Math.PI;

	Df2=Fi(0,1,S,C);
	if (Df2<0) Df2=2*Math.PI+Df2;
	if (Df2>Math.PI) Df2=Df2-Math.PI;
	if (Df2<Df1) Df2=Df2+Math.PI;

	Df1=Df1*180/Math.PI;
	Df2=Df2*180/Math.PI;
	KVP(Df1,Df1+360);
*/
	KVP(0,360,P1,P2,P3,P4,P5,wd);

}
    
var circle=function(P,fill,wd)
{
	var SVGObj= document.createElementNS(NS,"circle");
	if ((P.FAtt.Lv==1) || (P.FAtt.Lv==5))
	{
		SVGObj.cx.baseVal.value=P.Xc.Re;
		SVGObj.cy.baseVal.value=P.Yc.Re;
		SVGObj.r.baseVal.value=P.R.Re;
		SVGObj.style.fill="none";
		SVGObj.setAttribute('stroke-width',CM);	
		SVGObj.style.stroke="rgb("+P.FAtt.Red+", "+P.FAtt.Green+", "+P.FAtt.Blue+")";
		svg	.appendChild(SVGObj);
	}

	if ((P.FAtt.Lv==0) || (P.FAtt.Lv==2))
	{
		if (Math.abs(P.R.Re)>Eps)
		{
			if ((P.FAtt.Lv==drw_Limited))
			{
				TX=P.X1;
				TY=P.Y1;
				QX=P.X2;
				QY=P.Y2;
			}
			
			if (P.FAtt.Lv==drw_Opposite)
			{
				TX=P.X2;
				TY=P.Y2;
				QX=P.X1;
				QY=P.Y1;
			}

			U=SC(P.Xc.Re,P.Yc.Re,TX,TY);
			Ss1=U.S;
			Cc1=U.C;
			
			U=SC(P.Xc.Re,P.Yc.Re,QX,QY);
			Ss2=U.S;
			Cc2=U.C;

		

			ASt=ArcSin(Ss1);

			if (Cc1<0) ASt=Math.PI-ASt;

			AEn=ArcSin(Ss2);


			if (Cc2<0) AEn=Math.PI-AEn;
			if (AEn<=ASt) AEn=AEn+2*Math.PI;
			RS=P.R.Re*SCR.Mas;

            U=SK_SetPoint(SCR,P.Xc.Re,P.Yc.Re);
			Xt=U.A;
			Yt=U.B;
			Arcc(Xt,Yt,ASt,AEn,RS,SCR,wd);

		}

	}
	if ((P.FAtt.Lv==5)|| (P.FAtt.Lv==1))
	{
		var SVGObj= document.createElementNS(NS,"circle");
		SVGObj.cx.baseVal.value=P.Xc.Re;
		SVGObj.cy.baseVal.value=P.Yc.Re;
		SVGObj.r.baseVal.value=Math.abs(P.R.Re);
		SVGObj.style.fill="none";
		SVGObj.setAttribute('stroke-width',CM);	
		SVGObj.style.stroke="rgb("+P.FAtt.Red+", "+P.FAtt.Green+", "+P.FAtt.Blue+")";
//		svg.appendChild(SVGObj);
	}
	return true;

}
var kontur=function(W,fill)
{
	for (i=0; i<W.Spis.length; i++)
	{
		OB=W.Spis[i];
		if (OB.OB=='O')
		{
			var c= line(OB,"white",4);
		}
		
		if (OB.OB=='D')
		{
     		var c= circle(OB,"white",4);
		}
	}

}

function draw(arr)
{

	var i;
	

	for (i=0; i<arr.length; i++)
	{	
		var OB=arr[i];
//		if (!(OB.FAtt.lay[0]=="основной")) continue;
		if (OB.OB=='W')
		{
		var c= kontur(OB,"white");
		}
	}
	
	
	for (i=0; i<arr.length; i++)
	{	
		var OB=arr[i];
		if (!(OB.FAtt.lay[0]=="основной")) continue;
		var K=1;
		if (OB.Selected) K=3;
		if (OB.OB=='O')
		{
			var c= line(OB,"white",K);
		}
		
		if (OB.OB=='D')
		{
			var c= circle(OB,"white",K);
		}
		
		if (OB.OB=='Y')
		{
     		var c= conic(OB,"white",K);
		}
		
	}

	for (i=0; i<arr.length; i++)
	{	
		var OB=arr[i];
		if (!(OB.FAtt.lay[0]=="основной")) continue;
		var K=1;
		if (OB.Selected) K=3;

		if (OB.OB=='P')
		{
			U=SK_SetPoint(SCR,OB.X.Re,OB.Y.Re)			
//			alert("point"+" "+OB.X.Re+" "+OB.Y.Re);
			
     		
			var c= point(OB,"white",K);
//     		svg.appendChild(c);
		}
	}
} // draw


function EExecAN(OOO,X,Y,Att,Sg1,Sg2)
{
	var Prizn; 
	var XX,YY; 
	var ZZ;
	var S={Re:undefined, Im:undefined}
	var S1;
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;

	if ((X.OB=="!") || (Y.OB=="!"))
	{
		// OOO=(TOBreak.Create([nil],OW));
		return true;
	}


	if ((X.OB=="C") && ((Y.OB=="C") || (Y.OB=="D"))) 
	{
		if (Y.OB=="C")
		{

			S.Re=X.C.Re*Sg1+Y.C.Re*Sg2;
			S.Im=X.C.Im*Sg1+Y.C.Im*Sg2;
			TOChisl_Create(OOO,S,Att);
		}

		if (Y.OB=="D")
		{
			S.Re=X.C.Re*Sg1+Y.R.Re*Sg2;
			S.Im=0;
			TOChisl_Create(OOO,S,Att);
		}
	} else

	if ((X.OB=="D") && ((Y.OB="C") || (Y.OB="D")))
	{
		if (Y.OB=="C") 
		{
			S.Re=X.R.Re*Sg1+Y.C.Re*Sg2;
			S.Im=0;
			TOChisl_Create(OOO,S,Att);
		}
			
		if (Y.OB=="D")
		{
			S.Re=X.R.Re*Sg1+Y.R.Re*Sg2;
			S.Im=0;
			TOChisl_Create(OOO,S,Att);
		}
	}
	else
		
	if ((X.OB=="V") && (Y.OB=="V"))
	{
		//          XX.Re=(TOVektor(X).X2.Re-TOVektor(X).X1.Re)*Sg1+(TOVektor(Y).X2.Re-TOVektor(Y).X1.Re)*Sg2;
		//          XX.Im=0;
		//          YY.Re=(TOVektor(X).Y2.Re-TOVektor(X).Y1.Re)*Sg1+(TOVektor(Y).Y2.Re-TOVektor(Y).Y1.Re)*Sg2;
		//          YY.Im=0;
		//          OOO=TOVektor.Create(MCompl(TOVektor(X).X1.Re,0),MCompl(TOVektor(X).Y1.Re,0),MCompl(TOVektor(X).X1.Re+XX.Re,0),MCompl(TOVektor(X).Y1.Re+YY.Re,0),Att,OW);
	} else
		
	if ((X.OB=="T") && (Y.OB=="T"))
	{
		//          OOO=TOText.Create(0,0,FALSE,TOText(X).T+TOText(Y).T,OW,Att);
	} else
		
	if ((X.OB=="T") && (Y.OB=="C"))
	{
		//          S1=FloatToStr(TOChisl(Y).C.Re);
		//          if Length(S1)>1  if Pos('.',S1)>0  while S1[Length(S1)]='0' do Delete(S1,Length(S1),1);
		//          if Pos('.',S1)=Length(S1)  Delete(S1,Length(S1),1);
		//          OOO=TOText.Create(0,0,FALSE,TOText(X).T+S1,OW,Att);
	} else
	{
		if (Att.Chk=1) OOO.OB="$";

	}
	return true;
} // EExecAN

function EExecAO(OOO,X,Y,Att,Sg1,Sg2)
{
	var Prizn; 
	var XX,YY; 
	var ZZ;
    var S={Re:undefined, Im:undefined}

    var S1;
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;

    if ((X.OB=="!") || (Y.OB=="!"))
    {
		// OOO=(TOBreak.Create([nil],OW));
		return true;
	}


    if ((X.OB=="C") && ((Y.OB=="C") || (Y.OB="D"))) 
	{
		if (Y.OB=="C")
		{

			S.Re=X.C.Re*Sg1-Y.C.Re*Sg2;
			S.Im=X.C.Im*Sg1-Y.C.Im*Sg2;
			TOChisl_Create(OOO,S,Att);

		}

		if (Y.OB=="D")
		{
			S.Re=X.C.Re*Sg1-Y.R.Re*Sg2;
			S.Im=0;
			TOChisl_Create(OOO,S,Att);

		}
	} else

	if ((X.OB=="D") && ((Y.OB="C") || (Y.OB="D")))
	{
		if (Y.OB=="C") 
		{
			S.Re=X.R.Re*Sg1-Y.C.Re*Sg2;
			S.Im=0;
			TOChisl_Create(OOO,S,Att);
		}

		if (Y.OB=="D")
		{
			S.Re=X.R.Re*Sg1-Y.R.Re*Sg2;
			S.Im=0;
			TOChisl_Create(OOO,S,Att);
		}
	}
	else
	if ((X.OB=="V") && (Y.OB=="V"))
	{
		//          XX.Re=(TOVektor(X).X2.Re-TOVektor(X).X1.Re)*Sg1-(TOVektor(Y).X2.Re-TOVektor(Y).X1.Re)*Sg2;
		//          XX.Im=0;
		//          YY.Re=(TOVektor(X).Y2.Re-TOVektor(X).Y1.Re)*Sg1-(TOVektor(Y).Y2.Re-TOVektor(Y).Y1.Re)*Sg2;
		//          YY.Im=0;
		//          OOO=TOVektor.Create(MCompl(TOVektor(X).X1.Re,0),MCompl(TOVektor(X).Y1.Re,0),MCompl(TOVektor(X).X1.Re+XX.Re,0),MCompl(TOVektor(X).Y1.Re+YY.Re,0),Att,OW);
	} 
	else
	{
		if (Att.Chk=1) OOO.OB="$";

    }
	return true;
} // EExecAO

function EExecAP(OOO,X,Y,Att,Sg1,Sg2)
{
	var Prizn;
	var XX,YY;
	var ZZ;
	var S={Re:undefined, Im:undefined}
//     OOO=NIL;

	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
    if ((X.OB=="!") || (Y.OB=="!")) 
	{
		//alert( X.OB+Y.OB);
		//          OOO=(TOBreak.Create([nil],OW));
		return true;
	}

	if ((X.OB=="C") && (Y.OB=="C"))
	{
		S=CompMul(X.C,Y.C);
		TOChisl_Create(OOO,S,Att);
    } else
		
	//     if ((X is TOVektor) and (Y is TOChisl) and (TOChisl(Y).IsReal)) 
	//     {
	//          XX.Re=(TOVektor(X).X2.Re-TOVektor(X).X1.Re)*ToChisl(Y).C.Re*Sg1*Sg2;
	//          XX.Im=0;
	//          YY.Re=(TOVektor(X).Y2.Re-TOVektor(X).Y1.Re)*ToChisl(Y).C.Re*Sg1*Sg2;
	//          YY.Im=0;
	//          OOO=TOVektor.Create(MCompl(TOVektor(X).X1.Re,0),MCompl(TOVektor(X).Y1.Re,0),MCompl(TOVektor(X).X1.Re+XX.Re,0),MCompl(TOVektor(X).Y1.Re+YY.Re,0),Att,OW);
	//     } else
	//     if (X is TOVektor) and (Y is TOVektor) 
	//     {
	//          XX.Re=(TOVektor(X).X2.Re-TOVektor(X).X1.Re)*Sg1*(TOVektor(Y).X2.Re-TOVektor(Y).X1.Re)*Sg2-(TOVektor(X).Y2.Re-TOVektor(X).Y1.Re)*Sg1*(TOVektor(Y).Y2.Re-TOVektor(Y).Y1.Re)*Sg2;
	//          XX.Im=0;
	//          YY.Re=(TOVektor(X).X2.Re-TOVektor(X).X1.Re)*Sg1*(TOVektor(Y).Y2.Re-TOVektor(Y).Y1.Re)*Sg2-(TOVektor(X).Y2.Re-TOVektor(X).Y1.Re)*Sg1*(TOVektor(Y).X2.Re-TOVektor(Y).X1.Re)*Sg2;
	//          YY.Im=0;
	//          OOO=TOVektor.Create(MCompl(TOVektor(X).X1.Re,0),MCompl(TOVektor(X).Y1.Re,0),MCompl(TOVektor(X).X1.Re+XX.Re,0),MCompl(TOVektor(X).Y1.Re+YY.Re,0),Att,OW);
	//     } else
    {
		if (Att.Chk=1) OOO.OB="$";
	}
    return true;
} // EExecAP

function EExecAQ(OOO,X,Y,Att,Sg1,Sg2)
{
	var S={Re:undefined, Im:undefined}

/*
	OOONIL;
	if (X is TOBreak) or (Y is TOBreak) then
	begin
		OOO(TOBreak.Create([nil],OW));
		Exit;
	end;

	if ((X is TOChislU) and ((Y is TOChislU)) then
	begin
		DualDiv(TOChislU(X).C,TOChislU(Y).C,S,Prizn);
		if Prizn then OOOTOChislU.Create(S,tc_Variable,Att,OW,c_ord) else if Att.Chk=1 then OOOTOEmpty.Create([X,Y],OW);
	end else
*/
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	if ((X.OB=="C") && (Y.OB=="C"))
	{
		VV=Sqr(Y.C.Re)+Sqr(Y.C.Im);
		S.Re=(X.C.Re*Sg1*Y.C.Re*Sg2+X.C.Im*Sg1*Y.C.Im*Sg2)/VV;
		S.Im=(X.C.Im*Sg1*Y.C.Re*Sg2-X.C.Re*Sg1*Y.C.Im*Sg2)/VV;
		TOChisl_Create(OOO,S,Att);
	} 
	
	else
	if ((X.OB=="D") && (Y.OB=="D")) 
	{
		VV=Sqr(Y.R.Re)+Sqr(Y.R.Im);
		S.Re=(X.R.Re*Sg1*Y.R.Re*Sg2+X.R.Im*Sg1*Y.R.Im*Sg2)/VV;
		S.Im=(X.R.Im*Sg1*Y.R.Re*Sg2-X.R.Re*Sg1*Y.R.Im*Sg2)/VV;
		TOChisl_Create(OOO,S,Att);
	} 

	else
	if ((X.OB=="V") && (Y.OB=="C") && (IsReal(Y)) && !(Y.C.Re==0))
	{
		XX.Re=(X.X2.Re-X.X1.Re)/Y.C.Re*Sg1*Sg2;
		XX.Im=0;
		YY.Re=(X.Y2.Re-X.Y1.Re)/Y.C.Re*Sg1*Sg2;
		YY.Im=0;
//          OOOTOVektor.Create(MCompl(TOVektor(X).X1.Re,0),MCompl(TOVektor(X).Y1.Re,0),MCompl(TOVektor(X).X1.Re+XX.Re,0),MCompl(TOVektor(X).Y1.Re+YY.Re,0),Att,OW);
	} else
	{
		if (Att.Chk==1) { TOEmpty.Create(OOO,Att);}
	}

	return true;
} // EExecAQ

function EExecC1(CST, V, Att,Sg1)
{
	var X={Re:undefined, Im:undefined}
	Result=false
	if (V.OB==undefined) return false;
	if (V.OB=="D")
	{
		TOChisl_Create(CST,V.R,Att);
    } else
    {
		if (Att.Chk=1) OOO.OB="$";
    }
    Result=true;
return true;
} // EExecC1

function EExecCH(CST, V, Att,Sg1)
{
	var S={Re:undefined, Im:undefined}
	Result=false
	if (V.OB==undefined) return false;
	if (V.OB=="D")
	{
		S.Re=V.R.Re*2;
		S.Im=V.R.Im*2;
		TOChisl_Create(CST,S,Att);
    } else
    {
		if (Att.Chk=1) OOO.OB="$";
    }
    Result=true;
return true;
} // EExecCH


function EExecC3(CST, V, Att,Sg1)
{
	var X={Re:undefined, Im:undefined}
	Result=false
	if (V.OB==undefined) return false;
	if (V.OB=="P")
	{
		TOChisl_Create(CST,V.X,Att);
    } else
    {
		if (Att.Chk=1) OOO.OB="$";
    }
    Result=true;
return true;
} // EExecC3

function EExecC4(CST, V, Att,Sg1)
{
	var X={Re:undefined, Im:undefined}
	Result=false
	if (V.OB==undefined) return false;
	if (V.OB=="P")
	{
		TOChisl_Create(CST,V.Y,Att);
    } else
    {
		if (Att.Chk=1) OOO.OB="$";
    }
    Result=true;
return true;
} // EExecC4

function EExecC5(OOO,X,Y,Att,Sg1,Sg2)
{
    var S={Re:undefined, Im:undefined}
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;

    if ((X.OB=="P") && (Y.OB=="P")) 
	{
		S.Re=X.X.Re-Y.X.Re;
		S.Im=X.X.Im-Y.X.Im;
		TOChisl_Create(OOO,S,Att);
	} else
	{
		if (Att.Chk=1) OOO.OB="$";
    }
	return true;
} // EExecC5

function EExecC6(OOO,X,Y,Att,Sg1,Sg2)
{
    var S={Re:undefined, Im:undefined}

	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	if ((X.OB=="P") && (Y.OB=="P")) 
	{
		S.Re=X.Y.Re-Y.Y.Re;
		S.Im=X.Y.Im-Y.Y.Im;
		TOChisl_Create(OOO,S,Att);
	} else
	{
		if (Att.Chk=1) OOO.OB="$";
    }
	return true;
} // EExecC6

function PointIsSobstv(P)
{
	return (P.W!==0)
} // PointIsSobstv

function LineIsSobstv(P)
{
	return (P.Vid=="sobstv")
} // PointIsSobstv

function IsSobstv(P)
{
	if (P.OB=="P") return PointIsSobstv(P);
	if (P.OB=="O") return LineIsSobstv(P);
	return true;
}

function EExecC2(OOO,X,Y,Att,Sg1,Sg2)
{
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	var T;
	var D={Re:undefined, Im:undefined}
	var A={Re:undefined, Im:undefined}
	var B={Re:undefined, Im:undefined}
	var C={Re:undefined, Im:undefined}
	var E={Re:undefined, Im:undefined}
	var F={Re:undefined, Im:undefined}
	var X1,X2,Y1,Y2,X0,Y0;


    if ((X.OB=="P") && (Y.OB=="P") && IsSobstv(X) && IsSobstv(Y)) 
	{
		X1=X.X.Re; Y1=X.Y.Re;
		X2=Y.X.Re; Y2=Y.Y.Re;

		A=CompSub(X.X,Y.X);
		B=CompSub(X.Y,Y.Y);
		A=CompSqr(A);
		B=CompSqr(B);
		C=CompSum(A,B);
		E=CompSqrt(C);
		F=CompMul(E,E);
		if (C.Re>=0) D=MCompl(Math.sqrt(C.Re),0);
		if (C.Re<0) D=MCompl(0,Math.sqrt(Math.abs(C.Re)));
		D=E;
		TOChisl_Create(OOO,D,Att);

	} else
	if ((X.OB=="P") && (Y.OB=="O"))// && (IsSobstv(X)) && (IsSobstv(Y)))
	{
		X0=Y.X1.Re; Y0=Y.Y1.Re;
		X1=Y.X2.Re; Y1=Y.Y2.Re;
		X2=X.X.Re;
		Y2=X.Y.Re;
		D.Re=Math.abs(((Y0-Y1)*X2+(X1-X0)*Y2+(X0*Y1-X1*Y0))/Math.sqrt(Sqr(X1-X0)+Sqr(Y1-Y0)));
		D.Im=0;
		TOChisl_Create(OOO,D,Att);
    }
    else if (Att.Chk=1) OOO.OB="$";

	return true;
} // EExecC2

function StartStop(Xc,Yc,X1,Y1,X2,Y2,R)
{
	var SS1,CC1,Dl,SS2,CC2,F;
	var A={ASt:undefined, AEn:undefined}

	SCDP1=SC(Xc,Yc,X1,Y1);
	SCDP2=SC(Xc,Yc,X2,Y2);
	A.ASt=ArcSin(SCDP1.S);
	if (SCDP1.C<0) A.ASt=Math.PI-A.ASt;
	A.AEn=ArcSin(SCDP2.S);
	if (SCDP2.C<0) A.AEn=Math.PI-A.AEn;
	if (Math.abs(A.ASt-A.AEn)<Eps*Eps*Eps) return A;
	if (R>0) if (A.AEn<A.ASt) A.AEn=A.AEn+2*Math.PI;
	if (R<0) 
	{
		F=A.AEn;
		A.AEn=A.ASt;
		A.ASt=F;
		if (A.ASt<A.AEn) A.ASt=A.ASt+2*Math.PI;
	}
	if (A.ASt<0)
	{
		A.ASt=A.ASt+2*Math.PI;
		A.AEn=A.AEn+2*Math.PI;
	}
	return A;
} // StartStop

function ChislIsReal(X)
{
	return (Math.abs(X.C.Im<=Eps*Eps*Eps));
} // ChislIsReal

function PointIsReal(P)
{
	return ((Math.abs(P.X.Im)<=Eps) && (Math.abs(P.Y.Im)<=Eps));
} // 	PointIsReal



function PointIsCompl(P)
{
//     return ((P.X.Im!=0) || (P.Y.Im!=0))
} // PointIsCompl


function LineIsReal(L)
{	
	var  Ax,Ay,Bx,Byy,Cx,Cy,Dx,Dy,Xx1,Xx2,Yy1,Yy2,Zz1,Zz2;
	var Prizn,Result;
	var Q;

	Result=((Math.abs(L.X1.Im)<Eps*Eps) && (Math.abs(L.Y1.Im)<Eps*Eps) && (Math.abs(L.X2.Im)<Eps*Eps) && (Math.abs(L.Y2.Im)<Eps*Eps));
	if (Result) return Result;

	Ax=MCompl(0,0);
	Ay=MCompl(0,0);
	Bx=MCompl(100,0);
	Byy=MCompl(100,0);
	Cx=MCompl(100,0);
	Ay=MCompl(100,0);
	Bx=MCompl(200,0);
	Byy=MCompl(200,0);

	Q=LinLinComp(L.X1,L.Y1,L.X2,L.Y2,Ax,Ay,Bx,Byy);
	Xx1=Q.XX;
	Yy1=Q.YY;
	Zz1=Q.ZZ;
	
	Q=LinLinComp(L.X1,L.Y1,L.X2,L.Y2,Ax,Ay,Bx,Byy);
	Xx2=Q.XX;
	Yy2=Q.YY;
	Zz2=Q.ZZ;

	Result=(Math.abs(Xx1.Im)<Eps*Eps) && (Math.abs(Yy1.Im)<Eps*Eps) && (Math.abs(Xx2.Im)<Eps*Eps) && (Math.abs(Yy2.Im)<Eps*Eps);
	return Result;
} // LineIsReal 

function IsReal(X)
{
	if (X.OB=="C") return ChislIsReal(X);
	if (X.OB=="P") return PointIsReal(X);
	if (X.OB=="O") return LineIsReal(X);

} // IsReal

function EExecD9(Out_Prm,X,Y,Z,Att,Sg1,Sg2,Sg3)
{
	var Xc,Yc,Xa1,Ya1,Xb1,Yb1,X1,Y1,X2,Y2,R;
	var SS1,Cc1,Dl,Ss2,Cc2,Ast,Aen,F,Lab;

	if ((X.OB==undefined) || (Y.OB==undefined) || (Z.OB==undefined)) return false;

	if ((X.OB=="D") && (Y.OB=="P") && (Z.OB=="P") && (IsSobstv(Y)) && (IsSobstv(Z)) && (IsReal(Y)) && (IsReal(Z))) 
	{
		Xc=X.Xc.Re;
		Yc=X.Yc.Re;
		R=X.R.Re*Sg1;
		X1=Y.X.Re;
		Y1=Y.Y.Re; 
		X2=Z.X.Re;
		Y2=Z.Y.Re;
		if (Math.abs(R)>Eps)
		{
			A=StartStop(Xc,Yc,X1,Y1,X2,Y2,R);
		}
		if (Math.abs(R)<=Eps) Lab=0;
		Lab=0;

		TODuga_Create(Out_Prm,MCompl(Xc,0),MCompl(Yc,0),MCompl(R,0),X1,Y1,X2,Y2,Att);
		Out_Prm.Vid=0;
		AddInc(Y,Out_Prm);
		AddInc(Z,Out_Prm);

		// Out_Prm.AssignParents([X,Y,Z]);
	} else
	{
		if (Att.Chk==1) TOEmpty_Create(Out_Prm,Att);
	}
	return true;
} // EExecD9


function CalcP9_D(X,U)
{
/*
var X1,Y1,X2,Y2: complex;
    R,Pi2,Ast,Aen,Fi: real;
*/
	var E={Re: undefined, Im: undefined};
	var F={Re: undefined, Im: undefined};
	var X1={Re: undefined, Im: undefined};
	var Y1={Re: undefined, Im: undefined};
	var UU={ASt: undefined, AEn: undefined}
	var Result={E:{Re: undefined, Im: undefined},F:{Re: undefined, Im: undefined}}
	var Fi;

    if (X.Vid==circ_full) 
	{
		UU=StartStop(X.Xc.Re,X.Yc.Re,X.X1,X.Y1,X.X2,X.Y2,X.R.Re);
		Ast=UU.ASt;
		Aen=UU.AEn;
		Pi2=2*Math.PI;
		X1=X.Xc;
		Y1=X.Yc;
		R=X.R.Re;
		E.Im=X.X1.Im+X.R.Im*Math.cos((Pi2*U));
		F.Im=X.Y1.Im+X.R.Im*Math.sin((Pi2*U));
		E.Re=X.X1.Re+Math.sbs(R)*Math.cos((Pi2*U)*Math.sign(R));
		F.Re=X.Y1.Re+Math.abs(R)*Math.sin((Pi2*U)*Math.sign(R));
	}


	if ((X.Vid == circ_arc) || (X.Vid == circ_narc)) 
	{
		if (X.FAtt.Lv==0)
		{
			UU=StartStop(X.Xc.Re,X.Yc.Re,X.X1,X.Y1,X.X2,X.Y2,X.R.Re);
			Ast=UU.ASt;
			Aen=UU.AEn;
		}
		
		if (X.FAtt.Lv==2) 
		{
			UU=StartStop(X.Xc.Re,X.Yc.Re,X.X2,X.Y2,X.X1,X.Y1,X.R.Re);
			Ast=UU.ASt;
			Aen=UU.AEn;
		}

		if (X.R.Re>0) 
		{
			Fi=Ast+U*(Aen-Ast);
			X1=X.Xc;
			Y1=X.Yc;
			R=Math.abs(X.R.Re);
			E.Im=0;
			F.Im=0;
			E.Re=X1.Re+R*Math.cos(Fi);
			F.Re=Y1.Re+R*Math.sin(Fi);
		}
		if (X.R.Re<0)
		{
			
			while (Aen<Ast) {Aen=Aen+2*Math.PI};

			Fi=Aen+U*(Ast-Aen);
			X1=X.Xc;
			Y1=X.Yc;
			R=X.R.Re;
			E.Im=0;
			F.Im=0;
			E.Re=X1.Re-R*Math.cos(Fi);
			F.Re=Y1.Re-R*Math.sin(Fi);
		
		}
	}
	Result.E=E;
	Result.F=F;
	return Result;
} //  CalcP9_D

function EExecD7(TD1,TP1,TP2,TD2,TP3,TP4,X,Y,Z, Att1,Att2,Att3,Att4,Att5,Att6,Sg1,Sg2,Sg3)
{
	
	var cnt_d1=new Object();
	var cnt_d3=new Object(); 
	var d1=new Object(); 
	var d3=new Object(); 
	var m=new Object(); 
	var n=new Object(); 
	var o1=new Object(); 
	var o10=new Object(); 
	var o11=new Object(); 
	var o12=new Object(); 
	var o13=new Object(); 
	var o14=new Object(); 
	var o2=new Object(); 
	var o7=new Object(); 
	var o8=new Object(); 
	var o9=new Object(); 
	var p1=new Object(); 
	var p2=new Object(); 
	var r=new Object(); 
	var s1=new Object(); 
	var s2=new Object(); 
	var t1=new Object(); 
	var t2=new Object(); 
	var t3=new Object(); 
	var t4=new Object();
	var g1=new Object();
	var g2=new Object();
	var g3=new Object();3
	var g4=new Object();
	
	CreateCopy(d1,X);
	d1.FAtt=CopyAtt(X);
	d1.R.Re=d1.R.Re*Sg1;

	CreateCopy(d3,Y);
	d3.FAtt=CopyAtt(Y);
	d3.R.Re=d3.R.Re*Sg2;

	CreateCopy(r,Z);
	r.FAtt=CopyAtt(Z);
	r.C.Re=r.C.Re*Sg3;
	

	EExecO7(o1,d1,r,d1.FAtt,1,1);
	EExecO7(o2,d3,r,d3.FAtt,1,1);
	EExecP3(p1,p2,o1,o2,Att0,Att0,1,1);
	EExecD0(m,p1,r,Att0,1,1);
	EExecD0(n,p2,r,Att0,1,1);
	EExecRA(o7,m,d1,Att0,1,1);
	EExecPA(cnt_d1,d1,Att0,1);
	EExecO0(o8,p1,cnt_d1,Att5,1,1);
	EExecO0(o9,p2,cnt_d1,Att5,1,1);
	EExecRA(o10,d1,n,Att5,1,1);
	EExecRA(o11,m,d3,Att0,1,1);
	EExecPA(cnt_d3,d3,Att0,1);
	EExecO0(o12,p1,cnt_d3,Att5,1,1);
	EExecO0(o13,p2,cnt_d3,Att5,1,1);
	EExecRA(o14,n,d3,Att0,1,1);
	EExecP2(t1,o8,o7,Att0,1,1);
	EExecP2(t3,o9,o10,Att0,1,1);
	EExecP2(t2,o12,o11,Att0,1,1);
	EExecP2(t4,o13,o14,Att0,1,1);
	EExecCX(g1,t1,X,Att0,1,1);
	EExecCX(g2,t2,Y,Att0,1,1);
	EExecCX(g3,t3,X,Att0,1,1);
	EExecCX(g4,t4,Y,Att0,1,1);


	EExecD9(s1,m,t1,t2,Att0,1,1,1);
	EExecD9(s2,n,t4,t3,Att0,1,1,1);

	if ((g1.OB=="C") && (g2.OB=="C")) 
	{
		CreateCopy(TD1,s1);
		TD1.FAtt=CopyAtt(Att1);
		
		CreateCopy(TP1,t1);
		TP1.FAtt=CopyAtt(Att2);

		CreateCopy(TP2,t2);
		TP2.FAtt=CopyAtt(Att3);

	} else
	{
		TOEmpty_Create(TD1,Att1);
		TOEmpty_Create(TP1,Att2);
		TOEmpty_Create(TP2,Att3);
	}
	
	if ((g3.OB=="C") && (g4.OB=="C")) 
	{
		
		CreateCopy(TD2,s2);
		TD2.FAtt=CopyAtt(Att4);
		
		CreateCopy(TP3,t3);
		TP3.FAtt=CopyAtt(Att5);

		CreateCopy(TP4,t4);
		TP4.FAtt=CopyAtt(Att6);
	} else
	{
		TOEmpty_Create(TD2,Att4);
		TOEmpty_Create(TP3,Att5);
		TOEmpty_Create(TP4,Att6);
	}
	
	if (TP1.OB=="P") {AddInc(TD1,TP1); AddInc(X,TP1)}
	if (TP2.OB=="P") {AddInc(TD1,TP2); AddInc(Y,TP2)}
	if (TP3.OB=="P") {AddInc(TD2,TP3); AddInc(X,TP3)}
	if (TP4.OB=="P") {AddInc(TD2,TP4); AddInc(Y,TP4)}

	return true;

} // EExecD7
	

function EExecDA(TD1,TP1,TP2,TD2,TP3,TP4,X,Y,Z,Att1,Att2,Att3,Att4,Att5,Att6,Sg1,Sg2,Sg3)
{
	var d=new Object()
	var o=new Object()
	var r=new Object()
	var o2=new Object()
	var o3=new Object()
	var p1=new Object()
	var p2=new Object()
	var d2=new Object()
	var d4=new Object()

	var cnt_d3=new Object()
	var o4=new Object()
	var o5=new Object()
	var o7=new Object()
	var o9=new Object()
	var t2=new Object()
	var t4=new Object()
	var t1=new Object()
	var t3=new Object()
	var s1=new Object()
	var s2=new Object()

	CreateCopy(d,X);
	d.FAtt=CopyAtt(X);

	CreateCopy(o,Y);
	o.FAtt=CopyAtt(Y.FAtt);
	CreateCopy(r,Z);
	r.FAtt=CopyAtt(Att5);
	r.C.Re=r.C.Re*Sg3;


	EExecO7(o2,o,r,Att0,1,Sg2);
	EExecO7(o3,d,r,Att0,1,Sg1);
	EExecP6(p1,p2,o2,o3,Att0,Att0,1,1);
	EExecD0(d2,p1,r,Att0,1,1);
	EExecD0(d4,p2,r,Att0,1,1);
	EExecPA(cnt_d3,d,Att0,1);
	EExecO0(o4,p1,cnt_d3,Att5,1,1);
	EExecO0(o5,p2,cnt_d3,Att5,1,1);
	EExecRA(o7,d2,d,Att5,1,1);
	EExecRA(o9,d4,d,Att5,1,1);
	EExecP2(t2,o7,o4,Att0,1,1);
	EExecP2(t4,o5,o9,Att0,1,1);
	EExecPF(t1,p1,o,Att0,1,Sg2);
	EExecPF(t3,p2,o,Att0,1,Sg2);
	EExecD9(s1,d2,t1,t2,Att0,1,1,1);
	EExecD9(s2,d4,t4,t3,Att0,1,1,1);
	CreateCopy(TD1,s1);
	TD1.FAtt=CopyAtt(Att1);

	CreateCopy(TP1,t1);
	TP1.FAtt=CopyAtt(Att2);

	CreateCopy(TP2,t2);
	TP2.FAtt=CopyAtt(Att3);

	CreateCopy(TD2,s2);
	TD2.FAtt=CopyAtt(Att4);


	CreateCopy(TP3,t3);
	TP3.FAtt=CopyAtt(Att5);

	CreateCopy(TP4,t4);
	TP4.FAtt=CopyAtt(Att6);


	if (TP1.OB=="P") { AddInc(TD1,TP1); AddInc(Y,TP1); }
	if (TP2.OB=="P") { AddInc(TD1,TP2); AddInc(X,TP2); }
	if (TP3.OB=="P") { AddInc(TD2,TP3); AddInc(Y,TP3); }
	if (TP4.OB=="P") { AddInc(TD2,TP4); AddInc(X,TP4); }


	return true;
} // EExecDA

function EExecDD(Out_Prm1,Out_Prm2,Out_Prm3,Out_Prm4,X,Y,Z,Att1,Att2,Att3,Att4,Sg1,Sg2,Sg3)
{
//	alert ("EExecDD");
	var Xc11 = {Re:0, Im:0};
	var Yc11 = {Re:0, Im:0};
	var Xc22 = {Re:0, Im:0};
	var Yc22 = {Re:0, Im:0};
	var Xc1,Yc1,Xc2,Yc2;
	var Rr,S,C,X1,X2,Y1,Y2,Dl,Df,X3,Y3,X4,Y4,Xt,Yt,Zz,Dx;
	var A,Value;
	var Prizn;
	var Xp,Yp,B;
	if ((X.OB=="O") && (Y.OB=="P") && (((Z.OB=="C") && IsReal(Z)) || (Z.OB=="D")) && (IsSobstv(X)) && (IsSobstv(Y)) && (IsReal(Y))) 
	{
		
		if (Sg1>0) 
		{
			X1=X.X1.Re;
			Y1=X.Y1.Re;
			X2=X.X2.Re;
			Y2=X.Y2.Re;
		} else
		{
			X2=X.X1.Re;
			Y2=X.Y1.Re;
			X1=X.X2.Re;
			Y1=X.Y2.Re;
		};
		SCDP=SC(X1,Y1,X2,Y2);
		Df=Fi(0,1,SCDP.S,SCDP.C);
		X3=Y.X.Re;
		Y3=Y.Y.Re;
		if (Z.OB=="C") Rr=Z.C.Re*Sg3;
		if (Z.OB=="D") Rr=Z.R.Re*Sg3;
		Dx=Math.PI/2+Df;
		X4=X3+100*Math.cos(Dx);
		Y4=Y3+100*Math.sin(Dx);
		var Q=LinLin(X1,Y1,X2,Y2,X3,Y3,X4,Y4);
		A=Sqr(X3-Q.X)+Sqr(Y3-Q.Y);
		if (Math.sqrt(A)>2*Math.abs(Rr)) 
		{
			if (Att1.Chk==1) TOEmpty_Create(Out_Prm1,Att1);
			if (Att2.Chk==1) TOEmpty_Create(Out_Prm2,Att2);
			if (Att3.Chk==1) TOEmpty_Create(Out_Prm3,Att3);
			if (Att4.Chk==1) TOEmpty_Create(Out_Prm4,Att4);
			return true;
		};
		Value=Math.abs(Rr)/Math.sqrt(Sqr(X3-Q.X)+Sqr(Y3-Q.Y));
		Xp=Q.X+(X3-Q.X)*Value;
		Yp=Q.Y+(Y3-Q.Y)*Value;
		A=Sqr(Xp-X3)+Sqr(Yp-Y3);
		B=Math.sqrt(Sqr(Rr)-A);
		Value=B/Math.sqrt(Sqr(X2-X1)+Sqr(Y2-Y1));
		Xc1=Xp-(X2-X1)*Value;
		Yc1=Yp-(Y2-Y1)*Value;
		Xc2=Xp+(X2-X1)*Value;
		Yc2=Yp+(Y2-Y1)*Value;
		Xc11.Re=0; Xc11.Im=0;
		Yc11.Re=0; Yc11.Im=0;
		Xc22.Re=0; Xc22.Im=0;
		Yc22.Re=0; Yc22.Im=0;
		Xc11.Re=Q.X-(X2-X1)*Value;
		Yc11.Re=Q.Y-(Y2-Y1)*Value;
		Xc22.Re=Q.X+(X2-X1)*Value;
		Yc22.Re=Q.Y+(Y2-Y1)*Value;

		if ( !(PointBelongs(X,Xc11.Re,Yc11.Re)))
		{
			if (Att1.Chk==1) TOEmpty_Create(Out_Prm1,Att1);
			if (Att2.Chk==1) TOEmpty_Create(Out_Prm2,Att2);
		} else
		{
			TOPoint_Create(Out_Prm2,Xc11,Yc11,1,Att2);
			TODuga_Create(Out_Prm1,MCompl(Xc1,0),MCompl(Yc1,0),MCompl(Rr,0),Xc11.Re,Yc11.Re,X3,Y3,Att1);

			AddInc(Out_Prm1,Out_Prm2);
			AddInc(Out_Prm1,Y);
			AddInc(X,Out_Prm2);
		};
		if ( !(PointBelongs(X,Xc22.Re,Yc22.Re)))
		{
			if (Att3.Chk==1) TOEmpty_Create(Out_Prm3,Att3);
			if (Att4.Chk==1) TOEmpty_Create(Out_Prm4,Att4);
		} else
		{
			TOPoint_Create(Out_Prm4,Xc22,Yc22,1,Att4);
			TODuga_Create(Out_Prm3,MCompl(Xc2,0),MCompl(Yc2,0),MCompl(Rr,0),X3,Y3,Xc22.Re,Yc22.Re,Att3);

			AddInc(Out_Prm4,Out_Prm3);
			AddInc(Y,Out_Prm3);
			AddInc(Out_Prm4,X);
		};
	
	} else
	{
		if (Att1.Chk==1) TOEmpty_Create(Out_Prm1,Att1);
		if (Att2.Chk==1) TOEmpty_Create(Out_Prm2,Att2);
		if (Att3.Chk==1) TOEmpty_Create(Out_Prm3,Att3);
		if (Att4.Chk==1) TOEmpty_Create(Out_Prm4,Att4);
	};

	return false;
} // EExecDD

function EExecDC0(Out_Prm1,Out_Prm2,Out_Prm3,X,Y,Z,Att1,Att2,Att3,Sg1,Sg2,Sg3)
{
/*
var X1,Y1,X2,Y2,X3,Y3,X4,Y4,Dx,Xc,Yc,Zz,Xp,Xa,Ya,Xb,Yb,Xs,Ys,Xe,Ye,D,Xt,Yt,Xp1,Xp2: real;
    XV1,YV1,XV2,YV2: complex;
    A,Value: real;
    Prizn: boolean;
    Out_Prm1a,Out_Prm1b: TObj;
    E1,F1,E2,F2: complex;
    Bool1,Bool2: boolean;
*/
	if ((X.OB==undefined) || (Y.OB==undefined) || (Z.OB==undefined)) return false;
	var X1={Re:undefined, Im: undefined};
	var X2={Re:undefined, Im: undefined};
	var X3={Re:undefined, Im: undefined};
	var X4={Re:undefined, Im: undefined};
	var Y1={Re:undefined, Im: undefined};
	var Y2={Re:undefined, Im: undefined};
	var Y3={Re:undefined, Im: undefined};
	var Y4={Re:undefined, Im: undefined};
	var XV1={Re:undefined, Im: undefined};
	var YV1={Re:undefined, Im: undefined};
	var XV2={Re:undefined, Im: undefined};
	var YV2={Re:undefined, Im: undefined};

	var Out_Prm1a = new Object()
	var Out_Prm1b = new Object()

    if (
		((X.OB=="O") && (Y.OB=="O") && (((Z.OB=="C") && (IsReal(X)) || (Z.OB=="D"))) && (IsReal(Y)) && (IsSobstv(X)) && (IsSobstv(Y)))) 
    {
		XV1=MCompl(0,0); YV1=MCompl(0,0);
		XV2=MCompl(0,0); YV2=MCompl(0,0)
		X1=X.X1.Re; Y1=X.Y1.Re;
		X2=X.X2.Re; Y2=X.Y2.Re;
		X3=Y.X1.Re; Y3=Y.Y1.Re;
		X4=Y.X2.Re; Y4=Y.Y2.Re;


		if (Z.OB=="C") Dx=Z.C.Re*Sg3;
		if (Z.OB=="D") Dx=Z.R.Re*Sg3;
		
		U=LinLin(X1,Y1,X2,Y2,X3,Y3,X4,Y4);
		Xc=U.X;
		Yc=U.Y;
		Zz=U.W;
		Prizn=U.P;
	
		if (Prizn)
		{
			XP=Math.sqrt(Sqr(X2-X1)+Sqr(Y2-Y1))*Sg1;
			if (Math.abs(XP)<Eps) return true;
			Xa=Xc+(X2-X1)/XP;
			Ya=Yc+(Y2-Y1)/XP;
			XP=Math.sqrt(Sqr(X4-X3)+Sqr(Y4-Y3))*Sg2;
			if (Math.abs(XP)<Eps) return true;
			Xb=Xc+(X4-X3)/XP;
			Yb=Yc+(Y4-Y3)/XP;
			Xs=(Xa+Xb)/2;
			Ys=(Ya+Yb)/2;
			XP=Math.sqrt(Sqr(X2-X1)+Sqr(Y2-Y1))*Sg1;
			if (Math.abs(XP)<Eps) return true;
			Xe=Xa+(Y2-Y1)/XP;
			Ye=Ya-(X2-X1)/XP;
			U=LinLin(Xc,Yc,Xs,Ys,Xa,Ya,Xe,Ye);
			Xt=U.X;
			Yt=U.Y;
			Zz=U.W;
			Prizn=U.P;
			XP=Math.sqrt(Sqr(Xa-Xt)+Sqr(Ya-Yt));
			if (Math.abs(XP)<Eps) return true;
			D=Math.abs(Dx)/XP;
			XP1=Math.sqrt(Sqr(Xa-Xc)+Sqr(Ya-Yc));
			if (Math.abs(XP1)<Eps) return true;
			
			XV1.Re=Xc+D*(Xa-Xc)/XP1;
			YV1.Re=Yc+D*(Ya-Yc)/XP1;
			
			XP2=Math.sqrt(Sqr(Xb-Xc)+Sqr(Yb-Yc));
			if (Math.abs(XP2)<Eps) return true;
			XV2.Re=Xc+D*(Xb-Xc)/XP2;
			YV2.Re=Yc+D*(Yb-Yc)/XP2;

		
			TOPoint_Create(Out_Prm2,XV1,YV1,1,Att2);
			TOPoint_Create(Out_Prm3,XV2,YV2,1,Att3);

			TODuga_Create(Out_Prm1a,MCompl(Xc+D*(Xt-Xc),0),MCompl(Yc+D*(Yt-Yc),0),MCompl(Dx,0),Xc+D*(Xa-Xc)/XP1,Yc+D*(Ya-Yc)/XP1,Xc+D*(Xb-Xc)/XP2,Yc+D*(Yb-Yc)/XP2,Att1);	

			TODuga_Create(Out_Prm1b,MCompl(Xc+D*(Xt-Xc),0),MCompl(Yc+D*(Yt-Yc),0),MCompl(Dx,0),Xc+D*(Xb-Xc)/XP2,Yc+D*(Yb-Yc)/XP2,Xc+D*(Xa-Xc)/XP1,Yc+D*(Ya-Yc)/XP1,Att1);	

			U=CalcP9_D(Out_Prm1a,0.5);
			E1=U.E;
			F1=U.F;
			U=CalcP9_D(Out_Prm1b,0.5);
			E2=U.E;
			F2=U.F;

			if (Math.sqrt(Sqr(E1.Re-Xc)+Sqr(F1.Re-Yc))<Math.sqrt(Sqr(E2.Re-Xc)+Sqr(F2.Re-Yc)))
			{
				TODuga_Create(Out_Prm1,MCompl(Xc+D*(Xt-Xc),0),MCompl(Yc+D*(Yt-Yc),0),MCompl(Dx,0),Xc+D*(Xa-Xc)/XP1,Yc+D*(Ya-Yc)/XP1,Xc+D*(Xb-Xc)/XP2,Yc+D*(Yb-Yc)/XP2,Att1);	
//				Out_Prm1b.Destroy;
			} else
			{
				TODuga_Create(Out_Prm1,MCompl(Xc+D*(Xt-Xc),0),MCompl(Yc+D*(Yt-Yc),0),MCompl(Dx,0),Xc+D*(Xb-Xc)/XP2,Yc+D*(Yb-Yc)/XP2,Xc+D*(Xa-Xc)/XP1,Yc+D*(Ya-Yc)/XP1,Att1);	
//				Out_Prm1a.Destroy;
			}


			// запрет образования объектов, если сопряжение ограничено исходными данными
//			if (!(PointBelongs(X,XV1.Re,YV1.Re) && PointBelongs(Y,XV2.Re,YV2.Re)))
			{
//				Out_Prm1.Destroy;
//				Out_Prm2.Destroy;
//				Out_Prm3.Destroy;
//				if (Att1.Chk==1) {Out_Prm1.OB="$"};
//				if (Att2.Chk==1) {Out_Prm2.OB="$"};
//				if (Att3.Chk==1) {Out_Prm3.OB="$"};
//				return true;
			}

			// Out_Prm2.Parents.Add(X);Out_Prm2.Parents.Add(Y);Out_Prm2.Parents.Add(Z);
//			Out_Prm2.AssignParents([X,Y,Z]);

			AddInc(Out_Prm2,X);

            // Out_Prm3.Parents.Add(X);Out_Prm3.Parents.Add(Y);Out_Prm3.Parents.Add(Z);
//			Out_Prm3.AssignParents([X,Y,Z]);

			AddInc(Out_Prm3,Y);
			return true;
		
		};
	} else
	{
		if (Att1.Chk==1) {Out_Prm1.OB="$"};
		if (Att2.Chk==1) {Out_Prm2.OB="$"};
		if (Att3.Chk==1) {Out_Prm3.OB="$"};
	}
	return true;

} // EExecDC0

function EExecW0(W,X,Att1,Sg1)
{
	if (X.length==0) return false;
	TOKontur_Create(W,Att1);
	OB=X[0];
    if (OB.OB=="O")
    {
	    if (OB.Dir==znPlus)
        {
			E=new Object()
			TOLine_Create(E,OB.X1,OB.Y1,1,OB.X2,OB.Y2,1,brn_Limited,"sobstv",OB.FAtt);
            Xa=OB.X2.Re; Ya=OB.Y2.Re; Ax=OB.X1.Re; Ay=OB.Y1.Re;
			W.Spis.push(E);
        };
        
		if (OB.Dir==znMinus) 
		{
			E=new Object()
            TOLine_Create(E,OB.X2,OB.Y2,1,OB.X1,OB.Y1,1,brn_Limited,"sobstv",OB.FAtt);
			Xa=OB.X1.Re; Ya=OB.Y1.Re; Ax=OB.X2.Re; Ay=OB.Y2.Re;
			W.Spis.push(E);
        } 
    };
	
    if (OB.OB=="D")
    {
		if (OB.Vid==2) OB.Vid=0;
        if (OB.Dir==znPlus)
        {
			E=new Object()
			TODuga_Create(E,OB.Xc,OB.Yc,OB.R,OB.X1,OB.Y1,OB.X2,OB.Y2,OB.FAtt);
            Xa=OB.X2; Ya=OB.Y2; Ax=OB.X1; Ay=OB.Y1;
			W.Spis.push(E);
        };
        
		if (OB.Dir==znMinus) 
		{
			E=new Object()
			TODuga_Create(E,OB.Xc,OB.Yc,OB.R,OB.X2,OB.Y2,OB.X1,OB.Y1,OB.FAtt);
			Xa=OB.X1; Ya=OB.Y1; Ax=OB.X2; Ay=OB.Y2;
			W.Spis.push(E);
        } 
    };
	

	for (I=1; I<X.length; I++) 
	{
		OB=X[I];
		if (OB.OB=="O")
		{
			if ((Math.abs(Xa-OB.X1.Re)<Eps) && (Math.abs(Ya-OB.Y1.Re)<Eps))
			{
				E=new Object()
				TOLine_Create(E,OB.X1,OB.Y1,1,OB.X2,OB.Y2,1,brn_Limited,"sobstv",OB.FAtt);
				Xa=OB.X2.Re; Ya=OB.Y2.Re;
				W.Spis.push(E);
			} else
			{
				E=new Object()
				TOLine_Create(E,OB.X2,OB.Y2,1,OB.X1,OB.Y1,1,brn_Limited,"sobstv",OB.FAtt);
				Xa=OB.X1.Re; Ya=OB.Y1.Re; 
				W.Spis.push(E);
			}
		}
		if (OB.OB=="D")
		{
			if ((Math.abs(Xa-OB.X1)<Eps) && (Math.abs(Ya-OB.Y1)<Eps))
			{
				E=new Object()
				if (OB.Vid==0) {TODuga_Create(E,OB.Xc,OB.Yc,OB.R,OB.X1,OB.Y1,OB.X2,OB.Y2,OB.FAtt)}
				if (OB.Vid==2) {TODuga_Create(E,OB.Xc,OB.Yc,MCompl(-OB.R.Re,OB.R.Im),OB.X1,OB.Y1,OB.X2,OB.Y2,OB.FAtt)}
				Xa=OB.X2; Ya=OB.Y2; 
				W.Spis.push(E);
			} else
			{
				E=new Object()
				if (OB.Vid==0) {TODuga_Create(E,OB.Xc,OB.Yc,MCompl(-OB.R.Re,OB.R.Im),OB.X2,OB.Y2,OB.X1,OB.Y1,OB.FAtt)}
				if (OB.Vid==2) {TODuga_Create(E,OB.Xc,OB.Yc,OB.R,OB.X2,OB.Y2,OB.X1,OB.Y1,OB.FAtt)}
				Xa=OB.X1; Ya=OB.Y1;
				W.Spis.push(E);
			}
		}
		
	}
	
	return true;
} // EExecW0

function CALCO7(X1,Y1,X2,Y2,Dx,Sg)
{
	var X3={Re:undefined, Im: undefined};
	var Y3={Re:undefined, Im: undefined};
	var X4={Re:undefined, Im: undefined};
	var Y4={Re:undefined, Im: undefined};
	var Y5={Re:undefined, Im: undefined};
	var U={X4:{Re:undefined, Im: undefined},Y4:{Re:undefined, Im: undefined}, X5:{Re:undefined, Im: undefined},Y5:{Re:undefined, Im: undefined}}
    Dx=Dx*Sg;
    Value=Dx/Math.sqrt(Sqr(X2.Re-X1.Re)+Sqr(Y2.Re-Y1.Re));
    X3.Re=X1.Re+(Y2.Re-Y1.Re)*Value;
    Y3.Re=Y1.Re-(X2.Re-X1.Re)*Value;
    Value=200/Math.sqrt(Sqr(X2.Re-X1.Re)+Sqr(Y2.Re-Y1.Re));
    U.X4.Re=X3.Re-Value*(X2.Re-X1.Re);
    U.Y4.Re=Y3.Re-Value*(Y2.Re-Y1.Re);
    U.X5.Re=X3.Re+Value*(X2.Re-X1.Re);
    U.Y5.Re=Y3.Re+Value*(Y2.Re-Y1.Re);
    U.X4.Im=0; U.Y4.Im=0; U.X5.Im=0; U.Y5.Im=0;
	return U;
	
}

function IsNull(X)
{
	Result=false
	if (X.OB=="O")
	{
		if ((Math.abs(X.X1.Re-X.X2.Re)<Eps) && (Math.abs(X.Y1.Re-X.Y2.Re)<Eps)
		&& (Math.abs(X.X1.Im-X.X2.Im)<Eps) && (Math.abs(X.Y1.Im-X.Y2.Im)<Eps)) 
        {
			Result=true;
			return Result;
        }
	}
} // IsNull

function EExecO7(OOO,X,Y,Att,Sg1,Sg2)
{
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	
	var X1={Re:undefined, Im: undefined};
	var Y1={Re:undefined, Im: undefined};
	var X2={Re:undefined, Im: undefined};
	var Y2={Re:undefined, Im: undefined};
	var X4={Re:undefined, Im: undefined};
	var Y4={Re:undefined, Im: undefined};
	var X5={Re:undefined, Im: undefined};
	var Y5={Re:undefined, Im: undefined};
	var X1={Re:undefined, Im: undefined};
	var AX={Re:undefined, Im: undefined};
	var AY={Re:undefined, Im: undefined};
	var BX={Re:undefined, Im: undefined};
	var BYY={Re:undefined, Im: undefined};
	var U={Re:undefined, Im: undefined};

/*	
	if ((Att.PT=8) or (Att.LV=8) or (Att.LT=6))
    {
		Att.RColor X.OAtt.RColor;
        Att.GColor X.OAtt.GColor;
        Att.BColor X.OAtt.BColor;
    }
     if Att.PT=8 then Att.PTX.OAtt.PT;
     if Att.LV=8 then Att.LVX.OAtt.LV;
     if Att.LT=6 then Att.LTX.OAtt.LT;
*/

	if ((X.OB=="O") && IsSobstv(X) && IsReal(X) && ((Y.OB=="C") || (Y.OB=="D"))) // && !IsNull(X)
	{
		X1=X.X1;
		Y1=X.Y1;
		X2=X.X2;
		Y2=X.Y2;
		if (Y.OB=="C") Dx=Y.C.Re;
		if (Y.OB=="D") Dx=Y.R.Re;
		U=CALCO7(X1,Y1,X2,Y2,Dx,Sg1*Sg2);
		X4=U.X4;
		Y4=U.Y4;
		X5=U.X5;
		Y5=U.Y5;
		OBJ=new Object();
		TOLine_Create(OBJ,X4,Y4,1,X5,Y5,1,brn_UnLimited,"sobstv",Att);
		U=CalcPF(X1,Y1,OBJ);
		AX=U.A;
		AY=U.B;
		U=CalcPF(X2,Y2,OBJ);
		BX=U.A;
		BYY=U.B;
		
//		OBJ.Destroy;
		if (Att.Lv==8) Att.Lv=X.FAtt.Lv;
		
		
//		alert(AX.Re+" "+AY.Re+" "+BX.Re+" "+BYY.Re);
		
		if (Sg1==1) {TOLine_Create(OOO,AX,AY,1,BX,BYY,1,X.draw_AsBorned,"sobstv",Att)} else {TOLine_Create(OOO,BX,BYY,1,AX,AY,1,X.draw_AsBorned,"sobstv",Att)} 
//		OOO.AssignParents([X,Y]);

	} else
	if ((X.OB=="D") && ((Y.OB=="C") || (Y.OB=="D"))) 
	{
		RR=X.R.Re;
		if (Y.OB=="C") {Dx=Y.C.Re;}
		if (Y.OB=="D") {Dx=Y.R.Re;}
		if (X.FAtt.Lv==2) {RR=-RR;}

		RR=RR+Dx*Sg2;
		RR=RR*Sg2;
		if (Att.Lv==8) {Att.Lv=X.FAtt.Lv;}
		RX=(X.X1-X.Xc.Re)/Math.sqrt(Sqr(X.X1-X.Xc.Re)+Sqr(X.Y1-X.Yc.Re));
		RY=(X.Y1-X.Yc.Re)/Math.sqrt(Sqr(X.X1-X.Xc.Re)+Sqr(X.Y1-X.Yc.Re));
		AX=CompSum(MCompl(X.X1,0),CompMul(Y.C,MCompl(RX*Math.sign(RR),0)));
		AY=CompSum(MCompl(X.Y1,0),CompMul(Y.C,MCompl(RY*Math.sign(RR),0)));
		RX=(X.X2-X.Xc.Re)/Math.sqrt(Sqr(X.X2-X.Xc.Re)+Sqr(X.Y2-X.Yc.Re));
		RY=(X.Y2-X.Yc.Re)/Math.sqrt(Sqr(X.X2-X.Xc.Re)+Sqr(X.Y2-X.Yc.Re));
		BX=CompSum(MCompl(X.X2,0),CompMul(Y.C,MCompl(RX*Math.sign(RR),0)));
		BY=CompSum(MCompl(X.Y2,0),CompMul(Y.C,MCompl(RY*Math.sign(RR),0)));

		if (!(X.FAtt.Lv==2)) 
		{TODuga_Create(OOO,X.Xc,X.Yc,MCompl(RR*Sg2,0),AX.Re,AY.Re,BX.Re,BYY.Re,Att)} else 
			{TODuga_Create(OOO,X.Xc,X.Yc,MCompl(RR*Sg2,0),AX.Re,AY.Re,BX.Re,BYY.Re,Att)}
	}
	else
		if ((X.OB=="P") && (Y.OB=="C")) 
	{
		
		RR=Y.C.Re;
		// TODuga_Create(OOO,X.X,X.Y,MCompl(RR*Math.sign(Sg1),0),X.X.Re+RR,X.Y.Re,X.X.Re+RR,X.Y.Re,Att5);
		
	}
	else if (Att.Chk==1) {OOO.OB="$"};
	return true;
} // EExecO7

	

function EExecOE(OOO1,OOO2,X,Y,Att1,Att2,Sg1,Sg2)
{
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	
	var X1={Re:undefined, Im: undefined};
	var Y1={Re:undefined, Im: undefined};
	var X2={Re:undefined, Im: undefined};
	var Y2={Re:undefined, Im: undefined};
	var X4={Re:undefined, Im: undefined};
	var Y4={Re:undefined, Im: undefined};
	var X5={Re:undefined, Im: undefined};
	var Y5={Re:undefined, Im: undefined};
	if ((X.OB=="O") && (Y.OB=="C") && IsSobstv(X) && IsReal(X)) // and not TOLine(X).IsNull
	{
		X1=X.X1;
		X1=X.X1;
		Y1=X.Y1;
		X2=X.X2;
		Y2=X.Y2;
		Dx=Y.C.Re;
        U=CALCO7(X1,Y1,X2,Y2,Dx/2,Sg1*Sg2);
		X4=U.X4;
		Y4=U.Y4;
		X5=U.X5;
		Y5=U.Y5;
		TOLine_Create(OOO1,X4,Y4,1,X5,Y5,1,brn_UnLimited,"sobstv",Att1);
        U=CALCO7(X1,Y1,X2,Y2,-Dx/2,Sg1*Sg2);
		X4=U.X4;
		Y4=U.Y4;
		X5=U.X5;
		Y5=U.Y5;
		TOLine_Create(OOO2,X4,Y4,1,X5,Y5,1,brn_UnLimited,"sobstv",Att2);

	} else
    {
		if (Att1.Chk==1) {OOO1.OB="$"};
		if (Att2.Chk==1) {OOO2.OB="$"};
	}
	return true;
} // EExecOE
	

function CalcP9_O1(X,U)
{
	var E={Re:undefined, Im: undefined};
	var F={Re:undefined, Im: undefined};
	var AAX={Re:undefined, Im: undefined};
	var AAY={Re:undefined, Im: undefined};
	var BBX={Re:undefined, Im: undefined};
	var BBY={Re:undefined, Im: undefined};
	var V={E:{Re:undefined, Im: undefined},F:{Re:undefined, Im: undefined}};

	X1=X.X1.Re;
	Y1=X.Y1.Re;
	X2=X.X2.Re;
	Y2=X.Y2.Re;
	X1i=X.X1.Im;
	Y1i=X.Y1.Im;
	X2i=X.X2.Im;
	Y2i=X.Y2.Im;


	Ax=X2-X1;
	Ay=Y2-Y1;
	BX=Ax*U.Re;
	BYY=Ay*U.Re;
	Axi=X2i-X1i;
	Ayi=Y2i-Y1i;
	BXi=Axi*U.Re;
	BYi=Ayi*U.Re;


	E=MCompl(X1+BX,X1i+BXi);
	F=MCompl(Y1+BYY,Y1i+BYi);

	AAX=CompSub(X.X2,X.X1);
	AAY=CompSub(X.Y2,X.Y1);
	BBX=CompMul(AAX,U);
	BBY=CompMul(AAY,U);
	E=CompSum(X.X1,BBX);
	F=CompSum(X.Y1,BBY);
	V.E=E;
	V.F=F;
	return V;
} // CalcP9_O 

function CalcP9_D1(X,M)
{
	var E={Re:undefined, Im: undefined};
	var F={Re:undefined, Im: undefined};
	var X1={Re:undefined, Im: undefined};
	var Y1={Re:undefined, Im: undefined};
	var V={E:{Re:undefined, Im: undefined},F:{Re:undefined, Im: undefined}};
	var Fi;
	if ((X.Vid==circ_full) || (X.Vid==drw_Empty) || (X.Vid==drw_Incidented)) 
	{
		UU=StartStop(X.Xc.Re,X.Yc.Re,X.X1,X.Y1,X.X2,X.Y2,X.R.Re);
		Ast=UU.ASt;
		Aen=UU.AEn;
		Pi2=2*Math.PI;
		X1=X.Xc;
		Y1=X.Yc;
		R=X.R.Re;
		E.Im=X1.Im+X.R.Im*Math.cos((Pi2*M+X.Laba/360*Pi2));
		F.Im=Y1.Im+X.R.Im*Math.sin((Pi2*M+X.Laba/360*Pi2));
		E.Re=X1.Re+Math.abs(R)*Math.cos((Pi2*M+X.Laba/360*Pi2)*Math.sign(R));
		F.Re=Y1.Re+Math.abs(R)*Math.sin((Pi2*M+X.Laba/360*Pi2)*Math.sign(R));
		
	}
	if ((X.Vid == circ_arc) || (X.Vid == circ_narc))
	{
	
		if (X.FAtt.Lv==0) UU=StartStop(X.Xc.Re,X.Yc.Re,X.X1,X.Y1,X.X2,X.Y2,X.R.Re);
		if (X.FAtt.Lv==2) UU=StartStop(X.Xc.Re,X.Yc.Re,X.X2,X.Y2,X.X1,X.Y1,X.R.Re);
		Ast=UU.ASt;
		Aen=UU.AEn;
		
	
		if (X.R.Re>0) 
		{
			Fi=Ast+M*(Aen-Ast);
			X1=X.Xc;
			Y1=X.Yc;
			R=Math.abs(X.R.Re);
			E.Im=0;
			F.Im=0;
			E.Re=X1.Re+R*Math.cos(Fi);
			F.Re=Y1.Re+R*Math.sin(Fi);
		}

		if (X.R.Re<0) 
		{
			while (Aen<Ast)  {Aen=Aen+2*Math.PI}
			Fi=Aen+M*(Ast-Aen);
			X1=X.Xc;
			Y1=X.Yc;
			R=X.R.Re;
			E.Im=0;
			F.Im=0;
			E.Re=X1.Re-R*Math.cos(Fi);
			F.Re=Y1.Re-R*Math.sin(Fi);
		}
	}
	V.E=E;
	V.F=F;
	return V;
} // CalcP9_D 


function EExecP9(Out_Prm,X,Y,Att,Sg1,Sg2)
{
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	var E={Re:undefined, Im: undefined};
	var E={Re:undefined, Im: undefined};
	var F={Re:undefined, Im: undefined};
	var UU={E:{Re:undefined, Im: undefined},F:{Re:undefined, Im: undefined}};




//	ResultFALSE;
	Define=true;
//	ECmpN; FCmpN; VXCmpN; VYCmpN;

	if (Y.OB=="C")
	{
		U=Y.C.Re;
	} else 
	if (Y.OB=="P")
	{
		U=Y.T;
		Kind=tp_fixed;
		Result=true;
	} 
	else
	if (Y.OB=="!")
	{
//		Out_PrmTOBreak.Create([X,Y],OW);
		Result=true;
		return true;
	}

	if ((X.OB=="!") && (Y.OB=="C"))
	{
//		Out_PrmTOBreak.Create([X,Y],OW);
		return true;
	}

	if ((X.OB=="$") || (Y.OB=="$"))
	{
		if (Att.Chk==1) {Out_Prm.OB=="$"};
		return true;
	}
	
	if ((X.OB=="P") && (Y.OB=="C"))
	{
		TOPoint_Create(Out_Prm,X.X,X.Y,1,Att);	
//		Out_Prm.AssignParents([X,Y]);
		return true;
	}
	
	if ((X.OB=="O") && (Y.OB=="C"))
	{
		if (IsSobstv(X))
		{
			UU=CalcP9_O1(X,Y.C);
//			if (!TOLine(X).PointBelongs(E.Re,F.Re)) {Define=false};
//			Kind=tp_fixed;
//			if (Y.Kind=tc_Constant) {Kind=tp_HalfFree}

			TOPoint_Create(Out_Prm,UU.E,UU.F,1,Att);
//			Out_Prm.AssignParents([X,Y]);

			Result=true;
			if (Define) {AddInc(X,Out_Prm)}
			return true;
		}

		if (!IsSobstv(X))
		{
			if (IsReal(X))
			{
				Define=true;
				TOPoint_Create(Out_Prm,MCompl(100*Math.cos(UU/180*Math.PI),0),MCompl(100*Math.sin(UU/180*Math.PI),0),0,Att);
				return true;
			}
		}
	}
	

	if ((X.OB=="D") && (Y.OB=="C"))
	{
		UU=CalcP9_D1(X,Y.C.Re);
//		if (TODuga(X).Vid in [circ_Arc,circ_NArc]) and ((U<0) or (U>1)) then DefineFALSE;
	
		TOPoint_Create(Out_Prm,UU.E,UU.F,1,Att);
		AddInc(X,Out_Prm);
		return true;
	}
/*	

	if (X is TOBezje) and (Y is TOChisl) then
	begin
	  CalcP9_Z(X,U,E,F,Bool);

	  if (TOChisl(Y).Kind=tc_Constant) then Kindtp_HalfFree;

	  Out_PrmTOPoint.Create(E,F,1,U,Kind,Att,OW);
	  Out_Prm.AssignParents([X,Y]);
	  ResultTRUE;
	  if Define then AddInc(X,Out_Prm);
	end;

	if (X is TOSpline) and (Y is TOChisl) then
	begin
	  if (U<0) or (U>TOSpline(X).Spis.Count-1+Eps) then
	  begin
		   Out_Prm(TOEmpty.Create([X,Y],OW));
		   ResultTRUE;
		   goto lab1;
	  end;

	  CalcP9_S(X,U,E,F,Bool);
	  Out_PrmTOPoint.Create(E,F,1,U,Kind,Att,OW);
	  Out_Prm.AssignParents([X,Y]);
	  AddInc(X,Out_Prm);
	  ResultTRUE;
     end;

	if (X is TOKwadr) and (Y is TOChisl) then
	begin
	  EExecXXA(X,Y,Out_Prm,Att,1,1,OW);
	  Out_Prm.AssignParents([X,Y]);
	  AddInc(X,Out_Prm);
	  ResultTRUE;
	end;


	if (X is TOScala) and (Y is TOChisl) then
	begin
	  TOScala(X).Alg.CleanAllCalculations2;
	  if TOScala(X).PChisl<>NIL then
	  begin
		   Compl(UU,U,0);
		   TOScala(X).PChisl.Add(TOChisl.Create(UU,tc_Variable,NAtt,TOScala(X).PChisl,c_ord));
	  end;
	  TOScala(X).Alg.Execute();
	  V1TOPoint(TOScala(X).PPoint[0]);
	  EV1.X;
	  FV1.Y;
	  Out_PrmTOPoint.Create(E,F,1,U,Kind,Att,OW);
	  Out_Prm.AssignParents([X,Y]);
	  ResultTRUE;
	end;
*/
	if ((X.OB=="W") && (Y.OB=="C")) 
	{
		UU=CalcP9_W(X,Y.C.Re);
		if (!(UU.E==undefined)) 
		{
			TOPoint_Create(Out_Prm,UU.E,UU.F,1,Att);
		} else if (Att.Chk==1) TOEmpty_Create(Out_Prm,Att);
		Result=true;
		return Result;
}

} // EExecP9 

function CalcP9_W(X,U)
{     
	var V={E:{Re:undefined, Im: undefined},F:{Re:undefined, Im: undefined}};
	var Prizn=true;
	var LL=X.Spis.length;
	var Ast,Aen;
	if (LL<=0) {return V}

	if (X.Zamkn)
	{
		if (U>=0) U=0+U-Math.trunc(Math.trunc(U)/LL)*LL;
		if (U<0) U=0+U-(Math.trunc(Math.trunc(U)/LL)-1)*LL;
	}

	if ((U<0) || (U>LL+Eps))
	{
		Prizn=false;
		return true;
	}

	if (Math.abs(U-LL)>=Eps) 
	{
		
		var G=X.Spis[(Math.trunc(U))];
		if (G.OB=='O') 		
		{
			V.E.Re=G.X1.Re+(G.X2.Re-G.X1.Re)*(U%1); V.E.Im=0;
			V.F.Re=G.Y1.Re+(G.Y2.Re-G.Y1.Re)*(U%1); V.F.Im=0;
		}

		if (G.OB=='Z') 
		{
			CalcP9_Z(G,(U%1),E,F,Bool);
		}

		if (G.OB=='S')
		{
			CalcP9_S(G,(U%1)*(G.N-1),E,F,Bool);
		}

		if (G.OB=='D') 
		{
			if (G.Vid==0) 
			{
				var UU=StartStop(G.Xc.Re,G.Yc.Re,G.X1,G.Y1,G.X2,G.Y2,G.R.Re);
				Ast=UU.ASt;
				Aen=UU.AEn;
			}
			if (G.Vid==2) 
			{
				var UU=StartStop(G.Xc.Re,G.Yc.Re,G.X2,G.Y2,G.X1,G.Y1,G.R.Re);
				Ast=UU.ASt;
				Aen=UU.AEn;
			}
			
			if (G.Vid==1) 
			{
				Ast=0; 
				Aen=2*Math.PI; 
			}
			
			if (G.R.Re<0) 
			{
				while (Aen<Ast) {Aen=Aen+2*Math.PI}
				Value=Ast+(Aen-Ast)*(1-(U%1));
				V.E.Re=G.Xc.Re+Math.abs(G.R.Re)*Math.cos(Value); V.E.Im=0;
				V.F.Re=G.Yc.Re+Math.abs(G.R.Re)*Math.sin(Value); V.F.Im=0;
			}
			else
			{
				Value=(U%1);
				Value=Ast+(Aen-Ast)*Value;
				V.E.Re=G.Xc.Re+Math.abs(G.R.Re)*Math.cos(Value); V.E.Im=0;
				V.F.Re=G.Yc.Re+Math.abs(G.R.Re)*Math.sin(Value); V.F.Im=0;
			}
/*		
*/
		}

		return V;
	}

	if (Math.abs(U-LL)<Eps) 
	{
		G=X.Spis[Math.trunc(U)-1];
		if (G.Obj=='O') 
		{
			V.E=G.X2;
			V.F=G.Y2;
		}

		if (G.Obj=='Z') 
		{
			V.E=MCompl(G.PX3,0);
			V.F=MCompl(G.PY3,0);
		}

		if (G.Obj=='D') 
		{
			V.E=MCompl(G.X2,0);
			V.F=MCompl(G.Y2,0);
		}
	}
	return V;

} // CalcP9_W


function EExecPA(PNT,X,Att,Sg1)
{
	if (X.OB==undefined) return false;
	var Vx={Re:undefined, Im: undefined};
	var Vy={Re:undefined, Im: undefined};

	if (X.OB=="D")
	{
		//Compl(Vx,TODuga(X).Xc.Re,0);
		//Compl(Vy,TODuga(X).Yc.Re,0);
		Vx=X.Xc;
		Vy=X.Yc;

		TOPoint_Create(PNT,Vx,Vy,1,Att);
//		Pnt.AssignParents([X]);
		Result=true;
		return Result;
	}

	if (X.OB=="O")
	{
		//if not ((TOLine(X).draw_AsBorned=brn_Limited) and (TOLine(X).OAtt.Lv=drw_Limited)) then goto f1;

		X1=X.X1.Re;
		Y1=X.Y1.Re;
		X2=X.X2.Re;
		Y2=X.Y2.Re;
		Xs=(X1+X2)/2;
		Ys=(Y1+Y2)/2;
		TOPoint_Create(PNT,MCompl(Xs,0),MCompl(Ys,0),1,Att);
		AddInc(X,PNT);
//		Pnt.AssignParents([X]);
		Result= true;
		return Result;
	}
	if (X.OB=="Y")
	{
//		{EExecXX(X,PNT,Att,1);}
		var OTR1=new Object();
		var OTR2=new Object();
		EExecOY(OTR1,OTR2,X,Att5,Att5,1);
		EExecP2(PNT,OTR1,OTR2,Att0,1,1);
		Result= true;
		return Result;
	}

/*
	if X is TOBezje then
	begin
		Compl(Vx,TODuga(X).Xc.Re,0);
		Compl(Vy,TODuga(X).Yc.Re,0);
		CalcP9_Z(X,0.5,Vx,Vy,Prizn);
		PntTOPoint.Create(Vx,Vy,1,0.5,tp_Fixed,Att,OW);
		Pnt.AssignParents([X]);
		ResultTRUE;
		Exit;
	end;
*/

	if (Att.Chk==1) {PNT.OB="$"};
	Result=true;
	return Result;
} 	// EExecPA 

function EExecO5(OOO,X,Y,Z,Att,Sg1,Sg2,Sg3)
{
	if ((X.OB==undefined) || (Y.OB==undefined) || (Z.OB==undefined)) return false;
	var X3={Re:undefined, Im: undefined};
	var Y3={Re:undefined, Im: undefined};
	var X4={Re:undefined, Im: undefined};
	var Y4={Re:undefined, Im: undefined};
	var X5={Re:undefined, Im: undefined};
	var Y5={Re:undefined, Im: undefined};
/*
	if (Att.PT=8) or (Att.LV=8) or (Att.LT=6) then
	begin
		Att.RColor X.OAtt.RColor;
		Att.GColor X.OAtt.GColor;
		Att.BColor X.OAtt.BColor;
	end;
	if Att.PT=8 then Att.PTX.OAtt.PT;
	if Att.LV=8 then Att.LVX.OAtt.LV;
	if Att.LT=6 then Att.LTX.OAtt.LT;
*/

	if ((X.OB=="O") && (Y.OB=="P") && ((Z.OB=="C") || (Z.OB=="O"))) 
	{
		if (true) 
		{
			if ((IsSobstv(X)) && (IsSobstv(Y)))
			{
				if (Sg1==1)
				{
					X1=X.X1;Y1=X.Y1;X2=X.X2;Y2=X.Y2;
				} else
				{
					X2=X.X1;Y2=X.Y1;X1=X.X2;Y1=X.Y2;
				}
				Dx=Z.C.Re;
				SCDP=SC(X1.Re,Y1.Re,X2.Re,Y2.Re);
				Df=Fi(0,1,SCDP.S,SCDP.C);
				X3=Y.X;
				Y3=Y.Y;
				
				if (Z.OB=="C") Dx=Z.C.Re;

				if (Z.OB=="O") 
				{
					if (Sg3==1) {SCDP=SC(Z.X1.Re,Z.Y1.Re,Z.X2.Re,Z.Y2.Re)} else {SCDP=SC(Z.X2.Re,Z.Y2.Re,Z.X1.Re,Z.Y1.Re)}
					Dx=Fi(0,1,SCDP.S,SCDP.C);
					if (Dx<0) {Dx=2*Math.PI+Dx}
					Dx=Dx/2/Math.PI*360;
				}
				Dx=Dx*Sg3;
				Dx=Dx*Math.PI/180+Df;
				X5.Re=X3.Re+100*Math.cos(Dx);X5.Im=X3.Im;
				Y5.Re=Y3.Re+100*Math.sin(Dx);Y5.Im=Y3.Im;
				X4.Re=X3.Re-100*Math.cos(Dx);X4.Im=X3.Im;
				Y4.Re=Y3.Re-100*Math.sin(Dx);Y4.Im=Y3.Im;
				TOLine_Create(OOO,X3,Y3,1,X5,Y5,1,brn_Limited,"sobstv",Att);
				/// OOO.AssignParents([X,Y,Z]);

				AddInc(OOO,Y);
				return true;
			} else
			{
				if (Att.Chk==1) {OOO.OB="$"};
			}
		} else
		{
			if (Att.Chk==1) {OOO.OB="$"};
		}
    } else if (Att.Chk==1) {OOO.OB="$"};

	return true;
} // EExecO5


function EExecTR001(P,O1,O2,O3,Att,Sg1,Sg2,Sg3)
{
	if ((O1.OB==undefined) || (O2.OB==undefined) || (O3.OB==undefined)) return false;
  	var S=false;
	var p1=new Object();
	var p2=new Object();
	var p3=new Object();
	var o1=new Object();
	var o2=new Object();
	var o3=new Object();
	var o4=new Object();
	var o5=new Object();
	var o6=new Object();
	var o7=new Object();
	var o8=new Object();
	var o9=new Object();
	var o10=new Object();
	var p4=new Object();
	var p5=new Object();
	var p6=new Object();
	var o11=new Object();
	var o12=new Object();
	
	CreateCopy(o1,O1);
	CreateCopy(o2,O2);
	CreateCopy(o3,O3);

	EExecP2(p1,o1,o2,Att0,1,1);
	EExecP2(p2,o2,o3,Att0,1,1);
	EExecP2(p3,o3,o1,Att0,1,1);
	EExecO0(o4,p1,p2,Att5,1,1);
	EExecO0(o5,p2,p3,Att5,1,1);
	EExecO0(o6,p3,p1,Att5,1,1);
	EExecO8(o7,o8,o4,o5,Att5,Att5,1,-1);
	EExecO8(o9,o10,o5,o6,Att5,Att5,1,-1);
	EExecP2(p4,o7,o9,Att0,1,1);
	EExecPF(p5,p4,o4,Att0,1,1);
	EExecPF(p6,p4,o5,Att0,1,1);
	EExecO0(o11,p3,p5,Att5,1,1);
	EExecO0(o12,p1,p6,Att5,1,1);
	EExecP2(P,o11,o12,Att0,1,1);
	
  	S=true;
  	return S;	
} // EExecTR001

function EExecTR002(P,O1,O2,O3,Att,Sg1,Sg2,Sg3)
{
	if ((O1.OB==undefined) || (O2.OB==undefined) || (O3.OB==undefined)) return false;
  	var S=false;
	var p1=new Object();
	var p2=new Object();
	var p3=new Object();
	var o4=new Object();
	var o1=new Object();
	var o2=new Object();
	var o3=new Object();
	var o5=new Object();
	var o6=new Object();
	var o7=new Object();
	var o8=new Object();
	var o9=new Object();
	var o10=new Object();
	var p4=new Object();
	var p5=new Object();
	var p6=new Object();
	var p7=new Object();
	var o11=new Object();
	var o12=new Object();

	CreateCopy(o1,O1);
	CreateCopy(o2,O2);
	CreateCopy(o3,O3);

	EExecP2(p1,o1,o2,Att0,1,1);
	EExecP2(p2,o2,o3,Att0,1,1);
	EExecP2(p3,o3,o1,Att0,1,1);
	EExecO0(o4,p1,p2,Att5,1,1);
	EExecO0(o5,p2,p3,Att5,1,1);
	EExecO0(o6,p3,p1,Att5,1,1);
	EExecO8(o7,o8,o4,o5,Att0,Att0,1,-1);
	EExecO8(o9,o10,o5,o6,Att0,Att0,1,-1);
	EExecP2(p4,o7,o10,Att0,1,1);
	EExecPF(p5,p4,o6,Att0,1,1);
	EExecP2(p6,o8,o9,Att0,1,1);	
	EExecPF(p7,p6,o4,Att0,1,1);
	EExecO0(o11,p2,p5,Att5,1,1);
	EExecO0(o12,p3,p7,Att5,1,1);
	EExecP2(P,o11,o12,Att0,1,1);
	
  	S=true;
  	return S;	
} // EExecTR002

function EExecTR003(P,O1,O2,O3,Att,Sg1,Sg2,Sg3)
{
	if ((O1.OB==undefined) || (O2.OB==undefined) || (O3.OB==undefined)) return false;
  	var S=false;
	var p1=new Object();
	var p2=new Object();
	var p3=new Object();
	var o4=new Object();
	var o1=new Object();
	var o2=new Object();
	var o3=new Object();
	var o5=new Object();
	var o6=new Object();
	var o7=new Object();
	var o8=new Object();
	var o9=new Object();
	var o10=new Object();
	var p4=new Object();
	var p5=new Object();
	var p6=new Object();
	var p7=new Object();
	var o11=new Object();
	var o12=new Object();
	var o13=new Object();
	var o14=new Object();
	var o15=new Object();
	var o16=new Object();
	var o17=new Object();
	
	CreateCopy(o1,O1);
	CreateCopy(o2,O2);
	CreateCopy(o3,O3);

	EExecP2(p1,o1,o2,Att0,1,1);
	EExecP2(p2,o2,o3,Att0,1,1);
	EExecP2(p3,o3,o1,Att0,1,1);
	EExecO0(o4,p1,p2,Att5,1,1);
	EExecO0(o5,p2,p3,Att5,1,1);
	EExecO0(o6,p3,p1,Att5,1,1);
	EExecO8(o7,o8,o4,o5,Att0,Att0,1,-1);
	EExecO8(o9,o10,o5,o6,Att0,Att0,1,-1);
	EExecO8(o11,o12,o6,o4,Att0,Att0,1,-1);
	EExecPA(p4,o4,Att0,1);
	EExecPA(p5,o5,Att0,1);
	EExecPA(p6,o6,Att0,1);
	EExecO0(o13,p3,p4,Att5,1,1);
	EExecO0(o14,p1,p5,Att5,1,1);
	EExecO0(o15,p2,p6,Att5,1,1);
	EExecUU(o16,o9,o13,Att5,1,1);
	EExecUU(o17,o7,o15,Att5,1,1);
	EExecP2(p7,o16,o17,Att5,1,1);

	CreateCopy(P,p7);
	
  	S=true;
  	return S;	
} // EExecTR003

function EExecTR004(P,O1,O2,O3,Att,Sg1,Sg2,Sg3)
{
	if ((O1.OB==undefined) || (O2.OB==undefined) || (O3.OB==undefined)) return false;
  	var S=false;
	var p1=new Object();
	var p2=new Object();
	var p3=new Object();
	var o1=new Object();
	var o2=new Object();
	var o3=new Object();
	var o4=new Object();
	var o5=new Object();
	var o6=new Object();
	var o7=new Object();
	var o8=new Object();
	var chisl={C:{Re:90,Im:0},OB:"C"};

	CreateCopy(o1,O1);
	CreateCopy(o2,O2);
	CreateCopy(o3,O3);

	EExecP2(p1,o1,o2,Att0,1,1);
	EExecP2(p2,o2,o3,Att0,1,1);
	EExecP2(p3,o3,o1,Att0,1,1);
	EExecO0(o4,p1,p2,Att5,1,1);
	EExecO0(o5,p2,p3,Att5,1,1);
	EExecO0(o6,p3,p1,Att5,1,1);
	EExecO5(o7,o4,p3,chisl,Att5,1,1,1);
    EExecO5(o8,o5,p1,chisl,Att5,1,1,1);
    EExecP2(P,o7,o8,Att,1,1);
	
  	S=true;
  	return S;	
} // EExecTR004


function EExecTR005(P,O1,O2,O3,A1,Sg1,Sg2,Sg3)
{
	if ((O1.OB==undefined) || (O2.OB==undefined) || (O3.OB==undefined)) return false;
  	var S=false;
	var p1=new Object();
	var p2=new Object();
	var p3=new Object();
	var o1=new Object();
	var o2=new Object();
	var o3=new Object();
	var o4=new Object();
	var o5=new Object();
	var o6=new Object();
	var o7=new Object();
	var o8=new Object();
	var o9=new Object();
	var o10=new Object();
	
	CreateCopy(o1,O1);
	CreateCopy(o2,O2);
	CreateCopy(o3,O3);

	EExecP2(p1,o1,o2,Att0,1,1);
	EExecP2(p2,o2,o3,Att0,1,1);
	EExecP2(p3,o3,o1,Att0,1,1);
	EExecO0(o4,p1,p2,Att5,1,1);
	EExecO0(o5,p2,p3,Att5,1,1);
	EExecO0(o6,p3,p1,Att5,1,1);
	EExecO8(o7,o8,o4,o5,Att5,Att5,1,-1);
	EExecO8(o9,o10,o5,o6,Att5,Att5,1,-1);
	EExecP2(P,o7,o9,Att0,1,1);
	
  	S=true;
  	return S;	
} // EExecTR005

function EExecTR006(P,PA,PB,PC,O1,O2,O3,A1,A2,A3,A4,Sg1,Sg2,Sg3)
{
	if ((O1.OB==undefined) || (O2.OB==undefined) || (O3.OB==undefined)) return false;
  	var S=false;
	var p1=new Object();
	var p2=new Object();
	var p3=new Object();
	var o4=new Object();
	var o1=new Object();
	var o2=new Object();
	var o3=new Object();
	var o5=new Object();
	var o6=new Object();
	var o7=new Object();
	var o8=new Object();
	var o9=new Object();
	var o10=new Object();
	var p4=new Object();
	var p5=new Object();
	var p6=new Object();
	var p7=new Object();
	var d1=new Object();
	
	CreateCopy(o1,O1);
	CreateCopy(o2,O2);
	CreateCopy(o3,O3);

	EExecP2(p1,o1,o2,Att5,1,1);
	EExecP2(p2,o2,o3,Att5,1,1);
	EExecP2(p3,o3,o1,Att5,1,1);
	EExecO0(o4,p1,p2,Att5,1,1);
	EExecO0(o5,p2,p3,Att5,1,1);
	EExecO0(o6,p3,p1,Att5,1,1);
	EExecO8(o7,o8,o4,o5,Att0,Att0,1,-1);
	EExecO8(o9,o10,o5,o6,Att0,Att0,1,-1);
	EExecP2(p4,o7,o9,Att0,1,1);
	EExecPF(p5,p4,o4,Att0,1,1);
	EExecPF(p6,p4,o5,Att0,1,1);
	EExecPF(p7,p4,o6,Att0,1,1);
	EExecD4(d1,p5,p6,p7,Att0,1,1,1);
	CreateCopy(P,d1);
	P.FAtt=CopyAtt(A1);
	CreateCopy(PA,p5);
	PA.FAtt=CopyAtt(A2);
	CreateCopy(PB,p6);
	PB.FAtt=CopyAtt(A3);
	CreateCopy(PC,p7);
	PC.FAtt=CopyAtt(A4);
  	S=true;
  	return S;	
} // EExecTR006

function EExecTR007(out_prm1,out_prm2,out_prm3,out_prm4,in_prm1,in_prm2,in_prm3,Att_1,Att_2,Att_3,Att_4,Sg1,Sg2,Sg3)
{
	if ((in_prm1.OB==undefined) || (in_prm2.OB==undefined) || (in_prm3.OB==undefined)) return false;
	var o1=new Object();
	var o2=new Object();
	var o3=new Object();
	var p1=new Object();
	var p2=new Object();
	var p3=new Object();
	var o4=new Object();
	var o5=new Object();
	var o6=new Object();
	var o7=new Object();
	var o8=new Object();
	var o9=new Object();
	var o10=new Object();
	var p4=new Object();
	var p5=new Object();
	var p6=new Object();
	var p7=new Object();
	var d1=new Object();
	var p8=new Object();
	var p9=new Object();
	var p10=new Object();
	var p11=new Object();
	var p12=new Object();
	var p13=new Object();
	var p14=new Object();
	var p15=new Object();
	var d2=new Object();
	var d3=new Object();
	CreateCopy(o1,in_prm1);
	o1.FAtt=CopyAtt(in_prm1.FAtt);

	CreateCopy(o2,in_prm2);
	o2.FAtt=CopyAtt(in_prm2.FAtt);

	CreateCopy(o3,in_prm3);
	o3.FAtt=CopyAtt(in_prm3.FAtt);

	EExecP2(p1,o1,o2,Att0,1,1);
	EExecP2(p2,o2,o3,Att0,1,1);
	EExecP2(p3,o3,o1,Att0,1,1);
	EExecO0(o4,p1,p2,Att5,1,1);
	EExecO0(o5,p2,p3,Att5,1,1);
	EExecO0(o6,p3,p1,Att5,1,1);
	EExecO8(o7,o8,o4,o5,Att0,Att0,1,-1);
	EExecO8(o9,o10,o5,o6,Att0,Att0,1,-1);
	EExecP2(p4,o7,o10,Att0,1,1);
	EExecPF(p5,p4,o4,Att0,1,1);
	EExecPF(p6,p4,o5,Att0,1,1);
	EExecPF(p7,p4,o6,Att0,1,1);
	EExecD4(d1,p7,p5,p6,Att5,1,1,1);
	EExecP2(p8,o8,o9,Att0,1,1);
	EExecPF(p9,p8,o4,Att0,1,1);
	EExecPF(p10,p8,o5,Att0,1,1);
	EExecPF(p11,p8,o6,Att0,1,1);
	EExecD4(d2,p9,p10,p11,Att5,1,1,1);
	EExecP2(p12,o8,o10,Att0,1,1);
	EExecPF(p13,p12,o4,Att0,1,1);
	EExecPF(p14,p12,o5,Att0,1,1);
	EExecPF(p15,p12,o6,Att0,1,1);
	EExecD4(d3,p13,p14,p15,Att5,1,1,1);

	CreateCopy(out_prm1,d1);
	out_prm1.FAtt=CopyAtt(Att_1);

	CreateCopy(out_prm2,p7);
	out_prm2.FAtt=CopyAtt(Att_2);

	CreateCopy(out_prm3,p5);
	out_prm3.FAtt=CopyAtt(Att_3);

	CreateCopy(out_prm4,p6);
	out_prm4.FAtt=CopyAtt(Att_4);

	AddInc(in_prm1,out_prm2);
	AddInc(in_prm2,out_prm3);
	AddInc(in_prm3,out_prm4);
	AddInc(out_prm1,out_prm2);
	AddInc(out_prm1,out_prm3);
	AddInc(out_prm1,out_prm4);	
	
	Result=true;
	return Result;
} // EExecTR007

function EExecTR008(P1,O1,O2,O3,A1,Sg1,Sg2,Sg3)
{
	if ((O1.OB==undefined) || (O2.OB==undefined) || (O3.OB==undefined)) return false;
  	var S=false;
	var p1=new Object();
	var p2=new Object();
	var p3=new Object();
	var p4=new Object();
	var p5=new Object();
	var p6=new Object();
	var o1=new Object();
	var o2=new Object();
	var o3=new Object();
	var o4=new Object();
	var o5=new Object();
	var o6=new Object();
	var d1=new Object();

	CreateCopy(o1,O1);
	CreateCopy(o2,O2);
	CreateCopy(o3,O3);

	EExecP2(p1,o1,o2,Att0,1,1);
	EExecP2(p2,o2,o3,Att0,1,1);
	EExecP2(p3,o3,o1,Att0,1,1);
	EExecO0(o4,p1,p2,Att5,1,1);
	EExecO0(o5,p2,p3,Att5,1,1);
	EExecO0(o6,p3,p1,Att5,1,1);
	EExecPA(p4,o4,Att0,1);
	EExecPA(p5,o5,Att0,1);
	EExecPA(p6,o6,Att0,1);
	EExecD4(d1,p4,p5,p6,Att2,1,1,1);
	
	CreateCopy(P1,d1);
	P1.FAtt=CopyAtt(A1);	
  	S=true;
  	return S;	
} // EExecTR008

function EExecTR009(P1,O1,O2,O3,A1,Sg1,Sg2,Sg3)
{
	if ((O1.OB==undefined) || (O2.OB==undefined) || (O3.OB==undefined)) return false;
  	var S=false;
	var p1=new Object();
	var p2=new Object();
	var p3=new Object();
	var p4=new Object();
	var p5=new Object();
	var p6=new Object();
	var o1=new Object();
	var o2=new Object();
	var o3=new Object();
	var o4=new Object();
	var o5=new Object();
	var o6=new Object();
	var o7=new Object();
	var o8=new Object();

	CreateCopy(o1,O1);
	CreateCopy(o2,O2);
	CreateCopy(o3,O3);

	EExecP2(p1,o1,o2,Att0,1,1);
	EExecP2(p2,o2,o3,Att0,1,1);
	EExecP2(p3,o3,o1,Att0,1,1);
	EExecO0(o4,p1,p2,Att5,1,1);
	EExecO0(o5,p2,p3,Att5,1,1);
	EExecO0(o6,p3,p1,Att5,1,1);
	EExecPA(p4,o4,Att0,1);
	EExecPA(p5,o5,Att0,1);
	EExecPA(p6,o6,Att0,1);
	EExecO0(o7,p3,p4,Att5,1,1);
	EExecO0(o8,p1,p5,Att5,1,1);
	EExecP2(P1,o7,o8,A1,1,1);
	
  	S=true;
  	return S;	
} // EExecTR009

function EExecTR010(P1,P2,P3,O1,O2,O3,Att1,Att2,Att3,Sg1,Sg2,Sg3)
{
	if ((O1.OB==undefined) || (O2.OB==undefined) || (O3.OB==undefined)) return false;
  	var S=false;
	var p1=new Object();
	var p2=new Object();
	var p3=new Object();
	var o1=new Object();
	var o2=new Object();
	var o3=new Object();
	var o4=new Object();
	var o5=new Object();
	var o6=new Object();
	var o8=new Object();
	var o10=new Object();
	var o12=new Object();

	CreateCopy(o1,O1);
	CreateCopy(o2,O2);
	CreateCopy(o3,O3);

	EExecP2(p1,o1,o2,Att0,1,1);
	EExecP2(p2,o2,o3,Att0,1,1);
	EExecP2(p3,o3,o1,Att0,1,1);
	EExecO0(o4,p1,p2,Att5,1,1);
	EExecO0(o5,p2,p3,Att5,1,1);
	EExecO0(o6,p3,p1,Att5,1,1);
	EExecO8(P1,o8,o4,o5,Att1,Att0,1,-1);
	EExecO8(P2,o10,o5,o6,Att2,Att0,1,-1);
	EExecO8(P3,o12,o6,o4,Att3,Att0,1,-1)
	
  	S=true;
  	return S;	
} // EExecTR010

function EExecTR011(P1,P2,P3,O1,O2,O3,A1,A2,A3,Sg1,Sg2,Sg3)
{
	if ((O1.OB==undefined) || (O2.OB==undefined) || (O3.OB==undefined)) return false;
  	var S=false;
	var p1=new Object();
	var p2=new Object();
	var p3=new Object();
	var o1=new Object();
	var o2=new Object();
	var o3=new Object();
	var o4=new Object();
	var o5=new Object();
	var o6=new Object();
	var chisl={C:{Re:90,Im:0},OB:"C"};

	CreateCopy(o1,O1);
	CreateCopy(o2,O2);
	CreateCopy(o3,O3);

	EExecP2(p1,o1,o2,Att0,1,1);
	EExecP2(p2,o2,o3,Att0,1,1);
	EExecP2(p3,o3,o1,Att0,1,1);
	EExecO0(o4,p1,p2,Att5,1,1);
	EExecO0(o5,p2,p3,Att5,1,1);
	EExecO0(o6,p3,p1,Att5,1,1);
	EExecO5(P1,o4,p3,chisl,A1,1,1,1);
	EExecO5(P2,o5,p1,chisl,A2,1,1,1);
	EExecO5(P3,o6,p2,chisl,A3,1,1,1);
	
  	S=true;
  	return S;	
} // EExecTR011

function EExecTR012(P1,P2,P3,O1,O2,O3,A1,A2,A3,Sg1,Sg2,Sg3)
{
	if ((O1.OB==undefined) || (O2.OB==undefined) || (O3.OB==undefined)) return false;
  	var S=false;
	var p1=new Object();
	var p2=new Object();
	var p3=new Object();
	var p4=new Object();
	var p5=new Object();
	var p6=new Object();
	var o1=new Object();
	var o2=new Object();
	var o3=new Object();
	var o4=new Object();
	var o5=new Object();
	var o6=new Object();

	CreateCopy(o1,O1);
	CreateCopy(o2,O2);
	CreateCopy(o3,O3);

	EExecP2(p1,o1,o2,Att0,1,1);
	EExecP2(p2,o2,o3,Att0,1,1);
	EExecP2(p3,o3,o1,Att0,1,1);
	EExecO0(o4,p1,p2,Att5,1,1);
	EExecO0(o5,p2,p3,Att5,1,1);
	EExecO0(o6,p3,p1,Att5,1,1);
	EExecPA(p4,o4,Att0,1);
	EExecPA(p5,o5,Att0,1);
	EExecPA(p6,o6,Att0,1);
	EExecO0(P1,p3,p4,A1,1,1);
	EExecO0(P2,p1,p5,A2,1,1);
	EExecO0(P3,p2,p6,A3,1,1);
	
  	S=true;
  	return S;	
} // EExecTR012

function EExecTR013(P1,P2,P3,O1,O2,O3,A1,A2,A3,Sg1,Sg2,Sg3)
{
	if ((O1.OB==undefined) || (O2.OB==undefined) || (O3.OB==undefined)) return false;
  	var S=false;
	var p1=new Object();
	var p2=new Object();
	var p3=new Object();
	var o4=new Object();
	var o1=new Object();
	var o2=new Object();
	var o3=new Object();
	var o5=new Object();
	var o6=new Object();
	var o7=new Object();
	var o8=new Object();
	var o9=new Object();
	var o10=new Object();
	var p4=new Object();
	var p5=new Object();
	var p6=new Object();
	var p7=new Object();
	var o11=new Object();
	var o12=new Object();
	var o13=new Object();
	var o14=new Object();
	var o15=new Object();
	var o16=new Object();
	var o17=new Object();
	var o18=new Object();
	
	CreateCopy(o1,O1);
	CreateCopy(o2,O2);
	CreateCopy(o3,O3);

	EExecP2(p1,o1,o2,Att0,1,1);
	EExecP2(p2,o2,o3,Att0,1,1);
	EExecP2(p3,o3,o1,Att0,1,1);
	EExecO0(o4,p1,p2,Att5,1,1);
	EExecO0(o5,p2,p3,Att5,1,1);
	EExecO0(o6,p3,p1,Att5,1,1);
	EExecO8(o7,o8,o4,o5,Att0,Att0,1,-1);
	EExecO8(o9,o10,o5,o6,Att0,Att0,1,-1);
	EExecO8(o11,o12,o6,o4,Att0,Att0,1,-1);
	EExecPA(p4,o4,Att0,1);
	EExecPA(p5,o5,Att0,1);
	EExecPA(p6,o6,Att0,1);
	EExecO0(o13,p3,p4,Att5,1,1);
	EExecO0(o14,p1,p5,Att5,1,1);
	EExecO0(o15,p2,p6,Att5,1,1);
	EExecUU(o16,o9,o13,Att5,1,1);
	EExecUU(o17,o7,o15,Att5,1,1);
	EExecUU(o18,o11,o14,Att5,1,1);


	CreateCopy(P1,o16);
	P1.FAtt=CopyAtt(A1);
	
	CreateCopy(P2,o17);
	P2.FAtt=CopyAtt(A2);
	
	CreateCopy(P3,o18);
	P3.FAtt=CopyAtt(A3);
	
  	S=true;
  	return S;	
} // EExecTR013

function EExecTR014(P1,P2,P3,O1,O2,O3,P,A1,A2,A3,Sg1,Sg2,Sg3,Sg4)
{
	if ((O1.OB==undefined) || (O2.OB==undefined) || (O3.OB==undefined)) return false;
  	var S=false;
	var p1=new Object();
	var p2=new Object();
	var p3=new Object();
	var p4=new Object();
	var p5=new Object();
	var p6=new Object();
	var p7=new Object();
	var o1=new Object();
	var o2=new Object();
	var o3=new Object();
	var o4=new Object();
	var o5=new Object();
	var o6=new Object();
	
	CreateCopy(o1,O1);
	CreateCopy(o2,O2);
	CreateCopy(o3,O3);
	CreateCopy(p1,P);

	EExecP2(p2,o1,o2,Att0,1,1);
    EExecP2(p3,o2,o3,Att0,1,1);
    EExecP2(p4,o3,o1,Att0,1,1);
    EExecO0(o4,p2,p3,Att5,1,1);
    EExecO0(o5,p3,p4,Att5,1,1);
    EExecO0(o6,p4,p2,Att5,1,1);
    EExecPF(p5,p1,o5,Att0,1,1);
    EExecPF(p6,p1,o6,Att0,1,1);
    EExecPF(p7,p1,o4,Att0,1,1);
    EExecO0(P1,p5,p6,A1,1,1);
    EExecO0(P2,p6,p7,A2,1,1);
    EExecO0(P3,p7,p5,A3,1,1);
	
  	S=true;
  	return S;	
} // EExecTR014

function EExecPJ(Out_Prm,X,Y,Z,Att,Sg1,Sg2,Sg3)
{
/*
     ResultFALSE;
     Out_PrmNIL;
     if (Att.PT=8) or (Att.LV=8) or (Att.LT=6) then
     begin
          Att.RColor X.OAtt.RColor;
          Att.GColor X.OAtt.GColor;
          Att.BColor X.OAtt.BColor;
     end;
     if Att.PT=8 then Att.PTX.OAtt.PT;
     if Att.LV=8 then Att.LVX.OAtt.LV;
     if Att.LT=6 then Att.LTX.OAtt.LT;

     if X is TOEmpty then
     begin
          Out_Prm(TOEmpty.Create([X,Y,Z],OW));
          ResultTRUE;
          Exit;
     end;
*/
	if ((X.OB==undefined) || (Y.OB==undefined) || (Z.OB==undefined)) return false;
    var Dx={Re:undefined, Im:undefined}
    var Dy={Re:undefined, Im:undefined}
    var A={Re:undefined, Im:undefined}
    var B={Re:undefined, Im:undefined}
	
	if ((X.OB=="P") && (Y.OB=="C") && (Z.OB=="C"))
	{
		
		if (IsReal(Y))
		{
			if ((Z.OB=="C") && (IsSobstv(Z)) && (IsReal(Z)))
			{
				Df=Z.C.Re/180*Math.PI*Sg3;
				if (Df<0) {Df=2*Math.PI+Df;}
				Value=Df;

				Dx=MCompl(Y.C.Re*Sg2*Math.cos(Value),0);
				Dy=MCompl(Y.C.Re*Sg2*Math.sin(Value),0);
				A=CompSum(X.X,Dx);
				B=CompSum(X.Y,Dy);
				TOPoint_Create(Out_Prm,A,B,1,Att);	
			}
			return true
		}
	
	}
	


	if ((X.OB=="P") && (Y.OB=="C"))
	if (IsSobstv(X)) 
	if (IsReal(Y)) 
	{
		if (Z.OB=="O") 
		{
			if (Sg3==1)
			{SCDP=SC(Z.X1.Re,Z.Y1.Re,Z.X2.Re,Z.Y2.Re)} else
			{SCDP=SC(Z.X2.Re,Z.Y2.Re,Z.X1.Re,Z.Y1.Re);}
			Df=Fi(0,1,SCDP.S,SCDP.C);

			if (Df<0) Df=2*Math.PI+Df;

			A=X.X;
			B=X.Y;
			Value=Df;
			Dx=MCompl(Y.C.Re*Sg2*Math.cos(Value),0);
			A=CompSum(A,Dx);
			Dy=MCompl(Y.C.Re*Sg2*Math.sin(Value),0);
			B=CompSum(B,Dy);

//			Kind=tp_fixed;
//			if (TOChisl(Z).Kind==tc_Constant) then Kindtp_halfFree else Kindtp_fixed;

			TOPoint_Create(Out_Prm,A,B,1,Att);	
			return true;
		}
	} else
	{
		if (Att.Chk==1) TOEmpty_Create(Out_Prm,Att);
		return true;
	}

	if (Att.Chk==1) TOEmpty_Create(Out_Prm,Att);
	return true;
} // EExecPJ 


function EExecO1(OOO,X,Dx,Att,Sg1,Sg2)
{
	if ((X.OB==undefined) || (Dx.OB==undefined)) return false;
    var AX={Re:undefined, Im:undefined}
    var AY={Re:undefined, Im:undefined}
    var BX={Re:undefined, Im:undefined}
    var BY={Re:undefined, Im:undefined}
    var CX={Re:undefined, Im:undefined}
    var CY={Re:undefined, Im:undefined}
    var EX={Re:undefined, Im:undefined}
    var EY={Re:undefined, Im:undefined}
	

	if ((Dx.OB=="C") && (X.OB=="P") && IsSobstv(X)) 
	{
		Df=Dx.C.Re*Math.PI/180*Sg2;
		AX.Im=0;
		AY.Im=0;
		BX.Im=0;
		BY.Im=0;
		AX.Re=X.X.Re+100;
		AY.Re=X.Y.Re;

		AX.Im=X.X.Im;
		AY.Im=X.Y.Im;

		Def= !((Math.abs(X.X.Im)>Eps) || (Math.abs(X.Y.Im)>Eps));
		Def=true;

		BX.Re=X.X.Re;
		BY.Re=X.Y.Re;

		BX.Im=X.X.Im;
		BY.Im=X.Y.Im;

		CX=CompSub(AX,BX);
		CY=CompSub(AY,BY);

		EX=CompSub(CompMul(CX,MCompl(Math.cos(Df),0)),CompMul(CY,MCompl(Math.sin(Df),0)));
		EY=CompSum(CompMul(CX,MCompl(Math.sin(Df),0)),CompMul(CY,MCompl(Math.cos(Df),0)));

		AX=CompSum(BX,EX);
		AY=CompSum(BY,EY);
		if (Def) 
		{
			TOLine_Create(OOO,BX,BY,1,AX,AY,1,brn_UnLimited,"sobstv",Att)
			AddInc(OOO,X);
		} else
		if (Att.Chk==1) TOEmpty_Create(OOO,Att);
	} else
	if ((Dx.OB=="C") && (X.OB=="P") && !(IsSobstv(X)) && IsReal(X))
	{

		BX.Re=0; 
		BX.Im=0;
		BY.Re=0; 
		BY.Im=0;


		Dl=Math.sqrt(Sqr(X.X.Re)+Sqr(X.Y.Re));
		if (Dl>0)
		{
			S1=X.Y.Re/Dl;
			C1=X.X.Re/Dl;
		}
		Df=Fi(0,1,S1,C1);

		if (Df<0) Df=2*Math.PI+Df;

		AX.Re=100*Math.cos(Df);
		AY.Re=100*Math.sin(Df);

		TOLine_Create(OOO,MCompl(0,0),MCompl(1,0),0,MCompl(1,0),MCompl(0,0),0,brn_UnLimited,"nesobstv",Att5);
		AddInc(OOO,X);
		Result=true;
	} else
	if (Att.Chk==1) TOEmpty_Create(OOO,Att);
	Result=true;
	return Result; 
} // EExecO1

function CalcPK(X,Y,Z,PNT,Kind)
{
	var OOO=new Object();
	var V=new Object();

	Result=false;
	Chk=1;
	if ((X.OB=="P") && (Y.OB=="O"))
	if (IsReal(X) && IsReal(Y)) 
	{

		if (Z.OB=="C") 
		if (IsReal(Z)) 
		{
			EExecO1(OOO,X,Z,Att5,1,1);
			EExecP2(PNT,Y,OOO,Att5,1,1);
			return true;
		}

		if (Z.OB=="P") 
		if (IsReal(Z)) 
		{
			EExecO0(OOO,X,Z,Att5,1,1);
			EExecP2(PNT,Y,OOO,Att5,1,1);
			return true;
		}
		if (Z.OB=="O")
		if (IsReal(Z))
		{
			TOChisl_Create(V,MCompl(0,0),Att5);			
			EExecO5(OOO,Z,X,V,Att5,1,1,1);
			EExecP2(PNT,Y,OOO,Att5,1,1);
			return true;
		}
	}
	if (Chk==1) TOEmpty_Create(PNT,Att5);
	Result=true;
    return Result;
} // CalcPK 


function EExecPK(Out_Prm,X,Y,Z,Att,Sg1,Sg2,Sg3)
{
	if ((X.OB==undefined) || (Y.OB==undefined) || (Z.OB==undefined)) return false;
	var Pnt=new Object();
	var Kind=0;
	Result=false;
/*
     if (Att.PT=8) or (Att.LV=8) or (Att.LT=6) then
     begin
          Att.RColor X.OAtt.RColor;
          Att.GColor X.OAtt.GColor;
          Att.BColor X.OAtt.BColor;
     end;
     if Att.PT=8 then Att.PTX.OAtt.PT;
     if Att.LV=8 then Att.LVX.OAtt.LV;
     if Att.LT=6 then Att.LTX.OAtt.LT;
*/

	if ((X.OB=="P") && (Y.OB=="O")) 
	{
		if (CalcPK(X,Y,Z,Pnt,Kind))
		{
			if (Pnt.OB=="P") 
			{
				TOPoint_Create(Out_Prm,Pnt.X,Pnt.Y,Pnt.W,Att);
//	alert(Y.Incid.length);
				AddInc(Y,Out_Prm);
			}
			if (Pnt.OB=="$")
			if (Att.Chk==1) TOEmpty_Create(Out_Prm,Att);
		}
	} else
	if ((X.OB=="L") && (Y.OB=="O"))
	{
		CalcPK(X.S1,Y,Z,PNTS1,Kind);
		CalcPK(X.S2,Y,Z,PNTS2,Kind);
		CalcPK(X.S3,Y,Z,PNTS3,Kind);
		CalcPK(X.D1,Y,Z,PNTD1,Kind);
		CalcPK(X.D2,Y,Z,PNTD2,Kind);
		CalcPK(X.D3,Y,Z,PNTD3,Kind);
//		Out_PrmTOProeL.Create(Y,PNTS1,PNTS2,PNTS3,Y,PNTD1,PNTD2,PNTD3,Att,OW);
		TOEmpty_Create(Out_Prm,Att) // temporary dummy
	} else
	{
		if (Att.Chk==1) TOEmpty_Create(Out_Prm,Att);
	}

    Result=true;
	return Result
} // EExecPK 


function EExecX0(out_prm1,P0,O0,P1,O1,A,Sg1,Sg2,Sg3,Sg4)
{
	if ((P0.OB==undefined) || (O0.OB==undefined) || (P1.OB==undefined) || (O1.OB==undefined)) return false;
	var o0=new Object();
	var o1=new Object();
	var p0=new Object();
	var p1=new Object();
	var o2=new Object();
	var p2=new Object();
	var o3=new Object();
	var p4=new Object();
	var o4=new Object();
	var c0=new Object();
	var Chisl0={C:{Re:0,Im:0},OB:"C"};
	var Chisl1={C:{Re:90,Im:0},OB:"C"};

	CreateCopy(o0,O0);
	CreateCopy(o1,O1);
	CreateCopy(p0,P0);
	CreateCopy(p1,P1);
	Result=false;
	if ((P0.OB=="P") && (P1.OB=="P") && (O0.OB=="O") && (O1.OB=="O"))
	{
		EExecO0(o2,p0,p1,Att0,1*Sg1,1*Sg3);
		EExecPK(p3,p0,o0,o2,Att0,1*Sg1,1*Sg2,1);
		EExecO5(o3,o1,p1,Chisl1,Att0,1*Sg4,1*Sg3,1);
		EExecP2(p4,o1,o3,Att0,1*Sg4,1);
		EExecO5(o4,o0,p3,Chisl1,Att0,1*Sg2,1,1);
		EExecCJ(c0,p0,p3,o4,Att0,1,1,1);
		EExecPJ(out_prm1,p4,c0,o3,A,1,-1,1);
//		TOEmpty_Create(out_prm1,A);
	} else
    if (A.Chk==1) TOEmpty_Create(out_prm1,A);

	Result=true;
	return Result;

} // EExecX0

function EExecD1(OOO,X,Y,Att,Sg1,Sg2)
{
    var R={Re:undefined, Im:undefined}
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	if ((X.OB=="P") && (Y.OB=="P") && (IsSobstv(X)) && (IsSobstv(Y)))
	{
		R=CompSqrt(CompSum(CompSqr(CompSub(X.X,Y.X)),CompSqr(CompSub(X.Y,Y.Y))));
		if ((Math.abs(R.Re)+Math.abs(R.Im))>=Eps) 
		{
			TODuga_Create(OOO,X.X,X.Y,R,X.X.Re+R.Re,X.Y.Re,X.X.Re+R.Re,X.Y.Re,Att1);
		}
        AddInc(OOO,Y);
        return true;
	}

	if ((X.OB=="P") && (Y.OB=="P") &&
	(IsSobstv(X)) && (IsSobstv(Y)) &&
    (IsReal(X)) && !(IsReal(Y))) 
	{
		var RR=new Object();
		EExecC2(RR,X,Y,RR,Att5,1,1);
		TODuga_Create(OOO,X.X,X.Y,RR.C,X.X.Re,X.Y.Re,X.X.Re,X.Y.Re,Att1);
		AddInc(OOO,Y);
        return true;
	}


	if ((X.OB=="P") && (Y.OB=="D") && (IsSobstv(X)) && (IsReal(X))) 
	{
		D=Math.sqrt(Sqr(X.X.Re-Y.Xc.Re)+Sqr(X.Y.Re-Y.Yc.Re));
		R.Re=D-Y.R.Re*Sg2; 
		R.Im=0;
		if ((Math.abs(R.Re)+Math.abs(R.Im))>=Eps) 
		{
			TODuga_Create(OOO,X.X,X.Y,R,X.X.Re+R.Re,X.Y.Re,X.X.Re+R.Re,X.Y.Re,Att1);
		}
		else if (Att.Chk==1) TOEmpty_Create(OOO,Att);

		AddInc(OOO,Y);
        return true;
	}
	if (Att.Chk==1) TOEmpty_Create(OOO,Att);
	return true;
} // EExecD1


function Duga1(X1,Y1,Xc,Yc,R,K)
{
	OUT = {Xa:undefined, Ya:undefined, Sa:undefined, Ca:undefined, Prizn:undefined}

	Dx=(Xc-X1)*K;
	Dy=(Yc-Y1)*K;
	Dl=Math.sqrt(Sqr(Dx)+Sqr(Dy));
	if (Math.abs(Dl)<0) 
    {
		OUT.Prizn="Inside";
        return OUT;
	}

	OUT.Prizn="Outside";
	Ss=R/Dl;
	Sa=Dy/Dl; OUT.Sa=Sa;
	Ca=Dx/Dl; OUT.Ca=Ca;
	Da=ArcSin(Ss);

	if (Math.abs(Sqr(Dl)-Sqr(R))<=Eps) 
	{
		OUT.Prizn="OnThe";
		return OUT;
	}

	if (Sqr(Dl)-Sqr(R)<=0) 
	{
		OUT.Prizn="Inside";
		return OUT;
	}

	Dl1=Math.sqrt(Sqr(Dl)-Sqr(R));
	Al=ArcSin(Sa);

	if (Ca<0) Al=-Al+Math.PI;

	Al=Al-Da*K;
	Sa=Math.sin(Al); OUT.Sa=Sa;
	Ca=Math.cos(Al); OUT.Ca=Ca;
	Xa=X1+K*(Dl1*Ca); OUT.Xa=Xa;
	Ya=Y1+K*(Dl1*Sa); OUT.Ya=Ya;
	return OUT;
} // Duga1 


function EExecP4_1(out_prm1,out_prm2,in_prm1,in_prm2,Att_1,Att_2,Sg1,Sg2)
{
	if ((in_prm1.OB==undefined) || (in_prm2.OB==undefined)) return false;
	var X=new Object();
	var Y=new Object();
	var p2=new Object();
	var d2=new Object();
	var p4=new Object();

	Result=true;
	CreateCopy(Y,in_prm1);
	CreateCopy(X,in_prm2);
    EExecPA(p2,Y,Att0,1*Sg1);
    EExecDN(d2,X,p2,Att0,1*Sg2,1);
    EExecP3(out_prm2,p4,d2,Y,Att0,Att0,1,1*Sg1);
	EExecO0(out_prm1,out_prm2,X,Att0,1,1*Sg2);

	return Result;
} // EExecP4_1

function EExecP4(Out_Prm1,Out_Prm2,X,Y,Att1,Att2,Sg1,Sg2)
{
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	
    var X2={Re:undefined, Im:undefined}
    var Y2={Re:undefined, Im:undefined}
    var X3={Re:undefined, Im:undefined}
    var Y3={Re:undefined, Im:undefined}
    var X4={Re:undefined, Im:undefined}
    var Y4={Re:undefined, Im:undefined}
    var X5={Re:undefined, Im:undefined}
    var Y5={Re:undefined, Im:undefined}
    var X6={Re:undefined, Im:undefined}
    var Y6={Re:undefined, Im:undefined}
    var X7={Re:undefined, Im:undefined}
    var Y7={Re:undefined, Im:undefined}
    var XX={Re:undefined, Im:undefined}
    var YY={Re:undefined, Im:undefined}
    Result=false;
	if ((X.OB=="P") && (Y.OB=="D"))
	{
		X1=X.X;
		Y1=X.Y;
		Xc=Y.Xc.Re;
		Yc=Y.Yc.Re;
		R=Y.R.Re;
		X2.Re=0; X2.Im=0;
		Y2.Re=0; Y2.Im=0;
		if (X.W==1)
		{
			DG=Duga1(X1.Re,Y1.Re,Xc,Yc,R,Sg2);
			X2=DG.X2;
			Y2=DG.Y2;
			Cc=DG.Ca;
			Ss=DG.Sa;
			if ((DG.Prizn=="Outside") || (DG.Prizn=="Inside")) 
			{

				EExecP4_1(Out_Prm1,Out_Prm2,Y,X,Att1,Att2,Sg2,Sg1);
				Result=true;
				return Result;
			}

			if (DG.Prizn=="Inside") 
			{
				if (Att1.Chk==1) TOEmpty_Create(Out_Prm1,Att1);
				if (Att2.Chk==1) TOEmpty_Create(Out_Prm2,Att2);
				Result=true;
				return Result;
			}

			if (DG.Prizn=="OnThe")
			{
				TOPoint_Create(Out_Prm2,X1,Y1,1,Att2);	

				X2=MCompl(Y.Xc.Re,0); Y2=MCompl(Y.Yc.Re,0);
				Dx=90;
				SCDP=SC(X2.Re,Y2.Re,X1.Re,Y1.Re);
				Df=Fi(0,1,SCDP.S,SCDP.C);
				Dx=Dx*Math.PI/180+Df;
				X5.Re=X1.Re+100*Math.cos(Dx)*Sg2; X5.Im=0;
				Y5.Re=Y1.Re+100*Math.sin(Dx)*Sg2; Y5.Im=0;

				TOLine_Create(Out_Prm1,X1,Y1,1,X5,Y5,1,brn_UnLimited,"sobstv",Att1);

				AddInc(Out_Prm1,Out_Prm2);

				AddInc(Y,Out_Prm2);

				AddInc(Out_Prm1,X);
				Result=true;
				return Result;
			}		

			TOPoint_Create(Out_Prm2,X2,Y2,1,Att2);	
			TOLine_Create(Out_Prm1,X1,Y1,1,X2,Y2,1,brn_Limited,"sobstv",Att1);

			AddInc(Out_Prm1,Out_Prm2);
			AddInc(Out_Prm1,X);
			AddInc(Y,Out_Prm2);

			Result=true;
			return Result;
			
		}

		if (X.W=0)
		{
			Dl=Math.sqrt(Sqr(X.X.Re)+Sqr(X.Y.Re));

			if (Dl>0)
			{
				S1=X.Y.Re/Dl;
				C1=X.X.Re/Dl;
			}

			Df=Fi(0,1,S1,C1);

			if (Df<0) Df=2*Math.PI+Df;

			Dx=Df+Math.PI;

			X5.Re=Xc+100*Math.cos(Dx);X5.Im=0;
			Y5.Re=Yc+100*Math.sin(Dx);Y5.Im=0;
			X4.Re=Xc-100*Math.cos(Dx);X4.Im=0;
			Y4.Re=Yc-100*Math.sin(Dx);Y4.Im=0;

			Dxx=R;
			Value=Dxx/Math.sqrt(Sqr(X5.Re-X4.Re)+Sqr(Y5.Re-Y4.Re))*Sg2;
			X3.Re=X4.Re+(Y5.Re-Y4.Re)*Value;
			Y3.Re=Y4.Re-(X5.Re-X4.Re)*Value;
			Value=100/Math.sqrt(Sqr(X5.Re-X4.Re)+Sqr(Y5.Re-Y4.Re));
			X6.Re=X3.Re-Value*(X5.Re-X4.Re);
			Y6.Re=Y3.Re-Value*(Y5.Re-Y4.Re);
			X7.Re=X3.Re+Value*(X5.Re-X4.Re);
			Y7.Re=Y3.Re+Value*(Y5.Re-Y4.Re);
			X3.Im=0; Y3.Im=0; 
			X6.Im=0; Y6.Im=0; 
			X7.Im=0; Y7.Im=0;

			TOLine_Create(Out_Prm1,X6,Y6,1,X7,Y7,1,brn_UnLimited,"sobstv",Att1);

			SCDP=SC(X1.Re,Y1.Re,X2.Re,Y2.Re);
			SCDP=SC(X1.Re,Y1.Re,X2.Re,Y2.Re);
			Df=Fi(0,1,SCDP.S,SCDP.C);
			X3.Re=Xc; Y3.Re=Yc; //DxR;
			Dx=Dx+Math.PI/2;
			X5.Re=X3.Re+100*Math.cos(Dx);X5.Im=0;
			Y5.Re=Y3.Re+100*Math.sin(Dx);Y5.Im=0;
			X4.Re=X3.Re-100*Math.cos(Dx);X4.Im=0;
			Y4.Re=Y3.Re-100*Math.sin(Dx);Y4.Im=0;
			XX.Im=0; YY.Im=0;
			LL=LinLin(X4.Re,Y4.Re,X5.Re,Y5.Re,X6.Re,Y6.Re,X7.Re,Y7.Re);
			XX.Re=LL.X; YY.Re=LL.Y;
			TOPoint_Create(Out_Prm2,XX,YY,1,Att2);	

//			if (Out_Prm1.PointBelongs(XX.Re,YY.Re))
//			{
//				AddInc(Out_Prm1,Out_Prm2);
//				AddInc(Out_Prm1,X);
//				AddInc(Y,Out_Prm2);
//			}

			Result=true;
			return Result;
		}
	
	} else
	if ((X.OB=="P") && (Y.OB=="P"))
	{
		TOPoint_Create(Out_Prm2,Y.X,Y.Y,1,Att2);	
		TOLine_Create(Out_Prm1,X.X,X.Y,1,Y.X,Y.Y,1,brn_Limited,"sobstv",Att1);

		AddInc(Out_Prm1,Out_Prm2);
		AddInc(Out_Prm1,X);
		AddInc(Y,Out_Prm2);
		Result=true;
		return Result;
	} else
	{
		if (Att1.Chk==1) TOEmpty_Create(Out_Prm1,Att1);
		if (Att2.Chk==1) TOEmpty_Create(Out_Prm2,Att2);
		Result=true;
		return Result;
	}

	return Result;
} // EExecP4

function EExecRC(out_prm1,in_prm1,in_prm2,in_prm3,Att_1,Sg1,Sg2,Sg3)
{
 	if ((in_prm1.OB==undefined) || (in_prm2.OB==undefined) || (in_prm3.OB==undefined)) return false;

	Result=true;
	var o1=new Object();
	var o2=new Object();
	var d1=new Object();
	var d2=new Object();
	var d3=new Object();

	CreateCopy(d1,in_prm1);
	CreateCopy(d2,in_prm2);
	CreateCopy(d3,in_prm3);


	if ((d1.OB=="O") && (d2.OB=="O") && (d3.OB=="O"))
	{
		if (Att_1.Chk==1) TOEmpty_Create(out_prm1,Att_1);
	}

	if ((d1.OB=="O") && (d2.OB=="O"))
	{
		EExecP2(out_prm1,d1,d2,Att_1,1,1);
		return true;
	}

	if ((d1.OB=="O") && (d3.OB=="O"))
	{
		EExecP2(out_prm1,d1,d3,Att_1,1,1);
		return true;
	}

	if ((d2.OB=="O") && (d3.OB=="O"))
	{
		EExecP2(out_prm1,d2,d3,Att_1,1,1);
		return true;
	}

	if ((d1=="O") && (d2.OB=="D") && (d3.OB=="D"))
	{
		EExecRA(o2,d2,d3,Att5,1*Sg2,1*Sg3);
		EExecP2(out_prm1,o2,d1,Att_1,1,1)
		return true;
	}

	if ((d1.OB=="D") && (d2.OB=="O") && (d3.OB=="D"))
	{
		EExecRA(o2,d1,d3,Att5,1*Sg2,1*Sg3);
		EExecP2(out_prm1,o2,d2,Att_1,1,1);
		return true;
	}

	if ((d1.OB=="D") && (d2.OB=="D") && (d3.OB=="O"))
	{
		EExecRA(o2,d1,d2,Att5,1*Sg2,1*Sg3);
		EExecP2(out_prm1,o2,d3,Att_1,1,1);
		return true;
	}

	if (((d1.OB=="D") || (d1.OB=="P") || (d1.OB=="O")) &&
	((d2.OB=="D") || (d2.OB=="P") || (d2.OB=="O" )) &&
	((d3.OB=="D") || (d3.OB=="P") || (d3.OB=="O" )))
	{
		EExecRA(o2,d2,d3,Att5,1*Sg2,1*Sg3);
		if (!(d2.OB=="O"))
		{
			EExecRA(o1,d1,d2,Att5,1*Sg1,1*Sg2);
		}
		else
		{
			EExecRA(o1,d1,d3,Att5,1*Sg1,1*Sg2);
		}
		EExecP2(out_prm1,o1,o2,Att0,1,1) ;
		return true;
	};

} // EExecRC

function EExecRA(out_prm1,in_prm1,in_prm2,Att_RAxe,Sg1,Sg2)
{
	if ((in_prm1.OB==undefined) || (in_prm2.OB==undefined)) return false;
	
	var rect={C:{Re:90,Im:0},OB:"C"};
	var nol={C:{Re:0,Im:0},OB:"C"};
	if ((in_prm1.OB=="O") && !(in_prm2.OB=="O"))
	{
		CreateCopy(out_prm1,in_prm1);
		out_prm1.FAtt=CopyAtt(Att5);
		Result=true;
		return Result;
	}

	if ((in_prm2.OB=="O") && !(in_prm1.OB=="O")) 
	{
		CreateCopy(out_prm1,in_prm2);
		out_prm1.FAtt=CopyAtt(Att5);
		Result=true;
		return Result;
	}

	if ((in_prm1.OB=="P") && (in_prm2.OB=="P")) 
	{

		var p1=new Object();
		var p2=new Object();
		var o1=new Object();
		var p3=new Object();

		CreateCopy(p1,in_prm1);
		p1.FAtt=CopyAtt(in_Prm1.FAtt);

		CreateCopy(p2,in_prm2);
		p2.FAtt=CopyAtt(in_Prm2.FAtt);

		EExecO0(o1,p2,p1,Att5,1*Sg2,1*Sg1);
		EExecPA(p3,o1,Att5,1) 
		EExecO5(out_prm1,o1,p3,rect,att_RAxe,1,1,1);

		Result=true;
		return Result;
	}

	if ((in_prm1.OB=="D") && (in_prm2.OB=="P"))
	{
		var d1=new Object();
		var p1=new Object();
		var d2=new Object();
		var p3=new Object();
		var p4=new Object();

		CreateCopy(d1,in_prm1);
		d1.FAtt=CopyAtt(in_prm1.FAtt);

		CreateCopy(p1,in_prm2);
		p1.FAtt=CopyAtt(in_prm2.FAtt);

		EExecD0(d2,p1,nol,Att5,1,1);
		EExecP3(p3,p4,d1,d2,Att5,Att5,1,1);
		EExecO0(out_prm1,p3,p4,att_RAxe,1*Sg2,1);

		Result=true;
		return Result;
    }

	if ((in_prm2.OB=="D") && (in_prm1.OB=="P"))
	{

		var d1=new Object();
		var p1=new Object();
		var d2=new Object();
		var p3=new Object();
		var p4=new Object();
		
		CreateCopy(d1,in_prm2);
		d1.FAtt=CopyAtt(in_prm2.FAtt);

		CreateCopy(p1,in_prm1);
		p1.FAtt=CopyAtt(in_prm1.FAtt);

		EExecD0(d2,p1,nol,Att5,1,1);
		EExecP3(p3,p4,d1,d2,Att5,Att5,1,1);
		EExecO0(out_prm1,p3,p4,att_RAxe,1*Sg2,1);

		Result=true;
		return Result;
	}

    if ((in_prm2.OB=="D") && (in_prm1.OB=="D"))
    {
		var d1=new Object();
		var d2=new Object();
		var p1=new Object();
		var p2=new Object();
		var o1=new Object();
		
		
		CreateCopy(d1,in_prm1);
		d1.FAtt=CopyAtt(in_prm1.FAtt);

		CreateCopy(d2,in_prm2);
		d2.FAtt=CopyAtt(in_prm2.FAtt);

		EExecP3(p1,p2,d1,d2,Att5,Att5,1,1);
		EExecO0(o1,p1,p2,Att5,1*Sg2,1);
		if (IsNull(o1))
		{
			var p3=new Object();
			var p5=new Object();
			var o2=new Object();
			var o1=new Object();

			EExecPA(p3,d1,Att5,1*Sg1);
			EExecPA(p5,d2,Att5,1*Sg2);
			EExecO0(o2,p3,p5,Att5,1,1);
			EExecO5(o1,o2,p1,rect,Att5,1,1,1);
		}
		CreateCopy(out_prm1,o1);
		out_prm1.FAtt=CopyAtt(Att5);

		Result=true;
		return Result;
	}

} // EExecRA

function EExecOK001(out_prm1,in_prm1,in_prm2,in_prm3,Att_1,Sg1,Sg2,Sg3)
{
	if ((in_prm1.OB==undefined) || (in_prm2.OB==undefined) || (in_prm3.OB==undefined)) return false;
	var d1=new Object();
	var d2=new Object();
	var d3=new Object();
	var p1=new Object();
	var p11=new Object();
	var o2=new Object();
	var o3=new Object();
	var o4=new Object();
	var p2=new Object();
	var p3=new Object();
	var p4=new Object();
	var o5=new Object();
	var d5=new Object();
	var d4=new Object();
	
	var Chisl1={C:{Re:0,Im:0},OB:"C"};
	var Chisl2={C:{Re:0.5,Im:0},OB:"C"};
	var Chisl3={C:{Re:1,Im:0},OB:"C"};
	var Chisl90={C:{Re:90,Im:0},OB:"C"};

	CreateCopy(d1,in_prm1);
	d1.FAtt=CopyAtt(in_prm1.FAtt);

	CreateCopy(d2,in_prm2);
	d2.FAtt=CopyAtt(in_prm2.FAtt);

	CreateCopy(d3,in_prm3);
	d3.FAtt=CopyAtt(in_prm3.FAtt);
	
    EExecRC(p1,d1,d2,d3,Att5,1,1,1);


    if ((p1.OB=="P") && (IsSobstv(p1)))
    {
		if ((d1.OB=="D") || (d1.OB=="P")) {EExecP4(o3,p2,p1,d1,Att5,Att5,1,1)} else
		if (d2.OB=="D") {EExecP4(o3,p2,p1,d2,Att5,Att5,1,1)} else
		if (d3.OB=="D") {EExecP4(o3,p2,p1,d3,Att5,Att5,1,1)}
		EExecD1(d4,p1,p2,Att0,1,1);
	} else
	{
		if ((d1.OB=="P") && (d2.OB=="P"))
		{
			EExecO0(o3,d1,d2,Att5,1,1);
			EExecP9(p11,o3,Chisl1,Att5,1,1);
			EExecP9(p2,o3,Chisl2,Att5,1,1);
			EExecP9(p3,o3,Chisl3,Att5,1,1);
			EExecO5(o2,o3,p2,Chisl90,Att5,1,1,1);
			EExecDN(d5,p11,p3,Att5,1,1);
			EExecOK001(d4,o2,d5,d3,Att5,1,1,1);
			Result=true;
			return Result;
		}

		if ((d2.OB=="P") && (d3.OB=="P")) 
		{
			EExecO0(o3,d2,d3,Att5,1,1);
			EExecP9(p11,o3,Chisl1,Att5,1,1);
			EExecP9(p2,o3,Chisl2,Att5,1,1);
			EExecP9(p3,o3,Chisl3,Att5,1,1);
			EExecO5(o2,o3,p2,Chisl90,Att5,1,1,1);
			EExecDN(d5,p11,p3,Att5,1,1);
			EExecOK001(d4,o2,d5,d1,Att5,1,1,1);
			Result=true;
			return Result;
		}

		if ((d1.OB=="P" ) && (d3.OB=="P")) 
		{
			EExecO0(o3,d1,d3,Att5,1,1);
			EExecP9(p11,o3,Chisl1,Att5,1,1);
			EExecP9(p2,o3,Chisl2,Att5,1,1);
			EExecP9(p3,o3,Chisl3,Att5,1,1);
			EExecO5(o2,o3,p2,Chisl90,Att5,1,1,1);
			EExecDN(d5,p11,p3,Att5,1,1);
			EExecOK001(d4,o2,d5,d2,Att5,1,1,1);
			Result=true;
			return Result;
		}

		EExecP4(o3,p2,p1,d1,Att5,Att5,1,1);
		EExecP4(o4,p3,p1,d2,Att5,Att5,1,1);
		EExecP4(o5,p4,p1,d3,Att5,Att5,1,1);
		EExecO000(d4,p2,p3,p4,Att5,1,1,1);
	
    }
	CreateCopy(out_prm1,d4);
	out_prm1.FAtt=CopyAtt(Att_1);

	Result=true;
	return Result;


} // EExecOK001

function EExecZXC(out_prm1,in_prm1,in_prm2,in_prm3,Att_1,Sg1,Sg2,Sg3)
{
	if ((in_prm1.OB==undefined) || (in_prm2.OB==undefined) || (in_prm3.OB==undefined)) return false;

	var Chisl1={C:{Re:73.600272,Im:0},OB:"C"};

    Result=true;

	CreateCopy(p1,in_prm1);
	p1.FAtt=CopyAtt(in_prm1.FAtt);

	CreateCopy(p2,in_prm2);
	p2.FAtt=CopyAtt(in_prm2.FAtt);

	CreateCopy(p3,in_prm3);
	p3.FAtt=CopyAtt(in_prm3.FAtt);

	EExecD0(d1,p1,Chisl1,Att0,1*Sg1,1);
	EExecD0(d2,p2,d1,Att0,1*Sg2,1);
	EExecRA(o1,d1,d2,Att5,1,1);
	EExecD0(d3,p3,d2,Att0,1*Sg3,1);
	EExecRA(o2,d3,d2,Att5,1,1);
	EExecP2(p4,o1,o2,Att0,1,1);
	EExecC2(c1,p4,p1,Att0,1,1*Sg1);
	EExecD0(d4,p4,c1,Att0,1,1);

	CreateCopy(out_prm1,d4);
	out_prm1.FAtt=CopyAtt(Att_1);

	Result=true;
	return Result;
} // EExecZXC

function Complex3(Out_Prm,X,Y,Z)
{
	var Chisl2={C:{Re:0.5,Im:0},OB:"C"};
	var Chisl90={C:{Re:90,Im:0},OB:"C"};

	B1=(X.OB=="P") && (Y.OB=="P") && (Z.OB=="P");
	B2=((Math.abs(X.X.Im)>Eps) || (Math.abs(X.Y.Im)>Eps)) &&
	((Math.Abs(Y.X.Im)>Eps) || (Math.abs(Y.Y.Im)>Eps)) &&
	((Math.abs(Z.X.Im)>Eps) || (Math.abs(Z.Y.Im)>Eps));
	B3=(Math.abs(X.X.Im+Y.X.Im)<Eps) && (Math.abs(X.Y.Im+Y.Y.Im)<Eps);
	B4=(Math.abs(X.X.Im+Z.X.Im)>=Eps) || (Math.abs(X.Y.Im+Z.Y.Im)>=Eps);
	B5=(Math.abs(Y.X.Im+Z.X.Im)>=Eps) || (Math.abs(Y.Y.Im+Z.Y.Im)>=Eps);

	B=B1 && B2 && B3 && B4 & B5;
	Result=false;
	if (B) then
	{	
		var d1=new Object();
		var o1=new Object();
		var p2=new Object();
		var o2=new Object();
		var p1=new Object();
		var o3=new Object();
		var p3=new Object();
		var o4=new Object();
		var p5=new Object();
		var c1=new Object();
		var d1=new Object();

		EExecO0(o1,X,Y,Att0,1,1);
		EExecP9(p2,o1,Chisl2,Att5,1,1);
		EExecO5(o2,o1,p2,Chisl90,Att5,1,1,1);
		EExecPR(p1,Z,Att5,1);
		EExecO0(o3,p1,Z,Att5,1,1);
		EExecP9(p3,o3,Chisl2,Att5,1,1);
		EExecO5(o4,o3,p3,Chisl90,Att5,1,1,1);

		EExecP2(p5,o2,o4,Att5,1,1);
		EExecC2(c1,Z,p5,Att5,1,1);
		EExecD0(d1,p5,c1,Att5,1,1);

		CreateCopy(Out_Prm,d1);
		Out_Prm.FAtt=CopyAtt(Att);

		Result=true;
		AddInc(Out_Prm,Z);
	}
} // Complex3


function EExecD4(Out_Prm,X,Y,Z,Att,Sg1,Sg2,Sg3)
{
//     {if Att.LV in [drw_Limited,drw_Opposite] then Att.LVdrw_UnLimited;}

	if ((X.OB==undefined) || (Y.OB==undefined) || (Z.OB==undefined)) return false;
	var Chisl1={C:{Re:0,Im:0},OB:"C"};
	var Chisl2={C:{Re:0.5,Im:0},OB:"C"};
	var Chisl3={C:{Re:1,Im:0},OB:"C"};
	var Chisl90={C:{Re:90,Im:0},OB:"C"};
	var o1=new Object();
	var p1=new Object();
	var p2=new Object();
	var p3=new Object();
	var o2=new Object();
	var d1=new Object();
	var d2=new Object();

	if ((X.OB=="P") && (Y.OB=="P") && (Z.OB=="P") &&
	(((Math.abs(X.X.Im)>Eps) || (Math.abs(X.Y.Im)>Eps)) ||
	((Math.abs(Y.X.Im)>Eps) || (Math.abs(Y.Y.Im)>Eps)) ||
	((Math.abs(Z.X.Im)>Eps) || (Math.abs(Z.Y.Im)>Eps)))) 
	{
		Result=EExecZXC(X,Y,Z,Out_Prm,Att,Sg1,Sg2,Sg3);
		return Result;
	};

	if ((X.OB=="P") && (Y.OB=="P") && (Z.OB=="P") &&
	((Math.abs(X.X.Im)>Eps) || (Math.abs(X.Y.Im)>Eps)) &&
	((Math.abs(Y.X.Im)>Eps) || (Math.abs(Y.Y.Im)>Eps)) &&
	((Math.abs(Z.X.Im)<Eps) || (Math.abs(Z.Y.Im)<Eps))) 
	{
		EExecO0(o1,X,Y,Att0,1,1);
		EExecP9(p1,o1,Chisl1,Att5,1,1);
		EExecP9(p2,o1,Chisl2,Att5,1,1);
		EExecP9(p3,o1,Chisl3,Att5,1,1);
		EExecO5(o2,o1,p2,Chisl90,Att5,1,1,1);
		EExecDN(d1,p1,p3,Att5,1,1);
		EExecOK001(d2,Z,d1,o2,Att5,1,1,1);

		CreateCopy(Out_Prm,d2);
		Out_Prm.FAtt=CopyAtt(Att);

		AddInc(Out_Prm,Z);
		
		Result=true;
		return Result;
	}

	if ((X.OB=="P") && (Y.OB=="P") && (Z.OB=="P") &&
	((Math.abs(Y.X.Im)>Eps) || (Math.abs(Y.Y.Im)>Eps)) &&
	((Math.abs(Z.X.Im)>Eps) || (Math.abs(Z.Y.Im)>Eps)) &&
	((Math.abs(X.X.Im)<Eps) || (Math.abs(X.Y.Im)<Eps))) 
	{
		EExecO0(o1,Y,Z,Att0,1,1);
		EExecP9(p1,o1,Chisl1,Att5,1,1);
		EExecP9(p2,o1,Chisl2,Att5,1,1);
		EExecP9(p3,o1,Chisl3,Att5,1,1);
		EExecO5(o2,o1,p2,Chisl90,Att5,1,1,1);
		EExecDN(d1,p1,p3,Att5,1,1);
		EExecOK001(d2,X,d1,o2,Att5,1,1,1);

		CreateCopy(Out_Prm,d2);
		Out_Prm.FAtt=CopyAtt(Att);

		AddInc(Out_Prm,X);
		Result=true;

		return Result;
	}

	if ((X.OB=="P") && (Y.OB=="P") && (Z.OB=="P") &&
	((Math.abs(X.X.Im)>Eps) || (Math.abs(X.Y.Im)>Eps)) &&
	((Math.abs(Z.X.Im)>Eps) || (Math.abs(Z.Y.Im)>Eps)) &&
	((Math.abs(Y.X.Im)<Eps) || (Math.abs(Y.Y.Im)<Eps))) 
	{
		EExecO0(o1,X,Z,Att0,1,1);
		EExecP9(p1,o1,Chisl1,Att5,1,1);
		EExecP9(p2,o1,Chisl2,Att5,1,1);
		EExecP9(p3,o1,Chisl3,Att5,1,1);
		EExecO5(o2,o1,p2,Chisl90,Att5,1,1,1);
		EExecDN(d1,p1,p3,Att5,1,1);
		EExecOK001(d2,Y,d1,o2,Att5,1,1,1);

		CreateCopy(Out_Prm,d2);
		Out_Prm.FAtt=CopyAtt(Att);

		AddInc(Out_Prm,Y);

		Result=true;
		return Result;
	}

//	if (Complex3(Out_Prm,X,Y,Z)) { Result=true; return Result }
//	if (Complex3(Out_Prm,X,Z,Y)) { Result=true; return Result }
//	if (Complex3(Out_Prm,Y,Z,X)) { Result=true; return Result }


	if ((X.OB=="P") && (Y.OB=="P") && (Z.OB=="P") &&
	(IsSobstv(X)) && (IsSobstv(Y)) && (IsSobstv(Z)) &&
	(IsReal(X)) && (IsReal(Y)) && (IsReal(Z))) 
	{
		Xa=X.X.Re; Ya=X.Y.Re;
		Xb=Y.X.Re; Yb=Y.Y.Re;
		Xd=Z.X.Re; Yd=Z.Y.Re;

		Dist=Math.sqrt(Sqr(Xa-Xd)+Sqr(Ya-Yd));

		Pq=(Sqr(Xa)-Sqr(Xb)+Sqr(Ya)-Sqr(Yb))/2;
		Q=(Sqr(Xa)-Sqr(Xd)+Sqr(Ya)-Sqr(Yd))/2;
		D=(Xa-Xb)*(Ya-Yd)-(Xa-Xd)*(Ya-Yb);
		R=0;

		if (Math.abs(Dist/D)<1E10) 
		{
			A=(Pq*(Ya-Yd)-Q*(Ya-Yb))/D;
			B=(Q*(Xa-Xb)-Pq*(Xa-Xd))/D;
			Xc=A;
			Yc=B;
			R=Math.sqrt(Sqr(Xa-A)+Sqr(Ya-B))*Math.sign(Diskr(Xd,Yd,1,Xa,Ya,1,Xb,Yb,1));
			TODuga_Create(Out_Prm,MCompl(Xc,0),MCompl(Yc,0),MCompl(R,0),Xa,Ya,Xd,Yd,Att);
			Result=true;
			AddInc(Out_Prm,X);
			AddInc(Out_Prm,Y);
            AddInc(Out_Prm,Z);

		} else
		{
			TOLine_Create(Out_Prm,X.X,X.Y,1,Y.X,Y.Y,1,brn_UnLimited,"sobstv",Att);

			Result=true;
			AddInc(Out_Prm,X);
			AddInc(Out_Prm,Y);
			AddInc(Out_Prm,Z);
		}

	} else if (Att.Chk==1) TOEmpty_Create(Out_Prm,Att);
	
	Result=true;
	return Result;
} // EExecD4



function Ugol(O,X11,Y11,X22,Y22,X3,Y3)
{
	if (O.R.Re>0) return (Diskr(X11,Y11,1,X3,Y3,1,X22,Y22,1)>=0);
	if (O.R.Re<0) return (-Diskr(X11,Y11,1,X3,Y3,1,X22,Y22,1)>=0);
} // Ugol

function ProcDuga(O,Xt,Yt)
{
	var X11={Re:undefined, Im:undefined}
	var Y11={Re:undefined, Im:undefined}
	var X22={Re:undefined, Im:undefined}
	var Y22={Re:undefined, Im:undefined}
	var Result=false;
	var CmpOut=false;

	if ((Math.abs(O.Xc.Re-Xt)<Eps) && (Math.abs(O.Yc.Re-Yt)<Eps)) return Result;
	var X=new Object();

	TOLine_Create(X,O.Xc,O.Yc,1,MCompl(Xt,0),MCompl(Yt,0),1,brn_UnLimited,"sobstv",Att5);

	P=CalcP6(CmpOut,X,O);

	X11=P.X1;
	Y11=P.Y1;
	X22=P.X2;
	Y22=P.Y2;

	U1=Math.sqrt(Sqr(X11.Re-Xt)+Sqr(Y11.Re-Yt));
	U2=Math.sqrt(Sqr(X22.Re-Xt)+Sqr(Y22.Re-Yt));

	return ((U1<5) || (U2<5));
}

function PointBelongs(O,X,Y)
{
	var Xa={Re:undefined, Im:undefined}
	var Ya={Re:undefined, Im:undefined}

	Result=false;
	if (O.OB=="O")
	{
		if (O.Null) 
		{
			if ((Math.abs(O.X1.Re-X)<Eps) && (Math.abs(O.X2.Re-Y)<Eps)) return true;
		}

		if (!IsReal(O)) return true;

		switch (O.FAtt.Lv) 
		{
			case drw_Limited:
			switch (O.draw_AsBorned) 
				{
				case brn_Limited:
					var G=Math.abs(Math.sqrt(Sqr(O.X1.Re-O.X2.Re)+Sqr(O.Y1.Re-O.Y2.Re))-Math.sqrt(Sqr(O.X1.Re-X)+Sqr(O.Y1.Re-Y))-Math.sqrt(Sqr(O.X2.Re-X)+Sqr(O.Y2.Re-Y)))
					var B=G<Eps
					return B;
					break;
				
				case brn_HalfLimited:
				case brn_UnLimited: return true;
				break;
				}
			break;
			
			case drw_UnLimited: return true;
			break;			
			
			case drw_Incidented:
			case drw_ShortIncidented:
			{
				U=CalcPF(MCompl(X,0),MCompl(Y,0),O);
				Xa=U.A;
				Ya=U.B;
				B=(Math.abs(Xa.Re-X)<Eps) && (Math.abs(Ya.Re-Y)<Eps)
				return B;
			}
			break;		

			case drw_Opposite:
			switch (O.draw_AsBorned) 
			{
				case brn_Limited:
					if (!(Math.abs(Math.sqrt(Sqr(O.X1.Re-O.X2.Re)+Sqr(O.Y1.Re-O.Y2.Re))-
					Math.sqrt(Sqr(O.X1.Re-X)+Sqr(O.Y1.Re-Y))-
					Math.sqrt(Sqr(O.X2.Re-X)+Sqr(O.Y2.Re-Y)))<Eps)) return true;
					break;
			}
			break;	

			case drw_Plus:
			switch (O.draw_AsBorned) 
			{
				case brn_Limited:
				case brn_HalfLimited:
				{
                    if (Math.abs(O.X2.Re-O.X1.Re)>Eps) if ((X-O.X1.Re)/(O.X2.Re-O.X1.Re)>=0) return true;
                    if (Math.abs(O.Y2.Re-O.Y1.Re)>Eps) if ((Y-O.Y1.Re)/(O.Y2.Re-O.Y1.Re)>=0) return true;
				}
				break;
			}
			break;
			
			case drw_Minus:
			switch (O.draw_AsBorned) 
			{
				case brn_Limited:
				case brn_HalfLimited:
				{
                    if (Math.abs(O.X2.Re-O.X1.Re)>0) if ((X-O.X1.Re)/(O.X2.Re-O.X1.Re)<=0) return true;
                    if (Math.abs(O.Y2.Re-O.Y1.Re)>0) if ((Y-O.Y1.Re)/(O.Y2.Re-O.Y1.Re)<=0) return true;
				}
				break;
			}
			break;
			
			case drw_Empty: return false;
			break;			
			
		}
		
	}
	if (O.OB=="D")
	{
		Result=false;

		switch (O.Vid)
		{	
			case circ_full:
			case drw_Incidented:
			case drw_ShortIncidented: 
			{
				B=ProcDuga(O,X,Y);
				if (B) return true;
				break;
			}

			case drw_Limited:
			{
				B=ProcDuga(O,X,Y);
				if (B) 
				if (Ugol(O,O.X1,O.Y1,O.X2,O.Y2,X,Y)) return true;
				break;
				
			}

			case drw_Opposite:
			{
				B=ProcDuga(O,X,Y);
				if (B)
				if (Ugol(O,O.X2,O.Y2,O.X1,O.Y1,X,Y)) return true;
				break;
			}

			case drw_Empty: return false;
		}

		if (Math.sqrt(Sqr(O.X1-X)+Sqr(O.Y1-Y))<Eps) return true;
		if (Math.sqrt(Sqr(O.X2-X)+Sqr(O.Y2-Y))<Eps) return true;

	}
	return Result;
} // PointBelongs


function EExecP8(OOO1,OOO2,X,Y,Att1,Att2,Sg1,Sg2)
{
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
    var X1={Re:undefined, Im:undefined}
    var Y1={Re:undefined, Im:undefined}
    var X2={Re:undefined, Im:undefined}
    var Y2={Re:undefined, Im:undefined}

	Result=false;
	CmpOut=true;
	
	var B=!IsNull(X);
     
	if ((X.OB=="O") && (Y.OB=="D") && (X.Vid=="sobstv") && B)
	{
		X1=X.X1;
		Y1=X.Y1;
		X2=X.X2;
		Y2=X.Y2;
		Xb=X1.Re;
		Yb=Y1.Re;
		Xe=X2.Re;
		Ye=Y2.Re;
		
		P=CalcP6(X,Y);
		X1=P.X1;
		Y1=P.Y1;
		X2=P.X2;
		Y2=P.Y2;
		Prizn=(P.X1==undefined);

		if (Prizn) if (!CMPOut) 

		{
			if (Att1.Chk==1) TOEmpty_Create(OOO1,Att1);
			if (Att2.Chk==1) TOEmpty_Create(OOO2,Att2);
			Result=true;
			return Result;
		}

		if ((PointBelongs(X,X1.Re,Y1.Re) && PointBelongs(Y,X1.Re,Y1.Re))) {Def1=true} else {Def1=false}
		if ((PointBelongs(X,X2.Re,Y2.Re) && PointBelongs(Y,X2.Re,Y2.Re))) {Def2=true} else {Def2=false}
		if (((Math.abs(X1.Re-X.X1.Re)<Eps) && (Math.abs(Y1.Re-X.Y1.Re)<Eps) &&
		(Math.abs(X1.Im-X.X1.Im)<Eps) && (Math.abs(Y1.Im-X.Y1.Im)<Eps))) 
		{
			if (Def1)  
			{
				TOPoint_Create(OOO1,X1,Y1,1,Att1);
				if (Def1) AddInc(X,OOO1);
			}
			if (Def2)  
			{
				TOPoint_Create(OOO2,X2,Y2,1,Att2);
				if (Def2) AddInc(X,OOO2);
			}
			Result=true;
		} else
		{
			if (Def1) 
			{
				TOPoint_Create(OOO2,X1,Y1,1,Att2);
				if (Def1) AddInc(X,OOO2);
			}
			if (Def2) 
			{
				TOPoint_Create(OOO1,X2,Y2,1,Att1);
				if (Def2) AddInc(X,OOO1);
			}
			Result=true;
		}
	} else
	{
		if (Att1.Chk==1) TOEmpty_Create(OOO1,Att1);
		if (Att2.Chk==1) TOEmpty_Create(OOO2,Att2);
		Result=true;
	}
	return Result;

} // EExecP8 

function EExecAABD(out_prm1,in_prm1,in_prm2,Att_1,Sg1,Sg2)
{
	if ((in_prm1.OB==undefined) || (in_prm2.OB==undefined)) return false;
	
	Result=true;
	
	var d1=new Object();
	var p1=new Object();
	var p2=new Object();
	var o1=new Object();
	var d2=new Object();
	var p3=new Object();
	var p4=new Object();
	var o2=new Object();
	var p5=new Object();
	var d3=new Object();
	var p6=new Object();
	var p7=new Object();
    
	CreateCopy(d1,in_prm1);
	d1.FAtt=CopyAtt(in_prm1.FAtt);

	CreateCopy(p1,in_prm2);
	p1.FAtt=CopyAtt(in_prm2.FAtt);

	EExecPA(p2,d1,Att0,1*Sg1);
	EExecO0(o1,p2,p1,Att5,1,1*Sg2);
	EExecD1(d2,p1,p2,Att0,1*Sg2,1);
	EExecP3(p3,p4,d2,d1,Att0,Att0,1,1*Sg1);
	EExecO0(o2,p4,p3,Att5,1,1);
	EExecP2(p5,o2,o1,Att0,1,1);
	EExecD1(d3,p5,p2,Att0,1,1);
	EExecP8(p6,p7,o1,d3,Att0,Att0,1,1);

	CreateCopy(out_prm1,p7);
	out_prm1.FAtt=CopyAtt(Att_1);
	
	return Result;

} // EExecAABD

function Inversion(Out_Prm,Y,X)
{
	{
		if (Y.OB=="P")
		{
			if (X.OB=="D")
			EExecAABD(Out_Prm,X,Y,Y.FAtt,1,1);
		}
		
		if (Y.OB=="O")
		{
			var Chisl1={C:{Re:0.001,Im:0},OB:"C"};
			var Chisl2={C:{Re:0.5,Im:0},OB:"C"};
			var Chisl3={C:{Re:0.999,Im:0},OB:"C"};
			var Chisl4={C:{Re:0.25,Im:0},OB:"C"};
			var Chisl5={C:{Re:0.75,Im:0},OB:"C"};
			
			var p1=new Object();
			var p2=new Object();
			var p3=new Object();
			var p4=new Object();
			var p5=new Object();
			var POut1=new Object();
			var POut2=new Object();
			var POut3=new Object();
			var POut4=new Object();
			var POut5=new Object();
			
			EExecP9(p1,Y,Chisl1,Att5,1,1);
			EExecP9(p2,Y,Chisl2,Att5,1,1);
			EExecP9(p3,Y,Chisl3,Att5,1,1);
			EExecP9(p4,Y,Chisl4,Att5,1,1);
			EExecP9(p5,Y,Chisl5,Att5,1,1);

			EExecYI(POut1,X,p1,Att5,1,1);
			EExecYI(POut2,X,p2,Att5,1,1);
			EExecYI(POut3,X,p3,Att5,1,1);
			EExecYI(POut4,X,p4,Att5,1,1);
			EExecYI(POut5,X,p5,Att5,1,1);

			if (X.OB=="D") EExecD4(Out_Prm,POut1,POut2,POut3,Att5,1,1,1);
//			if (X.OB=="Y") EExecY0(OOO,POut1,POut2,POut3,POut4,POut5,Att5,1,1,1,1,1);
		}
		
		if (Y.OB=="D")
		{
			if ((Y.Vid==circ_full) || (Y.Vid==drw_Empty) || (Y.Vid==drw_Incidented))
			{
				if (X.OB=="D")
				{
					var Chisl1={C:{Re:0.01,Im:0},OB:"C"};
					var Chisl2={C:{Re:0.45,Im:0},OB:"C"};
					var Chisl3={C:{Re:0.2,Im:0},OB:"C"};
					var Chisl4={C:{Re:0.9,Im:0},OB:"C"};
					var Chisl5={C:{Re:0.75,Im:0},OB:"C"};
				}

				if (X.OB=="Y")
				{
					var Chisl1={C:{Re:0,Im:0},OB:"C"};
					var Chisl1={C:{Re:0,Im:0},OB:"C"};
					var Chisl2={C:{Re:0.2,Im:0},OB:"C"};
					var Chisl3={C:{Re:0.4,Im:0},OB:"C"};
					var Chisl4={C:{Re:0.6,Im:0},OB:"C"};
					var Chisl5={C:{Re:0.8,Im:0},OB:"C"};
				}

			} else
			{
				var Chisl1={C:{Re:0,Im:0},OB:"C"};
				var Chisl2={C:{Re:0.5,Im:0},OB:"C"};
				var Chisl3={C:{Re:1.0,Im:0},OB:"C"};
				var Chisl4={C:{Re:0.25,Im:0},OB:"C"};
				var Chisl5={C:{Re:0.75,Im:0},OB:"C"};
			}

			var p1=new Object();
			var p2=new Object();
			var p3=new Object();
			var p4=new Object();
			var p5=new Object();
			var POut1=new Object();
			var POut2=new Object();
			var POut3=new Object();
			var POut4=new Object();
			var POut5=new Object();
			
			EExecP9(p1,Y,Chisl1,Att5,1,1);
			EExecP9(p2,Y,Chisl2,Att5,1,1);
			EExecP9(p3,Y,Chisl3,Att5,1,1);
			EExecP9(p4,Y,Chisl4,Att5,1,1);
			EExecP9(p5,Y,Chisl5,Att5,1,1);

			EExecYI(POut1,X,p1,Att5,1,1);
			EExecYI(POut2,X,p2,Att5,1,1);
			EExecYI(POut3,X,p3,Att5,1,1);
			EExecYI(POut4,X,p4,Att5,1,1);
			EExecYI(POut5,X,p5,Att5,1,1);

			if (X.OB=="D")
			{
				if (Math.abs(Diskr(POut1.X.Re,POut1.Y.Re,1,POut2.X.Re,POut2.Y.Re,1,POut3.X.Re,POut3.Y.Re,1))<Eps) 
					{EExecO0(Out_Prm,POut1,POut2,Att5,1,1)} else
					{EExecD4(Out_Prm,POut1,POut2,POut3,Att5,1,1,1)};
			}

/*			
*/	
		}
	}

	if (X.OB=="Y")
	{
	}
}

function EExecYI(Out_Prm,X,Y,Att,Sg1,Sg2)
{    
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	Result=false;
	if ((X.OB=="D") || (X.OB=="Y"))
	{
/*
		if (Att.PT=8) and (Att.LV=8) and (Att.LT=6) then
		begin
			Att.RColor Y.OAtt.RColor;
			Att.GColor Y.OAtt.GColor;
			Att.BColor Y.OAtt.BColor;
		end;
		if Att.PT=8 then Att.PTY.OAtt.PT;
		if Att.LV=8 then Att.LVY.OAtt.LV;
		if Att.LT=6 then Att.LTY.OAtt.LT;
*/
		Inversion(Out_Prm,Y,X);
//		if (Att.Act) Out_Prm.FAtt=Att;
		Result=true;
		return Result;
	} else
	if (X.OB=="O") if (IsReal(X)) 
	{
/*		
		if Att.PT=8 then Att.PTY.OAtt.PT;
		if Att.LV=8 then Att.LVY.OAtt.LV;
		if Att.LT=6 then Att.LTY.OAtt.LT;
*/
		EExecUU(Out_Prm,X,Y,Att,Sg1,Sg2);
//		if (Att.Act) Out_Prm.FAtt=Att;
		if (!Result)
		{
			if (Att.Chk==1) TOEmpty_Create(Out_Prm,Att);
			Result=true;
			return Result;
		}
	} else
	{
		if (Att.Chk==1) TOEmpty_Create(Out_Prm,Att);
		Result=true;
	}
	return Result;
} // EExecYI

function AxeSimmet(Out_Prm,Y,XX,Sg,Att)
{
    var C={Re:undefined, Im:undefined}
    var D={Re:undefined, Im:undefined}
    var E={Re:undefined, Im:undefined}
    var F={Re:undefined, Im:undefined}
    var G={Re:undefined, Im:undefined}
    var H={Re:undefined, Im:undefined}
    var A={Re:undefined, Im:undefined}
    var B={Re:undefined, Im:undefined}
    var AX1={Re:undefined, Im:undefined}
    var AX2={Re:undefined, Im:undefined}
    var AY1={Re:undefined, Im:undefined}
    var AY2={Re:undefined, Im:undefined}
    var AXc={Re:undefined, Im:undefined}
    var AYc={Re:undefined, Im:undefined}
	
	if (Y.OB=="P")
	{
		if (IsSobstv(Y))
		{
			//if IsReal then
			{
				C=Y.X;
				D=Y.Y;
				U=CalcPF(C,D,XX);
				A=U.A;
				B=U.B;
				C=CompSum(C,CompMul(MCompl(2,0),CompSub(A,C)));
				D=CompSum(D,CompMul(MCompl(2,0),CompSub(B,D)));
				TOPoint_Create(Out_Prm,C,D,Y.W,Att);
			}
		} else
		TOPoint_Create(Out_Prm,Y.X,Y.Y,Y.W,Att);
	}

	if (Y.OB=="O")
	{
		if (IsSobstv(Y)) 
		{
			if (IsReal(Y))
			{
				U=CalcPF(Y.X1,Y.Y1,XX);
				C=U.A;
				D=U.B;
				U=CalcPF(Y.X2,Y.Y2,XX);
				E=U.A;
				F=U.B;
				
				C=CompSum(Y.X1,CompMul(MCompl(2,0),CompSub(C,Y.X1)));
				D=CompSum(Y.Y1,CompMul(MCompl(2,0),CompSub(D,Y.Y1)));
				E=CompSum(Y.X2,CompMul(MCompl(2,0),CompSub(E,Y.X2)));
				F=CompSum(Y.Y2,CompMul(MCompl(2,0),CompSub(F,Y.Y2)));

				if (Sg>0) {TOLine_Create(Out_Prm,C,D,1,E,F,1,Y.draw_AsBorned,"sobstv",Att)} else
					{TOLine_Create(Out_Prm,E,F,1,C,D,1,Y.draw_AsBorned,"sobstv",Att)}
					
			}
		} else TOLine_Create(Out_Prm,MCompl(0,0),MCompl(1,0),1,MCompl(1,0),MCompl(0,0),1,brn_Limited,"nesobstv",Att5);
	}
	
	if (Y.OB=="D")
	{
		AXc=Y.Xc;
		AYc=Y.Yc;
		AX1=MCompl(Y.X1,0);
		AY1=MCompl(Y.Y1,0);
		AX2=MCompl(Y.X2,0);
		AY2=MCompl(Y.Y2,0);
		U=CalcPF(AXc,AYc,XX);
		C=U.A;
		D=U.B;
		U=CalcPF(AX1,AY1,XX);
		E=U.A;
		F=U.B;
		U=CalcPF(AX2,AY2,XX);
		G=U.A;
		H=U.B;
		
		C=CompSum(AXc,CompMul(MCompl(2,0),CompSub(C,AXc)));
		D=CompSum(AYc,CompMul(MCompl(2,0),CompSub(D,AYc)));
		E=CompSum(AX1,CompMul(MCompl(2,0),CompSub(E,AX1)));
		F=CompSum(AY1,CompMul(MCompl(2,0),CompSub(F,AY1)));
		G=CompSum(AX2,CompMul(MCompl(2,0),CompSub(G,AX2)));
		H=CompSum(AY2,CompMul(MCompl(2,0),CompSub(H,AY2)));
		TODuga_Create(Out_Prm,C,D,MCompl(-Y.R.Re*Sg,0),E.Re,F.Re,G.Re,H.Re,Y.FAtt);
	}
//	TOEmpty_Create(Out_Prm,Att);
	
} // AxeSimmet

    
function EExecUU(Out_Prm,X,Y,Att,Sg1,Sg2)
{     
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	if (Att.Pt==8) Att.Pt=Y.FAtt.Pt;
	if (Att.Lv==8) Att.Lv=Y.FAtt.Lv;
	if (Att.Lt==6) Att.Lt=Y.FAtt.Lt;

	if (X.OB=="O") 
	{
		if (IsSobstv(X)) 
		{
			AxeSimmet(Out_Prm,Y,X,Sg2,Att);
			Result=true;
		
			if (Result=false)
			{
				if (Att.Chk==1) TOEmpty_Create(Out_Prm,Att);
				Result=true;
				return Result;
			}
		} else
		{
			if (Att.Chk==1) TOEmpty_Create(Out_Prm,Att);
			Result=true;
			return Result;
		}			
	}
	return true;
} // EExecUU

function CentrSimmet(Out_Prm,Y,XX,Sg,Att)
{
    var Xa={Re:undefined, Im:undefined}
    var Ya={Re:undefined, Im:undefined}
    var Xb={Re:undefined, Im:undefined}
    var Yb={Re:undefined, Im:undefined}
    var C={Re:undefined, Im:undefined}
    var D={Re:undefined, Im:undefined}
    var E={Re:undefined, Im:undefined}
    var F={Re:undefined, Im:undefined}
    var G={Re:undefined, Im:undefined}
    var H={Re:undefined, Im:undefined}
    var A={Re:undefined, Im:undefined}
    var B={Re:undefined, Im:undefined}
    var AX1={Re:undefined, Im:undefined}
    var AX2={Re:undefined, Im:undefined}
    var AY1={Re:undefined, Im:undefined}
    var AY2={Re:undefined, Im:undefined}
    var AXc={Re:undefined, Im:undefined}
    var AYc={Re:undefined, Im:undefined}
	
	if (Y.OB=="P")
	{
		if (IsSobstv(Y))
		{
			//if IsReal then
			{
				C=Y.X;
				D=Y.Y;
				A=XX.X;
				B=XX.Y;
				C=CompSum(C,CompMul(MCompl(2,0),CompSub(A,C)));
				D=CompSum(D,CompMul(MCompl(2,0),CompSub(B,D)));
				TOPoint_Create(Out_Prm,C,D,Y.W,Att);
			}
		} else
		TOPoint_Create(Out_Prm,Y.X,Y.Y,Y.W,Att);
	}

	if (Y.OB=="O")
	{
		if (IsSobstv(Y)) 
		{
			if (IsReal(Y))
			{
				Xa=Y.X1.Re;
				Ya=Y.Y1.Re;
				Xb=Y.X2.Re;
				Yb=Y.Y2.Re;
				A=XX.X.Re;
				B=XX.Y.Re;
				C=Xa+2*(A-Xa);
				D=Ya+2*(B-Ya);
				E=Xb+2*(A-Xb);
				F=Yb+2*(B-Yb);

				TOLine_Create(Out_Prm,MCompl(C,0),MCompl(D,0),1,MCompl(E,0),MCompl(F,0),1,Y.draw_AsBorned,"sobstv",Att);
					
			}
		} else TOLine_Create(Out_Prm,MCompl(0,0),MCompl(1,0),1,MCompl(1,0),MCompl(0,0),1,brn_Limited,"nesobstv",Att5);
	}
	
	if (Y.OB=="D")
	{
		AXc=Y.Xc.Re;
		AYc=Y.Yc.Re;
		AX1=Y.X1;
		AY1=Y.Y1;
		AX2=Y.X2;
		AY2=Y.Y2;
		A=XX.X.Re;
		B=XX.Y.Re;
		C=AXc+2*(A-AXc);
		D=AYc+2*(B-AYc);
		E=AX1+2*(A-AX1);
		F=AY1+2*(B-AY1);
		G=AX2+2*(A-AX2);
		H=AY2+2*(B-AY2);		
		
		TODuga_Create(Out_Prm,MCompl(C,0),MCompl(D,0),MCompl(-Y.R.Re,0),G,H,E,F,Y.FAtt);
		
	}
	
} // CentrSimmet

function EExecUC(Out_Prm,X,Y,Att,Sg1,Sg2)
{     
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	if (Att.Pt==8) Att.Pt=Y.FAtt.Pt;
	if (Att.Lv==8) Att.Lv=Y.FAtt.Lv;
	if (Att.Lt==6) Att.Lt=Y.FAtt.Lt;

	if (X.OB=="P") 
	{
		if (IsSobstv(X)) 
		{
			CentrSimmet(Out_Prm,Y,X,Sg2,Att);
			Result=true;
		
			if (Result=false)
			{
				if (Att.Chk==1) TOEmpty_Create(Out_Prm,Att);
				Result=true;
				return Result;
			}
		} else
		{
			if (Att.Chk==1) TOEmpty_Create(Out_Prm,Att);
			Result=true;
			return Result;
		}			
	}
	return true;
} // EExecUC

function EExecO3(Out_Prm1,Out_Prm2,Out_Prm3,X,Y,Att1,Att2,Att3,Sg1,Sg2)
{     
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;

    var X1={Re:undefined, Im:undefined}
    var Y1={Re:undefined, Im:undefined}
    var X2={Re:undefined, Im:undefined}
    var Y2={Re:undefined, Im:undefined}

	if ((X.OB=="D") && (Y.OB=="D"))
	{
		Xc1=X.Xc.Re; Yc1=X.Yc.Re; R1=X.R.Re;
		Xc2=Y.Xc.Re; Yc2=Y.Yc.Re; R2=Y.R.Re;
		Dx=Xc2-Xc1;
		Dy=Yc2-Yc1;
		
		R1=R1*Sg1;
		R2=R2*Sg2;
		D=Sqr(Dx)+Sqr(Dy);
		C=R1-R2;

		if (D<=0)
		{
			if (Att1.Chk==1) TOEmpty_Create(Out_Prm1,Att1);
			if (Att2.Chk==1) TOEmpty_Create(Out_Prm2,Att2);
			if (Att3.Chk==1) TOEmpty_Create(Out_Prm3,Att3);
			Result=true;
			return Result;
		}
		
		if (D-Sqr(C)<=0)
		{
			if (Att1.Chk==1) TOEmpty_Create(Out_Prm1,Att1);
			if (Att2.Chk==1) TOEmpty_Create(Out_Prm2,Att2);
			if (Att3.Chk==1) TOEmpty_Create(Out_Prm3,Att3);
			Result=true;
			return Result;
		}

		T=Math.sqrt(D-Sqr(C));
		C1=C*Dx+T*Dy;
		C2=C*Dy-T*Dx;
		X1.Re=Xc1+R1*C1/D; X1.Im=0;
		Y1.Re=Yc1+R1*C2/D; Y1.Im=0;
		X2.Re=Xc2+R2*C1/D; X2.Im=0;
		Y2.Re=Yc2+R2*C2/D; Y2.Im=0;
		
		TOLine_Create(Out_Prm1,X1,Y1,1,X2,Y2,1,brn_Limited,"sobstv",Att1);
		TOPoint_Create(Out_Prm2,X1,Y1,1,Att2);
		TOPoint_Create(Out_Prm3,X2,Y2,1,Att3);


		AddInc(Out_Prm1,Out_Prm2);
		AddInc(Out_Prm1,Out_Prm3);
		AddInc(X,Out_Prm2);
		AddInc(Y,Out_Prm3);

		Result=true;
		return Result;
    } else
    {
		if (Att1.Chk==1) TOEmpty_Create(Out_Prm1,Att1);
		if (Att2.Chk==1) TOEmpty_Create(Out_Prm2,Att2);
		if (Att3.Chk==1) TOEmpty_Create(Out_Prm3,Att3);
    }
    
	Result=true;
	return Result;

} // EExecO3



function CommonOOO(OOO,X,Y,Z,Att)
{
    var A={Re:undefined, Im:undefined}
    var B={Re:undefined, Im:undefined}
    var C={Re:undefined, Im:undefined}
    var D={Re:undefined, Im:undefined}
	
	if ((IsSobstv(X)) && (IsSobstv(Y)))
	{
		A=X.X;
		B=X.Y;
		C=Y.X;
		D=Y.Y;
		TOLine_Create(OOO,A,B,1,C,D,1,brn_Limited,"sobstv",Att);
		
		AddInc(OOO,X);
		AddInc(OOO,Y);
		AddInc(OOO,Z);

		Result=true;
		return Result;
	}


	if ((X.W==1) && (Y.W==0)) 
	{
		A=X.X;
		B=X.Y;
		Dl=Math.sqrt(Sqr(Y.X.Re)+Sqr(Y.Y.Re));
		if (Dl>0) 
		{
			S1=Y.Y.Re/Dl;
			C1=Y.X.Re/Dl;
		}
		Df=Fi(0,1,S1,C1);
		if (Df<0)  Df=2*Math.PI+Df;

		C.Re=X.X.Re+100*Math.cos(Df); C.Im=0;
		D.Re=X.Y.Re+100*Math.sin(Df); D.Im=0;

		if ((Math.abs(X.X.Im)>Eps) || (Math.abs(X.Y.Im)>Eps)) 
		{TOEmpty_Create(OOO,Att)} else
		{TOLine_Create(OOO,A,B,1,C,D,1,brn_HalfLimited,"sobstv",Att)};

		AddInc(OOO,X);
		AddInc(OOO,Y);
		AddInc(OOO,Z);

		Result=true;
		return Result;
	}

	if ((Y.W==1) && (X.W==0)) 
	{
		A=Y.X;
		B=Y.Y;
		Dl=Math.sqrt(Sqr(X.X.Re)+Sqr(X.Y.Re));
		if (Dl>0) 
		{
			S1=X.Y.Re/Dl;
			C1=X.X.Re/Dl;
		}

		Df=Fi(0,1,S1,C1);
		if (Df<0) Df=2*Math.PI+Df;

		C.Re=Y.X.Re+100*Math.cos(Df); C.Im=0;
		D.Re=Y.Y.Re+100*Math.sin(Df); D.Im=0;

		if ((Math.abs(Y.X.Im)>Eps) || (Math.abs(Y.Y.Im)>Eps)) 
		{TOEmpty_Create(OOO,Att)} else
		{TOLine_Create(OOO,A,B,1,C,D,1,brn_HalfLimited,"sobstv",Att)}

		AddInc(OOO,X);
		AddInc(OOO,Y);
		AddInc(OOO,Z);

		Result=true;
		return Result;
	}

	if ((X.W==0) && (Y.W==0)) 
	{
		A=X.X;
		A.Im=0;
		B=X.Y;
		B.Im=0;
		C=Y.X;
		C.Im=0;
		D=Y.Y;
		D.Im=0;
		TOLine_Create(OOO,A,B,0,C,D,0,brn_Limited,"nesobstv",Att);

		AddInc(OOO,X);
		AddInc(OOO,Y);
		AddInc(OOO,Z);

		Result=true;
		return Result;
	}

} // CommonOOO


function EExecO000(OOO,X,Y,Z,Att,Sg1,Sg2,Sg3)
{
	if ((X.OB==undefined) || (Y.OB==undefined) || (Z.OB==undefined)) return false;
    R=false;

	if ((X.OB=="P") && (Y.OB=="P")) 
	{
		R=CommonOOO(OOO,X,Y,Z,Att);
		if (R)
		{
			Result=true;
			Result=true;
			return Result;
		}
	}

	if ((X.OB=="P") && (Z.OB=="P")) 
	{
		R=CommonOOO(OOO,X,Z,Y,Att);
		if (R)
		{
			Result=true;
			return Result;
		}
	}

	if ((Y.OB=="P") && (Z.OB=="P")) 
	{
		R=CommonOOO(OOO,Y,Z,X,Att);
		if (R)
		{
			Result=true;
			return Result;
		}
	}

	{
		if (Att.Chk==1) TOEmpty_Create(OOO,Att);
		Result=true;
		return Result;
	}
} // EExecO000

function EExecPD(Out_Prm1,X,Y,Z,U,Att1,Sg1,Sg2,Sg3,Sg4)
{
	if ((X.OB==undefined) || (Y.OB==undefined) || (Z.OB==undefined) || (U.OB==undefined)) return false;
    var Vx={Re:undefined, Im:undefined}
    var Vy={Re:undefined, Im:undefined}
	Result=false;
     
	if ((X.OB=="P") && (Z.OB=="P") && ((Y.OB=="C") || (Y.OB="P")) && ((U.OB=="C") || ((U.OB=="P"))))
	{
		if ((IsSobstv(X)) && (IsSobstv(Z)))
		if ((IsReal(X)) && (IsReal(Z)))
		{
			if (Y.OB=="C") Vx.Re=X.X.Re+Y.C.Re*Sg2;
			if (U.OB=="C") Vy.Re=Z.Y.Re+U.C.Re*Sg4;
			if (Y.OB=="C") Vx.Im=X.X.Im+Y.C.Im*Sg2;
			if (U.OB=="C") Vy.Im=Z.Y.Im+U.C.Im*Sg4;

			if (Y.OB=="P") Vx=Y.X;
			if (U.OB=="P") Vy=U.Y;

			TOPoint_Create(Out_Prm1,Vx,Vy,1,Att1);
		} else if (Att1.Chk==1) TOEmpty_Create(Out_Prm1,Att1)
	} else if (Att1.Chk==1) TOEmpty_Create(Out_Prm1,Att1)

	Result=true;
	return Result;
} // EExecPD

function EExecL0(OOO,X1,X2,X3,X4,Y1,Y2,Y3,Y4,Att,Sg1,Sg2,Sg3,Sg4,Sg5,Sg6,Sg7,Sg8)
{
	if ((X1.OB==undefined) || (X2.OB==undefined) || (X3.OB==undefined) || (X4.OB==undefined) ||
	(Y1.OB==undefined) || (Y2.OB==undefined) || (Y3.OB==undefined || (Y4.OB==undefined))) return false;

	Result=false;

	if ((((X1.OB=="P") && (X2.OB=="O") && (X3.OB=="O") && (X4.OB=="O") &&
	(Y1.OB=="P") && (Y2.OB=="O") && (Y3.OB=="O") && (Y4.OB=="O"))) ||

	(((X1.OB=="P") && (X2.OB=="O") && (X3.OB=="O") && (X4.OB=="O") &&
	(Y1.OB=="O") && (Y2.OB=="P") && (Y3.OB=="P") && (Y4.OB=="P"))) ||

	(((X1.OB=="O") && (X2.OB=="P") && (X3.OB=="P") && (X4.OB=="P") &&
	(Y1.OB=="P") && (Y2.OB=="O") && (Y3.OB=="O") && (Y4.OB=="O"))) ||

	(((X1.OB=="O") && (X2.OB=="P") && (X3.OB=="P") && (X4.OB=="P") &&
	(Y1.OB=="O") && (Y2.OB=="P") && (Y3.OB=="P") && (Y4.OB=="P"))))
	{
		TOProeL_Create(OOO,X1,X2,X3,X4,Y1,Y2,Y3,Y4,Att);
		Result=true;
	}
    else if (Att.Chk==1) TOEmpty_Create(OOO,Att);
	Result=true;
	return Result;
} // EExecL0

function EExecLV(out_prm1,in_prm1,in_prm2,in_prm3,in_prm4,in_prm5,Att_1,Sg1,Sg2,Sg3,Sg4,Sg5)
{
	if ((in_prm1.OB==undefined) || (in_prm2.OB==undefined) || (in_prm3.OB==undefined) || (in_prm4.OB==undefined)) return false;
	Result=true;
	
	var o1=new Object();
	var o2=new Object();
	var p1=new Object();
	var p2=new Object();
	var p3=new Object();
	var p4=new Object();
	var pr1=new Object();
	
	CreateCopy(o1,in_prm1);
	o1.FAtt=CopyAtt(in_prm1.FAtt);

	CreateCopy(o2,in_prm1);
	o2.FAtt=CopyAtt(in_prm1.FAtt);

	CreateCopy(p1,in_prm2);
	p1.FAtt=CopyAtt(in_prm2.FAtt);

	CreateCopy(p2,in_prm3);
	p2.FAtt=CopyAtt(in_prm3.FAtt);

	CreateCopy(p3,in_prm4);
	p3.FAtt=CopyAtt(in_prm4.FAtt);

	CreateCopy(p4,in_prm5);
	p4.FAtt=CopyAtt(in_prm5.FAtt);
	
	EExecL0(pr1,o1,p1,p2,p3,o2,p2,p1,p4,Att_1,1,1,1,1,1,1,1,1);

	CreateCopy(out_prm1,pr1);
	out_prm1.FAtt=CopyAtt(Att_1);

	return true;
} // EExecLV

function GiveOwnPointByNum(OOO,X,N)
{
	if (X.OB=="P")
	{
		switch (N)
		{
			case 1: 	
				TOPoint_Create(OOO,X.X,X.Y,W,T,tp_Fixed,AttA);
				OOO.FAtt=CopyAtt(Att0);
			break
		
			case 2: ;
				CreateCopy(OOO,X.Y);
				OOO.FAtt=CopyAtt(Att0);
			break
		}
	}
	if (X.OB=="O")
	{
		switch (N)
		{
			case 1: ;
			break
		
			case 2: ;
			break
		}
	}
	if (X.OB=="D")
	{
		switch (N)
		{
			case 1: ;
			break
		
			case 2: ;
			break
		}
	}
	if (X.OB=="L")
	{
		switch (N)
		{
			case 1:
				CreateCopy(OOO,X.L1);			;
			break
		
			case 2: ;
				CreateCopy(OOO,X.S1);			;
			break
			
			case 3: ;
				CreateCopy(OOO,X.S2);			;
			break
			
			case 4: ;
				CreateCopy(OOO,X.S3);			;
			break
			
			case 5: ;
				CreateCopy(OOO,X.L2);			;
			break
			
			case 6: ;
				CreateCopy(OOO,X.D1);			;
			break
			
			case 7: ;
				CreateCopy(OOO,X.D2);			;
			break
			
			case 8: ;
				CreateCopy(OOO,X.D3);			;
			break
		}
	}

	if (X.OB=="Y")
	{
		switch (N)
		{
			case 1:
				CreateCopy(OOO,X.PR1);			;
			break
		
			case 2: ;
				CreateCopy(OOO,X.PR2);			;
			break
			
			case 3: ;
				CreateCopy(OOO,X.PR3);			;
			break
			
			case 4: ;
				CreateCopy(OOO,X.PR4);			;
			break
			
			case 5: ;
				CreateCopy(OOO,X.PR5);			;
			break
		}
	}
	
	if ((X.OB=="K") || (X.OB=="k"))
	{
		switch (N)
		{
			case 1:
				CreateCopy(OOO,X.S1);			;
			break
		
			case 2: ;
				CreateCopy(OOO,X.S2);			;
			break
			
			case 3: ;
				CreateCopy(OOO,X.S3);			;
			break
			
			case 4: ;
				CreateCopy(OOO,X.S4);			;
			break
			
			case 5: ;
				CreateCopy(OOO,X.D1);			;
			break
			
			case 6: ;
				CreateCopy(OOO,X.D2);			;
			break
			
			case 7: ;
				CreateCopy(OOO,X.D3);			;
			break
			
			case 8: ;
				CreateCopy(OOO,X.D4);			;
			break
		}
	}
	

	
} // GiveOwnPointByNum

function EExecUZ(OOO,X,Y,Att,Sg1,Sg2)
{ 
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	Result=false;
	if (Y.OB=="C") if (IsReal(Y)) 
	{
		NN=Y.C.Re*Sg2;
		N=Math.trunc(NN);
		GiveOwnPointByNum(OOO,X,N);
		OOO.FAtt=CopyAtt(Att);
		if (true) 
		{
			if (Att.Lv==8) Att.Lv=X.FAtt.Lv;
		} else if (Att.Chk==1) TOEmpty_Create(OOO,Att);
	} else if (Att.Chk==1) TOEmpty_Create(OOO,Att);
	Result=true;
	return Result;
} // EExecUZ

function EExecG0(Usl,V,Att,Sg1)
{	
	if (V.OB==undefined) return false;
	Result=false;
	if (V.OB="G")
	{
		A=V.B;
		if (Sg1==-1) {A=!A};
		TOUsl_Create(Usl,A,Att);
	} else
    {
		TOEmpty_Create(Usl,Att);
	}
    Result=true;
	return Result;
} // EExecG0

function EExecG2(Usl,V,Att,Sg1)
{	
	if (V.OB==undefined) return false;

	Result=false;
	if (V.OB="G")
	{
		A=!V.B;
		if (Sg1==-1) {A=!A};
		TOUsl_Create(Usl,A,Att);
	} else
    {
		TOEmpty_Create(Usl,Att);
	}
    Result=true;
	return Result;
} // EExecG2

function EExecG4(OOO,X,Y,Att,Sg1,Sg2)
{
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	Result=false;
	if ((X.OB=="C") && (Y.OB=="C") && IsReal(X) && IsReal(Y))
	{
		A=MCompl(X.C.Re*Sg1,X.C.Im*Sg1);
		B=MCompl(Y.C.Re*Sg2,Y.C.Im*Sg2);
		TOUsl_Create(OOO,A.Re!=B.Re,Att);
	}  else
	{
		TOEmpty_Create(OOO,Att);
	}
	Result=true;
	return Result;
} // EExecG4

function EExecG5(OOO,X,Y,Att,Sg1,Sg2)
{
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	Result=false;
	if ((X.OB=="C") && (Y.OB=="C") && IsReal(X) && IsReal(Y))
	{
		A=MCompl(X.C.Re*Sg1,X.C.Im*Sg1);
		B=MCompl(Y.C.Re*Sg2,Y.C.Im*Sg2);
		TOUsl_Create(OOO,A.Re<B.Re,Att);
	}  else
	{
		TOEmpty_Create(OOO,Att);
	}
	Result=true;
	return Result;
} // EExecG5

function EExecG6(OOO,X,Y,Att,Sg1,Sg2)
{
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	Result=false;
	if ((X.OB=="C") && (Y.OB=="C") && IsReal(X) && IsReal(Y))
	{
		A=MCompl(X.C.Re*Sg1,X.C.Im*Sg1);
		B=MCompl(Y.C.Re*Sg2,Y.C.Im*Sg2);
		TOUsl_Create(OOO,A.Re<=B.Re,Att);
	}  else
	{
		TOEmpty_Create(OOO,Att);
	}
	Result=true;
	return Result;
} // EExecG6

function EExecG7(OOO,X,Y,Att,Sg1,Sg2)
{
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	Result=false;
	if ((X.OB=="C") && (Y.OB=="C") && IsReal(X) && IsReal(Y))
	{
		A=MCompl(X.C.Re*Sg1,X.C.Im*Sg1);
		B=MCompl(Y.C.Re*Sg2,Y.C.Im*Sg2);
		TOUsl_Create(OOO,A.Re==B.Re,Att);
	}  else
	{
		TOEmpty_Create(OOO,Att);
	}
	Result=true;
	return Result;
} // EExecG7

function EExecG1(Out_Prm,X,Y,Z,Att,Sg1,Sg2,Sg3)
{     
	if ((X.OB==undefined) || (Y.OB==undefined) || (Z.OB==undefined)) return false;
	Result=false;
	if ((X.OB=="C") && (Y.OB=="C") && (Z.OB=="C") && IsReal(X) && IsReal(Y) && IsReal(Z))
	{
		var B=(Y.C.Re*Sg2<=X.C.Re*Sg1) && (X.C.Re*Sg1<Z.C.Re*Sg3);
		TOUsl_Create(Out_Prm,B,Att);
	} else
	{
		if (Att.Chk==1) TOEmpty_Create(Out_Prm,Att);
	}

	Result=true;
	return Result;
} // EExecG1 

function EExecG8(Out_Prm,X,Y,Z,Att,Sg1,Sg2,Sg3)
{     
	if ((X.OB==undefined) || (Y.OB==undefined) || (Z.OB==undefined)) return false;
	Result=false;
	if ((X.OB=="C") && (Y.OB=="C") && (Z.OB=="C") && IsReal(X) && IsReal(Y) && IsReal(Z))
	{
		var B=(Y.C.Re*Sg2<X.C.Re*Sg1) && (X.C.Re*Sg1<Z.C.Re*Sg3);
		TOUsl_Create(Out_Prm,B,Att);
	} else
	{
		if (Att.Chk==1) TOEmpty_Create(Out_Prm,Att);
	}

	Result=true;
	return Result;
} // EExecG8 

function EExecG9(Out_Prm,X,Y,Z,Att,Sg1,Sg2,Sg3)
{     
	if ((X.OB==undefined) || (Y.OB==undefined) || (Z.OB==undefined)) return false;
	Result=false;
	if ((X.OB=="C") && (Y.OB=="C") && (Z.OB=="C") && IsReal(X) && IsReal(Y) && IsReal(Z))
	{
		var B=(Y.C.Re*Sg2<=X.C.Re*Sg1) && (X.C.Re*Sg1<=Z.C.Re*Sg3);
		TOUsl_Create(Out_Prm,B,Att);
	} else
	{
		if (Att.Chk==1) TOEmpty_Create(Out_Prm,Att);
	}

	Result=true;
	return Result;
} // EExecG9 

function EExecGE(Out_Prm,X,Y,Z,Att,Sg1,Sg2,Sg3)
{     
	if ((X.OB==undefined) || (Y.OB==undefined) || (Z.OB==undefined)) return false;
	Result=false;
	if ((X.OB=="C") && (Y.OB=="C") && (Z.OB=="C") && IsReal(X) && IsReal(Y) && IsReal(Z))
	{
		var B=(Y.C.Re*Sg2<X.C.Re*Sg1) && (X.C.Re*Sg1<=Z.C.Re*Sg3);
		TOUsl_Create(Out_Prm,B,Att);
	} else
	{
		if (Att.Chk==1) TOEmpty_Create(Out_Prm,Att);
	}

	Result=true;
	return Result;
} // EExecGE 

function EExecA4(Out_Prm,X,Att,Sg1)
{     
	if (X.length==0)  return false;
	var S = {Re:0, Im:0}
	Result=false;
	S=X[0].C;
	
	for (I=1; I<X.length; I++)
	{
		if (X[I].C.Re<S.Re) S=X[I].C;
	}

	TOChisl_Create(Out_Prm,S,Att);
	Result=true;
	return Result;

} // EExecA4 

function EExecA5(Out_Prm,X,Att,Sg1)
{     
	if (X.length==0) return false;

	var S = {Re:0, Im:0}
	Result=false;
	S=X[0].C;
	
	for (I=1; I<X.length; I++)
	{
		if (X[I].C.Re>S.Re) S=X[I].C;
	}

	TOChisl_Create(Out_Prm,S,Att);
	Result=true;
	return Result;

} // EExecA5 

function EExecA0(Out_Prm,X,Att,Sg1)
{     
	if (X.length==0) return false;
	var S = {Re:0, Im:0}
	Result=false;
	S=X[0].C;
	
	for (I=1; I<X.length; I++)
	{
		S=CompSum(S,X[I].C);
	}

	TOChisl_Create(Out_Prm,S,Att);
	Result=true;
	return Result;

} // EExecA0 

function EExecA1(Out_Prm,X,Att,Sg1)
{     
	if (X.length==0) return false;
	var S = {Re:0, Im:0}
	Result=false;
	S=X[0].C;
	
	for (I=1; I<X.length; I++)
	{
		S=CompSub(S,X[I].C);
	}

	TOChisl_Create(Out_Prm,S,Att);
	Result=true;
	return Result;

} // EExecA1 

function EExecA2(Out_Prm,X,Att,Sg1)
{     
	if (X.length==0) return false;
	var S = {Re:0, Im:0}
	Result=false;
	S=X[0].C;
	
	for (I=1; I<X.length; I++)
	{
		S=CompMul(S,X[I].C);
	}

	TOChisl_Create(Out_Prm,S,Att);
	Result=true;
	return Result;

} // EExecA2 


function EExecA3(Out_Prm,X,Att,Sg1)
{     
	if (X.length==0) return false;
	var S = {Re:0, Im:0}
	Result=false;
	S=X[0].C;
	
	for (I=1; I<X.length; I++)
	{
		S=CompDiv(S,X[I].C);
	}

	TOChisl_Create(Out_Prm,S,Att);
	Result=true;
	return Result;

} // EExecA3 


function EExecA7(M,V,Att,Sg)
{
	if (V.OB==undefined) return false;
	var S = {Re:0, Im:0}
	Result=false
	if (V.OB=="C") 
	{
		S.Re=Math.abs(V.C.Re)*Sg;
		S.Im=0;
		TOChisl_Create(M,S,Att);
	} else
	{
		TOEmpty_Create(M,Att);
	}
	Result=true
	return Result
} // EExecA7

function EExecA8(M,V,Att,Sg)
{
	if (V.OB==undefined) return false;
	var S = {Re:0, Im:0}
	Result=false
	if (V.OB=="C") 
	{
		S=CompSqr(V.C);
		TOChisl_Create(M,S,Att);
	} else
	{
		TOEmpty_Create(M,Att);
	}
	Result=true
	return Result
} // EExecA8

function EExecA9(M,V,Att,Sg)
{
	if (V.OB==undefined) return false;
	var S = {Re:0, Im:0}
	Result=false
	if (V.OB=="C") 
	{
		S=TOChisl(V.C);
		TOChisl_Create(M,S,Att);
	} else
	{
		TOEmpty_Create(M,Att);
	}
	Result=true
	return Result
} // EExecA9

function EExecAA(M,V,Att,Sg)
{
	if (V.OB==undefined) return false;
	var S = {Re:0, Im:0}
	Result=false
	if (V.OB=="C") 
	{
		S.Re=Math.exp(V.C.Re)*Sg;
		S.Im=0;
		TOChisl_Create(M,S,Att);
	} else
	{
		TOEmpty_Create(M,Att);
	}
	Result=true
	return Result
} // EExecAA

function EExecAB(M,V,W,Att,Sg1,Sg2)
{
	if (V.OB==undefined) return false;
	var S = {Re:0, Im:0}
	Result=false
	if (V.OB=="C") 
	{
		S.Re=Math.sin(V.C.Re)*Sg1;
		S.Im=0;
		S=CompMul(S,W);
		S=CompMul(S,MCompl(Sg1*Sg2,0))
		TOChisl_Create(M,S,Att);
	} else
	{
		TOEmpty_Create(M,Att);
	}
	Result=true
	return Result
} // EExecAB

function EExecAC(M,V,W,Att,Sg1,Sg2)
{
	if (V.OB==undefined) return false;
	var S = {Re:0, Im:0}
	Result=false
	if (V.OB=="C") 
	{
		S.Re=Math.cos(V.C.Re)*Sg1;
		S.Im=0;
		S=CompMul(S,W);
		S=CompMul(S,MCompl(Sg1*Sg2,0))
		TOChisl_Create(M,S,Att);
	} else
	{
		TOEmpty_Create(M,Att);
	}
	Result=true
	return Result
} // EExecAC

function EExecAD(M,V,Att,Sg)
{
	if (V.OB==undefined) return false;
	var S = {Re:0, Im:0}
	Result=false
	if (V.OB=="C") 
	{
		S.Re=Math.tan(V.C.Re)*Sg;
		S.Im=0;
		TOChisl_Create(M,S,Att);
	} else
	{
		TOEmpty_Create(M,Att);
	}
	Result=true
	return Result
} // EExecAD

function EExecAE(M,V,Att,Sg)
{
	if (V.OB==undefined) return false;
	var S = {Re:0, Im:0}
	Result=false
	if (V.OB=="C") 
	{
		S.Re=Math.asin(V.C.Re)*Sg/Math.PI*180;
		S.Im=0;
		TOChisl_Create(M,S,Att);
	} else
	{
		TOEmpty_Create(M,Att);
	}
	Result=true
	return Result
} // EExecAE

function EExecAF(M,V,Att,Sg)
{
	if (V.OB==undefined) return false;
	var S = {Re:0, Im:0}
	Result=false
	if (V.OB=="C") 
	{
		S.Re=Math.acos(V.C.Re)*Sg/Math.PI*180;
		S.Im=0;
		TOChisl_Create(M,S,Att);
	} else
	{
		TOEmpty_Create(M,Att);
	}
	Result=true
	return Result
} // EExecAF

function EExecAG(M,V,Att,Sg)
{
	if (V.OB==undefined) return false;
	var S = {Re:0, Im:0}
	Result=false
	if (V.OB=="C") 
	{
		S.Re=Math.atan(V.C.Re)*Sg/Math.PI*180;
		S.Im=0;
		TOChisl_Create(M,S,Att);
	} else
	{
		TOEmpty_Create(M,Att);
	}
	Result=true
	return Result
} // EExecAG

function EExecAH(M,V,Att,Sg)
{
	if (V.OB==undefined) return false;
	var S = {Re:0, Im:0}
	Result=false
	if (V.OB=="C") 
	{
		S.Re=Math.log(V.C.Re)*Sg;
		S.Im=0;
		TOChisl_Create(M,S,Att);
	} else
	{
		TOEmpty_Create(M,Att);
	}
	Result=true
	return Result
} // EExecAH

function EExecAI(M,V,Att,Sg)
{
	if (V.OB==undefined) return false;
	var S = {Re:0, Im:0}
	Result=false
	if (V.OB=="C") 
	{
		S.Re=Math.log(V.C.Re)/Math.log(10)*Sg;
		S.Im=0;
		TOChisl_Create(M,S,Att);
	} else
	{
		TOEmpty_Create(M,Att);
	}
	Result=true
	return Result
} // EExecAI

function EExecAK(M,V,Att,Sg)
{
	if (V.OB==undefined) return false;
	var S = {Re:0, Im:0}
	Result=false
	if (V.OB=="C") 
	{
		S.Re=Math.atan(V.C.Im/V.C.Re);
		S.Im=0;
		TOChisl_Create(M,S,Att);
	} else
	{
		TOEmpty_Create(M,Att);
	}
	Result=true
	return Result
} // EExecAK

function EExecAL(M,V,Att,Sg)
{
	if (V.OB==undefined) return false;
	var S = {Re:0, Im:0}
	Result=false
	if (V.OB=="C") 
	{
		S.Re=V.C.Re/180*Math.PI;
		S.Im=0;
		TOChisl_Create(M,S,Att);
	} else
	{
		TOEmpty_Create(M,Att);
	}
	Result=true
	return Result
} // EExecAL

function EExecAM(M,V,Att,Sg)
{
	if (V.OB==undefined) return false;
	var S = {Re:0, Im:0}
	Result=false
	if (V.OB=="C") 
	{
		S.Re=V.C.Re/Math.PI*180;
		S.Im=0;
		TOChisl_Create(M,S,Att);
	} else
	{
		TOEmpty_Create(M,Att);
	}
	Result=true
	return Result
} // EExecAM

function EExecG3(OOO,Spis,Att)
{
	if (Spis.length==0) return false;
	I=0;
	while (I<Spis.length-1)
	{
		OB=Spis[I];
		OBUsl=Spis[I+1];
		if (OBUsl.OB=="G") if (OBUsl.B)
		{
			if (!(OB.OB===undefined))
			{
				CreateCopy(OOO,OB);
				Result=true;
				return Result;
			}
		}
		I=I+2;
	}
	TOEmpty_Create(OOO,Att);
	Result=true;
	return Result;

} // EExecG3

function EExecL1_A(out_prm1,in_prm1,in_prm2,Att_1,Sg1,Sg2)
{
	if ((in_prm1.OB==undefined) || (in_prm2.OB==undefined)) return false;
	var Chisl1={C:{Re:-208.5,Im:0},OB:"C"};
	var Chisl2={C:{Re:-64,Im:0},OB:"C"};
	var Chisl3={C:{Re:305.5,Im:0},OB:"C"};
	var Chisl4={C:{Re:-11,Im:0},OB:"C"};
	var Chisl5={C:{Re:0.93331818,Im:0},OB:"C"};
	var Chisl6={C:{Re:0.77889636,Im:0},OB:"C"};
	var Chisl7={C:{Re:0.63066609,Im:0},OB:"C"};
	var Chisl8={C:{Re:0.54451415,Im:0},OB:"C"};
	var Chisl9={C:{Re:0.22894328,Im:0},OB:"C"};
	var Chisl10={C:{Re:-0.063923897,Im:0},OB:"C"};
	var Chisl11={C:{Re:-172.5,Im:0},OB:"C"};
	var Chisl12={C:{Re:201,Im:0},OB:"C"};
	var Chisl13={C:{Re:-296.5,Im:0},OB:"C"};
	var Chisl14={C:{Re:45,Im:0},OB:"C"};
	var Chisl15={C:{Re:77.5,Im:0},OB:"C"};
	var Chisl16={C:{Re:190,Im:0},OB:"C"};
	var Chisl17={C:{Re:-272.5,Im:0},OB:"C"};
	var Chisl18={C:{Re:-30,Im:0},OB:"C"};
	var Chisl19={C:{Re:156.5,Im:0},OB:"C"};
	var Chisl20={C:{Re:87,Im:0},OB:"C"};
	var Chisl21={C:{Re:7,Im:0},OB:"C"};
	var Chisl22={C:{Re:6,Im:0},OB:"C"};
	var Chisl23={C:{Re:4,Im:0},OB:"C"};
	var Chisl24={C:{Re:3,Im:0},OB:"C"};
	var Chisl25={C:{Re:2,Im:0},OB:"C"};
	var Chisl26={C:{Re:1,Im:0},OB:"C"};
	var Chisl27={C:{Re:8,Im:0},OB:"C"};
	var Chisl28={C:{Re:-0.16801366,Im:0},OB:"C"};
	var Chisl29={C:{Re:1.2546353,Im:0},OB:"C"};

	Result=true;
	
	var pr1=new Object();
	CreateCopy(pr1,in_prm1);
    pr1.FAtt=CopyAtt(in_prm1.FAtt);

	var pin=new Object();
	CreateCopy(pin,in_prm2);
    pin.FAtt=CopyAtt(in_prm2.FAtt);

	var o20=new Object();
	var c2=new Object();
	var b2=new Object();
	var a2=new Object();
	var c1=new Object();
	var b1=new Object();
	var a1=new Object();
	var p7=new Object();
	var o3=new Object();
	var o2=new Object();
	EExecO2(o20,Chisl1,Chisl2,Chisl3,Chisl4,Att5,1,1,1,1);
	EExecP9(c2,o20,Chisl5,Att0,1,1);
	EExecP9(b2,o20,Chisl6,Att0,1,1);
	EExecP9(a2,o20,Chisl7,Att0,1,1);
	EExecP9(c1,o20,Chisl8,Att0,1,1);
	EExecP9(b1,o20,Chisl9,Att0,1,1);
	EExecP9(a1,o20,Chisl10,Att0,1,1);
	EExecP0(p7,Chisl11,Chisl12,Att0,1,1);
	EExecO2(o3,Chisl13,Chisl14,Chisl15,Chisl16,Att5,1,1,1,1);
	EExecO2(o2,Chisl17,Chisl18,Chisl19,Chisl20,Att5,1,1,1,1);

	var u2=new Object();
	var r2=new Object();
	var v1=new Object();
	var u1=new Object();
	var r1=new Object();
	var o1=new Object();
	var v2=new Object();

	if (Sg1==1)
	{
		EExecUZ(u2,pr1,Chisl21,Att0,1*Sg1,1);
		EExecUZ(r2,pr1,Chisl22,Att0,1*Sg1,1);
		EExecUZ(v1,pr1,Chisl23,Att0,1*Sg1,1);
		EExecUZ(u1,pr1,Chisl24,Att0,1*Sg1,1);
		EExecUZ(r1,pr1,Chisl25,Att0,1*Sg1,1);
		EExecUZ(o1,pr1,Chisl26,Att5,1*Sg1,1);
		EExecUZ(v2,pr1,Chisl27,Att0,1*Sg1,1);
	} else
	{
		EExecUZ(u1,pr1,Chisl21,Att0,1*Sg1,1);
		EExecUZ(r1,pr1,Chisl22,Att0,1*Sg1,1);
		EExecUZ(v2,pr1,Chisl23,Att0,1*Sg1,1);
		EExecUZ(u2,pr1,Chisl24,Att0,1*Sg1,1);
		EExecUZ(r2,pr1,Chisl25,Att0,1*Sg1,1);
		EExecUZ(o1,pr1,Chisl26,Att5,1*Sg1,1);
		EExecUZ(v1,pr1,Chisl27,Att0,1*Sg1,1);
	}

	var o9=new Object();
	var p13=new Object();
	var o8=new Object();
	var o7=new Object();
	var o6=new Object();
	var o5=new Object();
	var o4=new Object();
	var o16=new Object();
	var p12=new Object();
	var p11=new Object();
	var p10=new Object();
	var p9=new Object();
	var p8=new Object();
	var p19=new Object();
	var o10=new Object();
	var p15=new Object();
	var p14=new Object();
	var o14=new Object();
	var o17=new Object();
	var o13=new Object();
	var o12=new Object();
	var o11=new Object();
	var p17=new Object();
	var p16=new Object();
	var o15=new Object();
	var p20=new Object();
	var o18=new Object();
	var p21=new Object();
	var o19=new Object();
	var pout=new Object();

	EExecO0(o9,v2,p7,Att5,1,1);
	EExecP2(p13,o2,o9,Att0,1,1);
	EExecO0(o8,u2,p7,Att5,1,1);
	EExecO0(o7,r2,p7,Att5,1,1);
	EExecO0(o6,v1,p7,Att5,1,1);
	EExecO0(o5,u1,p7,Att5,1,1);
	EExecO0(o4,r1,p7,Att5,1,1);
	EExecO0(o16,p7,pin,Att5,1,1*Sg2);
	EExecP2(p12,o2,o8,Att0,1,1);
	EExecP2(p11,o2,o7,Att0,1,1);
	EExecP2(p10,o6,o3,Att0,1,1);
	EExecP2(p9,o5,o3,Att0,1,1);
	EExecP2(p8,o4,o3,Att0,1,1);
	EExecP2(p19,o16,o3,Att0,1,1);
	EExecO0(o10,p11,p8,Att5,1,1);
	EExecP9(p15,o10,Chisl28,Att0,1,1);
	EExecP9(p14,o10,Chisl29,Att0,1,1);
	EExecO0(o14,p13,p15,Att5,1,1);
	EExecO0(o17,p14,p19,Att5,1,1);
	EExecO0(o13,p10,p14,Att5,1,1);
	EExecO0(o12,p15,p12,Att5,1,1);
	EExecO0(o11,p9,p14,Att5,1,1);
	EExecP2(p17,o14,o13,Att0,1,1);
	EExecP2(p16,o12,o11,Att0,1,1);
	EExecO0(o15,p16,p17,Att5,1,1);
	EExecP2(p20,o17,o15,Att0,1,1);
	EExecO0(o18,p15,p20,Att5,1,1);
	EExecP2(p21,o18,o2,Att0,1,1);
	EExecO0(o19,p7,p21,Att5,1,1);
	EExecP2(pout,o19,o1,Att0,1,1);

	CreateCopy(out_prm1,pout);
	out_prm1.FAtt=CopyAtt(Att_1);

	Result=true;
	return Result;

} // EExecL1_A

function EExecL1_B(out_prm1,in_prm1,in_prm2,Att_1,Sg1,Sg2)
{    
	if ((in_prm1.OB==undefined) || (in_prm2.OB==undefined)) return false;
	var Chisl1={C:{Re:1,Im:0},OB:"C"};
	var Chisl2={C:{Re:2,Im:0},OB:"C"};
	var Chisl3={C:{Re:3,Im:0},OB:"C"};
	var Chisl4={C:{Re:4,Im:0},OB:"C"};
	var Chisl5={C:{Re:5,Im:0},OB:"C"};
	var Chisl6={C:{Re:6,Im:0},OB:"C"};
	var Chisl7={C:{Re:7,Im:0},OB:"C"};
	var Chisl8={C:{Re:8,Im:0},OB:"C"};
	var Chisl23={C:{Re:-0.74468254,Im:0},OB:"C"};
	var Chisl24={C:{Re:1.6766164,Im:0},OB:"C"};

    Result=true;
	
	var pr1=new Object();
	CreateCopy(pr1,in_prm1);
    pr1.FAtt=CopyAtt(in_prm1.FAtt);

	var pin=new Object();
	CreateCopy(pin,in_prm2);
    pin.FAtt=CopyAtt(in_prm2.FAtt);


	if (Sg1==1) 
	{
		var k=new Object();
		var r1=new Object();
		var u1=new Object();
		var v1=new Object();
		var l=new Object();
		var r2=new Object();
		var u2=new Object();
		var v2=new Object();
		
		EExecUZ(k,pr1,Chisl1,Att5,1*Sg1,1);
		EExecUZ(r1,pr1,Chisl2,Att0,1*Sg1,1);
		EExecUZ(u1,pr1,Chisl3,Att0,1*Sg1,1);
		EExecUZ(v1,pr1,Chisl4,Att0,1*Sg1,1);
		EExecUZ(l,pr1,Chisl5,Att5,1*Sg1,1);
		EExecUZ(r2,pr1,Chisl6,Att0,1*Sg1,1);
		EExecUZ(u2,pr1,Chisl7,Att0,1*Sg1,1);
		EExecUZ(v2,pr1,Chisl8,Att0,1*Sg1,1);
	} else
	{
		var k=new Object();
		var r1=new Object();
		var u1=new Object();
		var v1=new Object();
		var l=new Object();
		var r2=new Object();
		var u2=new Object();
		var v2=new Object();

		EExecUZ(l,pr1,Chisl1,Att5,1*Sg1,1);
		EExecUZ(r2,pr1,Chisl2,Att0,1*Sg1,1);
		EExecUZ(u2,pr1,Chisl3,Att0,1*Sg1,1);
		EExecUZ(v2,pr1,Chisl4,Att0,1*Sg1,1);
		EExecUZ(k,pr1,Chisl5,Att5,1*Sg1,1);
		EExecUZ(r1,pr1,Chisl6,Att0,1*Sg1,1);
		EExecUZ(u1,pr1,Chisl7,Att0,1*Sg1,1);
		EExecUZ(v1,pr1,Chisl8,Att0,1*Sg1,1);
	}

	var g1=new Object();
	var g2=new Object();
	var o3=new Object();
	var g3=new Object();
	var g3_ = new Array();
	
	EExecGP(g1,pin,k,Att0,1*Sg2,1);
	EExecGP(g2,pin,l,Att0,1*Sg2,1);
	EExecO0(o3,r2,r1,Att5,1,1);

	{g3_.push(g1,g2); EExecGA(g3,g3_,Att5)}

	var g4=new Object();
	var p3=new Object();
	var p2=new Object();
	var o9=new Object();
	var o7=new Object();
	var o6=new Object();
	var o5=new Object();
	var o4=new Object();
	var p5=new Object();
	var p4=new Object();
	var o8=new Object();
	var p7=new Object();
	var o10=new Object();
	var pp=new Object();
	var pout=new Object();

	EExecG2(g4,g3,Att0,1);
	EExecP9(p3,o3,Chisl23,Att5,1,1);
	EExecP9(p2,o3,Chisl24,Att0,1,1);
	EExecO0(o9,p2,pin,Att5,1,1);
	EExecO0(o7,v2,p3,Att5,1,1);
	EExecO0(o6,u2,p3,Att5,1,1);
	EExecO0(o5,v1,p2,Att5,1,1);
	EExecO0(o4,u1,p2,Att5,1,1);
	EExecP2(p5,o5,o7,Att0,1,1);
	EExecP2(p4,o6,o4,Att0,1,1);
	EExecO0(o8,p4,p5,Att5,1,1);
	EExecP2(p7,o9,o8,Att5,1,1);
	EExecO0(o10,p3,p7,Att5,1,1);
	EExecP2(pp,o10,l,Att0,1,1);
	EExecGCOPY(pout,pp,g4,Att0,1,1);

    CreateCopy(out_prm1,pout);
    out_prm1.FAtt=CopyAtt(Att_1);

} // EExecL1_B

function EExecL1(out_prm1,in_prm1,in_prm2,Att_out,Sg1,Sg2)
{
	if ((in_prm1.OB==undefined) || (in_prm2.OB==undefined)) return false;
	var Chisl1={C:{Re:1,Im:0},OB:"C"};
	var Chisl2={C:{Re:5,Im:0},OB:"C"};
	var Chisl3={C:{Re:2,Im:0},OB:"C"};
	var Chisl4={C:{Re:3,Im:0},OB:"C"};
	var Chisl5={C:{Re:4,Im:0},OB:"C"};
	var Chisl6={C:{Re:6,Im:0},OB:"C"};
	var Chisl7={C:{Re:7,Im:0},OB:"C"};
	var Chisl8={C:{Re:8,Im:0},OB:"C"};
	var Chisl9={C:{Re:-1331,Im:0},OB:"C"};
	var Chisl10={C:{Re:0,Im:0},OB:"C"};
	var Chisl11={C:{Re:1845,Im:0},OB:"C"};
	var Chisl12={C:{Re:100,Im:0},OB:"C"};

	Result=false;
	
	var pr=new Object();
	CreateCopy(pr,in_prm1);
	pr.FAtt=CopyAtt(Att5);

	var in1=new Object();
	CreateCopy(in1,in_prm2);
	in1.FAtt=CopyAtt(Att5);

	Att_out.Lv=5;

	if (Sg1==1)
	{
		var p1=new Object();
		var p2=new Object();
		var o1=new Object();
		var o2=new Object();
		var o3=new Object();
		var o4=new Object();
		var o5=new Object();
		var o6=new Object();
		
		EExecUZ(p1,pr,Chisl1,Att5,1,1);
		EExecUZ(p2,pr,Chisl2,Att5,1,1);
		EExecUZ(o1,pr,Chisl3,Att5,1,1);
		EExecUZ(o2,pr,Chisl4,Att5,1,1);
		EExecUZ(o3,pr,Chisl5,Att5,1,1);
		EExecUZ(o4,pr,Chisl6,Att5,1,1);
		EExecUZ(o5,pr,Chisl7,Att5,1,1);
		EExecUZ(o6,pr,Chisl8,Att5,1,1);
	}
	
	if (Sg1==-1)
	{
		var p1=new Object();
		var p2=new Object();
		var o1=new Object();
		var o2=new Object();
		var o3=new Object();
		var o4=new Object();
		var o5=new Object();
		var o6=new Object();

		EExecUZ(p1,pr,Chisl2,Att5,1,1);
		EExecUZ(p2,pr,Chisl1,Att5,1,1);
		EExecUZ(o1,pr,Chisl6,Att5,1,1);
		EExecUZ(o2,pr,Chisl7,Att5,1,1);
		EExecUZ(o3,pr,Chisl8,Att5,1,1);
		EExecUZ(o4,pr,Chisl3,Att5,1,1);
		EExecUZ(o5,pr,Chisl4,Att5,1,1);
		EExecUZ(o6,pr,Chisl5,Att5,1,1);
	}

	var o7=new Object();
	EExecO2(o7,Chisl9,Chisl10,Chisl11,Chisl12,Att5,1,1,1,1);

	if ((p1.OB=="P") && (p2.OB=="P")) 
	{
		var p3=new Object();
		var p4=new Object();
		var p5=new Object();
		var p6=new Object();
		var p7=new Object();
		var p8=new Object();
		var pr1=new Object();
		var p11=new Object();
		var p12=new Object();
		var p13=new Object();
		var g1=new Object();
		var g2=new Object();

		EExecP2(p3,o1,o7,Att5,1,1);
		EExecP2(p4,o2,o7,Att5,1,1);
		EExecP2(p5,o3,o7,Att5,1,1);
		EExecP2(p6,o4,o7,Att5,1,1);
		EExecP2(p7,o5,o7,Att5,1,1);
		EExecP2(p8,o6,o7,Att5,1,1);
		EExecL0(pr1,o7,p3,p4,p5,o7,p6,p7,p8,Att5,1,1,1,1,1,1,1,1);
		EExecP2(p11,o7,in1,Att5,1,1*Sg2);
		EExecL1(p12,pr1,p11,Att5,1,1);
		EExecO0(p13,p2,p12,Att5,1,1);
		EExecGP(g1,p1,in1,Att5,1,1*Sg2);
		EExecG2(g2,g1,Att5,1);

//		{out1_=[ ]; out1_.push(p13,g1,g2); N=EExecG3(out1,out1_,Att_out1)}

		CreateCopy(out_prm1,p13);
		out_prm1.FAtt=CopyAtt(Att_out);

		Result=true;
		return Result;

	}

	if ((p1.OB=="P") && (p2.OB=="O"))
	{
		var p3=new Object();
		var p4=new Object();
		var p5=new Object();
		var pr1=new Object();
		var p11=new Object();
		var p12=new Object();
		var g1=new Object();
		var g2=new Object();
		var out1=new Object();
		var out1_=new Array();
		
		EExecP2(p3,o1,p2,Att5,1,1);
		EExecP2(p4,o2,p2,Att5,1,1);
		EExecP2(p5,o3,p2,Att5,1,1);
		EExecR0(pr1,p2,p3,p4,p5,p2,o4,o5,o6,Att5,1,1,1,1,1,1,1,1);
		EExecP2(p11,p2,in1,Att5,1,1*Sg2);
		EExecR1(p12,pr1,p11,Att5,1,1);
		EExecGP(g1,p1,in1,Att5,1,1*Sg2);
		EExecG2(g2,g1,Att5,1);

		{out1_.push(p12,g1,g2); EExecG3(out1,out1_,Att_out1)}

		CreateCopy(out_prm1,out1);
		out_prm1.FAtt=CopyAtt(Att_out);

		Result=true;
		return Result;
	}

	if ((p1.OB=="O") && (p2.OB=="P"))
	{
		var p3=new Object();
		var p4=new Object();
		var p5=new Object();
		var pr1=new Object();
		var p12=new Object();
		var p13=new Object();
		var g1=new Object();
		var g2=new Object();
		var out1=new Object();
		var out1_=new Array();

		EExecP2(p3,o4,p1,Att5,1,1);
		EExecP2(p4,o5,p1,Att5,1,1);
		EExecP2(p5,o6,p1,Att5,1,1);
		EExecR0(pr1,p1,o1,o2,o3,p1,p3,p4,p5,Att5,1,1,1,1,1,1,1,1);
		EExecR1(p12,pr1,in1,Att5,1,1);
		EExecO0(p13,p2,p12,Att5,1,1);

		EExecGP(g1,in1,p1,Att5,1,1*Sg2);

		EExecG2(g2,g1,Att5,1);

		{out1_.push(p13,g1,g2); N=EExecG3(out1,out1_,Att_out1)}

		CreateCopy(out_prm1,out1);
		out_prm1.FAtt=CopyAtt(Att_out);

		Result=true;
		return Result;
	}

	if ((p1.OB=="O") && (p2.OB=="O"))
	{
		EExecL1_B(out_prm1,pr,in1,Att_out,Sg1,1);
		if (out_prm1.OB=="$") 
		{
			EExecL1_A(out_prm1,pr,in1,Att_out,Sg1,1);
		}
		Result=true;
		return Result;
		
	}
	Result=true;
	return Result;
} // EExecL1

function EExecR0(OOO,X1,X2,X3,X4,Y1,Y2,Y3,Y4,Att,Sg1,Sg2,Sg3,Sg4,Sg5,Sg6,Sg7,Sg8)
{     
	if ((X1.OB==undefined) || (X2.OB==undefined) || (X3.OB==undefined) || (X4.OB==undefined) ||
	(Y1.OB==undefined) || (Y2.OB==undefined) || (Y3.OB==undefined) || (Y4.OB==undefined)) return false;
	Result=false;
	if ((X1.OB=="O") && (X2 .OB=="P") && (X3.OB=="P") && (X4.OB=="P") &&
	(Y1.OB=="O") && (Y2.OB=="P") && (Y3.OB=="P") && (Y4.OB=="P"))
	{
		TOProe_Create(OOO,X1,X2,X3,X4,Y1,Y2,Y3,Y4,Att);
		Result=true;
		return Result;
	} 
	else if (Att.Chk==1) TOEmpty_Create(OOO,Att);
	Result=true;
	return Result;
} // EExecR0

function EExecR1(out_prm1,in_prm1,in_prm2,Att_1,Sg1,Sg2)
{
	if ((in_prm1.OB==undefined) || (in_prm2.OB==undefined)) return false;

	var Chisl1={C:{Re:-530.5,Im:0},OB:"C"};
	var Chisl2={C:{Re:67.5,Im:0},OB:"C"};
	var Chisl3={C:{Re:108.5,Im:0},OB:"C"};
	var Chisl4={C:{Re:-50.5,Im:0},OB:"C"};
	var Chisl5={C:{Re:2.0721287,Im:0},OB:"C"};
	var Chisl6={C:{Re:1.1285652,Im:0},OB:"C"};
	var Chisl7={C:{Re:0.99366718,Im:0},OB:"C"};
	var Chisl8={C:{Re:0.28285711,Im:0},OB:"C"};
	var Chisl9={C:{Re:2.1554098,Im:0},OB:"C"};
	var Chisl10={C:{Re:0.1470047,Im:0},OB:"C"};
	var Chisl11={C:{Re:8,Im:0},OB:"C"};
	var Chisl12={C:{Re:7,Im:0},OB:"C"};
	var Chisl13={C:{Re:6,Im:0},OB:"C"};
	var Chisl14={C:{Re:5,Im:0},OB:"C"};
	var Chisl15={C:{Re:4,Im:0},OB:"C"};
	var Chisl16={C:{Re:3,Im:0},OB:"C"};
	var Chisl17={C:{Re:2,Im:0},OB:"C"};
	var Chisl18={C:{Re:1,Im:0},OB:"C"};
	var Chisl19={C:{Re:-100,Im:0},OB:"C"};
	var Chisl20={C:{Re:-0.81168749,Im:0},OB:"C"};
	var Chisl21={C:{Re:1.7281315,Im:0},OB:"C"};

	Result=true;
	var pr1=new Object();
	CreateCopy(pr1,in_prm1);
	pr1.FAtt=CopyAtt(in_prm1.FAtt);

	var inp=new Object();
	CreateCopy(inp,in_Prmp);
	inp.FAtt=CopyAtt(in_prm2.FAtt);

	var t3_2=new Object();
	var t2_2=new Object();
	var t1_2=new Object();
	var l2=new Object();
	var t3_1=new Object();
	var t2_1=new Object();
	var t1_1=new Object();
	var l1=new Object();
	var o2=new Object();
	var p10=new Object();
	var p9=new Object();
	var p8=new Object();
	var o3=new Object();
	var p12=new Object();
	var p11=new Object();
	var o9=new Object();
	var o7=new Object();
	var o6=new Object();
	var o5=new Object();
	var o4=new Object();
	var p14=new Object();
	var p13=new Object();
	var o8=new Object();
	var p15=new Object();
	var o10=new Object();
	var p16=new Object();
	var outp=new Object();
	
	EExecUZ(t3_2,pr1,Chisl11,Att0,1*Sg1,1);
	EExecUZ(t2_2,pr1,Chisl12,Att0,1*Sg1,1);
	EExecUZ(t1_2,pr1,Chisl13,Att0,1*Sg1,1);
	EExecUZ(l2,pr1,Chisl14,Att5,1*Sg1,1);
	EExecUZ(t3_1,pr1,Chisl15,Att0,1*Sg1,1);
	EExecUZ(t2_1,pr1,Chisl16,Att0,1*Sg1,1);
	EExecUZ(t1_1,pr1,Chisl17,Att0,1*Sg1,1);
	EExecUZ(l1,pr1,Chisl18,Att5,1*Sg1,1);
	EExecO7(o2,l2,Chisl19,Att5,1,1);
	EExecPF(p10,t3_2,o2,Att0,1,1);
	EExecPF(p9,t2_2,o2,Att0,1,1);
	EExecPF(p8,t1_2,o2,Att0,1,1);
	EExecO0(o3,t1_1,p8,Att5,1,1);
	EExecP9(p12,o3,Chisl20,Att0,1,1);
	EExecP9(p11,o3,Chisl21,Att0,1,1);
	EExecO0(o9,inp,p12,Att5,1*Sg2,1);
	EExecO0(o7,p10,p11,Att5,1,1);
	EExecO0(o6,p9,p11,Att5,1,1);
	EExecO0(o5,p12,t3_1,Att5,1,1);
	EExecO0(o4,p12,t2_1,Att5,1,1);
	EExecP2(p14,o5,o7,Att0,1,1);
	EExecP2(p13,o4,o6,Att0,1,1);
	EExecO0(o8,p13,p14,Att5,1,1);
	EExecP2(p15,o9,o8,Att0,1,1);
	EExecO0(o10,p11,p15,Att5,1,1);
	EExecP2(p16,o10,o2,Att0,1,1);
	EExecPF(outp,p16,l2,Att0,1,1);

	CreateCopy(out_prm1,outp);
	out_prm1.FAtt=CopyAtt(Att_1);

} // EExecR1

function EExecGP(OOO,X,Y,Att,Sg1,Sg2)
{     
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	if ((X.OB=="P") && !(IsSobstv(X)) && (Y.OB=="O") && !(IsSobstv(Y)))
	{
		TOUsl_Create(OOO,true,Att);
		Result=true;
		return Result;
	}

	if ((X.OB=="P") && (Y.OB=="O"))
	{
		B=PointBelongs(Y,X.X.Re,X.Y.Re);
		TOUsl_Create(OOO,B,Att);
		Result=true;
		return Result;
	}

	if ((X.OB=="P"))
	{
		TOUsl_Create(OOO,true,Att);
	} else if (Att.Chk==1) TOEmpty_Create(OOO,Att);
	Result=true;
	return Result;
}; // EExecGP

function EExecGA(OOO,Spis,Att)
{
	Result=false;
	if (Spis.length<0) 
	{	
		TOEmpty_Create(OOO,Att);
		Result=true;
		return Result
	}
	
	OB=Spis[0];
	
	S=OB.B;

	for( I=1; I<Spis.length; I++) 
	{
		OB=Spis[I];
		S=S && OB.B;
	}
	
	TOUsl_Create(OOO,S,Att);
	Result=true;
	return Result;
} // EExecGA

function EExecGB(OOO,Spis,Att)
{
	Result=false;
	if (Spis.length<0) 
	{	
		TOEmpty_Create(OOO,Att);
		Result=true;
		return Result
	}
	
	OB=Spis[0];
	
	S=OB.B;

	for( I=1; I<Spis.Count; I++) 
	{
		OB=Spis[I];
		S=S || OB.B;
	}
	
	TOUsl_Create(OOO,S,Att);
	Result=true;
	return Result;
} // EExecGB

function EExecGCOPY(OOO,X,Y,Att,Sg1,Sg2)
{
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	if (Y.B) {CreateCopy(OOO,X)} else TOEmpty_Create(OOO,Att)
	Result=true;
	return Result;
} // EExecGCOPY

function EExecL3_A(out_prm1,out_prm2,in_prm1,Att_1,Att_2,Sg1)
{
	if (in_prm1.OB==undefined) return false;

	var Chisl1={C:{Re:-274,Im:0},OB:"C"};
	var Chisl2={C:{Re:287,Im:0},OB:"C"};
	var Chisl3={C:{Re:168,Im:0},OB:"C"};
	var Chisl4={C:{Re:-613,Im:0},OB:"C"};
	var Chisl5={C:{Re:-113,Im:0},OB:"C"};
	var Chisl6={C:{Re:355,Im:0},OB:"C"};
	var Chisl7={C:{Re:48,Im:0},OB:"C"};
	var Chisl8={C:{Re:0,Im:0},OB:"C"};
	var Chisl15={C:{Re:8,Im:0},OB:"C"};
	var Chisl16={C:{Re:7,Im:0},OB:"C"};
	var Chisl17={C:{Re:6,Im:0},OB:"C"};
	var Chisl18={C:{Re:4,Im:0},OB:"C"};
	var Chisl19={C:{Re:3,Im:0},OB:"C"};
	var Chisl20={C:{Re:2,Im:0},OB:"C"};
	var Chisl21={C:{Re:1,Im:0},OB:"C"};

	var pr1=new Object();
	var d1=new Object();
	var p8=new Object();
	var c2=new Object();
	var b2=new Object();
	var a2=new Object();
	var c1=new Object();
	var b1=new Object();
	var a1=new Object();
	var o=new Object();
	var o8=new Object();
	var o7=new Object();
	var o6=new Object();
	var o5=new Object();
	var o4=new Object();
	var o3=new Object();
	var p19=new Object();
	var p20=new Object();
	var p17=new Object();
	var p18=new Object();
	var p15=new Object();
	var p16=new Object();
	var p13=new Object();
	var p14=new Object();
	var p11=new Object();
	var p12=new Object();
	var p9=new Object();
	var p10=new Object();
	var o12=new Object();
	var o11=new Object();
	var o10=new Object();
	var o9=new Object();
	var p22=new Object();
	var p21=new Object();
	var o13=new Object();
	var p23=new Object();
	var p24=new Object();
	var o15=new Object();
	var o14=new Object();
	var p26=new Object();
	var p25=new Object();

    Result=true;
    CreateCopy(pr1,in_prm1);
    pr1.FAtt=CopyAtt(in_prm1.FAtt);

	EExecD00(d1,Chisl1,Chisl2,Chisl3,Att0,1,1,1);
	EExecP9(p8,d1,Chisl8,Att0,1,1);
	EExecUZ(c2,pr1,Chisl15,Att0,1*Sg1,1);
	EExecUZ(b2,pr1,Chisl16,Att0,1*Sg1,1);
	EExecUZ(a2,pr1,Chisl17,Att0,1*Sg1,1);
	EExecUZ(c1,pr1,Chisl18,Att0,1*Sg1,1);
	EExecUZ(b1,pr1,Chisl19,Att0,1*Sg1,1);
	EExecUZ(a1,pr1,Chisl20,Att0,1*Sg1,1);
	EExecUZ(o,pr1,Chisl21,Att5,1*Sg1,1);
	EExecO0(o8,p8,c2,Att5,1,1);
	EExecO0(o7,p8,b2,Att5,1,1);
	EExecO0(o6,p8,a2,Att5,1,1);
	EExecO0(o5,p8,c1,Att5,1,1);
	EExecO0(o4,p8,b1,Att5,1,1);
	EExecO0(o3,p8,a1,Att5,1,1);
	EExecP8(p19,p20,o8,d1,Att0,Att0,1,1);
	EExecP8(p17,p18,o7,d1,Att0,Att0,1,1);
	EExecP8(p15,p16,o6,d1,Att0,Att0,1,1);
	EExecP8(p13,p14,o5,d1,Att0,Att0,1,1);
	EExecP8(p11,p12,o4,d1,Att0,Att0,1,1);
	EExecP8(p9,p10,o3,d1,Att0,Att0,1,1);
	EExecO0(o12,p12,p20,Att5,1,1);
	EExecO0(o11,p10,p20,Att5,1,1);
	EExecO0(o10,p18,p14,Att5,1,1);
	EExecO0(o9,p16,p14,Att5,1,1);
	EExecP2(p22,o10,o12,Att0,1,1);
	EExecP2(p21,o9,o11,Att0,1,1);
	EExecO0(o13,p21,p22,Att5,1,1);
	EExecP6(p23,p24,o13,d1,Att0,Att0,1,1);
	EExecO0(o15,p23,p8,Att5,1,1);
	EExecO0(o14,p24,p8,Att5,1,1);
	EExecP2(p26,o15,o,Att0,1,1);
	EExecP2(p25,o14,o,Att0,1,1);

	CreateCopy(out_prm1,p25);
	out_prm1.FAtt=CopyAtt(Att_1);

	CreateCopy(out_prm2,p26);
	out_prm2.FAtt=CopyAtt(Att_2);
	
	Result=true;
	return Result;

} // EExecL3_A

function EExecL3_B(out_prm1,in_prm1,Att_1,Sg1)
{
	if (in_prm1.OB==undefined) return false;
	var Chisl5={C:{Re:-0.05708147,Im:0},OB:"C"};
	var Chisl12={C:{Re:8,Im:0},OB:"C"};
	var Chisl13={C:{Re:7,Im:0},OB:"C"};
	var Chisl14={C:{Re:4,Im:0},OB:"C"};
	var Chisl15={C:{Re:3,Im:0},OB:"C"};
	var Chisl16={C:{Re:1,Im:0},OB:"C"};

	var pr1=new Object();
	var x5=new Object();
	var x4=new Object();
	var x3=new Object();
	var x2=new Object();
	var x1=new Object();
	var p8=new Object();
	var p9=new Object();
	var pr2=new Object();

	Result=true;
	CreateCopy(pr1,in_prm1);
	pr1.FAtt=CopyAtt(in_prm1.FAtt);

	EExecUZ(x5,pr1,Chisl12,Att0,1*Sg1,1);
	EExecUZ(x4,pr1,Chisl13,Att0,1*Sg1,1);
	EExecUZ(x3,pr1,Chisl14,Att0,1*Sg1,1);
	EExecUZ(x2,pr1,Chisl15,Att0,1*Sg1,1);
	EExecUZ(x1,pr1,Chisl16,Att0,1*Sg1,1);
	EExecP9(p8,x1,Chisl5,Att0,1,1);
	EExecL1(p9,pr1,p8,Att0,1*Sg1,1);
	EExecL0(pr2,x1,p8,x2,x3,x1,p9,x4,x5,Att0,1,1,1,1,1,1,1,1);

	CreateCopy(out_prm1,pr2);
	out_prm1.FAtt=CopyAtt(Att_1);

	Result=true;
	return Result;
} // EExecL3_B

function EExecL3_C(out_prm1,in_prm1,Att_1,Sg1)
{
	if (in_prm1.OB==undefined) return false;
	var Chisl5={C:{Re:-0.05708147,Im:0},OB:"C"};
	var Chisl12={C:{Re:7,Im:0},OB:"C"};
	var Chisl13={C:{Re:6,Im:0},OB:"C"};
	var Chisl14={C:{Re:3,Im:0},OB:"C"};
	var Chisl15={C:{Re:2,Im:0},OB:"C"};
	var Chisl16={C:{Re:1,Im:0},OB:"C"};

	var pr1=new Object();
	var x5=new Object();
	var x4=new Object();
	var x3=new Object();
	var x2=new Object();
	var x1=new Object();
	var p8=new Object();
	var p9=new Object();
	var pr2=new Object();

	Result=true;
	CreateCopy(pr1,in_prm1);
	pr1.FAtt=CopyAtt(in_prm1.FAtt);

	EExecUZ(x5,pr1,Chisl12,Att0,1*Sg1,1);
	EExecUZ(x4,pr1,Chisl13,Att0,1*Sg1,1);
	EExecUZ(x3,pr1,Chisl14,Att0,1*Sg1,1);
	EExecUZ(x2,pr1,Chisl15,Att0,1*Sg1,1);
	EExecUZ(x1,pr1,Chisl16,Att0,1*Sg1,1);
	EExecP9(p8,x1,Chisl5,Att0,1,1);
	EExecL1(p9,pr1,p8,Att0,1*Sg1,1);
	EExecL0(pr2,x1,x2,x3,p8,x1,x4,x5,p9,Att0,1,1,1,1,1,1,1,1);

	CreateCopy(out_prm1,pr2);
	out_prm1.FAtt=CopyAtt(Att_1);
	
	Result=true;
	return Result;
} // EExecL3_C

function EExecL3(out_prm1,out_prm2,in_prm1,Att_1,Att_2,Sg1)
{
	if (in_prm1.OB==undefined) return false;
	var pr1=new Object();
	var pr2=new Object();
	var a=new Object();
	var b=new Object();

	CreateCopy(pr1,in_prm1);
	pr1.FAtt=CopyAtt(in_prm1.FAtt);

	EExecL3_A(a,b,pr1,Att_1,Att_2,Sg1);

	if ((a.OB=="$") && (b.OB=="$"))
	{
		EExecL3_B(pr2,pr1,Att_1,Sg1);
		EExecL3_A(a,b,pr2,Att_1,Att_2,1);
		if ((a.OB=="$") && (b.OB=="$")) 
		{
			EExecL3_C(pr2,pr1,Att_1,Sg1);
			EExecL3_A(a,b,pr2,Att_1,Att2,1);
		}
	}
	
	CreateCopy(out_prm1,a);
	out_prm1.FAtt=CopyAtt(Att_1);

	CreateCopy(out_prm2,b);
	out_prm2.FAtt=CopyAtt(Att_2);
	
	Result=true;
	return Result;
	
} // EExecL3

function EExecY0(KWD,X,Y,Z,U,V,Att,Sg1,Sg2,Sg3,Sg4,Sg5)
{     
	if ((X.OB==undefined) || (Y.OB==undefined) || (Z.OB==undefined) || (U.OB==undefined) || (V.OB==undefined)) return false;
	Result=false;
    if ((X.OB=="P") && (Y.OB=="P") && (Z.OB=="P") && (U.OB=="P") && (V.OB=="P"))
	{
		TOKwadr_Create(KWD,X,Y,Z,U,V,Att);
		AddInc(X,KWD);
		AddInc(Y,KWD);
		AddInc(Z,KWD);
		AddInc(U,KWD);
		AddInc(V,KWD);
    } else if (Att.Chk==1) KWD=TOEmpty_Create(KWD,Att);
	Result=true;
	return Result;
} // EExecY0

function EExecY5(out_prm1,in_prm1,in_prm2,in_prm3,in_prm4,in_prm5,Att_1,Sg1,Sg2,Sg3,Sg4,Sg5)
{
	if ((in_prm1.OB==undefined) || (in_prm2.OB==undefined) || (in_prm3.OB==undefined) || (in_prm4==undefined) || (in_prm5==undefined)) return false;
	Result=true;
	
	var o1=new Object();
	var o2=new Object();
	var o3=new Object();
	var o4=new Object();
	var o5=new Object();
	var p1=new Object();
	var p2=new Object();
	var p3=new Object();
	var p4=new Object();
	var p5=new Object();
	var o6=new Object();
	var o7=new Object();
	var o9=new Object();
	var o11=new Object();
	var o13=new Object();
	var p6=new Object();
	var p8=new Object();
	var p10=new Object();
	var p12=new Object();
	var p14=new Object();
	var o8=new Object();
	var o10=new Object();
	var o12=new Object();
	var o14=new Object();
	var o15=new Object();
	var p7=new Object();
	var p9=new Object();
	var p11=new Object();
	var p13=new Object();
	var p15=new Object();
	var y1=new Object();


	CreateCopy(o1,in_prm1);
	o1.FAtt=CopyAtt(in_prm1.FAtt);

	CreateCopy(o2,in_prm2);
	o2.FAtt=CopyAtt(in_prm2.FAtt);

	CreateCopy(o3,in_prm3);
	o3.FAtt=CopyAtt(in_prm3.FAtt);

	CreateCopy(o4,in_prm4);
	o4.FAtt=CopyAtt(in_prm4.FAtt);

	CreateCopy(o5,in_prm5);
	o5.FAtt=CopyAtt(in_prm5.FAtt);

	EExecP2(p1,o5,o1,Att0,1*Sg5,1*Sg1);
	EExecP2(p2,o1,o2,Att0,1*Sg1,1*Sg2);
	EExecP2(p3,o2,o3,Att0,1*Sg2,1*Sg3);
	EExecP2(p4,o3,o4,Att0,1*Sg3,1*Sg4);
	EExecP2(p5,o4,o5,Att0,1*Sg4,1*Sg5);
	EExecO0(o6,p1,p4,Att5,1,1);
	EExecO0(o7,p5,p3,Att5,1,1);
	EExecO0(o9,p2,p4,Att5,1,1);
	EExecO0(o11,p3,p1,Att5,1,1);
	EExecO0(o13,p2,p5,Att5,1,1);
	EExecP2(p6,o6,o7,Att0,1,1);
	EExecP2(p8,o9,o7,Att0,1,1);
	EExecP2(p10,o11,o9,Att0,1,1);
	EExecP2(p12,o11,o13,Att0,1,1);
	EExecP2(p14,o6,o13,Att0,1,1);
	EExecO0(o8,p2,p6,Att5,1,1);
	EExecO0(o10,p1,p8,Att5,1,1);
	EExecO0(o12,p5,p10,Att5,1,1);
	EExecO0(o14,p4,p12,Att5,1,1);
	EExecO0(o15,p3,p14,Att5,1,1);
	EExecP2(p7,o8,o4,Att0,1,1*Sg4);
	EExecP2(p9,o10,o3,Att0,1,1*Sg3);
	EExecP2(p11,o12,o2,Att0,1,1*Sg2);
	EExecP2(p13,o1,o14,Att0,1*Sg1,1);
	EExecP2(p15,o15,o5,Att0,1,1*Sg5);
	EExecY0(y1,p15,p13,p11,p9,p7,Att0,1,1,1,1,1);

	CreateCopy(out_prm1,y1);
	out_prm1.FAtt=CopyAtt(Att_1);
	Result=true;
	return Result;
} // EExecY5

function EExecY8(out_prm1,in_prm1,in_prm2,in_prm3,in_prm4,in_prm5,Att_polus,Sg1,Sg2,Sg3,Sg4,Sg5)
{
	if ((in_prm1.OB==undefined) || (in_prm2.OB==undefined) || (in_prm3.OB==undefined) || (in_prm4.OB==undefined) || (in_prm5.OB==undefined)) return false;
	Result=false;
	
	var Chisl10={C:{Re:140.3,Im:0},OB:"C"};

	var o1=new Object();
	var o2=new Object();
	var p7=new Object();
	var o3=new Object();
	var o4=new Object();
	var p8=new Object();
	var o5=new Object();
	var p6=new Object();
	var o6=new Object();
	var pp=new Object();
	var y0=new Object();

	EExecO0(o1,in_prm2,in_prm1,Att5,1,1);
	EExecO0(o2,in_prm3,in_prm2,Att5,1,1);
	EExecP2(p7,in_prm4,o2,Att0,1,1);
	EExecO1(o3,in_prm3,Chisl10,Att0,1,1);
	EExecO0(o4,in_prm1,in_prm5,Att5,1,1);
	EExecP2(p8,o3,o4,Att0,1,1);
	EExecO0(o5,p7,p8,Att5,1,1);
	EExecP2(p6,o1,o5,Att0,1,1);
	EExecO0(o6,p6,in_prm5,Att5,1,1);
	EExecP2(pp,o3,o6,Att0,1,1);
	EExecY0(y0,in_prm5,in_prm1,in_prm2,in_prm3,pp,Att0,1,1,1,1,1);

	CreateCopy(out_prm1,y0);
	out_prm1.FAtt=CopyAtt(Att_polus);

	Result=true;
	return Result;
} // EExecY8

function EExecY9(out_prm1,in_prm1,in_prm2,in_prm3,in_prm4,in_prm5,Att_polus,Sg1,Sg2,Sg3,Sg4,Sg5)
{
	if ((in_prm1.OB==undefined) || (in_prm2.OB==undefined) || (in_prm3.OB==undefined) || (in_prm4.OB==undefined) || (in_prm5.OB==undefined)) return false;

 	Result=false;
	
	var Chisl9={C:{Re:109.8,Im:0},OB:"C"};
	var Chisl10={C:{Re:127.7,Im:0},OB:"C"};

	var o1=new Object();
	var o3=new Object();
	var p7=new Object();
	var o4=new Object();
	var p8=new Object();
	var o5=new Object();
	var p9=new Object();
	var o6=new Object();
	var out1=new Object();
	var o8=new Object();
	var p10=new Object();
	var o9=new Object();
	var p11=new Object();
	var p10=new Object();
	var out2=new Object();
	var y0=new Object();

	EExecO0(o1,in_prm1,in_prm3,Att5,1,1);
	EExecO0(o3,in_prm1,in_prm5,Att5,1,1);
	EExecP2(p7,in_prm2,in_prm4,Att0,1,1);
	EExecO1(o4,in_prm3,Chisl9,Att0,1,1);
	EExecP2(p8,o3,o4,Att0,1,1);
	EExecO0(o5,p8,p7,Att5,1,1);
	EExecP2(p9,o5,o1,Att0,1,1);
	EExecO0(o6,p9,in_prm5,Att5,1,1);
	EExecP2(out1,o4,o6,Att0,1,1);
	EExecO1(o8,in_prm3,Chisl10,Att0,1,1);
	EExecP2(p10,o8,o3,Att0,1,1);
	EExecO0(o9,p10,p7,Att5,1,1);
	EExecP2(p11,o1,o9,Att0,1,1);
	EExecO0(o10,p11,in_prm5,Att5,1,1);
	EExecP2(out2,o8,o10,Att0,1,1);
	EExecY0(y0,in_prm1,in_prm3,out2,out1,in_prm5,Att0,1,1,1,1,1);

	CreateCopy(out_prm1,y0);
	out_prm1.FAtt=CopyAtt(Att_polus);

	Result=true;
	return Result;

} // EExecY9

function EExecYA1(out_prm1,in_prm1,in_prm2,in_prm3,in_prm4,Att_1,Sg1,Sg2,Sg3,Sg4)
{
	if ((in_prm1.OB==undefined) || (in_prm2.OB==undefined) || (in_prm3.OB==undefined)) return false;
	Result=false;

	var p1=new Object();
	var p2=new Object();
	var p3=new Object();
	var ksi=new Object();
	var y2=new Object();
	var p9=new Object();
	var p10=new Object();

	CreateCopy(p1,in_prm1);
	p1.FAtt=CopyAtt(in_prm1.FAtt);

	CreateCopy(p2,in_prm2);
	p2.FAtt=CopyAtt(in_prm2.FAtt);

	CreateCopy(p3,in_prm3);
	p3.FAtt=CopyAtt(in_prm3.FAtt);

	CreateCopy(ksi,in_prm4);
	ksi.FAtt=CopyAtt(in_prm4.FAtt);

	EExecL3(p9,p10,ksi,Att0,Att0,1*Sg4);
	EExecY0(y2,p1,p2,p3,p9,p10,Att0,1*Sg1,1*Sg2,1*Sg3,1,1);
	
	CreateCopy(out_prm1,y2);
	out_prm1.FAtt=CopyAtt(Att_1);
	Result=true;
	return Result;
} // EExecYA1

function EExecYA2(out_prm1,in_prm1,in_prm2,in_prm3,Att_1,Sg1,Sg2,Sg3)
{
	if ((in_prm1.OB==undefined) || (in_prm2.OB==undefined) || (in_prm3.OB==undefined)) return false;
	Result=false;
	var p1=new Object();
	var k1=new Object();
	var k2=new Object();
	var p9=new Object();
	var p10=new Object();
	var p7=new Object();
	var p8=new Object();
	var y2=new Object();

	CreateCopy(p1,in_prm1);
	p1.FAtt=CopyAtt(in_prm1.FAtt);

	CreateCopy(k1,in_prm2);
	k1.FAtt=CopyAtt(in_prm2.FAtt);

	CreateCopy(k2,in_prm3);
	k2.FAtt=CopyAtt(in_prm3.FAtt);

	EExecL3(p9,p10,k2,Att0,Att0,1*Sg3);
	EExecL3(p7,p8,k1,Att0,Att0,1*Sg2);
	EExecY0(y2,p1,p8,p10,p7,p9,Att0,1*Sg1,1,1,1,1);
 
	CreateCopy(out_prm1,y2);
	out_prm1.FAtt=CopyAtt(Att_1);
	
	Result=true;
	return Result;
} // EExecYA2

function EExecK0(OOO,X1,X2,X3,X4,Y1,Y2,Y3,Y4,Att,Sg11,Sg12,Sg13,Sg14,Sg21,Sg22,Sg23,Sg24)
{
	if ((X1.OB==undefined) || (X2.OB==undefined) || (X3.OB==undefined) || (X4.OB==undefined) ||
	(Y1.OB==undefined) || (Y2.OB==undefined) || (Y3.OB==undefined) || (Y4.OB==undefined)) return false;

	if ((((X1.OB=="P") && (Y1.OB=="P")) || ((X1.OB=="O") && (Y1.OB=="O")))
	&& (((X2.OB=="P") && (Y2.OB=="P")) || ((X2.OB=="O") && (Y2.OB=="O")))
	&& (((X3.OB=="P") && (Y3.OB=="P")) || ((X3.OB=="O") && (Y3.OB=="O")))
	&& (((X4.OB=="P") && (Y4.OB=="P")) || ((X4.OB=="O") && (Y4.OB=="O"))))
	{
		TOCollin_Create(OOO,X1,X2,X3,X4,Y1,Y2,Y3,Y4,Att);
		Result=true;
		return Result;
	}
	
	if ((((X1.OB=="P") && (Y1.OB=="O")) || ((X1.OB=="O") && (Y1.OB=="P")))
	&& (((X2.OB=="P") && (Y2.OB=="O")) || ((X2.OB=="O") && (Y2.OB=="P")))
	&& (((X3.OB=="P") && (Y3.OB=="O")) || ((X3.OB=="O") && (Y3.OB=="P")))
	&& (((X4.OB=="P") && (Y4.OB=="O")) || ((X4.OB=="O") && (Y4.OB=="P"))))
	{
		TOCorrel_Create(OOO,X1,X2,X3,X4,Y1,Y2,Y3,Y4,Att);
		Result=true;
		return Result;
	}
	
	if (Att.Chk==1) TOEmpty_Create(OOO,Att);
	Result=true;
	return Result;
} // EExecK0


function EExecPX(out_prm1,in_prm1,in_prm2,Att_1,Sg1,Sg2)
{
	if ((in_prm1.OB==undefined) || (in_prm2.OB==undefined)) return false;
 
function Common()
{
	EExecO0(o1,x1,x2,Att5,1,1);
	EExecO0(o2,x1,x3,Att5,1,1);
	EExecO0(o3,x1,x4,Att5,1,1);
	EExecO0(o4,x4,x2,Att5,1,1);
	EExecO0(o5,x4,x3,Att5,1,1);
	EExecO0(o11,x1,p11,Att5,1,1*Sg2);
	EExecO0(o12,x4,p11,Att5,1,1*Sg2);

	EExecO0(o6,x5,x6,Att5,1,1);
	EExecO0(o7,x5,x7,Att5,1,1);
	EExecO0(o8,x5,x8,Att5,1,1);
	EExecO0(o9,x8,x6,Att5,1,1);
	EExecO0(o10,x8,x7,Att5,1,1);

	EExecL0(pr1,x1,o1,o2,o3,x5,o6,o7,o8,Att5,1,1,1,1,1,1,1,1);
	EExecL0(pr2,x4,o3,o4,o5,x8,o8,o9,o10,Att5,1,1,1,1,1,1,1,1);

	EExecL1(x9,pr1,o11,Att5,1,1);
	EExecL1(x10,pr2,o12,Att5,1,1);

	EExecP2(p12,x9,x10,Att5,1,1);
}
 
	var Chisl1={C:{Re:1,Im:0},OB:"C"};
	var Chisl2={C:{Re:2,Im:0},OB:"C"};
	var Chisl3={C:{Re:3,Im:0},OB:"C"};
	var Chisl4={C:{Re:4,Im:0},OB:"C"};
	var Chisl5={C:{Re:5,Im:0},OB:"C"};
	var Chisl6={C:{Re:6,Im:0},OB:"C"};
	var Chisl7={C:{Re:7,Im:0},OB:"C"};
	var Chisl8={C:{Re:8,Im:0},OB:"C"};

	Result=false;
	 
	var ksi1=new Object();
	var p11=new Object();

	CreateCopy(ksi1,in_prm1);
	ksi1.FAtt=CopyAtt(in_prm1.FAtt);

	CreateCopy(p11,in_prm2);
	p11.FAtt=CopyAtt(in_prm2.FAtt);

	var x1=new Object();
	var x2=new Object();
	var x3=new Object();
	var x4=new Object();
	var x5=new Object();
	var x6=new Object();
	var x7=new Object();
	var x8=new Object();
	
	if (Sg1==1) 
	{
		EExecUZ(x1,ksi1,Chisl1,Att5,1,1);
		EExecUZ(x2,ksi1,Chisl2,Att5,1,1);
		EExecUZ(x3,ksi1,Chisl3,Att5,1,1);
		EExecUZ(x4,ksi1,Chisl4,Att5,1,1);
		EExecUZ(x5,ksi1,Chisl5,Att5,1,1);
		EExecUZ(x6,ksi1,Chisl6,Att5,1,1);
		EExecUZ(x7,ksi1,Chisl7,Att5,1,1);
		EExecUZ(x8,ksi1,Chisl8,Att5,1,1);
	} else
	{
		EExecUZ(x1,ksi1,Chisl5,Att5,1,1);
		EExecUZ(x2,ksi1,Chisl6,Att5,1,1);
		EExecUZ(x3,ksi1,Chisl7,Att5,1,1);
		EExecUZ(x4,ksi1,Chisl8,Att5,1,1);
		EExecUZ(x5,ksi1,Chisl1,Att5,1,1);
		EExecUZ(x6,ksi1,Chisl2,Att5,1,1);
		EExecUZ(x7,ksi1,Chisl3,Att5,1,1);
		EExecUZ(x8,ksi1,Chisl4,Att5,1,1);
	}

	var o1=new Object();
	var o2=new Object();
	var o3=new Object();
	var o4=new Object();
	var o5=new Object();
	var o6=new Object();
	var o7=new Object();
	var o8=new Object();
	var o9=new Object();
	var o10=new Object();
	var o11=new Object();
	var o12=new Object();
	var pr1=new Object();
	var pr2=new Object();
	var x9=new Object();
	var x10=new Object();
	var p12=new Object();

	Common();

	if (p12.OB=="O") 
	{
		if (Sg1==1)
		{
		   EExecUZ(x1,ksi1,Chisl1,Att5,1,1);
		   EExecUZ(x2,ksi1,Chisl2,Att5,1,1);
		   EExecUZ(x4,ksi1,Chisl3,Att5,1,1);
		   EExecUZ(x3,ksi1,Chisl4,Att5,1,1);
		   EExecUZ(x5,ksi1,Chisl5,Att5,1,1);
		   EExecUZ(x6,ksi1,Chisl6,Att5,1,1);
		   EExecUZ(x8,ksi1,Chisl7,Att5,1,1);
		   EExecUZ(x7,ksi1,Chisl8,Att5,1,1);
		} else
		{
		   EExecUZ(x1,ksi1,Chisl5,Att5,1,1);
		   EExecUZ(x2,ksi1,Chisl6,Att5,1,1);
		   EExecUZ(x4,ksi1,Chisl7,Att5,1,1);
		   EExecUZ(x3,ksi1,Chisl8,Att5,1,1);
		   EExecUZ(x5,ksi1,Chisl1,Att5,1,1);
		   EExecUZ(x6,ksi1,Chisl2,Att5,1,1);
		   EExecUZ(x8,ksi1,Chisl3,Att5,1,1);
		   EExecUZ(x7,ksi1,Chisl4,Att5,1,1);
		}
		
		Common();

	}

	if (!(p12.OB=="$"))
	{
		CreateCopy(out_prm1,p12);
		out_prm1.FAtt=CopyAtt(Att_1);

		Result=true;
		return Result;
	}



	var Chisl1={C:{Re:1,Im:0},OB:"C"};
	var Chisl2={C:{Re:2,Im:0},OB:"C"};
	var Chisl3={C:{Re:3,Im:0},OB:"C"};
	var Chisl4={C:{Re:4,Im:0},OB:"C"};
	var Chisl5={C:{Re:5,Im:0},OB:"C"};
	var Chisl6={C:{Re:6,Im:0},OB:"C"};
	var Chisl7={C:{Re:7,Im:0},OB:"C"};
	var Chisl8={C:{Re:8,Im:0},OB:"C"};


	Result=true;

	CreateCopy(ksi1,in_prm1);
	ksi1.FAtt=CopyAtt(in_prm1.FAtt);

	CreateCopy(p11,in_prm2);
	p11.FAtt=CopyAtt(in_prm2.FAtt);

	if (Sg1==1)
	{
		EExecUZ(x3,ksi1,Chisl1,Att5,1,1);
		EExecUZ(x4,ksi1,Chisl2,Att5,1,1);
		EExecUZ(x1,ksi1,Chisl3,Att5,1,1);
		EExecUZ(x2,ksi1,Chisl4,Att5,1,1);
		EExecUZ(x7,ksi1,Chisl5,Att5,1,1);
		EExecUZ(x8,ksi1,Chisl6,Att5,1,1);
		EExecUZ(x5,ksi1,Chisl7,Att5,1,1);
		EExecUZ(x6,ksi1,Chisl8,Att5,1,1);
	} else
	{
		EExecUZ(x3,ksi1,Chisl5,Att5,1,1);
		EExecUZ(x4,ksi1,Chisl6,Att5,1,1);
		EExecUZ(x1,ksi1,Chisl7,Att5,1,1);
		EExecUZ(x2,ksi1,Chisl8,Att5,1,1);
		EExecUZ(x7,ksi1,Chisl1,Att5,1,1);
		EExecUZ(x8,ksi1,Chisl2,Att5,1,1);
		EExecUZ(x5,ksi1,Chisl3,Att5,1,1);
		EExecUZ(x6,ksi1,Chisl4,Att5,1,1);
	}

	Common();

	if (!(p12=="$")) 
	{
		CreateCopy(out_prm1,p12);
		out_prm1.FAtt=CopyAtt(Att_1);

		Result=true;
		return Result;
	} else
	TOEmpty_Create(out_prm1,Att_1);	
	


} // EExecPX



function Collin(OB,Y,X,Att,Sg1,Sg2)
{
	if (Y.OB=="P") 
	{ 
		EExecPX(OB,X,Y,Att,Sg1,1)
		return true;
	};
	if (Y.OB=="O") 
	{
		var A1=new Object();
		var A2=new Object();
		var PNT1=new Object();
		var PNT2=new Object();
		
		if (Y.Vid=="sobstv")
		{
			TOPoint_Create(A1,Y.X1,Y.Y1,1,Att5);
			TOPoint_Create(A2,Y.X2,Y.Y2,1,Att5);
			Collin(PNT1,A1,X,Att,Sg1,Sg2);
			Collin(PNT2,A2,X,Att,Sg1,Sg2);
			var X1=MCompl(PNT1.X.Re,PNT1.X.Im);
			var Y1=MCompl(PNT1.Y.Re,PNT1.Y.Im);
			var X2=MCompl(PNT2.X.Re,PNT2.X.Im);
			var Y2=MCompl(PNT2.Y.Re,PNT2.Y.Im);
			
			TOLine_Create(OB,X1,Y1,PNT1.W,X2,Y2,PNT2.W,Y.draw_AsBorned,"sobstv",Att);
		} else
		{
			TOPoint_Create(A1,Y.X1,Y.Y1,0,Att5);
			TOPoint_Create(A2,Y.X2,Y.Y2,0,Att5);
			Collin(PNT1,A1,X,Att,Sg1,Sg2);
			Collin(PNT2,A2,X,Att,Sg1,Sg2);
			TOLine_Create(OB,PNT1.X,PNT1.Y,PNT1.W,PNT2.X,PNT2.Y,PNT2.W,Y.draw_AsBorned,"sobstv",Att);
		}
		return true;
	}
	if (Y.OB=="D") 
	{
		var Chisl1={C:{Re:0,Im:0},OB:"C"};
		var Chisl2={C:{Re:0.2,Im:0},OB:"C"};
		var Chisl3={C:{Re:0.4,Im:0},OB:"C"};
		var Chisl4={C:{Re:0.6,Im:0},OB:"C"};
		var Chisl5={C:{Re:0.8,Im:0},OB:"C"};

		var A1=new Object();
		var A2=new Object();
		var A3=new Object();
		var A4=new Object();
		var A5=new Object();
		var PNT1=new Object();
		var PNT2=new Object();
		var PNT3=new Object();
		var PNT4=new Object();
		var PNT5=new Object();

		EExecP9(A1,Y,Chisl1,Att5,1,1);
		EExecP9(A2,Y,Chisl2,Att5,1,1);
		EExecP9(A3,Y,Chisl3,Att5,1,1);
		EExecP9(A4,Y,Chisl4,Att5,1,1);
		EExecP9(A5,Y,Chisl5,Att5,1,1);

		Collin(PNT1,A1,X,Att5,Sg1,Sg2);
		Collin(PNT2,A2,X,Att5,Sg1,Sg2);
		Collin(PNT3,A3,X,Att5,Sg1,Sg2);
		Collin(PNT4,A4,X,Att5,Sg1,Sg2);
		Collin(PNT5,A5,X,Att5,Sg1,Sg2);

		TOKwadr_Create(OB,PNT1,PNT2,PNT3,PNT4,PNT5,Att5);
		return true;
	}
	if (Y.OB=="Y") 
	{
		var PNT1=new Object();
		var PNT2=new Object();
		var PNT3=new Object();
		var PNT4=new Object();
		var PNT5=new Object();

		Collin(PNT1,Y.PR1,X,Att5,Sg1,Sg2);
		Collin(PNT2,Y.PR2,X,Att5,Sg1,Sg2);
		Collin(PNT3,Y.PR3,X,Att5,Sg1,Sg2);
		Collin(PNT4,Y.PR4,X,Att5,Sg1,Sg2);
		Collin(PNT5,Y.PR5,X,Att5,Sg1,Sg2);

		TOKwadr_Create(OB,PNT1,PNT2,PNT3,PNT4,PNT5,Att5);
		return true;
	}
	if (Y.OB=="K") 
	{
		var PNT1=new Object();
		var PNT2=new Object();
		var PNT3=new Object();
		var PNT4=new Object();
		var PNT5=new Object();
		var PNT6=new Object();
		var PNT7=new Object();
		var PNT8=new Object();

		Collin(PNT1,Y.S1,X,Att5,Sg1,Sg2);
		Collin(PNT2,Y.S2,X,Att5,Sg1,Sg2);
		Collin(PNT3,Y.S3,X,Att5,Sg1,Sg2);
		Collin(PNT4,Y.S4,X,Att5,Sg1,Sg2);
		Collin(PNT5,Y.D1,X,Att5,Sg1,Sg2);
		Collin(PNT6,Y.D2,X,Att5,Sg1,Sg2);
		Collin(PNT7,Y.D3,X,Att5,Sg1,Sg2);
		Collin(PNT8,Y.D4,X,Att5,Sg1,Sg2);

		TOCollin_Create(OB,PNT1,PNT2,PNT3,PNT4,PNT5,PNT6,PNT7,PNT8,Att5);
		return true;
	}
	if (OB.K=="L")
	{
		if (Sg2==1)
		{
			Collin(PNT1,Y.L1,X,Att5,Sg1,Sg2);
			Collin(PNT2,Y.S1,X,Att5,Sg1,Sg2);
			Collin(PNT3,Y.S2,X,Att5,Sg1,Sg2);
			Collin(PNT4,Y.S3,X,Att5,Sg1,Sg2);
			Collin(PNT5,Y.L2,X,Att5,Sg1,Sg2);
			Collin(PNT6,Y.D1,X,Att5,Sg1,Sg2);
			Collin(PNT7,Y.D2,X,Att5,Sg1,Sg2);
			Collin(PNT8,Y.D3,X,Att5,Sg1,Sg2);
		} else
		{
			Collin(PNT5,Y.L1,X,Att5,Sg1,Sg2);
			Collin(PNT6,Y.S1,X,Att5,Sg1,Sg2);
			Collin(PNT7,Y.S2,X,Att5,Sg1,Sg2);
			Collin(PNT8,Y.S3,X,Att5,Sg1,Sg2);
			Collin(PNT1,Y.L2,X,Att5,Sg1,Sg2);
			Collin(PNT2,Y.D1,X,Att5,Sg1,Sg2);
			Collin(PNT3,Y.D2,X,Att5,Sg1,Sg2);
			Collin(PNT4,Y.D3,X,Att5,Sg1,Sg2);
		}
		TOProel_Create(OB,PNT1,PNT2,PNT3,PNT4,PNT5,PNT6,PNT7,PNT8,Att);
		return true;
	}
	if (Att.Chk==1) TOEmpty_Create(OB,Att);
	Result=true;
	return Result;
}

function EExecKU(OB,X,Y,Att,Sg1,Sg2)
{
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	Result=false;
/*
	if (Att.PT=8) or (Att.LV=8) or (Att.LT=6) then
	begin
		Att.RColor Y.OAtt.RColor;
		Att.GColor Y.OAtt.GColor;
		Att.BColor Y.OAtt.BColor;
	end;

	if Att.PT=8 then Att.PTY.OAtt.PT;
	if Att.LT=6 then Att.LTY.OAtt.LT;
*/
	if (Att.Lv==8) Att.Lv=Y.FAtt.Lv;

	if (X.OB=="K")  
	{
		Collin(OB,Y,X,Att,Sg1,Sg2);
		Result=true;
		return Result;
	}

	if (X.OB=="k")  
	{
		Korrel(OB,Y,X,Att,Sg1,Sg2);
		Result=true;
		return Result;
	}

	TOEmpty_Create(OB,Att);
	Result=true;
	return Result;
	
} // EExecKU

function EExecOE(OOO1,OOO2,X,Y,Att1,Att2,Sg1,Sg2)
{
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	if ((X.OB=="O") && (Y.OB=="C") && IsSobstv(X) && IsReal(X))
	{
		X1=X.X1; Y1=X.Y1; X2=X.X2; Y2=X.Y2;
		Dx=Y.C.Re;
		U=CALCO7(X1,Y1,X2,Y2,Dx/2,Sg1*Sg2);
		X4=U.X4;
		Y4=U.Y4;
		X5=U.X5;
		Y5=U.Y5;
		TOLine_Create(OOO1,X4,Y4,1,X5,Y5,1,brn_UnLimited,"sobstv",Att1);
		U=CALCO7(X1,Y1,X2,Y2,-Dx/2,Sg1*Sg2);
		X4=U.X4;
		Y4=U.Y4;
		X5=U.X5;
		Y5=U.Y5;
		TOLine_Create(OOO2,X4,Y4,1,X5,Y5,1,brn_UnLimited,"sobstv",Att2);
    } else
	{
		if (Att1.Chk==1) TOEmpty_Create(OOO1,Att1);
		if (Att2.Chk==1) TOEmpty_Create(OOO2,Att2);
	}
	Result=true;
	return Result;
} // EExecOE


function EExecPG(out_prm1,out_prm2,in_prm1,in_prm2,Att_1,Att_2,Sg1,Sg2)
{
	if ((in_prm1.OB==undefined) || (in_prm2.OB==undefined)) return false;
	var Chisl1={C:{Re:20,Im:0},OB:"C"};
	var Chisl2={C:{Re:-85,Im:0},OB:"C"};
	var Chisl3={C:{Re:232.2,Im:0},OB:"C"};
	var Chisl4={C:{Re:0.3161,Im:0},OB:"C"};

	var Chisl5={C:{Re:5,Im:0},OB:"C"};
	var Chisl6={C:{Re:4,Im:0},OB:"C"};
	var Chisl7={C:{Re:3,Im:0},OB:"C"};
	var Chisl8={C:{Re:2,Im:0},OB:"C"};
	var Chisl9={C:{Re:1,Im:0},OB:"C"};

	var o1=new Object();
	var y1=new Object();
	var p36=new Object();
	var d1=new Object();
	var p15=new Object();
	var p5=new Object();
	var p4=new Object();
	var p3=new Object();
	var p2=new Object();
	var p1=new Object();
	var o7=new Object();
	var o6=new Object();
	var o5=new Object();
	var o4=new Object();
	var o3=new Object();
	var o2=new Object();
	var p14=new Object();
	var p12=new Object();
	var p11=new Object();
	var p10=new Object();
	var p9=new Object();
	var p8=new Object();
	var o8=new Object();
	var o9=new Object();
	var o10=new Object();
	var o11=new Object();
	var o12=new Object();
	var o13=new Object();
	var p17=new Object();
	var p16=new Object();
	var p19=new Object();
	var p18=new Object();
	var p23=new Object();
	var p22=new Object();
	var p25=new Object();
	var p24=new Object();
	var p27=new Object();
	var p26=new Object();
	var p29=new Object();
	var p28=new Object();
	var o14=new Object();
	var o15=new Object();
	var p30=new Object();
	var o16=new Object();
	var o17=new Object();
	var p31=new Object();
	var o18=new Object();
	var p32=new Object();
	var p33=new Object();
	var o19=new Object();
	var o20=new Object();
	var p34=new Object();
	var p35=new Object();
	var c2=new Object();
	var c3=new Object();
	var g1=new Object();
	var g2=new Object();
	var g5=new Object();
	var pb=new Object();
	var pa=new Object();

function Common()
{
	EExecUZ(p5,y1,Chisl5,Att0,1*Sg2,1);
	EExecUZ(p4,y1,Chisl6,Att0,1*Sg2,1);
	EExecUZ(p3,y1,Chisl7,Att0,1*Sg2,1);
	EExecUZ(p2,y1,Chisl8,Att0,1*Sg2,1);
	EExecUZ(p1,y1,Chisl9,Att0,1*Sg2,1);
	EExecO0(o7,p3,p4,Att5,1,1);
	EExecO0(o6,p3,p5,Att5,1,1);
	EExecO0(o5,p3,p1,Att5,1,1);
	EExecO0(o4,p2,p4,Att5,1,1);
	EExecO0(o3,p2,p5,Att5,1,1);
	EExecO0(o2,p2,p1,Att5,1,1);
	EExecP2(p14,o7,o1,Att0,1,1*Sg1);
	EExecP2(p12,o6,o1,Att0,1,1*Sg1);
	EExecP2(p11,o5,o1,Att0,1,1*Sg1);
	EExecP2(p10,o4,o1,Att0,1,1*Sg1);
	EExecP2(p9,o3,o1,Att0,1,1*Sg1);
	EExecP2(p8,o2,o1,Att0,1,1*Sg1);
	EExecO0(o8,p15,p14,Att5,1,1);
	EExecO0(o9,p15,p11,Att5,1,1);
	EExecO0(o10,p15,p12,Att5,1,1);
	EExecO0(o11,p15,p10,Att5,1,1);
	EExecO0(o12,p15,p9,Att5,1,1);
	EExecO0(o13,p15,p8,Att5,1,1);
	EExecP8(p17,p16,o10,d1,Att0,Att0,1,1);
	EExecP8(p19,p18,o12,d1,Att0,Att0,1,1);
	EExecP8(p23,p22,o9,d1,Att0,Att0,1,1);
	EExecP8(p25,p24,o13,d1,Att0,Att0,1,1);
	EExecP8(p27,p26,o8,d1,Att0,Att0,1,1);
	EExecP8(p29,p28,o11,d1,Att0,Att0,1,1);
	EExecO0(o14,p16,p24,Att5,1,1);
	EExecO0(o15,p18,p22,Att5,1,1);
	EExecP2(p30,o14,o15,Att0,1,1);
	EExecO0(o16,p16,p28,Att5,1,1);
	EExecO0(o17,p18,p26,Att5,1,1);
	EExecP2(p31,o16,o17,Att0,1,1);
	EExecO0(o18,p30,p31,Att5,1,1);
	EExecP8(p32,p33,o18,d1,Att0,Att0,1,1);
	EExecO0(o19,p15,p32,Att5,1,1);
	EExecO0(o20,p15,p33,Att5,1,1);
	EExecP2(p34,o19,o1,Att0,1,1*Sg1);
	EExecP2(p35,o20,o1,Att0,1,1*Sg1);
	EExecCX(c2,p34,o1,Att0,1,1*Sg1);
	EExecCX(c3,p35,o1,Att0,1,1*Sg1);
	EExecG5(g1,c2,c3,Att0,1,1);
	EExecG2(g2,g1,Att0,1);
	EExecGR(g5,p34,Att0,1);

	var pb_=new Array();
	{pb_.push(p35,g1,p34,g2,p35,g5); EExecG3(pb,pb_,Att0)}
	var pa_=new Array();
	{pa_.push(p34,g1,p35,g2,p34,g5); EExecG3(pa,pa_,Att0)}
} // Common

	
	Result=true;
    CreateCopy(o1,in_prm1);
    o1.FAtt=CopyAtt(in_prm1.FAtt);

    CreateCopy(y1,in_prm2);
    y1.FAtt=CopyAtt(in_prm2.FAtt);

	EExecP0(p36,Chisl1,Chisl2,Att0,1,1);
	EExecD0(d1,p36,Chisl3,Att0,1,1);
	EExecP9(p15,d1,Chisl4,Att0,1,1);
	Common();
	
    if (pa.OB=="$")
    {
		var Chisl5={C:{Re:5,Im:0},OB:"C"};
		var Chisl6={C:{Re:4,Im:0},OB:"C"};
		var Chisl7={C:{Re:1,Im:0},OB:"C"};
		var Chisl8={C:{Re:2,Im:0},OB:"C"};
		var Chisl9={C:{Re:3,Im:0},OB:"C"};
		Common();
	}

    if (pa.OB=="$")
    {
		var Chisl5={C:{Re:1,Im:0},OB:"C"};
		var Chisl6={C:{Re:5,Im:0},OB:"C"};
		var Chisl7={C:{Re:4,Im:0},OB:"C"};
		var Chisl8={C:{Re:2,Im:0},OB:"C"};
		var Chisl9={C:{Re:3,Im:0},OB:"C"};
		Common();
	}

    if (pa.OB=="$")
    {
		var Chisl5={C:{Re:1,Im:0},OB:"C"};
		var Chisl6={C:{Re:5,Im:0},OB:"C"};
		var Chisl7={C:{Re:4,Im:0},OB:"C"};
		var Chisl8={C:{Re:3,Im:0},OB:"C"};
		var Chisl9={C:{Re:2,Im:0},OB:"C"};
		Common();
	}

    CreateCopy(out_prm1,pa);
    out_prm1.FAtt=CopyAtt(Att_1);

    CreateCopy(out_prm2,pb);
    out_prm2.FAtt=CopyAtt(Att_2);

	AddInc(out_prm1,in_prm1);
	AddInc(out_prm2,in_prm1);
	AddInc(out_prm1,in_prm2);
	AddInc(out_prm2,in_prm2);

    Result=true;
	return Result;
} // EExecPG

function Duga_Param(Dug,OB)
{
	var X,Df,SCDP,Dx,Dx1,Df1,Df2,Df3;
	
	SCDP=SC(Dug.Xc.Re,Dug.Yc.Re,OB.X.Re,OB.Y.Re);

	if ((Dug.Vid==circ_full) || (Dug.Vid==drw_Empty) || (Dug.Vid==drw_Incidented)) 
	{
		Df=Fi(0,1,SCDP.S,SCDP.C);
		Result=true;
		if (Df<0) Df=Df+2*Math.PI;
		X=Df/2/Math.PI;
		if (Dug.R.Re<0) X=1-X;
		return X;
	}

	if (Dug.Vid==0) 
	{
		if (Dug.R.Re>0)
		{
			SCDP=SC(Dug.Xc.Re,Dug.Yc.Re,Dug.X1,Dug.Y1);
			Df1=Fi(0,1,SCDP.S,SCDP.C);
			if (Df1<0) Df1=2*Math.PI+Df1;
			SCDP=SC(Dug.Xc.Re,Dug.Yc.Re,Dug.X2,Dug.Y2);
			Df2=Fi(0,1,SCDP.S,SCDP.C);
			if (Df2<0) Df2=2*Math.PI+Df2;
			if (Df2<=Df1) Df2=Df2+2*Math.PI;
			Dx=(Df2-Df1)/Math.PI*180;
			SCDP=SC(Dug.Xc.Re,Dug.Yc.Re,OB.X.Re,OB.Y.Re);
			Df3=Fi(0,1,SCDP.S,SCDP.C);
			if (Df3<0) Df3=2*Math.PI+Df3;
			if (Df3<Df1) Df3=Df3+2*Math.PI;
			Dx1=(Df3-Df1)/Math.PI*180;
			X=Dx1/Dx;
		} else
		{
			SCDP=SC(Dug.Xc.Re,Dug.Yc.Re,Dug.X2,Dug.Y2);
			Df1=Fi(0,1,SCDP.S,SCDP.C);
			if (Df1<0) Df1=2*Math.PI+Df1;
			SCDP=SC(Dug.Xc.Re,Dug.Yc.Re,Dug.X1,Dug.Y1);
			Df2=Fi(0,1,SCDP.S,SCDP.C);
			if (Df2<0) Df2=2*Math.PI+Df2;
			if (Df2<Df1) Df2=Df2+2*Math.PI;
			Dx=(Df2-Df1)/Math.PI*180;
			SCDP=SC(Dug.Xc.Re,Dug.Yc.Re,OB.X.Re,OB.Y.Re);
			Df3=Fi(0,1,SCDP.S,SCDP.C);
			if (Df3<0) Df3=2*Math.PI+Df3;
			if (Df3<Df1) Df3=Df3+2*Math.PI;
			Dx1=(Df3-Df1)/Math.PI*180;
			X=1-Dx1/Dx;
		}
		return X;
	}

	if (Dug.Vid==2) 
	{
		if (Dug.R.Re<0)
		{
			SC(Dug.Xc.Re,Dug.Yc.Re,Dug.X1,Dug.Y1);
			Df1=Fi(0,1,SCDP.S,SCDP.C);
			if (Df1<0) Df1=2*Math.PI+Df1;
			SC(Dug.Xc.Re,Dug.Yc.Re,Dug.X2,Dug.Y2);
			Df2=Fi(0,1,SCDP.S,SCDP.C);
			if (Df2<0) Df2=2*Math.PI+Df2;
			if (Df2<=Df1) Df2=Df2+2*Math.PI;
			Dx=(Df2-Df1)/Math.PI*180;
			SC(Dug.Xc.Re,Dug.Yc.Re,OB.X.Re,OB.Y.Re);
			Df3=Fi(0,1,SCDP.S,SCDP.C);
			if (Df3<0) Df3=2*Math.PI+Df3;
			if (Df3<Df1) Df3=Df3+2*Math.PI;
			Dx1=(Df3-Df1)/Math.PI*180;
			X=1-Dx1/Dx;
		} else
		{
			SC(Dug.Xc.Re,Dug.Yc.Re,Dug.X2,Dug.Y2);
			Df1=Fi(0,1,SCDP.S,SCDP.C);
			if (Df1<0) Df1=2*Math.PI+Df1;
			SC(Dug.Xc.Re,Dug.Yc.Re,Dug.X1,Dug.Y1);
			Df2=Fi(0,1,SCDP.S,SCDP.C);
			if (Df2<0) Df2=2*Math.PI+Df2;
			if (Df2<Df1) Df2=Df2+2*Math.PI;
			Dx=(Df2-Df1)/Math.PI*180;
			SC(Dug.Xc.Re,Dug.Yc.Re,OB.X.Re,OB.Y.Re);
			Df3=Fi(0,1,SCDP.S,SCDP.C);
			if (Df3<0) Df3=2*Math.PI+Df3;
			if (Df3<Df1) Df3=Df3+2*Math.PI;
			Dx1=(Df3-Df1)/Math.PI*180;
			X=Dx1/Dx;
		}
		return X;
	}
} // Duga_Param

function MyParam(T,OB)
{
	var Par=undefined;

	if (T.OB=="O")
	{
//		if NULL then Exit;
		if (!IsReal(T)) return Par;
		if (!(OB.OB=="P")) return Par;
		if (!IsReal(OB)) return Par;

		var A = {Re:0, Im:0}
		var B = {Re:0, Im:0}
		
		AB=CalcPF_A(T.X1,T.Y1,T.X2,T.Y2,OB.X,OB.Y);
		A=AB.A;
		B=AB.B;
		
		if (Math.abs(T.X1.Re-T.X2.Re)>Eps) 
		{
			Par=(A.Re-T.X1.Re)/(T.X2.Re-T.X1.Re);
		}
		else
			Par=(B.Re-T.Y1.Re)/(T.Y2.Re-T.Y1.Re);
		return Par;
	}
	
	if (T.OB=="D")
	{
		if (IsNull(T)) return Par;
		if (!(OB.OB=="P")) return Par;

		if (!IsReal(OB)) return Par;
		if (!PointBelongs(T,OB.X.Re,OB.Y.Re)) return Par;
		Par=Duga_Param(T,OB);
		return Par;
	}	
} // MyParam 


function EExecCX(OOO,X,Y,Att,Sg1,Sg2)
{     
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	Result=false;
	Par=MyParam(Y,X);
	if (!(Par==undefined)) {TOChisl_Create(OOO,MCompl(Par*Sg2,0),Att)} else {TOEmpty_Create(OOO,Att)}
	
    Result=true;
	return Result;
} // EExecCX

function EExecGR(OOO,X,Att,Sg1)
{
	if (X.OB==undefined) return false;
	A=!IsReal(X);
    if (Sg1==-1) A=!A;
	TOUsl_Create(OOO,A,Att);
	Result=true;
	return Result;
} // EExecGR

function EExecPL(Out_Prm,V,Att,Sg1)
{  
	if (V.OB==undefined) return false;
	Result=false;
	if (V.OB=="C") 
	{
		A=V.C.Re;
		if (Sg1==-1) A=A*Sg1;
		TOPoint_Create(Out_Prm,MCompl(Math.cos(A/180*Math.PI),0),MCompl(Math.sin(A/180*Math.PI),0),0,Att);
		Result=true;
		return Result;
	}

	if (V.OB=="P")
	{
		if (IsSobstv(V)) 
		{
			if (Att.Chk==1) TOEmpty_Create(Out_Prm,Att);
			Result=true;
			return Result;
		}
		TOPoint_Create(Out_Prm,V.X,V.Y,0,Att);
		Result=true;
		return Result;
	}

	if (V.OB=="O") 
	{
		if (Sg1==1) 
		{SCDL=SC(V.X1.Re,V.Y1.Re,V.X2.Re,V.Y2.Re)} else
		{SCDL=SC(V.X2.Re,V.Y2.Re,V.X1.Re,V.Y1.Re)}
		Df=Fi(0,1,SCDL.S,SCDL.C);

		if (Df<0) Df=2*Math.PI+Df;

		Df=Df*180/Math.PI;
		
		TOPoint_Create(Out_Prm,MCompl(100*Math.cos(Df/180*Math.PI),0),MCompl(100*Math.sin(Df/180*Math.PI),0),0,Att);

		AddInc(V,Out_Prm);
		Result=true;
		return Result;
	}

	if (Att.Chk==1) TOEmpty_Create(Out_Prm,Att);

	Result=true;
	return Result;

} // EExecPL

function EExecP5(Out_Prm1,X,Z,Y,U,Att,Sg1,Sg2,Sg3,Sg4)
{
	if ((X.OB==undefined) || (Y.OB==undefined) || (Z.OB==undefined) || (U.OB==undefined)) return false;
	A = {Re:0, Im:0}
	B = {Re:0, Im:0}
	M = {Re:0, Im:0}
	N = {Re:0, Im:0}
	Result=false;
/*
     if (Att.PT=8) or (Att.LV=8) or (Att.LT=6) then
     begin
          Att.RColor X.OAtt.RColor;
          Att.GColor X.OAtt.GColor;
          Att.BColor X.OAtt.BColor;
     end;
*/
	if (Att.Pt==8) Att.Pt=X.FAtt.Pt;
	if (Att.Lv==8) Att.Lv=X.FAtt.Lv;
	if (Att.Lt==6) Att.Lt=X.FAtt.Lt;
	if ((X.OB=="P") && (Y.OB=="O") && (Z.OB=="C") && (U.OB=="C"))
	{
		if ((IsSobstv(X)) && (IsSobstv(Y)))
		if ((IsReal(X)) && (IsReal(Y)))
		{
			A=X.X;
			B=X.Y;
			if (Sg3==1) 
			{SCDL=SC(Y.X1.Re,Y.Y1.Re,Y.X2.Re,Y.Y2.Re)} else
			{SCDL=SC(Y.X2.Re,Y.Y2.Re,Y.X1.Re,Y.Y1.Re)}
			Df=Fi(0,1,SCDL.S,SCDL.C);

			Value=Math.PI/180*U.C.Re*Sg4+Df;
			M.Re=A.Re+Z.C.Re*Sg2*Math.cos(Value);
			N.Re=B.Re+Z.C.Re*Sg2*Math.sin(Value);
			M.Im=0; N.Im=0;
			TOPoint_Create(Out_Prm1,M,N,1,Att);

		} else if (Att.Chk==1) TOEmpty_Create(Out_Prm1,Att);
	} else if (Att.Chk==1) TOEmpty_Create(Out_Prm1,Att);

	Result=true;
	return Result;
} // EExecP5 

function EExecY6(out_prm1,in_prm1,in_prm2,Att_polara,Sg1,Sg2)
{
	if ((in_prm1.OB==undefined) || (in_prm2.OB==undefined)) return false;

function For_Point(OutP,Inp)
{
	var Chisl1={C:{Re:5,Im:0},OB:"C"};
	var Chisl2={C:{Re:4,Im:0},OB:"C"};
	var Chisl3={C:{Re:3,Im:0},OB:"C"};
	var Chisl4={C:{Re:2,Im:0},OB:"C"};
	var Chisl5={C:{Re:1,Im:0},OB:"C"};
	var Chisl6={C:{Re:0.5129,Im:0},OB:"C"};
	var Chisl7={C:{Re:0.4454,Im:0},OB:"C"};

	var Chisla={C:{Re:0,Im:0},OB:"C"};
	var Chislb={C:{Re:0.2,Im:0},OB:"C"};
	var Chislc={C:{Re:0.4,Im:0},OB:"C"};
	var Chisle={C:{Re:0.6,Im:0},OB:"C"};
	var Chisld={C:{Re:0.8,Im:0},OB:"C"};

	var point=new Object();
	var conica=new Object();
	var p1=new Object();
	var p2=new Object();
	var p3=new Object();
	var p4=new Object();
	var p5=new Object();

	CreateCopy(point,Inp);
	point.FAtt=CopyAtt(Att0);

	CreateCopy(conica,in_prm2);
	conica.FAtt=CopyAtt(Att0);


	if (conica.OB=="Y") 
	{
	   EExecUZ(p5,conica,Chisl1,Att0,1*Sg2,1);
	   EExecUZ(p4,conica,Chisl2,Att0,1*Sg2,1);
	   EExecUZ(p3,conica,Chisl3,Att0,1*Sg2,1);
	   EExecUZ(p2,conica,Chisl4,Att0,1*Sg2,1);
	   EExecUZ(p1,conica,Chisl5,Att0,1*Sg2,1);
	}

	if (conica.OB=="D")
	{
	   EExecP9(p5,conica,Chisla,Att0,1*Sg2,1);
	   EExecP9(p4,conica,Chislb,Att0,1*Sg2,1);
	   EExecP9(p3,conica,Chislc,Att0,1*Sg2,1);
	   EExecP9(p2,conica,Chisld,Att0,1*Sg2,1);
	   EExecP9(p1,conica,Chisle,Att0,1*Sg2,1);
	   Conica.Vid=circ_Full;
	}

	if (conica.OB=="$") 
	{
	   TOEmpty_Create(p1,Att0);
	   TOEmpty_Create(p2,Att0);
	   TOEmpty_Create(p3,Att0);
	   TOEmpty_Create(p4,Att0);
	   TOEmpty_Create(p5,Att0);
	}	
	
	var o2=new Object();
	var o1=new Object();
	var p8=new Object();
	var p7=new Object();
	var o4=new Object();
	var o3=new Object();

	EExecO0(o2,p2,p3,Att5,1,1);
	EExecO0(o1,p1,p2,Att5,1,1);
	EExecP9(p8,o2,Chisl6,Att0,1,1);
	EExecP9(p7,o1,Chisl7,Att0,1,1);
	EExecO0(o4,point,p1,Att5,1*Sg1,1);
	EExecO0(o3,point,p3,Att5,1*Sg1,1);

	var p9=new Object();
	var p10=new Object();
	var p11=new Object();
	var p12=new Object();

	if (conica.OB=="Y")
	{
//		BSysVar.AllowComplex;
		EExecPG(p9,p10,o3,conica,Att0,Att0,1,Sg2);

		if ((p9.OB=="$") || (p10.OB=="$"))
		{
			EExecO5(o3,o2,point,Chisle,Att5,1,1,1);
			EExecPG(p9,p10,o3,conica,Att0,Att0,1,Sg2);
		}

		EExecPG(p11,p12,o4,conica,Att0,Att0,1,Sg2);
		if ((p11.OB=="$") ||  (p12.OB=="$")) 
		{
			EExecO5(o4,o1,point,Chisle,Att5,1,1,1);
			EExecPG(p11,p12,o4,conica,Att0,Att0,1,Sg2);
		}
//		SysVar.AllowComplexB;
	}

	if (conica.OB=="D")
	{
		EExecP6(p9,p10,o3,conica,Att0,Att0,1,Sg2);
		EExecP6(p11,p12,o4,conica,Att0,Att0,1,Sg2);
	}

	if (conica.OB=="$")
	{
	   TOEmpty_Create(P9,Att0);
	   TOEmpty_Create(P10,Att0);
	   TOEmpty_Create(P11,Att0);
	   TOEmpty_Create(P12,Att0);
	}
	var o8=new Object();
	var o7=new Object();
	var o6=new Object();
	var o5=new Object();
	var p15=new Object();
	var p13=new Object();
	var polara=new Object();

	EExecO0(o8,p11,p9,Att5,1,1);
	EExecO0(o7,p10,p12,Att5,1,1);
	EExecO0(o6,p12,p9,Att5,1,1);
	EExecO0(o5,p10,p11,Att5,1,1);
	EExecP2(p15,o7,o8,Att0,1,1);
	EExecP2(p13,o5,o6,Att0,1,1);
	Att_polara.Lv=5;
	EExecO0(polara,p13,p15,Att_polara,1,1);

	CreateCopy(OutP,polara);
	OutP.FAtt=CopyAtt(Att_polara);
	Result=true;
	return Result;	
	
} // ForPoint

	var OutP=new Object();
	if (in_prm1.OB=="P")
	{
		For_Point(OutP,in_prm1);
		CreateCopy(out_prm1,OutP);
		out_prm1.FAtt=CopyAtt(Att5);
		Result=true;
		return Result;
	}

	if(in_prm1.OB=="O")
	{
		var C1={C:{Re:0.1,Im:0},OB:"C"};
		var C2={C:{Re:0.9,Im:0},OB:"C"};
		var C3={C:{Re:1,Im:0},OB:"C"};
		var C4={C:{Re:89,Im:0},OB:"C"};

		var P1=new Object();
		var P2=new Object();
		
		if (in_prm1.OB=="O") if (in_prm1.Vid=="nesobstv") 
		{
			EExecPL(P1,C3,Att5,1);
			EExecPL(P2,C4,Att5,1);
		} else
		{
			EExecP9(P1,in_prm1,C1,Att5,1,1);
			EExecP9(P2,in_prm1,C2,Att5,1,1);
		}
		var OutPA=new Object();
		var OutPB=new Object();

		For_Point(OutPA,P1);
		For_Point(OutPB,P2);
		EExecP2(OutP,OutPA,OutPB,Att5,1,1);

		CreateCopy(out_prm1,OutP);
		out_prm1.FAtt=CopyAtt(Att5);

		Result=true;
		return Result;
	}

	if (in_prm1.OB=="Y")
	{
		var OutPA=new Object();
		var OutPB=new Object();
		var OutPC=new Object();
		var OutPD=new Object();
		var OutPE=new Object();
		
		For_Point(OutPA,in_prm1.PR1);
		For_Point(OutPB,in_prm1.PR2);
		For_Point(OutPC,in_prm1.PR3);
		For_Point(OutPD,in_prm1.PR4);
		For_Point(OutPE,in_prm1.PR5);
		
		EExecY5(OutP,OutPA,OutPB,OutPC,OutPD,OutPE,Att5,1,1,1,1,1);
		CreateCopy(out_prm1,OutP);
		out_prm1.FAtt=CopyAtt(Att5);

		Result=true;
		return Result;
	}

	if (in_prm1.OB=="D")
	{
		var C1={C:{Re:0,Im:0},OB:"C"};
		var C2={C:{Re:0.2,Im:0},OB:"C"};
		var C3={C:{Re:0.4,Im:0},OB:"C"};
		var C4={C:{Re:0.6,Im:0},OB:"C"};
		var C5={C:{Re:0.8,Im:0},OB:"C"};

		in_prm1.Vid=circ_full;

		var P1=new Object();
		var P2=new Object();
		var P3=new Object();
		var P4=new Object();
		var P5=new Object();
		var OutPA=new Object();
		var OutPB=new Object();
		var OutPC=new Object();
		var OutPD=new Object();
		var OutPE=new Object();

		EExecP9(P1,in_prm1,C1,Att5,1,1);
		EExecP9(P2,in_prm1,C2,Att5,1,1);
		EExecP9(P3,in_prm1,C3,Att5,1,1);
		EExecP9(P4,in_prm1,C4,Att5,1,1);
		EExecP9(P5,in_prm1,C5,Att5,1,1);

		For_Point(OutPA,P1);
		For_Point(OutPB,P2);
		For_Point(OutPC,P3);
		For_Point(OutPD,P4);
		For_Point(OutPE,P5);

		EExecY5(OutP,OutPA,OutPB,OutPC,OutPD,OutPE,Att5,1,1,1,1,1);
		CreateCopy(out_prm1,OutP);
		out_prm1.FAtt=CopyAtt(Att5);

		Result=true;
		return Result;
	}
	
	if (Att_polara.Chk==1) TOEmpty_Create(Out_Prm1,Att_polara);
	Result=true;
	return Result;
} // EExecY6

function EExecOY(out_prm1,out_prm2,in_prm1,Att_1,Att_2,Sg1)
{
	if (in_prm1.OB==undefined) return false;

	var ppp1=new Object();
	var ppp2=new Object();
	var ppp3=new Object();
	var ppp4=new Object();
	var ppp5=new Object();
	var x1=new Object();
	var x2=new Object();
	var x3=new Object();
	var o1=new Object();
	var o2=new Object();
	var p6=new Object();
	var p7=new Object();
	var p8=new Object();
	var a=new Object();
	var b=new Object();
	var a_shtrih=new Object();
	var b_shtrih=new Object();
	var p9=new Object();
	var d1=new Object();
	var p10=new Object();
	var p11=new Object();
	var p12=new Object();
	var p13=new Object();
	var o3=new Object();
	var p14=new Object();
	var p15=new Object();
	var p16=new Object();
	var p17=new Object();
	var o4=new Object();
	var p18=new Object();
	var o5=new Object();
	var p19=new Object();
	var p20=new Object();
	var o7=new Object();
	var o8=new Object();
	var p21=new Object();
	var p22=new Object();
	var p23=new Object();
	var p24=new Object();
	var g1=new Object();
	var g2=new Object();
	var oo8=new Object();
	var g3=new Object();
	var g4=new Object();
	var oo7=new Object();
	var iline=new Object();
	var y1=new Object();

	if (in_prm1.OB=="Y")
	{
		var Chisl1={C:{Re:-293.5,Im:0},OB:"C"};
		var Chisl2={C:{Re:-52.5,Im:0},OB:"C"};
		var Chisl3={C:{Re:-188.8,Im:0},OB:"C"};
		var Chisl4={C:{Re:-20.9,Im:0},OB:"C"};
		var Chisl5={C:{Re:-81.5,Im:0},OB:"C"};
		var Chisl6={C:{Re:69.5,Im:0},OB:"C"};
		var Chisl7={C:{Re:-22.5,Im:0},OB:"C"};
		var Chisl8={C:{Re:-20.5,Im:0},OB:"C"};
		var Chisl9={C:{Re:-111.5,Im:0},OB:"C"};
		var Chisl10={C:{Re:-106.5,Im:0},OB:"C"};

		AA=new Array(5)
		AA[1]=1; AA[2]=2;  AA[3]=3;  AA[4]=4;  AA[5]=5;

		if (in_prm1.PR1.W==0) AA[1]=6;
		if (in_prm1.PR2.W==0) AA[2]=6;
		if (in_prm1.PR3.W==0) AA[3]=6;
		if (in_prm1.PR4.W==0) AA[4]=6;
		if (in_prm1.PR5.W==0) AA[5]=6;
		

		do
		{
			Success=false;
			for (I=1; I<=4; I++) 
			{
				if (AA[I]>AA[I+1]) 
				{
					BB=AA[I];
					AA[I]=AA[I+1];
					AA[I+1]=BB;
					Success=true;
				}
		   }
		}
		while (Success);

		var Chisl11={C:{Re:AA[1],Im:0},OB:"C"};
		var Chisl12={C:{Re:AA[2],Im:0},OB:"C"};
		var Chisl13={C:{Re:AA[3],Im:0},OB:"C"};
		var Chisl14={C:{Re:0,Im:0},OB:"C"};
		var Chisl15={C:{Re:0,Im:0},OB:"C"};
		var Chisl16={C:{Re:-87.56,Im:0},OB:"C"};
		var Chisl17={C:{Re:-109.9,Im:0},OB:"C"};

		Result=true;
		
		CreateCopy(y1,in_prm1);
		y1.FAtt=CopyAtt(in_prm1.FAtt);

		TOLine_Create(iline,MCompl(0,0),MCompl(1,0),0,MCompl(1,0),MCompl(0,0),0,brn_Limited,"nesobstv",Att5);


		EExecP0(ppp1,Chisl1,Chisl2,Att0,1,1);
		EExecP0(ppp2,Chisl3,Chisl4,Att0,1,1);
		EExecP0(ppp3,Chisl5,Chisl6,Att0,1,1);
		EExecP0(ppp4,Chisl7,Chisl8,Att0,1,1);
		EExecP0(ppp5,Chisl9,Chisl10,Att0,1,1);
		EExecUZ(x1,y1,Chisl11,Att0,1*Sg1,1);
		EExecUZ(x2,y1,Chisl12,Att0,1*Sg1,1);
		EExecUZ(x3,y1,Chisl13,Att0,1*Sg1,1);
		EExecO0(o1,x1,x2,Att0,1,1);
		EExecO0(o2,x3,x2,Att0,1,1);
		EExecPP(p6,x2,x3,Att0,1,1);
		EExecPP(p7,x1,x2,Att0,1,1);
		EExecY6(p8,iline,y1,Att0,1,1*Sg1);
		EExecO0(a,p8,p6,Att5,1,1);
		EExecO0(b,p8,p7,Att5,1,1);
		EExecO5(a_shtrih,o2,p8,Chisl14,Att5,1,1,1);
		EExecO5(b_shtrih,o1,p8,Chisl15,Att5,1,1,1);
		EExecP1(p9,p8,Chisl16,Chisl17,Att0,1,1,1);
		EExecD1(d1,p9,p8,Att0,1,1);
		EExecP8(p10,p11,a,d1,Att0,Att0,1,1);
		EExecP8(p12,p13,a_shtrih,d1,Att0,Att0,1,1);
		EExecO0(o3,p13,p11,Att5,1,1);
		EExecP8(p14,p15,b,d1,Att0,Att0,1,1);
		EExecP8(p16,p17,b_shtrih,d1,Att0,Att0,1,1);
		EExecO0(o4,p15,p17,Att5,1,1);
		EExecP2(p18,o3,o4,Att0,1,1);
		EExecO0(o5,p9,p18,Att5,1,1);
		EExecP6(p19,p20,o5,d1,Att0,Att0,1,1);
		EExecO0(o7,p8,p19,Att5,1,1);
		EExecO0(o8,p8,p20,Att5,1,1);
		EExecPG(p21,p22,o8,y1,Att0,Att0,1,1*Sg1);
		EExecPG(p23,p24,o7,y1,Att0,Att0,1,1*Sg1);
		EExecGR(g1,p21,Att0,1);
		EExecG2(g2,g1,Att0,1);
		var oo8_=new Array();
		{oo8_.push(iline,g1,o8,g2); EExecG3(oo8,oo8_,Att5)}

		EExecGR(g3,p23,Att0,1);
		EExecG2(g4,g3,Att0,1);

		var oo7_=new Array();
		{oo7_.push(iline,g3,o7,g4); EExecG3(oo7,oo7_,Att5)}


		CreateCopy(out_prm1,oo7);
		out_prm1.FAtt=CopyAtt(Att_1);

		CreateCopy(out_prm2,oo8);
		out_prm2.FAtt=CopyAtt(Att_2);
	} else
	{
		TOEmpty_Create(out_prm1,Att_1);
		TOEmpty_Create(out_prm2,Att_2);
	}
	Result=true;
	return Result;
	
} // EExecOY

function EExecYA(out_prm1,out_prm2,out_prm3,out_prm4,in_prm1,Att_1,Att_2,Att_3,Att_4,Sg1)
{
	if (in_prm1.OB==undefined) return false;
	var Chisl1={C:{Re:422.5,Im:0},OB:"C"};
	var Chisl2={C:{Re:20,Im:0},OB:"C"};
	var Chisl3={C:{Re:511.5,Im:0},OB:"C"};
	var Chisl4={C:{Re:106,Im:0},OB:"C"};
	var Chisl5={C:{Re:452.5,Im:0},OB:"C"};
	var Chisl6={C:{Re:196,Im:0},OB:"C"};
	var Chisl7={C:{Re:266.5,Im:0},OB:"C"};
	var Chisl8={C:{Re:176,Im:0},OB:"C"};
	var Chisl9={C:{Re:240.5,Im:0},OB:"C"};
	var Chisl10={C:{Re:74,Im:0},OB:"C"};
	var rect={C:{Re:90,Im:0},OB:"C"};
	var Chisl12={C:{Re:2.5,Im:0},OB:"C"};
	
	var Chisl13={C:{Re:-124,Im:0},OB:"C"};
	var Chisl14={C:{Re:91.5,Im:0},OB:"C"};
	var Chisl15={C:{Re:-38,Im:0},OB:"C"};
	var Chisl16={C:{Re:32.5,Im:0},OB:"C"};
	var Chisl17={C:{Re:52,Im:0},OB:"C"};
	var Chisl18={C:{Re:-93,Im:0},OB:"C"};
	var Chisl19={C:{Re:-81.5,Im:0},OB:"C"};
	var Chisl20={C:{Re:-179.5,Im:0},OB:"C"};
	var Chisl21={C:{Re:-70,Im:0},OB:"C"};

	var y1=new Object();

	Result=true;
	
	CreateCopy(y1,in_prm1);
	y1.FAtt=CopyAtt(in_prm1.FAtt);

	var p10=new Object();
	var p9=new Object();
	var p8=new Object();
	var p7=new Object();
	var p6=new Object();
	var y2=new Object();
	var o1=new Object();
	var o2=new Object();
	var p14=new Object();
	var p15=new Object();
	var o6=new Object();
	var o5=new Object();
	var p12=new Object();
	var p13=new Object();
	var o8=new Object();
	var o7=new Object();
	var p11=new Object();
	var p5=new Object();
	var p4=new Object();
	var p3=new Object();
	var p2=new Object();
	var p1=new Object();
	var o3=new Object();
	var o4=new Object();
	var p19=new Object();
	var p20=new Object();
	var p17=new Object();
	var p18=new Object();
	var Gc1=new Object();
	var o12=new Object();
	var o11=new Object();
	var o10=new Object();
	var o9=new Object();
	var p16=new Object();
	
	
	EExecP0(p10,Chisl1,Chisl2,Att0,1,1);
	EExecP0(p9,Chisl3,Chisl4,Att0,1,1);
	EExecP0(p8,Chisl5,Chisl6,Att0,1,1);
	EExecP0(p7,Chisl7,Chisl8,Att0,1,1);
	EExecP0(p6,Chisl9,Chisl10,Att0,1,1);
	EExecY0(y2,p6,p7,p8,p9,p10,Att0,1,1,1,1,1);
	EExecOY(o1,o2,y2,Att5,Att5,1);
	EExecPG(p14,p15,o2,y2,Att0,Att0,1,1);
	EExecO5(o6,o2,p14,rect,Att0,1,1,1);
	EExecO5(o5,o2,p15,rect,Att0,1,1,1);
	EExecPG(p12,p13,o1,y2,Att0,Att0,1,1);
	EExecO5(o8,o1,p13,rect,Att0,1,1,1);
	EExecO5(o7,o1,p12,rect,Att0,1,1,1);
	EExecPA(p11,y2,Att0,1);
	EExecP0(p5,Chisl12,Chisl13,Att0,1,1);
	EExecP0(p4,Chisl14,Chisl15,Att0,1,1);
	EExecP0(p3,Chisl16,Chisl17,Att0,1,1);
	EExecP0(p2,Chisl18,Chisl19,Att0,1,1);
	EExecP0(p1,Chisl20,Chisl21,Att0,1,1);
	EExecOY(o3,o4,y1,Att5,Att5,1*Sg1);
	EExecPG(p19,p20,o4,y1,Att0,Att0,1,1*Sg1);
	EExecPG(p17,p18,o3,y1,Att0,Att0,1,1*Sg1);
	EExecK0(Gc1,p15,p12,p14,p13,p18,p19,p17,p20,Att0,1,1,1,1,1,1,1,1);
	EExecKU(o9,Gc1,o5,Att5,1,1);
	EExecKU(o12,Gc1,o8,Att5,1,1);
	EExecKU(o11,Gc1,o7,Att5,1,1);
	EExecKU(o10,Gc1,o6,Att5,1,1);
	EExecPA(p16,y1,Att0,1*Sg1);

	CreateCopy(out_prm1,o9);
	out_prm1.FAtt=CopyAtt(Att_1);
	out_prm1.OB="O";

	CreateCopy(out_prm2,o10);
	out_prm2.FAtt=CopyAtt(Att_2);

	CreateCopy(out_prm3,o12);
	out_prm3.FAtt=CopyAtt(Att_3)

	CreateCopy(out_prm4,o11);
	out_prm4.FAtt=CopyAtt(Att_4);

	Result=true;
	return Result;
	
} // EExecYA


function EExecYY(out_prm1,out_prm2,out_prm3,out_prm4,in_prm1,in_prm2,Att_1,Att_2,Att_3,Att_4,Sg1,Sg2)
{
	if ((in_prm1.OB==undefined) || (in_prm2.OB==undefined)) return false;

	var Chisl1={C:{Re:161.7,Im:0},OB:"C"};
	var Chisl2={C:{Re:142.7,Im:0},OB:"C"};
	var Chisl3={C:{Re:-37.3,Im:0},OB:"C"};
	var Chisl4={C:{Re:167.7,Im:0},OB:"C"};
	var Chisl5={C:{Re:203.7,Im:0},OB:"C"};
	var Chisl6={C:{Re:210.7,Im:0},OB:"C"};
	var Chisl7={C:{Re:-183.7,Im:0},OB:"C"};
	var Chisl8={C:{Re:250.6,Im:0},OB:"C"};
	var Chisl9={C:{Re:-174.4,Im:0},OB:"C"};
	var Chisl10={C:{Re:221.9,Im:0},OB:"C"};
	var Chisl11={C:{Re:0,Im:0},OB:"C"};
	var Chisl12={C:{Re:0,Im:0},OB:"C"};
	var Chisl13={C:{Re:100,Im:0},OB:"C"};
	var Chisl14={C:{Re:136,Im:0},OB:"C"};
	var Chisl15={C:{Re:57,Im:0},OB:"C"};
	var Chisl16={C:{Re:225,Im:0},OB:"C"};
	var Chisl17={C:{Re:143,Im:0},OB:"C"};
	var Chisl18={C:{Re:170.2,Im:0},OB:"C"};
	var Chisl19={C:{Re:251.3,Im:0},OB:"C"};
	var Chisl20={C:{Re:-20,Im:0},OB:"C"};
	var Chisl21={C:{Re:213,Im:0},OB:"C"};
	var Chisl22={C:{Re:-46,Im:0},OB:"C"};
	var Chisl23={C:{Re:111,Im:0},OB:"C"};
	var Chisl24={C:{Re:90,Im:0},OB:"C"};
	var Chisl25={C:{Re:0,Im:0},OB:"C"};
	var ChislA={C:{Re:0,Im:0},OB:"C"};
	var ChislB={C:{Re:0.2,Im:0},OB:"C"};
	var ChislC={C:{Re:0.4,Im:0},OB:"C"};
	var ChislD={C:{Re:0.6,Im:0},OB:"C"};
	var ChislE={C:{Re:0.8,Im:0},OB:"C"};

	var y1=new Object();
	var y2=new Object();
	var p1=new Object();
	var p2=new Object();
	var p3=new Object();
	var p4=new Object();
	var p5=new Object();
	var p10=new Object();
	var p9=new Object();
	var p8=new Object();
	var p7=new Object();
	var p6=new Object();
	var p5=new Object();
	var d1=new Object();
	var p16=new Object();
	var o4=new Object();
	var o3=new Object();
	var o1=new Object();
	var o2=new Object();
	var pcc=new Object();
	var p11=new Object();
	var p19=new Object();
	var p20=new Object();
	var p17=new Object();
	var p18=new Object();
	var p14=new Object();
	var p15=new Object();
	var p12=new Object();
	var p13=new Object();
	var ksi1=new Object();
	var x1=new Object();
	var x2=new Object();
	var x3=new Object();
	var x4=new Object();
	var x5=new Object();
	var p21=new Object();
	var p22=new Object();
	var p23=new Object();
	var p24=new Object();

	Result=true;

	if (in_prm1.OB=="Y")
	{
		CreateCopy(y1,in_prm1);
		y1.FAtt=CopyAtt(in_prm1.FAtt);
	}

	if (in_prm1.OB=="D")
	{
		EExecP9(p1,in_prm1,ChislA,Att5,1,1);
		EExecP9(p2,in_prm1,ChislB,Att5,1,1);
		EExecP9(p3,in_prm1,ChislC,Att5,1,1);
		EExecP9(p4,in_prm1,ChislD,Att5,1,1);
		EExecP9(p5,in_prm1,ChislE,Att5,1,1);
		EExecY0(y1,p1,p2,p3,p4,p5,in_prm1.FAtt,1,1,1,1,1);
	}

	if (in_prm2.OB=="Y")
	{
		CreateCopy(y2,in_prm2);
		y2.FAtt=CopyAtt(in_prm2.FAtt);
	}
	 
	if (in_prm2.OB=="D")
	{
		EExecP9(p1,in_prm2,ChislA,Att5,1,1);
		EExecP9(p2,in_prm2,ChislB,Att5,1,1);
		EExecP9(p3,in_prm2,ChislC,Att5,1,1);
		EExecP9(p4,in_prm2,ChislD,Att5,1,1);
		EExecP9(p5,in_prm2,ChislE,Att5,1,1);
		EExecY0(y2,p1,p2,p3,p4,p5,in_prm2.OAtt,1,1,1,1,1);
	}


	EExecP0(p10,Chisl1,Chisl2,Att0,1,1);
	EExecP0(p9,Chisl3,Chisl4,Att0,1,1);
	EExecP0(p8,Chisl5,Chisl6,Att0,1,1);
	EExecP0(p7,Chisl7,Chisl8,Att0,1,1);
	EExecP0(p6,Chisl9,Chisl10,Att0,1,1);
	EExecD00(d1,Chisl11,Chisl12,Chisl13,Att0,1,1,1);
	EExecP0(p5,Chisl14,Chisl15,Att0,1,1);
	EExecP0(p4,Chisl16,Chisl17,Att0,1,1);
	EExecP0(p3,Chisl18,Chisl19,Att0,1,1);
	EExecP0(p2,Chisl20,Chisl21,Att0,1,1);
	EExecP0(p1,Chisl22,Chisl23,Att0,1,1);
	EExecPA(p16,d1,Att0,1);
	EExecO1(o4,p16,Chisl24,Att0,1,1);
	EExecO1(o3,p16,Chisl25,Att0,1,1);

	if (in_prm1.OB=="Y")
	{
		EExecOY(o1,o2,y1,Att5,Att5,1*Sg1);
	}

	if (in_prm1.OB=="D")
	{
		EExecPA(pcc,in_prm1,Att5,1);
		EExecO1(o1,pcc,Chisl11,Att5,1,1);
		EExecO1(o2,pcc,Chisl24,Att5,1,1);
	}

	
	if (in_prm1.OB=="Y")
	EExecPA(p11,y1,Att0,1*Sg1);

	if (in_prm1.OB=="D")
	EExecPA(p11,in_prm1,Att0,1*Sg1);

	EExecP6(p19,p20,o4,d1,Att0,Att0,1,1);
	EExecP6(p17,p18,o3,d1,Att0,Att0,1,1);

	if (in_prm1.OB=="Y")
	{
		EExecPG(p14,p15,o2,y1,Att0,Att0,1,1*Sg1);
		EExecPG(p12,p13,o1,y1,Att0,Att0,1,1*Sg1);
	}

	if (in_prm1.OB=="D")
	{
		EExecP6(p14,p15,o2,in_prm1,Att0,Att0,1,1*Sg1);
		EExecP6(p12,p13,o1,in_prm1,Att0,Att0,1,1*Sg1);
	}

	
	EExecK0(ksi1,p12,p14,p13,p15,p17,p20,p18,p19,Att0,1,1,1,1,1,1,1,1);
	EExecKU(x1,ksi1,y2,Att0,1,1*Sg2);
	EExecYYA(p21,p22,p23,p24,x1,Att0,Att0,Att0,Att0,1);
	EExecKU(x2,ksi1,p22,Att0,-1,1);
	EExecKU(x3,ksi1,p23,Att0,-1,1);
	EExecKU(x4,ksi1,p21,Att0,-1,1);
	EExecKU(x5,ksi1,p24,Att0,-1,1);

	CreateCopy(out_prm1,x2);
	out_prm1.FAtt=CopyAtt(Att_1);

	CreateCopy(out_prm2,x3);
	out_prm2.FAtt=CopyAtt(Att_2);

	CreateCopy(out_prm3,x4);
	out_prm3.FAtt=CopyAtt(Att_3);

	CreateCopy(out_prm4,x5);
	out_prm4.FAtt=CopyAtt(Att_4);

	AddInc(y1,out_prm1);
	AddInc(y1,out_prm2);
	AddInc(y1,out_prm3);
	AddInc(y1,out_prm4);
	AddInc(y2,out_prm1);
	AddInc(y2,out_prm2);
	AddInc(y2,out_prm3);
	AddInc(y2,out_prm4);
	
	Result=true;
	return Result;

} // EExecYY

function EExecYYA(out_prm1,out_prm2,out_prm3,out_prm4,in_prm1,Att_1,Att_2,Att_3,Att_4,Sg1)
{
	if (in_prm1.OB==undefined) return false;
	var Chisl9={C:{Re:0,Im:0},OB:"C"};
	var Chisl10={C:{Re:0,Im:0},OB:"C"};
	var d1=new Object();

	var CX1=new Object();
	var CX2=new Object();
	var CX3=new Object();
	var CX4=new Object();
	var CY1=new Object();
	var CY2=new Object();
	var CY3=new Object();
	var CY4=new Object();
	var p1=new Object();
	var p2=new Object();
	var p3=new Object();
	var p4=new Object();

	Result=true;

	CreateCopy(conica,in_prm1);
	conica.FAtt=CopyAtt(in_prm1.FAtt);

    EExecD00(d1,Chisl9,Chisl10,Chisl11,Att0,1,1,1);
	
	var AA = matrixArray(6,6);
	var BB = new Array(6);
	
	AA[1][1]=conica.PR1.X.Re*conica.PR1.X.Re; AA[1][2]=conica.PR1.X.Re*conica.PR1.Y.Re; AA[1][3]=conica.PR1.Y.Re*conica.PR1.Y.Re; AA[1][4]=conica.PR1.X.Re; AA[1][5]=conica.PR1.Y.Re; BB[1]=1;
	AA[2][1]=conica.PR2.X.Re*conica.PR2.X.Re; AA[2][2]=conica.PR2.X.Re*conica.PR2.Y.Re; AA[2][3]=conica.PR2.Y.Re*conica.PR2.Y.Re; AA[2][4]=conica.PR2.X.Re; AA[2][5]=conica.PR2.Y.Re; BB[2]=1;
	AA[3][1]=conica.PR3.X.Re*conica.PR3.X.Re; AA[3][2]=conica.PR3.X.Re*conica.PR3.Y.Re; AA[3][3]=conica.PR3.Y.Re*conica.PR3.Y.Re; AA[3][4]=conica.PR3.X.Re; AA[3][5]=conica.PR3.Y.Re; BB[3]=1;
	AA[4][1]=conica.PR4.X.Re*conica.PR4.X.Re; AA[4][2]=conica.PR4.X.Re*conica.PR4.Y.Re; AA[4][3]=conica.PR4.Y.Re*conica.PR4.Y.Re; AA[4][4]=conica.PR4.X.Re; AA[4][5]=conica.PR4.Y.Re; BB[4]=1;
	AA[5][1]=conica.PR5.X.Re*conica.PR5.X.Re; AA[5][2]=conica.PR5.X.Re*conica.PR5.Y.Re; AA[5][3]=conica.PR5.Y.Re*conica.PR5.Y.Re; AA[5][4]=conica.PR5.X.Re; AA[5][5]=conica.PR5.Y.Re; BB[5]=1;

	X=Gauss(AA,BB);

/*
	Verify=1;
	with TOKwadr(conica) do
	Verify:=Verify*0+X[1]*X1.Re*X1.Re+X[2]*X1.Re*Y1.Re+X[3]*Y1.Re*Y1.Re+X[4]*X1.Re+X[5]*Y1.Re-1;
*/
	V=Vertolet(X);
   
	TOChisl_Create(CX1,V.X1,Att0);
	TOChisl_Create(CX2,V.X2,Att0);
	TOChisl_Create(CX3,V.X3,Att0);
	TOChisl_Create(CX4,V.X4,Att0);

	TOChisl_Create(CY1,V.Y1,Att0);
	TOChisl_Create(CY2,V.Y2,Att0);
	TOChisl_Create(CY3,V.Y3,Att0);
	TOChisl_Create(CY4,V.Y4,Att0);

	EExecP0(p1,CX1,CY1,Att5,1,1);
	EExecP0(p2,CX2,CY2,Att5,1,1);
	EExecP0(p3,CX3,CY3,Att5,1,1);
	EExecP0(p4,CX4,CY4,Att5,1,1);

	CreateCopy(out_prm1,p3);
	out_prm1.FAtt=CopyAtt(Att_1);

	CreateCopy(out_prm2,p1);
	out_prm2.FAtt=CopyAtt(Att_2);

	CreateCopy(out_prm3,p2);
	out_prm3.FAtt=CopyAtt(Att_3);

	CreateCopy(out_prm4,p4);
	out_prm4.FAtt=CopyAtt(Att_4);
} // EExecYYA 

function matrixArray(rows,columns)
{
	var arr = new Array();
	for (var i=0; i<rows; i++)
	{
		arr[i] = new Array();
		for(var j=0; j<columns; j++)
		{
			arr[i][j] = null;//вместо i+j+1 пишем любой наполнитель. В простейшем случае - null
		}
	}
	return arr;
} // matrixArray;

function Gauss(A,B)
{
	var X = new Array(6);
	var G = new Array(6);
	var C = matrixArray(6,6);
	var V;
	var J;
	var M;
	
	var N=5;
	var N1=N-1;
	for (var K=1; K<=N1; K++)
	{
		if (!(Math.abs(A[K][K])> 0)) 
		{
			var K1=K+1;
			for (var M=K1; M<=N; M++)
			{
				if (Math.abs(A[M][K])>0) 
				{
					for (var L=1; L<=N; L++) 
					{
						V=A[K][L];
						A[K][L]=A[M][L];
						A[M][L]=V;
					}
				}
			}
			V=B[K];
			B[K]=B[M];
			B[M]=V;
		}

		G[K]=B[K]/A[K][K];
		var K1=K+1;
		for (var I=K1; I<=N; I++) 
		{
			B[I]=B[I]-A[I][K]*G[K];
			for (var J1=K; J1<=N; J1++) 
			{
				J=N-J1+K;
				C[K][J]=A[K][J]/A[K][K];
				A[I][J]=A[I][J]-A[I][K]*C[K][J];
			}
		}
	}
	
	M=N;
	X[M]=B[M]/A[M][M];

	do
	{
		M=M-1;
		var S=0;
		for (L=M; L<=N1; L++)
		{
			S=S+C[M][L+1]*X[L+1];
		}
		X[M]=G[M]-S;
	}
	while (M>1)

	return X;
} // Gauss

function Vertolet(X)
{
	F=-1;
	R=100*100;
	A=X[1]; B=X[2]; C=X[3]; D=X[4]; E=X[5];
	M=(C-A)*(C-A)+B*B;
	N=2*E*(C-A)+2*B*D;
	P=2*(C-A)*(F+A*R)+E*E-(B*B*R-D*D);
	Q=2*E*(F+A*R)-2*B*D*R;
	S=Sqr(F+A*R)-D*D*R;

	U=Dekart4(M,N,P,Q,S);

	Y1=MCompl(U.Re1,U.Im1);
	Y2=MCompl(U.Re2,U.Im2);
	Y3=MCompl(U.Re3,U.Im3);
	Y4=MCompl(U.Re4,U.Im4);

	X1=SqrtIm(CompSub(MCompl(R,0),CompMul(Y1,Y1)));
	{
		Verify=X[1]*X1.Re*X1.Re+X[2]*X1.Re*Y1.Re+X[3]*Y1.Re*Y1.Re+X[4]*X1.Re+X[5]*Y1.Re-1;
		if (Math.abs(Verify)>Eps) 
		{
			X1=Neg(X1)
			Verify=X[1]*X1.Re*X1.Re+X[2]*X1.Re*Y1.Re+X[3]*Y1.Re*Y1.Re+X[4]*X1.Re+X[5]*Y1.Re-1;
			if (Math.abs(Verify)>Eps) 
			{
				X1=Neg(X1); 
				Y1=Neg(Y1)
				Verify=X[1]*X1.Re*X1.Re+X[2]*X1.Re*Y1.Re+X[3]*Y1.Re*Y1.Re+X[4]*X1.Re+X[5]*Y1.Re-1;
				if (Math.abs(Verify)>Eps) 
				{
					X1=Neg(X1);
					Verify=X[1]*X1.Re*X1.Re+X[2]*X1.Re*Y1.Re+X[3]*Y1.Re*Y1.Re+X[4]*X1.Re+X[5]*Y1.Re-1;
				}
			}
		}
    }
	
	X2=SqrtIm(CompSub(MCompl(R,0),CompMul(Y2,Y2)));
	{
		Verify=X[1]*X2.Re*X2.Re+X[2]*X2.Re*Y2.Re+X[3]*Y2.Re*Y2.Re+X[4]*X2.Re+X[5]*Y2.Re-1;
		if (Math.abs(Verify)>Eps) 
		{
			X2=Neg(X2)
			Verify=X[1]*X2.Re*X2.Re+X[2]*X2.Re*Y2.Re+X[3]*Y2.Re*Y2.Re+X[4]*X2.Re+X[5]*Y2.Re-1;
			if (Math.abs(Verify)>Eps) 
			{
				X2=Neg(X2); 
				Y2=Neg(Y2)
				Verify=X[1]*X2.Re*X2.Re+X[2]*X2.Re*Y2.Re+X[3]*Y2.Re*Y2.Re+X[4]*X2.Re+X[5]*Y2.Re-1;
				if (Math.abs(Verify)>Eps) 
				{
					X2=Neg(X2)
					Verify=X[1]*X2.Re*X2.Re+X[2]*X2.Re*Y2.Re+X[3]*Y2.Re*Y2.Re+X[4]*X2.Re+X[5]*Y2.Re-1;
				} 
			} 
		} 
    }
   
	X3=SqrtIm(CompSub(MCompl(R,0),CompMul(Y3,Y3)));
    {
		Verify=X[1]*X3.Re*X3.Re+X[2]*X3.Re*Y3.Re+X[3]*Y3.Re*Y3.Re+X[4]*X3.Re+X[5]*Y3.Re-1;
		if (Math.abs(Verify)>Eps) 
		{
			X3=Neg(X3)
			Verify=X[1]*X3.Re*X3.Re+X[2]*X3.Re*Y3.Re+X[3]*Y3.Re*Y3.Re+X[4]*X3.Re+X[5]*Y3.Re-1;
			if (Math.abs(Verify)>Eps) 
			{
				X3=Neg(X3); Y3=Neg(Y3)
				Verify=X[1]*X3.Re*X3.Re+X[2]*X3.Re*Y3.Re+X[3]*Y3.Re*Y3.Re+X[4]*X3.Re+X[5]*Y3.Re-1;
				if (Math.abs(Verify)>Eps) 
				{
					X3=Neg(X3)
					Verify=X[1]*X3.Re*X3.Re+X[2]*X3.Re*Y3.Re+X[3]*Y3.Re*Y3.Re+X[4]*X3.Re+X[5]*Y3.Re-1;
				} 
			} 
		} 
	}
	
	X4=SqrtIm(CompSub(MCompl(R,0),CompMul(Y4,Y4)));
	{
		Verify=X[1]*X4.Re*X4.Re+X[2]*X4.Re*Y4.Re+X[3]*Y4.Re*Y4.Re+X[4]*X4.Re+X[5]*Y4.Re-1;
		if (Math.abs(Verify)>Eps) 
		{
			X4=Neg(X4)
			Verify=X[1]*X4.Re*X4.Re+X[2]*X4.Re*Y4.Re+X[3]*Y4.Re*Y4.Re+X[4]*X4.Re+X[5]*Y4.Re-1;
			if (Math.abs(Verify)>Eps) 
			{
				X4=Neg(X4); Y4=Neg(Y4)
				Verify=X[1]*X4.Re*X4.Re+X[2]*X4.Re*Y4.Re+X[3]*Y4.Re*Y4.Re+X[4]*X4.Re+X[5]*Y4.Re-1;
				if (Math.abs(Verify)>Eps) 
				{
					X4=Neg(X4)
					Verify=X[1]*X4.Re*X4.Re+X[2]*X4.Re*Y4.Re+X[3]*Y4.Re*Y4.Re+X[4]*X4.Re+X[5]*Y4.Re-1;
				}
			}
		}
    }
	
	V.X1=X1;
	V.Y1=Y1;
	V.X2=X2;
	V.Y2=Y2;
	V.X3=X3;
	V.Y3=Y3;
	V.X4=X4;
	V.Y4=Y4;
	return V;
} // Vertolet

function Dekart4(A,B,C,D,E)
{
	var U={Re1:0, Im1:0, Re2:0, Im2:0, Re3:0, Im3:0, Re4:0, Im4:0, Ex: false};
	w=1E-15;
	Ex= false;  
	R1=0; 
	R2=0; 
	R3=0; 
	I1=0; 
	I2=0; 
	I3=0; 
	F0=0; 
	p= (8*A*C-3*B*B)/(8*A*A);
	q= (8*A*A*D+B*B*B-4*A*B*C)/(8*A*A*A);
	r= (16*A*B*B*C-64*A*A*B*D-3*B*B*B*B+256*A*A*A*E)/(256*A*A*A*A);
	A0= 1;
	B0= p/2;
	C0= (p*p-4*r)/16;
	D0= -q*q/64;
	V=Kardano3(A0, B0, C0, D0);

	S0=V.S;
	z1=V.Re1; 
	h1=V.Im1; 
	z2=V.Re2;
	h2=V.Im2;
	z3=V.Re3; 
	h3=V.Im3;
	
	if (((S0<0) || (S0=0)) && ((Math.abs(z1)<w) || (Math.abs(z2)<w) || (Math.abs(z3)<w)))
	{
        U.Ex=true;
        return U;
	}
	
	if ((S0>0) && ((z1<0) || (Math.abs(z1)<w)))
    {
        U.Ex=true;
        return U;
    }
	
	if ((S0<0) || (S0==0))
	{
        if ((z1>0) && (z2>0) && (z3>0))
		{
			if (q<0)
			{
				R1=Math.sqrt(z1); R2=Math.sqrt(z2); R3=Math.sqrt(z3);
				I1=0; I2=0; I3=0;
			}
			else
			{
				R1=-Math.sqrt(z1); R2=Math.sqrt(z2); R3=Math.sqrt(z3);
				I1=0; I2=0; I3=0;
			}
		}
			
        if ((z1>0) && (z2<0) && (z3<0))
		{
			if (q<0)
			{
				R1=-Math.sqrt(z1);  R2=0; R3=0;
				I1=0; I2=Math.sqrt(-z2); I3=Math.sqrt(-z3);
			}
			else
			{
				R1=Math.sqrt(z1);  R2=0; R3=0;
				I1=0; I2=Math.sqrt(-z2); I3=Math.sqrt(-z3);
			}
		}
		
        if ((z2>0) && (z1<0) && (z3<0))
		{
			if (q<0)
			{
				R2=-Math.sqrt(z2);  R1=0; R3=0;
				I2=0; I1=Math.sqrt(-z1); I3=Math.sqrt(-z3);
			}
			else
			{
				R2=Math.sqrt(z2);  R1=0; R3=0;
				I2=0; I1=Math.sqrt(-z1); I3=Math.sqrt(-z3);
			}
		}

        if ((z3>0) && (z1<0) && (z2<0))
		{
			if (q<0)
			{
				R3=-Math.sqrt(z3);  R1=0; R2=0;
				I3=0; I1=Math.sqrt(-z2); I2=Math.sqrt(-z3);
			}
			else
			{
				R3=Math.sqrt(z3);  R1=0; R2=0;
				I3=0; I1=Math.sqrt(-z1); I2=Math.sqrt(-z3);
			}
		}

		Re1= R1+R2+R3-B/(4*A);
        Im1= I1+I2+I3;
        Re2= R1-R2-R3-B/(4*A);
        Im2= I1-I2-I3;
        Re3= R2-R1-R3-B/(4*A);
        Im3= I2-I1-I3;
        Re4= R3-R1-R2-B/(4*A);
        Im4= I3-I1-I2;
	}
	
	if (S0>0)
	{
        if (z2>0) F0= Math.atan(h2/z2);
        if (z2<0) F0= Math.atan(h2/z2)+Pi;
        if ((z2==0) && (h2>0)) F0= Math.PI/2;
        if ((z2==0) && (h2<0)) F0= -Math.PI/2;
        if (q<0) R1= Math.sqrt(z1);
        if (q>0) R1= -Math.sqrt(z1);
        Re1= R1+2*Math.sqrt(Math.sqrt(z2*z2+h2*h2))*Math.cos(F0/2)-B/(4*A);
        Im1= 0;
        Re2= R1-2*Math.sqrt(sqrt(z2*z2+h2*h2))*Math.cos(F0/2)-B/(4*A);
        Im2= 0;
        Re3= -R1-B/(4*A);
        Im3= 2*Math.sqrt(Math.sqrt(z2*z2+h2*h2))*Math.sin(F0/2);
        Re4= -R1-B/(4*A);
        Im4= -2*Math.sqrt(Math.sqrt(z2*z2+h2*h2))*Math.sin(F0/2);
	}
	
	U.Re1=Re1;
	U.Im1=Im1;
	U.Re2=Re2;
	U.Im2=Im2;
	U.Re3=Re3;
	U.Im3=Im3;
	U.Re4=Re4;
	U.Im4=Im4;
	U.Ex=Ex;
	return U;
} // Dekart4

function Kardano3(A,B,C,D)
{
	var U={Re1:0, Im1:0, Re2:0, Im2:0, Re3:0, Im3:0, S:0};
	var p=(3*A*C-B*B)/(3*A*A);
	var q=(2*B*B*B-9*A*B*C+27*A*A*D)/(27*A*A*A);
	var T1=(3*A*C-B*B);
	var T2=(2*B*B*B-9*A*B*C+27*A*A*D);
	var S=(4*T1*T1*T1+T2*T2)/(2916*A*A*A*A*A*A);
	var y1=0;    
	var y2=0;
    var F=0;
	
	if (S<0)
	{
		if (q<0) F= Math.atan(-2*Math.sqrt(-S)/q);
		if (q>0) F= Math.atan(-2*Math.sqrt(-S)/q)+Math.PI;
		if (q==0)F= Math.PI/2;
		Re1=2*Math.sqrt(-p/3)*Math.cos(F/3)-B/(3*A);
		Im1=0;
		Re2=2*Math.sqrt(-p/3)*Math.cos((F+2*Math.PI)/3)-B/(3*A);
		Im2=0;
		Re3=2*Math.sqrt(-p/3)*Math.cos((F+4*Math.PI)/3)-B/(3*A);
		Im3=0;
		if (q==0) Re3=-B/(3*A);
	}
	
	if (S>0)
	{
		if (-q/2+Math.sqrt(S)>0) y1=Math.exp(Math.log(Math.abs(-q/2+Math.sqrt(S)))/3);
		if (-q/2+Math.sqrt(S)<0) y1=-Math.exp(Math.log(Math.abs(-q/2+Math.sqrt(S)))/3);
		if (-q/2+Math.sqrt(S)==0) y1=0;
		if (-q/2-Math.sqrt(S)>0) y2=Math.exp(Math.log(Math.abs(-q/2-Math.sqrt(S)))/3);
		if (-q/2-Math.sqrt(S)<0) y2=-Math.exp(Math.log(Math.abs(-q/2-Math.sqrt(S)))/3);
		if (-q/2-Math.sqrt(S)==0) y2=0;
		Re1= y1+y2-B/A/3;
		Im1= 0;
		Re2= -(y1+y2)/2-B/A/3;
		Im2= (y1-y2)*Math.sqrt(3)/2;
		Re3= -(y1+y2)/2-B/A/3;
		Im3= -(y1-y2)*Math.sqrt(3)/2;
	}

	if (S==0)
	{
		if (q<0) y1= Math.exp(Math.log(Math.abs(-q/2))/3);
		if (q>0) y1= -Math.exp(Math.log(Math.abs(-q/2))/3);
		if (q==0) y1=0;
		Re1=2*y1-B/A/3;
		Im1=0;
		Re2=-y1-B/A/3;
		Im2=0;
		Re3=-y1-B/A/3;
		Im3=0;
	}

	U.Re1=Re1;
	U.Im1=Im1;
	U.Re2=Re2;
	U.Im2=Im2;
	U.Re3=Re3;
	U.Im3=Im3;
	U.S=S;
	return U;
	
} // Kardano3

function SqrtIm(X)
{
	A=X.Re;
	B=X.Im;
	return MCompl(Math.sqrt((Math.sqrt(A*A+B*B)+A)/2),Math.sign(B)*Math.sqrt((Math.sqrt(A*A+B*B)-A)/2));
} // SqrtIm

function Neg(X)
{
	return MCompl(-X.Re,-X.Im);
} //Neg

function EExecYF(out_prm1,out_prm2,out_prm3,out_prm4,in_prm1,Att_1,Att_2,Att_3,Att_4,Sg1)
{
	if (in_prm1.OB==undefined) return false;
	var rect={C:{Re:90,Im:0},OB:"C"};

	var y1=new Object();
	var p6=new Object();
	var o1=new Object();
	var o2=new Object();
	var p7=new Object();
	var p8=new Object();
	var p9=new Object();
	var p10=new Object();
	var c1=new Object();
	var d1=new Object();
	var p11=new Object();
	var p12=new Object();
	var p15=new Object();
	var g1=new Object();
	var g2=new Object();
	var g3=new Object();
	var g4=new Object();
	var p19=new Object();
	var o3=new Object();
	var o4=new Object();
	var p16=new Object();
	var d2=new Object();
	var p17=new Object();
	var p18=new Object();
	var f1=new Object();
	var f2=new Object();
	var dir1=new Object();
	var dir2=new Object();
	var oo=new Object();
	var pp=new Object();
	var ppp=new Object();
	var ppp2=new Object();


	Result=true;
	CreateCopy(y1,in_prm1);
	y1.FAtt=CopyAtt(in_prm1.FAtt);

	EExecPA(p6,y1,Att0,1*Sg1);
	EExecOY(o1,o2,y1,Att5,Att5,1*Sg1);
	EExecPG(p7,p8,o1,y1,Att0,Att0,1,1*Sg1);
	EExecPG(p9,p10,o2,y1,Att0,Att0,1,1*Sg1);
	EExecC2(c1,p10,p9,Att0,1,1);
	EExecD2(d1,p7,c1,Att0,1,1);
	EExecP6(p11,p12,o2,d1,Att0,Att0,1,1);
	EExecPP(p15,p7,p8,Att0,1,1);
	EExecGD(g1,d1,Att0,1);
	EExecG2(g2,g1,Att0,1);
	EExecGT(g3,o1,Att0,1);
	EExecG2(g4,g3,Att0,1);

	var oo_=new Array();
	{oo_.push(o1,g3,o2,g4); EExecG3(oo,oo_,Att0)}

	EExecPP(p19,p10,p9,Att0,1,1);

	var pp_=new Array();
	{pp_.push(p19,g4,p15,g3); EExecG3(pp,pp_,Att0)}

	var ppp_=new Array();
	{ppp_.push(p8,g4,p10,g3); EExecG3(ppp,ppp_,Att0)}

	var ppp2_=new Array();
	{ppp2_.push(p10,g4,p8,g3); EExecG3(ppp2,ppp2_,Att0)}

	EExecO0(o3,ppp,pp,Att0,1,1);
	EExecO5(o4,oo,ppp2,rect,Att0,1,1,1);
	EExecP2(p16,o4,o3,Att0,1,1);
	EExecD1(d2,pp,p16,Att0,1,1);
	EExecP6(p17,p18,oo,d2,Att0,Att0,1,1);

	var f1_=new Array();
	{f1_.push(p11,g1,p17,g2); EExecG3(f1,f1_,Att0)}

	var f2_=new Array();
	{f2_.push(p12,g1,p18,g2); EExecG3(f2,f2_,Att0)}

	EExecY6(dir1,f1,y1,Att0,1,1*Sg1);
	EExecY6(dir2,f2,y1,Att0,1,1*Sg1);

	CreateCopy(out_prm1,f1);
	out_prm1.FAtt=CopyAtt(Att_1);

	CreateCopy(out_prm2,dir1);
	out_prm2.FAtt=CopyAtt(Att_2);

	CreateCopy(out_prm3,f2);
	out_prm3.FAtt=CopyAtt(Att_3);

	CreateCopy(out_prm4,dir2);
	out_prm4.FAtt=CopyAtt(Att_4);

}  // EExecYF
  
function EExecGD(OOO,X,Att,Sg1)
{
	if (X.OB==undefined) return false;

	if (!(X.OB=="$"))
	{
		if (Sg1==1) {TOUsl_Create(OOO,true,Att)} else {TOUsl_Create(OOO,false,Att)};
	} else
	{
		if (Sg1==1) {TOUsl_Create(OOO,false,Att)} else {TOUsl_Create(OOO,true,Att)};
	}
	
	Result=true;
	return Result;

} // EExecGD

function EExecGT(OOO,X,Att,Sg1)
{
	if (X.OB==undefined) return false;

	if ((X.OB=="P") || (X.OB=="O"))
	{
		TOUsl_Create(OOO,IsSobstv(X),Att);
	} else if (Att.Chk==1) TOEmpty_Create(OOO,Att);

	Result=true;
	return Result;

} // EExecGT

function EExecYV(out_prm1,in_prm1,in_prm2,Att_1,Sg1,Sg2)
{
	if ((in_prm1.OB==undefined) || (in_prm2.OB==undefined)) return false;

	var Chisl11={C:{Re:0.057596874,Im:0},OB:"C"};
	var Chisl12={C:{Re:0.75919579,Im:0},OB:"C"};

	var o1=new Object();
	var y1=new Object();
	var p6=new Object();
	var p7=new Object();
	var p8=new Object();
	var p9=new Object();
	var p10=new Object();
	var p11=new Object();
	var pr1=new Object();
	
	CreateCopy(o1,in_prm1);
	o1.FAtt=CopyAtt(in_prm1.FAtt);

	CreateCopy(y1,in_prm2);
	y1.FAtt=CopyAtt(in_prm2.FAtt);

	EExecP9(p6,o1,Chisl11,Att0,1*Sg1,1);
	EExecY6(p7,p6,y1,Att0,1,1*Sg2);
	EExecP2(p8,p7,o1,Att0,1,1*Sg1);
	EExecP9(p9,o1,Chisl12,Att0,1*Sg1,1);
	EExecY6(p10,p9,y1,Att0,1,1*Sg2);
	EExecP2(p11,p10,o1,Att0,1,1*Sg1);
	EExecL0(pr1,o1,p6,p8,p9,o1,p8,p6,p11,Att0,1*Sg1,1,1,1,1*Sg1,1,1,1);

	CreateCopy(out_prm1,pr1);
	out_prm1.FAtt=CopyAtt(Att_1);

	Result=true;
	return Result;
	
} // EExecYV

function EExecYK(out_prm1,in_prm1,in_prm2,in_prm3,Att_polus,Sg1,Sg2,Sg3)
{
	if ((in_prm1.OB==undefined) || (in_prm2.OB==undefined) || (in_prm3.OB==undefined)) return false;

	var point=new Object();
	var conica1=new Object();
	var conica2=new Object();
	var p1=new Object();
	var p2=new Object();
	var p3=new Object();
	var p4=new Object();
	var p5=new Object();
	var o1=new Object();
	var o2=new Object();
	var pp=new Object();
	var o1_1=new Object();
	var o2_1=new Object();
	var pp_1=new Object();
	var o1_2=new Object();
	var o2_2=new Object();
	var pp_2=new Object();
	var o1_3=new Object();
	var o2_3=new Object();
	var pp_3=new Object();
	var o1_4=new Object();
	var o2_4=new Object();
	var pp_4=new Object();
	var o1_5=new Object();
	var o2_5=new Object();
	var pp_5=new Object();
	
	CreateCopy(point,in_prm1);
	point.FAtt=CopyAtt(Att5);

	if (in_prm2.OB=="Y")
	{
		CreateCopy(conica1,in_prm2);
		conica1.FAtt=CopyAtt(Att0);
	}
	
	var Chisl1={C:{Re:0,Im:0},OB:"C"};
	var Chisl2={C:{Re:0.2,Im:0},OB:"C"};
	var Chisl3={C:{Re:0.4,Im:0},OB:"C"};
	var Chisl4={C:{Re:0.66,Im:0},OB:"C"};
	var Chisl5={C:{Re:0.88,Im:0},OB:"C"};

	
	if (in_prm2.OB=="D")
	{
		EExecP9(p1,in_prm2,Chisl1,Att5,1,1);
		EExecP9(p2,in_prm2,Chisl2,Att5,1,1);
		EExecP9(p3,in_prm2,Chisl3,Att5,1,1);
		EExecP9(p4,in_prm2,Chisl4,Att5,1,1);
		EExecP9(p5,in_prm2,Chisl5,Att5,1,1);
		EExecY0(conica1,p1,p2,p3,p4,p5,Att0,1,1,1,1,1);
	}

	if (in_prm3.OB=="Y")
	{
		CreateCopy(conica2,in_prm3);
		conica2.FAtt=CopyAtt(Att0);
	}

	if (in_prm3.OB=="D")
	{
		EExecP9(p1,in_prm3,Chisl1,Att5,1,1);
		EExecP9(p2,in_prm3,Chisl2,Att5,1,1);
		EExecP9(p3,in_prm3,Chisl3,Att5,1,1);
		EExecP9(p4,in_prm3,Chisl4,Att5,1,1);
		EExecP9(p5,in_prm3,Chisl5,Att5,1,1);
		EExecY0(conica2,p1,p2,p3,p4,p5,Att0,1,1,1,1,1);
	}

	if (point.OB=="P")
	{
		EExecY6(o1,point,in_prm2,Att5,1,1*Sg2);
		EExecY6(o2,point,in_prm3,Att5,1,1*Sg3);
		EExecP2(pp,o1,o2,Att5,1,1);

		CreateCopy(out_prm1,pp);
		out_prm1.FAtt=CopyAtt(Att_polus);
		Redult=true;
		return Result;
	} else
	if (point.OB=="O")
	{
		var Chisl1={C:{Re:0,Im:0},OB:"C"};
		var Chisl2={C:{Re:2,Im:0},OB:"C"};
		var Chisl3={C:{Re:4,Im:0},OB:"C"};
		var Chisl4={C:{Re:6,Im:0},OB:"C"};
		var Chisl5={C:{Re:8,Im:0},OB:"C"};

		EExecP9(p1,point,Chisl1,Att5,1,1);
		EExecP9(p2,point,Chisl2,Att5,1,1);
		EExecP9(p3,point,Chisl3,Att5,1,1);
		EExecP9(p4,point,Chisl4,Att5,1,1);
		EExecP9(p5,point,Chisl5,Att5,1,1);


		EExecY6(o1_1,p1,in_prm2,Att5,1,Sg2);
		EExecY6(o2_1,p1,in_prm3,Att5,1,Sg3);
		EExecP2(pp_1,o1_1,o2_1,Att5,1,1);

		EExecY6(o1_2,p2,in_prm2,Att5,1,Sg2);
		EExecY6(o2_2,p2,in_prm3,Att5,1,Sg3);
		EExecP2(pp_2,o1_2,o2_2,Att5,1,1);

		EExecY6(o1_3,p3,in_prm2,Att5,1,Sg2);
		EExecY6(o2_3,p3,in_prm3,Att5,1,Sg3);
		EExecP2(pp_3,o1_3,o2_3,Att5,1,1);

		EExecY6(o1_4,p4,in_prm2,Att5,1,Sg2);
		EExecY6(o2_4,p4,in_prm3,Att5,1,Sg3);
		EExecP2(pp_4,o1_4,o2_4,Att5,1,1);

		EExecY6(o1_5,p5,in_prm2,Att5,1,Sg2);
		EExecY6(o2_5,p5,in_prm3,Att5,1,Sg3);
		EExecP2(pp_5,o1_5,o2_5,Att5,1,1);

		EExecY0(pp,pp_1,pp_2,pp_3,pp_4,pp_5,Att5,1,1,1,1,1);

		CreateCopy(out_prm1,pp);
		out_prm1.FAtt=CopyAtt(Att_polus);
		Redult=true;
		return Result;
	} else
	if (point.OB="Y")
	{
/*		
		Chisl1:=TOChisl.Create(MCompl(0,0),tc_Constant,NAtt,NIL,c_ord);
		Chisl2:=TOChisl.Create(MCompl(0.0714,0),tc_Constant,NAtt,NIL,c_ord);
		Chisl3:=TOChisl.Create(MCompl(0.1428,0),tc_Constant,NAtt,NIL,c_ord);
		Chisl4:=TOChisl.Create(MCompl(0.2142,0),tc_Constant,NAtt,NIL,c_ord);
		Chisl5:=TOChisl.Create(MCompl(0.2857,0),tc_Constant,NAtt,NIL,c_ord);
		Chisl6:=TOChisl.Create(MCompl(0.3571,0),tc_Constant,NAtt,NIL,c_ord);
		Chisl7:=TOChisl.Create(MCompl(0.4286,0),tc_Constant,NAtt,NIL,c_ord);
		Chisl8:=TOChisl.Create(MCompl(0.5,0),tc_Constant,NAtt,NIL,c_ord);
		Chisl9:=TOChisl.Create(MCompl(0.5714,9),tc_Constant,NAtt,NIL,c_ord);
		Chisl10:=TOChisl.Create(MCompl(0.6428,0),tc_Constant,NAtt,NIL,c_ord);
		Chisl11:=TOChisl.Create(MCompl(0.7142,0),tc_Constant,NAtt,NIL,c_ord);
		Chisl12:=TOChisl.Create(MCompl(0.7857,0),tc_Constant,NAtt,NIL,c_ord);
		Chisl13:=TOChisl.Create(MCompl(0.8571,0),tc_Constant,NAtt,NIL,c_ord);
		Chisl14:=TOChisl.Create(MCompl(0.9286,0),tc_Constant,NAtt,NIL,c_ord);

		EExecP9(Point,Chisl1,p1,Att5,1,1,NIL);
		EExecP9(Point,Chisl2,p2,Att5,1,1,NIL);
		EExecP9(Point,Chisl3,p3,Att5,1,1,NIL);
		EExecP9(Point,Chisl4,p4,Att5,1,1,NIL);
		EExecP9(Point,Chisl5,p5,Att5,1,1,NIL);
		EExecP9(Point,Chisl6,p6,Att5,1,1,NIL);
		EExecP9(Point,Chisl7,p7,Att5,1,1,NIL);
		EExecP9(Point,Chisl8,p8,Att5,1,1,NIL);
		EExecP9(Point,Chisl9,p9,Att5,1,1,NIL);
		EExecP9(Point,Chisl10,p10,Att5,1,1,NIL);
		EExecP9(Point,Chisl11,p11,Att5,1,1,NIL);
		EExecP9(Point,Chisl12,p12,Att5,1,1,NIL);
		EExecP9(Point,Chisl13,p13,Att5,1,1,NIL);
		EExecP9(Point,Chisl14,p14,Att5,1,1,NIL);

		EExecY6(p1,conica1,o1_1,Att5,1,Sg2,NIL);
		EExecY6(p1,conica2,o2_1,Att5,1,Sg3,NIL);
		EExecP2(o1_1,o2_1,pp_1,Att5,1,1,NIL);

		EExecY6(p2,conica1,o1_2,Att5,1,Sg2,NIL);
		EExecY6(p2,conica2,o2_2,Att5,1,Sg3,NIL);
		EExecP2(o1_2,o2_2,pp_2,Att5,1,1,NIL);

		EExecY6(p3,conica1,o1_3,Att5,1,Sg2,NIL);
		EExecY6(p3,conica2,o2_3,Att5,1,Sg3,NIL);
		EExecP2(o1_3,o2_3,pp_3,Att5,1,1,NIL);

		EExecY6(p4,conica1,o1_4,Att5,1,Sg2,NIL);
		EExecY6(p4,conica2,o2_4,Att5,1,Sg3,NIL);
		EExecP2(o1_4,o2_4,pp_4,Att5,1,1,NIL);

		EExecY6(p5,conica1,o1_5,Att5,1,Sg2,NIL);
		EExecY6(p5,conica2,o2_5,Att5,1,Sg3,NIL);
		EExecP2(o1_5,o2_5,pp_5,Att5,1,1,NIL);

		EExecY6(p6,conica1,o1_6,Att5,1,Sg2,NIL);
		EExecY6(p6,conica2,o2_6,Att5,1,Sg3,NIL);
		EExecP2(o1_6,o2_6,pp_6,Att5,1,1,NIL);

		EExecY6(p7,conica1,o1_7,Att5,1,Sg2,NIL);
		EExecY6(p7,conica2,o2_7,Att5,1,Sg3,NIL);
		EExecP2(o1_7,o2_7,pp_7,Att5,1,1,NIL);

		EExecY6(p8,conica1,o1_8,Att5,1,Sg2,NIL);
		EExecY6(p8,conica2,o2_8,Att5,1,Sg3,NIL);
		EExecP2(o1_8,o2_8,pp_8,Att5,1,1,NIL);

		EExecY6(p9,conica1,o1_9,Att5,1,Sg2,NIL);
		EExecY6(p9,conica2,o2_9,Att5,1,Sg3,NIL);
		EExecP2(o1_9,o2_9,pp_9,Att5,1,1,NIL);

		EExecY6(p10,conica1,o1_10,Att5,1,Sg2,NIL);
		EExecY6(p10,conica2,o2_10,Att5,1,Sg3,NIL);
		EExecP2(o1_10,o2_10,pp_10,Att5,1,1,NIL);

		EExecY6(p11,conica1,o1_11,Att5,1,Sg2,NIL);
		EExecY6(p11,conica2,o2_11,Att5,1,Sg3,NIL);
		EExecP2(o1_11,o2_11,pp_11,Att5,1,1,NIL);

		EExecY6(p12,conica1,o1_12,Att5,1,Sg2,NIL);
		EExecY6(p12,conica2,o2_12,Att5,1,Sg3,NIL);
		EExecP2(o1_12,o2_12,pp_12,Att5,1,1,NIL);

		EExecY6(p13,conica1,o1_13,Att5,1,Sg2,NIL);
		EExecY6(p13,conica2,o2_13,Att5,1,Sg3,NIL);
		EExecP2(o1_13,o2_13,pp_13,Att5,1,1,NIL);

		EExecY6(p14,conica1,o1_14,Att5,1,Sg2,NIL);
		EExecY6(p14,conica2,o2_14,Att5,1,Sg3,NIL);
		EExecP2(o1_14,o2_14,pp_14,Att5,1,1,NIL);

		EExecQ0(Pp_1,Pp_2,Pp_3,Pp_4,Pp_5,Pp_6,Pp_7,Pp_8,Pp_9,Pp_10,
		Pp_11,Pp_12,Pp_13,Pp_14,Pp,Att5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,NIL);
		out_prm1:=pp.CreateCopy(OW1);
		out_prm1.OAtt:=att_polus;
*/
	} else
	{
		TOEmpty_Create(pp,Att_polus);
		out_prm1.FAtt=CopyAtt(Att_polus);
		Result=true;
		return Result;
	}

} // EExecYK

function EExecYE(out_prm1,in_prm1,in_prm2,in_prm3,Att_1,Sg1,Sg2,Sg3)
{
	if ((in_prm1.OB==undefined) || (in_prm2.OB==undefined) || (in_prm3.OB==undefined)) return false;
	var Chisl1={C:{Re:0.5,Im:0},OB:"C"};
	var Chisl2={C:{Re:90,Im:0},OB:"C"};
	var Chisl3={C:{Re:0,Im:0},OB:"C"};

	var centr=new Object();
	var a=new Object();
	var b=new Object();
	var d1=new Object();
	var p5=new Object();
	var p4=new Object();
	var o1=new Object();
	var p6=new Object();
	var p7=new Object();
	var o2=new Object();
	var d2=new Object();
	var p8=new Object();
	var o5=new Object();
	var o3=new Object();
	var p9=new Object();
	var o4=new Object();
	var p10=new Object();
	var y1=new Object();

	Result=true;
	CreateCopy(centr,in_prm1);
	centr.FAtt=CopyAtt(in_prm1.FAtt);

	CreateCopy(a,in_prm2);
	a.FAtt=in_CopyAtt(prm2.FAtt);

	CreateCopy(b,in_prm3);
	b.FAtt=CopyAtt(in_prm3.FAtt);

	EExecD1(d1,centr,a,Att0,1*Sg1,1*Sg2);
	EExecUC(p5,centr,b,Att8,1*Sg1,1*Sg3);
	EExecUC(p4,centr,a,Att8,1*Sg1,1*Sg2);
	EExecO0(o1,centr,b,Att5,1*Sg1,1*Sg3);
	EExecP6(p6,p7,o1,d1,Att0,Att0,1,1);
	EExecO5(o2,o1,centr,Chisl2,Att0,1,1*Sg1,1);
	EExecD9(d2,d1,p7,a,Att0,1,1,1*Sg2);
	EExecP9(p8,d2,Chisl1,Att0,1,1);
	EExecO5(o5,o1,p8,Chisl3,Att0,1,1,1);
	EExecO0(o3,p8,p7,Att5,1,1);
	EExecP2(p9,o3,o2,Att0,1,1);
	EExecO0(o4,b,p9,Att5,1*Sg3,1);
	EExecP2(p10,o5,o4,Att0,1,1);
	EExecY0(y1,p10,b,p4,p5,a,Att0,1,1*Sg3,1,1,1*Sg2);

	CreateCopy(out_prm1,y1);
	out_prm1.FAtt=CopyAtt(Att_1);
	
	return Result;

} // EExecYE	

function EExecO9(out_prm1,out_prm2,out_prm3,out_prm4,in_prm1,in_prm2,Att_out1,Att_t1,Att_out2,Att_t2,Sg1,Sg2)
{
	if ((in_prm1.OB==undefined) || (in_prm2.OB==undefined)) return false;
	var p0=new Object();
	var conica=new Object();
	var o0=new Object();
	var t1=new Object();
	var t2=new Object();
	var out1=new Object();
	var out2=new Object();


	CreateCopy(p0,in_prm1);
	p0.FAtt=CopyAtt(Att0);

	CreateCopy(conica,in_prm2);
	conica.FAtt=CopyAtt(Att0);

	EExecY6(o0,p0,conica,Att5,1*Sg1,1*Sg2);
	EExecPG(t2,t1,o0,conica,Att_t2,Att_t1,1,1*Sg2);
	EExecO0(out1,p0,t1,Att_out1,1*Sg1,1);
	EExecO0(out2,p0,t2,Att_out2,1*Sg1,1);

	CreateCopy(out_prm1,out1);
	out_prm1.FAtt=CopyAtt(Att_out1);

	CreateCopy(out_prm2,t1);
	out_prm2.FAtt=CopyAtt(Att_t1);

	AddInc(out_prm1,out_prm2);
	AddInc(out_prm1,in_prm1);

	CreateCopy(out_prm3,out2);
	out_prm3.FAtt=CopyAtt(Att_out2);

	CreateCopy(out_prm4,t2);
	out_prm4.FAtt=CopyAtt(Att_t2);

	AddInc(out_prm3,out_prm4);
	AddInc(out_prm3,in_prm1);

	Result=true;
	return Result;
} // EExecO9

function EExecOA(Out_Prm1,Out_Prm2,X,Y,Z,Att1,Att2,Sg1,Sg2,Sg3)
{
	if ((X.OB==undefined) || (Y.OB==undefined) || (Z.OB==undefined)) return false;
	var X1 = {Re:undefined, Im:undefined}
	var Y1 = {Re:undefined, Im:undefined}
	var X2 = {Re:undefined, Im:undefined}
	var Y2 = {Re:undefined, Im:undefined}

	if ((X.OB=="D") && (Y.OB=="O") && (Z.OB=="C") && IsSobstv(Y) && IsReal(Y)) 
	{
		if (Sg2>0) 
		{
		   X1=Y.X1; Y1=Y.Y1; X2=Y.X2; Y2=Y.Y2;
		} else
		{
		   X1=Y.X2; Y1=Y.Y2; X2=Y.X1; Y2=Y.Y1;
		}
		SCDL=SC(X1.Re,Y1.Re,X2.Re,Y2.Re);
		
		var Df=Fi(0,1,SCDL.S,SCDL.C);
		
		X3Re=X.Xc.Re; 
		Y3Re=X.Yc.Re; 
		X3Im=X.Xc.Im; 
		Y3Im=X.Yc.Im; 
		var Dx=Z.C.Re;
		
		Dx=Dx*Math.PI/180+Df;
		
		X5Re=X3Re+100*Math.cos(Dx); X5Im=0;
		Y5Re=Y3Re+100*Math.sin(Dx); Y5Im=0;
		X4Re=X3Re-100*Math.cos(Dx); X4Im=0;
		Y4Re=Y3Re-100*Math.sin(Dx); Y4Im=0;

		var Dxx=X.R.Re*Sg1*Sg3;

		Value=Dxx/Math.sqrt(Sqr(X5Re-X4Re)+Sqr(Y5Re-Y4Re));

		X3Re=X4Re+(Y5Re-Y4Re)*Value;
		Y3Re=Y4Re-(X5Re-X4Re)*Value;
		Value=100/Math.sqrt(Sqr(X5Re-X4Re)+Sqr(Y5Re-Y4Re));
		X6Re=X3Re-Value*(X5Re-X4Re);
		Y6Re=Y3Re-Value*(Y5Re-Y4Re);
		X7Re=X3Re+Value*(X5Re-X4Re);
		Y7Re=Y3Re+Value*(Y5Re-Y4Re);

		X3Im=0; Y3Im=0; X6Im=0; Y6Im=0; X7Im=0; Y7Im=0;

		TOLine_Create(Out_Prm1,MCompl(X6Re,X6Im),MCompl(Y6Re,Y6Im),1,MCompl(X7Re,X7Im),MCompl(Y7Re,Y7Im),1,brn_UnLimited,"sobstv",Att1);

		SCDL=SC(X1.Re,Y1.Re,X2.Re,Y2.Re);
		Df=Fi(0,1,SCDL.S,SCDL.C);
		X3Re=X.Xc.Re; Y3Re=X.Yc.Re; Dx=Z.C.Re;
		Dx=(Dx+90)*Math.PI/180+Df;
		X5Re=X3Re+100*Math.cos(Dx); X5Im=0;
		Y5Re=Y3Re+100*Math.sin(Dx); Y5Im=0;
		X4Re=X3Re-100*Math.cos(Dx); X4Im=0;
		Y4Re=Y3Re-100*Math.sin(Dx); Y4Im=0;
		XXIm=0; YYIm=0;
		
		P=LinLin(X4Re,Y4Re,X5Re,Y5Re,X6Re,Y6Re,X7Re,Y7Re);
		XX=P.X;
		YY=P.Y;
		
		TOPoint_Create(Out_Prm2,MCompl(XX,0),MCompl(YY,0),1,Att2);

		AddInc(Out_Prm1,Out_Prm2);
		AddInc(X,Out_Prm2);
	} else
	{
		if (Att1.Chk==1) TOEmpty.Create(Out_Prm1,Att1);
		if (Att2.Chk==1) TOEmpty.Create(Out_Prm2,Att2);
	}
	
	Result=true;
	return Result;
} // EEcecOA

function EExecK1(out_prm1,in_prm1,in_prm2,in_prm3,in_prm4,in_prm5,in_prm6,in_prm7,in_prm8,Att_1,Sg1,Sg2,Sg3,Sg4,Sg5,Sg6,Sg7,Sg8)
{
	if ((in_prm1.OB==undefined) || (in_prm2.OB==undefined) || (in_prm3.OB==undefined) || (in_prm4.OB==undefined) ||
	(in_prm5.OB==undefined) || (in_prm6.OB==undefined) || (in_prm7.OB==undefined) || (in_prm8.OB==undefined)) return false;
	Result=true;
	var l1=new Object();
	var a1=new Object();
	var b1=new Object();
	var c1=new Object();
	var l2=new Object();
	var a2=new Object();
	var b2=new Object();
	var c2=new Object();
	var o3=new Object();
	var o4=new Object();
	var o5=new Object();
	var o6=new Object();
	var p7=new Object();
	var p8=new Object();
	var p9=new Object();
	var p10=new Object();
	var ksi1=new Object();

   CreateCopy(l1,in_prm1);
   l1.FAtt=CopyAtt(in_prm1.FAtt);

   CreateCopy(a1,in_prm2);
   a1.FAtt=CopyAtt(in_prm2.FAtt);

   CreateCopy(b1,in_prm3);
   b1.FAtt=CopyAtt(in_prm3.FAtt);

   CreateCopy(c1,in_prm4);
   c1.FAtt=CopyAtt(in_prm4.FAtt);

   CreateCopy(l2,in_prm5);
   l2.FAtt=CopyAtt(in_prm5.FAtt);

   CreateCopy(a2,in_prm6);
   a2.FAtt=CopyAtt(in_prm6.FAtt);

   CreateCopy(b2,in_prm7);
   b2.FAtt=CopyAtt(in_prm7.FAtt);

   CreateCopy(c2,in_prm8);
   c2.FAtt=CopyAtt(in_prm8.FAtt);

   EExecO0(o3,b1,a1,Att5,1*Sg3,1*Sg2);
   EExecO0(o4,c1,a1,Att5,1*Sg4,1*Sg2);
   EExecO0(o5,b2,a2,Att5,1*Sg7,1*Sg6);
   EExecO0(o6,c2,a2,Att5,1*Sg8,1*Sg6);
   EExecP2(p7,o3,l1,Att0,1,1*Sg1);
   EExecP2(p8,o4,l1,Att0,1,1*Sg1);
   EExecP2(p9,o5,l2,Att0,1,1*Sg5);
   EExecP2(p10,o6,l2,Att0,1,1*Sg5);
   EExecK0(ksi1,b1,p7,p8,c1,b2,p9,p10,c2,Att0,1*Sg3,1,1,1*Sg4,1*Sg7,1,1,1*Sg8);

   CreateCopy(out_prm1,ksi1);
   out_prm1.FAtt=CopyAtt(Att_1);

   return Result;
} // EExecK1

function EExecWA(Out_Prm,X,Y,Att,Sg1,Sg2)
{
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	Result=false;

	if (((X.OB=="W") || (X.OB=="D"))  && ((Y.OB=="W") || (Y.OB=="D"))) 
	{
//	  B:=SysVar.AllowComplex;
//  SysVar.AllowComplex:=FALSE;
	  CommonKonturWork(Out_Prm,X,Y,Att,1);
//	  SysVar.AllowComplex:=B;
	}
	else
	{
	  if (Att.Chk==1) TOEmpty_Create(Out_Prm,Att);
	}
	
	Result=true;
	return Result;
} // EExecWA

function EExecWB(Out_Prm,X,Y,Att,Sg1,Sg2)
{
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	Result=false;

	if (((X.OB=="W") || (X.OB=="D"))  && ((Y.OB=="W") || (Y.OB=="D"))) 
	{
//	  B:=SysVar.AllowComplex;
//  SysVar.AllowComplex:=FALSE;
	  CommonKonturWork(Out_Prm,X,Y,Att,2);
//	  SysVar.AllowComplex:=B;
	}
	else
	{
	  if (Att.Chk==1) TOEmpty_Create(Out_Prm,Att);
	}
	
	Result=true;
	return Result;
} // EExecWB

function EExecWC(Out_Prm,X,Y,Att,Sg1,Sg2)
{
	if ((X.OB==undefined) || (Y.OB==undefined) ) return false;
	Result=false;

	if (((X.OB=="W") || (X.OB=="D"))  && ((Y.OB=="W") || (Y.OB=="D"))) 
	{
//	  B:=SysVar.AllowComplex;
//  SysVar.AllowComplex:=FALSE;
	  CommonKonturWork(Out_Prm,X,Y,Att,3);
//	  SysVar.AllowComplex:=B;
	}
	else
	{
	  if (Att.Chk==1) TOEmpty_Create(Out_Prm,Att);
	}
	
	Result=true;
	return Result;
} // EExecWC

function EExecWD(Out_Prm,X,Y,Att,Sg1,Sg2)
{
	if ((X.OB==undefined) || (Y.OB==undefined)) return false;
	Result=false;

	alert("WD");
	if (((X.OB=="W") || (X.OB=="D"))  && ((Y.OB=="W") || (Y.OB=="D"))) 
	{
//	  B:=SysVar.AllowComplex;
//  SysVar.AllowComplex:=FALSE;
	  CommonKonturWork(Out_Prm,X,Y,Att,4);
//	  SysVar.AllowComplex:=B;
	}
	else
	{
	  if (Att.Chk==1) TOEmpty_Create(Out_Prm,Att);
	}
	
	Result=true;
	return Result;
} // EExecWD


function CalcGabarit(OB)
{     

	OB.XMin=1E30;
	OB.YMin=1E30;
	OB.XMax=-1E30;
	OB.YMax=-1E30;
	OB.HasGabarit=false;
	
	if (OB.OB=="W")
	{
		if (!(OB.Spis==undefined)) 
		if (OB.Spis.length>0) 
		for (var I=0; I<=OB.Spis.length-1; I++)
		{
			var Z=OB.Spis[I];
			if (!Z.HasGabarit) continue;
			var XMin1=Z.XMin;
			var YMin1=Z.YMin;
			var XMax1=Z.XMax;
			var YMax1=Z.YMax;
			{
				if (Z.XMin<XMin1) XMin1=Z.XMin;
				if (Z.YMin<YMin1) YMin1=Z.YMin;
				if (Z.XMax>XMax1) XMax1=Z.XMax;
				if (Z.YMax>YMax1) YMax1=Z.YMax;
			}
		} 
		OB.XMin=XMin1;
		OB.YMin=YMin1;
		OB.XMax=XMax1;
		OB.YMax=YMax1;
		OB.HasGabarit=true;
		return;
	}
	
	if (OB.OB=="O")
	{
		OB.XMin=0+OB.X1.Re;
		OB.YMin=0+OB.Y1.Re;
		OB.XMax=0+OB.X1.Re;
		OB.YMax=0+OB.Y1.Re;
		
		if ((OB.FAtt.Lv==5) && (OB.Incid.length<2)) return;
		if ((OB.draw_AsBorned==brn_UnLimited) && (OB.Incid.length<2)) return;
		if ((OB.draw_AsBorned==brn_HalfLimited) && (OB.Incid.length<2)) return;

		if (OB.X2.Re>=OB.Xmax) OB.Xmax=0+OB.X2.Re;
		if (OB.Y2.Re>=OB.Ymax) OB.Ymax=0+OB.Y2.Re;
		if (OB.X2.Re<=OB.XMin) OB.Xmin=0+OB.X2.Re;
		if (OB.Y2.Re<=OB.YMin) OB.Ymin=0+OB.Y2.Re;
		OB.HasGabarit=true;
		return;
	}
	
	if (OB.OB=="D")
	{
		if (Math.abs(OB.R.Im)>Eps*Eps*Eps) return;     

		var Xr=OB.Xc.Re+Math.abs(R.Re);
		var Xl=OB.Xc.Re-Math.abs(R.Re);
		var Yu=OB.Yc.Re+Math.abs(R.Re);
		var Yd=OB.Yc.Re-Math.abs(R.Re);

		OB.XMin=OB.X1; OB.XMax=OB.X1;

		if (OB.X2<OB.X1) OB.Xmin=OB.X2;
		if (OB.X2>OB.X1) OB.Xmax=OB.X2;

		OB.YMin=OB.Y1; OB.YMax=OB.Y1;
		if (OB.Y2<OB.Y1) OB.YMin=OB.Y2;
		if (OB.Y2>OB.Y1) OB.YMax=OB.Y2;

		if (PointBelongs(OB,Xl,OB.Yc.Re)) if (Xl<OB.Xmin) OB.Xmin=Xl;
		if (PointBelongs(OB,Xr,OB.Yc.Re)) if (Xr>OB.Xmax) OB.Xmax=Xr;
		if (PointBelongs(OB,OB.Xc.Re,Yu)) if (Yu>OB.Ymax) OB.YMax=Yu;
		if (PointBelongs(OB,OB.Xc.Re,Yd)) if (Yd<OB.Ymin) OB.YMin=Yd;

		OB.HasGabarit=true;
		return;
	}

} // CalcGabarit


function QSort(A,L,H)
{
function Sort(L,R)
{
	var I=L;
	var J=R;
	var X=A[Math.trunc((L+R)/2)].Prm;
    do
    {
		while (A[I].Prm<X) {I++};
		while (X<A[J].Prm) {J--};
		if (I<=J)
		{
			Y=A[I];
			A[I]=A[J];
			A[J]=Y;
			I++;
			J--;
		}
	}
    while (I<=J);
    if (L<J) Sort(L,J);
    if (I<R) Sort(I,R);
} // Sort

    Sort(L,H);
} // Qsort

function CommonKonturWork1(Out_Prm,X,Y,Att,Code)
{
	TOEmpty_Create(Out_Prm,Att);
}

function KrajOtr(P,O)
{
    Result=false;
	if ((Math.abs(P.X.Re-O.X1.Re)<Eps) && (Math.abs(P.Y.Re-O.Y1.Re)<Eps)) Result=true;
	if ((Math.abs(P.X.Re-O.X2.Re)<Eps) && (Math.abs(P.Y.Re-O.Y2.Re)<Eps)) Result=true;
	return Result;
} // KrajOtr

function KrajDug(P,O)
{
	Result=false;
	if ((Math.abs(P.X.Re-O.X1)<Eps) && (Math.abs(P.Y.Re-O.Y1)<Eps)) Result=true;
	if ((Math.abs(P.X.Re-O.X2)<Eps) && (Math.abs(P.Y.Re-O.Y2)<Eps)) Result=true;
	return Result;
} // KrajDug

function KrajBezje(P,O)
{
	Result=false;
	if ((Math.abs(P.X.Re-O.PX0)<Eps) && (Math.abs(P.Y.Re-O.PY0)<Eps)) Result=true;
	if ((Math.abs(P.X.Re-O.PX3)<Eps) && (Math.abs(P.Y.Re-O.PY3)<Eps)) Result=true;
	return Result;
} // KrajBezje


function PointInsideContur(Pnt1,X)
{

	var B=SysVar.AllowComplex;
	SysVar.AllowComplex=false;
	
	var Cst = new Object();
	TOChisl_Create(Cst,MCompl(0,0),Att0);

	Result=true;
	var PntA = new Object();
	var Otr1 = new Object();
	
	EExecP9(PntA,X,Cst,Att0,1,1);
	EExecO0(Otr1,Pnt1,PntA,Att5,1,1);

	var List = new Array();
	
	for (I=0; I<=X.Spis.length-1; I++)
	{
		OB=X.Spis[I];
		if (OB.OB=="O")
		{
			var Pnt = new Object();
			EExecP2(Pnt,Otr1,OB,Att0,1,1);
			if (Pnt.OB=="P")
			if (Pnt.W==1)
			{
				var Prm=MyParam(Otr1,Pnt);
				var V = new Object();
				V.Prm=Prm;
				V.X=Pnt.X;
				V.Y=Pnt.Y;
				V.P=Pnt;
				V.OB=Otr1;
				List.push(V);
				continue;
			}
		}
		
		if (OB.OB=="D")
		{
			var Pnt1 = new Object();
			var Pnt2 = new Object();
			EExecP6(Pnt1,Pnt2,Otr1,OB,Att0,Att0,1,1);

			if (Pnt1.OB=="P")
			{
				var Prm=MyParam(Otr1,Pnt1);
				var V = new Object();
				V.Prm=Prm;
				V.X=Pnt1.X;
				V.Y=Pnt1.Y;
				V.P=Pnt1;
				V.OB=Otr1;
				List.push(V);
			}

			if (Pnt2.OB=="P")
			{
				var Prm=MyParam(Otr1,Pnt2);
				var V = new Object();
				V.Prm=Prm;
				V.X=Pnt2.X;
				V.Y=Pnt2.Y;
				V.P=Pnt2;
				V.OB=Otr1;
				List.push(V);
			}
			continue;
		}

		if (OB.OB=="Z")
		{
			continue;
		}

	}
	
	
	
/*	
	L_Otr1:=TNewList.Create(NIL);
	L_X:=TNewList.Create(NIL);
	P7:=TNewList.Create(NIL);
	C2:=TNewList.Create(NIL);

	Otr1.CopyItself(L_Otr1);
	X.CopyItself(L_X);

	Spis1:=TNewList.Create(NIL);
	Spis1.AddCopy(L_Otr1);
	Spis2:=TNewList.Create(NIL);
	Spis2.AddCopy(L_X);
	XExecPC('1',p7,c2, Spis1,Spis2,NIL,NIL,NAtt,NAtt);


	List:=TList.Create;
	
	for I:=0 to C2.Count-1 do
	{
		Ob:=TObj(C2[i]);
		if not (OB is TOChisl) then continue;
		Cs:=TOChisl(C2[I]);
		New(V);
		V^.X:=TOPoint(P7[I]).X;
		V^.Y:=TOPoint(P7[I]).Y;

		Pnt2:=p7[I];
		Otr1.MyParam(Prm1,Pnt2);

		V^.Prm:=Prm1;

		List.Add(V);
	}
*/
	Num=0;

	if (List.length>0)
	{
		QSort(List,0,List.length-1);

		// Устранение дублирования одинаковых точек }

		var I=0;
		var V=List[0];
		var Xk=V.X.Re;
		var Yk=V.Y.Re;
		while (I<List.length-1) 
		{
			V=List[I+1];
			if ((Math.abs(Xk-V.X.Re)<Eps) && (Math.abs(Yk-V.Y.Re)<Eps)) 
			{
				List.splice(I+1, 1);
			} else
			{
				I++;
				V=List[I];
				Xk=V.X.Re;
				Yk=V.Y.Re;
			}
		}

		do
		{
			V=List[Num];
			if (V.Prm>0) continue;
			Num++;
		}
		while(!((V.Prm>0) || (Num>List.length-1)));

	}

	var R=!((Math.trunc(Num/2)*2)==Num);
	
	SysVar.AllowComplex=B;
	return R;
} // PointInsideContur


function CommonKonturWork(Out_Prm,X,Y,Att,Code)
{

function InPoints(OB,Points)

{
	for (var I=0; I<=Points.length - 1; I++)
	{
		V=Points[I];
		if (V.OB==OB) return true;
	}
	return false;
} // InPoints 

function Solution1(PNT,KNT,Code)
{
	if ((Code==1) || (Code==3)) Result=!PointInsideContur(PNT,KNT);
	if (Code==2) Result=PointInsideContur(PNT,KNT);
	if (Code==4) Result=!PointInsideContur(PNT,KNT);
	return Result;
} // Solution1 

function Solution2(PNT,KNT,Code)
{
	if (Code==1) Result=!PointInsideContur(PNT,KNT);
	if ((Code==2)||(Code==3)) Result=PointInsideContur(PNT,KNT);
	if (Code==4) Result=!PointInsideContur(PNT,KNT);
	 return Result;
} // Solution2 

	var Cst= new Object();
	var WK1 = new Object();
	var WK2 = new Object();
	var OB1 = new Object();
	var OB2 = new Object();
	var Xa;
	var Ya; 
	var Xb;
	var Yb;
	var Prm1,Prm2;
    
	var CMPSave=SysVar.AllowComplex;
	SysVar.AllowComplex=false;
	
	
	TOChisl_Create(Cst,MCompl(0.5,0),Att2);
	
	if (X.OB=="D") 
	{
		var D = new Object();

		TOKontur_Create(WK1,Att);
		TODuga_Create(D,X.Xc,X.Yc,MCompl(X.R.Re,0),X.X1,X.Y1,X.X2,X.Y2,X.FAtt);
		WK1.Spis.push(D);
		WK1.L=1;
		WK1.Zamkn=true;
		X=WK1;
	}
	
	if (Y.OB=="D") 
	{
		var D = new Object();

		TOKontur_Create(WK2,Att);
		TODuga_Create(D,Y.Xc,Y.Yc,MCompl(Y.R.Re,0),Y.X1,Y.Y1,Y.X2,Y.Y2,Y.FAtt);
		WK2.Spis.push(D);
		WK2.L=1;
		WK2.Zamkn=true;
		Y=WK2;
	}
	
	var Knt1 = new Object();
	var Knt2 = new Object();
	var V = {Prm:undefined, X:{Re:undefined, Im:undefined}, Y:{Re:undefined, Im:undefined}, P:undefined, OB: undefined}

	if (X.OB=="W") Knt1=X;
	if (Y.OB=="W") Knt2=Y;

	Points1 = new Array();
	Points2 = new Array();

//	if (not Assigned(Knt1)) or  (not Assigned(Knt2)) goto jump;

	if (!(Knt1.OB==undefined)) CalcGabarit(Knt1);
	if (!(Knt2.OB==undefined)) CalcGabarit(Knt2);
	
//	if (Knt1.Xmin>Knt2.Xmax) goto jump;
//	if (Knt1.Xmax<Knt2.Xmin) goto jump;
//	if (Knt1.Ymin>Knt2.Ymax) goto jump;
//	if (Knt1.Ymax<Knt2.Ymin) goto jump;

	for (var I=0; I<=Knt1.Spis.length-1; I++)
	for (var J=0; J<=Knt2.Spis.length-1; J++)
	{
		OB1=Knt1.Spis[I];
		OB2=Knt2.Spis[J];

		// Пересечение двух линейных сегментов }
		if ((OB1.OB=="O") && (OB2.OB=="O"))
		{
			var Pnt = new Object();
			var PntPlus = new Object();
			EExecP2(Pnt,OB1,OB2,Att0,1,1);
			EExecP2(PntPlus,OB1,OB2,Att0,1,1);
			if (Pnt.OB=="P")
			{
				if (!(KrajOtr(Pnt,OB1))) 
				{
					Prm1=MyParam(OB1,Pnt);
					var V = new Object();
					V.Prm=Prm1+I;
					V.X=Pnt.X;
					V.Y=Pnt.Y;
					V.P=Pnt;
					V.OB=OB1;
					Points1.push(V);
				}

				if (!(KrajOtr(PntPlus,OB2))) 
				{
					Prm2=MyParam(OB2,PntPlus);
					var V = new Object();
					V.Prm=Prm2+J;
					V.X=PntPlus.X;
					V.Y=PntPlus.Y;
					V.P=PntPlus;
					V.OB=OB2;
					Points2.push(V);
				}

			}
		}
		
		// Пересечение линейного и дугового сегментов }
		if ((OB1.OB=="O") && (OB2.OB=="D")) 
		{
			var Pnt1 = new Object();
			var Pnt2 = new Object();
			var Pnt1Plus = new Object();
			var Pnt2Plus = new Object();
			EExecP6(Pnt1,Pnt2,OB1,OB2,Att,Att,1,1);
			EExecP6(Pnt1Plus,Pnt2Plus,OB1,OB2,Att,Att,1,1);
			if (Pnt1.OB=="P")
			{
				if (!(KrajOtr(Pnt1,OB1))) 
				{
					Prm1=MyParam(OB1,Pnt1);
					var V = new Object();
					V.Prm=Prm1+I;
					V.X=Pnt1.X;
					V.Y=Pnt1.Y;
					V.P=Pnt1;
					V.OB=OB1;
					Points1.push(V);
				}

				if (!(KrajDug(Pnt1Plus,OB2))) 
				{
					Prm2=MyParam(OB2,Pnt1Plus);
					var V = new Object();
					V.Prm=Prm2+J;
					V.X=Pnt1Plus.X;
					V.Y=Pnt1Plus.Y;
					V.P=Pnt1Plus;
					V.OB=OB2;
					Points2.push(V);
				}
			}
			
			if (Pnt2.OB=="P")
			{
				if (!(KrajOtr(Pnt2,OB1)))
				{
					Prm1=MyParam(OB1,Pnt2);
					var V = new Object();
					V.Prm=Prm1+I;
					V.X=Pnt2.X;
					V.Y=Pnt2.Y;
					V.P=Pnt2;
					V.OB=OB1;
					Points1.push(V);
				}
				
				if (!(KrajDug(Pnt2Plus,OB2))) 
				{
					Prm2=MyParam(OB2,Pnt2Plus);
					var V = new Object();
					V.Prm=Prm2+J;
					V.X=Pnt2Plus.X;
					V.Y=Pnt2Plus.Y;
					V.P=Pnt2Plus;
					V.OB=OB2;
					Points2.push(V);
				}
			}
		}
		
		
		// Пересечение дугового и линейного сегментов }
		if ((OB1.OB=="D") && (OB2.OB=="O")) 
		{
			var Pnt1 = new Object();
			var Pnt2 = new Object();
			var Pnt1Plus = new Object();
			var Pnt2Plus = new Object();
			EExecP6(Pnt2,Pnt1,OB2,OB1,Att,Att,1,1);
			EExecP6(Pnt2Plus,Pnt1Plus,OB2,OB1,Att,Att,1,1);
			if (Pnt1.OB=="P") 
			{
				if (!(KrajDug(Pnt1,OB1)))
				{
					Prm1=MyParam(OB1,Pnt1);
					var V = new Object();
					V.Prm=Prm1+I;
					V.X=Pnt1.X;
					V.Y=Pnt1.Y;
					V.P=Pnt1;
					V.OB=OB1;
					Points1.push(V);
				}
				
				if (!(KrajOtr(Pnt1Plus,OB2))) 
				{
					Prm2=MyParam(OB2,Pnt1Plus);
					var V = new Object();
					V.Prm=Prm2+J;
					V.X=Pnt1Plus.X;
					V.Y=Pnt1Plus.Y;
					V.P=Pnt1Plus;
					V.OB=OB2;
					Points2.push(V);
				}
			}
			
			if (Pnt2.OB=="P") 
			{
				if (!(KrajDug(Pnt2,OB1)))
				{
					Prm1=MyParam(OB1,Pnt2);
					var V = new Object();
					V.Prm=Prm1+I;
					V.X=Pnt2.X;
					V.Y=Pnt2.Y;
					V.P=Pnt2;
					V.OB=OB1;
					Points1.push(V);
				}

				if (!(KrajOtr(Pnt2Plus,OB2))) 
				{
					Prm2=MyParam(OB2,Pnt2Plus);
					var V = new Object();
					V.Prm=Prm2+J;
					V.X=Pnt2Plus.X;
					V.Y=Pnt2Plus.Y;
					V.P=Pnt2Plus;
					V.OB=OB2;
					Points2.push(V);
				}
			}
		}		
		
		// Пересечение двух дуговых сегментов }
		if ((OB1.OB=="D") && (OB2.OB=="D")) 
		{
			var Pnt1 = new Object();
			var Pnt2 = new Object();
			var Pnt1Plus = new Object();
			var Pnt2Plus = new Object();
			EExecP3(Pnt1,Pnt2,OB1,OB2,Att,Att,1,1);
			EExecP3(Pnt1Plus,Pnt2Plus,OB1,OB2,Att,Att,1,1);
			if (Pnt1.OB=="P") 
			{
				if (!(KrajDug(Pnt1,OB1)))
				{
					Prm1=MyParam(OB1,Pnt1);
					var V = new Object();
					V.Prm=Prm1+I;
					V.X=Pnt1.X;
					V.Y=Pnt1.Y;
					V.P=Pnt1;
					V.OB=OB1;
					Points1.push(V);
				}
				
				if (!(KrajDug(Pnt1Plus,OB2)))
				{
					Prm2=MyParam(OB2,Pnt1Plus);
					var V = new Object();
					V.Prm=Prm2+J;
					V.X=Pnt1Plus.X;
					V.Y=Pnt1Plus.Y;
					V.P=Pnt1Plus;
					V.OB=OB2;
					Points2.push(V);
				}
			}
			
			if (Pnt2.OB=="P") 
			{
				if (!(KrajDug(Pnt2,OB1)))
				{
					Prm1=MyParam(OB1,Pnt2);
					var V = new Object();
					V.Prm=Prm1+I;
					V.X=Pnt2.X;
					V.Y=Pnt2.Y;
					V.P=Pnt2;
					V.OB=OB1;
					Points1.push(V);
				}

				if (!(KrajDug(Pnt2Plus,OB2))) 
				{
					Prm2=MyParam(OB2,Pnt2Plus);
					var V = new Object();
					V.Prm=Prm2+J;
					V.X=Pnt2Plus.X;
					V.Y=Pnt2Plus.Y;
					V.P=Pnt2Plus;
					V.OB=OB2;
					Points2.push(V);
				}
			}
		}		

		// Пересечение линейного и Безье сегментов 
		if ((OB1.OB=="O") && (OB2.OB=="Z"))
		{
			var Pnt1 = new Object();
			var Pnt2 = new Object();
			var Pnt3 = new Object();

			EExecZ1(Pnt1,Pnt2,Pnt3,OB1,OB2,Att);

			if (Pnt1.OB=="P") 
			{
				if (!(KrajOtr(Pnt1,OB1)))
				{
					Prm1=MyParam(OB1,Pnt1);
					var V = new Object();
					V.Prm=Prm1+I;
					V.X=Pnt1.X;
					V.Y=Pnt1.Y;
					V.P=Pnt1;
					V.OBOB1;
					Points1.push(V);
				}
				if (!(KrajBezje(Pnt1,OB2)))
				{
					Prm2=MyParam(OB2,Pnt1);
					var V = new Object();
					V.Prm=Prm2+J;
					V.X=Pnt1.X;
					V.Y=Pnt1.Y;
					V.P=Pnt1;
					V.OB=OB2;
					Points2.push(V);
				}
			}
			
			if (Pnt2.OB=="P")
			{
				if (!(KrajOtr(Pnt2,OB1))) 
				{
					Prm1=MyParam(OB1,Pnt2);
					var V = new Object();
					V.Prm=Prm1+I;
					V.X=Pnt2.X;
					V.Y=Pnt2.Y;
					V.P=Pnt2;
					V.OB=OB1;
					Points1.push(V);
				}

				if (!(KrajBezje(Pnt2,OB2)))
				{
					Prm2=MyParam(OB2,Pnt2);
					var V = new Object();
					V.Prm=Prm2+J;
					V.X=Pnt2.X;
					V.Y=Pnt2.Y;
					V.P=Pnt2;
					V.OB=OB2;
					Points2.push(V);
				}
			}
			if (Pnt3.OB=="P") 
			{
				if (!(KrajOtr(Pnt3,OB1))) 
				{
					Prm1=MyParam(OB1,Pnt3);
					var V = new Object();
					V.Prm=Prm1+I;
					V.X=Pnt3.X;
					V.Y=Pnt3.Y;
					V.P=Pnt3;
					V.OB=OB1;
					Points1.push(V);
				}

				if (!(KrajBezje(Pnt3,OB2)))
				{
					Prm2=MyParam(OB2,Pnt3);
					var V = new Object();
					V.Prm=Prm2+J;
					V.X=Pnt3.X;
					V.Y=Pnt3.Y;
					V.P=Pnt3;
					V.OB=OB2;
					Points2.push(V);
				}
			}
		}

		// Пересечение Безье и линейного сегментов 
		if ((OB1.OB=="Z") && (OB2.OB=="O"))
		{
			var Pnt1 = new Object();
			var Pnt2 = new Object();
			var Pnt3 = new Object();
			
			EExecZ1(Pnt1,Pnt2,Pnt3,OB2,OB1,Att);
			if (Pnt1.OB=="P")
			{
				if (!(KrajOtr(Pnt1,OB2)))
				{
					OB2.MyParam(Prm1,Pnt1);
					New(V);
					V.Prm=Prm1+I;
					V.X=Pnt1.X;
					V.Y=Pnt1.Y;
					V.P=Pnt1;
					V.OB=OB2;
					Points1.push(V);
				}
				
				if (!(KrajBezje(Pnt1,OB1)))
				{
					OB1.MyParam(Prm2,Pnt1);
					New(V);
					V.Prm=Prm2+J;
					V.X=Pnt1.X;
					V.Y=Pnt1.Y;
					V.P=Pnt1;
					V.OB=OB1;
					Points2.push(V);
				}
			}
			
			if (Pnt2.OB=="P")
			{
				if (!(KrajOtr(Pnt2,OB2)))
				{
					OB2.MyParam(Prm1,Pnt2);
					New(V);
					V.Prm=Prm1+I;
					V.X=Pnt2.X;
					V.Y=Pnt2.Y;
					V.P=Pnt2;
					V.OB=OB2;
					Points1.push(V);
				}

				if (!(KrajBezje(Pnt2,OB1))) 
				{
					OB1.MyParam(Prm2,Pnt2);
					New(V);
					V.Prm=Prm2+J;
					V.X=Pnt2.X;
					V.Y=Pnt2.Y;
					V.P=Pnt2;
					V.OB=OB1;
					Points2.push(V);
				}
			}
			
			if (Pnt3.OB=="P")
			{
				if (!(KrajOtr(Pnt3,OB2)))
				{
					OB2.MyParam(Prm1,Pnt3);
					New(V);
					V.Prm=Prm1+I;
					V.X=Pnt3.X;
					V.Y=Pnt3.Y;
					V.P=Pnt3;
					V.OB=OB2;
					Points1.push(V);
				}

				if (!(KrajBezje(Pnt3,OB1)))
				{
					OB1.MyParam(Prm2,Pnt3);
					New(V);
					V.Prm=Prm2+J;
					V.X=Pnt3.X;
					V.Y=Pnt3.Y;
					V.P=Pnt3;
					V.OB=OB1;
					Points2.push(V);
				}
			}
		}

	} // конец цикла
	
	SysVar.AllowComplex=CMPSave;

//	jump:

	if (Points1.length>0) QSort(Points1,0,Points1.length-1);
	if (Points2.length>0) QSort(Points2,0,Points2.length-1);

// только для проверки


	for (K=0; K<=Points1.length-1; K++) 
	{
		V=Points1[K];
	}

	for (K=0; K<=Points2.length-1; K++) 
	{
		V=Points2[K];
	}
	
	TOKontur_Create(Out_Prm,Att);

	DAtt.Lv=Att1.Lv;
	
	if (Points1.length>0) DAtt.Lv=0;
	
	if (!(Knt1==undefined))  
	if (!(Knt1.Spis==undefined)) 
	for (var I=0; I<=Knt1.Spis.length-1; I++) 
	{
		Start=-1;
		Finish=-1;
		
		for (var K=0; K<=Points1.length-1; K++)
		{
			V=Points1[K];
			if (((V.Prm>=I) && (V.Prm<(I+1)) && (Start==-1))) Start=K; // определяется стартовый номер внутренней точки на сегменте
			if (((V.Prm>=I) && (V.Prm<(I+1)) && !(Start==-1))) Finish=K; // здесь получится финишный номер внутренней точки на сегменте
		}
		
		if (Start==-1)  // то есть, если внутренних точек на текущем сегменте исходного контура не было
		{
			OB1=Knt1.Spis[I];
			DAtt.Lv=1;
			if ((OB1.FAtt.Lv==0) || ((OB1.FAtt.Lv>0) && (InPoints(OB1,Points1)))) DAtt.Lv=0;
			var Pnt1 = new Object();
			
			EExecP9(Pnt1,OB1,Cst, Att0,1,1); // определение центра сегмента
			
			if (Solution1(Pnt1,Knt2,Code))  // генерируем точно такой же элемент
			{
				if (OB1.OB=="O") 
				{
					var U = new Object();
					TOLine_Create(U,OB1.X1,OB1.Y1,1,OB1.X2,OB1.Y2,1,0,"sobstv",OB1.FAtt)
					Out_Prm.Spis.push(U);
				}
				
				if (OB1.OB=="D") 
				{
					var U = new Object();
					TODuga_Create(U,OB1.Xc,OB1.Yc,MCompl(OB1.R.Re,0),OB1.X1,OB1.Y1,OB1.X2,OB1.Y2,DAtt)
					Out_Prm.Spis.push(U);
				}

				if (OB1.OB=="Z")
				{	
					var U = new Object();
					TOBezje_Create(U,OB1.PX0,OB1.PY0,OB1.PX1,OB1.PY1,OB1.PX2,OB1.PY2,OB1.PX3,OB1.PY3,DAtt);
					Out_Prm.Spis.push(U);
				}
			}
		
		} 
		
		else
		{   
			// точки внутри сегмента есть
			OB1=Knt1.Spis[I];
			DAtt.Lv=1;
			if ((OB1.FAtt.Lv==0) || ((OB1.FAtt.Lv>0) && (InPoints(OB1,Points1)))) DAtt.Lv=0;
			Prm=I;
			
			if (OB1.OB=="O")
			{				
				U=CalcP9_O1(OB1,MCompl(0,0)); // определение начальной точки сегмента
				Xa=U.E.Re;
				Ya=U.F.Re;
			}
			if (OB1.OB=="D") 
			{
				U=CalcP9_D1(OB1,0);
				Xa=U.E.Re;
				Ya=U.F.Re;
			}
			if (OB1.OB=="Z") 
			{
				U=CalcP9_Z(OB1,0);
				Xa=U.E.Re;
				Ya=U.F.Re;
			}
			
			var BB1=false;
			if (OB1.OB=="O") BB1=((Math.abs(Xa-OB1.X1.Re)<Eps) && (Math.abs(Ya-OB1.Y1.Re)<Eps));
			if (OB1.OB=="D") BB1=((Math.abs(Xa-OB1.X1)<Eps) && (Math.abs(Ya-OB1.Y1)<Eps));
			if ((OB1.OB=="D") && (OB1.FAtt.Lv==2)) BB1=((Math.abs(Xa-OB1.X2)<Eps) && (Math.abs(Ya-OB1.Y2)<Eps));
			if (OB1.OB=="Z") BB1=((Math.abs(Xa-OB1.PX0)<Eps) && (Math.abs(Ya-OB1.PY0)<Eps));
			
			if (BB1) 
			{  // Элемент ориентирован в прямом направлении
				for (var K=Start; K<=Finish; K++)
				{
					V=Points1[K];
					if (V.Prm==I) continue;
					Xb=V.X.Re;
					Yb=V.Y.Re;
					
					var Lin = new Object();
					
					if (OB1.OB=="O") TOLine_Create(Lin,MCompl(Xa,0),MCompl(Ya,0),1,MCompl(Xb,0),MCompl(Yb,0),1,0,"sobstv",OB1.FAtt);
					if ((OB1.OB=="D") && ((OB1.FAtt.Lv==0)||(OB1.FAtt.Lv==1))) TODuga_Create(Lin,OB1.Xc,OB1.Yc,MCompl(OB1.R.Re,0),Xa,Ya,Xb,Yb,DAtt);
					if ((OB1.OB=="D") && (OB1.FAtt.Lv==2)) TODuga_Create(Lin,OB1.Xc,OB1.Yc,MCompl(-OB1.R.Re,0),Xb,Yb,Xa,Ya,DAtt);
					if (OB1.OB=="Z") TOBezje_Create(Lin,Xa,Ya,0,0,100,100,Xb,Yb,DAtt,nil);
					Prm=V.Prm;
					var Pnt1 = new Object();
					EExecP9(Pnt1,Lin,Cst, Att,1,1);

					//{if Solution1(PNT1,KNT2,Code)then with TOKOntur(Out_Prm).Spis do Add(Lin)}
					BBBB=Solution1(Pnt1,Knt2,Code);
					if (BBBB) 
						Out_Prm.Spis.push(Lin)
					
					Xa=Xb;
					Ya=Yb;
					
					
				}

				// получаем координаты конечной точки исходного сегмента
				if (OB1.OB=="O") 
				{
					U=CalcP9_O1(OB1,MCompl(1,0));
					Xb=U.E.Re;
					Yb=U.F.Re;
				}
				if (OB1.OB=="D") 
				{
					U=CalcP9_D1(OB1,1);
					Xb=U.E.Re;
					Yb=U.F.Re;
				}
				if (OB1.OB=="Z") 
				{
					U=CalcP9_Z(OB1,1);
					Xb=U.E.Re;
					Yb=U.F.Re;
				}
				
				if (!((Math.abs(Xa-Xb)<Eps) && (Math.abs(Ya-Yb)<Eps)))
				{
					var Lin = new Object();

					if (OB1.OB=="O") TOLine_Create(Lin,MCompl(Xa,0),MCompl(Ya,0),1,MCompl(Xb,0),MCompl(Yb,0),1,0,"sobstv",OB1.FAtt);
					if ((OB1.OB=="D") && ((OB1.FAtt.Lv==0) || (OB1.FAtt.Lv==1))) TODuga_Create(Lin,OB1.Xc,OB1.Yc,MCompl(OB1.R.Re,0),Xa,Ya,Xb,Yb,DAtt);
					var Pnt1 = new Object();
					EExecP9(Pnt1,Lin,Cst,Att,1,1);
					if ((OB1.OB=="D") && (OB1.FAtt.Lv==2)) TODuga_Create(Lin,OB1.Xc,OB1.Yc,MCompl(-OB1.R.Re,0),Xb,Yb,Xa,Ya,DAtt);
					if (Solution1(Pnt1,Knt2,Code)) 
						Out_Prm.Spis.push(Lin) 
				}
			} else
			{
				if (OB1.OB=="O") 
				{
					U=CalcP9_O1(OB1,MCompl(1,0));
					Xa=U.E.Re;
					Ya=U.F.Re;
				}
				if (OB1.OB=="D") 
				{
					U=CalcP9_D1(OB1,1);
					Xa=U.E.Re;
					Ya=U.F.Re;
				}
				if (OB1.OB=="Z")
				{
					U=CalcP9_Z(OB1,1);
					Xa=U.E.Re;
					Ya=U.F.Re;
				}

				for (var K=Finish; K>=Start; K--)
				{
					V=Points1[K];
					if (V.Prm==I) continue;
					Xb=V.X.Re;
					Yb=V.Y.Re;

					var Lin = new Object();

					if (OB1.OB=="O") TOLine_Create(Lin,MCompl(Xa,0),MCompl(Ya,0),1,MCompl(Xb,0),MCompl(Yb,0),1,0,"sobstv",OB1.FAtt);
					if ((OB1.OB=="D") && ((OB1.FAtt.Lv==0) || (OB1.FAtt.Lv==1))) TODuga_Create(Lin,OB1.Xc,OB1.Yc,MCompl(OB1.R.Re,0),Xa,Ya,Xb,Yb,DAtt);
					if ((OB1.OB=="D") && (OB1.FAtt.Lv==2)) TODuga_Create(Lin,OB1.Xc,OB1.Yc,MCompl(-OB1.R.Re,0),Xb,Yb,Xa,Ya,DAtt);
					if (OB1.OB=="Z") TOBezje_Create(Lin,Xa,Ya,0,0,100,100,Xb,Yb,DAtt);
					Prm=V.Prm;

					var Pnt1 = new Object()
					EExecP9(Pnt1,Lin,Cst,Att,1,1);

					if (Solution1(Pnt1,Knt2,Code)) 
						Out_Prm.Spis.push(Lin)
					
					Xa=Xb;
					Ya=Yb;
				}
				
				if (OB1.OB=="O") 
				{
					U=CalcP9_O1(OB1,MCompl(0,0));
					Xb=U.E.Re;
					Yb=U.F.Re;
				}
				if (OB1.OB=="D") 
				{
					U=CalcP9_D1(OB1,0);
					Xb=U.E.Re;
					Yb=U.F.Re;
				}
				if (OB1.OB=="Z") 
				{
					U=CalcP9_Z(OB1,0);
					Xb=U.E.Re;
					Yb=U.F.Re;
				}

				if (!((Math.abs(Xa-Xb)<Eps) && (Math.abs(Ya-Yb)<Eps))) 
				{
					var Lin = new Object();
					if (OB1.OB=="O") TOLine_Create(Lin,MCompl(Xa,0),MCompl(Ya,0),1,MCompl(Xb,0),MCompl(Yb,0),1,0,"sobstv",OB1.FAtt);
					if ((OB1.OB=="D") && ((OB1.FAtt.Lv==0) || (OB1.FAtt.Lv==1))) TODuga_Create(Lin,OB1.Xc,OB1.Yc,MCompl(OB1.R.Re,0),Xa,Ya,Xb,Yb,DAtt);
					if ((OB1.OB=="D") && (OB1.FAtt.Lv==2)) TODuga_Create(Lin,OB1.Xc,OB1.Yc,MCompl(-OB1.R.Re,0),Xb,Yb,Xa,Ya,DAtt);
					if (OB1.OB=="Z") TOBezje_Create(Lin,Xa,Ya,0,0,100,100,Xb,Yb,DAtt);

					var Pnt1 = new Object();
					EExecP9(Pnt1,Lin,Cst,Att,1,1);

					if (Solution1(Pnt1,Knt2,Code)) 
						Out_Prm.Spis.push(Lin) 
				}
			}
		}
	}	


	DAtt.Lv=Att1.Lv;
    if (Points2.length>0) DAtt.Lv=0;

	if (!(Knt2==undefined))  
	if (!(Knt2.Spis==undefined)) 
	for (var I=0; I<=Knt2.Spis.length-1; I++)
    {
		Start=-1;
		Finish=-1;

		for (var K=0; K<=Points2.length-1; K++)
		{
			V=Points2[K];
			if ((V.Prm>=I) && (V.Prm<I+1) && (Start==-1)) Start=K;
			if ((V.Prm>=I) && (V.Prm<I+1) && !(Start==-1)) Finish=K;

		}
		
		if (Start==-1) 
		{
			
			OB1=Knt2.Spis[I];
			DAtt.Lv=1;
			if ((OB1.FAtt.Lv==0) || ((OB1.FAtt.Lv>0) && (InPoints(OB1,Points2)))) DAtt.Lv=0;
			
			var Pnt1=new Object();
			
			EExecP9(Pnt1,OB1,Cst, Att,1,1);
			
			if (Solution2(Pnt1,Knt1,Code))
			{
				if (OB1.OB=="O") 
				{
					var U = new Object();
					TOLine_Create(U,OB1.X1,OB1.Y1,1,OB1.X2,OB1.Y2,1,0,"sobstv",OB1.FAtt)
					Out_Prm.Spis.push(U);
				}
				
				if (OB1.OB=="D") 
				{
					var U = new Object();
					TODuga_Create(U,OB1.Xc,OB1.Yc,MCompl(OB1.R.Re,0),OB1.X1,OB1.Y1,OB1.X2,OB1.Y2,DAtt)
					Out_Prm.Spis.push(U);
				}

				if (OB1.OB=="Z")
				{	
					var U = new Object();
					TOBezje_Create(U,OB1.PX0,OB1.PY0,OB1.PX1,OB1.PY1,OB1.PX2,OB1.PY2,OB1.PX3,OB1.PY3,DAtt);
					Out_Prm.Spis.push(U);
				}
			}
			
		} else
		{
			OB1=Knt2.Spis[I];
			DAtt.Lv=1;
			if ((OB1.FAtt.Lv==0) || ((OB1.FAtt.Lv>0) && (InPoints(OB1,Points2)))) DAtt.Lv=0;
			Prm=I;
			
			if (OB1.OB=="O") 
			{
				U=CalcP9_O1(OB1,MCompl(0,0));
				Xa=U.E.Re;
				Ya=U.F.Re;
			}
			if (OB1.OB=="D") 
			{
				U=CalcP9_D1(OB1,0);
				Xa=U.E.Re;
				Ya=U.F.Re;
			}
			if (OB1.OB=="Z") 
			{
				U=CalcP9_Z(OB1,0);
				Xa=U.E.Re;
				Ya=U.F.Re;
			}
			
			BB1=false;
			if (OB1.OB=="O") BB1=((Math.abs(Xa-OB1.X1.Re)<Eps) && (Math.abs(Ya-OB1.Y1.Re)<Eps));
			if (OB1.OB=="D") BB1=((Math.abs(Xa-OB1.X1)<Eps) && (Math.abs(Ya-OB1.Y1)<Eps));
			if ((OB1.OB=="D") && (OB1.FAtt.Lv==2)) BB1=((Math.abs(Xa-OB1.X2)<Eps) && (Math.abs(Ya-OB1.Y2)<Eps));
			if (OB1.OB=="Z") BB1=((Math.abs(Xa-OB1).PX0<Eps) && (Math.abs(Ya-OB1.PY0)<Eps));
			if (BB1)
			{
				for (K=Start; K<=Finish; K++)
				{
					V=Points2[K];
					if (V.Prm==I) continue;
					Xb=V.X.Re;
					Yb=V.Y.Re;
					
					Lin = new Object();
					if (OB1.OB=="O") TOLine_Create(Lin,MCompl(Xa,0),MCompl(Ya,0),1,MCompl(Xb,0),MCompl(Yb,0),1,0,"sobstv",OB1.FAtt);
					if (OB1.OB=="D") TODuga_Create(Lin,OB1.Xc,OB1.Yc,MCompl(OB1.R.Re,0),Xa,Ya,Xb,Yb,DAtt);
					if ((OB1.OB=="D") && (OB1.FAtt.Lv==2)) TODuga_Create(Lin,OB1.Xc,OB1.Yc,MCompl(-OB1.R.Re,0),Xb,Yb,Xa,Ya,DAtt);
					if (OB1.OB=="Z") TOBezje_Create(Lin,Xa,Ya,0,0,100,100,Xb,Yb,DAtt);

					Prm=V.Prm;
					var Pnt1 = new Object();
					EExecP9(Pnt1,Lin,Cst, Att,1,1);

					if (Solution2(Pnt1,Knt1,Code)) 
						Out_Prm.Spis.push(Lin) 
					Xa=Xb;
					Ya=Yb;
				}
				
				if (OB1.OB=="O") 
				{
					U=CalcP9_O1(OB1,MCompl(1,0));
					Xb=U.E.Re;
					Yb=U.F.Re;
				}
				if (OB1.OB=="D") 
				{
					U=CalcP9_D1(OB1,1);
					Xb=U.E.Re;
					Yb=U.F.Re;
				}
				if (OB1.OB=="Z")
				{					
					U=CalcP9_Z(OB1,1);
					Xb=U.E.Re;
					Yb=U.F.Re;
				}
				
				if (!((Math.abs(Xa-Xb)<Eps) && (Math.abs(Ya-Yb)<Eps)))
				{
					Lin = new Object();
					if (OB1.OB=="O") TOLine_Create(Lin,MCompl(Xa,0),MCompl(Ya,0),1,MCompl(Xb,0),MCompl(Yb,0),1,0,"sobstv",OB1.FAtt);
					if (OB1.OB=="D") TODuga_Create(Lin,OB1.Xc,OB1.Yc,MCompl(OB1.R.Re,0),Xa,Ya,Xb,Yb,DAtt);
					if ((OB1.OB=="D") && (OB1.FAtt.Lv==2)) TODuga_Create(Lin,OB1.Xc,OB1.Yc,MCompl(-OB1.R.Re,0),Xb,Yb,Xa,Ya,DAtt);
					if (OB1.OB=="Z") TOBezje_Create(Lin,Xa,Ya,0,0,100,100,Xb,Yb,DAtt);
					
					var Pnt1= new Object()
					EExecP9(Pnt1,Lin,Cst, Att,1,1);
					if (Solution2(Pnt1,Knt1,Code)) 
						Out_Prm.Spis.push(Lin) 
				}
			} else
			{
				if (OB1.OB=="O") 
				{
					U=CalcP9_O1(OB1,MCompl(1,0));
					Xa=U.E.Re;
					Ya=U.F.Re;
				}
				if (OB1.OB=="D") 
				{
					U=CalcP9_D1(OB1,1);
					Xa=U.E.Re;
					Ya=U.F.Re;
				}
				if (OB1.OB=="Z")
				{
					U=CalcP9_Z(OB1,1);
					Xa=U.E.Re;
					Ya=U.F.Re;
				}

				for (K=Finish; K>=Start; K--) 
				{
					V=Points2[K];
					if (V.Prm==I) continue;
					Xb=V.X.Re;
					Yb=V.Y.Re;
					
					Lin = new Object();
					if (OB1.OB=="O") TOLine_Create(Lin,MCompl(Xa,0),MCompl(Ya,0),1,MCompl(Xb,0),MCompl(Yb,0),1,0,"sobstv",OB1.FAtt);
					if (OB1.OB=="D") TODuga_Create(Lin,OB1.Xc,OB1.Yc,MCompl(OB1.R.Re,0),Xa,Ya,Xb,Yb,DAtt);
					if ((OB1.OB=="D") && (OB1.FAtt.Lv==2)) TODuga_Create(Lin,OB1.Xc,OB1.Yc,MCompl(-OB1.R.Re,0),Xb,Yb,Xa,Ya,DAtt);
					if (OB1.OB=="Z") TOBezje_Create(Lin,Xa,Ya,0,0,100,100,Xb,Yb,DAtt);
					Prm=V.Prm;

					var Pnt1 = new Object();
					EExecP9(Pnt1,Lin,Cst, Att,1,1);

					if (Solution2(Pnt1,Knt1,Code)) 
						Out_Prm.Spis.push(Lin) 
					Xa=Xb;
					Ya=Yb;
				}
				
				if (OB1.OB=="O") 
				{
					U=CalcP9_O1(OB1,MCompl(0,0));
					Xb=U.E.Re;
					Yb=U.F.Re;
				}
				if (OB1.OB=="D") 
				{
					U=CalcP9_D1(OB1,0);
					Xb=U.E.Re;
					Yb=U.F.Re;
				}
				if (OB1.OB=="Z") 
				{
					U=CalcP9_Z(OB1,0);
					Xb=U.E.Re;
					Yb=U.F.Re;
				}

				if (!((Math.abs(Xa-Xb)<Eps) && (Math.abs(Ya-Yb)<Eps))) 
				{
					Lin = new Object();
					if (OB1.OB=="O") TOLine_Create(Lin,MCompl(Xa,0),MCompl(Ya,0),1,MCompl(Xb,0),MCompl(Yb,0),1,0,"sobstv",OB1.FAtt);
					if (OB1.OB=="D") TODuga_Create(Lin,OB1.Xc,OB1.Yc,MCompl(OB1.R.Re,0),Xa,Ya,Xb,Yb,DAtt);
					if ((OB1.OB=="D") && (OB1.FAtt.Lv==2)) TODuga_Create(Lin,OB1.Xc,OB1.Yc,MCompl(-OB1.R.Re,0),Xb,Yb,Xa,Ya,DAtt);
					if (OB1.OB=="Z") TOBezje_Create(Lin,Xa,Ya,0,0,100,100,Xb,Yb,DAtt,nil);
					
					var Pnt1 = new Object();
					EExecP9(Pnt1,Lin,Cst, Att,1,1);
					if (Solution2(Pnt1,Knt1,Code)) 
						Out_Prm.Spis.push(Lin) 
				}
			}
		}
	}

    for ( var I= Out_Prm.Spis.length - 1; I>=0; I--) 
    {
		var E1=Out_Prm.Spis[I];
		if (E1.OB=="O")
		{
			if (IsNull(E1))
			{
				Out_Prm.Spis.splice(I,1);
			}
		}
		// надо удалять только нулевые дуги, но не окружности
		if (E1.OB=="D")
		{
			if  (!((E1.Vid==1) || (E1.Vid==5))) if (Dist(E1.X1,E1.Y1,E1.X2,E1.Y2)<Eps)
			{
			   Out_Prm.Spis.splice(I);
			}
		}
    }


    Ordnung(Out_Prm,true);
    Out_Prm.Zamkn=true;

//    CalcGabarit(Out_Prm);

	
	
	
//	TOEmpty_Create(Out_Prm,Att);
}

function Dist(X1,Y1,X2,Y2)
{
	Result=Math.sqrt(Sqr(X1-X2)+Sqr(Y1-Y2));
	return Result;
} // Dist 

function IndexOf(array, value) 
{

	for (var i = 0; i < array.length; i++) 
	{
		if (array[i] == value) return i;
	}
  return -1;
} // IndexOf

function Ordnung(KNT,Act)
{
	var X1,Y1,I,J,L,XA,YA,XB,YB,TX,TY,E1,E2;
	if (KNT.Spis.length==0) return;
	L=KNT.Spis.length;


	KNT.SubKonturs.length=0;
	
	var ABC=true;
	I=-1;
	
	do
	{
		I++;
		if (ABC)
		{
			E=KNT.Spis[I];
			var P = new Object();
			P.E=KNT.Spis[I];
			KNT.SubKonturs.push(P);
		}

		ABC=true;
		
		E1=KNT.Spis[I];

		if (E1.OB=="O") 
		{
			X1=E1.X2.Re;
			Y1=E1.Y2.Re;
		}

		if (E1.OB=="D")
		{
			X1=E1.X2;
			Y1=E1.Y2;
		}

		if (E1.OB=="Z") 
		{
			X1=E1.PX3;
			Y1=E1.PY3;
		}

		J=I+1;

		while (J<KNT.Spis.length)
		{
			var Found=false;
			var Revers=false;
			E2=KNT.Spis[J];

			if (E2.OB=="O")
			{
				XA=E2.X1.Re;
				YA=E2.Y1.Re;
				XB=E2.X2.Re;
				YB=E2.Y2.Re;
			}

			if (E2.OB=="D")
			{
				XA=E2.X1;
				YA=E2.Y1;
				XB=E2.X2;
				YB=E2.Y2;
			}

			if (E2.OB=="Z")
			{
				XA=E2.PX0;
				YA=E2.PY0;
				XB=E2.PX3;
				YB=E2.PY3;
			}

			if (Dist(X1,Y1,XA,YA)<Eps) Found=true;

			if (Dist(X1,Y1,XB,YB)<Eps) {Found=true; Revers=true}

			if (Found) 
			{
				if (Revers) 
				{
					if (E2.OB=="O")
					{
						TX=0+E2.X1.Re;
						TY=0+E2.Y1.Re;
						E2.X1.Re=0+E2.X2.Re;
						E2.Y1.Re=0+E2.Y2.Re;
						E2.X2.Re=0+TX;
						E2.Y2.Re=0+TY;
					}

					if (E2.OB=="D") 
					{
						TX=E2.X1;
						TY=E2.Y1;
						E2.X1=E2.X2;
						E2.Y1=E2.Y2;
						E2.X2=TX;
						E2.Y2=TY;
						E2.R.Re=-E2.R.Re;
					}

					if (E2.OB=="Z") 
					{
						TX=E2.PX0;
						TY=E2.PY0;
						E2.PX0=E2.PX3;
						E2.PY0=E2.PY3;
						E2.PX3=TX;
						E2.PY3=TY;
						TX=E2.PX1;
						TY=E2.PY1;
						E2.PX1=E2.PX2;
						E2.PY1=E2.PY2;
						E2.PX2=TX;
						E2.PY2=TY;
					}

				}

				if (J>I+1) 
				{
					var A=KNT.Spis[I+1];
					KNT.Spis[I+1]=KNT.Spis[J];
					KNT.Spis[J]=A;
				}
			}

			if (Found) break;

			J++;

		}
	

		if (Found  && (I<KNT.Spis.length-1)) ABC=false;
	
	}
	while (I<KNT.Spis.length-1)

	E1=KNT.Spis[0];

	if (E1.OB=="O")
	{
		XA=E1.X1.Re;
		YA=E1.Y1.Re;
	}

	if (E1.OB=="D") 
	{
		XA=E1.X1;
		YA=E1.Y1;
	}

	if (E1.OB=="Z")
	{
		XA=E1.PX0;
		YA=E1.PY0;
	}

	E1=KNT.Spis[KNT.Spis.length-1];

	if (E1.OB=="O") 
	{
		XB=E1.X2.Re;
		YB=E1.Y2.Re;
	}

	if (E1.OB=="D")
	{
		XB=E1.X2;
		YB=E1.Y2;
	}

	if (E1.OB=="Z")
	{
		XB=E1.PX3;
		YB=E1.PY3;
	}

	KNT.Zamkn=(Dist(XA,YA,XB,YB)<Eps);


     //Здесь надо определить вложенность подконтуров
     //и согласовать их ориентацию

     // создадим список контуров по отдельности
	var List = []

	for (I=0; I<=KNT.SubKonturs.length-1; I++)
	{
		if (I<KNT.SubKonturs.length-1)
		{
			P=KNT.SubKonturs[I];
			E1=P.E;
			P1=KNT.SubKonturs[I+1];
			E2=P1.E;
			Start=IndexOf(KNT.Spis,E1);
			Finish=IndexOf(KNT.Spis,E2)-1;
			Len=Finish-Start+1;
			P.Start=Start;
			P.Len=Len;
			P.Vl=0;
			P.Parent=-1;
		}

		if (I==KNT.SubKonturs.length - 1) 
		{
			P=KNT.SubKonturs[I];
			E1=P.E;
			Start=IndexOf(KNT.Spis,E1);
			Finish=L-1;
			Len=Finish-Start+1;
			P.Start=Start;
			P.Len=Len;
			P.Vl=0;
			P.Parent=-1;
		}

		W = new Object();
		TOKontur_Create(W,Att0);
		W.Spis.length=Finish-Start+1;
		W.L=Finish-Start+1;
		List.push(W);

		for (var J=0; J<=Finish-Start; J++) 
		{
			W.Spis[J]=KNT.Spis[Start+J];
		}
	}

     // Определим степени вложенности для каждого

	Cst = new Object();
	Pnt = new Object();
	TOChisl_Create(Cst,MCompl(0.5,0),Att0);
	for (var I=0; I<=List.length-1; I++)
	{
		var Vloz=0;

		for (var J=0; J<=List.length-1; J++)
		{
			var KNT1=List[I];
			var E1=KNT1.Spis[0];

			if (!(I==J)) 
			{
				KNT2=List[J];

				EExecP9(Pnt,E1,Cst,Att0,1,1);
				// Возможно отсутствие пересечения из-за проблем с углом в функции PointInsideContur
				// Луч может плохо пересекать совпадающие с ним прямые

				B=PointInsideContur(Pnt,KNT2);
				if (B)
				{
					Vloz++;
					var P=KNT.SubKonturs[I];
					P.Vl=Vloz;
				}
			}
			KNT1.Vl=Vloz;
		}
	}



	// Определяем, что во что вложено
	
	Pnt = new Object();

	if (List.length>1)  // это имеет смысл делать, если подконтуров больше, чем 1
	for (I=0; I<=List.length-2; I++) 
	{
		KNT1=List[I];
		E1=KNT1.Spis[0];
		for (J=I+1; J<=List.length-1; J++)
		{
			KNT2=List[J];
			E2=KNT2.Spis[0];
			if (!(Math.abs(KNT1.Vl-KNT2.Vl)==1)) continue; // контуры не являются смежно-вложенными
			
			EExecP9(Pnt,E1,Cst,Att0,1,1);
			B=PointInsideContur(Pnt,KNT2);
			
			if (B)  // Контур Knt1 вложен в Knt2; сделать соответственные назначения
			{
				P=KNT.SubKonturs[I];
				P1=KNT.SubKonturs[J];
				P.Parent=P1.Start;
			}
			
			if (B) continue;

			EExecP9(Pnt,E2,Cst,Att0,1,1);
			B=PointInsideContur(Pnt,KNT1);
			if (B) // Контур Knt2 вложен в Knt1; сделать соответственные назначения
			{
				P=KNT.SubKonturs[J];
				P1=KNT.SubKonturs[I];
				P.Parent=P1.Start;
			}
		}
	}

	// В соответствии с текущей ориентацией и степенью вложенности
	// корректируем ориентацию

	if (Act) 
	for (var J=0; J<=List.length-1; J++) 
	{
		W=List[J];
		Sq=Square(W);
		if ((Sq<0) && (W.Vl%2==0)) Reorient(W);
		if ((Sq>0) && (W.Vl%2==1)) Reorient(W);
		Sq=Square(W);
	}

// Ликвидация дуг, переходящих через ноль



	do
	{
		L=KNT.Spis.length;
		Found=false;
		for (var I=0; I<=L-2; I++) 
		{
			for (var J=I+1; J<=L-1; J++) 
			{
				E1=KNT.Spis[I];
				E2=KNT.Spis[J];

				if ((E1.OB=="D") && (E2.OB=="D"))
				{

					if (Math.abs(E1.Xc.Re-E2.Xc.Re)<Eps) 
					if (Math.abs(E1.Yc.Re-E2.Yc.Re)<Eps) 
					if (Math.abs(E1.R.Re-E2.R.Re)<Eps) 
					{
						if (Math.abs(E1.X1-E2.X2)<Eps) 
						if (Math.abs(E1.Y1-E2.Y2)<Eps) 
						{
							E1.X1=E2.X1;
							E1.Y1=E2.Y1;
							KNT.Spis.splice(J,1);
							Found=true;
							break;
						}

						if (Math.abs(E1.X2-E2.X1)<Eps)
						if (Math.abs(E1.Y2-E2.Y1)<Eps) 
						{
							E1.X2=E2.X2;
							E1.Y2=E2.Y2;
							KNT.Spis.splice(J,1);
							Found=true;
							break;
						};
					}
				}
			}
			if (Found) break;
		}
	}
	while (Found==true);

	for (var I=0; I<=KNT.Spis.length-1; I++) 
	{
		OB=KNT.Spis[I];
//		CalcGabarit(OB);
	}

} // TOKontur.Ordnung

function Square(W)
{
	var S=0;
	for (I=1; I<=W.Spis.length; I++) 
	{
		var G=W.Spis[I-1];
		var A=W.Spis[I-1];
		var B=W.Spis[I-1];
		if (G.OB=='O')
		{
			var S1=0.5*(A.Y1.Re+A.Y2.Re)*(A.X2.Re-A.X1.Re);
			S=S+S1;
		}
		
		if (G.OB=='D')
		{
			if (B.Vid==0)
			{
				var S1=0; 
				var S2=0;
				S1=S1+0.5*(B.Y1+B.Yc.Re)*(B.Xc.Re-B.X1);
				S2=S2+0.5*(B.Yc.Re+B.Y2)*(B.X2-B.Xc.Re);

				UU=StartStop(B.Xc.Re,B.Yc.Re,B.X1,B.Y1,B.X2,B.Y2,B.R.Re,Ast,Aen);
				Ast=UU.Ast;
				Aen=UU.Aen;
				var S3=-(Aen-Ast)*B.R.Re*B.R.Re/2;
				S=S+S1+S2+S3;
			}
			
			if ((B.Vid==1) || (B.Vid==5))
			{
				B=W.Spis[I-1];
				S=S+Math.PI*Sqr(B.R.Re)*Math.sign(-B.R.Re);
			}
		}
	}
	return -S;
} // Square

function Reorient(KNT)
{
	var A = {Re:0, Im:0}
	var B = {Re:0, Im:0}
	
	for (var I=0; I<=KNT.Spis.length-1; I++)
	{
		var OB=KNT.Spis[I];

		if (OB.OB=='O') 
		{
			A=OB.X1;
			B=OB.Y1;
			OB.X1=OB.X2;
			OB.Y1=OB.Y2;
			OB.X2=A;
			OB.Y2=B;
		}

		if (OB.Obj=='D')
		{
			XA=OB.X1;
			YA=OB.Y1;
			OB.X1=OB.X2;
			OB.Y1=OB.Y2;
            OB.X2=XA;
			OB.Y2=YA;
			OB.R.Re=-OB.R.Re;
		}

		if (OB.OB=='Z') 
		{
			XA=OB.PX0;
			YA=OB.PY0;
			OB.PX0=OB.PX3;
			OB.PY0=OB.PY3;
			OB.PX3=XA;
			OB.PY3=YA;
			XA=OB.PX1;
			YA=OB.PY1;
			OB.PX1=OB.PX2;
			OB.PY1=OB.PY2;
			OB.PX2=XA;
			OB.PY2=YA;
		}

	}

	var E1=KNT.Spis[0];
	var E2=KNT.Spis[KNT.Spis.length-1];
	var I1=IndexOf(KNT.Spis,E1);
	var I2=IndexOf(KNT.Spis,E2);
	for (I=0; I<=Math.trunc((I2-I1)/2); I++) 
	{
		var M=KNT.Spis[I1+I];
		KNT.Spis[I1+I]=KNT.Spis[I2-I];
		KNT.Spis[I2-I]=M;
	}

} // Reorient

function EExecO00(OOO,X,Y,Z,U,V,T,Att,Sg1,Sg2,Sg3,Sg4,Sg5,Sg6)
{
	if ((X.OB==undefined) || (Y.OB==undefined) || (Z.OB==undefined) || (U.OB==undefined) || (V.OB==undefined) || (T.OB==undefined)) return false;

	var A = {Re:0, Im:0}
	var B = {Re:0, Im:0}
	var C = {Re:0, Im:0}
	var D = {Re:0, Im:0}

	if ((X.OB=="C") && (Y.OB=="C") && (Z.OB=="C") && (U.OB=="C") && (V.OB=="C") && (T.OB=="C"))
	{
		A=MCompl(X.C.Re*Sg1,X.C.Im*Sg1);
		B=MCompl(Y.C.Re*Sg2,Y.C.Im*Sg2);
		C=MCompl(U.C.Re*Sg4,U.C.Im*Sg4);
		D=MCompl(V.C.Re*Sg5,V.C.Im*Sg5);

		if (Z.C.Re==1) {TOLine_Create(OOO,A,B,1,C,D,1,brn_Limited,"sobstv",Att)}
		else {TOLine_Create(OOO,A,B,0,C,D,0,brn_Limited,"nesobstv",Att)};
	} else if (Att.Chk==1) TOEmpty_Create(OOO,Att);

    Result=true;
	return Result;
} // EExecO00

function EExecWU(OOO,LC,Att)
{
	if (LC.length==0) return false;
	Result=false;

	List = new Array();
    
	var X = new Object()
	CreateCopy(X,LC[0]);

	if (LC.length==1)
	{
		var WK1 = new Object()
		if (X.OB=="D") 
		{
			TOKontur_Create(WK1,Att);
			var Lin = new Object()
			TODuga_Create(Lin,X.Xc,X.Yc,MCompl(X.R.Re,0),X.X1,X.Y1,X.X2,X.Y2,X.FAtt);
			WK1.Spis.push(Lin);
			WK1.L=1;
			WK1.Zamkn=true;
		}

		if (X.OB=="W") CreateCopy(WK1,X);

		List.push(WK1);
    }

	for (var I=1; I<=LC.length-1; I++)
	{
		var Y=LC[I];
		var B=SysVar.AllowComplex;
		SysVar.AllowComplex=false;
		var Q = new Object();
		CommonKonturWork(Q,X,Y,Att,1);
		SysVar.AllowComplex=B;

		List.push(Q);
		var X = new Object();
		CreateCopy(X,Q);
	}


	CreateCopy(OOO,List[List.length-1]);
	Ordnung(OOO,false);
	OOO.Zamkn=true;
	Result=true;
	return Result;
} // EExecWU;


function funcplus()
{
	AAA=AAA+5;
	Main();
}
function funcminus()
{
	AAA=AAA-5;
	Main();
}
function funcplus1()
{
	BBB=BBB+5;
	Main();
}
function funcminus1()
{
	BBB=BBB-5;
	Main();
}

function funcleft()
{
	_Xl=_Xl-10;
    svg.setAttribute("viewBox",_Xl+" "+_Yu+" "+_XW+" "+_YH);
	Main();
}
function funcright()
{
	_Xl=_Xl+10;
    svg.setAttribute("viewBox",_Xl+" "+_Yu+" "+_XW+" "+_YH);
	Main();
}
function funcup()
{
	_Yu=_Yu-10;
    svg.setAttribute("viewBox",_Xl+" "+_Yu+" "+_XW+" "+_YH);
	Main();
}

function funcdown()
{
	_Yu=_Yu+10;
    svg.setAttribute("viewBox",_Xl+" "+_Yu+" "+_XW+" "+_YH);
	Main();
}

function func2()
{
	_Xl=_Xl-_XW/2;
	_Yu=_Yu-_YH/2;
	_XW=_XW*2;
	_YH=_YH*2;
	CM=CM*2;
    svg.setAttribute("viewBox",_Xl+" "+_Yu+" "+_XW+" "+_YH);
	Main();
}
function func3()
{
	_Xl=_Xl+_XW/4;
	_Yu=_Yu+_YH/4;
	_XW=_XW/2;
	_YH=_YH/2;
	CM=CM/2;
    svg.setAttribute("viewBox",_Xl+" "+_Yu+" "+_XW+" "+_YH);
	Main();
}
function func4()
{
	Main1();
}

function funcM()
{
	for(var I=1; I<=1000; I++)
	{
		AAA=AAA+5;
		Main();

	}
}

function CreatePButtons()
{
	
	var btn=CreateButton("P0"); btn.onclick=funP0;
	var btn=CreateButton("P1"); btn.onclick=funP1;
	btn=CreateButton("P2"); btn.onclick=funP2;
	btn=CreateButton("P3"); btn.onclick=funP3;
	btn=CreateButton("P4"); btn.onclick=funP4;
	btn=CreateButton("P5"); btn.onclick=funP5;
	btn=CreateButton("P6"); btn.onclick=funP6;
	btn=CreateButton("P7"); btn.onclick=funP7;
	btn=CreateButton("P8"); btn.onclick=funP8;
	btn=CreateButton("P9"); btn.onclick=funP9;
	btn=CreateButton("PA"); btn.onclick=funPA;
	btn=CreateButton("PB"); btn.onclick=funPB;
	btn=CreateButton("PC"); btn.onclick=funPC;
	btn=CreateButton("PD"); btn.onclick=funPD;
	btn=CreateButton("PE"); btn.onclick=funPE;
	btn=CreateButton("PF"); btn.onclick=funPF;
	btn=CreateButton("PG"); btn.onclick=funPG;
	btn=CreateButton("PI"); btn.onclick=funPI;
	btn=CreateButton("PJ"); btn.onclick=funPJ;
	btn=CreateButton("PK"); btn.onclick=funPK;
	btn=CreateButton("PL"); btn.onclick=funPL;
	btn=CreateButton("PM"); btn.onclick=funPM;
	btn=CreateButton("PO"); btn.onclick=funPO;
	btn=CreateButton("PP"); btn.onclick=funPP;
	btn=CreateButton("PQ"); btn.onclick=funPQ;
	btn=CreateButton("PR"); btn.onclick=funPR;
	btn=CreateButton("PU1"); btn.onclick=funPU1;
	btn=CreateButton("PU2"); btn.onclick=funPU2;
	btn=CreateButton("PY"); btn.onclick=funPY;
	btn=CreateButton("PZ"); btn.onclick=funPZ;
	btn=CreateButton("P0L"); btn.onclick=funP0L;
	btn=CreateButton("P0A"); btn.onclick=funP0A;
	btn=CreateButton("P1L"); btn.onclick=funP1L;
	btn=CreateButton("P1A"); btn.onclick=funP1A;
	btn=CreateButton("P9L"); btn.onclick=funP9L;
	btn=CreateButton("P9A"); btn.onclick=funP9A;
	btn=CreateButton("RC"); btn.onclick=funRC;
	btn=CreateButton("X0"); btn.onclick=funX0;
}

function CreateOButtons()
{
	var btn;
	btn=CreateButton("O0"); btn.onclick=funO0;
	btn=CreateButton("O1"); btn.onclick=funO1;
	btn=CreateButton("O2"); btn.onclick=funO2;
	btn=CreateButton("O3"); btn.onclick=funO3;
	btn=CreateButton("O5"); btn.onclick=funO5;
	btn=CreateButton("O6"); btn.onclick=funO6;
	btn=CreateButton("O7"); btn.onclick=funO7;
	btn=CreateButton("O8"); btn.onclick=funO8;
	btn=CreateButton("O9"); btn.onclick=funO9;
	btn=CreateButton("OA"); btn.onclick=funOA;
	btn=CreateButton("OB"); btn.onclick=funOA;
	btn=CreateButton("OC"); btn.onclick=funOC;
	btn=CreateButton("OD"); btn.onclick=funOD;
	btn=CreateButton("OE"); btn.onclick=funOE;
	btn=CreateButton("OF"); btn.onclick=funOF;
	btn=CreateButton("OG"); btn.onclick=funOG;
	btn=CreateButton("OY"); btn.onclick=funOY;
	btn=CreateButton("O000"); btn.onclick=funO000;
	btn=CreateButton("RA"); btn.onclick=funRA;
}

function CreateDButtons()
{
	var btn;
	btn=CreateButton("D0"); btn.onclick=funD0;
//	btn=CreateButton("D0A"); btn.onclick=funD0A;
	btn=CreateButton("D0D"); btn.onclick=funD0D;
	btn=CreateButton("D1"); btn.onclick=funD1;
	btn=CreateButton("D1D"); btn.onclick=funD1D;
	btn=CreateButton("D2"); btn.onclick=funD2;
	btn=CreateButton("D3"); btn.onclick=funD3;
	btn=CreateButton("D4"); btn.onclick=funD4;
	btn=CreateButton("D5"); btn.onclick=funD5;
	btn=CreateButton("D6"); btn.onclick=funD6;
	btn=CreateButton("D7"); btn.onclick=funD7;
	btn=CreateButton("D9"); btn.onclick=funD9;
	btn=CreateButton("DA"); btn.onclick=funDA;
	btn=CreateButton("DB"); btn.onclick=funDB;
	btn=CreateButton("DC0"); btn.onclick=funDC0;
	btn=CreateButton("DD"); btn.onclick=funDD;
	btn=CreateButton("DE"); btn.onclick=funDE;
	btn=CreateButton("DG"); btn.onclick=funDG;
	btn=CreateButton("DH"); btn.onclick=funDH;
	btn=CreateButton("DI"); btn.onclick=funDI;
	btn=CreateButton("DN"); btn.onclick=funDN;
	btn=CreateButton("OK001"); btn.onclick=funOK001;
}

function CreateCButtons()
{
	var btn;
	btn=CreateButton("C0"); btn.onclick=funC0;
	btn=CreateButton("C1"); btn.onclick=funC1;
	btn=CreateButton("C2"); btn.onclick=funC2;
	btn=CreateButton("C3"); btn.onclick=funC3;
	btn=CreateButton("C4"); btn.onclick=funC4;
	btn=CreateButton("C5"); btn.onclick=funC5;
	btn=CreateButton("C6"); btn.onclick=funC6;
	btn=CreateButton("C7"); btn.onclick=funC7;
	btn=CreateButton("C8"); btn.onclick=funC8;
	btn=CreateButton("C9"); btn.onclick=funC9;
	btn=CreateButton("CA"); btn.onclick=funCA;
	btn=CreateButton("CC"); btn.onclick=funCC;
	btn=CreateButton("CE"); btn.onclick=funCE;
	btn=CreateButton("CG"); btn.onclick=funCG;
	btn=CreateButton("CH"); btn.onclick=funCH;
	btn=CreateButton("CI"); btn.onclick=funCI;
	btn=CreateButton("CJ"); btn.onclick=funCJ;
	btn=CreateButton("CK"); btn.onclick=funCK;
	btn=CreateButton("CX"); btn.onclick=funCX;
	btn=CreateButton("CZ"); btn.onclick=funCZ;
}


function CreateAButtons()
{
	btn=CreateButton("A0"); btn.onclick=funA0;
	btn=CreateButton("A1"); btn.onclick=funA1;
	btn=CreateButton("A2"); btn.onclick=funA2;
	btn=CreateButton("A3"); btn.onclick=funA3;
	btn=CreateButton("A4"); btn.onclick=funA4;
	btn=CreateButton("A5"); btn.onclick=funA5;
	btn=CreateButton("A6"); btn.onclick=funA6;
	btn=CreateButton("A7"); btn.onclick=funA7;
	btn=CreateButton("A8"); btn.onclick=funA8;
	btn=CreateButton("A9"); btn.onclick=funA9;
	btn=CreateButton("AA"); btn.onclick=funAA;
	btn=CreateButton("AB"); btn.onclick=funAB;
	btn=CreateButton("AC"); btn.onclick=funAC;
	btn=CreateButton("AD"); btn.onclick=funAD;
	btn=CreateButton("AE"); btn.onclick=funAE;
	btn=CreateButton("AF"); btn.onclick=funAF;
	btn=CreateButton("AG"); btn.onclick=funAG;
	btn=CreateButton("AH"); btn.onclick=funAH;
	btn=CreateButton("AI"); btn.onclick=funAI;
	btn=CreateButton("AJ"); btn.onclick=funAJ;
	btn=CreateButton("AK"); btn.onclick=funAK;
	btn=CreateButton("AL"); btn.onclick=funAL;
	btn=CreateButton("AM"); btn.onclick=funAM;
	btn=CreateButton("AN"); btn.onclick=funAN;
	btn=CreateButton("AO"); btn.onclick=funAO;
	btn=CreateButton("AP"); btn.onclick=funAP;
	btn=CreateButton("AQ"); btn.onclick=funAQ;
	btn=CreateButton("AR"); btn.onclick=funAR;
	btn=CreateButton("AS"); btn.onclick=funAS;
}


function CreateTools()
{
	btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/pointer.png">';
	btn.onclick=pointer;
	document.body.appendChild(btn)
/*	
	btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/shaper.png">';
	document.body.appendChild(btn)

	btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/lens.png">';
	document.body.appendChild(btn)
*/
	btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/point.png">';
	btn.onclick=freepoint;
	document.body.appendChild(btn)
/*

	btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/line.png">';
	document.body.appendChild(btn)

	btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/assign.png">';
	document.body.appendChild(btn)
	
	btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/infinity.png">';
	document.body.appendChild(btn)
*/	
	btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/back.png">';
	btn.onclick=back;
	document.body.appendChild(btn)
	btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/new.png">';
	btn.onclick=NewDocument;
	document.body.appendChild(btn)
	
	btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/edit.png">';
	btn.onclick=Edit;
	document.body.appendChild(btn)

	btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/attr.png">';
	btn.onclick=AtriWin;
	document.body.appendChild(btn)
	
	btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/open.png">';
	btn.onclick=winLoad;
	document.body.appendChild(btn)

	btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/save.png">';
	btn.onclick=Save;
	document.body.appendChild(btn)
}

function AtriWin()
{
	var	ppp=parent.document.getElementById("rightFrame1");
	ppp.contentDocument.close()
	ppp.contentDocument.open()
	
	ppp.contentDocument.writeln("Цвет абриса");	
	ppp.contentDocument.writeln("<hr>");	

	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/cl_black.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)

	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/cl_red.png">';
	btn.onclick=colorRed;
	ppp.contentDocument.body.appendChild(btn)
	
	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/cl_green.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)
	
	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/cl_blue.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)
	
	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/cl_black.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)
	
	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/cl_black.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)
	
	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/cl_black.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)
	
	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/cl_black.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)
	
	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/cl_black.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)
	
	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/cl_black.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)
	
	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/cl_black.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)
	
	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/cl_black.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)
	
	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/cl_black.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)
	
	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/cl_black.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)
	
	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/cl_black.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)
	
	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/cl_black.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)
	
	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/cl_black.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)
	
	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/cl_black.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)
	
	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/cl_black.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)
	
	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/cl_black.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)
	
	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/cl_black.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)
	
	ppp.contentDocument.writeln("<BR>");
	ppp.contentDocument.writeln("<BR>");
	ppp.contentDocument.writeln("Вид");	
	ppp.contentDocument.writeln("<hr>");	

	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/lv0.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)
	
	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/lv1.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)

	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/lv2.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)

	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/lv3.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)

	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/lv4.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)

	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/lv5.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)
	
	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/lv6.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)
	
	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/lv7.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)
	
	ppp.contentDocument.writeln("<BR>");
	ppp.contentDocument.writeln("<BR>");
	ppp.contentDocument.writeln("Стиль");	
	ppp.contentDocument.writeln("<hr>");	
	
	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/lt0.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)

	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/lt1.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)

	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/lt2.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)

	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/lt3.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)

	var btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/lt4.png">';
//	btn.onclick=Save;
	ppp.contentDocument.body.appendChild(btn)

}

function Decomp(B)
{
	var A={lv:0, lt:0, red:0, green:0, blue:0};
	for (var I=1; I<B.length; I++)
	{
		var G=B[I];
		if (G.indexOf("lv=")==0) 
			{var H=G.replace("lv=",""); A.lv=parseInt(H)}
		if (G.indexOf("lt=")==0) 
			{var H=G.replace("lt=",""); A.lt=parseInt(H)}
		if (G.indexOf("red=")==0) 
			{var H=G.replace("red=",""); A.red=parseInt(H)}
		if (G.indexOf("green=")==0) 
			{var H=G.replace("green=",""); A.green=parseInt(H)}
		if (G.indexOf("blue=")==0) 
			{var H=G.replace("blue=",""); A.blue=parseInt(H)}
	}
	return A;
}

function Compose(Att)
{
	var S=":0";
	if (Att.lt>0) S=S+"@lt"+Att.lt; 
	if (Att.lv>0) S=S+"@lv"+Att.lv; 
	if (Att.red>0) S=S+"@red"+Att.red; 
	if (Att.green>0) S=S+"@green"+Att.green; 
	if (Att.blue>0) S=S+"@blue"+Att.blue;
	return S;
} // Compose

function colorRed()
{
	var S="";
	var qqq=parent.document.getElementById("rightFrame");
	var Alg=qqq.contentWindow.Alg;
	var LProg=Alg.Prog.length;
	for (var J=0; J<LProg; J++)
	{
		var PTS=Alg.Prog[J];
		var PTS1 = new Object()
		PTS1.Fun = PTS.Fun;
		PTS1.L=[ ]; PTS1.Out=[ ]; // for (var I=0; I<L.length;I++) {PTS.L.push(L[I]);PTS.Out.push(MO[I])}
		PTS1.R=[ ]; PTS1.In=[ ]; for (var I=0; I<PTS.R.length;I++) {PTS1.R.push(PTS.R[I]);PTS1.In.push(PTS.In[I])}
		PTS1.Actual=true;
		
		if (!PTS.Actual) continue;
		for (K=0; K<PTS.Out.length; K++)
		{

//			Alg.Prog.push(PTS);

			var Found=false;
			
			for (var I=0; I<Alg.NameList.length; I++)
			{
				var PN=Alg.NameList[I];
				if (PN.Name==PTS.L[K].Name)
				{
					if (PN.List.Selected)
					{
						Found=true;
						var A=PTS.Out[K];
						var B=A.split("@");
						var Att=Decomp(B);
						Att.red=255;						
						Att.green=255;						
						Att.blue=0;
						var S1=Compose(Att);
						PTS1.Out[K]=PTS.L[K].Name+S1;
						PTS1.L[K]=PTS.L[K];
						PTS1.L[K]=PTS.L[K].OB=undefined;

					} else
					{
						var A=PTS.Out[K];
						var B=A.split("@");
						var Att=Decomp(B);
						var S1=Compose(Att);
						PTS1.Out[K]=PTS.L[K].Name+S1;
						PTS1.L[K]=PTS.L[K];
					}
				}
			}
			if (Found)
			{
				Alg.Prog.push(PTS1);
				PTS1.Actual=true;
				PTS.Actual=false;
			}
		} 
	}
	
	var ooo=qqq.contentDocument;
	var abcd=ooo.getElementById("play")
	abcd.click();

	for (I=0; I<Alg.NameList.length; I++)
	{
		PN=Alg.NameList[I];
		PN.List.OB=undefined;
	}
	
	Executer(Alg);
	qqq.contentWindow.arr=[];
	for (var I=0; I<=Alg.NameList.length-1; I++)
	{
		var PN=Alg.NameList[I];
		qqq.contentWindow.arr.push(PN.List);
	}
	qqq.contentWindow.draw(qqq.contentWindow.arr);

}

function Edit()
{
	var S="";
	var qqq=parent.document.getElementById("rightFrame");
	Alg=qqq.contentWindow.Alg;
	for (var I=0; I<Alg.NameList.length; I++)
	{
		var PN=Alg.NameList[I];
		if (PN.List.Selected) {S=PN.Name} 
	}

	if (S!="")
	{
		var Found=false;
		for (var I=0; I<Alg.Prog.length; I++)
		{
			var PTS=Alg.Prog[I];
			if (!PTS.Actual) continue;
			for (J=0; J<PTS.Out.length; J++)
			{
				if (PTS.L[J].Name==S)
				{
					Found=true;
					break;
				}
			}
			if (Found) break;
		}
		
		if (Found)
		{
			if (PTS.Fun=="A0") funA0();
			if (PTS.Fun=="A1") funA1();
			if (PTS.Fun=="A2") funA2();
			if (PTS.Fun=="A3") funA3();
			if (PTS.Fun=="A4") funA4();
			if (PTS.Fun=="A5") funA5();
			if (PTS.Fun=="A6") funA6();
			if (PTS.Fun=="A7") funA7();
			if (PTS.Fun=="A8") funA8();
			if (PTS.Fun=="A9") funA9();
			if (PTS.Fun=="AA") funAA();
			if (PTS.Fun=="AB") funAB();
			if (PTS.Fun=="AC") funAC();
			if (PTS.Fun=="AD") funAD();
			if (PTS.Fun=="AE") funAE();
			if (PTS.Fun=="AF") funAF();
			if (PTS.Fun=="AG") funAG();
			if (PTS.Fun=="AH") funAH();
			if (PTS.Fun=="AI") funAI();
			if (PTS.Fun=="AJ") funAJ();
			if (PTS.Fun=="AK") funAK();
			if (PTS.Fun=="AL") funAL();
			if (PTS.Fun=="AM") funAM();
			if (PTS.Fun=="AN") funAN();
			if (PTS.Fun=="AO") funAO();
			if (PTS.Fun=="AP") funAP();
			if (PTS.Fun=="AQ") funAQ();
			if (PTS.Fun=="AR") funAR();
			if (PTS.Fun=="AS") funAS();
			if (PTS.Fun=="B0") funB0();
			if (PTS.Fun=="B1") funB1();
			if (PTS.Fun=="B2") funB2();
			if (PTS.Fun=="B3") funB3();
			if (PTS.Fun=="B4") funB4();
			if (PTS.Fun=="C0") funC0();
			if (PTS.Fun=="C00") funC00();
			if (PTS.Fun=="C1") funC1();
			if (PTS.Fun=="C2") funC2();
			if (PTS.Fun=="C3") funC3();
			if (PTS.Fun=="C4") funC4();
			if (PTS.Fun=="C5") funC5();
			if (PTS.Fun=="C6") funC6();
			if (PTS.Fun=="C7") funC7();
			if (PTS.Fun=="C8") funC8();
			if (PTS.Fun=="C9") funC9();
			if (PTS.Fun=="CA") funCA();
			if (PTS.Fun=="CC") funCC();
			if (PTS.Fun=="CE") funCE();
			if (PTS.Fun=="CG") funCG();
			if (PTS.Fun=="CH") funCH();
			if (PTS.Fun=="CI") funCI();
			if (PTS.Fun=="CJ") funCJ();
			if (PTS.Fun=="CK") funCK();
			if (PTS.Fun=="CX") funCX();
			if (PTS.Fun=="CZ") funCZ();
			if (PTS.Fun=="D0") funD0();
			if (PTS.Fun=="D00") funD00();
			if (PTS.Fun=="D0A") funD0A();
			if (PTS.Fun=="D0D") funD0D();
			if (PTS.Fun=="D1") funD1();
			if (PTS.Fun=="D2") funD2();
			if (PTS.Fun=="D3") funD3();
			if (PTS.Fun=="D4") funD4();
			if (PTS.Fun=="D5") funD5();
			if (PTS.Fun=="D6") funD6();
			if (PTS.Fun=="D7") funD7();
			if (PTS.Fun=="D9") funD8();
			if (PTS.Fun=="DA") funDA();
			if (PTS.Fun=="DB") funDB();
			if (PTS.Fun=="DC0") funDC0();
			if (PTS.Fun=="DD") funDD();
			if (PTS.Fun=="DE") funDE();
			if (PTS.Fun=="DG") funDG();
			if (PTS.Fun=="DH") funDH();
			if (PTS.Fun=="DI") funDI();
			if (PTS.Fun=="DN") funDN();
			if (PTS.Fun=="K0") funK0();
			if (PTS.Fun=="K00") funK00();
			if (PTS.Fun=="K1") funK1();
			if (PTS.Fun=="K2") funK2();
			if (PTS.Fun=="KU") funKU();
			if (PTS.Fun=="L0") funL0();
			if (PTS.Fun=="L1") funL1();
			if (PTS.Fun=="L2") funL2();
			if (PTS.Fun=="L3") funL3();
			if (PTS.Fun=="LH") funLH();
			if (PTS.Fun=="LV") funLV();
			if (PTS.Fun=="O0") funO0();
			if (PTS.Fun=="O000") funO000();
			if (PTS.Fun=="O1") funO1();
			if (PTS.Fun=="O2") funO2();
			if (PTS.Fun=="O3") funO3();
			if (PTS.Fun=="O5") funO5();
			if (PTS.Fun=="O6") funO6();
			if (PTS.Fun=="O7") funO7();
			if (PTS.Fun=="O8") funO8();
			if (PTS.Fun=="O9") funO9();
			if (PTS.Fun=="OA") funOA();
			if (PTS.Fun=="OB") funOB();
			if (PTS.Fun=="OC") funOC();
			if (PTS.Fun=="OD") funOD();
			if (PTS.Fun=="OE") funOE();
			if (PTS.Fun=="OF") funOF();
			if (PTS.Fun=="OG") funOG();
			if (PTS.Fun=="OK001") funOK001();
			if (PTS.Fun=="OY") funOY();
			if (PTS.Fun=="P0") funP0();
			if (PTS.Fun=="P0A") funP0A();
			if (PTS.Fun=="P0L") funP0L();
			if (PTS.Fun=="P1") funP1();
			if (PTS.Fun=="P1A") funP1A();
			if (PTS.Fun=="P1L") funP1L();
			if (PTS.Fun=="P2") funP2();
			if (PTS.Fun=="P3") funP3();
			if (PTS.Fun=="P4") funP4();
			if (PTS.Fun=="P5") funP5();
			if (PTS.Fun=="P6") funP6();
			if (PTS.Fun=="P7") funP7();
			if (PTS.Fun=="P8") funP8();
			if (PTS.Fun=="P9") funP9();
			if (PTS.Fun=="P9A") funP9A();
			if (PTS.Fun=="P9L") funP9L();
			if (PTS.Fun=="PA") funPA();
			if (PTS.Fun=="PC") funPC();
			if (PTS.Fun=="PD") funPD();
			if (PTS.Fun=="PE") funPE();
			if (PTS.Fun=="PF") funPF();
			if (PTS.Fun=="PG") funPG();
			if (PTS.Fun=="PI") funPI();
			if (PTS.Fun=="PJ") funPJ();
			if (PTS.Fun=="PK") funPK();
			if (PTS.Fun=="PL") funPL();
			if (PTS.Fun=="PM") funPM();
			if (PTS.Fun=="PO") funPO();
			if (PTS.Fun=="PP") funPP();
			if (PTS.Fun=="PQ") funPQ();
			if (PTS.Fun=="PR") funPR();
			if (PTS.Fun=="PU1") funPU1();
			if (PTS.Fun=="PU2") funPU2();
			if (PTS.Fun=="PY") funPY();
			if (PTS.Fun=="PZ") funPZ();
			if (PTS.Fun=="RA") funRA();
			if (PTS.Fun=="RC") funRC();
			if (PTS.Fun=="TR001") funTR001();
			if (PTS.Fun=="TR002") funTR002();
			if (PTS.Fun=="TR003") funTR003();
			if (PTS.Fun=="TR004") funTR004();
			if (PTS.Fun=="TR005") funTR005();
			if (PTS.Fun=="TR006") funTR006();
			if (PTS.Fun=="TR007") funTR007();
			if (PTS.Fun=="TR008") funTR008();
			if (PTS.Fun=="TR009") funTR009();
			if (PTS.Fun=="TR010") funTR010();
			if (PTS.Fun=="TR011") funTR011();
			if (PTS.Fun=="TR012") funTR012();
			if (PTS.Fun=="TR013") funTR013();
			if (PTS.Fun=="TR014") funTR014();
			if (PTS.Fun=="W0") funW0();
			if (PTS.Fun=="W3") funW3();
			if (PTS.Fun=="W33") funW33();
			if (PTS.Fun=="W4") funW4();
			if (PTS.Fun=="W5") funW5();
			if (PTS.Fun=="WA") funWA();
			if (PTS.Fun=="WB") funWB();
			if (PTS.Fun=="WC") funWC();
			if (PTS.Fun=="WD") funWD();
			if (PTS.Fun=="WL") funWL();
			if (PTS.Fun=="WQ") funWQ();
			if (PTS.Fun=="WS") funWS();
			if (PTS.Fun=="WY") funWY();
			if (PTS.Fun=="WU") funWU();
			if (PTS.Fun=="WW") funWW();
			if (PTS.Fun=="X0") funX0();
			if (PTS.Fun=="Y0") funY0();
			if (PTS.Fun=="Y00") funY00();
			if (PTS.Fun=="Y1") funY1();
			if (PTS.Fun=="Y5") funY5();
			if (PTS.Fun=="Y6") funY6();
			if (PTS.Fun=="Y7") funY7();
			if (PTS.Fun=="Y8") funY8();
			if (PTS.Fun=="Y9") funY9();
			if (PTS.Fun=="YA") funYA();
			if (PTS.Fun=="YA1") funYA1();
			if (PTS.Fun=="YA2") funYA2();
			if (PTS.Fun=="YE") funYE();
			if (PTS.Fun=="YF") funYF();
			if (PTS.Fun=="YG") funYG();
			if (PTS.Fun=="YI") funYI();
			if (PTS.Fun=="YK") funYK();
			if (PTS.Fun=="YM") funYM();
			if (PTS.Fun=="YV") funYV();
			if (PTS.Fun=="YY") funYY();
			if (PTS.Fun=="Z0") funZ0();
			if (PTS.Fun=="Z00") funZ00();
			if (PTS.Fun=="Z1") funZ1();
			
			
			var	win1=parent.document.getElementById("rightFrame1");
	
			for (var I=0; I<=win1.InN; I++)
			{
				var ooo=win1.contentDocument.getElementById("in"+I);
				ooo.value=PTS.In[I];
			}
			for (var I=0; I<=win1.OutN; I++)
			{
				var ooo=win1.contentDocument.getElementById("out"+I);
				ooo.value=PTS.L[I].Name;
			}

			
			
		}
	}
	
} // Edit

function NewDocument()
{
	var	qqq=parent.document.getElementById("rightFrame");
	var	ppp=parent.document.getElementById("rightFrame1");
	var but_Close=ppp.contentDocument.getElementById("CLOSE");
	if (but_Close!=null) but_Close.click();
	qqq.contentWindow.arr = new Array();
	qqq.mode="pointer";

	Alg=qqq.contentWindow.Alg;
	Alg.Prog=[ ];
	Alg.NameList=[ ];
	
	var ooo=qqq.contentDocument;
	var abcd=ooo.getElementById("play")
	abcd.click();

	Executer(Alg);
	for (var I=0; I<=Alg.NameList.length-1; I++)
	{
		var PN=Alg.NameList[I];
		qqq.contentWindow.arr.push(PN.List);
	}
	qqq.contentWindow.draw(qqq.contentWindow.arr);

} // NewDocument

function freepoint()
{
	var	ppp=parent.document.getElementById("rightFrame1");
	var but_Close=ppp.contentDocument.getElementById("CLOSE");
	if (but_Close!=null) but_Close.click();

	var	qqq=parent.document.getElementById("rightFrame");
	qqq.contentWindow.mode="point";
}

function pointer()
{
	var	ppp=parent.document.getElementById("rightFrame1");
//	var but_Close=ppp.contentDocument.getElementById("CLOSE");
//	if (but_Close!=null) but_Close.click();

	var	qqq=parent.document.getElementById("rightFrame");
	qqq.contentWindow.mode="pointer";
}
	
function back()
{
	var	qqq=parent.document.getElementById("rightFrame");
	var Alg=qqq.contentWindow.Alg;

	Alg=qqq.contentWindow.Alg;
	if (Alg.Prog.length>0) Alg.Prog.length--;
	Alg.NameList=[];
	
	for (var I=0; I<Alg.Prog.length; I++)
	{
		var PTS=Alg.Prog[I];
		PTS.L=[];
		PTS.R=[];

		for (var J=0; J<=PTS.Out.length-1; J++)
		{
			var S=PTS.Out[J];
			var Found=false;
			for (K=0; K<Alg.NameList.length-1; K++)
			{
				if (S==Alg.NameList[K].Name) Found=true;
			}
			if (!Found) 
			{
				var PN= new Object();
				PN.Name=S;
				PN.List= new Object()
				PN.List.Name=S;
				Alg.NameList.push(PN);
				PTS.L.push(PN);
			}
		}

		for (var J=0; J<=PTS.In.length-1; J++)
		{
			var S=PTS.In[J];
			var V=parseFloat(S);
			
			if (isNaN(V))
			{
				var Found=false;
				for (K=0; K<Alg.NameList.length-1; K++)
				{
					if (S==Alg.NameList[K].Name) 
					{
						PN=Alg.NameList[K];
						PTS.R.push(PN);
						Found=true;
					}
				}
				if (!Found) 
				{
					var PN= new Object();
					PN.Name=S;
					PN.List= new Object()
					Alg.NameList.push(PN);
					PTS.R.push(PN);
				}
			} else
			{
				var PN = new Object();
				PN.Name='';
				PN.List=new Object();
				TOChisl_Create(PN.List,MCompl(V,0),Att0);
				PTS.R.push(PN);
			}
			
		}
	}
	
	qqq.contentWindow.arr=[];
	var ooo=qqq.contentDocument;
	var abcd=ooo.getElementById("play")
	abcd.click();

	Executer(Alg);
	for (var I=0; I<=Alg.NameList.length-1; I++)
	{
		var PN=Alg.NameList[I];
		qqq.contentWindow.arr.push(PN.List);
	}
	qqq.contentWindow.draw(qqq.contentWindow.arr);
	
}

function CreateSelector()
{
	var btn;
	btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/tochisl.png">';
	btn.onclick=tochisl;
	document.body.appendChild(btn)
	
	btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/topoint.png">';
	btn.onclick=topoint;
	document.body.appendChild(btn)
	
	btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/toline.png">';
	btn.onclick=toline;
	document.body.appendChild(btn)
	
	btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/toduga.png">';
	btn.onclick=toduga;
	document.body.appendChild(btn)

	btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/tokwadr.png">';
	btn.onclick=tokwadr;
	document.body.appendChild(btn)
	
	btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/tokontur.png">';
	btn.onclick=tokontur;
	document.body.appendChild(btn)
	btn = document.createElement("button")

	btn = document.createElement("button")
	btn.innerHTML='<img src="http://dww.no-ip.org/Simplex/common/totreug.png">';
	btn.onclick=totreug;
	document.body.appendChild(btn)
	btn = document.createElement("button")
	
}

function tochisl()
{
	document.close();
	location.href='buttons.html';
	document.writeln('<P>');	
	CreateSelector();
	document.writeln('</P>');	
	document.writeln('<P>');	
	document.writeln('</P>');	
	CreateCButtons();
	CreateAButtons();
}

function topoint()
{
	document.close();
	location.href='buttons.html';
	document.writeln('<P>');	
	CreateSelector();
	document.writeln('</P>');	
	document.writeln('<P>');	
	document.writeln('</P>');	
	CreatePButtons();
}

function toline()
{
	document.close();
	location.href='buttons.html';
	document.writeln('<P>');	
	CreateSelector();
	document.writeln('</P>');	
	document.writeln('<P>');	
	document.writeln('</P>');	
	CreateOButtons();
}

function toduga()
{
	document.close();
	location.href='buttons.html';
	document.writeln('<P>');	
	CreateSelector();
	document.writeln('</P>');	
	document.writeln('<P>');	
	document.writeln('</P>');	
	CreateDButtons();
}

function tokwadr()
{
	document.close();
	location.href='buttons.html';
	document.writeln('<P>');	
	CreateSelector();
	document.writeln('</P>');	
	document.writeln('<P>');	
	document.writeln('</P>');	
	CreateYButtons();
}
function tokontur()
{
	document.close();
	location.href='buttons.html';
	document.writeln('<P>');	
	CreateSelector();
	document.writeln('</P>');	
	document.writeln('<P>');	
	document.writeln('</P>');	
	CreateWButtons();
}
function totreug()
{
	document.close();
	location.href='buttons.html';
	document.writeln('<P>');	
	CreateSelector();
	document.writeln('</P>');	
	document.writeln('<P>');	
	document.writeln('</P>');	
	CreateTRButtons();
}

function CreateYButtons()
{
	var btn;
	btn=CreateButton("Y0"); btn.onclick=funY0;
	btn=CreateButton("Y1"); btn.onclick=funY1;
	btn=CreateButton("Y5"); btn.onclick=funY5;
	btn=CreateButton("Y6"); btn.onclick=funY6;
	btn=CreateButton("Y8"); btn.onclick=funY8;
	btn=CreateButton("Y9"); btn.onclick=funY9;
	btn=CreateButton("YA"); btn.onclick=funYA;
	btn=CreateButton("YA1"); btn.onclick=funYA1;
	btn=CreateButton("YA2"); btn.onclick=funYA2;
	btn=CreateButton("YE"); btn.onclick=funYE;
	btn=CreateButton("YF"); btn.onclick=funYF;
	btn=CreateButton("YG"); btn.onclick=funYG;
	btn=CreateButton("YI"); btn.onclick=funYI;
	btn=CreateButton("YK"); btn.onclick=funYK;
	btn=CreateButton("YM"); btn.onclick=funYM;
	btn=CreateButton("LV"); btn.onclick=funLV;
	btn=CreateButton("YV"); btn.onclick=funYV;
	btn=CreateButton("YY"); btn.onclick=funYY;
	btn=CreateButton("K0"); btn.onclick=funK0;
	btn=CreateButton("K1"); btn.onclick=funK1;
	btn=CreateButton("KU"); btn.onclick=funKU;
	btn=CreateButton("K2"); btn.onclick=funK2;
	btn=CreateButton("L0"); btn.onclick=funL0;
	btn=CreateButton("L1"); btn.onclick=funL1;
	btn=CreateButton("L3"); btn.onclick=funL3;
	btn=CreateButton("LH"); btn.onclick=funLH;
	btn=CreateButton("GY"); btn.onclick=funGY;
	
}

function CreateTRButtons()
{
	var btn;
	btn=CreateButton("TR001"); btn.onclick=funTR001;
	btn=CreateButton("TR002"); btn.onclick=funTR002;
	btn=CreateButton("TR003"); btn.onclick=funTR003;
	btn=CreateButton("TR004"); btn.onclick=funTR004;
	btn=CreateButton("TR005"); btn.onclick=funTR005;
	btn=CreateButton("TR006"); btn.onclick=funTR006;
	btn=CreateButton("TR007"); btn.onclick=funTR007;
	btn=CreateButton("TR008"); btn.onclick=funTR008;
	btn=CreateButton("TR009"); btn.onclick=funTR009;
	btn=CreateButton("TR010"); btn.onclick=funTR010;
	btn=CreateButton("TR011"); btn.onclick=funTR011;
	btn=CreateButton("TR012"); btn.onclick=funTR012;
	btn=CreateButton("TR013"); btn.onclick=funTR013;
	btn=CreateButton("TR014"); btn.onclick=funTR014;
}

function funTR001()
{
	var Caption='Точка Жергонна';
	var Out=['Точка Жергонна'];
	var In=['Первая сторона треугольника','Вторая сторона треугольника','Третья сторона треугольника'];
	newWin('TR001',Caption,Out,In,['P'],[['O'],['O'],['O']]);
}

function funTR002()
{
	var Caption='Точка Нагеля';
	var Out=['Точка Нагеля'];
	var In=['Первая сторона треугольника','Вторая сторона треугольника','Третья сторона треугольника'];
	newWin('TR002',Caption,Out,In,['P'],[['O'],['O'],['O']]);
}
function funTR003()
{
	var Caption='Точка Лемуана';
	var Out=['Точка Лемуана'];
	var In=['Первая сторона треугольника','Вторая сторона треугольника','Третья сторона треугольника'];
	newWin('TR003',Caption,Out,In,['P'],[['O'],['O'],['O']]);
}
function funTR004()
{
	var Caption='Ортоцентр треугольника';
	var Out=['Ортоцентр'];
	var In=['Первая сторона треугольника','Вторая сторона треугольника','Третья сторона треугольника'];
	newWin('TR004',Caption,Out,In,['P'],[['O'],['O'],['O']]);
}
function funTR005()
{
	var Caption='Инцентр треугольника';
	var Out=['Инцентр'];
	var In=['Первая сторона треугольника','Вторая сторона треугольника','Третья сторона треугольника'];
	newWin('TR005',Caption,Out,In,['P'],[['O'],['O'],['O']]);
}
function funTR006()
{
	var Caption='Окружность, вписанная в треугольник';
	var Out=['Окружность','Точка 1','Точка 2','Точка 3'];
	var In=['Первая сторона треугольника','Вторая сторона треугольника','Третья сторона треугольника'];
	newWin('TR006',Caption,Out,In,['D','P','P','P'],[['O'],['O'],['O']]);
}
function funTR007()
{
	var Caption='Окружность, вневписанная в треугольник';
	var Out=['Окружность','Точка 1','Точка 2','Точка 3'];
	var In=['Первая сторона треугольника','Вторая сторона треугольника','Третья сторона треугольника'];
	newWin('TR007',Caption,Out,In,['D','P','P','P'],[['O'],['O'],['O']]);
}
function funTR008()
{
	var Caption='Окружность Эйлера';
	var Out=['Окружность'];
	var In=['Первая сторона треугольника','Вторая сторона треугольника','Третья сторона треугольника'];
	newWin('TR008',Caption,Out,In,['D'],[['O'],['O'],['O']]);
}
function funTR009()
{
	var Caption='Центроид треугольника';
	var Out=['Центроид'];
	var In=['Первая сторона треугольника','Вторая сторона треугольника','Третья сторона треугольника'];
	newWin('TR009',Caption,Out,In,['P'],[['O'],['O'],['O']]);
}

function funTR010()
{
	var Caption='Биссектрисы треугольника';
	var Out=['Биссектриса 1','Биссектриса 2','Биссектриса 3'];
	var In=['Первая сторона треугольника','Вторая сторона треугольника','Третья сторона треугольника'];
	newWin('TR010',Caption,Out,In,['O','O','O'],[['O'],['O'],['O']]);
}
function funTR011()
{
	var Caption='Высоты треугольника';
	var Out=['Высота 1','Высота 2','Высота 3'];
	var In=['Первая сторона треугольника','Вторая сторона треугольника','Третья сторона треугольника'];
	newWin('TR011',Caption,Out,In,['O','O','O'],[['O'],['O'],['O']]);
}
function funTR012()
{
	var Caption='Медианы треугольника';
	var Out=['Медиана 1','Медиана 2','Медиана 3'];
	var In=['Первая сторона треугольника','Вторая сторона треугольника','Третья сторона треугольника'];
	newWin('TR012',Caption,Out,In,['O','O','O'],[['O'],['O'],['O']]);
}
function funTR013()
{
	var Caption='Симедианы треугольника';
	var Out=['Симедиана 1','Симедиана 2','Симедиана 3'];
	var In=['Первая сторона треугольника','Вторая сторона треугольника','Третья сторона треугольника'];
	newWin('TR013',Caption,Out,In,['O','O','O'],[['O'],['O'],['O']]);
}
function funTR014()
{
	var Caption='Педальный треугольник';
	var Out=['Прямая 1','Прямая 2','Прямая 3'];
	var In=['Первая сторона треугольника','Вторая сторона треугольника','Третья сторона треугольника','Точка'];
	newWin('TR014',Caption,Out,In,['O','O','O'],[['O'],['O'],['O'],['P']]);
}
function funLV()
{
	var Caption='Инволюция';
	var Out=['Проективитет'];
	var In=['Ядро','A','A*','B','C'];
	newWin('LV',Caption,Out,In,['L'],[['P','O'],['P','O'],['P','O'],['P','O'],['P','O']]);
}
function funK0()
{
	var Caption='Коллинеация / корреляция';
	var Out=['Коллинеация / корреляция'];
	var In=['Объект 1.1','Объект 1.2','Объект 1.3','Объект 1.4','Объект 2.1','Объект 2.2','Объект 2.3','Объект 2.4'];
	newWin('K0',Caption,Out,In,['K'],[['P','O'],['P','O'],['P','O'],['P','O'],['P','O'],['P','O'],['P','O'],['P','O']]);
}
function funK1()
{
	var Caption='Коллинеация по паре прямых и трем парам точек';
	var Out=['Коллинеация'];
	var In=['Прямая 1','Точка 1.1','Точка 1.2','Точка 1.3','Прямая 2','Точка 2.1','Точка 2.2','Точка 2.3'];
	newWin('K1',Caption,Out,In,['K'],[['O'],['P'],['P'],['P'],['O'],['P'],['P'],['P']]);
}
function funKU()
{
	var Caption='Преобразование объекта';
	var Out=['Образ'];
	var In=['Коллинеация/корелляция','Прообраз'];
	newWin('KU',Caption,Out,In,['E'],[['K','k'],['*']]);
}
function funK2()
{
	var Caption='Двойные точки коллинеации';
	var Out=['Точка 1','Точка 2','Точка 3'];
	var In=['Коллинеация'];
	newWin('K2',Caption,Out,In,['P','P','P'],[['K','k']]);
}
function funL0()
{
	var Caption='Проективитет';
	var Out=['Проективитет'];
	var In=['Ядро 1','Объект 1.1','Объект 1.2','Объект 1.3','Ядро 2','Объект 2.1','Объект 2.2','Объект 2.3'];
	newWin('L0',Caption,Out,In,['L'],[['P','O'],['P','O'],['P','O'],['P','O'],['P','O'],['P','O'],['P','O'],['P','O']]);
}
function funL1()
{
	var Caption='Образ в проективитете';
	var Out=['Образ'];
	var In=['Проективитет','Прообраз'];
	newWin('L1',Caption,Out,In,['E'],[['*'],['*']]);
}
function funL3()
{
	var Caption='Двойные объекты проективитета';
	var Out=['Объект 1','Объект 2'];
	var In=['Проективитет'];
	newWin('L3',Caption,Out,In,['E','E'],[['L','R']]);
}
function funLH()
{
	var Caption='Четвертая гармоническая точка';
	var Out=['Точка'];
	var In=['Прямая','Точка 1','Точка 2','Точка 3'];
	newWin('LH',Caption,Out,In,['P'],[['O'],['P','O'],['P','O'],['P','O']]);
}
function funGY()
{
	var Caption='Разделенность пар точек';
	var Out=['Логическая величина'];
	var In=['Прямая','Точка A1','Точка A2','Точка B1','Точка B2'];
	newWin('GY',Caption,Out,In,['G'],[['O'],['P'],['P'],['P'],['P']]);
}


function CreateWButtons()
{
	var btn;
	btn=CreateButton("W0"); btn.onclick=funW0;
	btn=CreateButton("W3"); btn.onclick=funW3;
	btn=CreateButton("W33"); btn.onclick=funW33;
	btn=CreateButton("W4"); btn.onclick=funW4;
	btn=CreateButton("W5"); btn.onclick=funW5;
	btn=CreateButton("WA"); btn.onclick=funWA;
	btn=CreateButton("WB"); btn.onclick=funWB;
	btn=CreateButton("WC"); btn.onclick=funWC;
	btn=CreateButton("WD"); btn.onclick=funWD;
	btn=CreateButton("WL"); btn.onclick=funWL;
	btn=CreateButton("WQ"); btn.onclick=funWQ;
	btn=CreateButton("WS"); btn.onclick=funWS;
	btn=CreateButton("WT"); btn.onclick=funWT;
	btn=CreateButton("WU"); btn.onclick=funWU;
	btn=CreateButton("WW"); btn.onclick=funWW;

}

function funY0()
{
	var Caption='Коника по пяти точкам';
	var Out=['Коника'];
	var In=['Точка 1','Точка 2','Точка 3','Точка 4','Точка 5'];
	newWin('Y0',Caption,Out,In,['Y'],[['P'],['P'],['P'],['P'],['P']]);
}
function funY1()
{
	var Caption='Коника по четырем точкам и касательной';
	var Out=['Коника'];
	var In=['Точка 1','Точка 2','Точка 3','Точка 4','Прямая'];
	newWin('Y1',Caption,Out,In,['Y','Y','P','P'],[['P'],['P'],['P'],['P'],['O','V']]);
}
function funY5()
{
	var Caption='Коника по пяти касательным';
	var Out=['Коника'];
	var In=['Прямая 1','Прямая 2','Прямая 3','Прямая 4','Прямая 5'];
	newWin('Y5',Caption,Out,In,['Y'],[['O','V'],['O','V'],['O','V'],['O','V'],['O','V']]);
}
function funY6()
{
	var Caption='Поляритет';
	var Out=['Образ'];
	var In=['Прообраз','Коника'];
	newWin('Y6',Caption,Out,In,['E'],[['P','O','Y','D'],['Y','D']]);
}
function funY8()
{
	var Caption='Коника по трем точкам и касательной в точке';
	var Out=['Коника'];
	var In=['Точка 1','Точка 2','Точка 3','Касательная','Точка касания'];
	newWin('Y8',Caption,Out,In,['Y'],[['P'],['P'],['P'],['O','V'],['P']]);
}
function funY9()
{
	var Caption='Коника по точке и двум касательным в точках';
	var Out=['Коника'];
	var In=['Точка','Касательная 1','Точка 1','Касательная 2','Точка 2'];
	newWin('Y9',Caption,Out,In,['Y'],[['P'],['O','V'],['P'],['O','V'],['P']]);
}
function funYA()
{
	var Caption='Асимптоты коники';
	var Out=['Асимптота 1','Асимптота 2','Асимптота 3','Асимптота 4'];
	var In=['Коника'];
	newWin('YA',Caption,Out,In,['O','O','O','O'],[['Y']]);
}
function funYA1()
{
	var Caption='Коника тремя точками и проективитетом';
	var Out=['Коника'];
	var In=['Точка 1','Точка 2','Точка 3','Проективитет'];
	newWin('YA1',Caption,Out,In,['Y'],[['P'],['P'],['P'],['L']]);
}
function funYA2()
{
	var Caption='Коника точкой и двумя проективитетами';
	var Out=['Коника'];
	var In=['Точка','Проективитет 1','Проективитет 2'];
	newWin('YA2',Caption,Out,In,['Y'],[['P'],['L'],['L']]);
}

function funYE()
{
	var Caption='Эллипс центром и полуосями';
	var Out=['Эллипс'];
	var In=['Центр','Точка оси 1','Точка оси 2'];
	newWin('YE',Caption,Out,In,['Y'],[['P'],['P'],['P']]);
}
function funYF()
{
	var Caption='Фокусы и директрисы коники';
	var Out=['Фокус 1','Директриса 1','Фокус 2','Директриса 2'];
	var In=['Коника'];
	newWin('YF',Caption,Out,In,['P','O','P','O'],[['Y']]);
}
function funYG()
{
	var Caption='Преобразование Гирста';
	var Out=['Образ'];
	var In=['Центр','Окружность','Прообраз'];
	newWin('YG',Caption,Out,In,['P'],[['P'],['D'],['P','O','D','Y']]);
}
function funYI()
{
	var Caption='Инверсия объекта';
	var Out=['Образ'];
	var In=['Окружность (коника) инверсии','Прообраз'];
	newWin('YI',Caption,Out,In,['E'],[['D','Y'],['*']]);
}
function funYK()
{
	var Caption='Объект в квадратичной инволюции';
	var Out=['Образ'];
	var In=['Прообраз','Коника 1','Коника 2'];
	newWin('YK',Caption,Out,In,['E'],[['P','O'],['Y','D'],['Y','D']]);
}
function funYM()
{
	var Caption='Сопряженная коника';
	var Out=['Коника'];
	var In=['Коника 1','Несобственная точка'];
	newWin('YM',Caption,Out,In,['Y'],[['Y','D'],['P','O']]);
}
function funYV()
{
	var Caption='Инволюция от коники на прямой';
	var Out=['Инволюция'];
	var In=['Прямая','Коника'];
	newWin('YV',Caption,Out,In,['L'],[['O'],['Y','D']]);
}
function funYY()
{
	var Caption='Точки пересечения двух коник';
	var Out=['Точка 1','Точка 2','Точка 3','Точка 4'];
	var In=['Коника 1','Коника 2'];
	newWin('YY',Caption,Out,In,['P','P','P','P'],[['Y'],['Y']]);
}


function funA0()
{
	var Caption='Сложение чисел одноаргументное';
	var Out=['Сумма'];
	var In=['Величины'];
	newWin('A0',Caption,Out,In,['C'],[['C','F','D','O']]);
}
function funA1()
{
	var Caption='Разность чисел одноаргументная';
	var Out=['Разность'];
	var In=['Величины'];
	newWin('A1',Caption,Out,In,['C'],[['C','F','D','O']]);
}
function funA2()
{
	var Caption='Произведение чисел одноаргументное';
	var Out=['Произведение'];
	var In=['Величины'];
	newWin('A2',Caption,Out,In,['C'],[['C','F','D','O']]);
}
function funA3()
{
	var Caption='Деление чисел одноаргументное';
	var Out=['Частное'];
	var In=['Величины'];
	newWin('A3',Caption,Out,In,['C'],[['C','F','D','O']]);
}
function funA4()
{
	var Caption='Минимальное значение';
	var Out=['Минимум'];
	var In=['Величины'];
	newWin('A4',Caption,Out,In,['C'],[['C','F']]);
}
function funA5()
{
	var Caption='Максимальное значение';
	var Out=['Максимум'];
	var In=['Величины'];
	newWin('A5',Caption,Out,In,['C'],[['C','F']]);
}
function funA6()
{
	var Caption='Показательная функция';
	var Out=['Величина'];
	var In=['X','Y'];
	newWin('A6',Caption,Out,In,['C'],[['C','F'],['C','F']]);
}
function funA7()
{
	var Caption='Модуль';
	var Out=['ABS'];
	var In=['Величины'];
	newWin('A7',Caption,Out,In,['C'],[['C','F']]);
}
function funA8()
{
	var Caption='Возведение в квадрат';
	var Out=['SQR'];
	var In=['Величины'];
	newWin('A8',Caption,Out,In,['C'],[['C','F']]);
}
function funA9()
{
	var Caption='Квадратный корень';
	var Out=['SQRT'];
	var In=['Величины'];
	newWin('A9',Caption,Out,In,['C'],[['C','F']]);
}

function funAA()
{
	var Caption='Экспонента';
	var Out=['EXP'];
	var In=['Величины'];
	newWin('AA',Caption,Out,In,['C'],[['C','F']]);
}
function funAB()
{
	var Caption='Синус';
	var Out=['SIN'];
	var In=['Величины','Амплитуда'];
	newWin('AB',Caption,Out,In,['C'],[['C','F'],['C','F']]);
}
function funAC()
{
	var Caption='Косинус';
	var Out=['COS'];
	var In=['Величины','Амплитуда'];
	newWin('AC',Caption,Out,In,['C'],[['C','F'],['C','F']]);
}
function funAD()
{
	var Caption='Тангенс';
	var Out=['TG'];
	var In=['Величины'];
	newWin('AD',Caption,Out,In,['C'],[['C','F']]);
}
function funAE()
{
	var Caption='Арксинус';
	var Out=['ARCSIN'];
	var In=['Величины'];
	newWin('AE',Caption,Out,In,['C'],[['C','F']]);
}
function funAF()
{
	var Caption='Арккосинус';
	var Out=['ARCCOS'];
	var In=['Величины'];
	newWin('AF',Caption,Out,In,['C'],[['C','F']]);
}
function funAG()
{
	var Caption='Арктангенс';
	var Out=['ARCTG'];
	var In=['Величины'];
	newWin('AG',Caption,Out,In,['C'],[['C','F']]);
}
function funAH()
{
	var Caption='Логарифм натуральный';
	var Out=['LN'];
	var In=['Величины'];
	newWin('AH',Caption,Out,In,['C'],[['C','F']]);
}
function funAI()
{
	var Caption='Логарифм десятичный';
	var Out=['LG'];
	var In=['Величины'];
	newWin('AI',Caption,Out,In,['C'],[['C','F']]);
}
function funAJ()
{
	var Caption='Логарифм по основанию';
	var Out=['LOG'];
	var In=['X','Основание'];
	newWin('AJ',Caption,Out,In,['C'],[['C','F'],['C','F']]);
}
function funAK()
{
	var Caption='Аргумент комплексного числа';
	var Out=['Аргумент'];
	var In=['Величина'];
	newWin('AK',Caption,Out,In,['C'],[['C','F']]);
}
function funAL()
{
	var Caption='Перевод градусной меры в радианную';
	var Out=['Радианы'];
	var In=['Градусы'];
	newWin('AL',Caption,Out,In,['C'],[['C','F']]);
}
function funAM()
{
	var Caption='Перевод радианной меры в градусную';
	var Out=['Градусы'];
	var In=['Радианы'];
	newWin('AM',Caption,Out,In,['C'],[['C','F']]);
}
function funAN()
{
	var Caption='Сложение двухаргументное';
	var Out=['Сумма'];
	var In=['Слагаемое 1','Слагаемое 2'];
	newWin('AN',Caption,Out,In,['C'],[['C','F','V','D'],['C','F','V','D']]);
}
function funAO()
{
	var Caption='Разность двухаргументная';
	var Out=['Разность'];
	var In=['Уменьшаемое','Вычитаемое'];
	newWin('AO',Caption,Out,In,['C'],[['C','F','V','D'],['C','F','V','D']]);
}
function funAP()
{
	var Caption='Произведение двухаргументное';
	var Out=['Произведение'];
	var In=['Множитель 1','Множитель 2'];
	newWin('AP',Caption,Out,In,['C'],[['C','F','V'],['C','F','V']]);
}
function funAQ()
{
	var Caption='Деление двухаргументное';
	var Out=['Частное'];
	var In=['Делимое','Делитель'];
	newWin('AQ',Caption,Out,In,['C'],[['C','F','V'],['C','F','V']]);
}
function funAR()
{
	var Caption='Случайная величина';
	var Out=['Величина'];
	var In=['Аргумент'];
	newWin('AR',Caption,Out,In,['C'],[['C','F']]);
}
function funAS()
{
	var Caption='Деление по модулю';
	var Out=['Результат'];
	var In=['Число','Модуль'];
	newWin('AS',Caption,Out,In,['C'],[['C','F']]);
}

function funC0()
{
	var Caption='Ввод чисел';
	var Out=['Величина'];
	var In=['Числа'];
	newWin('C0',Caption,Out,In,['C'],[['C','F']]);
}
function funC1()
{
	var Caption='Радиус окружности';
	var Out=['Радиус'];
	var In=['Окружность'];
	newWin('C1',Caption,Out,In,['C'],[['D']]);
}
function funC2()
{
	var Caption='Расстояние между точками';
	var Out=['Расстояние'];
	var In=['Точка 1','Точка 2 (прямая)'];
	newWin('C2',Caption,Out,In,['C'],[['P'],['P','O']]);
}
function funC3()
{
	var Caption='X-координата точки';
	var Out=['Координата X'];
	var In=['Точка'];
	newWin('C3',Caption,Out,In,['C'],[['P']]);
}
function funC4()
{
	var Caption='Y-координата точки';
	var Out=['Координата Y'];
	var In=['Точка'];
	newWin('C4',Caption,Out,In,['C'],[['P']]);
}
function funC5()
{
	var Caption='Превышение по X';
	var Out=['Превышение'];
	var In=['Точка 1','Точка 2'];
	newWin('C5',Caption,Out,In,['C'],[['P'],['P']]);
}
function funC6()
{
	var Caption='Превышение по Y';
	var Out=['Превышение'];
	var In=['Точка 1','Точка 2'];
	newWin('C6',Caption,Out,In,['C'],[['P'],['P']]);
}
function funC7()
{
	var Caption='Угол наклона прямой';
	var Out=['Угол'];
	var In=['Прямая'];
	newWin('C7',Caption,Out,In,['C'],[['O','V']]);
}
function funC8()
{
	var Caption='Количество звеньев контура';
	var Out=['Количество'];
	var In=['Контур'];
	newWin('C8',Caption,Out,In,['C'],[['W','S','O','D','B','Y','V']]);
}
function funC9()
{
	var Caption='Площадь контура';
	var Out=['Площадь'];
	var In=['Контур'];
	newWin('C9',Caption,Out,In,['C'],[['W']]);
}
function funCA()
{
	var Caption='Пропорция';
	var Out=['Величина'];
	var In=['Начальная точка','Средняя точка','Конечная точка'];
	newWin('CA',Caption,Out,In,['C'],[['P'],['P'],['P']]);
}
function funCC()
{
	var Caption='Количество элементов в списке';
	var Out=['Количество'];
	var In=['Список'];
	newWin('CC',Caption,Out,In,['C'],[['*']]);
}
function funCE()
{
	var Caption='Площадь сектора';
	var Out=['Площадь'];
	var In=['Дуга'];
	newWin('CE',Caption,Out,In,['C'],[['D']]);
}
function funCG()
{
	var Caption='Длина объекта';
	var Out=['Длина'];
	var In=['Объект'];
	newWin('CG',Caption,Out,In,['C'],[['D']]);
}
function funCH()
{
	var Caption='Диаметр окружности';
	var Out=['Диаметр'];
	var In=['Окружность'];
	newWin('CH',Caption,Out,In,['C'],[['O','V'],['O','V']]);
}
function funCI()
{
	var Caption='Угол между двумя прямыми';
	var Out=['Угол'];
	var In=['Прямая 1','Прямая 2'];
	newWin('CI',Caption,Out,In,['C'],[['*']]);
}
function funCJ()
{
	var Caption='Превышение точек по направлению';
	var Out=['Превышение'];
	var In=['Точка 1','Точка 2','Направление'];
	newWin('CJ',Caption,Out,In,['C'],[['P'],['P'],['O','V']]);
}
function funCK()
{
	var Caption='Величина центрального угла';
	var Out=['Угол'];
	var In=['Окружность','Длина'];
	newWin('CK',Caption,Out,In,['C'],[['D'],['C','F']]);
}
function funCX()
{
	var Caption='Параметр точки на объекте';
	var Out=['Параметр'];
	var In=['Точка','Объект'];
	newWin('CX',Caption,Out,In,['C'],[['P'],['*']]);
}
function funCZ()
{
	var Caption='Сложное отношение';
	var Out=['Величина'];
	var In=['Точка A','Точка B','Точка C','Точка D'];
	newWin('CZ',Caption,Out,In,['C'],[['P'],['P'],['P'],['P']]);
}


function funD0()
{
	var Caption='Окружность задана центром и радиусом';
	var Out=['Окружность'];
	var In=['Центр','Радиус'];
	newWin('D0',Caption,Out,In,['D'],[['P','D'],['C','F','D','O']]);
}
function funD0A()
{
	var Caption='Окружность задана центром, радиусом и фазой';
	var Out=['Окружность'];
	var In=['Центр','Радиус','Фаза'];
	newWin('D0A',Caption,Out,In,['D'],[['P','D'],['C','F','D'],['C','F','D']]);
}
function funD0D()
{
	var Caption='Окружность задана центром и сопрягающей окружностью';
	var Out=['Точка 1','Окружность 1','Точка 2','Окружность 2'];
	var In=['Точка','Окружность'];
	newWin('D0D',Caption,Out,In,['P','D','P','D'],[['P'],['D']]);
}
function funD1()
{
	var Caption='Окружность задана центром и точкой';
	var Out=['Окружность'];
	var In=['Центр','Точка'];
	newWin('D1',Caption,Out,In,['D'],[['P'],['P']]);
}
function funD1D()
{
	var Caption='Окружность задана точкой и сопрягающей окружностью';
	var Out=['Точка 1','Окружность 1','Точка 2','Окружность 2'];
	var In=['Точка','Окружность'];
	newWin('D1D',Caption,Out,In,['P','D','P','D'],[['P'],['D']]);
}
function funD2()
{
	var Caption='Окружность задана центром и диаметром';
	var Out=['Окружность'];
	var In=['Центр','Диаметр 2'];
	newWin('D2',Caption,Out,In,['D'],[['P','D'],['C','F','O','D']]);
}
function funD3()
{
	var Caption='Окружность задана центром и длиной';
	var Out=['Окружность'];
	var In=['Центр','Длина'];
	newWin('D3',Caption,Out,In,['D'],[['P','D'],['C','F','O','D']]);
}
function funD4()
{
	var Caption='Окружность задана тремя точками';
	var Out=['Окружность'];
	var In=['Точка 1','Точка 2','Точка 3'];
	newWin('D4',Caption,Out,In,['D'],[['P'],['P'],['P']]);
}
function funD5()
{
	var Caption='Прямая задана двумя точками';
	var Out=['Прямая'];
	var In=['Точка 1','Точка 2'];
	newWin('O0',Caption,Out,In,['D'],[['P','D'],['C','F','O','D']]);
}

function funD6()
{
	var Caption='Окружность задана центром и площадью';
	var Out=['Окружность'];
	var In=['Центр','Площадь'];
	newWin('D6',Caption,Out,In,['D','P','P','P'],[['O','V','D'],['O','V','D'],['O','V','D']]);
}
function funD7()
{
	var Caption='Окружности, сопрягающие две окружности';
	var Out=['Окружность 1','Точка 1.1','Точка 1.2','Окружность 2','Точка 2.1','Точка 2.2'];
	var In=['Исходная окружность 1','Исходная окружность 2','Радиус'];
	newWin('D9',Caption,Out,In,['D','P','P','D','P','P'],[['D'],['D'],['C','F','D']]);
}
function funD9()
{
	var Caption='Прямая задана двумя точками';
	var Out=['Дуга'];
	var In=['Окружность','Точка начала дуги','Точка конца дуги'];
	newWin('D9',Caption,Out,In,['D'],[['D'],['P'],['P']]);
}
function funDA()
{
	var Caption='Окружности, сопрягающие прямую и окружность';
	var Out=['Окружность 1','Точка 1.1','Точка 1.2','Окружность 2','Точка 2.1','Точка 2.2'];
	var In=['Исходная окружность','Прямая','Радиус'];
	newWin('DA',Caption,Out,In,['D','P','P','D','P','P'],[['D'],['O','V'],['C','F','D']]);
}
function funDB()
{
	var Caption='Окружности заданы двумя точками и радиусом';
	var Out=['Окружность 1','Окружность 1'];
	var In=['Точка 1','Точка 2','Радиус'];
	newWin('DB',Caption,Out,In,['D','D'],[['P'],['P'],['C','F']]);
}
function funDC0()
{
	var Caption='Окружность, сопрягающая две прямые';
	var Out=['Окружность','Точка 1','Точка 2'];
	var In=['Прямая 1','Прямая 2','Радиус'];
	newWin('DC0',Caption,Out,In,['D','P','P'],[['O','V'],['O','V'],['C','F']]);
}
function funDD()
{
	var Caption='Окружность проведена через точку касательно к прямой';
	var Out=['Окружность 1','Точка 1','Окружность 2','Точка 2'];
	var In=['Прямая','Точка','Радиус'];
	newWin('DD',Caption,Out,In,['D','P','D','P'],[['O','V'],['P'],['C','F','D']]);
}
function funDE()
{
	var Caption='Окружность проведена через точку касательно к другой окружности';
	var Out=['Окружность 1','Точка 1','Окружность 2','Точка 2'];
	var In=['Окружность','Точка','Радиус'];
	newWin('DE',Caption,Out,In,['D','P','D','P'],[['D'],['P'],['C','F','D']]);
}
function funDG()
{
	var Caption='Окружность проведена через точку касательно к двум объектам';
	var Out=['Окружность 1','Точка 1.1','Точка 1.2','Окружность 2','Точка 2.1','Точка 2.2'];
	var In=['Прямая (окружность) 1','Прямая (окружность) 2','Точка'];
	newWin('DG',Caption,Out,In,['D','P','P','D','P','P'],[['O','V','D'],['O','V','D'],['P']]);
}
function funDH()
{
	var Caption='Окружность проведена через две точки касательно к объекту';
	var Out=['Окружность 1','Точка 1','Окружность 2','Точка 2'];
	var In=['Исходная точка 1','Исходная точка 2','Прямая (окружность)'];
	newWin('DH',Caption,Out,In,['D','P','D','P'],[['P'],['P'],['O','V','D']]);
}
function funDI()
{
	var Caption='Окружность инверсии';
	var Out=['Окружность 1','Окружность 2'];
	var In=['Объект 1','Объект 2'];
	newWin('DI',Caption,Out,In,['D','D'],[['D','O'],['D','O']]);
}
function funDN()
{
	var Caption='Окружность задана диаметральными точками';
	var Out=['Окружность'];
	var In=['Точка 1','Точка 2'];
	newWin('DN',Caption,Out,In,['D'],[['P'],['P']]);
}

function funOK001()
{
	var Caption='Окружность, ортогональная к трем заданным';
	var Out=['Окружность'];
	var In=['Окружность 1','Окружность 2','Окружность 3'];
	newWin('OK001',Caption,Out,In,['D'],[['D'],['D'],['D']]);
}

/*
*/

function CreateButton(Fun)
{
	var btn;
	btn = document.createElement("button")
	btn.type = "button";
	var S='<img src="http://dww.no-ip.org/Simplex/functions/'+Fun+'/'+Fun+'.png">' 
	btn.innerHTML=S;
	document.body.appendChild(btn)
	return btn;
}

function funO0()
{
	var Caption='Прямая задана двумя точками';
	var Out=['Прямая'];
	var In=['Точка 1','Точка 2'];
	newWin('O0',Caption,Out,In,['O'],[['P','N','1','2'],['P','N','1','2']]);
}
function funO000()
{
	var Caption='Прямая задана триадой точек';
	var Out=['Прямая'];
	var In=['Точка 1','Точка 2','Точка 3'];
	newWin('O000',Caption,Out,In,['O'],[['P'],['P'],['P']]);
}
function funO1()
{
	var Caption='Прямая проведена через точку под углом к оси OX';
	var Out=['Прямая'];
	var In=['Точка','Угол'];
	newWin('O1',Caption,Out,In,['O'],[['P'],['C','F']]);
}
function funO2()
{
	var Caption='Прямая задана координатами двух точек';
	var Out=['Прямая'];
	var In=['X1','Y1','X2','Y2'];
	newWin('O2',Caption,Out,In,['O'],[['C','F'],['C','F'],['C','F'],['C','F']]);
}

function funO3()
{
	var Caption='Касательная к двум окружностям';
	var Out=['Прямая','Точка 1','Точка 2'];
	var In=['Окружность 1','Окружность 2'];
	newWin('O3',Caption,Out,In,['O','P','P'],[['D'],['D']]);
}
function funO5()
{
	var Caption='Прямая проведена через точку под углом к прямой';
	var Out=['Прямая'];
	var In=['Прямая 1','Точка','Угол'];
	newWin('O5',Caption,Out,In,['O'],[['O','V'],['P'],['C','F','O']]);
}

function funO6()
{
	var Caption='Нормаль в точке объекта';
	var Out=['Нормаль'];
	var In=['Объект','Точка'];
	newWin('O6',Caption,Out,In,['O'],[['*'],['P']]);
}
function funO7()
{
	var Caption='Прямая, параллельная прямой';
	var Out=['Прямая'];
	var In=['Прямая 1','Дистанция'];
	newWin('O7',Caption,Out,In,['O'],[['O','V','D','P'],['C','F','D']]);
}
function funO8()
{
	var Caption='Биссектриса угла';
	var Out=['Биссектриса 1','Биссектриса 2'];
	var In=['Прямая 1','Прямая 2'];
	newWin('O8',Caption,Out,In,['O','O'],[['O','V'],['O','V']]);
}
function funO9()
{
	var Caption='Прямая, касательная к конике, из точки';
	var Out=['Прямая 1','Точка 1','Прямая 2','Точка 2'];
	var In=['Точка','Коника'];
	newWin('O9',Caption,Out,In,['O','P','O','P'],[['P'],['Y']]);
}
function funOA()
{
	var Caption='Прямая, касательная к окружности, под углом к прямой';
	var Out=['Прямая','Точка'];
	var In=['Окружность','Прямая 1','Угол'];
	newWin('OA',Caption,Out,In,['O','P'],[['D'],['O','V'],['C']]);
}
function funOB()
{
	var Caption='Фаска';
	var Out=['Прямая','Точка'];
	var In=['Прямая 1','Прямая 2','Отступ'];
	newWin('OB',Caption,Out,In,['O','P','P'],[['O','V'],['O','V'],['C','F']]);
}

function funOC()
{
	var Caption='Выделить объект из контура';
	var Out=['Объект'];
	var In=['Контур','Параметр'];
	newWin('OC',Caption,Out,In,['O'],[['W'],['C','F']]);
}
function funOD()
{
	var Caption='Прямая, касательная к конике в точке';
	var Out=['Прямая'];
	var In=['Точка','Коника'];
	newWin('OD',Caption,Out,In,['O'],[['P'],['Y']]);
}
function funOE()
{
	var Caption='Прямая на равном расстоянии от прямой';
	var Out=['Прямая 1', 'Прямая 2'];
	var In=['Прямая','Дистанция'];
	newWin('OE',Caption,Out,In,['O','O'],[['O'],['C']]);
}
function funOF()
{
	var Caption='Касательная в точке объекта';
	var Out=['Касательная'];
	var In=['Объект','Точка'];
	newWin('OF',Caption,Out,In,['O'],[['*'],['P']]);
}
function funOG()
{
	var Caption='Габаритные прямые';
	var Out=['Прямая 1','Прямая 2','Прямая 3','Прямая 4'];
	var In=['Объект'];
	newWin('OG',Caption,Out,In,['O','O','O','O'],[['*']]);
}

function funOY()
{
	var Caption='Главные диаметры коники';
	var Out=['Прямая 1','Прямая 2'];
	var In=['Коника'];
	newWin('OY',Caption,Out,In,['O','O'],[['Y']]);
}


function funP0()
{
	var Caption='Точка задана координатами';
	var Out=['Точка'];
	var In=['X','Y'];
	newWin('P0',Caption,Out,In,['P'],[['C','F','P'],['C','F','P']]);
	pd=parent;
	pd.win1=win1;
}

function funP1()
{
	var Caption='Точка задана относительно точки приращениями координат координатами';
	var Out=['Точка'];
	var In=['Точка 1','dX','dY'];
	newWin('P1',Caption,Out,In,['P'],[['P'],['C','F'],['C','F']]);
}

function funP2()
{
	var Caption='Точка пересечения двух прямых';
	var Out=['Точка'];
	var In=['Прямая 1','Прямая 2'];
	newWin('P2',Caption,Out,In,['P'],[['O','V','P'],['O','V','P']]);
}

function funP3()
{
	var Caption='Точки пересечения двух окружностей';
	var Out=['Точка 1','Точка 2'];
	var In=['Окружность 1','Окружность 2'];
	newWin('P3',Caption,Out,In,['P','P'],[['D'],['D']]);
}

function funP4()
{
	var Caption='Прямая, касательная к окружности из точки';
	var Out=['Прямая','Точка'];
	var In=['Точка 1','Окружность'];
	newWin('P4',Caption,Out,In,['O','P'],[['P'],['D']]);
}

function funP5()
{
	var Caption='Точка задана относительно точки дистанцией и углом к прямой';
	var Out=['Точка'];
	var In=['Точка 1','Дистанция','Прямая','Угол'];
	newWin('P5',Caption,Out,In,['P'],[['P'],['C','F'],['O','V'],['C','F']]);
}
function funP6()
{
	var Caption='Точка пересечения прямой и окружности';
	var Out=['Точка 1','Точка 2'];
	var In=['Прямая','Окружность'];
	newWin('P6',Caption,Out,In,['P','P'],[['O','V'],['D']]);
}
function funP7()
{
	var Caption='Граничная точка в заданном направлении';
	var Out=['Точка'];
	var In=['Объекты','Направление'];
	newWin('P7',Caption,Out,In,['P'],[['*'],['O','V']]);
}
function funP8()
{
	var Caption='Специальное пересечение прямой и окружности';
	var Out=['Точка 1','Точка 2'];
	var In=['Прямая','Окружность'];
	newWin('P8',Caption,Out,In,['P','P'],[['O','V'],['D']]);
}
function funP9()
{
	var Caption='Точка принадлежит объекту';
	var Out=['Точка'];
	var In=['Объект','Параметр'];
	newWin('P9',Caption,Out,In,['P'],[['*'],['C','F']]);
}
function funPA()
{
	var Caption='Центр объекта';
	var Out=['Точка'];
	var In=['Объект'];
	newWin('PA',Caption,Out,In,['P'],[['O','D','Y','Z']]);
}
function funPB()
{
	var Caption='Точка задана относительно точки расстоянием и углом к OX';
	var Out=['Точка'];
	var In=['Точка 1','Расстояние','Угол'];
	newWin('PB',Caption,Out,In,['P'],[['P'],['C','F'],['C','F']]);
}
function funPC()
{
	var Caption='Точка пересечения прямой и объекта';
	var Out=['Точка','Параметр'];
	var In=['Прямая','Объект'];
	newWin('PC',Caption,Out,In,['P','C'],[['O','V'],['D','S','O','Z','W','Y']]);
}
function funPD()
{
	var Caption='Точка задана относительно двух точек';
	var Out=['Точка'];
	var In=['Точка 1','Dx','Точка 2','Dy'];
	newWin('PD',Caption,Out,In,['P'],[['P'],['C','F'],['P'],['C','F']]);
}
function funPE()
{
	var Caption='Вращение объекта относительно точки';
	var Out=['Образ'];
	var In=['Центр','Прообраз','Угол'];
	newWin('PE',Caption,Out,In,['E'],[['P'],['*'],['C','F','O']]);
}
function funPF()
{
	var Caption='Ортогональное проецирование точки на прямую';
	var Out=['Прообраз'];
	var In=['Точка','Прямая'];
	newWin('PF',Caption,Out,In,['P'],[['P','O','V','D'],['O','D']]);
}
function funPG()
{
	var Caption='Точки пересечения прямой и коники';
	var Out=['Точка 1','Точка 2'];
	var In=['Прямая', 'Коника'];
	newWin('PG',Caption,Out,In,['P','P'],[['O','V'],['Y']]);
}
function funPI()
{
	var Caption='Упорядочить точки в заданном направлении';
	var Out=['Точки','Параметры'];
	var In=['Точки 1', 'Направление'];
	newWin('PI',Caption,Out,In,['P','C'],[['P'],['O']]);
}
function funPJ()
{
	var Caption='Точка задана относительно точки расстоянием и направлением';
	var Out=['Точка'];
	var In=['Точка 1', 'Расстояние','Направление'];
	newWin('PJ',Caption,Out,In,['P'],[['P'],['C','F'],['C','F','P','O','V','D','Z']]);
}
function funPK()
{
	var Caption='Центральное проецирование точки на прямую';
	var Out=['Точка'];
	var In=['Точка 1 (Проективитет)', 'Прямая','Центр (угол, направление)'];
	newWin('PK',Caption,Out,In,['P'],[['P','L'],['O'],['C','P','O','V']]);
}
function funPL()
{
	var Caption='Задание несобственной точки';
	var Out=['Точка'];
	var In=['Направление'];
	newWin('PL',Caption,Out,In,['P'],[['O','V','C','F']]);
}
function funPM()
{
	var Caption='Специальное пересечение прямой и коники';
	var Out=['Точка 1','Точка 2'];
	var In=['Прямая','Коника'];
	newWin('PM',Caption,Out,In,['P','P'],[['O','V'],['Y']]);
}
function funPO()
{
	var Caption='Точки, удаленные от двух точек';
	var Out=['Точка 1','Точка 2'];
	var In=['Исходная точка 1','Исходная точка 1','D1','D2'];
	newWin('PO',Caption,Out,In,['P','P'],[['P'],['P'],['C','F'],['C','F']]);
}
function funPP()
{
	var Caption='Центр симметрии двух точек';
	var Out=['Центр'];
	var In=['Точка 1','Точка 2'];
	newWin('PP',Caption,Out,In,['P','P'],[['P'],['P']]);
}
function funPQ()
{
	var Caption='Барицентр';
	var Out=['Барицентр'];
	var In=['Точки','Вес точек'];
	newWin('PQ',Caption,Out,In,['P'],[['P'],['C']]);
}
function funPR()
{
	var Caption='Комплексно сопряженная точка';
	var Out=['Барицентр'];
	var In=['Точка','Точка 1'];
	newWin('PR',Caption,Out,In,['P'],[['P']]);
}
function funPU1()
{
	var Caption='Компоненты комплексной точки';
	var Out=['X-компонента','Y-компонента'];
	var In=['Точка'];
	newWin('PU1',Caption,Out,In,['P','P'],[['P']]);
}
function funPU2()
{
	var Caption='Re-Im компоненты комплексной точки';
	var Out=['X-компонента','Y-компонента'];
	var In=['Точка'];
	newWin('PU2',Caption,Out,In,['P','P'],[['P']]);
}
function funPY()
{
	var Caption='Точка в контуре';
	var Out=['Точка'];
	var In=['Точки 1','Контур'];
	newWin('PY',Caption,Out,In,['E'],[['P'],['W']]);
}
function funPZ()
{
	var Caption='Упорядочение точек по параметру';
	var Out=['Точки'];
	var In=['Точки 1','Параметры'];
	newWin('PZ',Caption,Out,In,['P','P'],[['P']]);
}
function funP0A()
{
	var Caption='Точка задана координатами с двойной линейной границей';
	var Out=['Точка'];
	var In=['Граница 1','Граница 2','X','Y'];
	newWin('P0A',Caption,Out,In,['P'],[['O'],['O'],['C','F'],['C','F']]);
}
function funP0L()
{
	var Caption='Точка задана координатами с линейной границей';
	var Out=['Точка'];
	var In=['Граница','X','Y'];
	newWin('P0L',Caption,Out,In,['P'],[['O'],['C','F'],['C','F']]);
}
function funP1A()
{
	var Caption='Точка относительно точки приращениями координат с двойной линейной границей';
	var Out=['Точка'];
	var In=['Граница 1','Граница 2','Точка 1','dX','dY'];
	newWin('P1A',Caption,Out,In,['P'],[['O'],['O'],['P'],['C','F'],['C','F']]);
}
function funP1L()
{
	var Caption='Точка относительно точки приращениями координат линейной границей';
	var Out=['Точка'];
	var In=['Граница','Точка 1','dX','dY'];
	newWin('P1L',Caption,Out,In,['P'],[['O'],['P'],['C','F'],['C','F']]);
}
function funP9A()
{
	var Caption='Точка принадлежит объекту с двойной линейной границей';
	var Out=['Точка'];
	var In=['Объект','Параметр','Граница 1','Граница 2'];
	newWin('P9A',Caption,Out,In,['P'],[['*'],['C','F'],['O'],['O']]);
}
function funP9L()
{
	var Caption='Точка принадлежит объекту с линейной границей';
	var Out=['Точка'];
	var In=['Объект','Параметр','Граница'];
	newWin('P9L',Caption,Out,In,['P'],[['*'],['C','F'],['O']]);
}
function funRA()
{
	var Caption='Радикальная ось';
	var Out=['Радикальная ось'];
	var In=['Окружность 1 (прямая, точка)','Окружность 2 (прямая, точка)'];
	newWin('RA',Caption,Out,In,['O'],[['D','O','P'],['D','O','P']]);
}
function funRC()
{
	var Caption='Радикальный центр трех окружностей';
	var Out=['Радикальный центр'];
	var In=['Окружность 1','Окружность 2','Окружность 3'];
	newWin('RC',Caption,Out,In,['O'],[['D','O'],['D','O'],['D','O']]);
}

function funW0()
{
	var Caption='Контур из компонентов';
	var Out=['Контур'];
	var In=['Компоненты'];
	newWin('W0',Caption,Out,In,['W'],[['D','O']]);
}
function funW3()
{
	var Caption='Эквидистантный контур';
	var Out=['Контур'];
	var In=['Контур 1','Дистанция'];
	newWin('W3',Caption,Out,In,['W'],[['W'],['C','F']]);
}
function funW33()
{
	var Caption='Сглаженный контур';
	var Out=['Контур'];
	var In=['Контур 1','Радиус'];
	newWin('W33',Caption,Out,In,['W'],[['W'],['C','F']]);
}
function funW4()
{
	var Caption='Выделение части контура';
	var Out=['Контур'];
	var In=['Контур 1','Параметр 1','Параметр 2'];
	newWin('W4',Caption,Out,In,['W'],[['W'],['C','F'],['C','F']]);
}
function funW5()
{
	var Caption='Разложение контура на составляющие';
	var Out=['Список'];
	var In=['Контур'];
	newWin('W5',Caption,Out,In,['E'],[['W']]);
}

function funWA()
{
	var Caption='Объединение контуров';
	var Out=['Контур'];
	var In=['Контур 1','Контур 2'];
	newWin('WA',Caption,Out,In,['W'],[['W'],['W']]);
}

function funWB()
{
	var Caption='Пересечение контуров';
	var Out=['Контур'];
	var In=['Контур 1','Контур 2'];
	newWin('WB',Caption,Out,In,['W'],[['W'],['W']]);
}
function funWC()
{
	var Caption='Отсечение контуров';
	var Out=['Контур'];
	var In=['Контур 1','Контур 2'];
	newWin('WC',Caption,Out,In,['W'],[['W'],['W']]);
}
function funWD()
{
	var Caption='Симметрическая разность контуров';
	var Out=['Контур'];
	var In=['Контур 1','Контур 2'];
	newWin('WD',Caption,Out,In,['W'],[['W'],['W']]);
}
function funWL()
{
	var Caption='Контурная лента';
	var Out=['Контур'];
	var In=['Контур 1','A','B'];
	newWin('WL',Caption,Out,In,['W'],[['W'],['C','F'],['C','F']]);
}
function funWP()
{
	var Caption='Центр масс контура';
	var Out=['Центр'];
	var In=['Контур'];
	newWin('WP',Caption,Out,In,['P'],[['W']]);
}
function funWQ()
{
	var Caption='Прямоугольный контур';
	var Out=['Контур'];
	var In=['Точка','A','B'];
	newWin('WQ',Caption,Out,In,['W'],[['P'],['C','F'],['C','F']]);
}
function funWS()
{
	var Caption='Контурная сетка';
	var Out=['Контур'];
	var In=['Остов','Дистанция'];
	newWin('WS',Caption,Out,In,['W'],[['O','D'],['C','F']]);
}
function funWT()
{
	var Caption='Пересечение контуров одноаргументное';
	var Out=['Контур'];
	var In=['Контуры'];
	newWin('WT',Caption,Out,In,['W'],[['W','D']]);
}
function funWU()
{
	var Caption='Объединение контуров одноаргументное';
	var Out=['Контур'];
	var In=['Контуры'];
	newWin('WU',Caption,Out,In,['W'],[['W','D']]);
}
function funWW()
{
	var Caption='Контур';
	var Out=['Контур'];
	var In=['Компоненты'];
	newWin('WW',Caption,Out,In,['W'],[['O','D']]);
}


function funX0()
{
	var Caption='Точка в замене плоскостей проекций';
	var Out=['Точка'];
	var In=['Заменяемая точка','Исходная ось','Опорная точка','Новая ось'];
	newWin('X0',Caption,Out,In,['P'],[['P','O'],['O','V'],['P','O'],['O','V']]);
}

function winLoad()
{
	var	ppp=parent.document.getElementById("rightFrame1");
	ppp.contentDocument.close()
	ppp.contentDocument.open()
	var	qqq=parent.document.getElementById("rightFrame");
	qqq.contentWindow.AskDlg=ppp;
	qqq.contentWindow.AskDlg=null;
	ppp.contentDocument.writeln('<input type="file" id="input">');
	
	ppp.contentDocument.getElementById('input').addEventListener('change', function (e) {
	var ooo=qqq.contentDocument;
	var abcd=ooo.getElementById("play")
	abcd.click();
	
	Alg=qqq.contentWindow.Alg;
	Alg.Prog=[ ];
	Alg.NameList=[ ];
  
  
	var file = e.target.files[0];  // первый элемент массива файлов	
	var reader = new FileReader();

	// при успешном завершении операции чтения
	reader.onload = (function (file) 
	{
		return function (e) 
		{
			var r = e.target;
			// получаем содержимое файла, состояние чтения, ошибки(или null)
			console.log(r.result, r.readyState, r.error);
			qqq.contentWindow.Prog=r.result;
			var	ppp=parent.document.getElementById("rightFrame1");
			substringArray = qqq.contentWindow.Prog.split("\r\n");
			var I=-1;
			do
			{
				I++;
				if (substringArray[I]!="STATEMENTS") continue;
				I=I+7;
				do
				{
					I++;
					var S=substringArray[I];
					if (S.indexOf("\t")<0) continue;
					var Stroka=S.split(';');
					var Left=Stroka[0].split("\t");
					Left.length--;
					var Right=Stroka[1].split("\t");
					Right.length--;
						
					var PTS=new Object();
					PTS.Out=[];
					PTS.In=[];
			
					for (var J=2; J<Left.length; J++)
					{
						var Temp=Left[J].split(":");
						PTS.Out.push(Left[J]);
					}
			
					for (var J=1; J<Right.length; J++)
					{
						PTS.In.push(Right[J]);
					}
					PTS.Fun=Left[0];
					PTS.Actual=true;
					AddPTS(Alg,PTS)

				} while (substringArray[I]!="ENDALG = Main")
			} while (I<substringArray.length);
			
			Executer(Alg);
			for (var I=0; I<=Alg.NameList.length-1; I++)
			{
				var PN=Alg.NameList[I];
				qqq.contentWindow.arr.push(PN.List);
			}
			qqq.contentWindow.draw(qqq.contentWindow.arr);
			

		};
	})(file);

	// получить содержимое как текст
	reader.readAsText(file);
	// или:
	// readAsText, readAsArrayBuffer, readAsDataURL, readAsBinaryString
});	
}

function newWin(Fun,Caption,Out,In,MO,MI) 
{
	
function callClose()
{
	ppp.contentDocument.close();
	ppp.contentDocument.open();
	qqq.contentWindow.AskDlg=null;


} // callClose
	
var	ppp=parent.document.getElementById("rightFrame1");
	var	qqq=parent.document.getElementById("rightFrame");
	Alg=qqq.contentWindow.Alg;
	qqq.contentWindow.mode="pointer";
	qqq.contentWindow.AskDlg=ppp;
 
	if (win1!=null)
	{
		win1.docunent=null;
		win1=null;
	}
/*
	win1 = window.open("", "myWindow", "toolbar=0,width=280,height=100,alwaysRaised=yes,location=0,menubar=0,resizable=0");
	win1.document.open();
	win1.document.writeln("<title>"+Caption+"</title>"+"<body bgcolor='#FFFFFF'>");
*/
	ppp.OutN=Out.length-1;
	ppp.InN=In.length-1;
	ppp.Fun=Fun;
	ppp.Caption=Caption;
	ppp.Out=Out;
	ppp.In=In;
	ppp.MO=MO;
	ppp.MI=MI;

	ppp.contentDocument.close()
	ppp.contentDocument.open()
	
	ppp.contentDocument.writeln(Caption);	
	ppp.contentDocument.writeln("<hr>");	
	
	var LL=[];
	for (var I=0; I<=Out.length-1; I++)
	{
		ppp.contentDocument.writeln("<font color='maroon'>"+Out[I]+"</font>");
		var S1='out'+I;
		var S=GetNewName(MO[I],LL);
		ppp.contentDocument.writeln("<form> <input id='"+S1+"' type='text' autocomplete='off' color='red' size=20 name='aname' value='"+S+"'></form>");
	}
	ppp.contentDocument.writeln("");
	ppp.contentDocument.writeln("<hr>");	

	for (var I=0; I<=In.length-1; I++)
	{
		ppp.contentDocument.writeln("<P>");
		ppp.contentDocument.writeln("<font color='navy'>"+In[I]+"</font>");
		ppp.contentDocument.writeln("<BR>");
		var S1='in'+I;
		ppp.contentDocument.writeln("<input id='"+S1+"' type='text' autocomplete='off' size=20 name='aname'>");
		ppp.contentDocument.writeln("</P>");
		var ooo=ppp.contentDocument.getElementById(S1);
		ooo.oninput=manageChange;
		ooo.onfocus=manageFocus;
		ooo.onkeydown=managekeydown; 
		ooo.N=I;
		if (I==0)
		{ 
			ooo.focus()
		}
	}
	var S='img src="http://dww.no-ip.org/Simplex/functions/'+Fun+'/'+Fun+'.png"';
	var S1='img src="http://dww.no-ip.org/Simplex/Common/do.png"';
	var S2='img src="http://dww.no-ip.org/Simplex/Common/help.png"';
	var S3='img src="http://dww.no-ip.org/Simplex/Common/close.png"';
	ppp.contentDocument.writeln(
	' <button id="OK"><'+S1+' style="vertical-align: middle"> Ввод</button>'+
	' <button id="TEST"><'+S+' style="vertical-align: middle"> Тест</button>'+
	' <button id="HELP"><'+S2+' style="vertical-align: middle"> Справка</button>'+
	' <button id="CLOSE"><'+S3+' style="vertical-align: middle"></button>');
	but_help=ppp.contentDocument.getElementById("HELP");
	but_test=ppp.contentDocument.getElementById("TEST");
	but_help.onclick=callHelp;
	but_help.fun=Fun;

	but_OK=ppp.contentDocument.getElementById("OK");
	but_OK.onclick=callExecute;
	but_OK.disabled=true;
	but_OK.accessKey=13;
	but_test.disabled=true;
	but_test.onclick=callTest;

	ppp.but_help=but_help;
	ppp.but_OK=but_OK;
	ppp.but_test=but_test;

	but_Close=ppp.contentDocument.getElementById("CLOSE");
	but_Close.onclick=callClose;
	
	ppp.contentDocument.close()
}

function managekeydown(event)
{
	var	ppp=parent.document.getElementById("rightFrame1");
	var but_OK=ppp.contentDocument.getElementById("OK");
	var N=event.keyCode;
	if (N==13) but_OK.click();
}

function manageChange()
{
	var	win1=parent.document.getElementById("rightFrame1");
	
	var Found=true;
	for (var I=0; I<=win1.InN; I++)
	{
		var ooo=win1.contentDocument.getElementById("in"+I);
		var S=ooo.value;
		Found=Found && (S!="");
	}
	win1.but_OK.disabled=!Found;
	win1.but_test.disabled=!Found;

}

function manageFocus()
{
	this.selectionEnd=this.value.length-1;
	var	ppp=parent.document.getElementById("rightFrame1");
	ppp.contentDocument.Page=this.N;
}

function Res()
{
//	this.innerWidth=this.w;
//	this.outerHeight=this.h+120;
}

function testwin()
{
	if (!(win1==undefined)) win1.focus();
}
function callHelp()
{
//	alert(this.fun);


	var S='http://dww.no-ip.org/Simplex/functions/'+this.fun+'/index.htm'
//	location.href=S;
	var myWin= open(S);
}

function callExecute(Fun)
{
//	var myWin= open('untitled.html');

	var	ppp=parent.document.getElementById("rightFrame1");
	var PTS=new Object();
	PTS.Out=[];
	PTS.In=[];
	
	for (var I=0; I<=ppp.OutN; I++)
	{
		var ooo=ppp.contentDocument.getElementById("out"+I);
		var S=ooo.value;
		PTS.Out.push(S);
	}
	
	for (var I=0; I<=ppp.InN; I++)
	{
		var ooo=ppp.contentDocument.getElementById("in"+I);
		var S=ooo.value;
		PTS.In.push(S);
	}
	PTS.Fun=ppp.Fun;
	PTS.Actual=true;
	Execute(PTS,true);
//	var SS="a";
//	Alg.Prog.push(SS);
}

function callTest(Fun)
{
//	var myWin= open('untitled.html');

	var	ppp=parent.document.getElementById("rightFrame1");
	var PTS=new Object();
	PTS.Out=[];
	PTS.In=[];
	
	for (var I=0; I<=ppp.OutN; I++)
	{
		var ooo=ppp.contentDocument.getElementById("out"+I);
		var S=ooo.value;
		PTS.Out.push(S);
	}
	
	for (var I=0; I<=ppp.InN; I++)
	{
		var ooo=ppp.contentDocument.getElementById("in"+I);
		var S=ooo.value;
		PTS.In.push(S);
	}
	PTS.Fun=ppp.Fun;
	PTS.Actual=true;
	Execute(PTS,false);
//	var SS="a";
//	Alg.Prog.push(SS);
}

function GetNewName(M,LL)
{
	var P;
	if (M=="C") P="c";
	if (M=="B") P="b";
	if (M=="D") P="d";
	if (M=="F") P="f";
	if (M=="G") P="g";
	if (M=="H") P="h";
	if (M=="J") P="j";
	if (M=="K") P="k";
	if (M=="L") P="l";
	if (M=="N") P="n";
	if (M=="O") P="o";
	if (M=="P") P="p";
	if (M=="Q") P="q";
	if (M=="R") P="r";
	if (M=="S") P="s";
	if (M=="T") P="t";
	if (M=="V") P="v";
	if (M=="W") P="w";
	if (M=="X") P="x";
	if (M=="Y") P="y";
	if (M=="Z") P="z";
	if (M=="E") P="x";
	
	var N=0;
	var S2=P;
	do
	{
		Found=false;
		N++;
		for (var I=0;I<=Alg.NameList.length-1; I++)
		{
			var S=Alg.NameList[I].Name;
			var pos = S.indexOf(P);
			pos=pos+P.length;
			S2=S.slice(0,pos);
			if (!(S2==P)) continue;
			var S1=S.slice(pos);
			var V=parseInt(S1);
			if (V==N) Found=true; 
		}
		for (var I=0;I<=LL.length-1; I++)
		{
			var S=LL[I];
			var pos = S.indexOf(P);
			pos=pos+P.length;
			S2=S.slice(0,pos);
			if (!(S2==P)) continue;
			var S1=S.slice(pos);
			var V=parseInt(S1);
			if (V==N) Found=true; 
		}
		
	} while (Found)
	S2=P+N;
	LL.push(S2);
	return S2;
}// GetNewName


function AddPTS(Alg,PTS)
{
	Alg.Prog.push(PTS);
	PTS.L=[];
	PTS.R=[];
	
	for (var J=0; J<=PTS.Out.length-1; J++)
	{
		var S=PTS.Out[J];
		var Name=S.split(":");
		S=Name[0];
		Atri=Name[1];
		var Found=false;
		for (var K=0; K<=Alg.NameList.length-1; K++)
		{
			PN=Alg.NameList[K];
			if (S==PN.Name) 
			{
				PTS.L.push(PN);
				Found=true;
			}
		}
		if (!Found) 
		{
			var PN= new Object();
			PN.Name=S;
			PN.List= new Object()
			PN.List.Name=S;
			Alg.NameList.push(PN);
			PTS.L.push(PN);
		}
	}

	PTS.S=[ ];
	for (var J=0; J<=PTS.In.length-1; J++)
	{
		var S=PTS.In[J];
		var V=parseFloat(S);
		
		if (isNaN(V))
		{
			var Sign=1;
			if (S[0]=="-")
			{
				S=S.substr(1, S.length-1);
				Sign=-1;
			}
			PTS.S.push(Sign)
			var Found=false;
			for (K=0; K<Alg.NameList.length-1; K++)
			{
				if (S==Alg.NameList[K].Name) 
				{
					PN=Alg.NameList[K];
					PTS.R.push(PN);
					Found=true;
				}
			}
			if (!Found) 
			{
				var PN= new Object();
				PN.Name=S;
				PN.List= new Object()
				Alg.NameList.push(PN);
				PTS.R.push(PN);
			}
		} else
		{
			var PN = new Object();
			PN.Name='';
			PN.List=new Object();
			TOChisl_Create(PN.List,MCompl(V,0),Att0);
			PTS.R.push(PN);
			PTS.S.push(1);
		}
		
	}
} // AddPTS

function Execute(PTS,B)
{
	var Found=false;
	for (var I=0;I<PTS.Out.length;I++)
	{
		var S=PTS.Out[I]
		for (var J=0; J<Alg.Prog.length; J++)
		{
			PTS1=Alg.Prog[J];
			for (var K=0; K<PTS1.Out.length; K++)
			{
				var S1=PTS1.Out[K];
				if (S==S1) 
				{
					PTS1.Actual=false;
					for (var M=0; M<Alg.NameList.length; M++)
					{
						var PN1=Alg.NameList[M];
						PN1.List.OB=undefined;
					}
					Found=true;
				}
			}
		}
	}

	AddPTS(Alg,PTS);
	
	var	qqq=parent.document.getElementById("rightFrame");
	qqq.contentWindow.arr = new Array();
	var ooo=qqq.contentDocument;
	var abcd=ooo.getElementById("play")
	
	abcd.click();
	
	Executer(Alg);

	for (I=0; I<=Alg.NameList.length-1; I++)
	{
		PN=Alg.NameList[I];
		qqq.contentWindow.arr.push(PN.List);
	}
	qqq.contentWindow.draw(qqq.contentWindow.arr);

	// arr.push(PTS.L[0].List);
	// draw(arr);
	
	var	ppp=parent.document.getElementById("rightFrame1");
	if (B) newWin(ppp.Fun,ppp.Caption,ppp.Out,ppp.In,ppp.MO,ppp.MI) 
}


function Executer(Alg)
{
	function L(Num)
	{
		return PTS.L[Num].List;
	} // L

	function R(Num)
	{
		return PTS.R[Num].List;
	} // R	
	
	do
	{
		var Success=false;
		for (var I=0; I<=Alg.Prog.length-1; I++)
		{
			var PTS=Alg.Prog[I];
			if (!PTS.Actual) continue;
			if (PTS.Fun=="D0") if (L(0).OB==undefined) Success=EExecD0(L(0),R(0),R(1),Att0,PTS.S[0],PTS.S[1]) || Success;
			if (PTS.Fun=="D00") if (L(0).OB==undefined) Success=EExecD00(L(0),R(0),R(1),R(2),Att0,PTS.S[0],PTS.S[1],PTS.S[2]) || Success;
			if (PTS.Fun=="D0A") if (L(0).OB==undefined) Success=EExecD0A(L(0),R(0),R(1),R(2),Att0,PTS.S[0],PTS.S[1],PTS.S[2]) || Success;
			if (PTS.Fun=="D1") if (L(0).OB==undefined) Success=EExecD1(L(0),R(0),R(1),Att0,PTS.S[0],PTS.S[1]) || Success;
			if (PTS.Fun=="D2") if (L(0).OB==undefined) Success=EExecD2(L(0),R(0),R(1),Att0,PTS.S[0],PTS.S[1]) || Success;
			if (PTS.Fun=="D3") if (L(0).OB==undefined) Success=EExecD3(L(0),R(0),R(1),Att0,PTS.S[0],PTS.S[1]) || Success;
			if (PTS.Fun=="D4") if (L(0).OB==undefined) Success=EExecD4(L(0),R(0),R(1),R(2),Att0,PTS.S[0],PTS.S[1],PTS.S[2]) || Success;
			if (PTS.Fun=="D5") if (L(0).OB==undefined) Success=EExecD5(L(0),R(0),R(1),Att0,PTS.S[0],PTS.S[1]) || Success;
			if (PTS.Fun=="D9") if (L(0).OB==undefined) Success=EExecD9(L(0),R(0),R(1),R(2),Att0,PTS.S[0],PTS.S[1],PTS.S[2]) || Success;
			if (PTS.Fun=="DN") if (L(0).OB==undefined) Success=EExecDN(L(0),R(0),R(1),Att0,PTS.S[0],PTS.S[1]) || Success;
			if (PTS.Fun=="DC0") if (L(0).OB==undefined)  Success=EExecDC0(L(0),L(1),L(2),R(0),R(1),R(2),Att2,Att0,Att0,PTS.S[0],PTS.S[1],PTS.S[2]) || Success;
			if (PTS.Fun=="O0") if (L(0).OB==undefined) Success=EExecO0(L(0),R(0),R(1),Att5,PTS.S[0],PTS.S[1]) || Success;
			if (PTS.Fun=="O000") if (L(0).OB==undefined) Success=EExecO000(L(0),R(0),R(1),R(2),Att5,PTS.S[0],PTS.S[1],PTS.S[2]) || Success;
			if (PTS.Fun=="O1") if (L(0).OB==undefined) Success=EExecO1(L(0),R(0),R(1),Att5,PTS.S[0],PTS.S[1]) || Success;
			if (PTS.Fun=="O2") if (L(0).OB==undefined) Success=EExecO2(L(0),R(0),R(1),R(2),R(3),Att5,PTS.S[0],PTS.S[1],PTS.S[2],PTS.S[3]) || Success;
			if (PTS.Fun=="O3") if (L(0).OB==undefined) Success=EExecO3(L(0),L(1),L(2),R(0),R(1),Att5,Att5,Att5,PTS.S[0],PTS.S[1]) || Success;
			if (PTS.Fun=="O5") if (L(0).OB==undefined) Success=EExecO5(L(0),R(0),R(1),R(2),Att5,PTS.S[0],PTS.S[1],PTS.S[2]) || Success;
			if (PTS.Fun=="O7") if (L(0).OB==undefined) Success=EExecO7(L(0),R(0),R(1),Att5,PTS.S[0],PTS.S[1]) || Success;
			if (PTS.Fun=="O8") if (L(0).OB==undefined) Success=EExecO8(L(0),L(1),R(0),R(1),Att5,Att5,PTS.S[0],PTS.S[1]) || Success;
			if (PTS.Fun=="O9") if (L(0).OB==undefined) Success=EExecO9(L(0),L(1),L(2),L(3),R(0),R(1),Att5,Att5,Att5,Att5,PTS.S[0],PTS.S[1]) || Success;
			if (PTS.Fun=="OA") if (L(0).OB==undefined) Success=EExecOA(L(0),L(1),R(0),R(1),R(2),Att5,Att5,PTS.S[0],PTS.S[1],PTS.S[2]) || Success;
			if (PTS.Fun=="OE") if (L(0).OB==undefined) Success=EExecOE(L(0),L(1),R(0),R(1),Att5,Att5,PTS.S[0],PTS.S[1]) || Success;
			if (PTS.Fun=="OK001") if (L(0).OB==undefined) Success=EExecOK001(L(0),R(0),R(1),R(2),Att0,PTS.S[0],PTS.S[1],PTS.S[2]) || Success;
			if (PTS.Fun=="OY") if (L(0).OB==undefined) Success=EExecOY(L(0),L(1),R(0),Att5,Att5,PTS.S[0]) || Success;
			if (PTS.Fun=="P0") if (L(0).OB==undefined) Success=EExecP0(L(0),R(0),R(1),Att0,PTS.S[0],PTS.S[1]) || Success;
			if (PTS.Fun=="P1") if (L(0).OB==undefined) Success=EExecP1(L(0),R(0),R(1),R(2),Att0,PTS.S[0],PTS.S[1],PTS.S[2]) || Success;
			if (PTS.Fun=="P2") if (L(0).OB==undefined) Success=EExecP2(L(0),R(0),R(1),Att0,PTS.S[0],PTS.S[1]) || Success;
			if (PTS.Fun=="P3") if (L(0).OB==undefined) Success=EExecP3(L(0),L(1),R(0),R(1),Att0,Att0,PTS.S[0],PTS.S[1]) || Success;
			if (PTS.Fun=="P4") if (L(0).OB==undefined) Success=EExecP4(L(0),L(1),R(0),R(1),Att5,Att0,PTS.S[0],PTS.S[1]) || Success;
			if (PTS.Fun=="P5") if (L(0).OB==undefined) Success=EExecP5(L(0),R(0),R(1),R(2),R(3),Att0,PTS.S[0],PTS.S[1],PTS.S[2],PTS.S[3]) || Success;
			if (PTS.Fun=="P6") if (L(0).OB==undefined) Success=EExecP6(L(0),L(1),R(0),R(1),Att0,Att0,PTS.S[0],PTS.S[1]) || Success;
			if (PTS.Fun=="P9") if (L(0).OB==undefined) Success=EExecP9(L(0),R(0),R(1),Att0,PTS.S[0],PTS.S[1]) || Success;
			if (PTS.Fun=="PA") if (L(0).OB==undefined) Success=EExecPA(L(0),R(0),Att0,PTS.S[0]) || Success;
			if (PTS.Fun=="PD") if (L(0).OB==undefined) Success=EExecPD(L(0),R(0),R(1),R(2),R(3),Att0,PTS.S[0],PTS.S[1],PTS.S[2],PTS.S[3]) || Success;
			if (PTS.Fun=="PF") if (L(0).OB==undefined) Success=EExecPF(L(0),R(0),R(1),Att0,PTS.S[0],PTS.S[1]) || Success;
			if (PTS.Fun=="Y0") if (L(0).OB==undefined) Success=EExecY0(L(0),R(0),R(1),R(2),R(3),R(4),Att5,PTS.S[0],PTS.S[1],PTS.S[2],PTS.S[3],PTS.S[4]) || Success;
			if (PTS.Fun=="TR001") if (L(0).OB==undefined) Success=EExecTR001(L(0),R(0),R(1),R(2),Att0,PTS.S[0],PTS.S[1],PTS.S[2]) || Success;
			if (PTS.Fun=="TR002") if (L(0).OB==undefined) Success=EExecTR002(L(0),R(0),R(1),R(2),Att0,PTS.S[0],PTS.S[1],PTS.S[2]) || Success;
			if (PTS.Fun=="TR003") if (L(0).OB==undefined) Success=EExecTR003(L(0),R(0),R(1),R(2),Att0,PTS.S[0],PTS.S[1],PTS.S[2]) || Success;
			if (PTS.Fun=="TR004") if (L(0).OB==undefined) Success=EExecTR004(L(0),R(0),R(1),R(2),Att0,PTS.S[0],PTS.S[1],PTS.S[2]) || Success;
			if (PTS.Fun=="TR005") if (L(0).OB==undefined) Success=EExecTR005(L(0),R(0),R(1),R(2),Att0,PTS.S[0],PTS.S[1],PTS.S[2]) || Success;
			if (PTS.Fun=="TR006") if (L(0).OB==undefined) Success=EExecTR006(L(0),L(1),L(2),L(3),R(0),R(1),R(2),Att0,Att0,Att0,Att0,PTS.S[0],PTS.S[1],PTS.S[2]) || Success;
			if (PTS.Fun=="TR007") if (L(0).OB==undefined) Success=EExecTR007(L(0),L(1),L(2),L(3),R(0),R(1),R(2),Att0,Att0,Att0,Att0,PTS.S[0],PTS.S[1],PTS.S[2]) || Success;
			if (PTS.Fun=="TR008") if (L(0).OB==undefined) Success=EExecTR008(L(0),R(0),R(1),R(2),Att0,PTS.S[0],PTS.S[1],PTS.S[2]) || Success;
			if (PTS.Fun=="TR009") if (L(0).OB==undefined) Success=EExecTR009(L(0),R(0),R(1),R(2),Att0,PTS.S[0],PTS.S[1],PTS.S[2]) || Success;
			if (PTS.Fun=="TR010") if (L(0).OB==undefined) Success=EExecTR010(L(0),L(1),L(2),R(0),R(1),R(2),Att5,Att5,Att5,PTS.S[0],PTS.S[1],PTS.S[2]) || Success;
			if (PTS.Fun=="TR011") if (L(0).OB==undefined) Success=EExecTR011(L(0),L(1),L(2),R(0),R(1),R(2),Att5,Att5,Att5,PTS.S[0],PTS.S[1],PTS.S[2]) || Success;
			if (PTS.Fun=="TR012") if (L(0).OB==undefined) Success=EExecTR012(L(0),L(1),L(2),R(0),R(1),R(2),Att5,Att5,Att5,PTS.S[0],PTS.S[1],PTS.S[2]) || Success;
			if (PTS.Fun=="TR013") if (L(0).OB==undefined) Success=EExecTR013(L(0),L(1),L(2),R(0),R(1),R(2),Att5,Att5,Att5,PTS.S[0],PTS.S[1],PTS.S[2]) || Success;
			if (PTS.Fun=="TR014") if (L(0).OB==undefined) Success=EExecTR014(L(0),L(1),L(2),R(0),R(1),R(2),R(3),Att5,Att5,Att5,PTS.S[0],PTS.S[1],PTS.S[2],PTS.S[3]) || Success;
			
			
		}
	} while (Success);
}

function getPosition(e) {
  var posx = 0;
  var posy = 0;

  if (!e) var e = window.event;

  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  }
  else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft
      + document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop
      + document.documentElement.scrollTop;
  }

  return {
    x: posx,
    y: posy
  }
}

function Test()
{
function L(Num)
{
	return PTS.L[Num].List;
} // L

function R(Num)
{
	return PTS.R[Num].List;
} // R
	function CreatePN(Name)
	{
		PN = new Object();
		PN.List=[];
		PN.Name=Name;
		PN.List.Name=Name;
		Alg.NameList.push(PN);
		return PN;
	}
	function CreatePTS(Fun,L,R,MO,MI)
	{
		var PTS = new Object()
		PTS.Fun = Fun;
		PTS.L=[ ]; PTS.Out=[ ]; for (var I=0; I<L.length;I++) {PTS.L.push(L[I]);PTS.Out.push(MO[I])}
		PTS.R=[ ]; PTS.In=[ ]; for (var I=0; I<R.length;I++) {PTS.R.push(R[I]);PTS.In.push(MI[I])}
		PTS.Actual=true;
		Alg.Prog.push(PTS);
		return PTS;
	}

	var	qqq=parent.document.getElementById("rightFrame");
	qqq.contentWindow.arr = new Array();
	qqq.mode="pointer";

	Alg=qqq.contentWindow.Alg;
	Alg.Prog=[ ];
	Alg.NameList=[ ];
     
	var p1=CreatePN("p1");
	var p2=CreatePN("p2");
	var p3=CreatePN("p3");
	var p4=CreatePN("p4");
	var o1=CreatePN("o1");
	var o2=CreatePN("o2");
	var o3=CreatePN("o3");
	var o4=CreatePN("o4");
	var o5=CreatePN("o5");
	var o6=CreatePN("o6");
	var Chisl1 = new Object();
	Chisl1.Name=GetNewName(['C'],[ ]);
	Chisl1.List=new Object();
	TOChisl_Create(Chisl1.List,MCompl(2,0),Att0);
	var Chisl2 = new Object();
	Chisl2.Name=GetNewName(['C'],[ ]);;
	Chisl2.List=new Object();
	TOChisl_Create(Chisl2.List,MCompl(-12.5,0),Att0);
	var Chisl3 = new Object();
	Chisl3.Name=GetNewName(['C'],[ ]);;
	Chisl3.List=new Object();
	TOChisl_Create(Chisl3.List,MCompl(45,0),Att0);
	var Chisl4 = new Object();
	Chisl4.Name=GetNewName(['C'],[ ]);;
	Chisl4.List=new Object();
	TOChisl_Create(Chisl4.List,MCompl(98.5,0),Att0);
	var Chisl5 = new Object();
	Chisl5.Name=GetNewName(['C'],[ ]);;
	Chisl5.List=new Object();
	TOChisl_Create(Chisl5.List,MCompl(179,0),Att0);
	var Chisl6 = new Object();
	Chisl6.Name=GetNewName(['C'],[ ]);;
	Chisl6.List=new Object();
	TOChisl_Create(Chisl6.List,MCompl(50.5,0),Att0);
	var Chisl7 = new Object();
	Chisl7.Name=GetNewName(['C'],[ ]);;
	Chisl7.List=new Object();
	TOChisl_Create(Chisl7.List,MCompl(133,0),Att0);
	var Chisl8 = new Object();
	Chisl8.Name=GetNewName(['C'],[ ]);;
	Chisl8.List=new Object();
	TOChisl_Create(Chisl8.List,MCompl(-79.5,0),Att0);


	var PTS=CreatePTS("P0", [p1], [Chisl1,Chisl2],["p1"],["2","-12.5"]);
	var PTS=CreatePTS("P0", [p2], [Chisl3,Chisl4],["p2"],["45","98.5"]);
	var PTS=CreatePTS("P0", [p3], [Chisl5,Chisl6],["p3"],["179","50.5"]);
	var PTS=CreatePTS("P0", [p4], [Chisl7,Chisl8],["p4"],["133","-79.5"]);
	var PTS=CreatePTS("O0", [o1], [p1,p2],["o1"],["p1","p2"]);
	var PTS=CreatePTS("O0", [o2], [p1,p3],["o2"],["p1","p3"]);
	var PTS=CreatePTS("O0", [o3], [p1,p4],["o3"],["p1","p4"]);
	var PTS=CreatePTS("O0", [o4], [p2,p3],["o4"],["p2","p3"]);
	var PTS=CreatePTS("O0", [o5], [p2,p4],["o5"],["p2","p4"]);
	var PTS=CreatePTS("O0", [o6], [p3,p4],["o6"],["p3","p4"]);




	
	var ooo=qqq.contentDocument;
	var abcd=ooo.getElementById("play")
	abcd.click();

	Executer(Alg);
	for (var I=0; I<=Alg.NameList.length-1; I++)
	{
		var PN=Alg.NameList[I];
		qqq.contentWindow.arr.push(PN.List);
	}
	qqq.contentWindow.draw(qqq.contentWindow.arr);
	
}


function ProcB(X1,Y1,X2,Y2,Xt,Yt,V)
{     
	var E=Math.abs(Math.sqrt(Sqr(X1-X2)+Sqr(Y1-Y2))-Math.sqrt(Sqr(X1-Xt)+Sqr(Y1-Yt))-Math.sqrt(Sqr(X2-Xt)+Sqr(Y2-Yt)));
    return E<V;
} // ProcB 


function ObjOfferItself(OBJ,X,Y)
{
	var S="";
	if (OBJ.OB=="P")
	{
		if ((Math.abs(OBJ.X.Re-_Xl-X)<10) && (Math.abs(OBJ.Y.Re-_Yu-Y)<10))
		{
			S=OBJ.Name;
			return S;
		}
	}
	
	if (OBJ.OB=="O")
	{
		var LineList=new Array();
		DrawKind1(OBJ,LineList,OBJ)
		
		for (var I=0; I<LineList.length;I++)
		{
			var X1=LineList[I].X1.Re;
			var Y1=LineList[I].Y1.Re;
			var X2=LineList[I].X2.Re;
			var Y2=LineList[I].Y2.Re;
	
			var XX=X+_Xl+2;
			var YY=Y+_Yu+2;
			
			if (ProcA(X1,Y1,X2,Y2,XX,YY,0.1,0.01)) 
			if (ProcB(X1,Y1,X2,Y2,XX,YY,0.1))
			{
				S=OBJ.Name;
				return S;
			}
		}
	}

	if (OBJ.OB=="D")
	{
		var XX=X+_Xl;
		var YY=Y+_Yu;
        if (ProcDuga(OBJ,XX,YY))
		{
			S=OBJ.Name;
			return S;
		}
		
	}
	return S;
}

function OfferItself(Alg,X,Y)
{
	var List = [];
	for (var I=0; I<Alg.NameList.length; I++)
	{
		var PN=Alg.NameList[I];
		S=ObjOfferItself(PN.List,X,Y);
		if (S!="") List.push(PN);
	}
	return List;
} // OfferItself

function accept(List,Mass,ooo)
{
	for (var I=0; I< List.length; I++)
	{
		var PN=List[I];
		var OBJ=PN.List;
		var Found=false;
		for (var J=0; J< Mass.length; J++)
		{
			if (OBJ.OB==Mass[J])
			{
				Found= true;
				ooo.value=PN.Name;
				return true;
			}
		}
		
	}
	return false;
} // accept

function CreateFile()
{
	var fso, tf;
	fso = new ActiveXObject("Scripting.FileSystemObject");
	tf = fso.CreateTextFile("c:\\testfile.txt", true);
	// Вставка строки с переносом на новую.
	tf.WriteLine("Testing 1, 2, 3.") ;
	// Вставка 3 путых строк.
	tf.WriteBlankLines(3) ;
	// Вставка новой строки, без переноса.
	tf.Write ("This is a test.");
	// Закрытие файла.
	tf.Close();
}

function Save()
{
//	CreateFile();
	var qqq=parent.document.getElementById("rightFrame");
	Alg=qqq.contentWindow.Alg;
	var Mass=[];
	Mass.push("VER = SIMPLEX 3.8.1.20"+"\r\n");
	Mass.push("AUTHOR = "+"\r\n");
	Mass.push("PROJECT_DESCRIPTION"+"\r\n");
	Mass.push("END_PROJECT_DESCRIPTION"+"\r\n");
	Mass.push("PROJECT_TEXT 0"+"\r\n");
	Mass.push("STATEMENTS"+"\r\n");
	Mass.push("ALG = Main FALSE  "+"\r\n");
	Mass.push("Main"+"\r\n");
	Mass.push("OUTPUT = 0"+"\r\n");
	Mass.push("INPUT = 0"+"\r\n");
	Mass.push("CONSTS = 0"+"\r\n");
	Mass.push("DESCRIPTION = 0"+"\r\n");
	Mass.push(""+"\r\n");
	
	for (var I=0; I<Alg.Prog.length; I++)
	{
		var PTS=Alg.Prog[I];
		if (!PTS.Actual) continue;
		var S=PTS.Fun+"\t"+"0"+"\t";
		for (var J=0; J<PTS.Out.length; J++)
		{
			S=S+PTS.L[J].Name+":"+I+"\t";
		}
		S=S+";"+"\t";
		for (var J=0; J<PTS.In.length; J++)
		{
			S=S+PTS.In[J]+"\t";
		}
		S=S+"."+"\r\n";
		Mass.push(S);
	}		
	
	Mass.push("$LineTail 20"+"\r\n");
	Mass.push("ENDALG = Main"+"\r\n");
	Mass.push("PROTOTYPES = 0"+"\r\n");
	Mass.push("DESCRIPTION:"+"\r\n");
	Mass.push("WINDOW"+"\r\n");
	Mass.push("ALGORITHM"+"\r\n");
	Mass.push("ALGNAME=Main"+"\r\n");
	Mass.push("KCX= 5.00000000000000E-0001"+"\r\n");
	Mass.push("KCY= 5.00000000000000E-0001"+"\r\n");
	Mass.push("MAS= 1.00000000000000E+0000"+"\r\n");
	Mass.push("MATRIX=  1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1"+"\r\n");
	Mass.push("TP=E"+"\r\n");
	Mass.push("LEFT=26"+"\r\n");
	Mass.push("TOP=26"+"\r\n");
	Mass.push("WIDTH=1556"+"\r\n");
	Mass.push("HEIGHT=645"+"\r\n");
	Mass.push("CMAS= 1"+"\r\n");
	Mass.push("BKCOLOR=16777215"+"\r\n");
	Mass.push("LABELS=CK$"+"\r\n");
	Mass.push("DIRECTIONS="+"\r\n");
	Mass.push("SHOWAXES"+"\r\n");
	Mass.push("LAYERS=3"+"\r\n");
	Mass.push(" basic"+"\r\n");
	Mass.push(" all"+"\r\n");
	Mass.push(" trash"+"\r\n");
	Mass.push("LAYER=basic"+"\r\n");
	Mass.push("END_WINDOW"+"\r\n");
	Mass.push("LOGIC"+"\r\n");
	Mass.push("CLAUSES"+"\r\n");
	Mass.push("END_LOGIC"+"\r\n");
	Mass.push("SURFS"+"\r\n");
	Mass.push("SURFSCOUNT = 0"+"\r\n");
	Mass.push("END_SURFS"+"\r\n");
	Mass.push("DEFAULTS"+"\r\n");
	Mass.push("LANG = US"+"\r\n");
	Mass.push("TC = FALSE"+"\r\n");
	Mass.push("LFC = FALSE"+"\r\n");
	Mass.push("RC = FALSE"+"\r\n");
	Mass.push("DAC = FALSE"+"\r\n");
	Mass.push("FC = FALSE"+"\r\n");
	Mass.push("IC = FALSE"+"\r\n");
	Mass.push("AC = FALSE"+"\r\n");
	Mass.push("FS = 0"+"\r\n");
	Mass.push("END_DEFAULTS"+"\r\n");
	var blob = new Blob(Mass, {type: "text/plain;charset=utf-8"}); saveAs(blob, "spw.spx");
//	 var blob = new Blob([["Hello, world!"],["\n"],["asasasas"]], {type: "text/plain;charset=utf-8"}); saveAs(blob, "hello world.txt");
} // Save

