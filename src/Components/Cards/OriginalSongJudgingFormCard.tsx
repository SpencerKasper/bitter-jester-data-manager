import React, {useEffect, useState} from 'react';
import {Card, Form} from "reactstrap";
import {Title} from "../Title";
import TextAreaFormInput from "../ TextAreaFormInput";
import {useAuth0} from "../../react-auth0-spa";
import {S3Client} from "../../aws/s3Client";
import {publishSNS} from "../../aws/publishSNS";
import {JudgingReminderAlert} from "./JudgingReminderAlert";
import {SaveCommentsButton} from "./SaveCommentsButton";

export type Judge = {
    email: string;
    nickname: string;
}

export type JudgeFeedback = {
    judge: Judge;
    initialImpression: string;
    feedback: string;
    favoriteAspect: string;
    songInfo: {
        songName: string;
    },
    week: number;
}

type Props = {
    bandName: string;
    songName: string;
    week: number;
}

export const formatJudgesCommentsFilePath = (bandName: string, songName: string) => {
    const handleSpacesAndUppercase = (value: string) => {
        return value.replace(' ', '_').toLowerCase();
    };
    const formattedBandName = handleSpacesAndUppercase(bandName);
    const formattedSongName = handleSpacesAndUppercase(songName);
    return `judges-comments/${formattedSongName}-${formattedBandName}/`;
};

const OriginalSongJudgingFormCard = (props: Props) => {
    const {user} = useAuth0();
    const {bandName, songName, week} = props;

    const [judgesComments, setJudgesComments] = useState({} as JudgeFeedback);

    const fileName = `${formatJudgesCommentsFilePath(bandName, songName)}${user.nickname.replace('.', '_')}.json`;

    useEffect(() => {
        const getJudgesComments = async () => {
            const previousComments = bandName ? await new S3Client().getObject(fileName) as JudgeFeedback : {} as JudgeFeedback;
            if (previousComments) {
                setJudgesComments(previousComments);
            } else {
                const initialJudgesComments: JudgeFeedback = {
                    initialImpression: '',
                    songInfo: {
                        songName: songName
                    },
                    favoriteAspect: '',
                    feedback: '',
                    judge: {
                        nickname: user.nickname,
                        email: user.email
                    },
                    week
                };

                setJudgesComments(initialJudgesComments);
            }
        };

        getJudgesComments();
    }, [fileName, bandName, songName, user.nickname, user.email]);

    useEffect(() => {
        setAlert({...alert, isAlertOpen: false});
    }, [bandName]);

    const updateJudgesComments = (fieldToUpdate: keyof JudgeFeedback, value: string) => {
        setJudgesComments({...judgesComments, [fieldToUpdate]: value})
    };

    const updateInitialImpressions = (event) => {
        updateJudgesComments('initialImpression', event.target.value);
    };

    const updateFeedback = (event) => {
        updateJudgesComments('feedback', event.target.value);
    };

    const updateFavoriteAspect = (event) => {
        updateJudgesComments('favoriteAspect', event.target.value);
    };

    const combineAndSave = async (): Promise<void> => {
        const judgeFeedback: JudgeFeedback = {
            initialImpression: judgesComments.initialImpression,
            feedback: judgesComments.feedback,
            favoriteAspect: judgesComments.favoriteAspect,
            judge: {
                email: user.email,
                nickname: user.nickname
            },
            songInfo: {
                songName: songName
            },
            week
        };

        const s3Client = new S3Client();
        await s3Client.put(
            s3Client.createPutPublicJsonRequest(
                'bitter-jester-test',
                fileName,
                JSON.stringify(judgeFeedback)
            )
        );

        await publishSNS({
            Message: `week=${week}`,
            TopicArn: 'arn:aws:sns:us-east-1:771384749710:AggregateCommentsForWeekSnsTopic'
        });
        setAlert({...alert, isAlertOpen: true, message: 'Successfully saved your comments.', color: 'success'});
    };

    const [alert, setAlert] = useState({isAlertOpen: false, message: '', color: 'success'});

    const toggle = () => {
        setAlert({...alert, isAlertOpen: !alert.isAlertOpen});
    };

    const songByArtist = `"${songName}" by ${bandName}`;
    const songByTheArtist = `"${songName}" by the artist ${bandName}`;
    return (
        <Card className={'original-song-judging-form-card'}>
            <div>
                <Title titleDisplayText={`JUDGE'S COMMENTS`}/>
                <h3>{songByArtist}</h3>
                <JudgingReminderAlert songByTheArtist={songByTheArtist}/>
                <SaveCommentsButton
                    alert={alert}
                    toggle={toggle}
                    onClick={combineAndSave}
                    songName={songName}
                    bandName={bandName}/>
                <Form className={'judges-comments-form'}>
                    <TextAreaFormInput
                        label={'What were your initial impressions?'}
                        id={'initialImpressions'}
                        updateParent={updateInitialImpressions}
                        textAreaValue={judgesComments.initialImpression || ''}
                    />
                    <TextAreaFormInput label={'What feedback or suggestions would you give the artist(s)?'}
                                       id={'feedback'}
                                       updateParent={updateFeedback}
                                       textAreaValue={judgesComments.feedback || ''}/>
                    <TextAreaFormInput label={'What did you like most about what you heard? Please keep this positive.'}
                                       id={'favoriteAspect'}
                                       updateParent={updateFavoriteAspect}
                                       textAreaValue={judgesComments.favoriteAspect || ''}/>
                </Form>
            </div>
        </Card>
    );
};

export default OriginalSongJudgingFormCard;