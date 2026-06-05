let time =(ms)=> new Promise((res)=>setTimeout(()=>{console.log(ms);res()},ms*500));

export default time