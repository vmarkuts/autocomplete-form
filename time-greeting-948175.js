const h=new Date().getHours(),g=h<12?'Good morning':h<18?'Good afternoon':'Good evening',b=document.createElement('div');b.textContent=g;document.body.appendChild(b);
