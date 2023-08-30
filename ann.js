const req = {}

const nama = "tesing"


req.nama = "jaka"
req.umur = 767
req.god = "unknow"
req.funct =   () => {
    console.log("running")
    // return `${this.window}`
}

const temp = req

temp.funct()

// console.log(req.funct())