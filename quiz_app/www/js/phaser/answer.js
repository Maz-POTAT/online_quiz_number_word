/*
 * Author: Jerome Renaux
 * E-mail: jerome.renaux@gmail.com
 */

var bFound = false;
var results = [];

function pushLog(logs, offset){
    bInsert = false;
    for(let i=0; i<results.length; i++){
        if(results[i].offset >= offset){
            results.splice(i,0,{log:logs, offset:offset});
            return;
        }
    }
    results.push({log:logs, offset:offset});
}

function calcTargetNumber(arrayNumbers, resultNumber, logs){
    for(let i=0; i<arrayNumbers.length; i++){
        for(let j=0; j<arrayNumbers.length; j++){
            if(i == j)
                continue;
            for(let k=0; k<4; k++){
                if(bFound)
                    return;
                let number1 = 0, number2 = 0;
                bNumber1 = true;
                bNumber2 = true;
                if(k==0){
                    number1 = arrayNumbers[i] + arrayNumbers[j];
                    number2 = arrayNumbers[j] + arrayNumbers[i];
                }
                else if(k==1){
                    number1 = arrayNumbers[i] - arrayNumbers[j];
                    number2 = arrayNumbers[j] - arrayNumbers[i];
                }
                else if(k==2){
                    number1 = arrayNumbers[i] * arrayNumbers[j];
                    number2 = arrayNumbers[j] * arrayNumbers[i];
                }
                else if(k==3){
                    number1 = Number.parseInt(arrayNumbers[i] / arrayNumbers[j]);
                    if(arrayNumbers[i] % arrayNumbers[j] != 0){
                        bNumber1 = false;
                    }
                    number2 = Number.parseInt(arrayNumbers[j] / arrayNumbers[i]);
                    if(arrayNumbers[j] % arrayNumbers[i] != 0){
                        bNumber2 = false;
                    }
                }
                if(bNumber1){
                    let newArray = [number1];
                    for(let p=0; p<arrayNumbers.length; p++){
                        if(p!=i && p!=j){
                            newArray.push(arrayNumbers[p]);
                        }
                    }
                    //let newLog = [];
                    let obj = {x:arrayNumbers[i], y:arrayNumbers[j], operator:k, equal:number1};
                    let newLog = [...logs, obj];
                    //newLog.push({x:arrayNumbers[i], y:arrayNumbers[j], operator:k, equal:number1});
                    if(number1 == resultNumber)
                    {
                        bFound = true;
                        pushLog(newLog, Math.abs(number1 - resultNumber));
                        return;
                    }
                    else if(Math.abs(number1 - resultNumber)<=3){
                        pushLog(newLog, Math.abs(number1 - resultNumber));
                    }
                    if(newArray.length>1){
                        calcTargetNumber(newArray, resultNumber, newLog);
                    }
                }
                if(bFound)
                    return;
                if(bNumber2){
                    let newArray = [number2];
                    for(let p=0; p<arrayNumbers.length; p++){
                        if(p!=i && p!=j){
                            newArray.push(arrayNumbers[p]);
                        }
                    }
                    let obj = {x:arrayNumbers[j], y:arrayNumbers[i], operator:k, equal:number2};
                    let newLog = [...logs, obj];
                    // let newLog = logs;
                    // newLog.push({x:arrayNumbers[j], y:arrayNumbers[i], operator:k, equal:number2});
                    if(number2 == resultNumber)
                    {
                        bFound = true;
                        pushLog(newLog, Math.abs(number2 - resultNumber));
                        return;
                    }
                    else if(Math.abs(number2 - resultNumber)<=3){
                        pushLog(newLog, Math.abs(number2 - resultNumber));
                    }
                    if(newArray.length>1){
                        calcTargetNumber(newArray, resultNumber, newLog);
                    }
                }
                if(bFound)
                    return;
            }
        }
    }
}

class AnswerScreen extends Phaser.Scene{
    constructor(){
        super({key: "AnswerScreen"});
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }

    create() {
        bFound = false;
        results = [];
        let passedNumber = 0;
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0xfa5c00, 1);
        this.graphics.fillRoundedRect(250,100,580,150, 10);
        this.graphics.fillStyle(0xffffff, 1);
        this.graphics.fillRoundedRect(200,250,680,1000, 10);
        this.add.text(540, 175, 'EN İYİ ÇÖZÜM', {
            fontFamily: 'RR',
            fontWeight: 'bold',
            fontSize: '80px',
            color: "#ffffff",
        }).setOrigin(0.5, 0.5);
        this.add.text(540, 1450, 'Cevabınız değerlendiriliyor', {
            fontFamily: 'RR',
            fontWeight: 'bold',
            fontSize: '70px',
            color: "#ffffff",
        }).setOrigin(0.5, 0.5);
        if(cur_number>=gameData.numData.length && cur_word >= 1){
            passedNumber = cur_word - 1;

            let questionWord = '';
            for(let i=0; i<mix_word.length; i++){
                questionWord += mix_word[i];
            }
            this.add.text(540, 500, questionWord, {
                fontFamily: 'RR',
                fontWeight: 'bold',
                fontSize: '100px',
                color: "#fa5c00",
            }).setOrigin(0.5, 0.5);
            this.add.text(540, 700, gameData.wordData[passedNumber].matchArray[0], {
                fontFamily: 'RR',
                fontWeight: 'bold',
                fontSize: '120px',
                color: "#1d3d59",
            }).setOrigin(0.5, 0.5);
        } else {
            passedNumber = cur_number - 1;
            calcTargetNumber(gameData.numData[passedNumber].array, gameData.numData[passedNumber].result, []);
            let questionNumber = '';
            for(let i=0; i<gameData.numData[passedNumber].array.length; i++)
                questionNumber += gameData.numData[passedNumber].array[i] + ' ';

            this.add.text(540, 350, questionNumber, {
                    fontFamily: 'RR',
                    fontWeight: 'bold',
                    fontSize: '80px',
                    color: "#fa5c00",
                }).setOrigin(0.5, 0.5);

            this.add.text(540, 500, gameData.numData[passedNumber].result, {
                    fontFamily: 'RR',
                    fontWeight: 'bold',
                    fontSize: '100px',
                    color: "#fa5c00",
                }).setOrigin(0.5, 0.5);

            if(results.length == 0){
                this.add.text(540, 700, 'No Answer', {
                    fontFamily: 'RR',
                    fontWeight: 'bold',
                    fontSize: '100px',
                    color: "#1d3d59",
                }).setOrigin(0.5, 0.5);
            }
            else{
                for(let i=0; i<results[0].log.length; i++){
                    let oneOperation = '';
                    oneOperation += results[0].log[i].x + " ";
                    if(results[0].log[i].operator == 0)
                        oneOperation += '+';
                    else if(results[0].log[i].operator == 1)
                        oneOperation += '-';
                    else if(results[0].log[i].operator == 2)
                        oneOperation += '*';
                    else if(results[0].log[i].operator == 3)
                        oneOperation += '/';
                    oneOperation += ' ' + results[0].log[i].y + " = " + results[0].log[i].equal;
                    this.add.text(540, 650 + 100 * i, oneOperation, {
                        fontFamily: 'RR',
                        fontWeight: 'bold',
                        fontSize: '80px',
                        color: "#1d3d59",
                    }).setOrigin(0.5, 0.5);
                }
            }
        }
        this.timer = this.time.addEvent({
            delay: 5000,
            callback: this.updateTimer,
            args: [this],
            loop: false
        });
    }

    update(){
    }

    updateTimer(scene){
        scene.timer.remove();
        scene.time.removeEvent(scene.timer);
        game.scene.stop('AnswerScreen');
        game.scene.start('EndScreen');
    }
}
