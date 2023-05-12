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
scoreAll.forEach(score => {
    if (!duplicate[score.name]) {
        duplicate[score.name] = score;
    }
    else {
        if (score.scoreT10 > duplicate[score.name].scoreT10) {
            duplicate[score.name] = score;
        }
    }
})

scoreAll = Object.values(duplicate);

let scoreClassify = {
    A: [],
    B: [],
    C: [],
    D: [],
    F: [],
}

scoreAll.forEach(score => {
    if (score.scoreCh === 'A') {
        scoreClassify.A.push(score);
    }
    else if (score.scoreCh === 'B') {
        scoreClassify.B.push(score);
    }
    else if (score.scoreCh === 'C') {
        scoreClassify.C.push(score);
    }
    else if (score.scoreCh === 'D') {
        scoreClassify.D.push(score);
    }
    else if (score.scoreCh === 'F') {
        scoreClassify.F.push(score);
    }
})

let dataDownload = {
    scoreClassify,
    scoreAll
}
let json = JSON.stringify(dataDownload);

// Create a blob with the JSON data
const blob = new Blob([json], { type: 'application/json' });

// Create a URL for the blob
const url = URL.createObjectURL(blob);

// Create a link element
const link = document.createElement('a');
link.href = url;
link.download = 'scoreClassify.json';

// Programmatically click the link to trigger the download
link.click();

// Clean up the URL and remove the link element
URL.revokeObjectURL(url);
link.remove();
