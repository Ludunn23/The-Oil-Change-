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


nightmare
.click(':nth-child(4) > .nav-link')
.click('p > span > a')
.goto('http://localhost:8080/signup')
.goto('http://localhost:8080/signup')
.type('#signup > .text', 'test')
.type('#signup > :nth-child(4)', 'test')
.type('#signup > :nth-child(6)', 'password')
.goto('http://localhost:8080/signup')
.type('#signup > .text', 'test')
.type('#signup > :nth-child(4)', 'test')
.click('.navbar-brand')
.goto('http://localhost:8080/index.html')
.end()
.then(function (result) {
  console.log(result)
})
.catch(function (error) {
  console.error('Error:', error);
});


