let time =(ms)=> new Promise((res)=>setTimeout(()=>{res()},ms*500));

export default time