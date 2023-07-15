//readline클래스를 이용하기 위한 인터페이스 생성
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//변수 선언
let com_num = new Array() //컴퓨터가 랜덤으로 숫자를 생성하여 저장하는 배열
let user_num = new Array()//사용자가 입력하는 숫자 배열
let count = 1 //사용자 시도 횟수
let temp_i = 0 //컴퓨터가 랜덤한 숫자 3개 뽑는 데 필요한 변수

//컴퓨터가 랜덤한 서로 다른 숫자 3개 뽑기
while(temp_i < 3){
    temp = Math.floor(Math.random() * 10)
    if(com_num.includes(String(temp)) === false){
        com_num.push(String(temp))
        temp_i++
        continue
    }
    else continue
}

console.log("컴퓨터가 숫자를 생성하였습니다. 답을 맞춰보세요!")
console.log(com_num)


//isBall함수 (answer = 컴퓨터의 번호 / input_num : 찾아볼 하나의 숫자 / index : 사용자 입력숫자가 몇번째 인덱스에 있는지)
function isBall(answer, input_num,index){
    if(answer.includes(input_num[index]) === true && answer[index] !== input_num[index]) return true
    else return false
}

//isStrike함수
function isStrike(answer, input_num,index){
    if(answer[index] == input_num[index]) return true
    else return false
}

//calculate 함수
function calculate(answer, input){
    let result
    let ball = 0, strike = 0
    for(let i=0;i<3;i++){
        if(isStrike(answer, input, i) === true) strike++
        else if(isBall(answer, input, i) === true) ball++
    }

    //세 자리 모두 strike라면 true 반환하기
    if(strike === 3) return true

    //출력 형식 맞추기
    if (ball === 0 && strike === 0) result = "0B0S"
    else if(ball === 0) result = strike +"S"
    else if(strike === 0) result = ball + "B"
    else result = ball+ "B" + strike + "S"


    return result
}


process.stdout.write(count+"번째 도전 : ")


rl.on('line', (num) => {
    //입력값을 문자로 변환
    num = String(num)
    user_num.splice(0,3)
    for(let i=0;i<3;i++){
        user_num.push(num[i])
    }

    //사용자가 입력한 값이 정답이라면 3S를 출력하고 while문 빠져나가 게임 종료
    if(calculate(com_num, user_num) == true) {
        console.log("3S")
        console.log(count+"번만에 맞히셨습니다.")
        console.log("게임을 종료합니다.")
        rl.close();
    }

    //사용자가 입력한 값과 정답이 일치하지 않는다면 계산결과를 반환하는 calculate함수 반환
    else{
        console.log(calculate(com_num, user_num))
        count++
        process.stdout.write(count+"번째 도전 : ")
    }

})