
class HomeController {

     static index(req, res) {
          res.send("Hello World. This is my first route in express")
     }

     static test(req, res) {
          res.send("coek")
     }
}

export default HomeController;