let t;const l=()=>alert('Logged out due to inactivity');const r=()=>{clearTimeout(t);t=setTimeout(l,10000);};['mousemove','keydown','scroll'].forEach(e=>document.addEventListener(e,r));r();
