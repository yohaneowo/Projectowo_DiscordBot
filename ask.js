
class Example {
constructor() {
this.Guild_Id = '';
this.Category_Id = '';
this.All_Members_Count_Id = '';
}
}

const x = new Example();
const values = ['1', '2', '5'];
for (let y of values) {
switch (y) {
case '0':
x.All_Members_Count_Id = '222222';
console.log(x.All_Members_Count_Id);
break;
case '1':
x.Category_Id = '666666666';
console.log(x.Category_Id);
break;
case '2':
x.Guild_Id = '9999999999999';
console.log(x.Guild_Id);
break;
}
}

console.log(x.Guild_Id);
console.log(x.Category_Id);
console.log(x.All_Members_Count_Id);