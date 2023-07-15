var readline = require(`readline`);
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//랜덤 숫자 3개 생성
function Game () {
    const ChoiceNumber = [];
    while (ChoiceNumber.length < 3) {
      const digit = Math.floor(Math.random() * (9-0));
      if (!ChoiceNumber.includes(digit)) {
        ChoiceNumber.push(digit);
         }
    }
    return ChoiceNumber.join(``);
  }

// 스트라이크와 볼 판단
function verdict (target, guess) {
    let strike = 0;
    let ball = 0;

    if (target === guess) {
        strike = 3;
    }else{
        for (let t = 0; t < target.length; t++) {
            if (target[t] === guess[t]) {
                strike++; 
                } else if (target.includes(guess[t])) {
                ball++;
             }
                 }
            }
    return {strike, ball};
}

// 숫자 야구 게임 실행



function GameStart () {

    const Choice = Game();
    let attempts = 0;

    console.log("컴퓨터가 숫자를 생성하였습니다. 답을 맞춰보세요!");
    
        function retry () {
            
            attempts++;


            rl.question(`${attempts}번째 시도 : `, (user) => {
            

            if (user.length !== 3) {
                console.log("숫자 세자리를 입력해주세요!!");
                retry();
                return;
              }
            const result = verdict(Choice, user);

            console.log(`${result.ball}B${result.strike}S`);

            if (result.strike === 3) {
                console.log(`${attempts}번만에 맞히셨습니다.`);
                console.log("게임을 종료합니다.");
                rl.close();
                return;
             }
                   retry();
        });
    }
     retry();
}
    
// 게임 시작
GameStart();


