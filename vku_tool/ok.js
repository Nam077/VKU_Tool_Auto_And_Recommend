let table = document.getElementsByTagName('table');
let tableScore = table[1];
let elementScores = tableScore.getElementsByClassName('pointer');
let scoreAll = [];

for (let tr of elementScores) {
    let score = {};
    let tdList = tr.getElementsByTagName('td');

    score.id = tdList[0] ? tdList[0].innerHTML : '';
    if (score.id !== '') {
        score.id = parseInt(score.id);
    }
    // Remove unnecessary span tag in the "name" field
    let nameField = tdList[1] ? tdList[1].innerHTML : '';
    score.name = nameField.replace(/<[^>]+>/g, '').trim();
    // xoá tất cả các ký tự đặc biệt
    score.name = score.name.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '').trim();

    if (score.name === '') {
        continue;
    }
    score.countTC = tdList[2] ? tdList[2].innerHTML : '';
    if (score.countTC !== '') {
        score.countTC = parseInt(score.countTC);
    }
    score.countLH = tdList[3] ? tdList[3].innerHTML : '';
    if (score.countLH !== '') {
        score.countLH = parseInt(score.countLH);
    }
    score.scoreCC = tdList[4] ? tdList[4].innerHTML.trim() : '';
    if (score.scoreCC !== '') {
        score.scoreCC = parseFloat(score.scoreCC);
    }
    score.scoreBT = tdList[5] ? tdList[5].innerHTML : '';
    if (score.scoreBT !== '') {
        score.scoreBT = parseFloat(score.scoreBT);
    }
    score.scoreGK = tdList[6] ? tdList[6].innerHTML : '';
    if (score.scoreGK !== '') {
        score.scoreGK = parseFloat(score.scoreGK);
    }
    score.scoreCK = tdList[7] ? tdList[7].innerHTML : '';
    if (score.scoreCK !== '') {
        score.scoreCK = parseFloat(score.scoreCK);
    }
    // Extract values from <b> tags in scoreT10 and scoreCh fields
    let scoreT10Field = tdList[8] ? tdList[8].innerHTML : '';
    let scoreT10Match = scoreT10Field.match(/<b>(.*?)<\/b>/);
    score.scoreT10 = scoreT10Match ? scoreT10Match[1] : '';
    if (score.scoreT10 !== '') {
        score.scoreT10 = parseFloat(score.scoreT10);
    }
    let scoreChField = tdList[9] ? tdList[9].innerHTML : '';
    let scoreChMatch = scoreChField.match(/<b[^>]*>(.*?)<\/b>/);
    score.scoreCh = scoreChMatch ? scoreChMatch[1] : '';
    scoreAll.push(score);
}
let duplicate = {};
scoreAll.forEach((score) => {
    if (!duplicate[score.name]) {
        duplicate[score.name] = score;
    } else {
        if (score.scoreT10 > duplicate[score.name].scoreT10) {
            duplicate[score.name] = score;
        }
    }
});

scoreAll = Object.values(duplicate);

let scoreClassify = {
    A: {
        tinChi: 0,
        data: [],
    },
    B: {
        tinChi: 0,
        data: [],
    },
    C: {
        tinChi: 0,
        data: [],
    },
    D: {
        tinChi: 0,
        data: [],
    },
    F: {
        tinChi: 0,
        data: [],
    },
    AllTinChi: 0,
    GPA: 0,
};

scoreAll.forEach((score) => {
    if (score.scoreCh === 'A') {
        scoreClassify.A.data.push(score);
        scoreClassify.A.tinChi += score.countTC;
    } else if (score.scoreCh === 'B') {
        scoreClassify.B.data.push(score);
        scoreClassify.B.tinChi += score.countTC;
    } else if (score.scoreCh === 'C') {
        scoreClassify.C.data.push(score);
        scoreClassify.C.tinChi += score.countTC;
    } else if (score.scoreCh === 'D') {
        scoreClassify.D.data.push(score);
        scoreClassify.D.tinChi += score.countTC;
    } else if (score.scoreCh === 'F') {
        scoreClassify.F.data.push(score);
        scoreClassify.F.tinChi += score.countTC;
    }
});
scoreClassify.AllTinChi +=
    scoreClassify.A.tinChi +
    scoreClassify.B.tinChi +
    scoreClassify.C.tinChi +
    scoreClassify.D.tinChi +
    scoreClassify.F.tinChi;
scoreClassify.Gpa =
    (4 * scoreClassify.A.tinChi +
        3 * scoreClassify.B.tinChi +
        2 * scoreClassify.C.tinChi +
        1 * scoreClassify.D.tinChi +
        scoreClassify.F.tinChi) /
    scoreClassify.AllTinChi;
let count = {
    A: scoreClassify.A.tinChi,
    B: scoreClassify.B.tinChi,
    C: scoreClassify.C.tinChi,
    D: scoreClassify.D.tinChi,
    F: scoreClassify.F.tinChi,
};
let dataDownload = {
    scoreClassify,
    scoreAll,
    count,
};
let json = JSON.stringify(dataDownload);

const blob = new Blob([json], { type: 'application/json' });

const url = URL.createObjectURL(blob);

const link = document.createElement('a');
link.href = url;
link.download = 'scoreClassify.json';

link.click();

URL.revokeObjectURL(url);
link.remove();

undefined;
