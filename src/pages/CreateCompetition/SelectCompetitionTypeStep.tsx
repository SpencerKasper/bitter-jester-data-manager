import React, {useState} from "react";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {CompetitionType} from "./CreateCompetition";

const ONLINE_COMPETITION_TYPE: CompetitionType = {id: 'online', selectedValue: 'Online'};
const IN_PERSON_COMPETITION_TYPE: CompetitionType = {id: 'inPerson', selectedValue: 'In Person'};
const COMPETITION_TYPES = [
    ONLINE_COMPETITION_TYPE,
    IN_PERSON_COMPETITION_TYPE
];

export const SelectCompetitionTypeStep = (props) => {
    const {updateCompetition, selectedCompetitionType} = props;
    const [isDropDownOpen, updateIsDropDownOpen] = useState(false);

    function getDropDownOnClick(selectedCompetitionType: CompetitionType) {
        return () => {
            return updateCompetition({type: selectedCompetitionType});
        };
    }

    return (
        <div className={'competition-type-drop-down-container'}>
            <Dropdown isOpen={isDropDownOpen} toggle={() => updateIsDropDownOpen(!isDropDownOpen)}>
                <DropdownToggle className={'toggle'} caret>
                    {selectedCompetitionType ? selectedCompetitionType.selectedValue : 'Select Competition Type'}
                </DropdownToggle>
                <DropdownMenu>
                    {
                        COMPETITION_TYPES.map(type =>
                            <DropdownItem onClick={getDropDownOnClick(type)}>
                                {type.selectedValue}
                            </DropdownItem>
                        )
                    }
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}