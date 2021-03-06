import React from 'react';

import '../../static/css/completedSubmissionCard.css';
import CardContainer from '../Cards/CardContainer';
import {Row} from 'reactstrap';
import CardItem from '../Cards/CardItem';
import {IncompleteApplication} from '../../containers/IncompleteApplicationsContainer';

type Props = {
    incompleteApplication: IncompleteApplication;
}

const IncompleteSubmissionCard = (props: Props) => {
    const {applicantName, bandName, primaryEmailAddress, relationshipToBand} = props.incompleteApplication;

    const formatApplicantName = () => {
        const { first, last } = applicantName;

        return `${first} ${last}`;
    }

    return (
        <CardContainer className={'completedSubmissionCardContainer'}>
            <Row>
                <div className={'bandName'}>
                    {bandName}
                </div>
            </Row>
            <Row className={'leftSide'}>
                <CardItem label={'Applicant Name'} value={formatApplicantName()} />
                <CardItem label={'Primary Email Address'} value={primaryEmailAddress} />
                <CardItem label={'Relationship to Band'} value={relationshipToBand} />
            </Row>
        </CardContainer>
    );
};

export default IncompleteSubmissionCard;