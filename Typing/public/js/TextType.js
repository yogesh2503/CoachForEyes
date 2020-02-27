class TextType {
    constructor(scane) {
        this.s1 = WORDS[0];

        var style = { font: "15px Arial", fill: "#ffffff", align: "left", wordWrap: true, wordWrapWidth: 830 };
        this.para = scane.add.text(15, 15, this.s1, style);
        // this.para.anchor.set(0.5);
        // this.para.addColor('#ffff00', 16);
        // this.para.addColor('#ffffff', 25);
        // this.para.addColor('#ff00ff', 28);
        // this.para.addColor('#ffffff', 32);
        this.count = 0;
        this.para.visible = true;
        this.time = 0;
        this.correct = 0;
        this.level = 0;
        // console.log(this.para.getPlainText());
    }
    textupdate(e) {
        var key_entered = keycode.getValueByEvent(e);

        for (let i = 0; i < keypositions.length; i++) {
            if (keypositions[i][0] == e.keyCode) {
                mTex_circle.px = keypositions[i][1];
                mTex_circle.py = keypositions[i][2];
                break;
            }
        }
        if (this.s1.length <= this.count || e.keyCode == 16 || e.keyCode == 20) {
            return;
        }
        // var pri = "";
        // var next = "";
        // if (this.count > 0) {
        //     pri = this.para.text.slice(0, this.para.text.length - this.s1.length + this.count);
        //     // console.log("pri => " + pri);
        // }
        // var newone = this.para.text.slice(this.para.text.length - this.s1.length + this.count, this.para.text.length - this.s1.length + this.count + 1);
        // console.log(e.keyCode + " <=" + newone + "=> " + "a".charCodeAt(0));
        // if (this.s1.length > this.count + 1) {
        //     next = this.para.text.slice(this.para.text.length - this.s1.length + this.count + 1, this.para.text.length);
        //     // console.log(this.s1.length + ", " + this.count + " next => " + next);
        // }

        if (key_entered == this.s1[this.count]) {
            this.correct++;
            this.para.addColor('#00ff00', this.count);
            console.log(key_entered + ", ~~ " + this.s1[this.count]);
            //this.para.text = pri + '[color=#00ff00]' + newone + '[/color]' + next;
        } else {
            this.para.addColor('#ff0000', this.count);
            console.log(key_entered + ", <> " + this.s1[this.count]);
            //this.para.text = pri + '[color=red]' + newone + '[/color]' + next;
        }
        this.para.addColor('#ffffff', this.count + 1);
        this.count++;
        if (this.s1.length <= this.count) {
            this.gameover();
        }
    }
    reset() {
        this.s1 = WORDS[this.level];
        this.count = 0;
        this.para.visible = true;
        this.para.text = this.s1;
        mTex_circle.px = -100;
        mTex_circle.py = -100;
        this.time = 0;
        this.correct = 0;
        for (let i = 0; i < this.s1.length; i++) {
            this.para.addColor('#ffffff', i);

        }

        nextTurn();
    }
    gameover() {
        console.log("mFont[4].text " + mFont[4].text);
        clearTimeout(timeoutHandle);
        setScreen(GAMEOVER);
        var persent = 0;
        var time = Math.floor(this.time / 60) + (this.time % 60 > 9 ? ":" : ":0") + this.time % 60;
        var wpm = 0;
        if (mText.correct > 0) {
            wpm = Math.round((mText.correct / mText.time) * 12);
            persent = Math.round((100 * mText.correct) / mText.count);
        }
        mFont[4].text = time + " sec \n\n" + wpm + " wpm\n\n" + persent + "%";
        console.log("mFont[4].text " + mFont[4].text);
        if (mText.level == 2) {
            writeScoreData(person, (wpm * persent));
            readScore();
        }



    }
}