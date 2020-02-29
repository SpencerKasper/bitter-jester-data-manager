import React from 'react';
import { Submission } from '../Pages/Submissions/Submissions';
import { TableRow } from './Table/TableRow';
import { Table } from 'reactstrap';
import { TableHeader } from './Table/TableHeader';

type Props = {
    submissions: Submission[];
}

export const SubmissionTable = (props: Props) => {
    const { submissions } = props;

    const columnNames: string[] = ['Band Name', 'Primary Email Address'];

    return (
        <Table>
            <TableHeader tableColumnNamesOrderedFromLeftToRight={columnNames}/>
            {
                submissions.map(submission => {
                    return <TableRow key={submission.id} flattenedDataToDisplay={submission} />
                })
            }
        </Table>
    );
}