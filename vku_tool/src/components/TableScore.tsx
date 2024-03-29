import React, { FunctionComponent, useState } from 'react';
import { Button, Select, Table, TableProps, Tag } from 'antd';
import AddScore from './AddScore.tsx';

export interface Score {
    key?: number | null;
    id?: number | null;
    name?: string | null;
    countTC?: number | null;
    countLH?: number | null;
    scoreCC?: number | null;
    scoreBT?: number | null;
    scoreGK?: number | null;
    scoreCK?: number | null;
    scoreT10?: number | null;
    scoreCh?: string | null;
    scoreChuChange?: string | null;
}

interface OwnProps {
    score: Score[];
    setNewScore: (score: Score) => void;
    addScore: (newScore: Score) => boolean;
    removeScore: (id: number) => boolean;
}

type Props = OwnProps;

interface ColorType {
    [key: string]: string;
}

const colorType: ColorType = {
    A: '#007D00',
    B: '#1127FF',
    C: '#647B92',
    D: '#FDBD48',
    F: '#FF0000',
};

export const typeScore = [
    {
        value: 'A',
        label: 'A',
    },
    {
        value: 'B',
        label: 'B',
    },
    {
        value: 'C',
        label: 'C',
    },
    {
        value: 'D',
        label: 'D',
    },
    {
        value: 'F',
        label: 'F',
    },
];

const getAllHighScoreThanCurrent = (scoreChu: string) => {
    return typeScore.filter((item) => item.value <= scoreChu);
};
const TableScore: FunctionComponent<Props> = (props) => {
    const [selectedValues, setSelectedValues] = useState<string[]>(props.score.map((item: any) => item.scoreCh));
    const [isShowAddScore, setIsShowAddScore] = useState<boolean>(false);
    const handleSelectChange = (value: string, index: number) => {
        const updatedValues = [...selectedValues];
        updatedValues[index] = value;
        setSelectedValues(updatedValues);
        const score = props.score[index];
        props.setNewScore({
            ...score,
            scoreCh: value,
        });
    };
    const handleRemoveScore = (id: number, index: number) => {
        props.removeScore(id);
        const updatedValues = [...selectedValues];
        updatedValues.splice(index, 1);
        setSelectedValues(updatedValues);
    };
    const onChange: TableProps<Score>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return (
        <div>
            <div style={{ marginBottom: '10px', textAlign: 'right' }}>
                <Button type="primary" onClick={() => setIsShowAddScore(!isShowAddScore)}>
                    {isShowAddScore ? 'Đóng' : 'Thêm học phần mới'}
                </Button>
            </div>
            {isShowAddScore && <AddScore addScore={props.addScore} />}

            <Table pagination={false} dataSource={props.score} bordered onChange={onChange}>
                <Table.Column title="ID" dataIndex="id" key="id" />
                <Table.Column title="Tên" dataIndex="name" key="name" />
                <Table.Column title="Số Tín Chỉ" dataIndex="countTC" key="countTC" />
                <Table.Column title="Số Lần Học" dataIndex="countLH" key="countLH" />
                <Table.Column title="Điểm Chuyên Cần" dataIndex="scoreCC" key="scoreCC" />
                <Table.Column title="Điểm Bài Tập" dataIndex="scoreBT" key="scoreBT" />
                <Table.Column title="Điểm Giữa Kỳ" dataIndex="scoreGK" key="scoreGK" />
                <Table.Column title="Điểm Cuối Kỳ" dataIndex="scoreCK" key="scoreCK" />
                <Table.Column title="Điểm Thang 10" dataIndex="scoreT10" key="scoreT10" />
                <Table.Column
                    title="Điểm Cải Thiện"
                    dataIndex="scoreCh"
                    key="scoreCaiThien"
                    render={(data, record, index) => {
                        return (
                            <div>
                                <Select
                                    defaultValue={data}
                                    style={{ width: '100%' }}
                                    disabled={data === 'A'}
                                    options={getAllHighScoreThanCurrent(data)}
                                    value={selectedValues[index]}
                                    onChange={(value) => handleSelectChange(value, index)}
                                />
                                {data !== selectedValues[index] && (
                                    <Tag color={colorType['A']} style={{ width: '100%', marginTop: '5px' }}>
                                        Điểm cải thiện cũ {data}
                                    </Tag>
                                )}
                            </div>
                        );
                    }}
                />
                <Table.Column
                    title="Hành Động"
                    dataIndex="id"
                    key="delete"
                    render={(data, record, index) => {
                        return (
                            <Button
                                danger
                                type="default"
                                onClick={() => {
                                    handleRemoveScore(data, index);
                                }}
                            >
                                Xóa
                            </Button>
                        );
                    }}
                />
            </Table>
        </div>
    );
};

export default TableScore;
