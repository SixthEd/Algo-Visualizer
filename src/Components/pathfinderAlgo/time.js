let time =(ms)=> new Promise((res)=>setTimeout(()=>{console.log(ms);res()},ms));

export default time