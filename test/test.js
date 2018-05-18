const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

nightmare
.click(':nth-child(5) > .nav-link')
.goto('http://localhost:8080/myvehicles.html')
.click(':nth-child(3) > .nav-link')
.goto('http://localhost:8080/faqs.html')
.click('.active > .nav-link')
.click(':nth-child(2) > .nav-link')
.goto('http://localhost:8080/servicemenu.html')
.click('.active > .nav-link')
.click(':nth-child(1) > .nav-link')
.goto('http://localhost:8080/index.html')
.end()
.then(function (result) {
  console.log(result)
})
.catch(function (error) {
  console.error('Error:', error);
});