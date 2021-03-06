import React, { useState, Fragment } from 'react';
import { Alert } from 'reactstrap';
import ScheduleDropdown from './ScheduleDropdown';
import {LAST_SAVE_VERSION, Schedule, SUGGESTED_VERSION} from '../../containers/ScheduleContainer';
import SaveScheduleButton from './SaveScheduleButton';
import TotalCount from '../TotalCount';
import CompetitionBandsMultiSelectCheckboxDropdown from "./CompetitionBandsMultiSelectCheckboxDropdown";

type Props = {
    schedule: Schedule;
    updateSchedule: Function;
}

const ScheduleToolbar = (props: Props) => {
    const { schedule, updateSchedule } = props;
    const [isSaveAlertOpen, setIsSaveAlertOpen] = useState(false);

    const onAlert = () => {
        setIsSaveAlertOpen(!isSaveAlertOpen);
    }

    const getTotalBands = (): number => {
        return schedule.nights.reduce((count, night) => count + night.bands.length, 0);
    }
    
    return (
        <Fragment>
            <Alert isOpen={isSaveAlertOpen} toggle={onAlert} style={{ textAlign: 'center' }}>The schedule has been updated!</Alert>
            <div style={{display: 'flex', width: '100%', alignItems: 'flex-start'}}>
                <ScheduleDropdown
                    dropdownItemOnClick={() => updateSchedule(SUGGESTED_VERSION)}
                    dropdownItemOnClick2={() => updateSchedule(LAST_SAVE_VERSION)}
                />
                <SaveScheduleButton schedule={schedule} onAlert={onAlert} />
                <div style={{ textAlign: 'right', width: '80%', paddingRight: '32px', display: 'inline' }}>
                    <CompetitionBandsMultiSelectCheckboxDropdown />
                    <TotalCount count={getTotalBands()}/>
                </div>
            </div>
        </Fragment>
    );
};

export default ScheduleToolbar;