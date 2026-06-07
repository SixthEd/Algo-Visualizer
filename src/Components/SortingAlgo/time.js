let time =(ms)=> new Promise((res)=>setTimeout(()=>{res()},ms*50));

export default time