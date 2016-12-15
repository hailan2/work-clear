function caculation(intellgent)//获得参数intellgent
{	
	var container=document.getElementById(intellgent)
	var output=document.createElement("input");//创建input标签
	var value=new Array("%","x^2","x^1/2","1/x","CE","C","←","÷","7","8","9","×","4","5","6","-","1","2","3","+","±","0",".","=");
	output.style.height=55+"px";//记得加上px
	output.style.width=236+"px";//记得加上px
	output.value=0;//输出框里的默认值为0
	container.appendChild(output);//在container中追加这个节点
	var a=true;//是否得出了不能退格的运算结果其实就是看看是不是单目运算
	var flag=true;//是否出现了错误，本来想要一个个弹出来的，算了。error搞定
	var output;//input标签里的缓存数据
	var first=0;//第一操作数
	var second=0;//第二操作数
	var pointer=1;//判断要对哪个操作数操作
	var togetherOperator;//双目运算符
	var operatorAlone;//单目运算符
	var afterCaculation=false;//是否进行过运算
	var x = new Array();//建数组，暂时只是一空数组，
	for(i=0;i<6;i++)//用div占行
	{	
		x[i]=document.createElement("div");
		x[i].width=320+"px";
		x[i].height=480+"px";
		container.appendChild(x[i]);//在for循环中依次在container中追加这些节点
	}
	for(i=0,j=0;i<24;i++)//创建计算器按钮（button）
	{
		push=document.createElement("button");//创建button
		push.innerHTML=value[i];//在for循环中依次将value数组的元素的值置于push中，即按钮中
		push.style.width=60+"px";
		push.style.height=60+"px";//按钮的大小
		push.style.background="#ddd";
			switch(i)
			{ 
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6://0~6都是执行下面的操作
				push.onclick=function()
				{
					judeOperatorAlone(this);//调用此函数，
				};
				break;//当执行上面的操作后跳出switch;
				case 7:
				push.onclick=function()
				{
					operatorInput(this);
				};
				break;//当执行上面的操作后跳出switch;
				case 8:
				case 9:
				case 10:
				push.onclick=function()
				{
					numInput(this);
				};
				break;//当执行上面的操作后跳出switch;
				case 11:
				push.onclick=function()
				{
					operatorInput(this);
				};
				break;//当执行上面的操作后跳出switch;
				case 12:
				case 13:
				case 14:
				push.onclick=function()
				{
					numInput(this);
				};
				break;//当执行上面的操作后跳出switch;
				case 15:
				push.onclick=function()
				{
					operatorInput(this);
				};
				break;//当执行上面的操作后跳出switch;
				case 16:
				case 17:
				case 18:
				push.onclick=function()
				{
					numInput(this);
				};
				break;//当执行上面的操作后跳出switch;
				case 19:
				push.onclick=function()
				{
					operatorInput(this);
				};
				break;//当执行上面的操作后跳出switch;
				case 20:
				push.onclick=function()
				{
					judeOperatorAlone(this);
				};
				break;//当执行上面的操作后跳出switch;
				case 21:
				case 22:
				push.onclick=function()
				{
					numInput(this);
				};
				break;//当执行上面的操作后跳出switch;
				case 23:
				push.onclick=function()
				{
					judeTogetherOperator(this);
				};
				break;	//当执行上面的操作后跳出switch;			
			}		//绑定事件，待执行	
		x[j].appendChild(push);//将button放入div中
		if((i+1)%4==0)//每4个换行
			{
				j++;//下一行
			}
	}
	//以上大部分是为了将计算器的样子做出来,并且做了函数调用
	//下面则是函数的定义
	function numInput(obj)
	{//每敲击一下数字后进行的操作
		if(flag==true)
		{
			if(afterCaculation==false&&togetherOperator&& first&&(!second))//双目运算符，输入第二个数
			{					
				pointer=2;//说明对第二操作数进行运算
				output.value=0;//如今不显示运算符，当有第二操作时，就可以清空输出框，再显示第二操作数
				a=true;//不是单目运算，退格了也就退了
			}
			if(afterCaculation==true&&pointer==1)//进行完一次运算后对第一操作数操作
			{
				output.value=0;//现在不用显示运算符，都清掉吧
				afterCaculation=false;
				a=true;//不是单目运算，退格也就退了
			}
			if( output.value=="0" )//如果是开始要输入第一操作数或第二操作数
			{ 
				if(obj.innerHTML!=".")
					output.value=obj.innerHTML;
				else output.value ="0"+ obj.innerHTML;		
			}
			else
			{//输入第一操作数或第二操作数的过程中，即已经点击了一次数字按钮后
				if(output.value.indexOf(".")<0)output.value=output.value+obj.innerHTML;//字符串相加	
				if(output.value.indexOf(".") > 0 )
				{
					if(obj.innerHTML==".")output.value=output.value;
					if(obj.innerHTML!=".")output.value=output.value+obj.innerHTML;
				}
			}
			if(pointer==1)first=output.value;//输入完成将临时数据赋给真正要操作的第一操作数				
			else if(pointer==2)second=output.value;//输入完成将临时数据赋给真正要操作的第二操作数					       
		}			
	}//函数执行后完成了对真正第一 第二操作数的的赋值             
	 function operatorInput(obj)//运算符的计入
	 {
	 	if(flag==true)
	 	{
	 		output.value=output.value-0;//避免当成字符运算
	 		if(second&&pointer==2)//如果不点“=”继续点击运算符
		 	{
		 		judeTogetherOperator(obj);
		 	}
		 	togetherOperator=obj.innerHTML;		 	
		 	if(pointer==1)//如果上一步还在对第一操作数操作
		 	{
		 		pointer=2;//则操作数指针指向第二操作数
		 	}
		 	second=0;
		 	afterCaculation=false;
	 	}	
	 }
	 function judeOperatorAlone(obj)//单目运算符进行的操作
	 {
	 	operatorAlone=obj.innerHTML;//将得到的参数插入		 	
	 	if(flag==true)
	 	{
		 	if(operatorAlone=="1/x")
	 		{
	 			if(pointer==1)
	 			{
	 				if(first==0)
			 		{
			 			output.value="Error";//取倒数对象不能为0。输出Ｅｒｒｏｒ
			 			flag=false;//输出Error后，相当于解决了问题，所以flag=flase;
			 		}
			 		else
			 		{
			 			output.value=1/parseFloat(output.value);//floating point output  
	 					first=output.value;
			 		}						
	 			}
	 			if(pointer==2)
	 			{
	 				if(!second)
	 				{
	 					second=1/parseFloat(output.value); //floating point output  
	 					output.value=1/parseFloat(output.value); //floating point output  
	 				}
	 				else 
	 					if(second)
	 				{
				 		output.value=1/parseFloat(output.value); //floating point output  
		 				second=output.value;
	 				}		 				
	 			}
	 			afterCaculation=true;
	 			a=false;//因为是单目运算，而且有按下了单目运算的按钮，所以不可以退格，flag暗下去
		 	}
		 	else 
		 		if(operatorAlone=="√")
		 	{
	 				if(pointer==1)
			 		{
			 			first=Math.sqrt(first);//my open root funcatioan，liu fou？
			 			output.value = first;
			 		}
			 		else 
			 			if(togetherOperator&&!second)
			 		{
			 			second=Math.sqrt(first);
			 			output.value = second;
			 		}
			 		else 
			 			if (pointer==2) 
			 		{
			 			second=Math.sqrt(second);
			 			output.value = second;
	 				}
		 		afterCaculation=true;
		 		a=false;//因为是单目运算，而且有按下了单目运算的按钮，所以不可以退格，flag暗下去
		 	}
		 	else 
		 		if(operatorAlone=="x^2")
	 		{
	 			if (pointer==1)
	 			{
		 			var m=0,q1,q2;
				 	try{m+=q1.split(".")[1].length}catch(e){}//将第一操作数以十进制返回并且是将小数点
				//后的数据给q1，如果出错或没有则q1为零
					try{m+=q2.split(".")[1].length}catch(e){}	//将第一操作数以十进制返回并且是将小数点
				//后的数据给q2，如果出错或没有则q2为0
					first= Number(q1.replace(".",""))*Number(q2.replace(".",""))/Math.pow(10,m);//将q1,q2的小数点用空格代替，并转为数字
	 				output.value = first;
	 			}
	 			else 
	 				if(togetherOperator&&!second)
	 			{
	 				second=first;
	 				var m=0,q1,q2;
				 	try{m+=q1.split(".")[1].length}catch(e){}//将第一操作数以十进制返回并且是将小数点
				//后的数据给q1，如果出错或没有则q1为零
					try{m+=q2.split(".")[1].length}catch(e){}//将第一操作数以十进制返回并且是将小数点
				//后的数据给q2，如果出错或没有则q2为0
					second= Number(q1.replace(".",""))*Number(q2.replace(".",""))/Math.pow(10,m);//将q1,q2的小数点用空格代替，并转为数字
	 				output.value = second;
	 			}
 				else 
 					if(pointer==2)
 				{
 					var m=0,q1,q2;
				 	try{m+=q1.split(".")[1].length}catch(e){}//将第一操作数以十进制返回并且是将小数点
				//后的数据给q1，如果出错或没有则q1为零
					try{m+=q2.split(".")[1].length}catch(e){}//将第一操作数以十进制返回并且是将小数点
				//后的数据给q2，如果出错或没有则q2为零
					second= Number(q1.replace(".",""))*Number(q2.replace(".",""))/Math.pow(10,m);
	 				output.value = second;
 				}
 				afterCaculation=true;
 				i=false;
	 		}
		 	else 
		 	if(operatorAlone=="±"&&output.value!="0")
	 		{
	 			if(pointer==1)
	 			{
	 				if(first[0]!="-")//取反就是那么。。。
					{
	 					first="-"+first;
	 					output.value = first;
 					}
 					else 
 						if(first[0]=="-")
 					{
	 					first=first.substring(1);//如果第一个为"-"则去掉第一个符号 
	 					output.value=first;
	 				}
		 		}
		 		else 
		 			if(togetherOperator&&!second)
		 		{
		 			if(first[0]!="-")
 					{
	 					second="-"+first;
	 					output.value =second;
	 					pointer=2;
 					}
 					else
 						if(first[0]=="-")
 					{
	 					second=first.substring(1);
	 					output.value =second;
	 					pointer=2;
	 				}
		 		}
	 			else 
	 				if(pointer==2)
 				{
 					if(second[0]!="-")
 					{
	 					second="-"+second;
	 					output.value = second;
 					}
 					else 
 						if(second[0]=="-")
 					{
	 					second=second.substring(1);
	 					output.value = second;
 					}
				}
	 		}
		 	else 
		 		if(operatorAlone=="←")
	 		{
	 			if(pointer==1&&a==true)
	 			{
		 			output.value =output.value.substring(0,output.value.length-1);//字符串删除最后一个字符
		 			first=output.value;
		 			if(output.value.length==0||first==0)//字符串中只剩最后一个字符或操作数是值为0的字符串，输出为零
		 			{
		 				output.value=0;
		 				first="0";
		 			}
		 			if(output.value.length==1&&first[0]=="-")//如果字符串还有两个字符且字符串代表一个负数时
		 			{
		 				output.value=0;
		 				first="0";
		 			}
	 			}
	 			else 
	 				if(pointer==2&&second&&a==true)
	 			{
		 			output.value =output.value.substring(0,output.value.length-1);
		 			second=output.value;
		 			if(output.value.length==0)
		 			{
		 				output.value=0;
		 				second="0";	
		 			}
	 			}
	 		}
	 	}
		if(operatorAlone=="C")//你按下了这个，就意味结束了，其实也是新的开始
	 		{
 				first="0";
 				second="0";
 				output.value =0;	
 				pointer = 1;
 				afterCaculation=false;
 				flag=true;
 				a=true;//不是单目运算，退格也就退了
 				togetherOperator="0";
 				operatorAlone="0";
 			}
 		else 
 			if(operatorAlone=="CE")
	 		{
	 			if(pointer==1)
	 			{
	 				first = "0";
	 				output.value =0;	
	 			}
	 			else 
	 				if(pointer==2)
	 			{
	 				output.value =0;
	 				second="0";	//所谓的CE键其实就是将第二操作数变为零
	 			}
 				if(flag==false)//如果计算器处显示结果不正常则初始化
	 			{
	 				first="0";
 					second="0";
 					output.value =0;	
 					pointer = 1;
 					afterCaculation=false;
 					flag=true;
 					a=true;//不是单目运算，退格也就退了
 					togetherOperator="0";
 					operatorAlone="0";
	 			}
	 		}
 		if(output.value=="NaN"||output.value=="Infinity"||output.value=="null"||output.value=="undefined")
 		{
 			flag=false;
 			output.value="Error";//如果有不正常的显示结果则全部设定为Error
 		}		 	
	 }
	  function judeTogetherOperator(obj)//按下后进行的双目运算
	 {
	 	if(flag==true)
	 	{
	 		if(togetherOperator=="+")
	 		{
	 			if(!second)	second=first;//如果没有输入第二操作数，则自增 			
	 			var a1,a2,m;
				try{a1=first.toString().split(".")[1].length}catch(e){a1=0}//将第一操作数以十进制返回并且是将小数点
				//后的数据给a1，如果出错或没有则a1为零
				try{a2=second.toString().split(".")[1].length}catch(e){a2=0}//将第一操作数以十进制返回并且是将小数点
				//后的数据给a2，如果出错或没有则a2为零
				m=Math.pow(10,Math.max(a1,a2));//a1,a2中较大的数据算出了，并将这个数额。。
				//上面的语句主要是将小数的精确度给提高，
				first = (first*m+second*m)/m;//进行大致精确的运算		 			
	 		}
	 		else if(togetherOperator=="-")
	 		{
	 			if(!second)	second=first;//如果没有输入第二操作数，则自增 
	 			var b1,b2,m,n;
			    try{b1=first.toString().split(".")[1].length}catch(e){b1=0}//将第一操作数以十进制返回并且是将小数点后的
			    //数据给b1，如果出错或没有则b1为零
			    try{b2=second.toString().split(".")[1].length}catch(e){b2=0}//将第一操作数以十进制返回并且是将小数点后的
			    //数据给b2，如果出错或没有则b1为零
			    m=Math.pow(10,Math.max(b1,b2));
			    n=(b1>=b2)?b1:b2;//如果b1>=b2,则n=b1,否则n=b2;
 				first =((first*m-second*m)/m).toFixed(n);//固定返回值的小数位数为n	 			
	 		}
	 		else if(togetherOperator=="×")
	 		{
	 			if(!second)second=first;//如果没有输入第二操作数，则自增 
	 			var m=0,q1,q2;
				 	try{m+=q1.split(".")[1].length}catch(e){}//将第一操作数以十进制返回并且是将小数点后的数据给q1，
				 	//如果出错或没有则hhhh
				try{m+=q2.split(".")[1].length}catch(e){}//将第一操作数以十进制返回并且是将小数点后的数据给q2，
				//如果出错或没有则hhhh
				first=Number(q1.replace(".",""))*Number(q2.replace(".",""))/Math.pow(10,m);//其中Number是把字符串转为数字，如果不能转为，
				//返回NUN,但我这种情况不会发生的，hhhhh，只会出现Error
	 		}
	 		else if(togetherOperator=="÷")
	 		{
	 			if(!second)second=first;//如果没有输入第二操作数，则自增 
	  			if(second!=0)
	 			{
	 				var c1=0,c2=0,c1,c2;
					try{c1=first.toString().split(".")[1].length}catch(e){}//将第一操作数以十进制返回并且是将小数点后的数据给q2，
					//如果出错或没有则hhhh
					try{c2=second.toString().split(".")[1].length}catch(e){}//将第一操作数以十进制返回并且是将小数点后的数据给q2，
					//如果出错或没有则hhhh
						with(Math)
						{
        				c1=Number(first.toString().replace(".",""));//在经过toString的十进制转换后将空格代替小数点
        				c2=Number(second.toString().replace(".",""));//在经过toString的十进制转换后将空格代替小数点
        				first =(c1/c2)*pow(10,c2-c1);
	 				}
	 			}
	 			else//除数为0则输出Error
	 			{
	 				first="Error";
	 				flag=false;
	 			}
	 		}
	 		if((first-0)==0)
	 			output.value=first="0";//防止小数点后有多个0出现
 			output.value=(first-0);//字符型转化为数字，还可以用Number，多点方法也是挺好的
 			pointer=1;//将指针指向第一操作数
			afterCaculation = true;
			a=false;//因为是单目运算，而且有按下了单目运算的按钮，所以不可以退格，flag暗下去
	 	}
	 	if(output.value=="NaN"||output.value=="Infinity"||output.value=="null"||output.value=="undefined")
	 		{
	 			output.value="Error";
	 			flag=false;
	 		}//如果计算结果不正常，则输出为零	 		
	 }
	 // var selfWidth=output.offsetWidth;
	 // var viewWidth=document.documentElement.clientWidth;
	 container.style.margin=44+"px";
}
//注：因为退格问题，我才发现，原来在输出框中显示出100+1=101是很难的，只能先显示100，然后100消失掉,再显示出1，然后1消失掉，最后
//显示出101
//而运算符是很难显示出来的，为啥呢？
//因为要显示出运算符则需要两个东西，一个是明面上的，即输出框显示的，
//就比如说你100+1是带有运算符的，这个其实就是给人看的
//只是字符串，另一个是暗面的,实际上我已经将他们100+1是变成了101存储起来了，
//但别人是看不见的，等下一次运算时就拿出来用就行了
//但问题来了：当你退格时：假如说现在是100+11，
//但我想改成100+1，即退格，但我已经将100+11变成了111，那还要我怎么退，
//实际上，增加了运算符是很有利于用户体验的，但是却不好做，不仅仅是退格，其他的功能也是比较麻烦的，
//所以，无奈之下，只能选择不显示运算符。。。。。。。。。。