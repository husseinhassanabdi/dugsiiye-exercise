
// //Convert this to TypeScript:

// function fullName(first, last) {
//     return first + " " + last;
//   }

function fullName(first: string , last: string): string {
     return `hello ${first || last}`

}

console.log(fullName("Hussein" , "Abdi" ))


function registerUser (username: string, isAdmin?: boolean, language: string = "en"): string {

    console.log('${isAdmin  || "unkonown"} -  ${message}')

    console.log("My Native language is," + language)
     return `do you mind sharing with me your ${username}`
}

console.log(registerUser("hussein@gmail.com"))


function average(...scores: number[]): number {
    const total = scores.reduce((a, b) => a + b, 0);

    return total / scores.length;
}

console.log(average(100, 90, 80)); 
  