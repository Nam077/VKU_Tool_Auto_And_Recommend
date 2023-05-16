import React, { FunctionComponent, useEffect, useState } from 'react';
import { FileWithPath } from 'react-dropzone';
import { ScoreService } from '../services/score.service.ts';
import MyDropzone from '../components/FormUpload.tsx';
import TableScore, { Score } from '../components/TableScore.tsx';
import GPAView from '../components/GPAView.tsx';
import { notification } from 'antd';

const readJsonFile = async (file: File) => {
    const fileContent = await file.text();
    return JSON.parse(fileContent);
};

const scoreService = new ScoreService();

const checkExitName = (name: string | null | undefined, scores: Score[]) => {
    return scores.some((item) => item.name === name);
};

const generateIdUnique = (scores: Score[]) => {
    let max = 0;
    scores.forEach((item) => {
        if (typeof item.id === 'number') {
            max = Math.max(max, item.id);
        }
    });
    return max + 1;
};
const ScoreRecommend: FunctionComponent = () => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (message: string) => {
        api.info({
            message: message,
            placement: 'topRight',
        });
    };

    const [score, setScore] = useState<Score[]>([]);
    const [modifiedScore, setModifiedScore] = useState<Score[]>([]);
    const [GPA, setGPA] = useState<number>(0);
    const [GPAChange, setGPAChange] = useState<number>(0);
    useEffect(() => {
        const scoreService = new ScoreService();
        scoreService.setScore(modifiedScore);
        setGPAChange(scoreService.calcGPA());
    }, [modifiedScore]);
    useEffect(() => {
        const scoreService = new ScoreService();
        scoreService.setScore(score);
        setGPA(scoreService.calcGPA());
    }, [score]);
    const addScore = (newScore: Score): boolean => {
        if (checkExitName(newScore.name, score)) {
            return false;
        } else {
            newScore.id = generateIdUnique(score);
            newScore.key = newScore.id;
            setScore([...score, newScore]);
            setModifiedScore([...modifiedScore, newScore]);
            return true;
        }
        return false;
    };
    const removeScore = (id: number): boolean => {
        setScore(score.filter((item) => item.id !== id));
        setModifiedScore(modifiedScore.filter((item) => item.id !== id));
        return true;
    };
    const onFilesSelected = async (files: FileWithPath[]) => {
        const file = files[0];
        readJsonFile(file).then((res) => {
            res.scoreAll.forEach((item: any) => {
                item.key = item.id;
            });
            setScore(res.scoreAll);
            setModifiedScore(res.scoreAll);
            scoreService.setScore(res.scoreAll);
            setGPA(scoreService.calcGPA());
        });
    };

    const setNewScore = (newScore: Score): void => {
        setModifiedScore(modifiedScore.map((item) => (item.id === newScore.id ? newScore : item)));
        scoreService.setScore(modifiedScore);
        setGPAChange(scoreService.calcGPA());
    };

    return (
        <div>
            {contextHolder}
            <MyDropzone onFilesSelected={onFilesSelected} />
            {score && score.length > 0 && (
                <>
                    <GPAView GPA={GPA} GPAChange={GPAChange} />
                    <TableScore score={score} removeScore={removeScore} addScore={addScore} setNewScore={setNewScore} />
                </>
            )}
        </div>
    );
};

export default ScoreRecommend;
