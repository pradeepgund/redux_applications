const Person = {
  name: "Pradeep",
  age: 55,
  location: {
    city: "Pune",
    temprature: 12
  }
};

const { name, age } = Person;
const { city = "puneeee", temprature: temp } = Person.location;

console.log(name, age);
console.log(city, temp);
