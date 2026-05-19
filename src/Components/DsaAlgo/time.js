let time =(ms)=> new Promise((res)=>setTimeout(()=>{console.log(ms);res()},ms*50));

export default time