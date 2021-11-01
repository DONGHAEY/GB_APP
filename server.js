const express = require("express");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());

app.use(express.json())
app.use(cookieParser())

const con = mysql.createConnection({
  host: "211.216.92.115",
  user: "donghyeon",
  password: "93109310",
  database: "GB",
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected! With Stably");
});

 



const inputToken = (token, id, cb) => { 
  let command = `UPDATE member SET token='${token}' WHERE id='${id}'`
  con.query(command, (err, rows, fields) => {
    if (!err) {
      cb(token);
    }
  });
}

const inputValue = (macadress, huminity, cb) => {
  let command = `INSERT INTO gb_history (macadress, huminity) VALUES ('${macadress}', ${huminity})`
  con.query(command, (err, history) => {
    if(err) throw err;
      else {
        console.log("okay")
        cb(history);
      }
  })
}

app.post("/GB/register", (req, res) => {
    console.log(req.body);
  let command = `INSERT INTO member (id, nickname, name, password) VALUES ('${req.body.id}', '${req.body.nickname}', '${req.body.name}', '${req.body.password}')`
  con.query(command, (err, values) => {
      if(!err && values) {
          res.json({isRegister : true})
      } else {
          res.json({isRegister:false})
      }
  });
});

app.post("/GB/login", (req, res) => {
    console.log(req.body)
  let command = `SELECT * FROM member WHERE id = '${req.body.id}' AND password ='${req.body.password}'`
  con.query(command, (err, result) => {
    if(err) throw err;
    if(!err && result[0]) {

      const token = jwt.sign(req.body.id, "GBisGochubat");
      inputToken(token, req.body.id, (Auth)=> {
        res.cookie("gb_auth", Auth).json({ loginSuccess: true });
      })
    } else {
      res.json({
        loginSuccess:false
      })
    }
  });
});

app.post("/GB/auth", (req, res) => {
    const decoded = jwt.verify(req.cookies.gb_auth,'GBisGochubat');
    let command = `SELECT * FROM member WHERE id ='${decoded}' AND token ='${req.cookies.gb_auth}'`
    con.query(command, (err, result) => {
      if(err) {
        res.json({
          err : err,
          isAuth:false
        })
        throw err;
      }
      if(result[0]) {
        res.json({
          isAuth: true,
          client : result[0],
        //   plant
        })
      } else {
        res.json({
          isAuth: false
        })
      }
    })
})


app.post("/GB/logout", (req, res) => {
  const cookie = req.cookies;
  const authkey = cookie.gb_auth;
  jwt.verify (authkey, 'GBisGochubat', (err, decoded) => {
    if(err) throw err;
    if(!err && decoded) {
      let command = `UPDATE member SET token='' WHERE id='${decoded}'`
      con.query(command, (err, values) => {
        if (!err && values.changedRows === 1) {
          res.json({
            isLogout:true
          })
        } else {
          res.json({
            isLogout:false
          })
        }
      });
    }
})
})

app.post("/GB/add", (req, res) => {
    let today = new Date();   
    //이 mac adress가 상품 DB에 등록되어있는지도 확인 할 수 있다면 확인하기
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1;  // 월
  let date = today.getDate();  // 날짜
  let day = today.getDay();  // 요일

  let dat = `${year}-${month}-${date}-${day}`
  const cookie = req.cookies;
  const authkey = cookie.gb_auth;
  jwt.verify (authkey, 'GBisGochubat', (err, decoded) => {
    if(!err) {
      let command = `INSERT INTO gb (macadress, member_id, plantcode, reg_date) VALUES ('${req.body.macadress}', '${decoded}', '${req.body.plantcode}', '${dat}')`
      con.query(command, (err, values) => {
          console.log(values)
          if(!err && values) {
              res.json({isAdded : true})
          } else {
              res.json({isAdded:false})
          }
      });
    }
  })

});

app.post("/GB/machineValue", (req, res) => {
    const macadress = req.body.macadress
    const huminity = req.body.huminity
    let command1 = `SELECT plantcode FROM gb WHERE macadress ='${macadress}'`
    con.query(command1, (err1, values) => {
      if(err1) err1=null;
        else if(values[0]) {
            let command2 = `SELECT * FROM plant WHERE plantcode = ${values[0].plantcode}`
            con.query(command2, (err2, plant) => {
              if(err2) err2 = null
                else if(plant[0]) {
                  inputValue(macadress, huminity, (his)=> {
                    res.json({
                      isadded : true,
                      plant: plant[0],
                    })
                  })
                }
            })
        }
    });
});

app.post("/GB/MachineList", (req, res)=> {
  const cookie = req.cookies;
  const authkey = cookie.gb_auth;
  jwt.verify (authkey, 'GBisGochubat', (err, decoded) => {
    if(!err) {
      let command = `SELECT * FROM gb WHERE member_id = '${decoded}'`
      console.log(command)
      con.query(command, (err, list) => {
        if(err) err = null;
        else if (list[0]) {
            res.json({
                list : list
              })
        } else {
            res.json({
                list : false
            })
        }
      })
    }
  })
})

app.post("/GB/valueList", (req, res) => {
  const macadress = req.body.macadress;
  let command = `SELECT * FROM gb_history WHERE macadress = '${macadress}'`
  con.query(command, (err, list) => {
    if(err) err = null;
    else if (list[0]) {
        res.json({
            list : list
          })
    } else {
        res.json({
            list : false
        })
    }
  })
});

app.listen(5000, () => {
  console.log("server is started with stably");
});
