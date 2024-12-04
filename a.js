import dotenv from 'dotenv'
dotenv.config()
async function m1(){
    let res = await fetch(process.env.link1,{
        method: "get",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }})
    console.log(res.body)
}
m1()