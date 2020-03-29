import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import { TableHeader } from '../Components/Table/TableHeader';
import { BitterJesterApplications, BitterJesterApplication } from '../Pages/Submissions/Submissions';
import { SubmissionTableRow } from '../Components/Table/SubmissionTableRow';
import { Title } from '../Components/Title';
import { getFromS3 } from '../aws/getFromS3';
import CardContainer from '../Components/CardContainer';


export type PrunedApplication = {
    bandName: string;
    primaryEmailAddress: string;
    firstChoiceFridayNight: string;
    secondChoiceFridayNight: string;
}

export type SubmissionsTableColumnNames = 'Band Name' | 'Primary Email Address' | 'First Choice Friday' | 'Second Choice Friday'

export const SubmissionContainer = () => {
    const initialSubmissions: BitterJesterApplications = {};
    const [submissions, setSubmissions] = useState(initialSubmissions);

    useEffect(() => {
        async function fetch() {
            await getFromS3('bitter-jester-test.json', setSubmissions);
        }
        fetch();
    }, []);

    const columnNames: SubmissionsTableColumnNames[] = [
        'Band Name',
        'Primary Email Address',
        'First Choice Friday',
        'Second Choice Friday'
    ];
    const completedApplications = submissions.completedApplications || [];

    const pruneDownApplicationsForDisplay = (applications: BitterJesterApplication[]): string[][] => {
        return applications.map((app, index) => {
            return [
                app.bandName,
                app.primaryEmailAddress,
                app.firstChoiceFridayNight || '',
                app.secondChoiceFridayNight || ''
            ];
        });
    }

    const prunedApplications = pruneDownApplicationsForDisplay(completedApplications);

    const submissionRows = prunedApplications.map((prunedApplication, index) => {
        return <SubmissionTableRow key={index} flattenedDataToDisplay={prunedApplication} />
    });

    return (
        <Container fluid>
            <div style={{ padding: '16px' }}>
                <CardContainer>
                    <Title titleDisplayText={'Completed Submissions'} />
                    <TableHeader tableColumnNamesOrderedFromLeftToRight={columnNames} />
                    {
                        submissionRows
                    }
                </CardContainer>
            </div>
        </Container>
    );
}